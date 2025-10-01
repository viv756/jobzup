import arcjet, { shield } from "@arcjet/node";
import { config } from "./app.config";

export const aj = arcjet({
  key: config.ARCJET_KEY,
  rules: [
    shield({
      mode: config.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
    }),
  ],
});
