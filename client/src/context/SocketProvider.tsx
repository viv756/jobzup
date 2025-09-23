import React, { createContext, useContext, useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

import { useAppSelector } from "../hooks/useSelector";
import { useAppDispatch } from "../hooks/useReducer";
import { setOnlineUsers } from "../redux/message/message.slice";

interface SocketContextType {
  socket: Socket | null;
  disconnectSocket: () => void;
}

// create context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  // Initialize socket
  const socket = useMemo(() => {
    if (!currentUser) return null;

    return io(import.meta.env.VITE_BASE_URL, {
      query: { userId: currentUser._id },
      transports: ["websocket"],
    });
  }, [currentUser?._id]);

  const disconnectSocket = () => {
    if (socket) {
      socket.off("disconnect");
      socket.disconnect();
      console.log("Socket disconnected manually");
    }
  };

  // cleanup when component unmounts
  useEffect(() => {
    if (!socket) return;

    // Listen for connection
    socket.on("connect", () => {
      console.log("Socket connected with id:");
    });

    // ✅ Listen for online users
    socket.on("getOnlineUsers", (userIds: string) => {
      dispatch(setOnlineUsers(userIds));
    });

    return () => {
      socket.off("getOnlineUsers"); // cleanup
      // socket.off("disconnect");
      socket.off("connect");
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, disconnectSocket }}>{children}</SocketContext.Provider>
  );
};

// hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
