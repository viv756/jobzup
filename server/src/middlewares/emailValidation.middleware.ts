import { Request, Response, NextFunction } from "express";

import { emailSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { validateEmail } from "@arcjet/node";
import { config } from "../config/app.config";
import { aj } from "../config/arcjet.config";

export const emailValidator = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailAj = aj.withRule(
        validateEmail({
          mode: config.NODE_ENV === "production" ? "LIVE" : "LIVE",
          // block disposable, invalid, and email addresses with no MX records
          deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        })
      );

      const { email } = req.body;
      emailSchema.parse(email);
      const decision = await emailAj.protect(req, {
        email: email,
      });

      if (decision.isDenied()) {
        res.status(HTTPSTATUS.FORBIDDEN).json({
          error: "Disposable/invalid email address is not allowed",
          details: decision.results.map((res) => ({
            reason: res.reason,
            isDenied: res.isDenied,
          })),
        });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
