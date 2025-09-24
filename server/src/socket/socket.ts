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

// Helper to get receiver socket id
export function getReceiverSocketId(receiverId: string) {
  return userSocketMap[receiverId];
}

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
  const rooms = new Map(); // joinToken -> set of socket ids

  // Emit online users
  io.emit("getOnlineUsers", getOnlineUsers());

  // Join meeting room
  socket.on("join-room", ({ joinToken }) => {
    if (!joinToken) return;
    if (!rooms.has(joinToken)) rooms.set(joinToken, new Set());
    rooms.get(joinToken).add(socket.id);
    socket.join(joinToken);
    console.log(`${socket.id} joined room ${joinToken}`);
  });

  // Offer from initiator
  socket.on("offer", ({ joinToken, signal }) => {
    socket.to(joinToken).emit("offer", { signal, from: socket.id });
  });

  // Answer from joiner
  socket.on("answer", ({ joinToken, signal, to }) => {
    if (to) {
      io.to(to).emit("answer", { signal, from: socket.id });
    } else {
      socket.to(joinToken).emit("answer", { signal, from: socket.id });
    }
  });

  // ICE candidate
  socket.on("ice-candidate", ({ joinToken, candidate, to }) => {
    if (to) {
      io.to(to).emit("ice-candidate", { candidate, from: socket.id });
    } else {
      socket.to(joinToken).emit("ice-candidate", { candidate, from: socket.id });
    }
  });

  // Leave room
  socket.on("leave-room", ({ joinToken }) => {
    if (rooms.has(joinToken)) {
      rooms.get(joinToken).delete(socket.id);
      socket.leave(joinToken);
      socket.to(joinToken).emit("peer-left", { socketId: socket.id });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", getOnlineUsers());
    for (const [token, set] of rooms.entries()) {
      if (set.has(socket.id)) {
        set.delete(socket.id);
        socket.to(token).emit("peer-left", { socketId: socket.id });
      }
      if (set.size === 0) rooms.delete(token);
    }
  });
});

export { io, app, server };
