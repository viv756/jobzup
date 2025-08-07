import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import { registerService, validateUserService } from "../services/auth.service";
import { HTTPSTATUS } from "../config/http.config";
import { signJwtToken } from "../utils/jwt";
import { config } from "../config/app.config";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerService(body);
  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse({
    ...req.body,
  });

  const user = await validateUserService(body);
  const accessToken = signJwtToken({ userId: user._id });

  return res
    .status(HTTPSTATUS.OK)
    .cookie("access_token", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(config.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    })
    .json({
      message: "Logged in successfully",
      user,
    });
});
