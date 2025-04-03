import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2 } from "lucide-react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedChat = sessionStorage.getItem("chatBotHistory");
    if (savedChat) setChat(JSON.parse(savedChat));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatBotHistory", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const sendQuestion = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = question;
    setQuestion("");

    // Add user message
    setChat((prev) => [
      ...prev,
      { text: userMessage, isBot: false, timestamp: Date.now() },
    ]);

    try {
      const ans = await getAnswer(userMessage);
      // Add bot response
      setChat((prev) => [
        ...prev,
        { text: ans, isBot: true, timestamp: Date.now() },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          isBot: true,
          timestamp: Date.now(),
        },
      ]);
    }
    setIsLoading(false);
  };

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
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return (
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I don't have that information."
      );
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return "Error fetching response. Please try again.";
    }
  };
  return (
    <div className="flex flex-col h-screen w-full pt-12">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {chat.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="relative mb-8 animate-float">
              <Bot className="w-32 h-32 text-blue-200 dark:text-blue-900/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="w-20 h-20 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              VIT AI Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
              Ask me anything about VIT University! I can help with:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Admissions
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Courses
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Campus Facilities
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700 dark:text-gray-300">Events</span>
              </div>
            </div>
          </div>
        ) : (
          chat.map((msg, index) => (
            <div
              key={`${index}-${msg.timestamp}`}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-2xl ${
                  msg.isBot ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-shrink-0">
                  {msg.isBot ? (
                    <div className="p-2 bg-blue-500 rounded-full">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-700 rounded-full">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div
                  className={`p-4 rounded-xl shadow-sm transition-all duration-200 ${
                    msg.isBot
                      ? "bg-white dark:bg-gray-800 rounded-tl-none"
                      : "bg-blue-500 text-white rounded-tr-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100">
                    {msg.text}
                  </p>
                  <div className="mt-2 text-xs opacity-70 text-gray-500 dark:text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="w-full border-t dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
        <div className="mx-auto relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about VIT (e.g., 'What are the engineering courses offered?')"
            className="w-full pl-4 pr-20 py-3 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={sendQuestion}
            disabled={isLoading || !question.trim()}
            className="absolute right-2 top-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
