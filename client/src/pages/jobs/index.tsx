import Jobs from "./_components/Jobs";
import SidebarFilter from "./_components/SidebarFilter";

const AllJobs = () => {
  return (
    <div className="flex gap-15">
      <SidebarFilter />
      <div>
        <Jobs />
      </div>
    </div>
  );
};

export default AllJobs;
