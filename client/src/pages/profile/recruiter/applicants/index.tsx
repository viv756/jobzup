import ApplicantsTable from "./_components/ApplicantsTable";

const Applicants = () => {
  return (
    <>
      <div className="h-20 flex items-center">
        <h1 className="font-dm font-medium text-3xl">Applicants</h1>
      </div>
      <ApplicantsTable />
    </>
  );
};

export default Applicants;
