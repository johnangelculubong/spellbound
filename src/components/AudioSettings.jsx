import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AudioSettings() {
  const navigate = useNavigate();
  const [music, setMusic] = useState(50);
  const [sfx, setSfx] = useState(50);
  const [notification, setNotification] = useState(50);
  const [showModal, setShowModal] = useState(false);

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    setMusic(50);
    setSfx(50);
    setNotification(50);
    console.log("Audio settings reset to default!");
    setShowModal(false);
  };

  return (
    <div>
      {/* Audio Panel */}
      <div>
        <h2
          className="text-white font-bold font-cinzel mb-4 text-center"
          style={{
            fontSize: "42px",
          }}
        >
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
                onChange={(e) => setMusic(e.target.value)}
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
                onChange={(e) => setSfx(e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {sfx}%
              </span>
            </div>
          </div>

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
                onChange={(e) => setNotification(e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white font-poppins text-xl w-[50px]">
                {notification}%
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
        <button className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins">
          Apply Changes
        </button>
      </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4">
            <h3 className="text-xl font-bold">Restore Changes?</h3>
            <p className="text-gray-700">Are you sure you want to reset all audio settings?</p>
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
