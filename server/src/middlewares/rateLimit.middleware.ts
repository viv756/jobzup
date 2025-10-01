import { Request, Response, NextFunction } from "express";
import { tokenBucket } from "@arcjet/node";

import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";
import { aj } from "../config/arcjet.config";

export const rateLimiter = (options: { requested: number }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rateLimitAj = aj.withRule(
        tokenBucket({
          mode: config.NODE_ENV === "production" ? "LIVE" : "LIVE", //only works in live
          refillRate: 10, //
          interval: 10, //
          capacity: 5, // Allow 5 requests
        })
      );

      const decision = await rateLimitAj.protect(req, {
        requested: options.requested || 1,
      });

      if (decision.isDenied()) {
        res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
          message: "Too many requests, please try again later",
          errorCode: "TOO_MANY_REQUESTS",
        });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
