import React from "react";
import JobsTable from "./_components/JobsTable";

const MyJobs = () => {
  return (
    <>
      <div className="h-20 flex items-center">
        <h1 className="font-satoshi font-medium text-3xl">My Jobs</h1>
        
     </div>
    <JobsTable />
    </>
  )
};

export default MyJobs;
