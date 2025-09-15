import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { recentApplicantsApiFn } from "../../../../../lib/api";
import type { Applicant } from "../../../../../types/api.type";

const RecentApplicants = () => {
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>();
  const [loadng, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchApplicants = async () => {
        const data = await recentApplicantsApiFn();
        if (data) {
          setRecentApplicants(data.recentApplicants);
          setLoading(false);
        }
      };
      fetchApplicants();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  if (!recentApplicants && loadng) {
    return (
      <div className="bg-white w-130 p-8 rounded-md flex flex-col gap-3">
        <h1 className="font-satoshi font-medium text-2xl ">Recent Applicants</h1>
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex items-center gap-3" key={i}>
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-80"></div>
              <div className="skeleton h-4 w-80"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    recentApplicants && (
      <div className="bg-white w-130 p-8 rounded-md">
        <h1 className="font-satoshi font-medium text-2xl ">Recent Applicants</h1>
        <div className="flex flex-col gap-4 mt-7">
          {recentApplicants.map((applicant) => (
            <div className="flex  items-center gap-4 " key={applicant._id}>
              <img src={applicant.user.profilePicture} alt="" className="w-15 h-15 rounded-full" />
              <div className="flex flex-col">
                <Link to={`/profile/${applicant.user._id}`}>
                  <p className="font-dm text-[18px] hover:text-blue-700">{applicant.user.name}</p>
                </Link>

                <p className="font-dm text-[14px] text-wrap ">
                  Applied:{" "}
                  <Link to={`/job/${applicant.job._id}`}>
                    <span className="text-blue-700 ">{applicant.job.title}</span>
                  </Link>
                </p>
              </div>
            </div>
          ))}
          <Link
            to={`/profile/applicants`}
            className="p-2 hover:bg-blue-700 hover:text-white text-center border border-gray-300 rounded-xl font-dm transition duration-300 ">
            All applicants
          </Link>
        </div>
      </div>
    )
  );
};

export default RecentApplicants;
