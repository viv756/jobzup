import { z } from "zod";

export const emailSchema = z.string().trim().email("Invalid email address").min(1).max(255);
const passwordScheama = z.string().trim().min(4);
export const RoleEnum = ["RECRUITER", "JOB_SEEKER", "ADMIN"] as const;


export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordScheama,
  confirmPassword: passwordScheama,
  role: z
  .string()
  .transform((val) => val.toUpperCase())
  .pipe(z.enum(RoleEnum)),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordScheama,
});
