import mongoose, { Document, Schema } from "mongoose";
import { GenderEnum, GenderEnumType } from "../enums/profile.enum";

type WorkExperiance = {
  company: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
};

type Education = {
  collegeName: string;
  department: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string | null;
};

type Awards = {
  name: string;
  date: Date | null;
  description: string | null;
};

export interface ProfileDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string | null;
  location: string | null;
  language: string[] | null;
  skills: string[] | null;
  workExperience: WorkExperiance[] | null;
  education: Education[] | null;
  awards: Awards[] | null;
  qualification: string | null;
  gender: GenderEnumType | null;
  age: string | null;
  profileUrl : string | null
}

const profileSchema = new Schema<ProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileUrl: {
      type: String,
      default:null
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    location: {
      type: String,
      default: null,
      trim: true,
    },
    language: {
      type: [String],
      default: null,
    },
    skills: {
      type: [String],
      default: null,
    },
    workExperience: [
      {
        company: String,
        position: String,
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
      },
    ],
    education: [
      {
        collegeName: String,
        department: String,
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
      },
    ],
    awards: [
      {
        name: String,
        date: {
          type: Date,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
      },
    ],
    qualification: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      default: null,
    },
    age: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Profilemodel = mongoose.model<ProfileDocument>("Profile", profileSchema);
export default Profilemodel;
