import { useState } from "react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

import { applyToAJobApiFn } from "../../../lib/api";

interface Props {
  jobId: string;
  companyId: string;
  recruiterId: string;
  matchScore: string | undefined;
}

const ApplyToAJob = ({ jobId, companyId, recruiterId, matchScore }: Props) => {
  const [applicationSubmitting, setApplicationSubmitting] = useState<boolean>(false);

  const applyToAJob = async () => {
    try {
      setApplicationSubmitting(true);
      const data = await applyToAJobApiFn(jobId as string, companyId, recruiterId);
      if (data) {
        toast.success(data.message);
        setApplicationSubmitting(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setApplicationSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-w-md rounded-2xl min-h-50 flex flex-col justify-center p-10 gap-5">
      <h3 className="text-white text-2xl font-satoshi font-semibold">Interested in this job?</h3>

      {matchScore && (
        <div className="relative group flex justify-between">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-generated job match score : {matchScore}% match
          </div>
        </div>
      )}

      <button
        onClick={applyToAJob}
        disabled={applicationSubmitting}
        className="bg-[#2453CC] p-3 rounded-3xl text-md font-dm text-white w-40 hover:bg-blue-900 transition duration-200 disabled:bg-blue-900">
        {applicationSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Apply now"
        )}
      </button>
    </div>
  );
};

export default ApplyToAJob;
