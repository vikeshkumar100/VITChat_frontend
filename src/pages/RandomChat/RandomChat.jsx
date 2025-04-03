import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";

const RandomChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | searching | connected
  const [partner, setPartner] = useState(null);
  const messagesEndRef = useRef(null);

  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user] = useState({
    id: storedUser.email || "",
    name: storedUser.name || "Anonymous",
    profilePic: storedUser.image || "",
  });

  // Socket handlers
  useEffect(() => {
    socket.on("match-found", (partnerData) => {
      setPartner(partnerData);
      setStatus("connected");
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    socket.on("partner-disconnected", () => {
      setStatus("idle");
      setMessages([]);
      alert("Partner has disconnected");
    });

    return () => {
      socket.off("match-found");
      socket.off("receiveMessage");
      socket.off("partner-disconnected");
    };
  }, []);

  // Connection management
  const startRandomChat = () => {
    setStatus("searching");
    socket.emit("find-partner", {
      userId: user.id,
      name: user.name,
      profilePic: user.profilePic
    });
  };

  const disconnectChat = () => {
    socket.emit("leave-chat");
    setStatus("idle");
    setMessages([]);
  };

  // Message handling
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: user.id,
        text: message,
        name: user.name,
        profilePic: user.profilePic,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", newMessage);
      setMessages(prev => [...prev, { ...newMessage, isSelf: true }]);
      setMessage("");
    }
  };

  // UI Helpers
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="pt-20 md:pt-24 w-full h-full bg-gray-200 dark:bg-black flex flex-col justify-end">
      {/* Status Header */}
      <div className="p-4 flex items-center justify-between">
        <div>
          {status === "connected" && (
            <div className="flex items-center gap-2">
              <img 
                src={partner?.profilePic} 
                alt={partner?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{partner?.name}</span>
              <span className="text-sm text-green-500">● Connected</span>
            </div>
          )}
          {status === "searching" && (
            <div className="flex items-center gap-2">
              <div className="animate-pulse">🔍</div>
              <span>Searching for VITians...</span>
            </div>
          )}
        </div>
        {status === "connected" && (
          <button 
            onClick={disconnectChat}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Disconnect
          </button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] flex gap-2 ${msg.senderId === user.id ? "flex-row-reverse" : ""}`}>
              {msg.senderId !== user.id && (
                <img
                  src={msg.profilePic}
                  alt={msg.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className={`p-3 rounded-lg ${msg.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700"}`}>
                <p className="text-sm font-medium">{msg.name}</p>
                <p className="my-1 whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs opacity-75">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {status === "connected" ? (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg bg-white dark:bg-gray-800 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="p-4 text-center">
          <button
            onClick={startRandomChat}
            disabled={status === "searching"}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-all"
          >
            {status === "searching" ? "Searching..." : "Start Random Chat"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomChat;