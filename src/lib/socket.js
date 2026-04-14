import { io } from "socket.io-client";
import { logoutUser } from "@/lib/auth";

const SERVER_URL =
  import.meta.env.VITE_API_URL || "https://vitchat.onrender.com";

const getSocketToken = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    return storedUser?.token || "";
  } catch (error) {
    return "";
  }
};

const getSocketAuth = () => ({ token: getSocketToken() });

const socket = io(SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
  auth: getSocketAuth(),
});

socket.on("connect_error", (error) => {
  const message = String(error?.message || "").toLowerCase();
  if (message.includes("unauthorized") || message.includes("token")) {
    logoutUser();
  }
});

export const connectSocket = () => {
  socket.auth = getSocketAuth();
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
