import { useAppSelector } from "../hooks/useSelector";
import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  console.log("first");
  
  const { currentUser, loading } = useAppSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute