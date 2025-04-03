import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";
import axios from "axios";
import { MessageCircle, Send, Users, Bird } from "lucide-react";
import { NumberTicker } from "../../components/magicui/number-ticker";

const GlobalChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(sessionStorage.getItem("chatMessages")) || []
  );
  const [activeUsers, setActiveUsers] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const messagesEndRef = useRef(null);
  const apiurl = import.meta.env.VITE_API_URL;

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user] = useState({
    id: storedUser.email || "",
    name: storedUser.name || "Guest",
    profilePic: storedUser.image || "",
  });

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const res = await axios.get(`${apiurl}/users/registered-users`);
        setRegisteredUsers(res.data.registeredUsers);
      } catch (err) {
        console.error("Error fetching registered users:", err);
      }
    };

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => {
        const updated = [...prev, newMessage];
        sessionStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });
    };

    fetchRegisteredUsers();
    socket.emit("requestActiveUsers");

    socket.on("receiveMessage", handleNewMessage);
    socket.on("activeUsers", (count) => setActiveUsers(count));

    return () => {
      socket.off("receiveMessage", handleNewMessage);
      socket.off("activeUsers");
    };
  }, [apiurl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: user.id,
        text: message,
        name: user.name,
        profilePic: user.profilePic,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: Date.now(),
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full pt-12">
      {/* Chat Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between w-full px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-7 h-7 text-blue-500" />
            <h1 className="hidden md:block text-2xl font-bold text-gray-800 dark:text-white">
              VIT Global Chat
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-blue-500" />
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Active
                  </span>
                  <NumberTicker
                    value={activeUsers}
                    className="font-semibold text-gray-800 dark:text-white"
                  />
                </div>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Registered
                  </span>
                  <NumberTicker
                    value={registeredUsers}
                    className="font-semibold text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 w-full">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="relative mb-8">
              <Bird className="w-32 h-32 text-blue-400/30 dark:text-blue-600/20 mx-auto animate-float" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="w-16 h-16 text-blue-500 dark:text-blue-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
              The Chat is Quiet... For Now
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg">
              Be the first to break the silence! Share your thoughts, ask a
              question, or greet your fellow VITians. Your message could start
              something amazing!
            </p>
          </div>
        ) : (
          <div className="w-full mx-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.id}-${msg.timestamp}`}
                className={`flex ${
                  msg.id === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] flex gap-3 ${
                    msg.id === user.id ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={msg.profilePic}
                    alt={msg.name}
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                  />
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      msg.id === user.id
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm font-semibold">{msg.name}</span>
                      <span className="text-xs opacity-80">{msg.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gray-300 dark:bg-gray-800 border-t dark:border-gray-700 w-full">
        <div className="mx-auto p-2">
          <div className="relative w-full group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Share your thoughts with the VIT community..."
              className="w-full p-4 pr-16 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="absolute right-2 top-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:hover:bg-blue-500 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
