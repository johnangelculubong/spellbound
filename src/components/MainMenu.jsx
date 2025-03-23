import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg"; // Library BG
import dragonImg from "../assets/comodo-7014193_1920.png"; // Dragon
import bgMusic from "../assets/audio/background.mp3"; // Background Music
import darkClickSFX from "../assets/audio/click.mp3"; // Button Click SFX
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [sourceNode, setSourceNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);

        // Load background music
        const response = await fetch(bgMusic);
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedBuffer);
      }
    };

    initAudio();
  }, []);

  useEffect(() => {
    if (audioContext && audioBuffer && !isPlaying) {
      const playBackgroundMusic = () => {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(audioContext.destination);
        source.start(0);
        setSourceNode(source);
        setIsPlaying(true);
      };

      if (audioContext.state === "suspended") {
        audioContext.resume().then(playBackgroundMusic);
      } else {
        playBackgroundMusic();
      }
    }

    return () => {
      if (sourceNode) {
        sourceNode.stop();
      }
    };
  }, [audioContext, audioBuffer]);

  // Play dark fantasy button click sound
  const playDarkButtonSound = () => {
    const audio = new Audio(darkClickSFX);
    audio.volume = 0.7; // Adjust if needed (0.0 - 1.0)
    audio.play();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Moving Background Image */}
      <motion.img
        src={backgroundImg}
        alt="Library Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ scale: 1.1 }}
        animate={{ x: [-50, 50, -50] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Dragon Animation */}
      <motion.img
        src={dragonImg}
        alt="Dragon"
        className="absolute -top-15 -right-20 w-[850px] z-10"
        initial={{ scale: 0.95, rotate: -2 }} // Slightly smaller and tilted
        animate={{ scale: [0.95, 1, 0.95], rotate: [-2, 2, -2] }} // Breathing effect + subtle tilt
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
        <Button text="Play" onClick={() => { playDarkButtonSound(); navigate("/play"); }} />
        <Button text="Learn How to Play" onClick={() => { playDarkButtonSound(); navigate("/instructions"); }} />
        <Button text="Settings" onClick={() => { playDarkButtonSound(); navigate("/settings"); }} />
        <Button text="Exit" onClick={() => { playDarkButtonSound(); alert("Exit Game!"); }} />
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
