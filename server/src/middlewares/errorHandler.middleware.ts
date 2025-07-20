import { ErrorRequestHandler } from "express";

import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error occured on PATH ${req.path}`, error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};
