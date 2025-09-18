import z, { email } from "zod";

export const createCompanySchema = z.object({
  companyName: z.string().trim().min(1, { message: "Name is required" }).max(255),
  companySize: z.string().trim(),
  email: z.string().trim(),
  foundedIn: z.string(),
  avgSalary: z.string().trim(),
  location: z.string().trim(),
  about: z.string().trim(),
  phone: z.string().trim(),
  background: z.array(z.string().trim()),
  benefits: z.array(z.string().trim()),
  facebook: z.string().trim().optional(),
  instagram: z.string().trim().optional(),
  twitter: z.string().trim().optional(),
  companyLogo: z.string().trim(),
  websiteLink: z.string().trim().optional(),
});

export const updateCompanySchema = z.object({
  companyName: z.string().trim().min(1, { message: "Name is required" }).max(255),
  companySize: z.string().trim(),
  email: z.string().trim(),
  foundedIn: z.string(),
  avgSalary: z.string().trim(),
  location: z.string().trim(),
  about: z.string().trim(),
  phone: z.string().trim(),
  background: z.array(z.string().trim()),
  benefits: z.array(z.string().trim()),
  facebook: z.string().trim().optional(),
  instagram: z.string().trim().optional(),
  twitter: z.string().trim().optional(),
  companyLogo: z.string().trim(),
  websiteLink: z.string().trim().optional(),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;
export type UpdateCompanyType = z.infer<typeof updateCompanySchema>;
