import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg"; // library bg
import dragonImg from "../assets/comodo-7014193_1920.png"; // dragon
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Library Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dragon Image */}
      <motion.img
        src={dragonImg}
        alt="Dragon"
        className="absolute -top-15  -right-20 w-[850px] z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />

      {/* Header */}
      <motion.div
        className="absolute top-10 w-full flex justify-center z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1
          className="text-9xl font-bold text-white mb-8"
          style={{
            fontFamily: "Cinzel, serif",
            textShadow: `
              -3px -3px 0 #B22222, 
              3px -3px 0 #B22222, 
              -3px 3px 0 #B22222, 
              3px 3px 0 #B22222
            `,
          }}
        >
          Spellbound
        </h1>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center space-y-6 mt-20 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Button text="Play" onClick={() => navigate("/play")} />
        <Button text="Learn How to Play" onClick={() => alert("Show tutorial!")} />
        <Button text="Settings" onClick={() => navigate("/settings")} />
        <Button text="Exit" onClick={() => alert("Exit Game!")} />
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
