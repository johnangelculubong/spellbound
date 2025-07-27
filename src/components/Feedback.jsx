import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (feedback.trim()) {
      // You can send this to a backend, Firebase, etc.
      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
      setFeedback("");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-xl text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold font-cinzel mb-6 text-center">💬 Feedback</h1>

        {submitted ? (
          <motion.div
            className="text-center text-green-400 text-lg font-poppins"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            Thank you for your feedback! 🌟
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              className="w-full h-40 p-4 rounded-xl bg-white/20 placeholder-white/60 text-white font-poppins focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your thoughts, suggestions, or report issues here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-xl font-poppins transition"
            >
              Submit Feedback
            </motion.button>
          </form>
        )}

        <motion.button
          onClick={() => navigate("/settings/help")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full text-white/80 hover:text-white text-center underline font-poppins"
        >
          ← Back to Help
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
