import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

import UserModel from "../models/user.model";

import { UnauthorizedException } from "../utils/appError";
import { config } from "../config/app.config";
import asyncHandler from "./asyncHandler.middlewares";
import { AccessTPayload } from "../utils/jwt";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
      throw new UnauthorizedException("Unauthorized. Please log in");
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as AccessTPayload
    
    const user = await UserModel.findById(decoded.userId)

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    req.user = user;
    next();
  }
);
