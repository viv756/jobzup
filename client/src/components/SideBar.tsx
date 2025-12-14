import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Contrast,
  LogOut,
  MessageSquareMore,
  Settings,
  User,
  File,
  BriefcaseBusiness,
  Headset,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useAppSelector } from "../hooks/useSelector";
import ConfirmModal from "./ConfirmModal";
import type { ConfirmModalHandle } from "./ConfirmModal";
import { useLogout } from "../hooks/api/useLogout";

type UserRole = "JOB_SEEKER" | "RECRUITER";

type SidebarLink = {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: UserRole[]; // optional field for role-based access
};

const SideBar = () => {
  const { currentUser } = useAppSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = useLogout();

  const sidebarLinks: SidebarLink[] = [
    { label: "Dashboard", path: "/profile/dashboard", icon: Contrast, roles: ["RECRUITER"] },
    { label: "profile", path: "/profile/user", icon: User, roles: ["JOB_SEEKER"] },
    { label: "My Jobs", path: "/profile/my-jobs", icon: BriefcaseBusiness, roles: ["RECRUITER"] },
    {
      label: "My Jobs",
      path: "/profile/applied-jobs",
      icon: BriefcaseBusiness,
      roles: ["JOB_SEEKER"],
    },
    { label: "Applications", path: "/profile/applicants", icon: File, roles: ["RECRUITER"] },
    { label: "Company", path: "/profile/company", icon: Building2, roles: ["RECRUITER"] },
    { label: "Messages", path: "/profile/messages", icon: MessageSquareMore },
    { label: "Meetings", path: "/profile/meetings", icon: Headset },
    // { label: "Pricing", path: "/profile/price", icon: DollarSign, roles: ["RECRUITER"] },
    { label: "Settings", path: "/profile/settings", icon: Settings },
  ];

  const visibleLinks = sidebarLinks.filter((link) => {
    if (!link.roles) return true; // no restriction
    return link.roles.includes(currentUser?.role as UserRole); // show only if role matches
  });

  const modalRef = useRef<ConfirmModalHandle>(null);

  return (
    <>
      {/* Hamburger */}
      <div className="fixed top-80  z-50 sm:hidden">
        <button onClick={() => setIsOpen(true)} className="bg-[#1844B5] p-1 rounded-md">
          <GiHamburgerMenu size={22} color="#ffff" />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
      fixed top-0 left-0 z-50
      min-h-screen w-[280px] bg-[#1844B5]
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      sm:translate-x-0 sm:block
    `}>
        <div className="p-8 pt-10 flex flex-col gap-8">
          <Link to="/">
            <img src="/jobzup_logo_dark.svg" alt="" />
          </Link>

          <ul className="flex flex-col gap-2 text-white">
            {visibleLinks.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setIsOpen(false)} // auto close on mobile
                  className={({ isActive }) =>
                    `rounded-md text-lg px-6 py-2 flex gap-2 transition
                ${isActive ? "bg-white text-[#0A65FC]" : "hover:bg-white hover:text-[#0A65FC]"}`
                  }>
                  <Icon /> {label}
                </NavLink>
              </li>
            ))}

            <li>
              {" "}
              <button
                onClick={() => modalRef.current?.open()}
                className="rounded-md text-lg px-6 py-1 items-center transition duration-300 flex gap-2 font-dm hover:bg-white hover:text-[#0A65FC] w-full">
                {" "}
                <LogOut /> Logout{" "}
              </button>{" "}
            </li>
          </ul>
        </div>
        <ConfirmModal
          ref={modalRef}
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
        />
      </div>
    </>
  );
};

export default SideBar;
