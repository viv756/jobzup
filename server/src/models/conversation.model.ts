import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

export interface ConversationDocument extends Document {
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

const conversationSchema = new Schema<ConversationDocument>(
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

export const ConversationModel = mongoose.model<ConversationDocument>(
  "Conversation",
  conversationSchema
);
export default ConversationModel;
