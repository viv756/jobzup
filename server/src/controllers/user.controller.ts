import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService, getUserByIdService } from "../services/user.service";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || !req.user._id) {
    throw new Error("User not authenticated");
  }

  const userId = req.user?._id.toString();
  const { user } = await getCurrentUserService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const getUserByIdController = asyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.user?._id as string;
  const userId = req.params.userId;

  const { user } = await getUserByIdService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  return res.clearCookie("access_token").status(HTTPSTATUS.OK).json({
    message: "Logout successfully",
  });
});
