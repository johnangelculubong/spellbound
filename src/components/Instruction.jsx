import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import Button from "./Button";
import handClickGif from "../assets/hand-click.gif"; 
import gridImage from "../assets/Grid.png"; 
import submitButtonImage from "../assets/submit.png"; 
import scoreImage from "../assets/score.png"; 

const Instruction = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Tutorial steps with translation keys
 const getTutorialSteps = () => [
  { 
    text: t('tutorialWelcome'),
    image: null,
    handPosition: null
  },
  { 
    text: t('tutorialClickTiles'),
    image: gridImage,
    handPosition: { bottom: "20px", left: "40px", rotate: "-20deg" }
  },
  { 
    text: t('tutorialSubmit'),
    image: submitButtonImage,
    handPosition: { bottom: "-5px", right: "20px", rotate: "0deg" }
  },
  { 
    text: t('tutorialEarnPoints'),
    image: scoreImage,
    handPosition: null
  },
  { 
    text: t('tutorialReady'),
    image: null,
    handPosition: null
  }
];

  const tutorialSteps = getTutorialSteps();

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/play");
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page (Help Settings or Main Menu)
  };

  const handleSkip = () => {
    navigate("/play"); // Skip tutorial and go directly to game
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
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 px-3 py-2 text-sm text-white border border-white/50 rounded hover:bg-white/20 transition-all duration-300"
        >
          ← {t('back')}
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 px-3 py-2 text-sm text-white/70 hover:text-white border border-white/30 rounded hover:bg-white/10 transition-all duration-300"
        >
          {t('skip')} →
        </button>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-6 mt-8">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index <= step ? "bg-yellow-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Step Counter */}
        <div className="text-white/70 text-sm mb-2">
          {t('step')} {step + 1} {t('of')} {tutorialSteps.length}
        </div>

        <h2 className="text-3xl font-bold mb-6">{t('howToPlay')}</h2>

        {/* Tutorial Text with Animation */}
        <motion.p
          className="text-lg mb-6 min-h-[3rem] flex items-center justify-center"
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
          <motion.div className="relative inline-block mb-6">
            <motion.img
              src={tutorialSteps[step].image}
              alt={t('tutorialStep')}
              className="w-48 h-48 mx-auto rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Animated Hand Cursor */}
            {tutorialSteps[step].handPosition && (
              <motion.img
                src={handClickGif}
                alt={t('handClickAnimation')}
                className="absolute w-24 h-24"
                style={{ 
                  bottom: tutorialSteps[step].handPosition.bottom, 
                  left: tutorialSteps[step].handPosition.left,
                  right: tutorialSteps[step].handPosition.right,
                  transform: `rotate(${tutorialSteps[step].handPosition.rotate})`,
                  filter: "invert(1) brightness(2)"
                }}
                animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />                 
            )}
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          {/* Previous Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={previousStep}
              disabled={step === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                step === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              ← {t('previous')}
            </button>
          </motion.div>

          {/* Step Dots for Direct Navigation */}
          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === step
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Next/Play Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              text={step < tutorialSteps.length - 1 ? t('next') : t('playNow')} 
              onClick={nextStep} 
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Instruction;