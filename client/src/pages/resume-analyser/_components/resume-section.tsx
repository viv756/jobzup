import React from "react";

type Props = {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (val: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
};

const ResumeSection = ({
  resumeFile,
  setResumeFile,
  jobDescription,
  setJobDescription,
  onAnalyze,
  loading,
  error,
}: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    setResumeFile(file);
  };

  return (
    <div className="flex flex-col gap-7 h-full">
      {/* Upload Resume */}
      <div className="border border-blue-600 rounded-2xl flex flex-col p-5">
        <h2 className="text-xl font-satoshi font-semibold">Upload Resume</h2>

        <label
          htmlFor="dropzone-file"
          className="flex mt-4 flex-col items-center w-full max-w-lg p-5 mx-auto text-center bg-white border-2 border-blue-300 border-dashed cursor-pointer rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-gray-500">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>

          <h2 className="mt-1 font-medium tracking-wide text-gray-700">
            {resumeFile ? resumeFile.name : "Upload your resume"}
          </h2>

          <p className="mt-2 text-xs tracking-wide text-gray-500">
            PDF only · Click or drag & drop
          </p>

          <input
            id="dropzone-file"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Job Description */}
      <div className="border border-blue-500 p-8 rounded-2xl">
        <h2 className="block font-satoshi font-semibold text-xl">Job Description</h2>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="block mt-2 w-full h-60 rounded-lg border bg-white px-4 py-2.5 text-gray-700 border-blue-400 outline-none ring ring-blue-300 focus:ring-opacity-40"
          placeholder="Paste the job description here..."
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      {/* Submit */}
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="font-satoshi px-6 py-2 font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 disabled:opacity-50">
        {loading ? "Analyzing..." : "Run Analyse"}
      </button>
    </div>
  );
};

export default ResumeSection;
