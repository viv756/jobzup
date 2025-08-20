import type {
  CreateCompanyPayLoadType,
  CreateCompanyResponseType,
  CurrentUserResponseType,
  GetCurrentCompanyResponseType,
  LoginPayLoadType,
  LoginResponseType,
  RegisterPayloadType,
  RegisterResponseType,
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
  return apiFetch<{ message: string }>(`company/${companyId}/delete`, {
    auth: true,
  });
};
