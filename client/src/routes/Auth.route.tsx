import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

const AuthRoute = () => {
  const { currentUser, loading } = useAppSelector((store) => store.user);

   // Wait until loading is done
  if (loading) return <div>Loading...</div>;

  // If user exists, block access to public pages
  if (currentUser) return <Navigate to="/" replace />;

  // Otherwise allow public route
  return <Outlet />;
};

export default AuthRoute;
