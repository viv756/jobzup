import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <>
      <SideBar />
      <div className="h-[1200px] bg-[#F2F4F7] pl-[300px]">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
