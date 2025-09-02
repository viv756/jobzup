import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

import type { JobType } from "../../../types/api.type";

const JobCard = ({ job }: { job: JobType }) => {
  
  return (
    <div className=" max-w-[450px] overflow-hidden rounded-xl bg-gray3 hover:bg-white shadow p-6 border border-secondary2">
      <div className="flex items-center gap-3">
        <img src={job.company.companyLogo} className="w-15 rounded-full" />
        <h1 className="text-[26px] font-semibold font-satoshi">{job.company.companyName}</h1>
      </div>
      <div className=" flex flex-col gap-3 mt-7">
        <h3 className="text-2xl text-gray-900 font-semibold font-satoshi">{job.title}</h3>
        <p className="mt-1 text-gray-500 text-[18px] font-dm">
          {job.description.length > 30 ? `${job.description.slice(0, 100)}....` : job.description}
        </p>
        <div className="mt-2 flex gap-4">
          <span className="inline-flex gap-1 items-center text-center">
            <CiLocationOn className="text-blue-700" size={20} /> {job.hiringLocation}
          </span>
          <span className="inline-flex items-center gap-1 text-center  ">
            <IoTimeOutline className="text-blue-700" />
            {job.jobType.replace("_", " ")}
          </span>
        </div>

        <Link
          to={`/job/${job._id}`}
          className="btn rounded-3xl text-lg bg-black text-white p-6 w-48 hover:bg-primary mt-5 font-dm font-normal">
          View details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
