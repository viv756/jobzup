import { Router } from "express";

import {
  createProfileController,
  currentUserProfileController,
  getUserProfileController,
  updateProfileController,
} from "../controllers/profile.controller";

const profileRoutes = Router();

profileRoutes.post("/create/new", createProfileController);
profileRoutes.get("/getProfile/user/:userId", getUserProfileController);
profileRoutes.get("/getCurrent/user", currentUserProfileController);
profileRoutes.put("/update/user/:userId", updateProfileController);

export default profileRoutes;
