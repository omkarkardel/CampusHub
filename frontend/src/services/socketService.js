import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../utils/config";

let socket;

export const connectSocket = ({ userId, role }) => {
  if (!userId) return null;

  if (!socket) {
    socket = io(SOCKET_BASE_URL, {
      autoConnect: true,
      transports: ["websocket"]
    });
  }

  socket.emit("register-user", { userId, role });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};