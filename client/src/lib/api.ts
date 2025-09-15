import type {
  CreateCompanyPayLoadType,
  CreateCompanyResponseType,
  CreateJobPayloadType,
  CreateJobResponseType,
  CreateProfilePayloadType,
  CreateProfileResponseType,
  CurrentUserResponseType,
  GetAllApplicantsType,
  GetAllJobsOfRecruiterResponse,
  GetAllJobsResponse,
  GetCurrentCompanyResponseType,
  GetCurrentUserProfileResponseType,
  GetJobByIdResponse,
  GetUserByIdResponseType,
  LoginPayLoadType,
  LoginResponseType,
  RecentApplicantsResponse,
  RegisterPayloadType,
  RegisterResponseType,
  UpdateApplicationStatusType,
  UpdateCompanyPayLoadType,
  UpdateCompanyResponseType,
  UpdateUserProfilePayloadType,
  UpdateUserProfileResponseType,
  UserType,
} from "../types/api.type";
import { apiFetch } from "./fetch";

export const registerApiFn = async (data: RegisterPayloadType) => {
  return apiFetch<RegisterResponseType>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    auth: false,
  });
};

export const loginApiFn = async (data: LoginPayLoadType) => {
  return apiFetch<LoginResponseType>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const logoutApiFn = async () => {
  return apiFetch<{ message: string }>("/user/logout", {
    method: "POST",
    auth: true,
  });
};

export const getCurrentUserApiFn = async () => {
  return apiFetch<CurrentUserResponseType>("/user/current", {
    auth: true,
  });
};

export const createCompanyApiFn = async (data: CreateCompanyPayLoadType) => {
  return apiFetch<CreateCompanyResponseType>("/company/create/new", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const updateCompanyApiFn = async (data: UpdateCompanyPayLoadType) => {
  return apiFetch<UpdateCompanyResponseType>("/company/update", {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const getCurrentCompanyApiFn = async () => {
  return apiFetch<GetCurrentCompanyResponseType>("/company/currentCompany", {
    auth: true,
  });
};

export const deleteCompanyApiFn = async (companyId: string) => {
  return apiFetch<{ message: string }>(`/company/${companyId}/delete`, {
    auth: true,
  });
};

export const createJobApiFn = async (data: CreateJobPayloadType) => {
  return apiFetch<CreateJobResponseType>(`/job/create/new`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const getJobByIdApiFn = async (jobId: string) => {
  return apiFetch<GetJobByIdResponse>(`/job/${jobId}`, {
    auth: true,
  });
};

export const getAllJobsApiFn = async (searchQuery?: string) => {
  return apiFetch<GetAllJobsResponse>(`/job/all?${searchQuery}`, {
    auth: true,
  });
};

export const createProfileApiFn = async (userId: string, data: CreateProfilePayloadType) => {
  return apiFetch<CreateProfileResponseType>(`/profile/create/new/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const applyToAJobApiFn = async (jobId: string, companyId: string, recriterId: string) => {
  return apiFetch<{ message: string }>(
    `/application/job/${jobId}/company/${companyId}/recruiter/${recriterId}`,
    {
      method: "POST",
      auth: true,
    }
  );
};

export const recentApplicantsApiFn = async () => {
  return apiFetch<RecentApplicantsResponse>(`/application/recruiter/recent/applicants`, {
    auth: true,
  });
};

export const getUserProfileApiFn = async (userId: string) => {
  return apiFetch<GetCurrentUserProfileResponseType>(`/profile/getProfile/user/${userId}`, {
    auth: true,
  });
};

export const updateUserProfile = async (userId: string, data: UpdateUserProfilePayloadType) => {
  return apiFetch<UpdateUserProfileResponseType>(`/profile/update/user/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const getAllJobsOfRecruiterApiFn = async (searchQuery?: string) => {
  return apiFetch<GetAllJobsOfRecruiterResponse>(`/job/recruiter/jobs?${searchQuery}`, {
    auth: true,
  });
};

export const getAllApplicantsApiFn = async (searchQuery: string) => {
  return apiFetch<GetAllApplicantsType>(`/application/recruiter/applicants/all?${searchQuery}`, {
    auth: true,
  });
};

export const updateApplicationStatusApiFn = async (applicationId: string, status: string) => {
  return apiFetch<UpdateApplicationStatusType>(`/application/status/update/${applicationId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    auth: true,
  });
};

export const getUserByIdApiFn = async (userId: string) => {
  return apiFetch<GetUserByIdResponseType>(`/user/${userId}`, {
    auth: true,
  });
};

export const userSettingApiFn = async (data: {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}) => {
  return apiFetch<{ message: string; updatedUser: UserType }>("/user/settings/info", {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const userSettingsPasswordChangeApiFn = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return apiFetch<{ message: string }>("/user/settings/password", {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
};
