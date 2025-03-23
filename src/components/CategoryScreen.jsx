import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import mysticLibraryImg from "../assets/mystic-library.png";
import piratesParleyImg from "../assets/pirates-parley.png";
import nebulaLexisImg from "../assets/nebula-lexis.png";
import enchantedRealmImg from "../assets/enchanted-realm.png";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg";

const categories = [
  { name: "Mystic Library", image: mysticLibraryImg },
  { name: "Pirate’s Parley", image: piratesParleyImg },
  { name: "Nebula Lexis", image: nebulaLexisImg },
  { name: "Enchanted Realm", image: enchantedRealmImg },
];

export default function CategoryScreen() {
  const navigate = useNavigate();

  const handleCardClick = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/play/${formattedCategory}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="relative w-screen h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            ⬅
          </button>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-4xl sm:text-5xl font-cinzel"
          >
            Select Category
          </motion.h1>

          <div className="w-12 h-12"></div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mt-20 z-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(cat.name)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="cursor-pointer flex flex-col items-center"
            >
              <div
                className="w-56 h-72 rounded-xl overflow-hidden shadow-lg border-2 border-white/30"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <p className="text-white text-xl mt-3 font-cinzel text-center">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
