import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";

const GlobalChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(sessionStorage.getItem("chatMessages")) || []
  );
  const messagesEndRef = useRef(null);

  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState({
    id: storedUser.email || "",
    name: storedUser.name || "Guest",
    profilePic: storedUser.image || "",
  });

  // Load messages from socket
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => {
        const updatedMessages = [...prev, newMessage];
        sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: user.id,
        text: message,
        name: user.name,
        profilePic: user.profilePic,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  // Send message when pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="pt-20 md:pt-24 w-full h-full bg-gray-200 dark:bg-black flex flex-col justify-end">
      {/* Chat Box */}
      <div className="w-full overflow-y-auto p-2 rounded-md flex flex-col">
        {messages.map((msg, index) => (
          // Message container
          <div
            key={index}
            className={`w-full flex mb-2 ${
              msg.id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Profile Picture (other person )*/}
            {msg.id !== user.id && msg.profilePic && (
              <img
                src={msg.profilePic}
                alt={msg.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            {/* text Box */}
            <div
              className={`items-end py-2 h-auto break-words min-w-[20%] max-w-[75%] font-semibold md:max-w-[60%] lg:max-w-[50%] rounded-md ${
                msg.id === user.id ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              <p className="px-2 w-full">{msg.name}</p>
              <p className="w-full p-1 md:p-2 whitespace-pre-wrap break-words border-y border-zinc-600/60">
                {msg.text}
              </p>
              <p className="text-xs p-1">{msg.time}</p>
            </div>

            {/* Profile Picture (self Messages) */}
            {msg.id === user.id && user.profilePic && (
              <img
                src={user.profilePic}
                alt="Me"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md bg-gray-600 text-white"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GlobalChatBox;
