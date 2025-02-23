import { io } from "socket.io-client";

const SERVER_URL =
  import.meta.env.VITE_API_URL || "https://vitchat.onrender.com";

const socket = io(SERVER_URL, {
  transports: ["websocket"], 
  withCredentials: true, 
});

export default socket;
