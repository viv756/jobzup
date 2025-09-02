import DashCard from "./components/Dash_Card";
import SideBar from "./components/SideBar";

const DashBoard = () => {
  return (
    <>
      <SideBar />
      <div className="h-[1200px] bg-[#F2F4F7] pl-[300px]">
        <div className="h-30 flex items-center">
          <h1 className="text-3xl font-semibold">Welcome back!jen jav</h1>
        </div>
        <div className="flex gap-10">
          <DashCard />
          <DashCard />
          <DashCard />
          <DashCard />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
