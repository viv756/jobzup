import { NextFunction, Request, Response } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import xss from "xss";

import { HTTPSTATUS } from "../config/http.config";

export const noSqlInjectionSanitizer = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
      // Sanitize req.body
      const sanitizedBody = ExpressMongoSanitize.sanitize(req.body, {
        replaceWith: "_",
      });

      // Log any keys that were sanitized
      const checkSanitized = (obj: any, path: string[] = []) => {
        if (typeof obj !== "object" || obj === null) return;
        for (const key in obj) {
          if (key.includes("$") || key.includes(".")) {
            console.warn(`NoSQL Injection attempt at ${req.path}:`, [...path, key].join("."));
          }
          checkSanitized(obj[key], [...path, key]);
        }
      };
      checkSanitized(req.body);

      req.body = sanitizedBody;
    }
    next();
  };
};

export const xssSanitizer = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const sanitize = (data: any): any => {
      if (typeof data === "string") return xss(data);
      if (Array.isArray(data)) return data.map(sanitize);
      if (typeof data === "object" && data !== null) {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, sanitize(value)])
        );
      }
      return data;
    };

    req.body = sanitize(req.body);
    for (const key in req.query) req.query[key] = sanitize(req.query[key]);
    for (const key in req.params) req.params[key] = sanitize(req.params[key]);
    
    next();
  };
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.warn(`Rate limit exceeded by IP: ${req.ip}`);
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      message: "Too many requests, please try again later",
      errorCode: "TOO_MANY_REQUESTS",
    });
  },
});
