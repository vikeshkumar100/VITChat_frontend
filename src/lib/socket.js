import { io } from "socket.io-client";

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

const socket = io(SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
  auth: (cb) => {
    cb({ token: getSocketToken() });
  },
});

export default socket;
