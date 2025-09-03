import CompanyModel from "../models/company.model";
import JobModel from "../models/job.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";
import { CreateJobType } from "../validation/job.validation";

export const createJobService = async (userId: string, companyId: string, body: CreateJobType) => {
  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new NotFoundExeption("Company not found");
  }

  if (userId.toString() !== company.createdBy.toString()) {
    throw new BadRequestException("You can only job to your company");
  }

  const job = new JobModel({
    title: body.title,
    category: body.category,
    description: body.description,
    closeDate: body.closeDate,
    hiringLocation: body.hiringLocation,
    jobType: body.jobType,
    experience: body.experience,
    salary: body.salary,
    responsibilities: body.responsibilities,
    requirements: body.requirements,
    createdBy: userId,
    company: companyId,
  });

  await job.save();

  return { job };
};

export const getJpbByIdservice = async (jobId: string) => {
  const job = await JobModel.findById(jobId).populate("company");
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
    JobModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("company", "companyName companyLogo"),
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

export const getAllJobsOfRecruiterService = async (userId: string) => {
  const result = await JobModel.aggregate([
    { $match: { createdBy: userId } },
    {
      $lookup: {
        from: "application",
        localField: "_id",
        foreignField: "job",
        as: "applicants",
      },
    },
    {
      $addFields: {
        applicantsCount: { $size: "$applicants" },
      },
    },

    {
      $project: {
        _id: 1,
        title: 1,
        category: 1,
        datePosted: 1,
        applicantsCount: 1,
      },
    },
  ]);

  return { result };
};
