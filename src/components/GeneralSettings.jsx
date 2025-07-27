import React, { useState, useEffect } from "react";

export default function GeneralSettings() {
  const [showModal, setShowModal] = useState(false);
  const [graphics, setGraphics] = useState("Medium");
  const [resolution, setResolution] = useState("1920x1080");
  const [videoQuality, setVideoQuality] = useState("Full HD");
  const [message, setMessage] = useState("");
  const [graphicsClass, setGraphicsClass] = useState("graphics-medium");

  const graphicsOptions = ["Low", "Medium", "High", "Ultra"];
  const resolutionOptions = ["1280x720", "1920x1080", "2560x1440", "3840x2160"];
  const videoQualityOptions = ["HD", "Full HD", "2k", "4k"];

  const cycleOption = (current, options, direction) => {
    const index = options.indexOf(current);
    const nextIndex =
      direction === "prev"
        ? (index - 1 + options.length) % options.length
        : (index + 1) % options.length;
    return options[nextIndex];
  };

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    setGraphics("Medium");
    setResolution("1920x1080");
    setVideoQuality("Full HD");
    setGraphicsClass("graphics-medium");
    console.log("Changes restored to defaults!");
    setShowModal(false);
  };

  const applyChanges = () => {
    const settings = { graphics, resolution, videoQuality };
    localStorage.setItem("generalSettings", JSON.stringify(settings));

    setMessage("Settings saved successfully!");
    console.log("Settings applied:", settings);

    // Short delay before reload to show message
    setTimeout(() => {
      window.location.reload(); // This makes App.jsx apply the graphics class globally
    }, 800);
  };

  useEffect(() => {
    const saved = localStorage.getItem("generalSettings");
    if (saved) {
      const { graphics, resolution, videoQuality } = JSON.parse(saved);
      setGraphics(graphics);
      setResolution(resolution);
      setVideoQuality(videoQuality);
      setGraphicsClass(`graphics-${graphics.toLowerCase().replace(/\s+/g, "")}`);
    }
  }, []);

  const SettingSlider = ({ label, value, options, setValue }) => (
    <div className="flex items-center justify-between border border-white/50 rounded-xl px-6 py-4 w-full max-w-[1100px]">
      <span className="text-white font-semibold text-xl">{label}</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setValue(cycleOption(value, options, "prev"))}
          className="text-white text-2xl hover:scale-110 transition"
        >
          ◀
        </button>
        <div className="bg-[#B8860B] text-white rounded-full px-6 py-2 text-lg font-bold tracking-widest min-w-[120px] text-center">
          {value}
        </div>
        <button
          onClick={() => setValue(cycleOption(value, options, "next"))}
          className="text-white text-2xl hover:scale-110 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );

  return (
    <div className={`p-4 font-poppins ${graphicsClass}`}>
      <h2
        className="text-white font-bold font-cinzel mb-10 text-center"
        style={{ fontSize: "42px" }}
      >
        General Settings
      </h2>

      <div className="flex flex-col items-center space-y-12">
        <SettingSlider
          label="GRAPHICS"
          value={graphics}
          options={graphicsOptions}
          setValue={setGraphics}
        />
        <SettingSlider
          label="DISPLAY"
          value={resolution}
          options={resolutionOptions}
          setValue={setResolution}
        />
        <SettingSlider
          label="VIDEO QUALITY"
          value={videoQuality}
          options={videoQualityOptions}
          setValue={setVideoQuality}
        />
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

      {message && (
        <div className="text-center pt-6 text-green-400 font-semibold text-lg">
          {message}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4">
            <h3 className="text-xl font-bold">Restore Changes?</h3>
            <p className="text-gray-700">
              Are you sure you want to reset to default?
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
