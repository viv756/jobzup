import { NavLink } from "react-router-dom";
import { Contrast, LogOut, User,MessageSquareMore,Settings, type LucideIcon } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";

type SidebarLink = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", path: "/dashboard", icon: Contrast },
  { label: "Profile", path: "/profile", icon: User },
  { label: "My Jobs", path: "/myjobs", icon: BriefcaseBusiness },
  { label: "Messages", path: "/messages", icon: MessageSquareMore },
  { label: "settings", path: "/settings", icon: Settings },
  { label: "Logout", path: "/logout", icon: LogOut },
];
const SideBar = () => {
  return (
    <div className="bg-[#0851CA] min-h-screen min-w-[280px] rounded-md fixed">
      <div className="p-8 pt-15">
        <ul className="flex flex-col justify-center text-center gap-2 text-white">
          {sidebarLinks.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `rounded-md text-lg px-6 py-1 items-center transition duration-300 flex gap-2
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
