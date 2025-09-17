import { ApplicationStatusEnumType } from "../enums/application.enum";
import ApplicationModel from "../models/application.model";
import CompanyModel from "../models/company.model";
import JobModel from "../models/job.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";

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

  const userApplied = await ApplicationModel.exists({ user: userId, job: jobId });
  if (userApplied) {
    throw new BadRequestException("You are already applied to this job");
  }

  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new BadRequestException("Company is not Valid");
  }

  const application = new ApplicationModel({
    user: userId,
    company: companyId,
    job: jobId,
    recruiter: recruiterId,
  });

  await application.save();

  return { application };
};

export const getuserAppliedJobsService = async (userId: string) => {
  const appliedJobs = await ApplicationModel.find({ user: userId }).populate(
    "job",
    "title closeDate"
  );
  
  if (!appliedJobs) {
    throw new BadRequestException("You are not applied to any jobs");
  }

  return { appliedJobs };
};

export const getRecentApplicantsService = async (userId: string) => {
  const recentApplicants = await ApplicationModel.find({ recruiter: userId })
    .select("user job")
    .limit(5)
    .populate("user", "_id name profilePicture -password")
    .populate("job", "_id title ");

  if (!recentApplicants) {
    throw new BadRequestException("You don't have any recent applicants");
  }

  return { recentApplicants };
};

export const getAllApplicationsService = async (
  userId: string,
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const { pageNumber, pageSize } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const totalCount = await ApplicationModel.countDocuments({ recruiter: userId });

  const applications = await ApplicationModel.find({ recruiter: userId })
    .select("user job createdAt status")
    .skip(skip)
    .limit(pageSize)
    .populate("user", "_id name profilePicture -password")
    .populate("job", "_id title ");

  if (!applications) {
    throw new BadRequestException("You don't have any applicants");
  }

  return {
    applications,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
    pageNumber,
  };
};

export const udateAppicationStatusService = async (
  userId: string,
  applicationId: string,
  body: {
    status: string;
  }
) => {
  const { status } = body;

  const application = await ApplicationModel.findById(applicationId);

  if (!application) {
    throw new BadRequestException("Application does't exist");
  }

  application.status = status as ApplicationStatusEnumType;
  await application.save();

  return { application };
};

export const dashboardInfoService = async (userId: string) => {
  const [totalPostedJobs, totalApplicationReceived, recentApplicants, jobApplicationStats] =
    await Promise.all([
      JobModel.countDocuments({ createdBy: userId }), // recruiter’s jobs
      ApplicationModel.countDocuments({ recruiter: userId }), // applications recruiter received
      ApplicationModel.find({ recruiter: userId }) // recent applicants
        .select("user job")
        .limit(5)
        .populate("user", "_id name profilePicture -password")
        .populate("job", "_id title "),
      ApplicationModel.aggregate([
        // graph stats
        { $match: { recruiter: userId } },
        { $group: { _id: "$job", applicantsCount: { $sum: 1 } } },
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        {
          $project: {
            _id: 0,
            jobTitle: "$job.title",
            applicantsCount: 1,
          },
        },
      ]),
    ]);

  return {
    stats: {
      totalPostedJobs,
      totalApplicationReceived,
    },
    recentApplicants,
    jobApplicationStats,
  };
};
