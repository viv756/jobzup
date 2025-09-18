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

export const sendMessageservice = async (
  userId: string,
  recieverId: string,
  conversationId: string | null,
  body: {
    text: string;
  }
) => {
  let conversation;

  if (!conversationId) {
    conversation = await ConversationModel.findOne({
      "participants.userId": { $all: [userId, recieverId] },
    });
  }

  if (!conversation) {
    conversation = await ConversationModel.create({
      participants: [
        { userId: new mongoose.Types.ObjectId(userId) },
        { userId: new mongoose.Types.ObjectId(recieverId) },
      ],
      lastMessage: {
        text: body.text,
        sender: userId,
        createdAt: new Date(),
      },
    });
  } else {
    conversation = await ConversationModel.findById(conversationId);
  }

  if (!conversation) {
    throw new BadRequestException("Conversation could not be created/found");
  }

  const newMessage = new MessageModel({
    sender: userId,
    receiver: recieverId,
    conversationId: conversationId,
    text: body.text,
  });

  await newMessage.save();

  if (!newMessage) {
    throw new BadRequestException("Message sending failed");
  }

  conversation.lastMessage = {
    text: body.text,
    sender: new mongoose.Types.ObjectId(userId),
    createdAt: new Date(),
  };

  await conversation.save();

  return {
    newMessage,
    conversationId: conversation._id,
  };
};
