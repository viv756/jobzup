import { NextFunction, Request, Response } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss";

export const noSqlInjectionSanitizer = ExpressMongoSanitize({
  replaceWith: "_", // Convert $ to _
  onSanitize: ({ req, key }) => {
    console.warn(`NoSQL Injection attempt at ${req.path}:`, key);
  },
});

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
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
  };
};