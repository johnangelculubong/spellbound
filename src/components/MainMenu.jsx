import React from "react";
import Button from "./Button";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg"; // library bg
import dragonImg from "../assets/comodo-7014193_1920.png"; // dragon
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Library Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dragon Image */}
      <img
        src={dragonImg}
        alt="Dragon"
        className="absolute -top-15  -right-20 w-[850px] z-10"
      />

      {/* Header */}
      <div className="absolute top-10 w-full flex justify-center z-20">
        <h1
          className="text-9xl font-bold text-white mb-8"
          style={{
            fontFamily: "Cinzel, serif",
            textShadow: `
              -3px -3px 0 #B22222, 
              3px -3px 0 #B22222, 
              -3px 3px 0 #B22222, 
              3px 3px 0 #B22222
            `,
          }}
        >
          Spellbound
        </h1>
      </div>

      {/* Buttons */}
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 mt-20 z-20">
        <Button text="Play" onClick={() => alert("Start Game!")} />
        <Button text="Learn How to Play" onClick={() => alert("Show tutorial!")} />
        <Button text="Settings" onClick={() => navigate("/settings")} />
        <Button text="Exit" onClick={() => alert("Exit Game!")} />
      </div>
    </div>
  );
};

export default MainMenu;
