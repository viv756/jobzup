import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { deleteJobApiFn, getAllJobsOfRecruiterApiFn } from "../../../../../lib/api";
import type { RecruiterJob } from "../../../../../types/api.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "../../../../../components/Table";
import Modal from "../../../../../components/Modal";
import ConfirmModal from "../../../../../components/ConfirmModal";
import CreateJob from "./Create-job";
import type { ConfirmModalHandle } from "../../../../../components/ConfirmModal";
import EditJob from "./EditJob";

const JobsTable = () => {
  const [jobs, setJobs] = useState<RecruiterJob[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isJobCreateModalOpen, setIsJobCreateModalOpen] = useState(false);
  const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState("");

  const confirmModalRef = useRef<ConfirmModalHandle>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

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

  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId);
    confirmModalRef.current?.open(); // open modal programmatically
  };

  const handleEditJob = (jobId: string) => {
    setJobToEdit(jobId);
    setIsJobEditModalOpen(true);
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
            <button
              onClick={() => setIsJobCreateModalOpen(true)}
              className="rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-5 py-2.5 text-center text-lg font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800">
              Create new job +
            </button>
          </div>
        </div>
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
              <TableHeaderCell className="px-6 ">posted-date</TableHeaderCell>
              <TableHeaderCell className="px-6 ">Category</TableHeaderCell>
              <TableHeaderCell className="px-6 ">close-date</TableHeaderCell>
              <TableHeaderCell className="px-6">applicants</TableHeaderCell>
              <TableHeaderCell className="px-6 ">Action</TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {jobs &&
              jobs.map((job) => (
                <TableRow key={job._id}>
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
                    <Link to={`/job/${job._id}`} className="hover:text-blue-700">
                      {" "}
                      {job.title}
                    </Link>
                  </th>
                  <TableCell className="px-6 py-4 font-dm">
                    {format(job.datePosted, "MMMM dd,yyyy")}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-dm">{job.category}</TableCell>
                  <TableCell className="px-6 py-4 font-dm">
                    {format(job.closeDate, "MMMM dd,yyyy")}
                  </TableCell>
                  <TableCell className="px-13 py-4 font-dm">{job.applicantsCount}</TableCell>
                  <TableCell className=" py-4 font-dm ">
                    <button
                      onClick={() => {
                        handleEditJob(job._id);
                      }}>
                      <span className="rounded-full border border-blue-700 hover:bg-blue-700 hover:text-white px-2.5 py-0.2 text-sm whitespace-nowrap text-blue-700">
                        Edit
                      </span>
                    </button>{" "}
                    <button
                      onClick={() => {
                        handleDeleteJob(job._id);
                      }}>
                      <span className="rounded-full border hover:bg-red-500 hover:text-white border-red-500 px-2.5 py-0.2 text-sm whitespace-nowrap text-red-500">
                        Delete
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

      <Modal isOpen={isJobCreateModalOpen} onClose={() => setIsJobCreateModalOpen(false)}>
        <CreateJob />
      </Modal>

      <Modal isOpen={isJobEditModalOpen} onClose={() => setIsJobEditModalOpen(false)}>
        <EditJob jobId={jobToEdit} />
      </Modal>

      <ConfirmModal
        ref={confirmModalRef}
        message="Are you sure you want to delete this job?"
        onConfirm={async () => {
          if (!jobToDelete) return;
          try {
            await deleteJobApiFn(jobToDelete);
            toast.success("Job deleted successfully");
            setJobs((prev) => prev?.filter((job) => job._id !== jobToDelete)); // update UI
          } catch (error: any) {
            toast.error(error.message || "Failed to delete job");
          } finally {
            setJobToDelete(null);
          }
        }}
      />
    </div>
  );
};

export default JobsTable;
