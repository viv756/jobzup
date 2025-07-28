import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  
  if (!req.user || !req.user._id) {
    throw new Error("User not authenticated");
  }

  const userId = req.user?._id.toString();
  const { user } = await getCurrentUserService(userId);

  res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("access_token").status(HTTPSTATUS.OK).json({
    message: "Logout successfully",
  });
});
