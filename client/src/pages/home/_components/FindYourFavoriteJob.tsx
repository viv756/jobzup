import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllJobsApiFn } from "../../../lib/api";
import type { JobType } from "../../../types/api.type";
import JobCard from "../../jobs/_components/JobCard";

const FindYourFavoriteJob = () => {
  const [jobs, setJobs] = useState<JobType[]>();

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const data = await getAllJobsApiFn();
        if (data) {
          setJobs(data.jobs.slice(0, -4));
        }
      };

      fetchJobs();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  if (!jobs) {
    return (
      <div className="grid grid-cols-3 gap-10 mt-30">
        {Array.from({ length: 6 }).map((_, i) => (
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
      <div className="flex justify-between items-center mt-20">
        <h3 className="font-bold font-satoshi text-[55px] ">Find your favorite job</h3>
        <Link
          to={"/jobs/all"}
          className="p-2 h-10 bg-[#1844B5] text-white text-md px-7 rounded-3xl font-dm">
          View all jobs
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-10">
        {jobs?.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
    </>
  );
};

export default FindYourFavoriteJob;
