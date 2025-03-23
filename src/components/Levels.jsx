import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Star } from "lucide-react";

export default function Levels() {
  const navigate = useNavigate();
  const { category, difficulty } = useParams();

  const levels = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    isLocked: i !== 0, // Only Level 1 is unlocked for now
    starsEarned: Math.floor(Math.random() * 4), // Dummy star data for now
  }));

  const handleBackClick = () => {
    navigate(`/play/${category}`);
  };  

  const handleLevelClick = (levelId, isLocked) => {
    if (!isLocked) {
      navigate(`/play/${category}/${difficulty}/level/${levelId}`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="relative w-screen h-screen bg-black/90 flex flex-col items-center justify-center p-4"
      >
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
          >
            ⬅
          </motion.button>
          <h1 className="bg-white/80 rounded-md px-8 py-3 text-black text-4xl font-cinzel text-center">
            Select Level
          </h1>
          <div className="w-12 h-12"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-8 mt-24">
          {levels.map((level) => (
            <motion.button
              key={level.id}
              whileHover={{ scale: !level.isLocked ? 1.05 : 1 }}
              whileTap={{ scale: !level.isLocked ? 0.95 : 1 }}
              onClick={() => handleLevelClick(level.id, level.isLocked)}
              className={`relative w-[175px] h-[175px] rounded-xl flex flex-col items-center justify-between p-4 shadow-lg transition-colors ${
                level.isLocked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white/90 hover:bg-white"
              }`}
            >
              <div className="flex flex-col items-center mt-2">
                {level.isLocked ? (
                  <Lock size={40} />
                ) : (
                  <Unlock size={40} />
                )}
                <span className="text-lg font-semibold mt-2">Lv. {level.id}</span>
              </div>

              {!level.isLocked && (
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= level.starsEarned
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill={star <= level.starsEarned ? "#facc15" : "none"}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
