import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { getAllJobsOfRecruiterApiFn } from "../../../../../lib/api";
import type { RecruiterJob } from "../../../../../types/api.type";

const JobsTable = () => {
  const [jobs, setJobs] = useState<RecruiterJob[]>();

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const data = await getAllJobsOfRecruiterApiFn();
        if (data) {
          setJobs(data.result);
        }
      };

      fetchJobs();
    } catch (error) {}
  }, []);

  return (
    <div className="">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="pb-4 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 ml-3 pt-3">
            <input
              type="text"
              id="table-search"
              className="block pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg h-12 w-80 bg-gray-50  focus:outline-blue-700"
              placeholder="Search jobs"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 "
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                job name
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                posted
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                applicants
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job) => (
                <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <Link to={`/job/${job._id}`} className="hover:text-blue-700"> {job.title}</Link>
                  </th>
                  <td className="px-6 py-4 font-dm">{format(job.datePosted, "MMMM dd,yyyy")}</td>
                  <td className="px-6 py-4 font-dm">{job.category}</td>
                  <td className="px-13 py-4 font-dm">{job.applicantsCount}</td>
                  <td className="px-4 py-4 font-dm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>{" "}
                    <a href="#" className="font-medium text-red-600  hover:underline ">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
