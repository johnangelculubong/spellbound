import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tileTexture from "../assets/tile-texture.jpg";
import PauseMenu from "./PauseMenu";

const rows = 8;
const cols = 8;

const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

export default function Gameplay() {
  const { levelId, category, difficulty } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(levelId, 10) || 1;

  const initialTime = 30 - currentLevel * 2; // Decrease time by 2s each level
  const targetScore = 200 + currentLevel * 50;
 

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomLetter())
    )
  );
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFailed, setIsModalFailed] = useState(false);
  const [submittedWords, setSubmittedWords] = useState([]); // Added state for submitted words
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStatus, setGameStatus] = useState("playing");

  const handleClick = (r, c) => {
    setSelected([...selected, { r, c }]);
  };

  const submitWord = () => {
    const word = selected.map((tile) => grid[tile.r][tile.c]).join("");
    
    // Check if the word is already submitted
    if (submittedWords.includes(word)) {
      setIsModalOpen(true);
      return; // Stop further execution if word is repeated
    }

    if (word.length >= 3) {
      setScore(score + word.length * 10);
      const newGrid = [...grid.map((row) => [...row])];
      selected.forEach(({ r, c }) => (newGrid[r][c] = null));
      dropTiles(newGrid);

      // Add the valid word to the submitted words list
      setSubmittedWords([...submittedWords, word]);
      setSelected([]);
    } else {
      setIsModalOpen(true);
    }
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

  const clearSelection = () => {
    setSelected([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const [timerId, setTimerId] = useState(null);

useEffect(() => {
  if (!isPaused && timeLeft > 0 && gameStatus === "playing") {
    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
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
  const handleNextLevel = () => {
    navigate(`/play/${category}/${difficulty}/level/${currentLevel + 1}`);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-row items-stretch bg-[#222] text-white min-h-screen w-screen overflow-hidden ${
          isPaused ? "filter blur-md" : ""
        }`}
      >
        {/* Sidebar */}
        <div className="w-1/3 bg-[#f5f5f5] text-black flex flex-col justify-between p-4 shadow-xl">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl font-extrabold text-red-700 font-serif">
              SPELLBOUND
            </h1>
            <div className="w-full border-2 border-gray-400 py-2 text-center text-xl font-bold">
              {score}
            </div>
            <div>Time Left: {timeLeft}s</div>
            <div className="text-2xl font-bold">LEVEL {levelId}</div>
            {/* Buttons for Submit & Clear Word */}
            <div className="flex space-x-4 w-full">
              <button
                onClick={submitWord}
                className="w-full border-2 border-gray-400 py-2 font-bold hover:bg-gray-300"
              >
                SUBMIT
              </button>
              <button
                onClick={clearLastLetter}
                className="w-full border-2 border-gray-400 py-2 font-bold hover:bg-gray-300"
              >
                CLEAR WORD
              </button>
            </div>
          </div>
          <div className="flex justify-around items-center mt-8">
            <button
              className="bg-gray-200 px-4 py-2 rounded shadow text-black"
              onClick={handlePause}
            >
              ⏸
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded shadow text-black">
              🔊
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded shadow text-black">
              ❓
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="w-2/3 flex flex-col items-center p-4">
          <div className="flex flex-col items-center mb-6 w-full">
            {/* Display Selected Word */}
            <div className="w-full flex justify-center items-center bg-[#D4AF75] p-2 rounded-md shadow-lg border-4 border-[#A87C4F]">
              <h2 className="text-xl font-semibold text-black">
                <strong>Selected Word: </strong>
                {selected.length === 0
                  ? "No word selected"
                  : selected.map((tile) => grid[tile.r][tile.c]).join("")}
              </h2>
            </div>
          </div>

          {/* Display Submitted Words */}
          <div className="flex flex-col items-center mb-6 w-full">
            <div className="w-full flex justify-center items-center bg-[#D4AF75] p-2 rounded-md shadow-lg border-4 border-[#A87C4F]">
              <h2 className="text-xl font-semibold text-black">
                <strong>Submitted Words: </strong>
                {submittedWords.length === 0
                  ? "No words submitted"
                  : submittedWords.join(", ")}
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-8 gap-2 bg-[#8B6F47] p-3 rounded-md shadow-xl border-4 border-[#5D4B3A]"
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded border-2 bg-[#D4AF75] border-[#A87C4F] shadow-lg cursor-pointer"
                  style={{
                    fontSize: "2.5rem", // Larger font size
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

      {/* Modal for Word Too Short */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-red-500">Word Too Short!</h2>
            <p className="mt-4">Please select at least 3 letters to form a word.</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalFailed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            {gameStatus === "failed" && (
              <>
                <h2 className="text-2xl font-bold text-red-600">You Failed!</h2>
                <button
                  onClick={handleRestart}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                >
                  Restart
                </button>
              </>
            )}

            {gameStatus === "completed" && (
              <>
                <h2 className="text-2xl font-bold text-green-600">Level Completed! Score: {score}</h2>
                <button
                  onClick={handleNextLevel}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600"
                >
                  Next Level
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
