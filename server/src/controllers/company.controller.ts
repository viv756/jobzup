import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { createCompanySchema } from "../validation/company.validation";
import { createCompanyService } from "../services/company.service";
import { UnauthorizedException } from "../utils/appError";
import { HTTPSTATUS } from "../config/http.config";

export const createCompanyController = asyncHandler(async (req: Request, res: Response) => {
  if (req.user?.role === "RECRUITER") {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }

  const userId = req.user?._id as string;

  const body = createCompanySchema.parse(req.body);

  const { company } = await createCompanyService(userId, body);

  res.status(HTTPSTATUS.CREATED).json({
    message: "Company is created",
    company,
  });
});
