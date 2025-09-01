import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import JobCard from "./JobCard";
import { getAllJobsApiFn } from "../../../lib/api";
import type { JobType } from "../../../types/api.type";
import { useAppSelector } from "../../../hooks/useSelector";
import { setCachedResults } from "../../../redux/jobs/search.slice";
import { useAppDispatch } from "../../../hooks/useReducer";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobType[]>();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const { cachedResults } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const searchKey = urlParams.get("keyword") || "all";

      // ✅ If we already have cached results for this searchKey, use them
      if (searchKey && cachedResults[searchKey]) {
        setJobs(cachedResults[searchKey]);
        return; // stop here, don’t call API
      }

      // ✅ Otherwise, fetch from API
      const fetchJobs = async () => {
        const searchQuery = urlParams.toString();
        const data = await getAllJobsApiFn(searchQuery);
        setJobs(data.jobs);

        // Save to cache
        dispatch(setCachedResults({ searchKey, results: data.jobs }));
      };

      fetchJobs();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [location.search]);

  if (!jobs) {
    return (
      <div className="grid grid-cols-2 gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex w-[450px] flex-col gap-6" key={i}>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-7 w-40"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {jobs?.length === 0 && (
        <div className="mx-auto my-auto">
          <p className="font-semibold font-roboto text-4xl">No Jobs Found</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-10">
        {jobs?.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
    </>
  );
};

export default Jobs;
