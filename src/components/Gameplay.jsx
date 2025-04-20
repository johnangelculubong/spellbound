import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tileTexture from "../assets/tile-texture.jpg";
import PauseMenu from "./PauseMenu";

// Constants
const rows = 8;
const cols = 8;
const level = 1;
const requiredLetters = 3;

const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

const wordList = [
  "MAGIC", "BET", "SPELL", "DRAGON", "WIZARD", "POTION",
  "CAST", "WAND", "BOOK", "FLAME", "CHARM",
  "HEX", "ENCHANT", "MYTH", "ELDER", "FIRE",
  "POWER", "SPELLBOUND", "MYSTIC", "ARCANE", "RUNE"
];

export default function Gameplay() {
  const { levelId, category, difficulty } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(levelId, 10) || 1;

  // Define time multipliers for different difficulties
  const timeModifiers = {
    apprentice: 40,  // Longer time for easy level
    intermediate: 30,
    expert: 20,  // Shorter time for hard level
  };

  // Adjust initial time based on the difficulty
  const initialTime = timeModifiers[difficulty] || 30 - currentLevel * 2;

  const [score, setScore] = useState(0);
  const targetScore = 200 + currentLevel * 50;
  const progress = Math.min((score / targetScore) * 100, 100);

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomLetter())
    )
  );
  const [selected, setSelected] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFailed, setIsModalFailed] = useState(false);
  const [isModalTooLong, setIsModalTooLong] = useState(false);
  const [submittedWords, setSubmittedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showNotification, setShowNotification] = useState(true);  // Notification state

  const handleClick = (r, c) => {
    if (selected.length >= requiredLetters) {
      setIsModalTooLong(true);  // Show modal if too many letters selected
      return;
    }
    setSelected([...selected, { r, c }]);
  };
  

  const submitWord = () => {
    const word = selected.map((tile) => grid[tile.r][tile.c]).join("");
  
    if (word.length < 3 || submittedWords.includes(word) || !wordList.includes(word)) {
      setIsModalOpen(true);
      return;
    }
  
    // Add score for the correct word
    setScore(score + word.length * 10);
    
    // Add time bonus (3 seconds for a valid word)
    setTimeLeft((prev) => prev + 3); // Add 3 seconds to the remaining time
  
    const newGrid = [...grid.map((row) => [...row])];
    selected.forEach(({ r, c }) => (newGrid[r][c] = null));
    dropTiles(newGrid);
  
    setSubmittedWords([...submittedWords, word]);
    setSelected([]);
  };

  const clearLastLetter = () => {
    setSelected(selected.slice(0, selected.length - 1));
  };

  const dropTiles = (newGrid) => {
    for (let c = 0; c < cols; c++) {
      for (let r = rows - 1; r >= 0; r--) {
        if (newGrid[r][c] === null) {
          for (let above = r - 1; above >= 0; above--) {
            if (newGrid[above][c] !== null) {
              newGrid[r][c] = newGrid[above][c];
              newGrid[above][c] = null;
              break;
            }
          }
        }
      }
      for (let r = 0; r < rows; r++) {
        if (newGrid[r][c] === null) {
          newGrid[r][c] = randomLetter();
        }
      }
    }
    setGrid(newGrid);
  };

  const clearSelection = () => setSelected([]);
  const closeModal = () => setIsModalOpen(false);
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (!isPaused && timeLeft > 0 && gameStatus === "playing") {
      const id = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      setTimerId(id);
      return () => clearInterval(id);
    }
    if (timeLeft === 0) {
      setGameStatus("failed");
      setIsModalFailed(true);
    }
    if (score >= targetScore) {
      setGameStatus("completed");
      setIsModalFailed(true);
    }
    return () => clearInterval(timerId);
  }, [isPaused, timeLeft, gameStatus, score, targetScore]);

  const handleRestart = () => {
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => randomLetter())
      )
    );
    setTimeLeft(initialTime);
    setGameStatus("playing");
    setIsModalOpen(false);
    setIsModalFailed(false);
    setScore(0);
    setSelected([]);
    setSubmittedWords([]);
    setIsPaused(false);
  };

  useEffect(() => {
    handleRestart();
  }, [levelId]);

  const handleExit = () => navigate("/");
  const handleNextLevel = () => navigate(`/play/${category}/${difficulty}/level/${currentLevel + 1}`);

  // Hide notification after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-row items-stretch bg-[#222] text-white min-h-screen w-screen overflow-hidden ${isPaused ? "filter blur-md" : ""}`}
      >
        {/* Sidebar */}
        <div className="w-1/3 bg-[#1b1b1b] text-white flex flex-col justify-between p-4 shadow-xl" style={{ backgroundColor: "#1b1b1b" }}>
          <div className="flex flex-col gap-4 items-center">
            <h1
              className="text-3xl font-extrabold text-white font-serif"
              style={{
                fontFamily: "Cinzel, serif",
                textShadow: `-3px -3px 0 #B22222, 3px -3px 0 #B22222, -3px 3px 0 #B22222, 3px 3px 0 #B22222`
              }}
            >
              SPELLBOUND
            </h1>
            <div className="w-full border-2 border-gray-400 py-2 text-center text-xl font-bold">
              {score}
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="text-center text-sm font-medium text-gray-700 mb-1">
                Progress to next level
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4 shadow-inner">
                <div
                  className="bg-[#B22222] h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center text-xs mt-1 text-gray-600">
                {score} / {targetScore}
              </div>
            </div>

            <div className="w-full text-center mt-4">
              <div className="text-3xl font-bold text-white">
                Time Left: <span className="text-[#FF6347]">{timeLeft}s</span>
              </div>
              <div className="w-full mt-2 bg-[#FF6347] h-2 rounded-full">
                <div
                  className="bg-[#B22222] h-2 rounded-full"
                  style={{ width: `${(timeLeft / initialTime) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-4 w-full">
              {/* Submit Button */}
              <button
                onClick={submitWord}
                className="w-full border-4 border-[#B22222] py-3 font-extrabold text-white bg-[#B22222] hover:bg-green-500 transition-colors duration-300 rounded-lg shadow-lg text-xl"
              >
                SUBMIT
              </button>

              {/* Clear Button */}
              <button
                onClick={clearLastLetter}
                className="w-full border-4 border-[#B22222] py-3 font-extrabold text-white bg-[#B22222] hover:bg-white hover:text-black transition-colors duration-300 rounded-lg shadow-lg text-xl"
              >
                CLEAR WORD
              </button>
              
            </div>
          </div>
          <div className="mt-4 h-[200px] bg-red-900/90 text-white p-4 rounded-xl shadow-lg w-full max-w-xl">
  <p className="text-xl font-bold mb-6 text-center">Mission</p>
  <p className="text-2xl text-center">
    Form a word with <span className="text-yellow-300 font-bold">{requiredLetters} letters</span> only.
  </p>
</div>

          <div className="flex justify-around items-center mt-8">
            <button onClick={handlePause} className="bg-[#B22222] px-4 py-2 rounded shadow text-white hover:bg-[#A11B22]">⏸</button>
            <button className="bg-[#B22222] px-4 py-2 rounded shadow text-white hover:bg-[#A11B22]">🔊</button>
            <button className="bg-[#B22222] px-4 py-2 rounded shadow text-white hover:bg-[#A11B22]">❓</button>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="w-2/3 flex flex-col items-center p-4">
          <div className="flex flex-col items-center mb-6 w-full">
            <div className="w-full flex justify-center items-center bg-[#D4AF75] p-2 rounded-md shadow-lg border-4 border-[#A87C4F]">
              <h2 className="text-xl font-semibold text-black">
                <strong>Selected Word: </strong>
                {selected.length === 0 ? "No word selected" : selected.map((tile) => grid[tile.r][tile.c]).join("")}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6 w-full">
            <div className="w-full flex justify-center items-center bg-[#D4AF75] p-2 rounded-md shadow-lg border-4 border-[#A87C4F]">
              <h2 className="text-xl font-semibold text-black">
                <strong>Submitted Words: </strong>
                {submittedWords.length === 0 ? "No words submitted" : submittedWords.join(", ")}
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-8 gap-2 bg-[#8B6F47] p-3 rounded-md shadow-xl border-4 border-[#5D4B3A]" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}>
            {grid.map((row, r) =>
              row.map((letter, c) => (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded border-2 bg-[#D4AF75] border-[#A87C4F] shadow-lg cursor-pointer"
                  style={{
                    fontSize: "2rem",  // Adjust font size to fit the new tile size
                    fontWeight: "bold",
                    color: "#000",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                    backgroundImage: `url(${tileTexture})`,
                    backgroundSize: "cover",
                    textAlign: "center",
                    lineHeight: "1.5",
                  }}
                >
                  {letter}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Pause Menu */}
      <PauseMenu isPaused={isPaused} onResume={handleResume} onRestart={handleRestart} onExit={handleExit} />

      {/* Modal: Word Too Short / Invalid / Duplicate */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-red-500">Invalid Word!</h2>
            <p className="mt-4">Make sure your word is at least 3 letters, valid, and not repeated.</p>
            <button onClick={closeModal} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal: Failed Game */}
      {isModalFailed && gameStatus === "failed" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-red-500">Game Over</h2>
            <p className="mt-4">Your time has run out. Try again!</p>
            <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg">
              Restart
            </button>
            <button onClick={handleExit} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
              Exit
            </button>
          </div>
        </div>
      )}
      {isModalTooLong && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-xl font-semibold text-red-500">Too Many Letters!</h2>
      <p className="mt-4">You can only select up to {requiredLetters} letters for this level.</p>
      <button
        onClick={() => setIsModalTooLong(false)}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}
      
      {/* Notification */}
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#28a745] text-white py-2 px-4 rounded-md shadow-lg">
          The words must contain three letters
        </div>
      )}
    </AnimatePresence>
  );
}
