import Jobs from "./_components/Jobs";
import SearchJobs from "./_components/SearchJobs";
import SidebarFilter from "./_components/SidebarFilter";

const AllJobs = () => {
  return (
    <div className="flex gap-15">
      <SidebarFilter />
      <div className="flex flex-col gap-4 w-full">
        <SearchJobs />
        <Jobs />
      </div>
    </div>
  );
};

export default AllJobs;
