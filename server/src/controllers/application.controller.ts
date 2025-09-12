import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { companyIdSchema, jobIdSchema } from "../validation/job.validation";
import { applicationStatusSchema, recruiterIdSchema } from "../validation/application.validation";
import {
  applyToAJobService,
  getAllApplicationsService,
  getRecentApplicantsService,
  getuserAppliedJobsService,
  udateAppicationStatusService,
} from "../services/application.service";
import { HTTPSTATUS } from "../config/http.config";

export const applyToAJobControlller = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const companyId = companyIdSchema.parse(req.params.companyId);
  const jobId = jobIdSchema.parse(req.params.jobId);
  const recruiterId = recruiterIdSchema.parse(req.params.recruiterId);

  const { application } = await applyToAJobService(userId, companyId, jobId, recruiterId);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Job applied successfully",
  });
});

export const getuserAppliedJobsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const { appliedJobs } = await getuserAppliedJobsService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User applied jobs fetched successfully",
    appliedJobs,
  });
});

export const getRecentApplicantsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const { recentApplicants } = await getRecentApplicantsService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Recent applicants fetched successfully",
    recentApplicants,
  });
});

export const getAllApplicantionsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.page as string) || 1,
  };

  const data = await getAllApplicationsService(userId, pagination);

  return res.status(HTTPSTATUS.OK).json({
    message: "Applications fetched successfully",
    ...data,
  });
});

export const updateAppicationStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const applicationId = req.params.applicationId;

    const body = applicationStatusSchema.parse(req.body);

    const application = await udateAppicationStatusService(userId, applicationId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Application status changed",
      application,
    });
  }
);
