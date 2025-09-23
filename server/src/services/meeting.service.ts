import MeetingModel from "../models/meeting.model";
import { BadRequestException } from "../utils/appError";

export const createMeetingService = async (
  recruiterId: string,
  candidateId: string,
  body: {
    title: string;
    jobId: string;
    scheduledAt: Date;
    durationInMinutes: number;
  }
) => {
  const meeting = new MeetingModel({
    title: body.title,
    jobId: body.jobId,
    scheduledAt: body.scheduledAt,
    durationInMinutes: body.durationInMinutes,
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
  });

  return { meetings };
};
