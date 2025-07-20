import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import asyncHandler from "./middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json())

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
