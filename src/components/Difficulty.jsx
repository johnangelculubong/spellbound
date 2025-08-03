import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

// Audio imports - matching CategoryScreen structure
import bgMusic from "../assets/audio/background.mp3";
import clickSFX from "../assets/audio/click.mp3";

import {
  playMusic,
  stopMusic,
  setMusicVolume,
  setSFXVolume,
  playSFX,
  playNotification,
  setNotificationVolume,
  restoreVolumes,
} from "../utils/AudioManager.jsx";

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

// Category title mapping for translation
const categoryTitleMapping = {
  'mystic-library': 'mysticLibrary',
  'pirates-parley': 'piratesParley',
  'nebula-lexis': 'nebulaLexis',
  'enchanted-realm': 'enchantedRealm'
};

const buttonColors = {
  "mystic-library": {
    apprentice: "from-purple-400/80 via-purple-500/80 to-indigo-600/80 hover:from-purple-500/90 hover:via-purple-600/90 hover:to-indigo-700/90",
    scholar: "from-yellow-400/80 via-yellow-500/80 to-orange-500/80 hover:from-yellow-500/90 hover:via-yellow-600/90 hover:to-orange-600/90",
    master: "from-red-500/80 via-red-600/80 to-red-700/80 hover:from-red-600/90 hover:via-red-700/90 hover:to-red-800/90",
    grandmaster: "from-purple-600/80 via-purple-700/80 to-purple-800/80 hover:from-purple-700/90 hover:via-purple-800/90 hover:to-purple-900/90",
  },
  "pirates-parley": {
    apprentice: "from-sky-400/80 via-sky-500/80 to-blue-600/80 hover:from-sky-500/90 hover:via-sky-600/90 hover:to-blue-700/90",
    scholar: "from-orange-400/80 via-orange-500/80 to-red-500/80 hover:from-orange-500/90 hover:via-orange-600/90 hover:to-red-600/90",
    master: "from-rose-500/80 via-rose-600/80 to-rose-700/80 hover:from-rose-600/90 hover:via-rose-700/90 hover:to-rose-800/90",
    grandmaster: "from-amber-600/80 via-amber-700/80 to-amber-800/80 hover:from-amber-700/90 hover:via-amber-800/90 hover:to-amber-900/90",
  },
  "nebula-lexis": {
    apprentice: "from-indigo-400/80 via-indigo-500/80 to-purple-600/80 hover:from-indigo-500/90 hover:via-indigo-600/90 hover:to-purple-700/90",
    scholar: "from-purple-400/80 via-purple-500/80 to-pink-500/80 hover:from-purple-500/90 hover:via-purple-600/90 hover:to-pink-600/90",
    master: "from-pink-500/80 via-pink-600/80 to-rose-600/80 hover:from-pink-600/90 hover:via-pink-700/90 hover:to-rose-700/90",
    grandmaster: "from-violet-600/80 via-violet-700/80 to-violet-800/80 hover:from-violet-700/90 hover:via-violet-800/90 hover:to-violet-900/90",
  },
  "enchanted-realm": {
    apprentice: "from-green-400/80 via-green-500/80 to-emerald-600/80 hover:from-green-500/90 hover:via-green-600/90 hover:to-emerald-700/90",
    scholar: "from-teal-400/80 via-teal-500/80 to-cyan-500/80 hover:from-teal-500/90 hover:via-teal-600/90 hover:to-cyan-600/90",
    master: "from-emerald-500/80 via-emerald-600/80 to-green-700/80 hover:from-emerald-600/90 hover:via-emerald-700/90 hover:to-green-800/90",
    grandmaster: "from-cyan-600/80 via-cyan-700/80 to-teal-800/80 hover:from-cyan-700/90 hover:via-cyan-800/90 hover:to-teal-900/90",
  },
};

// Score thresholds for difficulty levels
const scoreThresholds = {
  apprentice: 0,    // Always unlocked
  scholar: 300,     // Unlocks at 300 points  
  master: 800,      // Unlocks at 800 points
  grandmaster: 1200, // Unlocks at 1200 points
};

// Difficulty icons and metadata
const difficultyData = {
  apprentice: { 
    icon: "🌱", 
    progressBar: 25,
    descriptionKey: "apprenticeDesc",
    difficulty: 1
  },
  scholar: { 
    icon: "📖", 
    progressBar: 50,
    descriptionKey: "scholarDesc",
    difficulty: 2
  },
  master: { 
    icon: "⚔️", 
    progressBar: 75,
    descriptionKey: "masterDesc",
    difficulty: 3
  },
  grandmaster: { 
    icon: "👑", 
    progressBar: 100,
    descriptionKey: "grandmasterDesc",
    difficulty: 4
  },
};

export default function Difficulty() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { t, currentLanguage } = useLanguage();
  const [playerScore, setPlayerScore] = useState(0);
  const [unlockedDifficulties, setUnlockedDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null);

  // Get text direction for RTL languages
  const isRTL = ['ar', 'he', 'fa'].includes(currentLanguage);

  // Initialize audio and load player data
  useEffect(() => {
    // Initialize audio settings
    restoreVolumes();
    
    // Start background music if settings allow
    const savedMusic = localStorage.getItem("musicVolume");
    const savedMusicMuted = localStorage.getItem("musicMuted") === "true";
    
    if (savedMusic && Number(savedMusic) > 0 && !savedMusicMuted) {
      playMusic(bgMusic);
    }

    // Fetch player's score - FIXED: Only use category-specific score
    const storedScore = localStorage.getItem(`playerScore_${category}`);
    if (storedScore) {
      setPlayerScore(parseInt(storedScore, 10));
    } else {
      setPlayerScore(0); // Default to 0 for new categories
    }
  }, [category]);

  useEffect(() => {
    // Determine which difficulties are unlocked
    const unlocked = Object.keys(scoreThresholds).filter(
      (difficulty) => playerScore >= scoreThresholds[difficulty]
    );
    setUnlockedDifficulties(unlocked);
  }, [playerScore]);

  const playClickSound = () => {
    const savedSfxMuted = localStorage.getItem("sfxMuted") === "true";
    const savedSfx = localStorage.getItem("sfxVolume");
    
    if (!savedSfxMuted && savedSfx && Number(savedSfx) > 0) {
      playSFX(clickSFX);
    }
  };

  const handleBackClick = () => {
    if (isLoading) return;
    playClickSound();
    navigate("/play");
  };

  const handleDifficultySelect = async (level) => {
    if (!unlockedDifficulties.includes(level) || isLoading) return;
    
    playClickSound();
    setSelectedDifficulty(level);
    setIsLoading(true);
    
    // Add visual feedback delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    navigate(`/play/${category}/${level}`);
  };

  // Get the correct background image based on category
  const backgroundImg = categoryBackgrounds[category] || mysticLibraryImg;
  const categoryTitleKey = categoryTitleMapping[category] || 'mysticLibrary';

  // Floating particles animation
  const FloatingParticle = ({ delay, duration, x, y, size = 2 }) => (
    <motion.div
      className={`absolute w-${size} h-${size} bg-white/20 rounded-full`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -50, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.4 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={category}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Enhanced Dark Overlay with category-specific gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>
        
        {/* Floating Particles */}
        <FloatingParticle delay={0} duration={5} x={15} y={20} size={2} />
        <FloatingParticle delay={1.5} duration={4} x={85} y={25} size={1} />
        <FloatingParticle delay={3} duration={6} x={25} y={75} size={2} />
        <FloatingParticle delay={0.5} duration={4.5} x={75} y={70} size={1} />
        <FloatingParticle delay={2} duration={5.5} x={50} y={15} size={2} />

        {/* Header Section */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <motion.button
            onClick={handleBackClick}
            disabled={isLoading}
            whileHover={{ 
              scale: 1.1, 
              rotate: isRTL ? 5 : -5,
              backgroundColor: "rgba(255, 255, 255, 0.95)"
            }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('back')}
          >
            <span className={`text-xl text-white ${isRTL ? 'transform rotate-180' : ''}`}>
              ⬅
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
          >
            <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold drop-shadow-2xl">
              {t('selectDifficulty')}
            </h1>
            <p className="text-white/80 text-sm sm:text-lg font-poppins mt-2">
              {t(categoryTitleKey)}
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mt-3"
            />
          </motion.div>

          <div className="w-14 h-14"></div>
        </div>

        {/* Player Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-6 right-20 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/20 z-20"
        >
          <div className="text-center">
            <p className="text-xs font-poppins text-white/70">{t('yourScore')}</p>
            <p className="text-2xl font-bold text-white drop-shadow-lg">{playerScore}</p>
          </div>
        </motion.div>

        {/* Difficulty Buttons Container */}
        <motion.div 
          className="flex flex-col gap-4 sm:gap-6 z-10 px-4 mt-8 max-w-2xl w-full"
          variants={containerVariants}
        >
          {["apprentice", "scholar", "master", "grandmaster"].map((level, index) => {
            const isUnlocked = unlockedDifficulties.includes(level);
            const isSelected = selectedDifficulty === level;
            const isHovered = hoveredDifficulty === level;
            const difficultyInfo = difficultyData[level];
            
            return (
              <motion.button
                key={level}
                variants={buttonVariants}
                whileHover={{ 
                  scale: isUnlocked ? 1.03 : 1,
                  y: isUnlocked ? -8 : 0,
                  rotateY: isUnlocked ? 3 : 0,
                }}
                whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
                onClick={() => handleDifficultySelect(level)}
                onMouseEnter={() => setHoveredDifficulty(level)}
                onMouseLeave={() => setHoveredDifficulty(null)}
                disabled={!isUnlocked || isLoading}
                className={`relative w-full py-6 sm:py-8 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-500 shadow-2xl font-poppins overflow-hidden backdrop-blur-sm border-2 ${
                  isSelected
                    ? "ring-4 ring-white/50 ring-offset-4 ring-offset-transparent border-white/50"
                    : "border-white/20"
                } ${
                  isUnlocked
                    ? `bg-gradient-to-r ${buttonColors[category]?.[level]} text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`
                    : "bg-gray-800/60 text-gray-400 cursor-not-allowed border-gray-600/30"
                }`}
              >
                {/* Button Content */}
                <div className="relative z-10 flex items-center justify-between px-6">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.span 
                      className="text-3xl sm:text-4xl flex-shrink-0"
                      animate={isHovered && isUnlocked ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {difficultyInfo.icon}
                    </motion.span>
                    
                    <div className="text-left flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl font-bold">
                          {t(`difficulty${level.charAt(0).toUpperCase() + level.slice(1)}`)}
                        </span>
                        {!isUnlocked && (
                          <span className="text-sm bg-black/30 px-2 py-1 rounded-full flex items-center gap-1">
                            🔒 <span className="hidden sm:inline">{t('locked')}</span>
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm sm:text-base opacity-90 mt-1">
                        {isUnlocked 
                          ? t(difficultyInfo.descriptionKey)
                          : `${t('unlockAt')} ${scoreThresholds[level]} ${t('points')}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Difficulty Level Indicator */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded-full ${
                            i < difficultyInfo.difficulty 
                              ? 'bg-white shadow-lg' 
                              : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs opacity-70 hidden sm:block">
                      {t('level')} {difficultyInfo.difficulty}
                    </span>
                  </div>
                </div>

                {/* Animated background effects */}
                {isUnlocked && (
                  <>
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                    />
                    
                    {/* Glow effect on hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </>
                )}

                {/* Loading effect for selected difficulty */}
                {isSelected && isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg border border-white/20 z-20"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-poppins text-white/80">{t('progress')}:</span>
            <div className="flex gap-2">
              {["apprentice", "scholar", "master", "grandmaster"].map((level, index) => (
                <motion.div
                  key={level}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    unlockedDifficulties.includes(level)
                      ? "bg-green-400 shadow-lg shadow-green-400/40"
                      : "bg-white/30"
                  }`}
                  animate={unlockedDifficulties.includes(level) ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-white">
              {unlockedDifficulties.length}/4 {t('unlocked')}
            </span>
          </div>
        </motion.div>

        {/* Loading Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-30"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
              <span className="text-white font-poppins">{t('loading')}...</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}