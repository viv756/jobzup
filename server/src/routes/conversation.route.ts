import { Router } from "express";
import { getUsersForSidebarController } from "../controllers/conversation.controller";

const conversationRoutes = Router()

conversationRoutes.get("/sidebar/users", getUsersForSidebarController)

export default conversationRoutes