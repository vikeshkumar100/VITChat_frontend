import React from "react";

const SecondaryButton = ({ text, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-base sm:text-lg text-slate-800 dark:text-slate-200 transition-colors ${className}`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;