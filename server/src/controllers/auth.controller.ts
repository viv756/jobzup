import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { registerSchema } from "../validation/auth.validation";
import { registerService } from "../services/auth.service";
import { HTTPSTATUS } from "../config/http.config";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerService(body);
  res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});
