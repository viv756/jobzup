import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BaseLayout = () => {
  return (
    <>
      <div className="px-2 sm:px-15 max-w-[1800px] mx-auto">
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
