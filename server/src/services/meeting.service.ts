import crypto from "crypto";

import MeetingModel from "../models/meeting.model";
import { BadRequestException } from "../utils/appError";
import { generateToken } from "../utils/crypto";

export const createMeetingService = async (
  recruiterId: string,
  candidateId: string,
  body: {
    title: string;
    jobId: string;
    scheduledAt: string;
    durationInMinutes: number;
  }
) => {
  const meetingToken = generateToken();
  if (!meetingToken) {
    throw new BadRequestException("Failed to create meeting token");
  }

  const meeting = new MeetingModel({
    title: body.title,
    jobId: body.jobId,
    scheduledAt: body.scheduledAt,
    durationInMinutes: body.durationInMinutes,
    joinToken: meetingToken,
    candidateId: candidateId,
    recruiterId: recruiterId,
  });

  if (!meeting) {
    throw new BadRequestException("Failed to create meeting");
  }

  await meeting.save();

  return { meeting };
};

export const getMeetingsOfUserService = async (userId: string) => {
  const meetings = await MeetingModel.find({
    $or: [{ recruiterId: userId }, { candidateId: userId }],
  })
    .populate("jobId", "title")
    .populate("recruiterId", "name");

  return { meetings };
};
