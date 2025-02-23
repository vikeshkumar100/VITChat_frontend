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
    id: storedUser.id || "",
    name: storedUser.name || "Guest",
    profilePic: storedUser.image || "", // Use actual user profile pic
  });

  // Update user ID when socket connects
  useEffect(() => {
    if (!user.id) {
      socket.on("connect", () => {
        setUser((prev) => ({ ...prev, id: socket.id }));
      });
    }

    return () => {
      socket.off("connect");
    };
  }, [user.id]);

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
        profilePic: user.profilePic, // Use user's actual profile pic
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
            className={`w-full flex mb-2 ${
              msg.id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Profile Picture (Other Users) */}
            {msg.id !== user.id && msg.profilePic && (
              <img
                src={msg.profilePic}
                alt={msg.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            {/* Message Bubble */}
            <div
              className={`p-2 h-auto break-words max-w-[75%] md:max-w-[60%] lg:max-w-[50%] rounded-md text-white ${
                msg.id === user.id ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              <p className="font-bold">{msg.name}</p>
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
            </div>

            {/* Profile Picture (Your Messages) */}
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
