import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="px-2 sm:px-15">
      <Outlet />
    </div>
  );
};

export default AppLayout;
