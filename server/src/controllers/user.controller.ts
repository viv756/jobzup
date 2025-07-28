import { Request, Response } from "express"

import asyncHandler from "../middlewares/asyncHandler.middlewares"
import { HTTPSTATUS } from "../config/http.config"

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("access_token").status(HTTPSTATUS.OK).json({
    message:"Logout successfully"
  })
})