import { Router } from "express";
import { getMessagesController } from "../controllers/message.controller";

const messageRoutes = Router();

messageRoutes.get("/:conversationId/get/:userToChatId", getMessagesController);
messageRoutes.post("/:conversationId/send/:receiverId", getMessagesController);

export default messageRoutes