import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Backgrounds for categories
import mysticLibraryImg from "../assets/mystic-library.png";
import piratesParleyImg from "../assets/pirates-parley.png";
import nebulaLexisImg from "../assets/nebula-lexis.png";
import enchantedRealmImg from "../assets/enchanted-realm.png";

const categoryBackgrounds = {
  "mystic-library": mysticLibraryImg,
  "pirates-parley": piratesParleyImg,
  "nebula-lexis": nebulaLexisImg,
  "enchanted-realm": enchantedRealmImg,
};

// Button Colors Based on Category (with Fallback)
const defaultButtonColors = {
  apprentice: "bg-gray-300 hover:bg-gray-400",
  scholar: "bg-gray-400 hover:bg-gray-500",
  master: "bg-gray-500 hover:bg-gray-600",
  grandmaster: "bg-gray-700 text-gray-400",
};

const buttonColors = {
  "mystic-library": {
    apprentice: "bg-lime-400 hover:bg-lime-500",
    scholar: "bg-yellow-400 hover:bg-yellow-500",
    master: "bg-red-500 hover:bg-red-600",
    grandmaster: "bg-gray-700 text-gray-400",
  },
  "pirates-parley": {
    apprentice: "bg-sky-400 hover:bg-sky-500",
    scholar: "bg-orange-400 hover:bg-orange-500",
    master: "bg-rose-500 hover:bg-rose-600",
    grandmaster: "bg-gray-700 text-gray-400",
  },
  "nebula-lexis": {
    apprentice: "bg-indigo-400 hover:bg-indigo-500",
    scholar: "bg-purple-400 hover:bg-purple-500",
    master: "bg-pink-500 hover:bg-pink-600",
    grandmaster: "bg-gray-700 text-gray-400",
  },
  "enchanted-realm": {
    apprentice: "bg-green-400 hover:bg-green-500",
    scholar: "bg-teal-400 hover:bg-teal-500",
    master: "bg-emerald-500 hover:bg-emerald-600",
    grandmaster: "bg-gray-700 text-gray-400",
  },
};

// Score-based difficulty unlocking
const scoreThresholds = {
  apprentice: 0,
  scholar: 100,
  master: 250,
  grandmaster: 500,
};

export default function Difficulty() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [playerScore, setPlayerScore] = useState(0);
  const [unlockedDifficulties, setUnlockedDifficulties] = useState([]);

  // Retrieve Score & Set Unlocks in One Effect
  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("playerScore") || "0", 10);
    setPlayerScore(storedScore);
    setUnlockedDifficulties(
      Object.keys(scoreThresholds).filter((difficulty) => storedScore >= scoreThresholds[difficulty])
    );
  }, []);

  // Navigate Back to Category Screen Instead of Play Screen
  const handleBackClick = () => {
    navigate(`/play/${category}`);
  };

  // Format Category Name for Display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get Category Background or Default
  const backgroundImg = categoryBackgrounds[category] || mysticLibraryImg;
  const categoryColors = buttonColors[category] || defaultButtonColors;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="relative w-screen h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Header with Back Button */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <motion.button
            whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            ⬅
          </motion.button>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 rounded-md px-4 sm:px-12 py-3 sm:py-4 text-black text-xl sm:text-4xl font-cinzel text-center"
          >
            Select Difficulty: {formattedCategory}
          </motion.h1>

          <div className="w-12 h-12"></div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex flex-col gap-6 z-10">
          {["apprentice", "scholar", "master", "grandmaster"].map((level, index) => {
            const isUnlocked = unlockedDifficulties.includes(level);
            return (
              <motion.button
                key={level}
                whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
                whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
                onClick={() => isUnlocked && navigate(`/play/${category}/${level}/levels`)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`w-64 py-4 rounded-lg font-bold text-2xl transition-colors duration-300 shadow-xl font-poppins ${
                  isUnlocked
                    ? categoryColors[level] || "bg-white/80 hover:bg-white/90"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
                {!isUnlocked && (
                  <span className="text-sm block">Unlock at {scoreThresholds[level]} points</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
