import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import asyncHandler from "./middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import companyRoutes from "./routes/company.route";
import profileRoutes from "./routes/profile.routes";
import jobRoutes from "./routes/job.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(cookieParser());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/company`, isAuthenticated, companyRoutes);
app.use(`${BASE_PATH}/profile`, isAuthenticated, profileRoutes);
app.use(`${BASE_PATH}/job`, isAuthenticated, jobRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
