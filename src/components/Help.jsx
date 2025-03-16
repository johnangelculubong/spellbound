import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Sidebar */}
      <div className="w-1/4 h-full bg-white/10 rounded-[10px] border-2 border-white/50 backdrop-blur flex flex-col justify-between p-6">
        <div>
          {/* Cinzel applied here */}
          <h2 className="text-white text-2xl font-bold mb-8 font-cinzel left-0"
          style={{ fontSize: "36px",
            marginLeft: "80px",
            paddingTop: "28px",
            paddingBottom: "90px"
           }}>
            Game Option
          </h2>
          <ul className="space-y-4">
            {["General", "Audio", "Language", "Help"].map((item) => (
              <li key={item}>
                <button className="w-full py-2 px-4 text-white border border-[#B8860B] hover:bg-[#B8860B] hover:text-black transition font-poppins"
                style={{ fontSize: "24px" }}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins"
        >
          Back
        </button>
      </div>

      {/* Content Panel */}
      <div className="w-[1300px] h-[800px] bg-white/10 rounded-[40px] border-2 border-white/50 backdrop-blur flex flex-col justify-between p-8 absolute top-[50px] left-[550px]">
        <div className="space-y-[75px] pl-[80px] mt-[120px] font-poppins">
          {["Graphics", "Display", "Video Quality"].map((setting) => (
            <p
              key={setting}
              className="text-white text-[36px] cursor-pointer hover:underline"
            >
              {setting}
            </p>
          ))}
        </div>

        <div className="flex justify-between pt-8">
          <button className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins">
            Restore Changes
          </button>
          <button className="text-white py-2 px-4 border border-white hover:bg-white hover:text-black transition font-poppins">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
