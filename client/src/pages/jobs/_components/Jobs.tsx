import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { cachedResults } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    urlParams.set("page", String(page));
    navigate(`?${urlParams.toString()}`);
  };

  useEffect(() => {
    try {
      const keyword = urlParams.get("keyword") || "all";
      const page = Number(urlParams.get("page")) || 1;
      const category = urlParams.get("category") || "all"

      const searchKey = `${keyword}-${page}-${category}`;

      if (cachedResults[searchKey]) {
        setJobs(cachedResults[searchKey]);
        setPageNumber(page);
        return;
      }

      const fetchJobs = async () => {
        const searchQuery = urlParams.toString();
        const data = await getAllJobsApiFn(searchQuery);

        setJobs(data.jobs);
        setPageNumber(data.pagination.pageNumber);
        setTotalPages(data.pagination.totalPages);

        dispatch(setCachedResults({ searchKey, results: data.jobs, }));
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
          <p className="font-semibold font-dm text-4xl">No Jobs Found</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-10">
        {jobs?.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
      <div className="join justify-center mt-10">
        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1;
          return (
            <input
              key={page}
              type="radio"
              name="pagination"
              aria-label={String(page)}
              className="join-item btn btn-square"
              checked={pageNumber === page}
              onChange={() => onPageChange(page)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Jobs;
