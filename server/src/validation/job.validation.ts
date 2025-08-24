import z from "zod";
import { JobTypeEnum } from "../enums/job.enum";

export const companyIdSchema = z.string().trim().min(1, { message: "Company ID is required" });
export const jobIdSchema = z.string().trim().min(1, { message: "Job ID is required" });

export const closeDateSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: "Invalid date format. Please provide a valid date string.",
    }
  );

export const createJobSchema = z.object({
  title: z.string().trim().min(1).max(255),
  category: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(255),
  jobType: z.enum(Object.values(JobTypeEnum)),
  closeDate: closeDateSchema,
  hiringLocation: z.string().trim().min(1).max(255),
  experience: z.string().trim().optional(),
  salary: z.string().trim().min(1).max(255),
  responsibilities: z.array(z.string().trim()).optional(),
  requirements: z.array(z.string().trim()).optional(),
});

export type CreateJobType = z.infer<typeof createJobSchema>;
