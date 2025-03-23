import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tileTexture from "../assets/tile-texture.jpg";
import PauseMenu from "./PauseMenu";

// Load the word list
const useWordList = () => {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    fetch("/words.json")
      .then((response) => response.json())
      .then((data) => setWordList(data.words))
      .catch((error) => console.error("Error loading words:", error));
  }, []);

  return wordList;
};

const rows = 8;
const cols = 8;

const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

export default function Gameplay() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const wordList = useWordList(); // Load the word list

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomLetter())
    )
  );
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // Message for modal
  const [submittedWords, setSubmittedWords] = useState([]); // Track submitted words

  const handleClick = (r, c) => {
    setSelected([...selected, { r, c }]);
  };

  const isWordValid = (word) => {
    return wordList.includes(word.toLowerCase());
  };

  const submitWord = () => {
    const word = selected.map((tile) => grid[tile.r][tile.c]).join("");

    // Check if the word is already submitted
    if (submittedWords.includes(word)) {
      setModalMessage("Word already submitted!");
      setIsModalOpen(true);
      return;
    }

    if (word.length < 3) {
      setModalMessage("Please select at least 3 letters to form a word.");
      setIsModalOpen(true);
      return;
    }

    if (!isWordValid(word)) {
      setModalMessage(`"${word}" is not a valid word!`);
      setIsModalOpen(true);
      return;
    }

    // Valid word -> Update score & grid
    setScore(score + word.length * 10);
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
    setSubmittedWords([]);
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
        </div>

        {/* Grid Container */}
        <div className="w-2/3 flex flex-col items-center p-4">
          {/* Selected Word Display */}
          <div className="w-full flex justify-center bg-[#D4AF75] p-2 rounded-md border-4 border-[#A87C4F]">
            <h2 className="text-xl font-semibold text-black">
              <strong>Selected Word: </strong>
              {selected.length === 0
                ? "No word selected"
                : selected.map((tile) => grid[tile.r][tile.c]).join("")}
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-8 gap-2 bg-[#8B6F47] p-3 rounded-md border-4 border-[#5D4B3A]">
            {grid.map((row, r) =>
              row.map((letter, c) => (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 flex items-center justify-center rounded border-2 bg-[#D4AF75] border-[#A87C4F] shadow-lg cursor-pointer"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#000",
                    backgroundImage: `url(${tileTexture})`,
                    backgroundSize: "cover",
                  }}
                >
                  {letter}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal for Warnings */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-red-500">{modalMessage}</h2>
            <button onClick={closeModal} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md font-semibold">
              Close
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
