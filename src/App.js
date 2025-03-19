import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Settings from "./components/Settings";
import AudioSettings from "./components/AudioSettings";
import LanguageSettings from "./components/LanguageSettings";
import HelpSettings from "./components/HelpSettings";
import GeneralSettings from "./components/GeneralSettings";
import CategoryScreen from "./components/CategoryScreen"; // Play screen (category)
import Difficulty from "./components/Difficulty"; // Difficulty screen
import Levels from "./components/Levels"; // Levels screen
import Gameplay from "./components/Gameplay"; // Gameplay screen

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Menu */}
        <Route path="/" element={<MainMenu />} />

        {/* Play flow */}
        <Route path="/play" element={<CategoryScreen />} />
        <Route path="/play/:category" element={<Difficulty />} />
        <Route path="/play/:category/:difficulty/levels" element={<Levels />} />
        <Route path="/play/:category/:difficulty/level/:levelId" element={<Gameplay />} />

        {/* Settings with nested routes */}
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
