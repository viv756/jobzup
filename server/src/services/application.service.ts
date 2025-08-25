import ApplictionModel from "../models/application.model";
import CompanyModel from "../models/company.model";
import JobModel from "../models/job.model";
import { BadRequestException } from "../utils/appError";

export const applyToAJobService = async (
  userId: string,
  companyId: string,
  jobId: string,
  recruiterId: string
) => {
  const job = await JobModel.findById(jobId);

  if (!job || !job.company.equals(companyId)) {
    throw new BadRequestException("Job is not available");
  }

  const userApplied = await ApplictionModel.exists({ user: userId, job: jobId });
  if (userApplied) {
    throw new BadRequestException("You are already applied to this job");
  }

  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new BadRequestException("Company is not Valid");
  }

  const application = new ApplictionModel({
    user: userId,
    company: companyId,
    job: jobId,
    recruiter: recruiterId,
  });

  await application.save();

  return { application };
};

export const getuserAppliedJobsService = async (userId: string) => {
  const appliedJobs = await ApplictionModel.find({ user: userId }).select("job").populate("job");
  if (!appliedJobs) {
    throw new BadRequestException("You are not applied to any jobs");
  }

  return { appliedJobs };
};
