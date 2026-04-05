import { useState, useEffect, useRef } from "react";
import socket from "../../lib/socket";
import { MessageCircleHeart, Loader2, UserRound, ArrowRight } from "lucide-react";

const RandomChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [partner, setPartner] = useState(null);
  const messagesEndRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user] = useState({
    id: storedUser.email || "",
    name: storedUser.name || "Anonymous",
    profilePic: storedUser.image || "",
  });

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => {
          if (newMessage?.id && msg?.id) {
            return msg.id === newMessage.id;
          }
          return msg.time === newMessage.time && msg.senderId === newMessage.senderId;
        });
        return exists ? prev : [...prev, newMessage];
      });
    };

    socket.on("match-found", (partner) => {
      setPartner(partner);
      setStatus("connected");
      setMessages([]);
    });

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("partner-disconnected", () => {
      setStatus("idle");
      setMessages([]);
    });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("match-found");
      socket.off("partner-disconnected");
    };
  }, []);

  const startRandomChat = () => {
    setStatus("searching");
    socket.emit("find-partner", {
      userId: user.id,
      name: user.name,
      profilePic: user.profilePic,
    });
  };

  const disconnectChat = () => {
    socket.emit("leave-chat");
    setStatus("idle");
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: user.id,
        text: message,
        name: user.name,
        profilePic: user.profilePic,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        id: Date.now() + Math.random().toString(36).substr(2, 9),
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100svh-3.5rem-4rem)] md:h-[calc(100dvh-4rem)] w-full mt-14 md:mt-16 min-h-0 bg-gradient-to-b from-sky-50/70 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="px-3 py-2 border-b border-sky-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-500/20">
              <MessageCircleHeart className="w-4 h-4 text-sky-600 dark:text-sky-300" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                Random Chat
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Meet a new VITian instantly
              </p>
            </div>
          </div>

          <span
            className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full ${
              status === "connected"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                : status === "searching"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {status === "connected" ? "Connected" : status === "searching" ? "Searching" : "Idle"}
          </span>
        </div>

        {status === "connected" && (
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 rounded-full bg-sky-100/70 dark:bg-slate-800/80 px-2.5 py-1.5">
              {partner?.profilePic ? (
                <img
                  src={partner?.profilePic}
                  alt={partner?.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-sky-200 dark:bg-slate-700 grid place-items-center">
                  <UserRound className="w-4 h-4 text-sky-700 dark:text-slate-300" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {partner?.name || "Anonymous"}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Online now</p>
              </div>
            </div>
            <button
              onClick={disconnectChat}
              className="shrink-0 px-3 py-1.5 text-[11px] md:text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-full transition-colors"
            >
              End
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto w-full px-3 md:px-4 py-4 md:py-6">
        {status === "searching" ? (
          <div className="h-full grid place-items-center">
            <div className="w-full max-w-sm rounded-2xl border border-sky-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-5 text-center shadow-sm">
              <Loader2 className="w-8 h-8 text-sky-500 mx-auto animate-spin" />
              <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Finding someone...</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Matching you with another VIT student.</p>
            </div>
          </div>
        ) : messages.length === 0 && status === "idle" ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-md rounded-3xl border border-sky-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 shadow-sm">
              <div className="w-14 h-14 rounded-2xl mx-auto bg-gradient-to-br from-sky-500 to-cyan-500 grid place-items-center text-white text-2xl">
                💬
              </div>
              <h2 className="mt-4 text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                Meet Someone New
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400">
                Start a private random conversation with another VITian.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 text-left">
                <div className="rounded-xl bg-sky-50 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  1. Tap Start Random Chat
                </div>
                <div className="rounded-xl bg-sky-50 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  2. Wait for instant matching
                </div>
                <div className="rounded-xl bg-sky-50 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  3. Chat and connect safely
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-3 md:space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  msg.senderId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[92%] md:max-w-[80%] flex gap-2 md:gap-3 ${
                    msg.senderId === user.id ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.profilePic ? (
                    <img
                      src={msg.profilePic}
                      alt={msg.name}
                      className="w-8 h-8 rounded-full mt-1 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full mt-1 bg-slate-200 dark:bg-slate-700 grid place-items-center">
                      <UserRound className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl shadow-sm ${
                      msg.senderId === user.id
                        ? "bg-sky-600 text-white rounded-br-md"
                        : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md border border-sky-100 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-xs font-semibold opacity-90">{msg.name}</span>
                      <span className="text-[10px] md:text-xs opacity-75">{msg.time}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {status === "connected" ? (
        <div className="bg-white/95 dark:bg-slate-950/80 backdrop-blur border-t border-sky-100 dark:border-slate-800 w-full p-2.5">
          <div className="w-full rounded-2xl border border-sky-200 dark:border-slate-700 bg-sky-50/80 dark:bg-slate-900 p-1.5 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent px-2.5 py-2 text-base md:text-base focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="shrink-0 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50 disabled:hover:bg-sky-600"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white/95 dark:bg-slate-950/80 backdrop-blur border-t border-sky-100 dark:border-slate-800">
          <button
            onClick={startRandomChat}
            disabled={status === "searching"}
            className={`px-5 py-3 text-sm font-semibold rounded-2xl transition-all w-full flex items-center justify-center gap-2 ${
              status === "searching"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white"
            }`}
          >
            {status === "searching" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching for VITians...
              </>
            ) : (
              <>
                Start Random Chat
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomChat;
