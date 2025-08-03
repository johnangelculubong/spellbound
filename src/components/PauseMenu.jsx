import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useState, useEffect } from "react";

export default function PauseMenu({ isPaused, onResume, onRestart, onExit }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [particles, setParticles] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);

  // Generate floating particles
  useEffect(() => {
    if (isPaused) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    }
  }, [isPaused]);

  if (!isPaused) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
          `
        }}
      >
        {/* Animated Background Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(107,255,107,0.4) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-white relative"
          >
            {/* Glowing Ring Behind Title */}
            <motion.div
              className="absolute -top-8 w-80 h-80 rounded-full border-2 border-cyan-400 opacity-20 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background: "radial-gradient(circle, transparent 60%, rgba(0,255,255,0.1) 100%)",
                zIndex: -1,
              }}
            />

            {/* Game Title with Glow Effect */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative text-center mb-4"
            >
              <motion.div
                className="text-lg font-light tracking-[0.3em] text-cyan-300 mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(0,255,255,0.5)",
                    "0 0 20px rgba(0,255,255,0.8)",
                    "0 0 10px rgba(0,255,255,0.5)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("epicTitled")}
              </motion.div>
            </motion.div>

            {/* Pause Menu Title */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative mb-16"
            >
              <motion.h1
                className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(0,255,255,0.5))",
                  fontFamily: "'Orbitron', 'Arial Black', sans-serif"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("paused")}
              </motion.h1>
              
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-gray-300 text-sm tracking-widest mt-2"
              >
                {t("chooseNextPaused")}
              </motion.div>
            </motion.div>

            {/* Menu Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4 relative z-20"
            >
              <GameButton 
                onClick={onResume} 
                delay={0.6}
                icon="▶"
                color="from-green-500 to-emerald-600"
                glowColor="rgba(34, 197, 94, 0.5)"
              >
                {t("resumePaused")}
              </GameButton>
              
              <GameButton 
                onClick={onRestart} 
                delay={0.7}
                icon="🔄"
                color="from-blue-500 to-cyan-600"
                glowColor="rgba(59, 130, 246, 0.5)"
              >
                {t("restartPaused")}
              </GameButton>
              
              <GameButton
                onClick={() => {
                  navigate("/settings");
                  onResume();
                }}
                delay={0.8}
                icon="⚙"
                color="from-purple-500 to-violet-600"
                glowColor="rgba(147, 51, 234, 0.5)"
              >
                {t("optionsPaused")}
              </GameButton>
              
              <GameButton 
                onClick={() => setShowExitModal(true)} 
                delay={0.9}
                icon="✕"
                color="from-red-500 to-rose-600"
                glowColor="rgba(239, 68, 68, 0.5)"
              >
                {t("exitPaused")}
              </GameButton>
            </motion.div>

            {/* Pulse Ring Animation */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white opacity-10 pointer-events-none"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.1, 0, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ zIndex: -1 }}
            />
          </motion.div>
        </div>

        {/* Exit Confirmation Modal */}
        <AnimatePresence>
          {showExitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border-2 border-red-500 border-opacity-50"
                style={{
                  boxShadow: "0 0 50px rgba(239, 68, 68, 0.3), 0 20px 40px rgba(0,0,0,0.5)"
                }}
              >
                {/* Warning Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", bounce: 0.6 }}
                  className="text-6xl text-red-400 text-center mb-4"
                >
                  ⚠️
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white text-center mb-4"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                >
                  {t("exitTitlePaused")}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300 text-center mb-8 text-lg leading-relaxed max-w-sm"
                >
                  {t("exitConfirmPaused")}
                  <br />
                  <span className="text-red-300 font-semibold">{t("unsavedWarningPaused")}</span>
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 justify-center"
                >
                  <ModalButton
                    onClick={() => setShowExitModal(false)}
                    color="from-gray-600 to-gray-700"
                    hoverColor="from-gray-500 to-gray-600"
                    glowColor="rgba(156, 163, 175, 0.5)"
                  >
                    {t("cancelPaused")}
                  </ModalButton>
                  
                  <ModalButton
                    onClick={() => {
                      setShowExitModal(false);
                      onExit();
                    }}
                    color="from-red-600 to-red-700"
                    hoverColor="from-red-500 to-red-600"
                    glowColor="rgba(239, 68, 68, 0.8)"
                    danger
                  >
                    {t("exitGamePaused")}
                  </ModalButton>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function ModalButton({ children, onClick, color, hoverColor, glowColor, danger = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-bold text-lg tracking-wide text-white
        bg-gradient-to-r ${isHovered ? hoverColor : color}
        border-2 ${danger ? 'border-red-400' : 'border-gray-400'} border-opacity-30
        transition-all duration-200 min-w-[120px]
        ${danger ? 'hover:border-red-300' : 'hover:border-gray-300'}
      `}
      style={{
        boxShadow: isHovered 
          ? `0 0 25px ${glowColor}, 0 5px 15px rgba(0,0,0,0.3)`
          : `0 0 10px ${glowColor}, 0 3px 10px rgba(0,0,0,0.2)`,
      }}
    >
      {children}
      
      {/* Extra glow for danger button */}
      {danger && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)",
            filter: "blur(8px)"
          }}
          animate={isHovered ? { opacity: 0.8 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

function GameButton({ children, onClick, delay, icon, color, glowColor }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ x: -100, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100,
        damping: 10 
      }}
      whileHover={{ 
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        relative px-8 py-4 text-white font-bold text-xl tracking-wider
        bg-gradient-to-r ${color}
        rounded-full shadow-2xl overflow-hidden
        border-2 border-white border-opacity-20
        min-w-[280px] flex items-center justify-center gap-4
        transform transition-all duration-200 cursor-pointer z-30
      `}
      style={{
        boxShadow: isHovered 
          ? `0 0 40px ${glowColor}, 0 10px 30px rgba(0,0,0,0.3)`
          : `0 0 20px ${glowColor}, 0 5px 15px rgba(0,0,0,0.2)`,
      }}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={isHovered ? {
          x: [-300, 300],
          opacity: [0, 0.3, 0],
        } : {}}
        transition={{ duration: 0.6 }}
      />
      
      {/* Icon */}
      <motion.span 
        className="text-2xl"
        animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>
      
      {/* Text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{ 
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(10px)"
        }}
        animate={isHovered ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}