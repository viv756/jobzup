import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

export interface CoversationDocument extends Document {
  participants: {
    userId: mongoose.Types.ObjectId;
    role: "JOB_SEEKER" | "RECRUITER";
  }[];
  lastMessage: {
    text: string;
    sender: mongoose.Types.ObjectId;
    createdAt: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<CoversationDocument>(
  {
    participants: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    lastMessage: {
      text: { type: String },
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const ConversationModel = mongoose.model<CoversationDocument>(
  "Conversation",
  conversationSchema
);
export default ConversationModel;
