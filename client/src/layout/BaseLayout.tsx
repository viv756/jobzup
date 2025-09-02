import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const BaseLayout = () => {
  return (
    <div className="px-2 sm:px-15">
      <Header />
      <Outlet />
    </div>
  );
};

export default BaseLayout
