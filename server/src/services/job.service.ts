import mongoose, { Types } from "mongoose";

import CompanyModel from "../models/company.model";
import ApplicationModel from "../models/application.model";
import JobModel from "../models/job.model";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";
import { CreateJobType, UpdateJbType } from "../validation/job.validation";
import UserModel from "../models/user.model";
import { getJobMatchScore } from "../utils/hf-ai";

export const createJobService = async (userId: string, body: CreateJobType) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  if (!user.company) {
    throw new NotFoundException("You need to register your company");
  }

  const company = await CompanyModel.findById(user.company);
  if (!company) {
    throw new NotFoundException("Company not found");
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
    qualification: body.qualification,
    salary: body.salary,
    responsibilities: body.responsibilities,
    requirements: body.requirements,
    createdBy: userId,
    company: company._id,
  });

  await job.save();

  return { job };
};

export const getJobByIdService = async (jobId: string, userId: string) => {
  const job = await JobModel.findById(jobId).populate("company");
  if (!job) {
    throw new BadRequestException("Job is not found");
  }

  const jobDescription = job.description;
  
  const candidate = await UserModel.findById(userId).populate("profile", "bio");
  if (!candidate) {
    throw new BadRequestException("User is not found");
  }
  const candidateProfile = (candidate.profile as any)?.bio;

  const matchScore = await getJobMatchScore(candidateProfile, jobDescription);

  return { job, matchScore };
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

export const getAllJobsOfRecruiterService = async (
  userId: string,
  filters: {
    keyword?: string;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const query: Record<string, any> = {
    createdBy: new Types.ObjectId(userId),
  };

  if (filters.keyword) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }

  const { pageNumber, pageSize } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const result = await JobModel.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "applications",
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
        closeDate: 1,
        applicantsCount: 1,
      },
    },
    {
      $facet: {
        total: [{ $count: "count" }],
        jobs: [{ $skip: skip }, { $limit: pageSize }],
      },
    },

    {
      $unwind: "$total",
    },

    {
      $project: {
        jobs: 1,
        totalCount: "$total.count",
      },
    },
  ]);

  return {
    jobs: result[0]?.jobs || [],
    totalCount: result[0]?.totalCount || 0,
    pageNumber,
    totalPages: Math.max(1, Math.ceil((result[0]?.totalCount || 0) / pageSize)),
  };
};

export const updateJobService = async (userId: string, jobId: string, body: UpdateJbType) => {
  const job = await JobModel.findById(jobId);
  if (!job) {
    throw new BadRequestException("Job is not found");
  }

  if (String(job.createdBy) !== String(userId)) {
    throw new UnauthorizedException("You are not allowed to edit this job");
  }

  const updatedJob = await JobModel.findByIdAndUpdate(
    job._id,
    {
      ...body,
    },
    { new: true }
  );

  return { updatedJob };
};

export const deleteJobService = async (jobId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const job = await JobModel.findById(jobId).session(session);

    if (!job) {
      throw new BadRequestException("Job is not found");
    }

    if (String(job.createdBy) !== String(userId)) {
      throw new UnauthorizedException("You are not allowed to delete this job");
    }

    // Delete applications linked to this job
    await ApplicationModel.deleteMany({ job: job._id }).session(session);

    // Delete job itself
    await job.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    return { message: "Job deleted successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
