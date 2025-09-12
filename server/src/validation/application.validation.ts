import z from "zod";
import { ApplicationStatusEnum } from "../enums/application.enum";

export const recruiterIdSchema = z.string().trim().min(1, { message: "Recruiter ID is required" });

export const statusSchema = z.enum(Object.values(ApplicationStatusEnum) as [string, ...string[]])

export const applicationStatusSchema = z.object({
  status: statusSchema
});
