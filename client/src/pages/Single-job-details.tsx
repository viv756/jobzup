import { BriefcaseBusiness, CalendarPlus2, LocateFixed, PieChart, Search } from "lucide-react";
import { CalendarX2 } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getJobByIdApiFn } from "../lib/api";
import { Link, useParams } from "react-router-dom";
import type { JobType } from "../types/api.type";
import toast from "react-hot-toast";
import InfoCard from "../components/InfoCard";
import { MapPin } from "lucide-react";

const SingleJobDetails = () => {
  const [job, setJob] = useState<JobType>();
  const { jobId } = useParams();

  useEffect(() => {
    console.log("first");

    try {
      const fetchPost = async () => {
        const data = await getJobByIdApiFn(jobId as string);
        if (data) {
          setJob(data.job);
        }
      };
      fetchPost();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  if (!job) {
    return <div>Loading.....</div>;
  }

  console.log(job);

  return (
    <div className="sm:px-15">
      {/* Header */}
      <div className="bg-[#2453CC] flex rounded-2xl min-h-[180px] items-center p-5 pl-13 gap-7">
        <div className="bg-white rounded-full p-3">
          <img src="/c_logo1.svg" alt="" className="w-18" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-roboto font-semibold ">{job.title}</h1>
          <div className="text-white flex gap-6 text-md ">
            <span className="text-white text-lg flex items-center gap-2">
              <MapPin size={17} /> {job.hiringLocation}
            </span>
            <span className="text-white text-lg flex items-center gap-2">
              <BriefcaseBusiness size={17} /> {job.category}
            </span>
            <span className="text-white text-lg flex items-center gap-2">
              <PieChart size={17} /> {job.jobType.replace("_", "-")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-20 sm:flex gap-30">
        <div>
          <h2 className="text-3xl font-semibold font-roboto text-gray-800">Job description</h2>
          <hr className="border border-gray-300 mt-5" />
          <p className="text-lg mt-6">{job.description}</p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <InfoCard
              icon={<CalendarPlus2 color="#2A5AD8" />}
              title="Date posted"
              content={job?.datePosted ? format(new Date(job.datePosted), "MMMM d, yyyy") : "N/A"}
            />
            <InfoCard
              icon={<CalendarX2 color="#2A5AD8" />}
              title="Close date"
              content={job?.closeDate ? format(new Date(job.closeDate), "MMMM d,yyyy") : "N/A"}
            />
            <InfoCard
              icon={<LocateFixed color="#2A5AD8" />}
              title="Hiring Location"
              content={job.hiringLocation}
            />
            <InfoCard
              icon={<Search color="#2A5AD8" />}
              title="Experience"
              content={job?.experience}
            />
            <InfoCard
              icon={<BriefcaseBusiness color="#2A5AD8" />}
              title="Department"
              content={job?.category}
            />
            <InfoCard
              icon={<BriefcaseBusiness color="#2A5AD8" />}
              title="Salary"
              content={`$ ${job?.salary} USD`}
            />
          </div>

          <div className="mt-10">
            <h1 className="text-gray-800 text-3xl font-roboto font-semibold ">Responsibilities</h1>
            <hr className="border border-gray-300 mt-5" />
            <ol className="mt-5 list-disc list-outside ">
              {job &&
                job.responsibilities.map((resp, i) => (
                  <li key={i} className="text-md mt-1">
                    {resp}
                  </li>
                ))}
            </ol>
            <h1 className="text-gray-800 text-3xl font-roboto font-semibold mt-8">
              Job Requirements
            </h1>
            <hr className="border border-gray-300 mt-5" />
            <ol className="mt-5 list-disc list-outside ">
              {job &&
                job.requirements.map((req, i) => (
                  <li key={i} className="text-md mt-1">
                    {req}
                  </li>
                ))}
            </ol>
          </div>
        </div>

        <div>
          <div className="bg-black min-w-md rounded-2xl min-h-50 flex flex-col justify-center p-10 gap-8">
            <h3 className="text-white text-2xl font-roboto font-semibold">
              Interested in this job?
            </h3>
            <button className="bg-[#2453CC] p-3 rounded-3xl text-md font-roboto text-white w-40 hover:bg-blue-900 transition duration-200 ">
              Apply now
            </button>
          </div>

          <div className="p-10 shadow-xl rounded-2xl mt-10 w-120 bg-white">
            <div className="flex items-center gap-5">
              <img src={job.company.companyLogo} alt="" className="w-20" />
              <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold font-roboto">{job.company.companyName}</h1>
                <p className="text-gray-500"> {job.company.location} </p>
              </div>
            </div>

            <p className="mt-5 text-lg text-gray-500 font-roboto">{job.company.about}</p>

            <div className="grid grid-cols-2 gap-3 mt-5 ">
              <p className="text-lg">Company size</p>
              <p className="text-lg"> {job.company.companySize} </p>
              <p className="text-lg">Founded in</p>
              <p className="text-lg">{job.company.foundedIn}</p>
              <p className="text-lg">Phone</p>
              <p className="text-lg">{job.company.phone}</p>
              <p className="text-lg">Email</p>
              <p className="text-lg ">{job.company.email}</p>
            </div>

            <Link to={`/company/${job.company._id}`}>
              <button className="p-3 text-[18px] font-roboto bg-black text-white w-full mt-8  rounded-3xl hover:bg-blue-800 transition duration-300">
                View Company
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetails;
