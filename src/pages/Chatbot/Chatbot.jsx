import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Send,
  Bot,
  User,
  Loader2,
  Trash2,
  Award,
  GraduationCap,
  BookOpen,
  Briefcase,
  Home,
  Library,
  Users,
} from "lucide-react";

// Quick category setup
const quickCategories = [
  {
    title: "About VIT",
    icon: <Award className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about VIT University",
  },
  {
    title: "Admissions",
    icon: <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What are the admission requirements?",
  },
  {
    title: "Programs",
    icon: <BookOpen className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What academic programs are offered?",
  },
  {
    title: "Placements",
    icon: <Briefcase className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What are the placement details?",
  },
  {
    title: "Hostels",
    icon: <Home className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about the hostel facilities",
  },
  {
    title: "Student Count",
    icon: <Users className="w-8 h-8 text-blue-500 mb-2" />,
    question: "How many students are enrolled at VIT?",
  },
  {
    title: "Faculty",
    icon: <Library className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about VIT faculty and professors",
  },
];

// Quick suggestion setup
const quickSuggestions = [
  "How to reach VIT from Chennai airport?",
  "Hostel facilities at VIT Vellore",
  "Student to faculty ratio at VIT",
  "What is the fee structure for BCA?",
  "How many students study at VIT?",
  "Faculty count at VIT Vellore",
  "Food options available on campus",
  "Sports facilities at VIT",
];

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef(null);
  const answerCacheRef = useRef(new Map());

  const SYSTEM_PROMPT = "You are a helpful assistant for vit vellore developed by vikesh. Answer the user’s question directly and concisely. If you are unsure, say you don’t know";

  useEffect(() => {
    const savedChat = sessionStorage.getItem("chatBotHistory");
    if (savedChat) {
      setChat(JSON.parse(savedChat));
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatBotHistory", JSON.stringify(chat));
    if (chat.length > 0) {
      setShowSuggestions(false);
    }
  }, [chat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const clearChat = () => {
    setChat([]);
    sessionStorage.removeItem("chatBotHistory");
    setShowSuggestions(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const handleQuickQuestion = (questionText) => {
    setQuestion(questionText);
    sendQuestion(questionText);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const extractRetryDelayMs = (error) => {
    const retryAfterHeader = error?.response?.headers?.["retry-after"];
    if (retryAfterHeader) {
      const retrySeconds = Number(retryAfterHeader);
      if (!Number.isNaN(retrySeconds)) return Math.ceil(retrySeconds * 1000);
    }
    return 0;
  };

  const getGroqAnswer = async (userMessage) => {
    try {
      console.log("Using Groq API...");

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Missing API key. Please set VITE_GROQ_API_KEY.");
      }

      const requestPayload = {
        model: "llama-3.3-70b-versatile",
        messages: [
          ...(SYSTEM_PROMPT
            ? [{ role: "system", content: SYSTEM_PROMPT }]
            : []),
          { role: "user", content: userMessage },
        ],
        temperature: 0.6,
        max_tokens: 300,
      };

      const endpoint = "https://api.groq.com/openai/v1/chat/completions";

      let response;
      let attempt = 0;
      const maxRetries = 2;
      while (attempt <= maxRetries) {
        try {
          response = await axios.post(endpoint, requestPayload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            timeout: 10000,
          });
          break;
        } catch (error) {
          const status = error?.response?.status;
          if (status === 429 && attempt < maxRetries) {
            const retryDelayMs = extractRetryDelayMs(error) || 1000 * 2 ** attempt;
            await delay(retryDelayMs);
            attempt += 1;
            continue;
          }
          throw error;
        }
      }

      if (response.data.choices?.[0]?.message?.content) {
        console.log("Groq API successful");
        return response.data.choices[0].message.content;
      } else {
        console.log("Invalid API response format");
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  };

  const sendQuestion = async (overrideQuestion = null) => {
    const trimmedQuestion = (overrideQuestion || question).trim();
    if (!trimmedQuestion || isLoading) return;

    const cachedAnswer = answerCacheRef.current.get(trimmedQuestion);
    if (cachedAnswer) {
      setChat((prev) => [
        ...prev,
        {
          text: trimmedQuestion,
          isBot: false,
          timestamp: Date.now(),
        },
        {
          text: cachedAnswer,
          isBot: true,
          timestamp: Date.now(),
          source: "cache",
        },
      ]);
      setQuestion("");
      return;
    }

    setIsLoading(true);
    setQuestion("");

    // Add user message
    setChat((prev) => [
      ...prev,
      {
        text: trimmedQuestion,
        isBot: false,
        timestamp: Date.now(),
      },
    ]);

    try {
      // Get answer from Groq
      const answer = await getGroqAnswer(trimmedQuestion);

      answerCacheRef.current.set(trimmedQuestion, answer);

      // Add bot response
      setChat((prev) => [
        ...prev,
        {
          text: answer,
          isBot: true,
          timestamp: Date.now(),
          source: "groq",
        },
      ]);
    } catch (error) {
      console.error("Error getting answer:", error);
      const status = error?.response?.status;
      const isQuota = status === 429;
      const errorMessage = isQuota
        ? "The AI service is rate-limited right now. Please wait a few seconds and try again."
        : error?.message?.includes("Missing API key")
        ? "Missing API key. Please configure VITE_GROQ_API_KEY and try again."
        : "I'm sorry, I encountered an error processing your request. Please try again or ask a different question about VIT.";
      setChat((prev) => [
        ...prev,
        {
          text: errorMessage,
          isBot: true,
          timestamp: Date.now(),
          source: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 md:space-y-6 pt-96 md:pt-72">
        {chat.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-2 md:px-4">
            <div className="relative mb-6 md:mb-8 animate-pulse">
              <Bot className="w-20 h-20 md:w-32 md:h-32 text-blue-200 dark:text-blue-900/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="w-12 h-12 md:w-20 md:h-20 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-3">
              VIT AI Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl">
              Ask me anything about VIT University! I can help with:
            </p>

            {/* Quick categories */}
            <div className="mt-6 md:mt-8 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 px-2">
              {quickCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(category.question)}
                  className="flex flex-col items-center bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  {category.icon}
                  <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium mt-1">
                    {category.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick suggestions */}
            <div className="mt-6 md:mt-8 w-full max-w-3xl p-8">
              <h4 className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-3 text-left">
                Try asking about:
              </h4>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(suggestion)}
                    className="px-2 py-1 md:px-3 md:py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {chat.map((msg, index) => (
              <div
                key={`${index}-${msg.timestamp}`}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex items-start gap-2 md:gap-3 max-w-xs sm:max-w-md md:max-w-2xl ${
                    msg.isBot ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {msg.isBot ? (
                      <div className="p-1.5 md:p-2 bg-blue-500 rounded-full">
                        <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    ) : (
                      <div className="p-1.5 md:p-2 bg-gray-700 rounded-full">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-3 md:p-4 rounded-xl shadow-sm transition-all duration-200 ${
                      msg.isBot
                        ? "bg-white dark:bg-gray-800 rounded-tl-none"
                        : "bg-blue-500 text-white rounded-tr-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm md:text-base text-gray-800 dark:text-gray-100">
                      {msg.text}
                    </p>
                    <div className="mt-1 md:mt-2 text-2xs md:text-xs opacity-70 text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {msg.isBot && msg.source && (
                        <span
                          className={`ml-2 px-1 rounded ${
                            msg.source === "groq"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }`}
                        >
                          {msg.source === "groq" ? "AI" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-blue-500 rounded-full">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl rounded-tl-none">
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-blue-500" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Show suggestions button (if chat has started) */}
      {!showSuggestions && chat.length > 0 && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setShowSuggestions(true)}
            className="mb-1 md:mb-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-blue-500 hover:underline"
          >
            Need ideas? Show suggestions
          </button>
        </div>
      )}

      {/* Quick suggestions (when enabled) */}
      {showSuggestions && chat.length > 0 && (
        <div className="w-full bg-gray-50 dark:bg-gray-900 p-2 md:p-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(suggestion)}
                className="px-2 py-1 md:px-3 md:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-2xs md:text-xs text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 md:p-2">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <textarea
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg py-1.5 md:py-2 px-3 md:px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none text-sm md:text-base"
            placeholder="Ask anything about VIT..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />

          <div className="flex items-center ml-2">
            {chat.length > 0 && (
              <button
                onClick={clearChat}
                className="p-1.5 md:p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}

            <button
              onClick={() => sendQuestion()}
              disabled={isLoading || !question.trim()}
              className={`p-1.5 md:p-2 rounded-full ${
                isLoading || !question.trim()
                  ? "text-gray-400 bg-gray-100 dark:text-gray-600 dark:bg-gray-800"
                  : "text-white bg-blue-500 hover:bg-blue-600"
              } transition-colors`}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* API indicator in input area */}
        <div className="flex justify-center mt-1 md:mt-2">
          <div className="text-2xs md:text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span>Powered by Groq API (Free)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
