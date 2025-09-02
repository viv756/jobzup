import { Link, NavLink } from "react-router-dom";
import {
  Contrast,
  LogOut,
  User,
  MessageSquareMore,
  Settings,
  type LucideIcon,
  File,
  FilePlus,
  Headset,
  Building2,
} from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { useAppSelector } from "../hooks/useSelector";

type SidebarLink = {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: string[]; // optional field for role-based access
};

const SideBar = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const sidebarLinks: SidebarLink[] = [
    { label: "Dashboard", path: "/profile/dashboard", icon: Contrast,roles:["RECRUITER"] },
    { label: "My Jobs", path: "/profile/myjobs", icon: BriefcaseBusiness, roles: ["RECRUITER"] },
    { label: "My Jobs", path: "/profile/applied-jobs", icon: BriefcaseBusiness,roles:["JOB_SEEKER"] },
    { label: "Applications", path: "/profile/applications", icon: File, roles: ["RECRUITER"] },
    {
      label: "Create New Job",
      path: `/profile/create/job/${currentUser?.company}`,
      icon: FilePlus,
      roles: ["RECRUITER"],
    },
    { label: "Company", path: "/profile/company", icon: Building2, roles: ["RECRUITER"] },
    { label: "Profile", path: "/profile/update", icon: User },
    { label: "Messages", path: "/profile/messages", icon: MessageSquareMore },
    { label: "Meetings", path: "/profile/meetings", icon: Headset },
    { label: "Settings", path: "/profile/settings", icon: Settings },
    { label: "Logout", path: "/logout", icon: LogOut },
  ];

  const visibleLinks = sidebarLinks.filter((link) => {
    if (!link.roles) return true; // no restriction
    return link.roles.includes(currentUser?.role as string); // show only if role matches
  });

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
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
