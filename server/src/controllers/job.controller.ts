import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { companyIdSchema, createJobSchema } from "../validation/job.validation";
import { createJobService } from "../services/job.service";
import { HTTPSTATUS } from "../config/http.config";

export const createJobController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const companyId = companyIdSchema.parse(req.params.companyId);

  const body = createJobSchema.parse(req.body);

  const { job } = await createJobService(userId, companyId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Job is created",
    job,
  });
});
