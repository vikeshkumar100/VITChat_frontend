import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";

const RandomChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [partner, setPartner] = useState(null);
  const messagesEndRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user] = useState({
    id: storedUser.email || "",
    name: storedUser.name || "Anonymous",
    profilePic: storedUser.image || "",
  });

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      // Filter out duplicates using timestamp and sender ID
      setMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.time === newMessage.time && msg.senderId === newMessage.senderId
        );
        return exists ? prev : [...prev, newMessage];
      });
    };

    socket.on("match-found", (partner) => {
      setPartner(partner);
      setStatus("connected");
      setMessages([]);
    });

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("partner-disconnected", () => {
      setStatus("idle");
      setMessages([]);
    });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("match-found");
      socket.off("partner-disconnected");
    };
  }, []);

  const startRandomChat = () => {
    setStatus("searching");
    socket.emit("find-partner", {
      userId: user.id,
      name: user.name,
      profilePic: user.profilePic,
    });
  };

  const disconnectChat = () => {
    socket.emit("leave-chat");
    setStatus("idle");
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: user.id,
        text: message,
        name: user.name,
        profilePic: user.profilePic,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        // Add unique message ID
        id: Date.now() + Math.random().toString(36).substr(2, 9),
      };

      // Add message immediately to local state
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  // Update message handler
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => {
        // Check for duplicate using unique ID
        const exists = prev.some((msg) => msg.id === newMessage.id);
        return exists ? prev : [...prev, newMessage];
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="pt-16 flex flex-col h-screen w-full">
      {/* Chat Header */}
      <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 border-b border-white/20 w-full shadow-lg">
        <div className="flex items-center md:justify-between justify-end w-full">
          <h1 className="hidden md:flex text-xl font-bold text-white items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M13 8H7" />
              <path d="M17 12H7" />
            </svg>
            VIT Random Chat
          </h1>

          {status === "connected" && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <img
                  src={partner?.profilePic}
                  alt={partner?.name}
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    {partner?.name}
                  </span>
                  <span className="text-xs text-blue-100">Online</span>
                </div>
              </div>
              <button
                onClick={disconnectChat}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500/90 hover:bg-red-600 rounded-full transition-colors"
              >
                End Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="pt-56 md:pt-6 flex-1 overflow-y-auto w-full px-4 py-6">
        {messages.length === 0 && status === "idle" ? (
          <div className="h-full flex flex-col items-center justify-center gap-8 text-center">
            <div className="max-w-2xl mx-auto px-4">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M16 10h.01" />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Start Connecting with VITians!
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Meet random students from VIT, share ideas, and make new
                  connections
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                    <div className="text-blue-500 text-2xl mb-2">🌐</div>
                    <h3 className="font-semibold mb-2">Instant Matching</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Connect with another VITian in seconds
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                    <div className="text-blue-500 text-2xl mb-2">🔒</div>
                    <h3 className="font-semibold mb-2">Secure & Private</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      End-to-end encrypted conversations
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
                    <div className="text-blue-500 text-2xl mb-2">💡</div>
                    <h3 className="font-semibold mb-2">Learn Together</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Share knowledge and study resources
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  msg.senderId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] flex gap-3 ${
                    msg.senderId === user.id ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={msg.profilePic}
                    alt={msg.name}
                    className="w-8 h-8 rounded-full mt-2"
                  />
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.senderId === user.id
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-sm font-medium">{msg.name}</span>
                      <span className="text-xs opacity-75">{msg.time}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {status === "connected" ? (
        <div className="bg-gray-300 dark:bg-gray-800 border-t dark:border-gray-700 w-full">
          <div className="w-full p-2">
            <div className="relative w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-3 pr-16 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center w-full">
          <button
            onClick={startRandomChat}
            disabled={status === "searching"}
            className={`px-8 py-3 text-sm font-medium rounded-full transition-all w-full max-w-md ${
              status === "searching"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {status === "searching" ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="animate-spin">↻</span>
                Searching for VITians...
              </span>
            ) : (
              "Start New Random Chat"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomChat;
