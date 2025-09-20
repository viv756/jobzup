import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

export interface ConversationDocument extends Document {
  participants: {
    userId: mongoose.Types.ObjectId;
    role: "JOB_SEEKER" | "RECRUITER";
  }[];


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
  },
  { timestamps: true }
);

export const ConversationModel = mongoose.model<ConversationDocument>(
  "Conversation",
  conversationSchema
);
export default ConversationModel;
