import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import { config } from "../config/app.config";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [config.FRONTEND_ORIGIN],
  },
});

const userSocketMap: Record<string, string> = {};

// Helper to get online users
const getOnlineUsers = () => Object.keys(userSocketMap);

io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;

  if (!userId) {
    console.log("No userId, disconnecting socket:", socket.id);
    socket.disconnect(true);
    return;
  }

  // Store mapping
  userSocketMap[userId] = socket.id;

  // Emit online users
  io.emit("getOnlineUsers", getOnlineUsers());

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", getOnlineUsers());
  });
});

export { io, app, server };
