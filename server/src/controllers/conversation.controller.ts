import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { getUsersForSidebarService } from "../services/conversation.service";
import { HTTPSTATUS } from "../config/http.config";

export const getUsersForSidebarController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const { sidebarUsers } = await getUsersForSidebarService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Sidebar users fetched successfully",
    sidebarUsers,
  });
});
