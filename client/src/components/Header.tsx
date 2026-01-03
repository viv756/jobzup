import { useRef } from "react";
import { Link } from "react-router-dom";
import { LuCirclePower } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { LogOut, Contrast, User } from "lucide-react";

import { useAppSelector } from "../hooks/useSelector";
import { useLogout } from "../hooks/api/useLogout";

import type { ConfirmModalHandle } from "./ConfirmModal";
import ConfirmModal from "./ConfirmModal";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs/all" },
  { name: "Resume analyser", path: "/resume-analyser" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const { currentUser } = useAppSelector((store) => store.user);
  const handleLogout = useLogout();

  const modalRef = useRef<ConfirmModalHandle>(null);

  return (
    <div className=" top-0 bg-white">
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
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <img
                      src={currentUser.profilePicture}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li className="font-dm text-[15px]">
                      <Link to={`/profile/dashboard`}>
                        <Contrast size={15} />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => modalRef.current?.open()}
                        className="font-dm  text-[15px]">
                        <LogOut size={15} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <img
                      src={currentUser.profilePicture}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li className="font-dm  text-[15px]">
                      <Link to={`/profile/user`}>
                        <User />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => modalRef.current?.open()}
                        className="font-dm  text-[15px]">
                        <LogOut size={15} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
