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
  const job = await JobModel.findById(companyId);

  if (!job || !job.companyId.equals(companyId)) {
    throw new BadRequestException("Job is not available");
  }

  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new BadRequestException("Company is not Valid");
  }

  const application = new ApplictionModel({
    userId: userId,
    companyid: companyId,
    jobId: jobId,
    recruiterId: recruiterId,
  });

  await application.save();

  return { application };
};
