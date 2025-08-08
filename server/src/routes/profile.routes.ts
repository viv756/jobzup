import { Router } from "express";
import { createProfileController, getUserProfileController, updateProfileController } from "../controllers/profile.controller";

const profileRoutes = Router()
 
profileRoutes.post("/create/new", createProfileController)
profileRoutes.get("/getProfile", getUserProfileController)
profileRoutes.put("/update",updateProfileController)

export default profileRoutes
