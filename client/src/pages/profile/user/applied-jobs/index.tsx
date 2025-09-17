import JobsTable from "./_components/JobsTable";

const AppledJobs = () => {
  return (
    <>
      <div className="h-20 flex items-center">
        <h1 className="font-dm font-medium text-3xl">My Jobs</h1>
      </div>
      <JobsTable />
    </>
  );
};

export default AppledJobs;
