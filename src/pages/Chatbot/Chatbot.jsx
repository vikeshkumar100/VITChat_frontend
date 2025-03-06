import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedChat = sessionStorage.getItem("chatBotHistory");
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatBotHistory", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Send message
  const sendQuestion = async () => {
    if (question.trim() === "") return;

    setIsLoading(true);
    const userMessage = question;
    setQuestion("");

    setChat((prevChat) => {
      const updatedChat = [...prevChat, { text: userMessage, isBot: false }];
      sessionStorage.setItem("chatBotHistory", JSON.stringify(updatedChat));
      return updatedChat;
    });

    const ans = await getAnswer(userMessage);

    setChat((prevChat) => {
      const updatedChat = [...prevChat, { text: ans, isBot: true }];
      sessionStorage.setItem("chatBotHistory", JSON.stringify(updatedChat));
      return updatedChat;
    });

    setIsLoading(false);
  };

  // answer from gemini API

  const getAnswer = async (userMessage) => {
    try {
      const prompt = `You are a chatbot that provides **accurate, official, and up-to-date information about VIT (Vellore Institute of Technology)**.
      -Developed by Vikesh and darun.
      - Your responses should be **short, factual, and direct**.
      - Use only **official VIT sources** (like vit.ac.in).
      - If you don't know, **do not guess**—just say "I don't have that information."
      
      **User question:** "${userMessage}"`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_AI_API_KEY
        }`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return (
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I don't have that information."
      );
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return "Error fetching response.";
    }
  };

  // Send message when pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) sendQuestion();
  };

  return (
    <div className="pt-12 pb-1 md:pt-16 w-full max-h-screen text-white bg-gray-200 dark:bg-black flex flex-col justify-end">
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
                msg.isBot ? "bg-gray-600" : "bg-blue-600"
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
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1 p-2 border rounded-md bg-gray-600 text-white"
          disabled={isLoading}
        />
        <button
          onClick={sendQuestion}
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
