import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "../../redux/user/user.slice"; // your logout action
import { useSocket } from "../../context/SocketProvider"; // your socket hook
import { logoutApiFn } from "../../lib/api"; // your API call

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { disconnectSocket } = useSocket();

  const handleLogout = useCallback(async () => {
    try {
      const data = await logoutApiFn();
      if (data) {
        // 1️⃣ Disconnect socket
        disconnectSocket?.();

        // 2️⃣ Clear Redux state
        dispatch(logout());

        // 3️⃣ Show success toast
        toast.success(data.message);

        // 4️⃣ Navigate to login/home
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  }, [dispatch, navigate, disconnectSocket]);

  return handleLogout;
};
