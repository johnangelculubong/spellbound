import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgMusic from "../assets/audio/background.mp3";
import clickSFX from "../assets/audio/click.mp3";
import notifSFX from "../assets/audio/notification.mp3";

export default function AudioSettings() {
  const navigate = useNavigate();
  const [music, setMusic] = useState(50);
  const [sfx, setSfx] = useState(50);
  const [notification, setNotification] = useState(50);
  const [showModal, setShowModal] = useState(false);

  const [audioContext, setAudioContext] = useState(null);
  const [musicSource, setMusicSource] = useState(null);
  const [musicGain, setMusicGain] = useState(null);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedMusic = localStorage.getItem("musicVolume");
    const savedSfx = localStorage.getItem("sfxVolume");
    const savedNotification = localStorage.getItem("notificationVolume");

    if (savedMusic) setMusic(Number(savedMusic));
    if (savedSfx) setSfx(Number(savedSfx));
    if (savedNotification) setNotification(Number(savedNotification));
  }, []);

  useEffect(() => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
      setupMusic(ctx);
    }
  }, [audioContext]);

  const setupMusic = async (ctx) => {
    const response = await fetch(bgMusic);
    const arrayBuffer = await response.arrayBuffer();
    const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);

    const gainNode = ctx.createGain();
    gainNode.gain.value = music / 100; // Set initial music volume

    const source = ctx.createBufferSource();
    source.buffer = decodedBuffer;
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(0);

    setMusicSource(source);
    setMusicGain(gainNode);
  };

  const handleVolumeChange = (type, value) => {
    const volume = Number(value);

    if (type === "music") {
      setMusic(volume);
      localStorage.setItem("musicVolume", volume);
    } else if (type === "sfx") {
      setSfx(volume);
      localStorage.setItem("sfxVolume", volume);
      playSFX(clickSFX, volume);
    } else if (type === "notification") {
      setNotification(volume);
      localStorage.setItem("notificationVolume", volume);
      playSFX(notifSFX, volume);
    }
  };

  const playSFX = (audioFile, volume) => {
    const sfxAudio = new Audio(audioFile);
    sfxAudio.volume = volume / 100;
    sfxAudio.play();
  };

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    setMusic(50);
    setSfx(50);
    setNotification(50);
    localStorage.setItem("musicVolume", 50);
    localStorage.setItem("sfxVolume", 50);
    localStorage.setItem("notificationVolume", 50);

    if (musicGain) {
      musicGain.gain.value = 0.5; // Reset music volume to default
    }

    setShowModal(false);
  };

  // Apply Changes Function
  const applyChanges = () => {
    // Save current settings to localStorage
    localStorage.setItem("musicVolume", music);
    localStorage.setItem("sfxVolume", sfx);
    localStorage.setItem("notificationVolume", notification);

    // Update background music volume immediately
    if (musicGain) {
      musicGain.gain.value = music / 100;
    }

    // Play a click sound to confirm the changes
    playSFX(clickSFX, sfx);

    alert("Audio settings applied successfully!");
  };

  return (
    <div>
      <div>
        <h2 className="text-white font-bold font-cinzel mb-4 text-center text-[42px]">
          Audio Settings
        </h2>

        <div className="space-y-6">
          {/* Music Volume */}
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
                onChange={(e) => handleVolumeChange("music", e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {music}%
              </span>
            </div>
          </div>

          {/* SFX Volume */}
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
                onChange={(e) => handleVolumeChange("sfx", e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {sfx}%
              </span>
            </div>
          </div>

          {/* Notification Volume */}
          <div className="flex items-center justify-between">
            <span className="pl-[80px] mt-[65px] font-poppins text-white text-[36px] cursor-pointer hover:underline">
              System Notification
            </span>
            <div className="flex items-center gap-4 w-1/2">
              <input
                type="range"
                min="0"
                max="100"
                value={notification}
                onChange={(e) =>
                  handleVolumeChange("notification", e.target.value)
                }
                className="w-full accent-white"
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {notification}%
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4">
            <h3 className="text-xl font-bold">Restore Changes?</h3>
            <p className="text-gray-700">
              Are you sure you want to reset all audio settings?
            </p>
            <div className="flex justify-around mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={confirmRestore} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Yes, Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
