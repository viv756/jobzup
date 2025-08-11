import { Router } from "express";

import {
  createProfileController,
  getUserProfileController,
  updateProfileController,
} from "../controllers/profile.controller";

const profileRoutes = Router();

profileRoutes.post("/create/new/:userId", createProfileController);
profileRoutes.get("/getProfile/user/:userId", getUserProfileController);
profileRoutes.put("/update/user/:userId", updateProfileController);

export default profileRoutes;
