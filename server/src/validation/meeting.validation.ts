import z from "zod";

export const meetingSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  jobId: z.string(), // MongoDB ObjectId
  scheduledAt: z.date(), // coerce handles ISO strings → Date
  durationInMinutes: z.number().min(15).max(180).default(30), // min 15, max 3hr
});
