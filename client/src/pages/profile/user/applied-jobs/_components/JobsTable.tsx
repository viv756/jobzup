import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { cancelApplicationApiFn, getUserAppliedJobsApiFn } from "../../../../../lib/api";
import type { AppliedJobs } from "../../../../../types/api.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "../../../../../components/Table";
import ConfirmModal from "../../../../../components/ConfirmModal";

import type { ConfirmModalHandle } from "../../../../../components/ConfirmModal";

const JobsTable = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobs[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [jobToCancel, setJobToCancel] = useState<string | null>(null);

  const confirmModalRef = useRef<ConfirmModalHandle>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const searchQuery = urlParams.toString();
        const data = await getUserAppliedJobsApiFn(searchQuery);
        if (data) {
          setAppliedJobs(data.appliedJobs);
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
    navigate(`/profile/my-appliedJobs?${urlParams.toString()}`);
  };

  const handleCancelJob = (jobId: string) => {
    setJobToCancel(jobId);
    confirmModalRef.current?.open(); // open modal programmatically
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeaderCell className="">
                <div className="flex items-center px-4">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4  text-blue-600 accent-blue-700 bg-blue-700 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 "
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </TableHeaderCell>
              <TableHeaderCell className="px-6 ">job name</TableHeaderCell>
              <TableHeaderCell className="px-6 ">applied-date</TableHeaderCell>
              <TableHeaderCell className="px-6 ">close-date</TableHeaderCell>
              <TableHeaderCell className="px-6">status</TableHeaderCell>
              <TableHeaderCell className="px-6 ">Action</TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {appliedJobs &&
              appliedJobs.map((j) => (
                <TableRow key={j._id}>
                  <TableCell className="">
                    <div className="flex items-center px-4">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 accent-blue-700 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </TableCell>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <Link to={`/job/${j.job._id}`} className="hover:text-blue-700">
                      {" "}
                      {j.job.title}
                    </Link>
                  </th>
                  <TableCell className="px-6 py-4 font-dm">
                    {format(j.createdAt, "MMMM dd,yyyy")}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-dm">
                    {format(j.job.closeDate, "MMMM dd,yyyy")}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-dm">{j.status}</TableCell>
                  <TableCell className=" py-4 font-dm ">
                    <button
                      onClick={() => {
                        handleCancelJob(j._id);
                      }}>
                      <span className="rounded-full border hover:bg-red-500 hover:text-white border-red-500 px-2.5 py-0.2 text-sm whitespace-nowrap text-red-500">
                        Cancel
                      </span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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

      <ConfirmModal
        ref={confirmModalRef}
        message="Are you sure you want to cancel the application?"
        onConfirm={async () => {
          if (!jobToCancel) return;
          try {
            await cancelApplicationApiFn(jobToCancel);
            toast.success("Job application canceled successfully");
            setAppliedJobs((prev) => prev?.filter((j) => j._id !== jobToCancel)); // update UI
          } catch (error: any) {
            toast.error(error.message || "Failed to cancel job application");
          } finally {
            setJobToCancel(null);
          }
        }}
      />
    </div>
  );
};

export default JobsTable;
