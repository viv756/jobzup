import { NavLink } from "react-router-dom";
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
import { useAppSelector } from "../../../../hooks/useSelector";

type SidebarLink = {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: string[]; // optional field for role-based access
};

const SideBar = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const sidebarLinks: SidebarLink[] = [
    { label: "Dashboard", path: "/dashboard", icon: Contrast },
    { label: "My Jobs", path: "/myjobs", icon: BriefcaseBusiness, roles: ["RECRUITER"] },
    { label: "My Jobs", path: "/applied-jobs", icon: BriefcaseBusiness },
    { label: "Applications", path: "/applications", icon: File, roles: ["RECRUITER"] },
    {
      label: "Create New Job",
      path: `/create/job/${currentUser?.company}`,
      icon: FilePlus,
      roles: ["RECRUITER"],
    },
    { label: "Company", path: "/comapany", icon: Building2, roles: ["RECRUITER"] },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Messages", path: "/messages", icon: MessageSquareMore },
    { label: "Meetings", path: "/meetings", icon: Headset },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Logout", path: "/logout", icon: LogOut },
  ];

  const visibleLinks = sidebarLinks.filter((link) => {
    if (!link.roles) return true; // no restriction
    return link.roles.includes(currentUser?.role as string); // show only if role matches
  });

  return (
    <div className="bg-[#0851CA] min-h-screen min-w-[280px] rounded-md fixed">
      <div className="p-8 pt-15">
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
