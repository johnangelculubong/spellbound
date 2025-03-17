import React from "react";

export default function HelpSettings() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <h2
        className="text-white font-bold font-cinzel text-5xl mb-16"
      >
        Help & Support
      </h2>

      <div className="flex flex-col items-center space-y-10 w-full max-w-md">
        {["How to play", "Feedback", "Support"].map((item, index) => (
          <button
            key={index}
            className="w-full text-white text-3xl font-poppins border border-white/50 rounded-xl py-4 bg-white/10 backdrop-blur transition hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/80"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
