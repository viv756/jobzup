import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BaseLayout = () => {
  return (
    <>
      <div className="px-2 sm:px-15">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
