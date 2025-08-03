import React, { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
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
  const { t } = useLanguage();
  const [music, setMusic] = useState(50);
  const [sfx, setSfx] = useState(50);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Mute states
  const [musicMuted, setMusicMuted] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedMusic = localStorage.getItem("musicVolume");
    const savedSfx = localStorage.getItem("sfxVolume");
    
    // Load mute states
    const savedMusicMuted = localStorage.getItem("musicMuted") === "true";
    const savedSfxMuted = localStorage.getItem("sfxMuted") === "true";

    if (savedMusic !== null) {
      const vol = Number(savedMusic);
      setMusic(vol);
      setMusicVolume(vol);
      if (vol > 0 && !savedMusicMuted) playMusic(bgMusic);
    }

    if (savedSfx !== null) {
      const vol = Number(savedSfx);
      setSfx(vol);
      setSFXVolume(vol);
    }
    
    setMusicMuted(savedMusicMuted);
    setSfxMuted(savedSfxMuted);
  }, []);

  const handleMusicVolumeChange = (e) => {
    if (musicMuted) return; // Don't change volume when muted
    
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
    if (sfxMuted) return; // Don't change volume when muted
    
    const volume = parseFloat(e.target.value);
    setSfx(volume);
    localStorage.setItem("sfxVolume", volume);
    setSFXVolume(volume);

    if (volume > 0) playSFX(clickSFX);
  };



  const toggleMute = (type) => {
    if (type === "music") {
      const newMuted = !musicMuted;
      setMusicMuted(newMuted);
      localStorage.setItem("musicMuted", newMuted);
      
      if (newMuted) {
        stopMusic();
      } else if (music > 0) {
        playMusic(bgMusic);
      }
    } else if (type === "sfx") {
      const newMuted = !sfxMuted;
      setSfxMuted(newMuted);
      localStorage.setItem("sfxMuted", newMuted);
      // Play test sound if unmuting
      if (!newMuted && sfx > 0) playSFX(clickSFX);
    }
  };

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    const defaultVolume = 50;

    setMusic(defaultVolume);
    setSfx(defaultVolume);
    setMusicMuted(false);
    setSfxMuted(false);

    localStorage.setItem("musicVolume", defaultVolume);
    localStorage.setItem("sfxVolume", defaultVolume);
    localStorage.setItem("musicMuted", false);
    localStorage.setItem("sfxMuted", false);

    setMusicVolume(defaultVolume);
    setSFXVolume(defaultVolume);

    playMusic(bgMusic);
    setShowModal(false);
    showSuccessToast(t('Settings have been restored to default values.'));
  };

  const applyChanges = () => {
    // Save current settings to localStorage
    localStorage.setItem("musicVolume", music);
    localStorage.setItem("sfxVolume", sfx);
    localStorage.setItem("musicMuted", musicMuted);
    localStorage.setItem("sfxMuted", sfxMuted);

    setMusicVolume(musicMuted ? 0 : music);
    setSFXVolume(sfxMuted ? 0 : sfx);

    // Play a click sound to confirm the changes (if not muted)
    if (!sfxMuted && sfx > 0) playSFX(clickSFX);

    showSuccessToast(t('audioSettingsAppliedSuccess'));
  };

  const showSuccessToast = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  return (
    <div className="p-4 font-poppins">
      <div>
        <h2 className="text-white font-bold font-cinzel mb-4 text-center text-[42px]">
          {t('audioSettings')}
        </h2>

        <div className="space-y-6">
          {/* Music Volume */}
          <div className="flex items-center justify-between">
            <span className="pl-[80px] mt-[40px] font-poppins text-white text-[36px] cursor-pointer hover:underline">
              {t('music')}
            </span>
            <div className="flex items-center gap-4 w-1/2">
              <button
                onClick={() => toggleMute("music")}
                className={`px-3 py-1 text-sm border rounded ${
                  musicMuted 
                    ? 'bg-red-500 text-white border-red-500' 
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                } transition font-poppins`}
              >
                {musicMuted ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={music}
                onChange={handleMusicVolumeChange}
                className={`w-full accent-white ${musicMuted ? 'opacity-50' : ''}`}
                disabled={musicMuted}
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {musicMuted ? t('mute') : `${music}%`}
              </span>
            </div>
          </div>

          {/* SFX Volume */}
          <div className="flex items-center justify-between">
            <span className="pl-[80px] mt-[65px] font-poppins text-white text-[36px] cursor-pointer hover:underline">
              {t('soundEffects')}
            </span>
            <div className="flex items-center gap-4 w-1/2">
              <button
                onClick={() => toggleMute("sfx")}
                className={`px-3 py-1 text-sm border rounded ${
                  sfxMuted 
                    ? 'bg-red-500 text-white border-red-500' 
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                } transition font-poppins`}
              >
                {sfxMuted ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={sfx}
                onChange={handleSFXVolumeChange}
                className={`w-full accent-white ${sfxMuted ? 'opacity-50' : ''}`}
                disabled={sfxMuted}
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {sfxMuted ? t('mute') : `${sfx}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Buttons */}
        <div className="flex justify-between pt-[120px] px-8 max-w-[700px] mx-auto">
          <button
            onClick={handleRestore}
            className="text-white py-3 px-6 border border-white hover:bg-white hover:text-black transition-all duration-300 font-poppins text-lg hover:scale-105 hover:shadow-lg"
          >
            {t('restoreChanges')}
          </button>
          <button 
            onClick={applyChanges}
            className="text-white py-3 px-6 border border-[#B8860B] bg-[#B8860B]/20 hover:bg-[#B8860B] hover:text-black transition-all duration-300 font-poppins text-lg hover:scale-105 hover:shadow-lg"
          >
            {t('applyChanges')}
          </button>
        </div>
      </div>

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-poppins animate-pulse">
          {showSuccessMessage}
        </div>
      )}

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800">{t('confirmRestoreAudio')}</h3>
            <p className="text-gray-700">
              {t('restoreAudioConfirmMessage')}
            </p>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-200 transition-colors duration-200 font-poppins"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmRestore}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 font-poppins"
              >
                {t('yesReset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}