import { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Contrast,
  LogOut,
  MessageSquareMore,
  Settings,
  type LucideIcon,
  File,
  FilePlus,
  BriefcaseBusiness,
  Headset,
  Building2,
} from "lucide-react";

import { useAppSelector } from "../hooks/useSelector";
import { useAppDispatch } from "../hooks/useReducer";
import { logoutApiFn } from "../lib/api";
import { logout } from "../redux/user/user.slice";
import ConfirmModal from "./ConfirmModal";
import type { ConfirmModalHandle } from "./ConfirmModal";

type UserRole = "JOB_SEEKER" | "RECRUITER";

type SidebarLink = {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: UserRole[]; // optional field for role-based access
};

const SideBar = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const sidebarLinks: SidebarLink[] = [
    { label: "Dashboard", path: "/profile/dashboard", icon: Contrast, roles: ["RECRUITER"] },
    { label: "profile", path: "/profile/user", icon: Contrast, roles: ["JOB_SEEKER"] },
    { label: "My Jobs", path: "/profile/my-jobs", icon: BriefcaseBusiness, roles: ["RECRUITER"] },
    {
      label: "My Jobs",
      path: "/profile/applied-jobs",
      icon: BriefcaseBusiness,
      roles: ["JOB_SEEKER"],
    },
    { label: "Applications", path: "/profile/applicants", icon: File, roles: ["RECRUITER"] },
    {
      label: "Create New Job",
      path: `/profile/create/job/${currentUser?.company}`,
      icon: FilePlus,
      roles: ["RECRUITER"],
    },
    { label: "Company", path: "/profile/company", icon: Building2, roles: ["RECRUITER"] },
    { label: "Messages", path: "/profile/messages", icon: MessageSquareMore },
    { label: "Meetings", path: "/profile/meetings", icon: Headset },
    { label: "Settings", path: "/profile/settings", icon: Settings },
  ];

  const visibleLinks = sidebarLinks.filter((link) => {
    if (!link.roles) return true; // no restriction
    return link.roles.includes(currentUser?.role as UserRole); // show only if role matches
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const modalRef = useRef<ConfirmModalHandle>(null);

  const handleLogout = async () => {
    try {
      const data = await logoutApiFn();
      if (data) {
        dispatch(logout());
        toast.success(data.message);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#1844B5] min-h-screen min-w-[280px] fixed">
      <div className="p-8 pt-10 flex flex-col gap-8">
        <Link to={"/"}>
          <img src={"/jobzup_logo_dark.svg"} className="" alt="" />
        </Link>
        <ul className="flex flex-col justify-center text-center gap-2 text-white">
          {visibleLinks.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `rounded-md text-lg px-6 py-1 items-center transition duration-300 flex gap-2 font-dm
                   ${isActive ? "bg-white text-[#0A65FC]" : "hover:bg-white hover:text-[#0A65FC]"}`
                }>
                <Icon /> {label}
              </NavLink>
            </li>
          ))}

          <li>
            <button
              onClick={() => modalRef.current?.open()}
              className="rounded-md text-lg px-6 py-1 items-center transition duration-300 flex gap-2 font-dm hover:bg-white hover:text-[#0A65FC] w-full">
              <LogOut />
              Logout
            </button>
          </li>
        </ul>
      </div>
      <ConfirmModal
        ref={modalRef}
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default SideBar;
