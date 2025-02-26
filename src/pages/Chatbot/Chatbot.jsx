import React, { useRef, useState, useEffect } from "react";

const Chatbot = () => {
  const [question, setquestion] = useState("");
  const [chat, setchat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedChat = sessionStorage.getItem("chatHistory");
    if (savedChat) {
      setchat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Send message
  const sendquestion = async () => {
    if (question.trim() === "") return;

    setIsLoading(true);
    const userMessage = question;
    setquestion("");

    setchat((prevChat) => {
      const updatedChat = [...prevChat, { text: userMessage, isBot: false }];
      sessionStorage.setItem("chatHistory", JSON.stringify(updatedChat));
      return updatedChat;
    });

    const ans = await getanswer();

    setchat((prevChat) => {
      const updatedChat = [...prevChat, { text: ans, isBot: true }];
      sessionStorage.setItem("chatHistory", JSON.stringify(updatedChat));
      return updatedChat;
    });

    setIsLoading(false);
  };

  const getanswer = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a bot response.");
      }, 2000);
    });
  };

  // Send message when pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) sendquestion();
  };

  return (
    <div className="pt-12 pb-1 md:pt-16 w-full max-h-screen bg-gray-200 dark:bg-black flex flex-col justify-end">
      {/* Chat box */}
      <div className="w-full overflow-y-auto p-2 rounded-md flex flex-col">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col p-2 ${
              msg.isBot ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`items-end p-3 h-auto break-words min-w-[20%] max-w-[75%] font-semibold md:max-w-[60%] lg:max-w-[50%] rounded-md ${
                msg.isBot ? "bg-gray-600 " : "bg-blue-600"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input box */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:text-white"
          disabled={isLoading}
        />
        <button
          onClick={sendquestion}
          className={`px-4 py-2 rounded-md ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Waiting..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
