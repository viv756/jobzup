import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../../../../components/Table";
import { getAllApplicantsApiFn } from "../../../../lib/api";
import type { Applicant } from "../../../../types/api.type";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Select from "./_components/Select";

const Applicants = () => {
  const [applications, setApplications] = useState<Applicant[]>();

  useEffect(() => {
    try {
      const fetchApplicants = async () => {
        const data = await getAllApplicantsApiFn();
        if (data) {
          setApplications(data.applications);
        }
      };

      fetchApplicants();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  return (
    <>
      <div className="h-20 flex items-center">
        <h1 className="font-dm font-medium text-3xl">Applicants</h1>
      </div>
      <div>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>
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
                <TableHeaderCell className="px-6 ">User Name</TableHeaderCell>
                <TableHeaderCell className="px-6 ">job applied</TableHeaderCell>
                <TableHeaderCell className="px-6 ">Applied date</TableHeaderCell>
                <TableHeaderCell className="px-25 ">Status</TableHeaderCell>
                <TableHeaderCell className="px-6"> </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications &&
                applications.map((application) => (
                  <TableRow key={application._id}>
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
                      <Link to={`/profile/${application.user._id}`} className="hover:text-blue-700">
                        <div className="flex items-center gap-3">
                          <img
                            src={application.user.profilePicture}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          {application.user.name}
                        </div>
                      </Link>
                    </th>
                    <TableCell className="px-6 py-4 font-dm">{application.job.title}</TableCell>
                    <TableCell className="px-6 py-4 font-dm">
                      {format(application.createdAt, "MMMM dd,yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-dm">
                      <Select applicationId={application._id} initialStatus={application.status} />
                    </TableCell>
                    <TableCell className="px-6 py-4 font-dm">
                      <div className="flex gap-3">
                        {/* <button className="btn font-medium ">send</button> */}
                        <button className="btn btn-primary font-medium">create meeting</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Applicants;
