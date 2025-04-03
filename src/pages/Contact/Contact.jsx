import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MessageCircle,
  User,
  Mail,
  AlertTriangle,
  Type,
  Send,
  Bug,
  Lightbulb,
  Handshake,
} from "lucide-react";

const Contact = () => {
  const form = useRef();
  const [isDisabled, setDisabled] = useState(false);

  const success = () => toast.success("Message sent successfully!");
  const failed = () => toast.error("Failed to send message. Please try again.");

  const sendEmail = (e) => {
    e.preventDefault();
    setDisabled(true);

    const formEl = form.current;
    const queryType = formEl.query_type.value;
    const originalMessage = formEl.message.value;
    const fullMessage = `Query Type: ${queryType}\n\n${originalMessage}`;
    formEl.message.value = fullMessage;

    emailjs
      .sendForm("service_7fzzmul", "template_kqqxv6h", formEl, {
        publicKey: "oJkjQA-lOMAfOY9S_",
      })
      .then(
        () => {
          success();
          formEl.reset();
          setDisabled(false);
        },
        (error) => {
          failed();
          console.error("FAILED...", error.text);
          setDisabled(false);
        }
      );
  };

  return (
    <div className="py-28 min-h-screen flex items-center justify-center p-4 bg-gray-300 dark:bg-black">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-gray-700 p-8 shadow-xl dark:shadow-gray-900/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-500/10 p-4 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Vitchat Support Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            How can we assist you today?
          </p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                <User className="w-4 h-4 mr-2 text-slate-500 dark:text-gray-400" />
                Your Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                <Mail className="w-4 h-4 mr-2 text-slate-500 dark:text-gray-400" />
                Email Address
              </label>
              <input
                type="email"
                name="from_email"
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              <AlertTriangle className="w-4 h-4 mr-2 text-slate-500 dark:text-gray-400" />
              Query Type
            </label>
            <select
              name="query_type"
              required
              className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-800 dark:text-white appearance-none"
            >
              <option value="" disabled selected className="text-gray-400">
                Select query type
              </option>
              <option
                value="feature-request"
                className="text-gray-800 dark:text-gray-200"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Feature Request
              </option>
              <option
                value="bug-report"
                className="text-gray-800 dark:text-gray-200"
              >
                <Bug className="w-4 h-4 mr-2" />
                Bug Report
              </option>
              <option
                value="feedback"
                className="text-gray-800 dark:text-gray-200"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                General Feedback
              </option>
              <option
                value="partnership"
                className="text-gray-800 dark:text-gray-200"
              >
                <Handshake className="w-4 h-4 mr-2" />
                Partnership Inquiry
              </option>
              <option
                value="other"
                className="text-gray-800 dark:text-gray-200"
              >
                Other Inquiry
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              <Type className="w-4 h-4 mr-2 text-slate-500 dark:text-gray-400" />
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400"
              placeholder="Describe your query in detail..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 px-6 flex items-center justify-center font-medium rounded-lg transition-all ${
              isDisabled
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            }`}
          >
            {isDisabled ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        toastClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg dark:shadow-gray-900/30"
        progressClassName="bg-blue-500 dark:bg-blue-400"
        bodyClassName="dark:text-gray-200"
      />
    </div>
  );
};

export default Contact;
