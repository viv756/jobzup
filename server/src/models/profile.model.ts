import mongoose, { Document, Schema } from "mongoose";
import { GenderEnumType } from "../enums/profile.enum";

export interface WorkExperiance {
  company: string;
  position: string;
  startDate: Date | null;
  endDate?: Date | null;
  description?: string;
}

export interface Education {
  collegeName: string;
  department: string;
  startDate: Date | null;
  endDate: Date | null;
  description?: string;
}

export interface Awards {
  name: string;
  date: Date | null;
  description?: string;
}

export interface ProfileDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string;
  location: string;
  language: string[];
  skills: string[];
  workExperiance?: WorkExperiance[];
  education: Education[];
  awards?: Awards[];
  qualification: string;
  gender: GenderEnumType;
  age: number;
}

const profileSchema = new Schema<ProfileDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
    default:null,
    trim:true
  },
  location: {
    type: String,
    trim:true
  },

});
