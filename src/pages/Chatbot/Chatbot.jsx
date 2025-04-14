import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2, Trash2, Award, GraduationCap, BookOpen, Briefcase, Home, Library, ClipboardList } from "lucide-react";

// VIT data store
const vitData = {
  university: {
    name: "Vellore Institute of Technology (VIT)",
    established: 1984,
    location: "Vellore, Tamil Nadu, India (with campuses in Chennai, Bhopal, AP, and Dubai)",
    website: "https://vit.ac.in/",
    motto: "A Place to Learn, A Chance to Grow",
    chancellor: "Dr. G. Viswanathan",
    vice_chancellor: "Dr. V. S. Kanchana Bhaaskaran",
    accreditations: [
      "NAAC A++ Grade (3.66/4.0)",
      "NBA Accreditation",
      "ABET Accreditation",
      "ACBSP Accreditation for VIT Business School",
      "ACCA Accreditation for BBA Program",
      "Charted by UGC"
    ],
    rankings: {
      NIRF: {
        overall: 11,
        university: 8,
        engineering: 9,
        management: 35,
        research: 28
      }
    }
  },
  academic_programs: {
    undergraduate: 72,
    postgraduate: 64,
    integrated: 18,
    research: 2,
    mtech_industrial: 2,
    schools: [
      "School of Computing Science and Engineering (SCOPE)",
      "School of Electrical Engineering (SELECT)",
      "School of Electronics Engineering (SENSE)",
      "School of Mechanical Engineering (SMEC)",
      "School of Civil and Chemical Engineering (SCALE)",
      "School of Bio Sciences and Technology (SBST)",
      "School of Social Sciences and Languages (SSL)",
      "VIT Business School (VIT BS)",
      "VIT School of Law (VIT SOL)",
      "School of Architecture (VSPARC)",
      "School of Design (SOD)",
      "School of Advanced Sciences (SAS)",
      "School of Data Science and Technology (SDST)"
    ],
    notable_programs: {
      engineering: [
        "Computer Science and Engineering",
        "Electronics and Communication Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical and Electronics Engineering",
        "Biotechnology",
        "Chemical Engineering",
        "Automobile Engineering",
        "Artificial Intelligence and Machine Learning",
        "Data Science",
        "Cyber Security",
        "IoT"
      ],
      computer_applications: [
        "Master of Computer Applications (MCA)",
        "Bachelor of Computer Applications (BCA)",
        "MCA (Integrated 5-year program)"
      ]
    }
  },
  hostels: {
    total: 25,
    capacity: 15000,
    facilities: [
      "24/7 security with biometric access",
      "High-speed Wi-Fi connectivity",
      "Common rooms with TVs",
      "Indoor games facilities",
      "Laundry services",
      "Mess facilities with vegetarian, non-vegetarian and Jain options",
      "RO water purifiers",
      "Gym facilities"
    ],
    fees_range: "₹1.2 - ₹2.0 Lakhs per annum (depending on room type)"
  },
  admissions: {
    undergraduate: {
      exam: "VIT Engineering Entrance Examination (VITEEE)",
      eligibility: "10+2 with minimum 60% aggregate in Physics, Chemistry, and Mathematics/Biology (55% for SC/ST)",
      important_dates: {
        application_start: "November 2023",
        application_end: "March 31, 2024",
        exam_date: "April 19-30, 2024",
        results: "May 3, 2024",
        counseling: "June 2024"
      },
      fees: {
        tuition: "₹3.75 Lakhs per annum (for BTech)",
        hostel: "₹1.2 - ₹2.0 Lakhs per annum",
        mess: "₹70,000 per annum",
        caution_deposit: "₹10,000 (refundable)"
      }
    }
  },
  placements: {
    statistics_2023: {
      total_offers: 11500,
      companies_visited: 800,
      average_package: "8.5 LPA",
      highest_package: "1.2 CPA (International)",
      median_package: "7.2 LPA",
      placement_rate: "92%"
    },
    top_recruiters: [
      "Microsoft",
      "Amazon",
      "Google",
      "TCS",
      "Cognizant",
      "Wipro",
      "Infosys",
      "Accenture",
      "IBM"
    ]
  },
  mca_program: {
    overview: "The Master of Computer Applications (MCA) program at VIT is a 2-year full-time program designed to provide advanced knowledge in computer applications and admission is done through VITMEE or merit-based on qualifying degree.",
    eligibility: "Bachelor's degree in Computer Applications (BCA) or BSc (Computer Science/IT) with Mathematics at 10+2 level with minimum 60% aggregate",
    admission_process: "Through VITMEE or merit-based on qualifying degree",
    fees: {
      tuition: "₹2.5 Lakhs per annum",
      hostel: "₹1.2 - ₹2.0 Lakhs per annum",
      other: "₹50,000 per annum (includes lab, library, etc.)"
    },
    placement: {
      average_package: "7.5 LPA",
      highest_package: "18 LPA",
      companies: "TCS, Infosys, Wipro, Cognizant, Tech Mahindra"
    }
  },
  bca_program: {
    overview: "The Bachelor of Computer Applications (BCA) is a 3-year undergraduate program focusing on computer applications and software development.",
    specializations: [
      "Cloud Technology",
      "Mobile Applications",
      "Information Security",
      "Data Analytics"
    ],
    eligibility: "10+2 with Mathematics as a subject with minimum 60% aggregate",
    admission_process: "Merit-based on 10+2 marks",
    fees: {
      tuition: "₹1.8 Lakhs per annum",
      hostel: "₹1.2 - ₹2.0 Lakhs per annum",
      other: "₹40,000 per annum"
    },
    placement: {
      average_package: "4.5 LPA",
      highest_package: "12 LPA",
      companies: "Infosys, Wipro, HCL, Capgemini, Accenture"
    }
  }
};

// Quick category setup
const quickCategories = [
  {
    title: "About VIT",
    icon: <Award className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about VIT University"
  },
  {
    title: "Admissions",
    icon: <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What are the admission requirements?"
  },
  {
    title: "Programs",
    icon: <BookOpen className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What academic programs are offered?"
  },
  {
    title: "Placements",
    icon: <Briefcase className="w-8 h-8 text-blue-500 mb-2" />,
    question: "What are the placement details?"
  },
  {
    title: "Hostels",
    icon: <Home className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about the hostel facilities"
  },
  {
    title: "MCA Program",
    icon: <Library className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about the MCA program"
  },
  {
    title: "BCA Program",
    icon: <Library className="w-8 h-8 text-blue-500 mb-2" />,
    question: "Tell me about the BCA program"
  }
];

// Quick suggestion setup
const quickSuggestions = [
  "How to apply for MCA?",
  "Hostel facilities at VIT Vellore",
  "Placement statistics 2023",
  "What is the fee structure for BCA?",
  "Healthcare facilities on campus",
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
    // Send immediately instead of waiting
    sendQuestion(questionText);
  };

  // Convert VIT data to a more concise format for the prompt
  const prepareVitDataForPrompt = () => {
    // Select most important parts to keep prompt within reasonable size
    return {
      university: vitData.university,
      academics: {
        programs: vitData.academic_programs.notable_programs,
        schools: vitData.academic_programs.schools.slice(0, 10)
      },
      admissions: vitData.admissions,
      placements: vitData.placements,
      hostels: vitData.hostels,
      mca: vitData.mca_program,
      bca: vitData.bca_program,
      contacts: vitData.important_contacts
    };
  };

  const sendQuestion = async (overrideQuestion = null) => {
    const trimmedQuestion = (overrideQuestion || question).trim();
    if (!trimmedQuestion || isLoading) return;

    setIsLoading(true);
    setQuestion("");

    // Add user message
    setChat(prev => [...prev, { 
      text: trimmedQuestion, 
      isBot: false, 
      timestamp: Date.now() 
    }]);

    try {
      const ans = await getAnswer(trimmedQuestion);
      // Add bot response
      setChat(prev => [...prev, { 
        text: ans, 
        isBot: true, 
        timestamp: Date.now() 
      }]);
    } catch (error) {
      console.error("Error getting answer:", error);
      // Use fallback answer when API fails
      setChat(prev => [...prev, { 
        text: getFallbackAnswer(trimmedQuestion), 
        isBot: true, 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback answer function in case API fails
  const getFallbackAnswer = (userMessage) => {
    const lowerQuestion = userMessage.toLowerCase();
    
    // Simple keyword matching for fallbacks
    if (lowerQuestion.includes("mca")) {
      return "The Master of Computer Applications (MCA) at VIT is a 2-year program . The fees are ₹2.5 Lakhs per annum for tuition. For more details, please visit the VIT website.";
    } 
    else if (lowerQuestion.includes("bca")) {
      return "The Bachelor of Computer Applications (BCA) at VIT is a 3-year program with specializations in Cloud Technology, Mobile Applications, Information Security, and Data Analytics. The tuition fee is ₹95,000 per annum. For more information, please check vit.ac.in.";
    }
    else if (lowerQuestion.includes("placement") || lowerQuestion.includes("job")) {
      return "VIT has excellent placement records with 11,500+ offers in 2023. The average package is 8.5 LPA, and top recruiters include Microsoft, Amazon, Google, TCS, and Cognizant. The placement rate is approximately 92%.";
    }
    else if (lowerQuestion.includes("hostel") || lowerQuestion.includes("accommodation")) {
      return "VIT has 25 hostels with a capacity of 15,000 students. Facilities include 24/7 security with biometric access, high-speed Wi-Fi, common rooms, laundry services, and mess options. The fee ranges from ₹1.2 to ₹2.0 Lakhs per annum depending on room type.";
    }
    else if (lowerQuestion.includes("admission") || lowerQuestion.includes("apply")) {
      return "For undergraduate admissions, VIT conducts VITEEE (VIT Engineering Entrance Examination). Eligibility is 10+2 with minimum 60% in Physics, Chemistry, and Mathematics/Biology. Applications typically open in November and close by March 31st. For more details, contact admission@vit.ac.in.";
    }
    
    // General fallback
    return "Based on VIT's official information, " + generateGeneralResponse(userMessage);
  };

  // Generate a general response based on the question
  const generateGeneralResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("program") || lowerQuestion.includes("course")) {
      return "VIT offers 72 undergraduate, 64 postgraduate, and 18 integrated programs across various disciplines including engineering, computing, management, and sciences. Popular programs include Computer Science and Engineering, AI and Machine Learning, Data Science, and Cyber Security. For specific program details, please visit the VIT website.";
    }
        
    return "VIT (Vellore Institute of Technology) is a prominent university established in 1984 in Vellore, Tamil Nadu, India. It has received NAAC A++ grade and is known for its quality education, infrastructure, and placement opportunities. For specific information, please check the official website at vit.ac.in.";
  };

  const getAnswer = async (userMessage) => {
    try {
      // Prepare a more concise version of VIT data
      const vitDataForPrompt = prepareVitDataForPrompt();
      
      const prompt = `You are a chatbot that provides accurate, official information about VIT (Vellore Institute of Technology).
      - Respond concisely (1-2 short paragraphs)
      - Use the following verified VIT data to answer queries
      - If unsure, say "I don't have that information"
      
      VIT DATA:
      ${JSON.stringify(vitDataForPrompt)}
      
      Question: "${userMessage}"`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_AI_API_KEY
        }`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 300
          }
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }
      );

      if (response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("API Error:", error);
      // Let the calling function handle the error
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full pt-12">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 md:pt-24 pt-96">
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
            
            {/* Quick categories */}
            <div className="mt-8 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(category.question)}
                  className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  {category.icon}
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {category.title}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Quick suggestions */}
            <div className="mt-8 w-full max-w-3xl">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 text-left">
                Try asking about:
              </h4>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(suggestion)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
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
            ))}
          </>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="p-2 bg-blue-500 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl rounded-tl-none">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
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
            className="mb-2 px-4 py-2 text-sm text-blue-500 hover:underline"
          >
            Show suggestions
          </button>
        </div>
      )}

      {/* Quick suggestions (when showing after chat has started) */}
      {showSuggestions && chat.length > 0 && (
        <div className="w-full max-w-4xl mx-auto px-4 pb-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSuggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(suggestion)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
            <button
              onClick={() => setShowSuggestions(false)}
              className="px-3 py-1 text-xs text-gray-500 hover:underline"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="w-full border-t dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={clearChat}
            disabled={chat.length === 0 || isLoading}
            className="p-2 text-gray-500 hover:text-red-500 disabled:opacity-50 transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="relative flex-grow mx-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about VIT (e.g., 'What are the engineering courses offered?')"
              className="w-full pl-4 pr-16 py-3 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={() => sendQuestion()}
              disabled={isLoading || !question.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 