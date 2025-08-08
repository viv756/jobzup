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
