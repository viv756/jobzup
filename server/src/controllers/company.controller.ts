import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { HTTPSTATUS } from "../config/http.config";
import { UnauthorizedException } from "../utils/appError";
import { createCompanySchema } from "../validation/company.validation";
import {
  createCompanyService,
  deleteComapnyService,
  getRecruiterCurrentCompanyService,
} from "../services/company.service";

export const createCompanyController = asyncHandler(async (req: Request, res: Response) => {
  if (!(req.user?.role === "RECRUITER")) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }

  const userId = req.user?._id as string;

  const body = createCompanySchema.parse(req.body);
  const { company } = await createCompanyService(userId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Company is created",
    company,
  });
});

export const getRecruiterCurrentCompanyController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!(req.user?.role === "RECRUITER")) {
      throw new UnauthorizedException(
        "You do not have the necessary permissions to perform this action"
      );
    }

    const userId = req.user?._id as string;

    const { company } = await getRecruiterCurrentCompanyService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "company fetched successfully",
      company,
    });
  }
);

export const deleteCompanyController = asyncHandler(async (req: Request, res: Response) => {
  if (!(req.user?.role === "RECRUITER")) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }

  const userId = req.user?._id as string;
  const companyId = req.params.id;

  await deleteComapnyService(userId, companyId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Company deleted successfully",
  });
});
