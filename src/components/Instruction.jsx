import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import handClickGif from "../assets/hand-click.gif"; 
import gridImage from "../assets/Grid.png"; 
import submitButtonImage from "../assets/submit.png"; 
import scoreImage from "../assets/score.png"; 

const tutorialSteps = [
  { 
    text: "📖 Welcome to Spellbound! Your goal is to form words by selecting letter tiles.", 
    image: null,
    handPosition: null
  },
  { 
    text: "🟡 Click on letter tiles to select them and form words.", 
    image: gridImage,
    handPosition: { bottom: "20px", left: "40px", rotate: "-20deg" } // Hand points at a tile
  },
  { 
    text: "✅ Click 'Submit' to confirm your word and earn points!", 
    image: submitButtonImage,
    handPosition: { bottom: "-5px", right: "20px", rotate: "0deg" } // Hand points at submit button
  },
  { 
    text: "📈 Earn enough points to level up and progress!", 
    image: scoreImage,
    handPosition: null // No hand needed
  },
  { 
    text: "🎉 Now you're ready! Let's play!", 
    image: null,
    handPosition: null
  }
];

const Instruction = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/play");
    }
  };

  return (
    <motion.div
    className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-12 z-50" 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-gray-900 p-10 rounded-lg shadow-lg text-center w-4/5 max-w-3xl relative" 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
  
        {/* Progress Indicator */}
        <div className="flex justify-between mb-4">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index <= step ? "bg-yellow-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4">📜 How to Play</h2>

        {/* Tutorial Text with Animation */}
        <motion.p
          className="text-lg mb-4"
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {tutorialSteps[step].text}
        </motion.p>

        {/* Image for Explanation */}
        {tutorialSteps[step].image && (
          <motion.div className="relative inline-block">
            <motion.img
              src={tutorialSteps[step].image}
              alt="Tutorial Step"
              className="w-48 h-48 mx-auto mb-4 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Animated Hand Cursor */}
            {tutorialSteps[step].handPosition && (
              <motion.img
              src={handClickGif}
              alt="Hand Click Animation"
              className="absolute w-24 h-24" // Increased from w-16 h-16 to w-24 h-24
              style={{ 
                bottom: tutorialSteps[step].handPosition.bottom, 
                left: tutorialSteps[step].handPosition.left,
                right: tutorialSteps[step].handPosition.right,
                transform: `rotate(${tutorialSteps[step].handPosition.rotate})`,
                filter: "invert(1) brightness(2)" // Keeps it white
              }}
              animate={{ x: [0, 8, 0], y: [0, -8, 0] }} // Increased bounce effect
              transition={{ repeat: Infinity, duration: 0.8 }}
            />                 
            )}
          </motion.div>
        )}

        {/* Animated Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button text={step < tutorialSteps.length - 1 ? "Next" : "Play Now"} onClick={nextStep} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Instruction;
