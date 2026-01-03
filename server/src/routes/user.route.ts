import { Router } from "express";
import {
  getCurrentUserController,
  getUserByIdController,
  logoutController,
  passwordChangingSettingsController,
  resumeAnalyzerController,
  userSettingsController,
} from "../controllers/user.controller";
import { upload } from "../config/multer.config";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/logout", logoutController);
userRoutes.get("/:userId", getUserByIdController);
userRoutes.put("/settings/info", userSettingsController);
userRoutes.put("/settings/password", passwordChangingSettingsController);

userRoutes.post("/resume/analyzer",upload.single("resume"),resumeAnalyzerController)

export default userRoutes;
