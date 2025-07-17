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

  // Load/save chat history
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

  // Auto-scroll to bottom
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

  // Function to get answers from Gemini API
  const getGeminiAnswer = async (userMessage) => {
    try {
      console.log("Using Gemini API...");

      // Enhanced prompt with student/faculty information
      const prompt = `You are a helpful chatbot that provides accurate information about VIT (Vellore Institute of Technology).

      You are developed by Vikesh.

Key facts about VIT University:
- Founded: 1984 as Vellore Engineering College, renamed VIT in 2001
- Total student count: Approximately 55,000+ students across all campuses with 35,000+ at VIT Vellore
- Faculty members: Over 2,000 highly qualified professors and educators with 60% holding PhDs
- Student-faculty ratio: 12:1
- International students: 7,500+ from 85+ countries
- Research papers published: 25,000+ publications in Scopus-indexed journals
- Campus size: Main Vellore campus is 360 acres, Chennai campus is 120 acres
- Accreditations: NAAC 'A++' grade, NBA accreditation, ABET accreditation for engineering programs
- Rankings: Consistently ranked among top 3 private engineering institutions in India by NIRF
- QS World University Rankings: Ranked in 651-700 band globally

Campus Locations:
- VIT Vellore: Main campus in Vellore, Tamil Nadu
- VIT Chennai: Secondary campus in Chennai, Tamil Nadu
- VIT-AP: Campus in Amaravati, Andhra Pradesh
- VIT Bhopal: Campus in Bhopal, Madhya Pradesh
- VIT Bangalore: Campus in Bangalore, Karnataka

Academic Schools & Programs:
- School of Engineering (SENSE, SCOPE, SMEC, SCHEME, etc.)
- School of Computer Science and Engineering (SCOPE)
- School of Electronics Engineering (SENSE)
- School of Mechanical Engineering (SMEC)
- School of Bio Sciences and Technology (SBST)
- VIT Business School (VITBS)
- School of Fashion Design & Arts (SFDA)
- School of Law (SOL)
- School of Architecture (SOA)
- School of Advanced Sciences (SAS)
- Offers 90+ undergraduate, postgraduate, and doctoral programs

Fee Structure (Academic Programs):
- B.Tech programs: ₹2.15-2.75 lakhs per annum
- B.Tech (Specializations): ₹2.45-3.25 lakhs per annum
- B.Tech Computer Science specializations: ₹2.95-3.45 lakhs per annum
- M.Tech programs: ₹1.85-2.25 lakhs per annum
- MBA programs: ₹6.50-7.50 lakhs (total for 2 years)
- MCA programs: ₹1.75-2.15 lakhs per annum
- BCA programs: ₹90000-1 lakhs per annum
- B.Arch: ₹2.25 lakhs per annum
- B.Des: ₹2.10 lakhs per annum
- M.Sc programs: ₹1.25-1.75 lakhs per annum
- Ph.D. programs: ₹1.10-1.50 lakhs per annum
- Caution deposit (refundable): ₹2,000-10,000

Admissions:
- VITEEE: VIT Engineering Entrance Examination for B.Tech admissions
- VITSAT: For management program admissions
- International admissions through SAT scores or VITEEE
- Ph.D. admissions throughout the year
- Entry based on merit and counseling process
- VITMEE: VIT Management Entrance Examination for MBA and MCA admissions

Placements:
- 800+ companies visit annually for campus recruitment
- Average placement rate: 96% for eligible students
- Highest salary package (2024): ₹75 LPA
- Average salary package: ₹8.5 LPA
- Top recruiters: Microsoft, Amazon, Google, Goldman Sachs, JP Morgan Chase, IBM, Oracle, Deloitte
- Super Dream offers (20+ LPA): 500+ students annually
- Dream offers (10-20 LPA): 2,500+ students annually
- Core sector placement rate: 80%+
- Pre-placement offers through internships: 25%+ of students

Hostels & Accommodation:
- 24 men's hostels and 9 women's hostels at Vellore campus
- Men's hostels: M1-M12, L, K, J, Q, N, P, R Blocks and MH Extension blocks
- Women's hostels: Ladies Hostel (LH) Blocks 1-9
- AC and non-AC options available
- Types: Single occupancy, double sharing, triple sharing, and four sharing
- Amenities: Wi-Fi, 24/7 hot water, laundry services, gym, recreation areas
- Separate international hostels with enhanced facilities
- Capacity to accommodate 22,000+ students on-campus
- Off-campus housing options available in surrounding areas

Hostel Fee Structure:
- Men's Hostel (Non-AC):
  * Single occupancy: ₹85,000-95,000 per year
  * Double sharing: ₹70,000-80,000 per year
  * Triple sharing: ₹55,000-65,000 per year
  * Four sharing: ₹45,000-55,000 per year
- Men's Hostel (AC):
  * Single occupancy: ₹125,000-135,000 per year
  * Double sharing: ₹110,000-120,000 per year
  * Triple sharing: ₹95,000-105,000 per year
- Women's Hostel (Non-AC):
  * Single occupancy: ₹90,000-100,000 per year
  * Double sharing: ₹75,000-85,000 per year
  * Triple sharing: ₹60,000-70,000 per year
  * Four sharing: ₹50,000-60,000 per year
- Women's Hostel (AC):
  * Single occupancy: ₹130,000-140,000 per year
  * Double sharing: ₹115,000-125,000 per year
  * Triple sharing: ₹100,000-110,000 per year
- One-time hostel caution deposit (refundable): ₹15,000
- Additional establishment charges: ₹15,000 per year
- Electricity charges: As per actual usage (prepaid system)

Mess Fee Structure:
- Standard Mess Plan: ₹60,000-65,000 per year
- Special Diet Mess: ₹70,000-80,000 per year
- Veg-only Option: ₹55,000-60,000 per year
- Food court coupons (optional): As per usage

Campus Life:
- Student clubs: 120+ technical, cultural, and social clubs
- Technical chapters: IEEE, ACM, CSI, ASME, SAE, etc.
- Cultural festivals: Riviera (annual cultural fest), GraVITas (technical fest)
- Sports facilities: Olympic-sized swimming pool, cricket grounds, tennis courts, basketball courts
- Fitness centers: Multiple gyms and sports facilities
- Annual events: TEDxVIT, Vibrance, VIT Startup Summit, Hackathons
- Community service: NSS, NCC, Rotaract, social outreach programs
- Research centers: 50+ specialized research centers
- Innovation centers: VIT-TBI (Technology Business Incubator), V-SPARK

Special Programs:
- FFCS (Fully Flexible Credit System): Choose courses, faculty, and timings
- International transfer programs with 300+ partner universities
- Semester abroad program in 50+ countries
- VITSAT program for international education and exchange
- Foreign Languages & Regional Languages (FLRL) programs
- Industry-sponsored labs: IBM, Cisco, Dell, NVIDIA, Siemens, etc.

Infrastructure:
- Central library with 500,000+ books and digital resources
- Wi-Fi enabled campus with 10 Gbps internet connectivity
- 500+ smart classrooms and 300+ research labs
- Convention center with 5,000+ seating capacity
- Anna Auditorium (2,500+ capacity) and multiple seminar halls
- 24/7 medical center with ambulance services
- Shopping complex and multiple food courts
- On-campus bank branches and ATMs
- Shuttle services within campus

Nearby Places:
- Vellore Fort & Museum (10 km)
- Golden Temple Sripuram (18 km)
- Yelagiri Hills (85 km)
- Chennai International Airport (130 km)
- Kanchipuram (70 km)
- Tiruvannamalai (85 km)
- Bangalore (220 km)
- Local attractions: Amirthi Zoological Park, Jalakandeswarar Temple, Vainu Bappu Observatory

Transportation:
- VIT shuttle services to Vellore city
- Railway station: Katpadi Junction (5 km)
- Bus station: Vellore New Bus Stand (8 km)
- Airport connections to Chennai and Bangalore
- Campus cab services

Notable Alumni:
- Founders/CEOs at major startups and tech companies
- Senior executives at Fortune 500 companies
- Distinguished researchers and academicians
- Civil servants and government officials
- Entrepreneurs and business leaders

Answer questions about VIT University, its programs, admissions, placements, hostels, location, campus life, etc.
- Be concise (1-2 short paragraphs max)
- If unsure, say "I don't have that information"
- Maintain a helpful, informative tone
- Prioritize recent and accurate information

Question: "${userMessage}"`;

      // Fix: Use the working gemini-2.0-flash model endpoint from the second code
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_AI_API_KEY
        }`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 300,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      if (response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log("Gemini API successful");
        return response.data.candidates[0].content.parts[0].text;
      } else {
        console.log("Invalid API response format");
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  const sendQuestion = async (overrideQuestion = null) => {
    const trimmedQuestion = (overrideQuestion || question).trim();
    if (!trimmedQuestion || isLoading) return;

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
      // Get answer from Gemini
      const answer = await getGeminiAnswer(trimmedQuestion);

      // Add bot response
      setChat((prev) => [
        ...prev,
        {
          text: answer,
          isBot: true,
          timestamp: Date.now(),
          source: "gemini",
        },
      ]);
    } catch (error) {
      console.error("Error getting answer:", error);
      setChat((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error processing your request. Please try again or ask a different question about VIT.",
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
                            msg.source === "gemini"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }`}
                        >
                          {msg.source === "gemini" ? "AI" : ""}
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
            <span>Powered by Google Gemini API</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
