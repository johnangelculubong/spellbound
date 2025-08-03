import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

// Audio imports - matching AudioSettings.jsx structure
import bgMusic from "../assets/audio/background.mp3";
import clickSFX from "../assets/audio/click.mp3";

import mysticLibraryImg from "../assets/mystic-library.png";
import piratesParleyImg from "../assets/pirates-parley.png";
import nebulaLexisImg from "../assets/nebula-lexis.png";
import enchantedRealmImg from "../assets/enchanted-realm.png";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg";
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

export default function CategoryScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState({});

  // Categories with additional metadata
  const categories = [
    { 
      nameKey: "mysticLibrary", 
      urlKey: "mystic-library",
      image: mysticLibraryImg,
      descriptionKey: "mysticLibraryDesc",
      color: "from-purple-500/30 to-indigo-600/30",
      hoverColor: "group-hover:shadow-purple-500/50"
    },
    { 
      nameKey: "piratesParley", 
      urlKey: "pirates-parley",
      image: piratesParleyImg,
      descriptionKey: "piratesParleyDesc",
      color: "from-orange-500/30 to-red-600/30",
      hoverColor: "group-hover:shadow-orange-500/50"
    },
    { 
      nameKey: "nebulaLexis", 
      urlKey: "nebula-lexis",
      image: nebulaLexisImg,
      descriptionKey: "nebulaLexisDesc",
      color: "from-cyan-500/30 to-blue-600/30",
      hoverColor: "group-hover:shadow-cyan-500/50"
    },
    { 
      nameKey: "enchantedRealm", 
      urlKey: "enchanted-realm",
      image: enchantedRealmImg,
      descriptionKey: "enchantedRealmDesc",
      color: "from-emerald-500/30 to-green-600/30",
      hoverColor: "group-hover:shadow-emerald-500/50"
    },
  ];

  // Load category progress on mount
  useEffect(() => {
    const loadCategoryProgress = () => {
      const progress = {};
      categories.forEach(cat => {
        const categoryData = JSON.parse(localStorage.getItem(`category_${cat.urlKey}`) || '{}');
        progress[cat.urlKey] = {
          totalLevelsCompleted: categoryData.totalLevelsCompleted || 0,
          highestDifficulty: categoryData.highestDifficulty || 'apprentice',
          completionPercentage: categoryData.completionPercentage || 0
        };
      });
      setCategoryProgress(progress);
    };

    loadCategoryProgress();
  }, []);

  // Preload images for better performance and initialize audio
  useEffect(() => {
    categories.forEach(cat => {
      const img = new Image();
      img.src = cat.image;
    });
    
    // Initialize audio settings when component mounts
    restoreVolumes();
    
    // Start background music if not muted and volume > 0
    const savedMusic = localStorage.getItem("musicVolume");
    const savedMusicMuted = localStorage.getItem("musicMuted") === "true";
    
    if (savedMusic && Number(savedMusic) > 0 && !savedMusicMuted) {
      playMusic(bgMusic);
    }
    
    // Cleanup function to stop music when component unmounts
    return () => {
      // Optionally stop music when leaving this screen
      // stopMusic();
    };
  }, []);

  const handleCardClick = async (category) => {
    if (isLoading) return;
    
    // Play click sound effect (check if SFX is not muted)
    const savedSfxMuted = localStorage.getItem("sfxMuted") === "true";
    const savedSfx = localStorage.getItem("sfxVolume");
    
    if (!savedSfxMuted && savedSfx && Number(savedSfx) > 0) {
      playSFX(clickSFX);
    }
    
    setSelectedCategory(category.urlKey);
    setIsLoading(true);
    
    // Add a small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Store selected category for background usage
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    
    navigate(`/play/${category.urlKey}`);
  };

  const handleBackClick = () => {
    if (isLoading) return;
    
    // Play click sound effect (check if SFX is not muted)
    const savedSfxMuted = localStorage.getItem("sfxMuted") === "true";
    const savedSfx = localStorage.getItem("sfxVolume");
    
    if (!savedSfxMuted && savedSfx && Number(savedSfx) > 0) {
      playSFX(clickSFX);
    }
    
    navigate("/");
  };

  // Floating particles animation
  const FloatingParticle = ({ delay, duration, x, y }) => (
    <motion.div
      className="absolute w-2 h-2 bg-white/20 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
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

  const getProgressBadge = (urlKey) => {
    const progress = categoryProgress[urlKey];
    if (!progress) return null;

    if (progress.completionPercentage === 100) {
      return (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg">
          COMPLETE
        </div>
      );
    } else if (progress.totalLevelsCompleted > 0) {
      return (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg">
          {progress.completionPercentage}%
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Enhanced Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
        
        {/* Floating Particles */}
        <FloatingParticle delay={0} duration={4} x={10} y={20} />
        <FloatingParticle delay={1} duration={5} x={80} y={30} />
        <FloatingParticle delay={2} duration={3.5} x={15} y={70} />
        <FloatingParticle delay={3} duration={4.5} x={85} y={60} />
        <FloatingParticle delay={1.5} duration={6} x={50} y={15} />

        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <motion.button
            onClick={handleBackClick}
            disabled={isLoading}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('back')}
          >
            <span className="text-xl text-white">⬅</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center"
          >
            <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold drop-shadow-2xl">
              {t('selectCategory')}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mt-2"
            />
          </motion.div>

          <div className="w-14 h-14"></div>
        </div>

        {/* Category Cards Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10 mt-20 z-10 px-4 max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.nameKey}
              whileHover={{ 
                scale: 1.03,
                y: -15,
                transition: { duration: 0.4, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(cat)}
              initial={{ 
                opacity: 0, 
                y: 80, 
                rotateX: 45,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                scale: 1,
                transition: { 
                  delay: 0.3 + index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }
              }}
              className={`cursor-pointer flex flex-col items-center group relative ${
                isLoading && selectedCategory !== cat.urlKey ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              {/* Card Container */}
              <div className="relative perspective-1000">
                <motion.div
                  className={`w-44 sm:w-56 lg:w-64 h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group-hover:border-white/50 transition-all duration-500 ${cat.hoverColor} group-hover:shadow-2xl backdrop-blur-sm`}
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                >
                  {/* Progress Badge */}
                  {getProgressBadge(cat.urlKey)}

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Loading State */}
                  {isLoading && selectedCategory === cat.urlKey && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                      />
                    </div>
                  )}
                  
                  {/* Play Button */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.div 
                      className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-white text-2xl lg:text-3xl">▶</span>
                    </motion.div>
                  </motion.div>

                  {/* Category Info Panel */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <p className="text-sm text-white/80 text-center">
                      {t('clickToPlay')}
                    </p>
                    {categoryProgress[cat.urlKey]?.totalLevelsCompleted > 0 && (
                      <p className="text-xs text-white/60 text-center mt-1">
                        {categoryProgress[cat.urlKey].totalLevelsCompleted} levels completed
                      </p>
                    )}
                  </motion.div>
                </motion.div>
                
                {/* Enhanced Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-60 transition-all duration-500 blur-xl -z-10 scale-110`} />
              </div>

              {/* Category Name with better typography */}
              <motion.div 
                className="mt-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-cinzel font-bold drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300">
                  {t(cat.nameKey)}
                </h3>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "80%" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 text-center z-10"
        >
          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm font-poppins">
            <span>{t('gameTitle')}</span>
            <span>•</span>
            <span>{categories.length} {t('categories')}</span>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              <span className="text-white text-sm">{t('loading')}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}