import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

const AuthRoute = () => {
  const { currentUser, loading } = useAppSelector((store) => store.user);

  // Wait until loading is done
  if (loading) return <div>Loading...</div>;

  // Define which routes should be blocked if user is logged in
  const authPages = ["/sign-in", "/sign-up"];

  if (currentUser && authPages.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }
  // Otherwise allow public route
  return <Outlet />;
};

export default AuthRoute;
