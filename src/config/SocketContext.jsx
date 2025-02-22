import { createContext, useContext, useEffect, useState } from "react";
import socket from "../config/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on("newMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, messages, setMessages }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);