import { useEffect, useState } from "react";

import JobCard from "./JobCard";
import { getAllJobsApiFn } from "../../../lib/api";
import type { JobType } from "../../../types/api.type";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobType[]>();

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const data = await getAllJobsApiFn();
        setJobs(data.jobs);
      };
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10">
      {jobs?.map((job) => (
        <JobCard job={job} />
      ))}
    </div>
  );
};

export default Jobs;
