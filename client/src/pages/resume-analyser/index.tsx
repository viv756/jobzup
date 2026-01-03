import { useState } from "react";

import ResumeSection from "./_components/resume-section";
import AiAnalyzer from "./_components/ai-analyzer";
import { baseURL } from "../../lib/baseUrl";

export type ResumeAnalysisResult = {
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  resume_fit_summary: string;
  action_items: string[];
};

const ResumeAnalyser = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError("Please upload a resume PDF");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const res = await fetch(`${baseURL}/user/resume/analyzer`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await res.json();
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center gap-3 mt-8">
        <h1 className="text-center text-5xl font-satoshi font-bold">
          AI Resume <span className="text-[#2454CE]">Analyzer</span>
        </h1>
        <div className="flex items-center flex-col">
          <p className="text-lg font-satoshi">
            Evaluate your resume’s ATS compatibility, keyword alignment, and structure.
          </p>
          <p className="text-base text-muted-foreground font-satoshi">
            Upload your resume and provide the job description to begin analysis.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 h-full sm:px-20 px-2 mt-10 gap-5 sm:gap-0">
        <ResumeSection
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
        />
        <AiAnalyzer result={result} loading={loading} />
      </div>
    </>
  );
};

export default ResumeAnalyser;
