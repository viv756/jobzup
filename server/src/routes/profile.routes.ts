import { Router } from "express";
import { createProfileController } from "../controllers/profile.controller";

const profileRoutes = Router()
 
profileRoutes.post("/create/new", createProfileController)

export default profileRoutes
