import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function PauseMenu({ isPaused, onResume, onRestart, onExit }) {
  const navigate = useNavigate(); // Initialize navigation

  if (!isPaused) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
        >
          <div className="bg-yellow-500 px-6 py-2 rounded-t-md text-xl font-bold">
            PAUSE
          </div>
          <div className="p-6 flex flex-col gap-4">
            <button className="text-lg font-semibold" onClick={onResume}>
              RESUME
            </button>
            <button className="text-lg font-semibold" onClick={onRestart}>
              RESTART
            </button>
            <button
              className="text-lg font-semibold"
              onClick={() => {
                navigate("/settings"); // Navigate to settings
                onResume(); // Close the pause menu
              }}
            >
              OPTION
            </button>
            <button className="text-lg font-semibold text-red-500" onClick={onExit}>
              EXIT
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
