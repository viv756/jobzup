import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import {
  getCurrentUserService,
  getUserByIdService,
  passwordChangingSettingsService,
  userSettingsService,
} from "../services/user.service";
import {
  passwordChangingSchema,
  resumeMatchBodySchema,
  userSettingsSchema,
} from "../validation/user.validation";
import { extractPdfText } from "../utils/pdf-parse";
import { getResumeMatch } from "../utils/resume-analyze";
import { BadRequestException } from "../utils/appError";

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

export const passwordChangingSettingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const body = passwordChangingSchema.parse(req.body);

    const { user } = await passwordChangingSettingsService(userId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Password updated successfully",
    });
  }
);

export const resumeAnalyzerController = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  const jobDescription = resumeMatchBodySchema.parse(req.body.jobDescription);

  let resumeText = "";

  if (file) {
    if (file.mimetype === "application/pdf") {
      const result = await extractPdfText(file.buffer);
      resumeText = result.text;
    } else {
      throw new BadRequestException("Unsupported file type");
    }
  }

  const data = await getResumeMatch({ resumeText, jobDescription });

  if (!data) {
    throw new BadRequestException("Failed to analyze the resume");
  }

  return res.status(HTTPSTATUS.OK).json({
    message: "Resume analyzed successfully",
    data,
  });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  return res.clearCookie("access_token").status(HTTPSTATUS.OK).json({
    message: "Logout successfully",
  });
});
