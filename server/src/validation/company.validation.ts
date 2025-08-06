import z from "zod";

export const createCompanySchema = z.object({
  companyName: z.string().trim().min(1, { message: "Name is required" }).max(255),
  companySize: z.string().trim(),
  avgSalary: z.string().trim(),
  location: z.string().trim(),
  about: z.string().trim(),
  facebook: z.string().trim().optional(),
  instagram: z.string().trim().optional(),
  twitter: z.string().trim().optional(),
  companyLogo: z.string().trim(),
  websiteLink: z.string().trim().optional(),
});
