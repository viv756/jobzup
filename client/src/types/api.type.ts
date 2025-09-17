import type { GenderEnumType, JobTypeEnumType } from "../constant";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profile: string | null;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  company: string | null;
  role: "RECRUITER" | "JOB_SEEKER";
};

export type CompanyType = {
  _id: string;
  companyName: string;
  companySize: string;
  avgSalary: string;
  location: string;
  about: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  foundedIn: string;
  phone: string;
  email: string;
  companyLogo: string;
  benefits: string[];
  background: string[];
  websiteLink: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JobType = {
  _id: string;
  title: string;
  category: string;
  description: string;
  closeDate: Date | null;
  datePosted: Date | null;
  hiringLocation: string;
  jobType: JobTypeEnumType;
  company: CompanyType;
  experience: string;
  salary: string;
  qualification: string;
  responsibilities: string[];
  requirements: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProfileType = {
  _id: string;
  userId: string;
  bio: string;
  location: string;
  profileUrl: string;
  language: string[];
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  awards: Awards[];
  qualification?: string;
  experianceTime: string;
  gender: GenderEnumType;
  age?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkExperience = {
  company: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
};

export type Education = {
  collegeName: string;
  department: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
};

export type Awards = {
  name: string;
  date: Date | null;
  description: string;
};

// **************Authentication Types**********************//

export type RegisterPayloadType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: "recruiter" | "job_seeker";
};

export type RegisterResponseType = {
  message: string;
};

export type LoginPayLoadType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  message: string;
  user: UserType;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};

// *********************Company Types********************//

export type CreateCompanyPayLoadType = {
  companyName: string;
  email: string;
  companySize: string;
  foundedIn: Date | null;
  avgSalary: string;
  location: string;
  about: string;
  phone: string;
  background: string[];
  benefits: string[];
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  companyLogo: string | null;
  websiteLink: string | null;
};

export type UpdateCompanyPayLoadType = {
  companyName: string;
  email: string;
  companySize: string;
  foundedIn: Date | null;
  avgSalary: string;
  location: string;
  about: string;
  phone: string;
  background: string[];
  benefits: string[];
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  companyLogo: string | null;
  websiteLink: string | null;
};

export type CreateCompanyResponseType = {
  message: string;
  company: CompanyType;
};

export type UpdateCompanyResponseType = {
  message: string;
  company: CompanyType;
};

export type GetCurrentCompanyResponseType = {
  message: string;
  company: CompanyType;
};

export type CreateJobPayloadType = {
  title: string;
  location: string;
  category: string;
  description: string;
  qualification: string;
  jobType: JobTypeEnumType | string;
  closeDate: Date | null;
  hiringLocation: string;
  experience: string;
  salary: string;
  responsibilities: string[];
  requirements: string[];
};

export type UpdateJobPayLoadType = {
  title: string;
  location: string;
  category: string;
  description: string;
  qualification: string;
  jobType: JobTypeEnumType | string;
  closeDate: Date | null;
  hiringLocation: string;
  experience: string;
  salary: string;
  responsibilities: string[];
  requirements: string[];
};

export type UpdateJobResponseType = {
  message: string;
  job: JobType;
};
export type CreateJobResponseType = {
  message: string;
  job: JobType;
};

export type GetJobByIdResponse = {
  message: string;
  job: JobType;
};

export type GetAllJobsResponse = {
  message: string;
  jobs: JobType[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
};

export type ApplyToAJobResponseType = {
  message: string;
};

export type CreateProfilePayloadType = {
  profileUrl: string | null;
  bio: string;
  phone: string;
  location: string;
  language: string[];
  skills: string[];
  workExperience?: WorkExperience[];
  education?: Education[];
  awards?: Awards[];
  qualification?: string | null;
  gender?: GenderEnumType;
  age?: string | null;
};

export type CreateProfileResponseType = {
  message: string;
  userProfile: ProfileType;
};

export type GetCurrentUserProfileResponseType = {
  message: string;
  userProfile: ProfileType;
};

export type UpdateUserProfilePayloadType = {
  bio: string;
  location: string;
  language: string[];
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  awards: Awards[];
  qualification: string | undefined;
  gender: GenderEnumType | undefined;
  age: string | undefined;
};

export type UpdateUserProfileResponseType = {
  message: string;
  userProfile: ProfileType;
};

export type Applicant = {
  _id: string;
  user: UserType;
  job: JobType;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RecentApplicantsResponse = {
  message: string;
  recentApplicants: Applicant[];
};

export type JobStats = {
  jobTitle: string;
  applicantsCount: string | number;
};

export type DashBoardInfo = {
  message: string;
  stats: {
    totalPostedJobs: string;
    totalApplicationReceived: string;
  };
  recentApplicants: Applicant[];
  jobApplicationStats: JobStats[];
};

export type RecruiterJob = {
  _id: string;
  title: string;
  category: string;
  datePosted: Date;
  closeDate: Date;
  applicantsCount: number;
};

export type GetAllJobsOfRecruiterResponse = {
  message: string;
  jobs: RecruiterJob[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
};

export type GetAllApplicantsType = {
  message: string;
  applications: Applicant[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
};

export type UpdateApplicationStatusType = {
  message: string;
  application: Applicant;
};

export type GetUserByIdResponseType = {
  message: string;
  user: UserType & {
    profile: ProfileType | null;
  };
};
