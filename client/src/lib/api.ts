import type { LoginPayLoadType, LoginResponseType, RegisterPayloadType, RegisterResponseType } from "../types/api.type";
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
