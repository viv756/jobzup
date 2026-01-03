import z from "zod";

export const userIdSchema = z.string().trim().min(1, { message: "User ID is required" });

export const userSettingsSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email("Invalid email address").min(1).max(255),
  profilePicture: z.string().trim(),
  phone: z.string().trim(),
});

export const passwordChangingSchema = z.object({
  currentPassword: z.string().trim().min(4),
  newPassword: z.string().trim().min(4),
  confirmPassword: z.string().trim().min(4),
});

export const resumeMatchBodySchema = z
  .string()
  .min(50, "Job description is too short")
  .max(15000, "Job description is too long");
