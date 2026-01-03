import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/app.config";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0,
    topK: 1,
    topP: 1,
  },
});

function sanitizeResponse(json: any) {
  return {
    match_percentage: Math.min(100, Math.max(0, json.match_percentage || 0)),
    matched_skills: [...new Set(json.matched_skills || [])],
    missing_skills: [...new Set(json.missing_skills || [])],
    resume_fit_summary: json.resume_fit_summary || "",
    action_items: json.action_items || [],
  };
}

export async function getResumeMatch({
  resumeText,
  jobDescription,
}: {
  resumeText: string;
  jobDescription: string;
}) {
  const prompt = `
You are an AI resume improvement assistant for jobseekers.

Compare the RESUME and JOB DESCRIPTION.

Return STRICT JSON only.
Do not wrap in markdown.
Do not include explanations.

JSON format:
{
  "match_percentage": number,
  "matched_skills": string[],
  "missing_skills": string[],
  "resume_fit_summary": string,
  "action_items": string[]
}

Rules:
- matched_skills must appear in BOTH resume and job description
- missing_skills must appear in job description but NOT in resume
- resume_fit_summary must be 1 or 2 encouraging sentences
- action_items must be practical and resume-focused

IMPORTANT:
- Use ONLY skills explicitly mentioned.
- Do NOT infer or generalize skills.
- Do NOT reword skills.

RESUME:
"""${resumeText}"""

JOB DESCRIPTION:
"""${jobDescription}"""
`;

  const result = await model.generateContent(prompt);

  const responseText = result.response.text();
  try {
    const json = JSON.parse(responseText);
    return sanitizeResponse(json);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }
}
