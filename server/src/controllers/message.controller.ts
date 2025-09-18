import { Request, Response } from "express";

import { getMessagesService, sendMessageService } from "../services/message.service";
import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import { messageSchema, receiverIdSchema } from "../validation/message.validation";

export const getMessagesController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const userToChatId = req.params.userToChatId;
  const conversationId = req.params.conversationId;

  const { messages } = await getMessagesService(userId, userToChatId, conversationId);

  res.status(HTTPSTATUS.OK).json({
    message: "Messages fetched successfully",
    messages,
  });
});

export const sendMessageController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const receiverId = receiverIdSchema.parse(req.params.receiverId);
  const conversationId = req.params.conversationId;

  const body = messageSchema.parse(req.body);

  const data = await sendMessageService(userId, receiverId, conversationId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Message send successfully",
    ...data,
  });
});
