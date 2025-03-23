import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Settings from "./components/Settings";
import AudioSettings from "./components/AudioSettings";
import LanguageSettings from "./components/LanguageSettings";
import HelpSettings from "./components/HelpSettings";
import GeneralSettings from "./components/GeneralSettings";
import CategoryScreen from "./components/CategoryScreen"; // Play category screen
import Difficulty from "./components/Difficulty"; // Difficulty selection screen
import Levels from "./components/Levels"; // Levels selection screen
import Gameplay from "./components/Gameplay"; // Gameplay screen
import Instruction from "./components/Instruction"; // Instruction component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Menu */}
        <Route path="/" element={<MainMenu />} />

        {/* Play Flow */}
        <Route path="/play" element={<CategoryScreen />} /> {/* Select Category */}
        <Route path="/play/:category" element={<Difficulty />} /> {/* Select Difficulty */}
        <Route path="/play/:category/:difficulty" element={<Levels />} /> {/* Select Level */}
        <Route path="/play/:category/:difficulty/level/:levelId" element={<Gameplay />} />{/* Start Game */}

        {/* Instructions */}
        <Route path="/instructions" element={<Instruction />} />

        {/* Settings with Nested Routes */}
        <Route path="/settings" element={<Settings />}>
          <Route path="general" element={<GeneralSettings />} />
          <Route path="audio" element={<AudioSettings />} />
          <Route path="language" element={<LanguageSettings />} />
          <Route path="help" element={<HelpSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
