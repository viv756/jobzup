import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middlewares";
import {
  companyIdSchema,
  createJobSchema,
  jobIdSchema,
  updateJobSchema,
} from "../validation/job.validation";
import {
  createJobService,
  getAllJobsOfRecruiterService,
  getAllJobsService,
  getJobByIdService,
  deleteJobService,
  updateJobService,
} from "../services/job.service";
import { HTTPSTATUS } from "../config/http.config";
import { getUserRoleService } from "../services/user.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";

export const createJobController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const body = createJobSchema.parse(req.body);

  const { role } = await getUserRoleService(userId);
  roleGuard(role, [Permissions.POST_JOB]);

  const { job } = await createJobService(userId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Job is created",
    job,
  });
});

export const getJobByIdController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const jobId = jobIdSchema.parse(req.params.jobId);

  const { job, matchScore } = await getJobByIdService(jobId, userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Job fetched successfully",
    job,
    matchScore,
  });
});

export const getAllJobsController = asyncHandler(async (req: Request, res: Response) => {
  const filters = {
    category: req.query.category as string | undefined,
    keyword: req.query.keyword as string | undefined,
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.page as string) || 1,
  };

  const result = await getAllJobsService(filters, pagination);

  return res.status(HTTPSTATUS.OK).json({
    message: "All jobs fetched successfully",
    ...result,
  });
});

export const getAllJobsOfRecruiterController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const filters = {
    keyword: req.query.keyword as string | undefined,
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.page as string) || 1,
  };

  const { ...result } = await getAllJobsOfRecruiterService(userId, filters, pagination);

  res.status(HTTPSTATUS.OK).json({
    message: "Fetched successfully",
    ...result,
  });
});

export const updateJobController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const jobId = jobIdSchema.parse(req.params.jobId);

  const body = updateJobSchema.parse(req.body);

  const { updatedJob } = await updateJobService(userId, jobId, body);

  res.status(HTTPSTATUS.OK).json({
    message: "Job updated successfully",
    updatedJob,
  });
});

export const jobDeleteController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const jobId = jobIdSchema.parse(req.params.jobId);

  const { role } = await getUserRoleService(userId);
  roleGuard(role, [Permissions.DELETE_JOB]);

  await deleteJobService(jobId, userId);

  res.status(HTTPSTATUS.OK).json({
    message: "Job deleted successfully",
  });
});
