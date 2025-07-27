import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg";
import dragonImg from "../assets/comodo-7014193_1920.png";
import bgMusic from "../assets/audio/background.mp3";
import darkClickSFX from "../assets/audio/click.mp3";
import { useNavigate } from "react-router-dom";
import {
  playMusic,
  stopMusic,
  playSFX,
} from "../utils/AudioManager.jsx";

const MainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    playMusic(bgMusic); // Controlled by global volume
    return () => {
      stopMusic(); // Clean up when leaving
    };
  }, []);

  const handleClick = (path) => {
    playSFX(darkClickSFX); // Controlled by global SFX volume
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Background */}
      <motion.img
        src={backgroundImg}
        alt="Library Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ scale: 1.1 }}
        animate={{ x: [-50, 50, -50] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Dragon */}
      <motion.img
        src={dragonImg}
        alt="Dragon"
        className="absolute -top-15 -right-20 w-[850px] z-10"
        initial={{ scale: 0.95, rotate: -2 }}
        animate={{ scale: [0.95, 1, 0.95], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
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
        <Button text="Play" onClick={() => handleClick("/play")} />
        <Button text="Learn How to Play" onClick={() => handleClick("/instructions")} />
        <Button text="Settings" onClick={() => handleClick("/settings")} />
        <Button text="Exit" onClick={() => {
         playSFX(darkClickSFX);
         navigate("/goodbye");
         }} />

      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
