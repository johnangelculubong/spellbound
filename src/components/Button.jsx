import React from "react";
import { motion } from "framer-motion";

export default function Button({ text, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.05, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
    >
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
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        {text}
      </span>
    </motion.button>
  );
}
