import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { companyIdSchema, jobIdSchema } from "../validation/job.validation";
import { recruiterIdSchema } from "../validation/application.validation";
import { applyToAJobService } from "../services/application.service";
import { HTTPSTATUS } from "../config/http.config";

export const applyToAJobControlller = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const companyId = companyIdSchema.parse(req.params.comapanyId);
  const jobId = jobIdSchema.parse(req.params.jobId);
  const recruiterId = recruiterIdSchema.parse(req.params.recruiterId);

  const { application } = await applyToAJobService(userId, companyId, jobId, recruiterId);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Job applied successfully",
    application,
  });
});


