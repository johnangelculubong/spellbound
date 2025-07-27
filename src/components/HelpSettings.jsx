import React from "react";
import { useNavigate } from "react-router-dom";

export default function HelpSettings() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item === "How to play") {
      navigate("/instructions");
    } else if (item === "Feedback") {
      navigate("/feedback");
    } else if (item === "Support") {
      navigate("/support");
    } else {
      alert(`${item} page is coming soon.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <h2 className="text-white font-bold font-cinzel text-5xl mb-16">
        Help & Support
      </h2>

      <div className="flex flex-col items-center space-y-10 w-full max-w-md">
        {["How to play", "Feedback", "Support"].map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className="w-full text-white text-3xl font-poppins border border-white/50 rounded-xl py-4 bg-white/10 backdrop-blur transition hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/80"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
