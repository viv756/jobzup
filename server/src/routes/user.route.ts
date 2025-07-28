import { Router } from "express";
import { getCurrentUserController, logoutController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/logout", logoutController);

export default userRoutes;
