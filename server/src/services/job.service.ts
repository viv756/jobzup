import CompanyModel from "../models/company.model";
import JobModel from "../models/job.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";
import { CreateJobType } from "../validation/job.validation";

export const createJobService = async (userId: string, compnayId: string, body: CreateJobType) => {
  const company = await CompanyModel.findById(compnayId);
  if (!company) {
    throw new NotFoundExeption("Company not found");
  }

  if (userId.toString() !== company.createdBy.toString()) {
    throw new BadRequestException("You can only job to your company");
  }

  const job = new JobModel({
    title: body.title,
    location: body.location,
    category: body.category,
    description: body.description,
    closeDate: body.closeDate,
    hiringLocation: body.hiringLocation,
    experiance: body.experience,
    salary: body.salary,
    responsibilities: body.responsibilities,
    requirements: body.requirements,
    createdBy: userId,
    companyId: compnayId,
  });

  await job.save();

  return { job };
};

export const getJpbByIdservice = async (jobId: string) => {
  const job = await JobModel.findById(jobId);
  if (!job) {
    throw new BadRequestException("Job is not found");
  }

  return { job };
};

export const getAllJobsService = async (
  filters: {
    category?: string;
    keyword?: string;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const query: Record<string, any> = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }

  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [jobs, totalCount] = await Promise.all([
    JobModel.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
    JobModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    jobs,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};
