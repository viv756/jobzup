import { LuCirclePower } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <div className="sm:px-15 p-2">
      <div className=" mx-auto flex justify-between h-[100px] ">
        <img src="/jobzup_logo.svg" className="sm:w-[170px] w-[150px] " alt="" />
        <ul className="sm:flex gap-7 items-center hidden ">
          <li className="text-xl font-roboto">Home</li>
          <li>Jobs</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="sm:flex gap-5 items-center hidden">
          <button className="btn rounded-3xl text-lg p-6 w-36">
            <LuCirclePower /> Login
          </button>
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
