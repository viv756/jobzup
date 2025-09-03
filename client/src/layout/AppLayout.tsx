import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <>
      <SideBar />
      <div className="bg-[#F2F4F7] pl-[310px] pr-[30px]">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
