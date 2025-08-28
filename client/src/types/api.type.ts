import type { GenderEnumType, JobTypeEnumType } from "../constant";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  profile: string | null;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  company: string | null;
  role: "RECRUITER" | "CANDIDATE";
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
  foundedIn: string
  phone: string
  email:string
  companyLogo: string;
  websiteLink: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JobType = {
  _id:string
  title: string;
  category: string;
  description: string[];
  closeDate: Date | null;
  datePosted: Date | null;
  hiringLocation: string;
  jobType: JobTypeEnumType
  company: CompanyType
  experience: string;
  salary: string;
  responsibilities: string[];
  requirements: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProfileType = {
  _id: string;
  userId: string;
  bio: string;
  location: string;
  language: string[];
  skills: string[];
  workExperiance: WorkExperience[];
  education: Education[];
  awards: Awards[];
  qualification: string | null;
  gender: GenderEnumType;
  age: string | null;
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
  description: string 
};

export type Awards = {
  name: string;
  date: Date | null;
  description: string 
};


// **************Authentication Types**********************//

export type RegisterPayloadType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: "recruiter" | "candidate";
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
  email:string
  companySize: string;
  foundedIn :Date | null
  avgSalary: string;
  location: string;
  about: string;
  phone: string
  background: string[]
  benefits: string[]
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

export type GetCurrentCompanyResponseType = {
  message: string;
  company: CompanyType;
};

export type CreateJobPayloadType = {
  title: string;
  location: string;
  category: string;
  description: string;
  jobType: JobTypeEnumType | string
  closeDate: Date | null;
  hiringLocation: string;
  experience: string;
  salary: string;
  responsibilities: string[];
  requirements: string[];
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
  job: JobType[];
};

export type ApplyToAJobResponseType = {
  message: string,
  
}

export type CreateProfilePayloadType = {
  profileUrl:string | null
  bio: string;
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
  language: string;
  skills: string[];
  workExperiance: WorkExperience[];
  education: Education[];
  awards: Awards[];
  qualification: string | null;
  gender: GenderEnumType;
  age: string | null;
};

export type UpdateUserProfileResponseType = {
  message: string;
  userProfile: ProfileType;
};
