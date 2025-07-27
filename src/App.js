import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Settings from "./components/Settings";
import AudioSettings from "./components/AudioSettings";
import LanguageSettings from "./components/LanguageSettings";
import HelpSettings from "./components/HelpSettings";
import GeneralSettings from "./components/GeneralSettings";
import CategoryScreen from "./components/CategoryScreen";
import Difficulty from "./components/Difficulty";
import Levels from "./components/Levels";
import Gameplay from "./components/Gameplay";
import Instruction from "./components/Instruction";
import Feedback from "./components/Feedback";
import Support from "./components/Support";
import Goodbye from "./components/Goodbye";
import "./App.css";

function App() {
  const [graphicsClass, setGraphicsClass] = useState("graphics-medium");

  useEffect(() => {
    const saved = localStorage.getItem("generalSettings");
    if (saved) {
      const { graphics } = JSON.parse(saved);
      if (graphics) {
        setGraphicsClass(`graphics-${graphics.toLowerCase()}`);
      }
    }
  }, []);

  return (
    <div className={graphicsClass}>
      <Router>
        <Routes>
          {/* Main Menu */}
          <Route path="/" element={<MainMenu />} />

          {/* Play Flow */}
          <Route path="/play" element={<CategoryScreen />} />
          <Route path="/play/:category" element={<Difficulty />} />
          <Route path="/play/:category/:difficulty" element={<Levels />} />
          <Route path="/play/:category/:difficulty/level/:levelId" element={<Gameplay />} />

          {/* Instructions */}
          <Route path="/instructions" element={<Instruction />} />

          {/* Feedback */}
          <Route path="/feedback" element={<Feedback />} />

          {/* Support */}
          <Route path="/support" element={<Support />} />

          {/* Goodbye */}
          <Route path="/goodbye" element={<Goodbye />} />

          {/* Settings with Nested Routes */}
          <Route path="/settings" element={<Settings />}>
            <Route path="general" element={<GeneralSettings />} />
            <Route path="audio" element={<AudioSettings />} />
            <Route path="language" element={<LanguageSettings />} />
            <Route path="help" element={<HelpSettings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
