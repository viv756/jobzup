import type {
  CreateCompanyPayLoadType,
  CreateCompanyResponseType,
  CreateJobPayloadType,
  CreateJobResponseType,
  CreateProfilePayloadType,
  CreateProfileResponseType,
  CurrentUserResponseType,
  GetAllJobsResponse,
  GetCurrentCompanyResponseType,
  GetCurrentUserProfileResponseType,
  GetJobByIdResponse,
  LoginPayLoadType,
  LoginResponseType,
  RegisterPayloadType,
  RegisterResponseType,
  UpdateUserProfilePayloadType,
  UpdateUserProfileResponseType,
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

export const createJobApiFn = async (data: CreateJobPayloadType, companyId: string) => {
  return apiFetch<CreateJobResponseType>(`/job/company/${companyId}/create/new`, {
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

export const getAllJobsApiFn = async () => {
  return apiFetch<GetAllJobsResponse>(`/job/all`, {
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
