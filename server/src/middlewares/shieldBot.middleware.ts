import { Request, Response, NextFunction } from "express";

import { HTTPSTATUS } from "../config/http.config";
import { detectBot } from "@arcjet/node";
import { config } from "../config/app.config";
import { aj } from "../config/arcjet.config";

export const shieldBotProtection = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shieldBotAj = aj.withRule(
        //remove the postman to see it in action
        detectBot({
          mode: config.NODE_ENV === "production" ? "LIVE" : "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE", "CURL", "POSTMAN"],
        })
      );

      const decision = await shieldBotAj.protect(req);
      if (decision.isDenied()) {
        if (decision.reason.isBot()) {
          res.status(HTTPSTATUS.FORBIDDEN).json({
            message: "Bot forbidden to access",
            errorCode: "BOT_DETECTED",
          });
          return;
        }
        res.status(HTTPSTATUS.FORBIDDEN).json({
          message: "Access denied",
          errorCode: "ACCESS_FORBIDDEN",
        });
        return;
      }
      next();
    } catch (error) {
      console.error("Shield/Bot protection error:", error);
      next(error);
    }
  };
};
