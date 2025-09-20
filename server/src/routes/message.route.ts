import { Router } from "express";
import { getMessagesController, sendMessageController } from "../controllers/message.controller";

const messageRoutes = Router();

messageRoutes.get("/:conversationId/get/:userToChatId", getMessagesController);
messageRoutes.post("/send/:receiverId", sendMessageController);

export default messageRoutes