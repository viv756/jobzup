import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import {
  getCurrentUserService,
  getUserByIdService,
  userSettingsService,
} from "../services/user.service";
import { userSettingsSchema } from "../validation/user.validation";

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

  const user = await getUserByIdService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const userSettingsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const body = userSettingsSchema.parse(req.body);

  const updatedUser = await userSettingsService(userId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "User updated successfully",
    updatedUser,
  });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  return res.clearCookie("access_token").status(HTTPSTATUS.OK).json({
    message: "Logout successfully",
  });
});
