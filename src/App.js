import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Settings from "./components/Settings";
import AudioSettings from "./components/AudioSettings";
import LanguageSettings from "./components/LanguageSettings.jsx";
import HelpSettings from "./components/HelpSettings";
import GeneralSettings from "./components/GeneralSettings";
import CategoryScreen from "./components/CategoryScreen"; // 👈 new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<CategoryScreen />} /> {/* 👈 new route */}

        {/* Nested settings routes */}
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
