import mongoose, { Document, Schema } from "mongoose";
import { JobTypeEnum, JobTypeEnumType } from "../enums/job.enum";

export interface JobDocument extends Document {
  title: string;
  category: string;
  description: string;
  datePosted: Date | null;
  closeDate: Date | null;
  hiringLocation: string;
  jobType: JobTypeEnumType;
  experience: string;
  salary: string;
  qualification: string;
  responsibilities: string[];
  requirements: string[];
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<JobDocument>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  closeDate: {
    type: Date,
    default: null,
  },
  hiringLocation: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
  jobType: {
    type: String,
    enum: Object.values(JobTypeEnum), // ["fulltime", "parttime", "fresher"]
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    trim: true,
  },
  requirements: {
    type: [String],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const JobModel = mongoose.model<JobDocument>("Job", jobSchema);
export default JobModel;
