import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="relative group">
      <img
        src={require("../assets/buttonNormal.png")}
        alt="button"
        className="w-96"
      />
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: '"IM FELL English", serif',
          fontSize: "36px", 
          color: "white",
        }}
      >
        {text}
      </span>
    </button>
  );
}
