import { Router } from "express";
import {
  getCurrentUserController,
  getUserByIdController,
  logoutController,
  userSettingsController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/logout", logoutController);
userRoutes.get("/:userId", getUserByIdController);
userRoutes.put("/settings", userSettingsController);

export default userRoutes;
