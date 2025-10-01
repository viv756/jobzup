import { SignOptions } from "jsonwebtoken";
import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  JWT_SECRET: getEnv("JWT_SECRET"),
  // this value is of the same type as the expiresIn   property from the SignOptions type provided by jsonwebtoken.
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d") as SignOptions["expiresIn"],
  COOKIE_EXPIRE: getEnv("COOKIE_EXPIRE"),

  ARCJET_ENV: getEnv("ARCJET_ENV"),
  ARCJET_KEY: getEnv("ARCJET_KEY"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export const config = appConfig();
