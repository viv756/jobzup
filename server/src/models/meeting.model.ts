import mongoose, { Schema } from "mongoose";

export enum MeetingStatus {
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface MeetingDocument extends Document {
  title: string;
  jobId: mongoose.Types.ObjectId;
  recruiterId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  scheduledAt: Date;
  durationInMinutes: number;
  status: MeetingStatus;
  joinToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const meetingSchema = new Schema(
  {
    title: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    recruiterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    scheduledAt: { type: Date, required: true }, // timezone-aware ISO date
    durationInMinutes: { type: Number, default: 30 }, // default 30 min
    status: {
      type: String,
      enum: Object.values(MeetingStatus),
      default: MeetingStatus.SCHEDULED,
    },
    joinToken: { type: String }, // short-lived token for joining via WebRTC
  },
  { timestamps: true }
);

const MeetingModel = mongoose.model("Meeting", meetingSchema);
export default MeetingModel;
