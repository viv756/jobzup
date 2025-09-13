import { Router } from "express";
import {
  getCurrentUserController,
  getUserByIdController,
  logoutController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/logout", logoutController);
userRoutes.get("/:userId", getUserByIdController);

export default userRoutes;
