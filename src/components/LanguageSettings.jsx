import React, { useState } from "react";

export default function LanguageSettings() {
  const [language, setLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    setLanguage(""); // Reset language selection here
    console.log("Language reset to default!");
    setShowModal(false);
  };

  return (
    <div>
      {/* Language Panel */}
      <div>
        <h2
          className="text-white font-bold font-cinzel mb-4 text-center"
          style={{
            fontSize: "42px",
          }}
        >
          Choose Language
        </h2>

        <div className="flex flex-col items-center justify-center mt-[100px] space-y-8">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-[500px] py-2 px-4 rounded bg-white/40 border border-white text-black font-poppins text-xl backdrop-blur focus:outline-none"
          >
            <option value="" disabled>
              Select your language
            </option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="jp">Japanese</option>
          </select>
        </div>

        <div className="flex justify-between pt-[360px] px-8 max-w-[700px] mx-auto">
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
            <p className="text-gray-700">Are you sure you want to reset the language?</p>
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
