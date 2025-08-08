import mongoose, { Document, Schema } from "mongoose";

export interface JobDocument extends Document {
  title: string;
  location: string;
  category: string;
  description: string;
  datePosted: Date | null;
  closeDate: Date | null;
  hiringLocation: string;
  experiance: string;
  salary: string;
  responsibilities: string;
  requirements: string;
  createdBy:mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<JobDocument>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
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
  experiance: {
    type: String,
    trim: true,
  },
  salary: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    trim: true,
  },
  requirements: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required:true
  }
});

const JobModel = mongoose.model<JobDocument>("Job", jobSchema);
export default JobModel;
