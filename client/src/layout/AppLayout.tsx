import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="px-2 sm:px-15">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
