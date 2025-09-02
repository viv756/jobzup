import { useAppSelector } from "../hooks/useSelector";
import { Outlet, Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles?: Array<"RECRUITER" | "CANDIDATE">;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAppSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to={"/sign-in"} replace />;

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
