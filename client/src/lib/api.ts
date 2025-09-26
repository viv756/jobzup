import type {
  CreateCompanyPayLoadType,
  CreateCompanyResponseType,
  CreateJobPayloadType,
  CreateJobResponseType,
  CreateMeetingResponse,
  CreateProfilePayloadType,
  CreateProfileResponseType,
  CurrentUserResponseType,
  DashBoardInfo,
  GetAllApplicantsType,
  GetAllJobsOfRecruiterResponse,
  GetAllJobsResponse,
  GetCurrentCompanyResponseType,
  GetCurrentUserProfileResponseType,
  GetJobByIdResponse,
  GetUserAppliedJobsResponseType,
  GetUserByIdResponseType,
  GetUserMeetingsResponse,
  LoginPayLoadType,
  LoginResponseType,
  RegisterPayloadType,
  RegisterResponseType,
  UpdateApplicationStatusType,
  UpdateCompanyPayLoadType,
  UpdateCompanyResponseType,
  UpdateJobPayLoadType,
  UpdateJobResponseType,
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

export const getUserAppliedJobsApiFn = async (searchQuery?: string) => {
  return apiFetch<GetUserAppliedJobsResponseType>(`/application/user/appliedJobs/${searchQuery}`, {
    auth: true,
  });
};

export const cancelApplicationApiFn = async (applicationId: string) => {
  return apiFetch(`/application/job/cancel/${applicationId}`, {
    method: "DELETE",
    auth: true,
  });
};

export const updateJobApiFn = async (jobId: string, data: UpdateJobPayLoadType) => {
  return apiFetch<UpdateJobResponseType>(`/job/update/${jobId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const getJobByIdApiFn = async (jobId: string) => {
  return apiFetch<GetJobByIdResponse>(`/job/${jobId}`, {
    auth: true,
  });
};

export const deleteJobApiFn = async (jobId: string) => {
  return apiFetch<{ message: string }>(`/job/delete/${jobId}`, {
    method: "DELETE",
    auth: true,
  });
};

export const getAllJobsApiFn = async (searchQuery?: string) => {
  return apiFetch<GetAllJobsResponse>(`/job/all?${searchQuery}`, {
    auth: true,
  });
};

export const createProfileApiFn = async (data: CreateProfilePayloadType) => {
  return apiFetch<CreateProfileResponseType>(`/profile/create/new`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
};

export const getCurrentUserProfileApiFn = () => {
  return apiFetch<GetCurrentUserProfileResponseType>("/profile/getCurrent/user", {
    auth: true,
  });
};

export const applyToAJobApiFn = async (jobId: string, companyId: string, recruiterId: string) => {
  return apiFetch<{ message: string }>(
    `/application/job/${jobId}/company/${companyId}/recruiter/${recruiterId}`,
    {
      method: "POST",
      auth: true,
    }
  );
};

export const dashBoardApiFn = async () => {
  return apiFetch<DashBoardInfo>(`/application/recruiter/dashboard/info`, {
    auth: true,
  });
};

export const getUserProfileApiFn = async (userId: string) => {
  return apiFetch<GetCurrentUserProfileResponseType>(`/profile/getProfile/user/${userId}`, {
    auth: true,
  });
};

export const updateUserProfile = async (data: UpdateUserProfilePayloadType) => {
  return apiFetch<UpdateUserProfileResponseType>(`/profile/update/user`, {
    method: "PUT",
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

export const createMeetingApiFn = async (
  recruiterId: string,
  candidateId: string,
  data: {
    title: string;
    scheduledAt: Date | null | undefined;
    durationInMinutes: number;
    jobId: string;
  }
) => {
  return apiFetch<CreateMeetingResponse>(
    `/meeting/create/recruiter/${recruiterId}/candidate/${candidateId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    }
  );
};

export const getMeetingsApiFn = async () => {
  return apiFetch<GetUserMeetingsResponse>("/meeting/get", {
    auth: true,
  });
};
