import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

type RoleRouteProps = {
  allowedRoles: Array<"RECRUITER" | "CANDIDATE">;
};

const RoleBasedRote = ({ allowedRoles }: RoleRouteProps) => {
  const { currentUser, loading } = useAppSelector((store) => store.user);

  if (loading) return <div>Loading</div>;
  if (!currentUser) return <Navigate to={"/sign-in"} replace />;

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default RoleBasedRote;
