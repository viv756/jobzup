import mongoose, { Document, Schema } from "mongoose";
import { string, trim } from "zod";

interface CompanyDocument extends Document {
  companyName: string;
  companySize: string;
  avgSalary: string;
  location: string;
  about: string;
  facebook: string | null;
  instagram: string | null;
  twiter: string | null;
  background: string[];
  benefits: string[];
  foundedIn: string;
  phone: string;
  email: string;
  companyLogo: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId;
  websiteLink: string | null;
}

const companySchema = new Schema<CompanyDocument>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    avgSalary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      default: null,
    },
    foundedIn: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    twiter: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    background: {
      type: [String],
      trim: true,
    },
    benefits: {
      type: [String],
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    websiteLink: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model<CompanyDocument>("Company", companySchema);
export default CompanyModel;
