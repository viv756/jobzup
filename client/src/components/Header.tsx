import { LuCirclePower } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs/all" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  return (
    <div className="sm:px-15 p-2">
      <div className=" mx-auto flex justify-between h-[100px] ">
        <Link to={"/"} className="flex items-center" >
          <img src="/jobzup_logo.svg" className="sm:w-[170px] w-[150px] " alt="" />
        </Link>
        <ul className="hidden sm:flex gap-6 items-center">
          {NavLinks.map((nav) => (
            <li key={nav.path} className="text-xl font-roboto">
              <Link to={nav.path}>{nav.name}</Link>
            </li>
          ))}
        </ul>

        <div className="sm:flex gap-5 items-center hidden">
          {currentUser ? (
            <Link to={"/logout"} className="btn rounded-3xl text-lg p-6 w-36">
              <LuCirclePower /> Logout
            </Link>
          ) : (
            <Link to={"/sign-in"} className="btn rounded-3xl text-lg p-6 w-36">
              <LuCirclePower /> Login
            </Link>
          )}

          <button className="btn rounded-3xl text-lg bg-black text-white p-6 w-36 hover:bg-primary">
            Post a job
          </button>
        </div>
        <div className=" flex items-center sm:hidden">
          <button className="rounded-xl p-2 bg-primary text-white ">
            <GiHamburgerMenu size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
