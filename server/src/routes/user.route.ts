import { Router } from "express";
import { logoutController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/logout", logoutController);

export default userRoutes;
