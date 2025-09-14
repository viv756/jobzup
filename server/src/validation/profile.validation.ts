import z from "zod";

export const workExperienceSchema = z
  .array(
    z.object({
      company: z.string().trim(),
      position: z.string().trim(),
      startDate: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => {
            return !val || !isNaN(Date.parse(val));
          },
          {
            message: "Invalid date format. Please provide a valid date string.",
          }
        ),
      endDate: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => {
            return !val || !isNaN(Date.parse(val));
          },
          {
            message: "Invalid date format. Please provide a valid date string.",
          }
        ),
      description: z.string().trim().nullable().default(null),
    })
  )
  .optional();

export const educationSchema = z
  .array(
    z.object({
      collegeName: z.string().trim(),
      department: z.string().trim(),
      startDate: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => {
            return !val || !isNaN(Date.parse(val));
          },
          {
            message: "Invalid date format. Please provide a valid date string.",
          }
        ),
      endDate: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => {
            return !val || !isNaN(Date.parse(val));
          },
          {
            message: "Invalid date format. Please provide a valid date string.",
          }
        ),
      description: z.string().trim().nullable().default(null),
    })
  )
  .optional();

export const awardSchema = z
  .array(
    z.object({
      name: z.string().trim(),
      date: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => {
            return !val || !isNaN(Date.parse(val));
          },
          {
            message: "Invalid date format. Please provide a valid date string.",
          }
        ),
      description: z.string().trim().nullable().default(null),
    })
  )
  .optional();

export const createProfileSchema = z.object({
  bio: z.string().trim().optional(),
  location: z.string().trim().optional(),
  language: z.array(z.string().trim()).optional(),
  skills: z.array(z.string().trim()).optional(),
  workExperience: workExperienceSchema,
  education: educationSchema,
  awards: awardSchema,
  phone: z.string().trim().optional(),
  qualification: z.string().trim().nullable().default(null),
  gender: z.enum(["male", "female", "other"]).nullable().default(null),
  age: z.string().trim().nullable().default(null),
  profileUrl: z.string().optional(),
});

export const updateProfileSchema = z.object({
  bio: z.string().trim().optional(),
  location: z.string().trim().optional(),
  language: z.array(z.string().trim()).optional(),
  skills: z.array(z.string().trim()).optional(),
  workExperiance: workExperienceSchema,
  education: educationSchema,
  phone: z.string().trim().optional(),
  awards: awardSchema,
  qualification: z.string().trim().nullable().default(null),
  gender: z.enum(["Male", "Female", "Other"]).nullable().default(null),
  age: z.string().trim().nullable().default(null),
});

export type CreateProfileType = z.infer<typeof createProfileSchema>;
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
