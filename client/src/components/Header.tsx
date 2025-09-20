import { useRef } from "react";
import { Link } from "react-router-dom";
import { LuCirclePower } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { LogOut } from "lucide-react";

import { useAppSelector } from "../hooks/useSelector";

import type { ConfirmModalHandle } from "./ConfirmModal";
import ConfirmModal from "./ConfirmModal";
import { useLogout } from "../hooks/api/useLogout";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs/all" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const { currentUser } = useAppSelector((store) => store.user);
   const handleLogout = useLogout();


  const modalRef = useRef<ConfirmModalHandle>(null);

  return (
    <div className="sticky top-0 bg-white">
      <div className=" mx-auto flex justify-between h-[100px] ">
        <Link to={"/"} className="flex items-center">
          <img src="/jobzup_logo.svg" className="sm:w-[170px] w-[150px] " alt="" />
        </Link>
        <ul className="hidden sm:flex gap-6 items-center">
          {NavLinks.map((nav) => (
            <li key={nav.path} className="text-xl font-dm">
              <Link to={nav.path}>{nav.name}</Link>
            </li>
          ))}
        </ul>

        <div className="sm:flex gap-5 items-center hidden">
          {currentUser ? (
            <>
              {currentUser.role === "RECRUITER" ? (
                <Link to={`/profile/dashboard`} className="flex items-center gap-x-3">
                  <img
                    src={currentUser.profilePicture}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link to={`/profile/user`} className="flex items-center gap-x-3">
                  <img
                    src={currentUser.profilePicture}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </Link>
              )}
              <button
                onClick={() => modalRef.current?.open()}
                className="btn rounded-3xl text-lg p-6 bg-primary text-white">
                <LogOut />
              </button>
            </>
          ) : (
            <Link to={"/sign-in"} className="btn rounded-3xl text-lg p-6 w-36">
              <LuCirclePower /> Login
            </Link>
          )}

          {/* <button className="btn rounded-3xl text-lg bg-black text-white p-6 w-36 hover:bg-primary">
            Post a job
          </button> */}
        </div>
        <div className=" flex items-center sm:hidden">
          <button className="rounded-xl p-2 bg-primary text-white ">
            <GiHamburgerMenu size={25} />
          </button>
        </div>
      </div>
      <ConfirmModal
        ref={modalRef}
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Header;
