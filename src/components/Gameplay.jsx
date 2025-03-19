import { useState } from "react";
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
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomLetter())
    )
  );
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (r, c) => {
    setSelected([...selected, { r, c }]);
  };

  const submitWord = () => {
    const word = selected.map((tile) => grid[tile.r][tile.c]).join("");
    if (word.length >= 3) {
      setScore(score + word.length * 10);
      const newGrid = [...grid.map((row) => [...row])];
      selected.forEach(({ r, c }) => (newGrid[r][c] = null));
      dropTiles(newGrid);
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
  const handleRestart = () => {
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => randomLetter())
      )
    );
    setScore(0);
    setSelected([]);
    setIsPaused(false);
  };
  const handleExit = () => navigate("/");

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
          {/* Display Selected Letters */}
          <div
            className="mb-4 w-full flex items-center justify-center bg-[#8B6F47] p-2 rounded-md shadow-lg border-4 border-[#5D4B3A]"
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
          >
            {selected.map((tile, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded border-2 bg-[#D4AF75] border-[#A87C4F] shadow-lg"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#000",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                  backgroundImage: `url(${tileTexture})`,
                  backgroundSize: "cover",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                {grid[tile.r][tile.c]}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-8 gap-1 bg-[#8B6F47] p-3 rounded-md shadow-xl border-4 border-[#5D4B3A]"
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded border-2 bg-[#D4AF75] border-[#A87C4F] shadow-lg cursor-pointer"
                  style={{
                    fontSize: "2rem",
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
    </AnimatePresence>
  );
}
