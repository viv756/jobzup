import { useState } from "react";
import { applyToAJobApiFn } from "../../../lib/api";
import toast from "react-hot-toast";

interface Props {
  jobId: string;
  companyId: string;
  recruiterId: string;
}

const ApplyToAJob = ({ jobId, companyId, recruiterId }: Props) => {
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
    <div className="bg-black min-w-md rounded-2xl min-h-50 flex flex-col justify-center p-10 gap-8">
      <h3 className="text-white text-2xl font-roboto font-semibold">Interested in this job?</h3>
      <button
        onClick={applyToAJob}
        disabled={applicationSubmitting}
        className="bg-[#2453CC] p-3 rounded-3xl text-md font-roboto text-white w-40 hover:bg-blue-900 transition duration-200 ">
        Apply now
      </button>
    </div>
  );
};

export default ApplyToAJob;
