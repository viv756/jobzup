import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import { app, server } from "./socket/socket";
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
import applicationRoutes from "./routes/application.route";
import conversationRoutes from "./routes/conversation.route";
import messageRoutes from "./routes/message.route";
import meetingRoutes from "./routes/meeting.route";
import { noSqlInjectionSanitizer, xssSanitizer } from "./middlewares/security.middlewares";
import { rateLimiter } from "./middlewares/rateLimit.middleware";
import { emailValidator } from "./middlewares/emailValidation.middleware";
import { shieldBotProtection } from "./middlewares/shieldBot.middleware";

const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(cookieParser());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
    noSniff: true,
    hidePoweredBy: true,
    xssFilter: false,
    referrerPolicy: { policy: "no-referrer" },
  })
);

// Sanitize body
app.use(noSqlInjectionSanitizer());
app.use(xssSanitizer());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(shieldBotProtection());
app.use(rateLimiter({ requested: 1 }));

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello",
    });
  })
);

app.use(`${BASE_PATH}/auth`, emailValidator(), authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/company`, isAuthenticated, companyRoutes);
app.use(`${BASE_PATH}/profile`, isAuthenticated, profileRoutes);
app.use(`${BASE_PATH}/job`, jobRoutes);
app.use(`${BASE_PATH}/application`, isAuthenticated, applicationRoutes);
app.use(`${BASE_PATH}/conversation`, isAuthenticated, conversationRoutes);
app.use(`${BASE_PATH}/message`, isAuthenticated, messageRoutes);
app.use(`${BASE_PATH}/meeting`, isAuthenticated, meetingRoutes);

app.use(errorHandler);

server.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});

export default app;
