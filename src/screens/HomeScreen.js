import React from "react";
import "./HomeScreen.css"; // Import the CSS file for styling

export default function HomeScreen() {
  return (
    <div className="container">
      <div className="background">
        <div className="overlay">
          {/* Title */}
          <h1 className="title">SPELLBOUND</h1>

          {/* Buttons */}
          <div className="menu">
            <MenuButton title="PLAY GAME" onClick={() => console.log("Play Game")} />
            <MenuButton title="LEARN HOW TO PLAY" onClick={() => console.log("Learn")} />
            <MenuButton title="OPTION" onClick={() => console.log("Options")} />
            <MenuButton title="QUIT GAME" onClick={() => console.log("Quit")} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable button component
const MenuButton = ({ title, onClick }) => (
  <button className="button" onClick={onClick}>
    {title}
  </button>
);
