import React, { useEffect, useState } from "react";
import bgMusic from "../assets/audio/background.mp3";
import clickSFX from "../assets/audio/click.mp3";

import {
  playMusic,
  stopMusic,
  setMusicVolume,
  setSFXVolume,
  playSFX,
} from "../utils/AudioManager.jsx";

export default function AudioSettings() {
  const [music, setMusic] = useState(50);
  const [sfx, setSfx] = useState(50);
  const [notification, setNotification] = useState(50);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedMusic = localStorage.getItem("musicVolume");
    const savedSfx = localStorage.getItem("sfxVolume");
    const savedNotification = localStorage.getItem("notificationVolume");

    if (savedMusic !== null) {
      const vol = Number(savedMusic);
      setMusic(vol);
      setMusicVolume(vol);
      if (vol > 0) playMusic(bgMusic);
    }

    if (savedSfx !== null) {
      const vol = Number(savedSfx);
      setSfx(vol);
      setSFXVolume(vol);
    }

    if (savedNotification !== null) {
      setNotification(Number(savedNotification));
    }
  }, []);

  const handleMusicVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setMusic(volume);
    localStorage.setItem("musicVolume", volume);
    setMusicVolume(volume);

    if (volume === 0) {
      stopMusic();
    } else {
      playMusic(bgMusic);
    }
  };

  const handleSFXVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setSfx(volume);
    localStorage.setItem("sfxVolume", volume);
    setSFXVolume(volume);

    if (volume > 0) playSFX(clickSFX);
  };

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    const defaultVolume = 50;

    setMusic(defaultVolume);
    setSfx(defaultVolume);
    setNotification(defaultVolume);

    localStorage.setItem("musicVolume", defaultVolume);
    localStorage.setItem("sfxVolume", defaultVolume);
    localStorage.setItem("notificationVolume", defaultVolume);

    setMusicVolume(defaultVolume);
    setSFXVolume(defaultVolume);

    playMusic(bgMusic);
    setShowModal(false);
  };

  const applyChanges = () => {
    localStorage.setItem("musicVolume", music);
    localStorage.setItem("sfxVolume", sfx);
    localStorage.setItem("notificationVolume", notification);

    setMusicVolume(music);
    setSFXVolume(sfx);

    if (sfx > 0) playSFX(clickSFX);

    alert("Audio settings applied successfully!");
  };

  return (
    <div>
      <h2 className="text-white font-bold font-cinzel mb-4 text-center text-[42px]">
        Audio Settings
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="pl-[80px] mt-[40px] font-poppins text-white text-[36px] cursor-pointer hover:underline">
            Music
          </span>
          <div className="flex items-center gap-4 w-1/2">
            <input
              type="range"
              min="0"
              max="100"
              value={music}
              onChange={handleMusicVolumeChange}
              className="w-full accent-white"
            />
            <span className="text-white font-poppins text-xl w-[50px]">
              {music}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="pl-[80px] mt-[65px] font-poppins text-white text-[36px] cursor-pointer hover:underline">
            Sound Effects
          </span>
          <div className="flex items-center gap-4 w-1/2">
            <input
              type="range"
              min="0"
              max="100"
              value={sfx}
              onChange={handleSFXVolumeChange}
              className="w-full accent-white"
            />
            <span className="text-white font-poppins text-xl w-[50px]">
              {sfx}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-[120px] px-8 max-w-[700px] mx-auto">
        <button
          onClick={handleRestore}
          className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins"
        >
          Restore Changes
        </button>
        <button
          onClick={applyChanges}
          className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins"
        >
          Apply Changes
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4">
            <h3 className="text-xl font-bold">Restore Changes?</h3>
            <p className="text-gray-700">
              Are you sure you want to reset all audio settings?
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestore}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
