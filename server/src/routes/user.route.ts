import { Router } from "express";
import {
  getCurrentUserController,
  getUserByIdController,
  logoutController,
  passwordChangingSettingsController,
  userSettingsController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/logout", logoutController);
userRoutes.get("/:userId", getUserByIdController);
userRoutes.put("/settings/info", userSettingsController);
userRoutes.put("/settings/password", passwordChangingSettingsController);

export default userRoutes;
