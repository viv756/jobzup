import type { ResumeAnalysisResult } from "..";
import Loader from "../../../components/Loader";

type Props = {
  result: ResumeAnalysisResult | null;
  loading: boolean;
};

function getMatchFeedback(percentage: number) {
  if (percentage >= 85) {
    return {
      title: "Excellent Match!",
      message:
        "Your profile is highly aligned with this job description. You have a strong chance!",
      color: "text-green-600",
    };
  }

  if (percentage >= 70) {
    return {
      title: "Good Match",
      message:
        "Your profile matches most of the requirements. A few improvements could increase your chances.",
      color: "text-blue-600",
    };
  }

  if (percentage >= 50) {
    return {
      title: "Fair Match",
      message: "Your profile meets some requirements, but there are noticeable gaps to address.",
      color: "text-yellow-600",
    };
  }

  return {
    title: "Low Match",
    message:
      "Your profile does not align well with this role yet. Consider updating your resume before applying.",
    color: "text-red-600",
  };
}

const AiAnalyzer = ({ result, loading }: Props) => {
  if (loading) {
    return (
      <div className="px-7 overflow-hidden">
        <div className="border-dashed h-[640px] w-full rounded-2xl border border-blue-600 pb-2 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="px-7 overflow-hidden">
        <div className="border-dashed h-[640px] w-full rounded-2xl border border-blue-600 pb-2 flex flex-col">
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-satoshi font-medium"> Ready to Analyze</h1>
            <p className="text-gray-500 font-satoshi px-4 text-center">
              Upload your resume and paste the job description to see detailed insights here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const percentage = result.match_percentage;
  const feedback = getMatchFeedback(percentage);

  const color =
    percentage >= 75
      ? "#16A34A" // green
      : percentage >= 50
      ? "#F59E0B" // amber
      : "#DC2626"; // red

  return (
    <div className="px-7 overflow-hidden">
      <div className="border-dashed h-[640px] w-full rounded-2xl border border-blue-600 pb-2 flex flex-col">
        {/* Header */}
        <div className="flex  p-5 gap-6 items-center justify-center">
          <div>
            <div
              className="relative w-25 h-25 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${color} ${percentage * 3.6}deg, #E5E7EB 0deg)`,
              }}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold" style={{ color }}>
                  {percentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className={`text-lg font-semibold ${feedback.color}`}>{feedback.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{feedback.message}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 p-4 font-satoshi border-t border-blue-400 border-dashed space-y-4 scroll-smooth">
          <h3 className="font-medium">Matched Skills</h3>
          <div className="flex flex-wrap gap-1">
            {result.matched_skills.map((skill, i) => (
              <span key={i} className="badge badge-success">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-medium">Missing Skills</h3>
          <div className="flex flex-wrap gap-1">
            {result.missing_skills.map((skill, i) => (
              <span key={i} className="badge badge-error">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-semibold text-base">Resume Match Summary</h3>
          <p>{result.resume_fit_summary}</p>

          <h3 className="font-semibold text-base">Recommended Improvements</h3>
          <ul className="list-disc list-inside space-y-2">
            {result.action_items.map((action, i) => (
              <li key={i} className="text-sm text-gray-700">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiAnalyzer;
