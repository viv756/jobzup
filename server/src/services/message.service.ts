import mongoose from "mongoose";

import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";
import { BadRequestException } from "../utils/appError";

export const getMessagesService = async (
  userId: string,
  userToChatId: string,
  conversationId: string
) => {
  // const messages = await MessageModel.find({
  //   $or: [
  //     { sender: userId, receiver: userToChatId },
  //     { sender: userToChatId, receiver: userId },
  //   ],
  // });

  const messages = await MessageModel.find({ conversationId }).sort({ createdAt: 1 });

  return { messages };
};

export const sendMessageService = async (
  userId: string,
  receiverId: string,
  body: { text: string }
) => {

  let conversation;

  if (!conversation) {
    // If conversationId invalid or null, try to find existing one by participants
    conversation = await ConversationModel.findOne({
      "participants.userId": { $all: [userId, receiverId] },
    });
  }

  if (!conversation) {
    // Still not found? → Create new one
    conversation = await ConversationModel.create({
      participants: [
        { userId: new mongoose.Types.ObjectId(userId) },
        { userId: new mongoose.Types.ObjectId(receiverId) },
      ],
    });
  }

  const newMessage = new MessageModel({
    sender: userId,
    receiver: receiverId,
    conversationId: conversation._id,
    text: body.text,
  });

  await newMessage.save();

  return {
    newMessage,
    conversationId: conversation._id,
  };
};
