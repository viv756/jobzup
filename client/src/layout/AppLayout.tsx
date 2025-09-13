import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import DashHeader from "../components/DashHeader";

const AppLayout = () => {
  return (
    <>
      <SideBar />
      <div className="pl-[310px] pr-[30px]">
        <DashHeader />
      </div>
      <div className="bg-[#F2F4F7] pl-[310px] pr-[30px]">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
