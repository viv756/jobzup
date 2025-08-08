import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { createProfileSchema, updateProfileSchema } from "../validation/profile.validation";
import { createProfileService, getUserProfileService, updateProfileService } from "../services/profile.service";
import { UnauthorizedException } from "../utils/appError";
import { HTTPSTATUS } from "../config/http.config";

export const createProfileController = asyncHandler(async (req: Request, res: Response) => {
  if (!(req.user?.role === "CANDIDATE")) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }

  const userId = req.user?.id;

  const body = createProfileSchema.parse(req.body);

  const { userProfile } = await createProfileService(body, userId);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Profile updated successfully",
    userProfile,
  });
});

export const getUserProfileController = asyncHandler(async (req: Request, res: Response) => {
  
  // if (!(req.user?.role === "CANDIDATE")) {
  //   throw new UnauthorizedException(
  //     "You do not have the necessary permissions to perform this action"
  //   );
  // }

  const userId = req.user?.id;
  
  const { userProfile } = await getUserProfileService(userId)
  
  return res.status(HTTPSTATUS.OK).json({
    message: "Userprofile fetched successfully",
    userProfile
  })

})

export const updateProfileController = asyncHandler(async (req: Request, res: Response) => {
  // if (!(req.user?.role === "CANDIDATE")) {
  //   throw new UnauthorizedException(
  //     "You do not have the necessary permissions to perform this action"
  //   );
  // }

  const userId = req.user?.id;
  const body = updateProfileSchema.parse(req.body);

  const { updatedProfile } = await updateProfileService(userId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Profile updated successfully",
    updatedProfile,
  });
});
