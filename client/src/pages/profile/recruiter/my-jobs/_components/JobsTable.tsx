import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { getAllJobsOfRecruiterApiFn } from "../../../../../lib/api";
import type { RecruiterJob } from "../../../../../types/api.type";

const JobsTable = () => {
  const [jobs, setJobs] = useState<RecruiterJob[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey.trim()) {
        urlParams.set("keyword", searchKey.trim());
      } else {
        urlParams.delete("keyword");
      }

      navigate(`/profile/my-jobs?${urlParams.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchKey]);

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const searchQuery = urlParams.toString();
        const data = await getAllJobsOfRecruiterApiFn(searchQuery);
        if (data) {
          setJobs(data.jobs);
          setPageNumber(data.pageNumber);
          setTotalPages(data.totalPages);
        }
      };

      fetchJobs();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [location.search]);

  const onPageChange = (newPage: number) => {
    urlParams.set("page", String(newPage));
    navigate(`/profile/my-jobs?${urlParams.toString()}`);
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="pb-4 bg-white flex justify-between items-center pt-3 pr-3">
          <div className="pl-3">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative ">
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                type="text"
                id="table-search"
                className="block pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg h-12 w-80 bg-gray-50  focus:outline-blue-700"
                placeholder="Search jobs"
              />
            </div>
          </div>
          <div>
            <button className="rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-5 py-2.5 text-center text-lg font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800">
              Create new job +
            </button>
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
                    className="w-4 h-4 text-blue-600 accent-blue-700 bg-blue-700 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 "
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
                posted-date
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-dm">
                close-date
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
                <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 " key={job._id}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 accent-blue-700 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <Link to={`/job/${job._id}`} className="hover:text-blue-700">
                      {" "}
                      {job.title}
                    </Link>
                  </th>
                  <td className="px-6 py-4 font-dm">{format(job.datePosted, "MMMM dd,yyyy")}</td>
                  <td className="px-6 py-4 font-dm">{job.category}</td>
                  <td className="px-6 py-4 font-dm">{format(job.closeDate, "MMMM dd,yyyy")}</td>
                  <td className="px-13 py-4 font-dm">{job.applicantsCount}</td>
                  <td className=" py-4 font-dm ">
                    <Link to={""}>
                      <span className="rounded-full border border-blue-700 hover:bg-blue-700 hover:text-white px-2.5 py-0.2 text-sm whitespace-nowrap text-blue-700">
                        Edit
                      </span>
                    </Link>{" "}
                    <Link to={""}>
                      <span className="rounded-full border hover:bg-red-500 hover:text-white border-red-500 px-2.5 py-0.2 text-sm whitespace-nowrap text-red-500">
                        Delete
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end ">
        <button
          className="join-item btn "
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 1}>
          «
        </button>
        <button className="join-item btn ">{pageNumber}</button>
        <button
          className="join-item btn"
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}>
          »
        </button>
      </div>
    </div>
  );
};

export default JobsTable;
