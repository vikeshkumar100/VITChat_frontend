import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";

const GlobalChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(sessionStorage.getItem("chatMessages")) || []
  );
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    id: socket.id,
    name: "Guest",
    profilePic: "https://i.pravatar.cc/40",
  };

  // Load messages from socket and update session storage
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
        profilePic: user.image,
      };

      socket.emit("sendMessage", newMessage);
      setMessage(""); // Clear input
    }
  };

  // Send message when pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-4 h-full w-full bg-gray-100 dark:bg-black flex flex-col justify-end">
      {/* Chat Box */}
      <div className="h-[85vh] w-full overflow-y-auto p-2 rounded-md flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full items-center mb-2 ${
              msg.id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Profile Picture (Other Users) */}
            {msg.id !== user.id && (
              <img
                src={msg.profilePic}
                alt={msg.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            {/* Message Bubble */}
            <div
              className={`p-2 h-auto break-words max-w-sm rounded-md text-white ${
                msg.id === user.id
                  ? "bg-blue-500 self-end" // Your messages
                  : "bg-green-500 self-start" // Other users
              }`}
            >
              <p className="font-bold">{msg.name}</p>
              <p>{msg.text}</p>
            </div>

            {/* Profile Picture (Your Messages) */}
            {msg.id === user.id && (
              <img
                src={msg.profilePic}
                alt="Me"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>

      {/* Input Box */}
      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GlobalChatBox;
