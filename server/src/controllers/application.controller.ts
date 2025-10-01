import { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler.middlewares";
import { companyIdSchema, jobIdSchema } from "../validation/job.validation";
import { applicationStatusSchema, recruiterIdSchema } from "../validation/application.validation";
import {
  applyToAJobService,
  cancelApplicationService,
  dashboardInfoService,
  getAllApplicationsService,
  getUserAppliedJobsService,
  updateApplicationStatusService,
} from "../services/application.service";
import { HTTPSTATUS } from "../config/http.config";
import { getUserRoleService } from "../services/user.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";

export const applyToAJobController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const companyId = companyIdSchema.parse(req.params.companyId);
  const jobId = jobIdSchema.parse(req.params.jobId);
  const recruiterId = recruiterIdSchema.parse(req.params.recruiterId);

  const { role } = await getUserRoleService(userId);
  roleGuard(role, [Permissions.APPLY_JOB]);

  const { application } = await applyToAJobService(userId, companyId, jobId, recruiterId);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Job applied successfully",
  });
});

export const getuserAppliedJobsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.page as string) || 1,
  };

  const data = await getUserAppliedJobsService(userId, pagination);

  return res.status(HTTPSTATUS.OK).json({
    message: "User applied jobs fetched successfully",
    ...data,
  });
});

export const dashboardInfoController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const { stats, jobApplicationStats, recentApplicants } = await dashboardInfoService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Dashboard data fetched successfully",
    stats,
    recentApplicants,
    jobApplicationStats,
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

export const cancelApplicationController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const applicationId = req.params.applicationId;

  const { application } = await cancelApplicationService(userId, applicationId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Application canceled successfully",
  });
});

export const updateAppicationStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const applicationId = req.params.applicationId;

    const body = applicationStatusSchema.parse(req.body);

    const application = await updateApplicationStatusService(userId, applicationId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Application status changed",
      application,
    });
  }
);
