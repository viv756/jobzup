import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { createMeetingService, getMeetingsOfUserService } from "../services/meeting.service";
import { meetingSchema } from "../validation/meeting.validation";
import { HTTPSTATUS } from "../config/http.config";

export const createMeetingController = asyncHandler(async (req: Request, res: Response) => {
  const recruiterId = req.user?._id as string;
  const candidateId = req.params.candidateId;
  const body = meetingSchema.parse(req.body);

  const { meeting } = await createMeetingService(recruiterId, candidateId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Meeting created successfully",
    meeting,
  });
});

export const getMeetingOfUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const { meetings } = await getMeetingsOfUserService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Meeting fetched successfully",
    meetings,
  });
});
