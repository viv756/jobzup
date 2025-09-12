import mongoose, { Document, Schema } from "mongoose";
import { ApplicationStatusEnum, ApplicationStatusEnumType } from "../enums/application.enum";

export interface ApplicationDocument extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
  recruiter: mongoose.Types.ObjectId;
  status: ApplicationStatusEnumType;
}

const applicationSchema = new Schema<ApplicationDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatusEnum),
      default: ApplicationStatusEnum.APPLIED,
    },
  },
  { timestamps: true }
);

const ApplictionModel = mongoose.model<ApplicationDocument>("Application", applicationSchema);
export default ApplictionModel;
