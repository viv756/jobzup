import z from "zod";

export const recruiterIdSchema = z.string().trim().min(1, { message: "Recruiter ID is required" });
