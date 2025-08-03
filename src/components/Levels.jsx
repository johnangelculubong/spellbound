import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Star, Trophy, Crown, Zap } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

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

export default function Levels() {
  const navigate = useNavigate();
  const { category, difficulty } = useParams();
  const { t } = useLanguage();
  const [levels, setLevels] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    difficultyScore: 0,      // Score within this difficulty only
    completedLevels: 0,
    totalStars: 0,
    categoryScore: 0         // Total score across all difficulties in category (for unlocking logic only)
  });
  const [showLevelUnlockedAnimation, setShowLevelUnlockedAnimation] = useState(null);

  // Category-specific themes matching your difficulty component
  const categoryThemes = {
    "mystic-library": {
      background: "bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-purple-800/70",
      overlay: "bg-black/30",
      accent: "bg-purple-100/95 hover:bg-purple-50",
      lockedBg: "bg-purple-300/60",
      title: "text-purple-100",
      glow: "shadow-purple-500/40",
      particleColor: "purple"
    },
    "pirates-parley": {
      background: "bg-gradient-to-br from-amber-900/70 via-orange-900/70 to-red-900/70",
      overlay: "bg-black/30",
      accent: "bg-amber-100/95 hover:bg-amber-50",
      lockedBg: "bg-amber-300/60",
      title: "text-amber-100",
      glow: "shadow-amber-500/40",
      particleColor: "amber"
    },
    "nebula-lexis": {
      background: "bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-pink-900/70",
      overlay: "bg-black/25",
      accent: "bg-indigo-100/95 hover:bg-indigo-50",
      lockedBg: "bg-indigo-300/60",
      title: "text-indigo-100",
      glow: "shadow-indigo-500/40",
      particleColor: "indigo"
    },
    "enchanted-realm": {
      background: "bg-gradient-to-br from-emerald-900/70 via-teal-800/70 to-green-900/70",
      overlay: "bg-black/30",
      accent: "bg-emerald-100/95 hover:bg-emerald-50",
      lockedBg: "bg-emerald-300/60",
      title: "text-emerald-100",
      glow: "shadow-emerald-500/40",
      particleColor: "emerald"
    },
    default: {
      background: "bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-800/70",
      overlay: "bg-black/40",
      accent: "bg-white/95 hover:bg-white",
      lockedBg: "bg-gray-400",
      title: "text-white",
      glow: "shadow-gray-500/40",
      particleColor: "white"
    }
  };

  // Get the correct background image and theme
  const backgroundImg = categoryBackgrounds[category] || mysticLibraryImg;
  const theme = categoryThemes[category?.toLowerCase()] || categoryThemes.default;

  // Score thresholds for difficulty levels (matching Difficulty.jsx)
  const scoreThresholds = {
    apprentice: 0,
    scholar: 300,
    master: 800,
    grandmaster: 1200,
  };

  // Load level data from localStorage with proper key matching
  useEffect(() => {
    const loadLevelData = () => {
      const levelData = [];
      let difficultyScore = 0;     // Score within this difficulty only
      let completedCount = 0;
      let totalStars = 0;

      // FIXED: Load the actual category score (total across all difficulties)
      const categoryScore = parseInt(
        localStorage.getItem(`playerScore_${category}`) || "0", 
        10
      );

      // Check if current difficulty is unlocked based on category score
      const isDifficultyUnlocked = categoryScore >= scoreThresholds[difficulty];

      for (let i = 1; i <= 3; i++) {
        // Use consistent key format
        const levelKey = `${category}_${difficulty}_level_${i}`;
        const levelInfo = JSON.parse(localStorage.getItem(levelKey) || '{}');
        
        // Determine if level is unlocked
        let isUnlocked = false;
        if (!isDifficultyUnlocked) {
          isUnlocked = false; // If difficulty is locked, all levels are locked
        } else if (i === 1) {
          isUnlocked = true; // First level is always unlocked if difficulty is unlocked
        } else {
          // Check if previous level is completed
          const prevLevelKey = `${category}_${difficulty}_level_${i-1}`;
          const prevLevelInfo = JSON.parse(localStorage.getItem(prevLevelKey) || '{}');
          isUnlocked = prevLevelInfo.completed === true;
        }
        
        const levelObj = {
          id: i,
          isLocked: !isUnlocked,
          isCompleted: levelInfo.completed === true,
          starsEarned: levelInfo.stars || 0,
          score: levelInfo.score || 0,
          timestamp: levelInfo.timestamp || null,
          isNewlyUnlocked: false
        };

        levelData.push(levelObj);

        // Only count stats for completed levels within this difficulty
        if (levelObj.isCompleted) {
          difficultyScore += levelObj.score;  // This is difficulty-specific score
          completedCount++;
          totalStars += levelObj.starsEarned;
        }
      }

      setLevels(levelData);
      setPlayerStats({
        difficultyScore,    // Score within this difficulty only
        completedLevels: completedCount,
        totalStars,
        categoryScore       // Total score across all difficulties in category
      });
    };

    loadLevelData();
  }, [category, difficulty]);

  // Check for newly unlocked levels
  useEffect(() => {
    levels.forEach((level, index) => {
      if (index > 0 && !level.isLocked && levels[index - 1].isCompleted) {
        const levelKey = `${category}_${difficulty}_level_${level.id}`;
        const wasJustUnlocked = !localStorage.getItem(`${levelKey}_seen`);
        
        if (wasJustUnlocked) {
          setShowLevelUnlockedAnimation(level.id);
          localStorage.setItem(`${levelKey}_seen`, 'true');
          
          // Auto-hide after 3 seconds
          setTimeout(() => {
            setShowLevelUnlockedAnimation(null);
          }, 3000);
        }
      }
    });
  }, [levels, category, difficulty]);

  const handleBackClick = () => {
    navigate(`/play/${category}`);
  };

  const handleLevelClick = (levelId, isLocked) => {
    if (!isLocked) {
      navigate(`/play/${category}/${difficulty}/level/${levelId}`);
    }
  };

  // Get translated category name
  const getCategoryName = (cat) => {
    const categoryMap = {
      "mystic-library": "mysticLibrary",
      "pirates-parley": "piratesParley", 
      "nebula-lexis": "nebulaLexis",
      "enchanted-realm": "enchantedRealm"
    };
    return t(categoryMap[cat] || "mysticLibrary");
  };

  // Get translated difficulty name
  const getDifficultyName = (diff) => {
    const difficultyMap = {
      "apprentice": "difficultyApprentice",
      "scholar": "difficultyScholar",
      "master": "difficultyMaster",
      "grandmaster": "difficultyGrandmaster"
    };
    return t(difficultyMap[diff] || "difficultyApprentice");
  };

  const getDifficultyIcon = (diff) => {
    const icons = {
      apprentice: "🌱",
      scholar: "📖", 
      master: "⚔️",
      grandmaster: "👑"
    };
    return icons[diff] || "🎯";
  };

  const getLevelIcon = (levelId, isCompleted, starsEarned) => {
    if (isCompleted && starsEarned === 3) return <Crown className="w-8 h-8 text-yellow-400" />;
    if (isCompleted && starsEarned >= 2) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (isCompleted && starsEarned >= 1) return <Zap className="w-8 h-8 text-green-500" />;
    return <span className="text-3xl font-bold text-gray-800">{levelId}</span>;
  };

  // Enhanced floating particles
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 bg-${theme.particleColor}-300/20 rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -120],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Level Unlocked Animation Modal
  const LevelUnlockedModal = () => (
    <AnimatePresence>
      {showLevelUnlockedAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-4 overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/90 via-green-500/90 to-emerald-600/90" />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-4"
              >
                <div className="text-6xl">🔓</div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
              >
                {t('levelUnlocked')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-green-100 mb-4"
              >
                {t('levelUnlockedMessage')} {showLevelUnlockedAnimation}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setShowLevelUnlockedAnimation(null)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t('awesome') || 'Awesome!'}
              </motion.button>
            </div>

            {/* Floating celebration particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Check if difficulty is locked
  const isDifficultyLocked = playerStats.categoryScore < scoreThresholds[difficulty];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-screen h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Enhanced Dark Overlay with category-specific gradient */}
        <div className={`absolute inset-0 ${theme.background}`} />
        <div className={`absolute inset-0 ${theme.overlay}`} />
        
        {/* Enhanced floating particles */}
        <FloatingParticles />

        <div className="relative z-10 flex flex-col items-center justify-center p-4 h-full">
          {/* Enhanced Header */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackClick}
              className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300 border border-white/20"
            >
              <span className="text-2xl">⬅</span>
            </motion.button>
            
            <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border border-white/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-4xl mb-2"
              >
                {getDifficultyIcon(difficulty)}
              </motion.div>
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`${theme.title} text-3xl md:text-4xl font-bold font-cinzel mb-2 drop-shadow-lg`}
              >
                {getCategoryName(category)}
              </motion.h1>
              <motion.p 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${theme.title} text-xl opacity-90`}
              >
                {getDifficultyName(difficulty)} {t('mode') || 'Mode'}
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mt-3 rounded-full"
              />
            </div>
            
            {/* FIXED: Show difficulty-specific score, not total category score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🏆</div>
                <div className={`${theme.title} text-sm font-semibold opacity-80`}>{getDifficultyName(difficulty)} {t('score') || 'Score'}</div>
                <div className={`${theme.title} text-xl font-bold`}>{playerStats.difficultyScore}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star size={16} className="text-yellow-400" fill="#facc15" />
                  <span className={`${theme.title} text-sm font-bold`}>{playerStats.totalStars}/9</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Difficulty Locked Message */}
          {isDifficultyLocked && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20 mb-8 bg-red-500/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-red-400/50 max-w-md mx-4"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-xl font-bold mb-2">{t('difficultyLocked') || 'Difficulty Locked'}</h3>
                <p className="text-red-100">
                  Need {scoreThresholds[difficulty]} points. Current: {playerStats.categoryScore}
                </p>
              </div>
            </motion.div>
          )}

          {/* Enhanced Levels Grid */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 md:gap-12 mt-20 max-w-2xl px-4"
          >
            {levels.map((level, index) => (
              <motion.button
                key={level.id}
                initial={{ scale: 0, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  delay: 0.3 * index,
                  type: "spring",
                  stiffness: 200,
                  damping: 20 
                }}
                whileHover={{ 
                  scale: !level.isLocked ? 1.08 : 1.02,
                  y: !level.isLocked ? -12 : -4,
                  rotateY: !level.isLocked ? 5 : 2,
                  boxShadow: !level.isLocked ? 
                    `0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.1)` : 
                    `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
                }}
                whileTap={{ scale: !level.isLocked ? 0.95 : 0.98 }}
                onClick={() => handleLevelClick(level.id, level.isLocked)}
                className={`relative w-36 h-44 md:w-44 md:h-52 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-all duration-500 backdrop-blur-sm border-2 overflow-hidden ${
                  level.isLocked
                    ? `${theme.lockedBg} cursor-not-allowed border-gray-600/30`
                    : level.isCompleted
                      ? `${theme.accent} cursor-pointer border-green-400/40 ring-2 ring-green-400/30` 
                      : `${theme.accent} cursor-pointer border-white/30 hover:${theme.glow}`
                }`}
              >
                {/* Enhanced Glow effect for unlocked levels */}
                {!level.isLocked && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: level.isCompleted ? 
                        'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)' :
                        'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
                    }}
                  />
                )}

                <div className="flex flex-col items-center z-10">
                  <motion.div
                    whileHover={{ 
                      rotate: level.isLocked ? 0 : 360,
                      scale: level.isLocked ? 1 : 1.2
                    }}
                    transition={{ duration: 0.8 }}
                    className="mb-2"
                  >
                    {level.isLocked ? (
                      <Lock size={40} className="text-gray-600" />
                    ) : (
                      <div className="flex flex-col items-center">
                        {getLevelIcon(level.id, level.isCompleted, level.starsEarned)}
                      </div>
                    )}
                  </motion.div>
                  
                  <span className={`text-lg md:text-xl font-bold mb-1 ${
                    level.isLocked ? "text-gray-600" : "text-gray-800"
                  }`}>
                    {t('level') || 'Level'} {level.id}
                  </span>

                  {/* Level completion status */}
                  {!level.isLocked && (
                    <div className="text-center">
                      {level.isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full"
                        >
                          {t('completed') || 'Completed'}
                        </motion.div>
                      ) : (
                        <div className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                          {t('readyToPlay') || 'Ready to Play'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Enhanced Stars Display */}
                {!level.isLocked && level.isCompleted && level.starsEarned > 0 && (
                  <motion.div 
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.4 * index + 0.6 }}
                    className="absolute bottom-2 flex gap-1"
                  >
                    {[1, 2, 3].map((star) => (
                      <motion.div
                        key={star}
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: 360,
                          y: -5
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Star
                          size={20}
                          className={`${
                            star <= level.starsEarned
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } drop-shadow-lg`}
                          fill={star <= level.starsEarned ? "#facc15" : "none"}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Level completion indicator with animation */}
                {!level.isLocked && level.isCompleted && (
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0.7)",
                        "0 0 0 10px rgba(34, 197, 94, 0)",
                        "0 0 0 0 rgba(34, 197, 94, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white text-sm font-bold">✓</span>
                  </motion.div>
                )}

                {/* Enhanced Shine effect for unlocked levels */}
                {!level.isLocked && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 6,
                    }}
                  />
                )}

                {/* Score display for completed levels */}
                {!level.isLocked && level.isCompleted && level.score > 0 && (
                  <div className="absolute top-2 left-2 bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-bold">{level.score}</span>
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced progress indicator */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-12 text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 max-w-md w-full mx-4"
          >
            <div className={`${theme.title} text-lg font-semibold mb-4`}>
              {t('difficultyProgress') || 'Difficulty Progress'}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`${theme.title} text-sm opacity-75`}>
                {t('levels') || 'Levels'}: {playerStats.completedLevels}/{levels.length}
              </span>
              <span className={`${theme.title} text-sm opacity-75`}>
                {t('stars') || 'Stars'}: {playerStats.totalStars}/9
              </span>
            </div>
            
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(playerStats.completedLevels / levels.length) * 100}%` }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 rounded-full relative overflow-hidden"
              >
                {/* Animated shine effect in progress bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.div>
            </div>

            {playerStats.completedLevels === levels.length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className={`${theme.title} text-sm font-bold bg-green-500/20 rounded-full px-4 py-2`}
              >
                🎉 {t('difficultyCompleted') || 'Difficulty Completed'} 🎉
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Level Unlocked Modal */}
      <LevelUnlockedModal />
    </AnimatePresence>
  );
}