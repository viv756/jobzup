import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

const DashHeader = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const capitalizeFirstLetter = () => {
    if (currentUser?.role) {
      const role = currentUser.role.toLowerCase().replace(/_/g, " ");
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <>
      {currentUser && (
        <div className="bg-white h-20 flex items-center justify-between">
          <Link to={"/"} className="font-dm hover:text-blue-700">
            Back to home
          </Link>
          <div className="flex gap-3 items-center ">
            <img
              src={currentUser?.profilePicture}
              alt=""
              className="w-13 h-13 rounded-full object-cover"
            />
            <div>
              <p className="font-dm"> {currentUser?.name}</p>
              <p className="font-dm text-xs">{capitalizeFirstLetter()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashHeader;
