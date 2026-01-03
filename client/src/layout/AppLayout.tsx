import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import DashHeader from "../components/DashHeader";

const AppLayout = () => {
  return (
    <div className="max-w-[1800px] mx-auto">
      <SideBar />
      <div className="px-2 sm:pl-[310px] sm:pr-[30px]">
        <DashHeader />
      </div>
      <div className="bg-[#F2F4F7] sm:pl-[310px] sm:pr-[30px] px-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
