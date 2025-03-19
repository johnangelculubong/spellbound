import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import backgroundImg from "../assets/ai-generated-8388403_1920.jpg";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Auto-redirect when landing on /settings only (without any subpath)
    if (location.pathname === "/settings") {
      navigate("/settings/general", { replace: true });
    }
  }, [location, navigate]);

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Sidebar */}
      <div className="w-1/4 h-full bg-white/10 rounded-[10px] border-2 border-white/50 backdrop-blur flex flex-col justify-between p-6">
        <div>
          <h2
            className="text-white text-2xl font-bold mb-8 font-cinzel left-0"
            style={{
              fontSize: "36px",
              marginLeft: "80px",
              paddingTop: "28px",
              paddingBottom: "90px",
            }}
          >
            Game Option
          </h2>

          {/* Sidebar Buttons */}
          <div className="space-y-6">
            <button
              onClick={() => navigate("/settings/general")}
              className="w-full py-2 px-4 text-white border border-[#B8860B] hover:bg-[#B8860B] hover:text-black transition hover:scale-105 hover:shadow-xl hover:border-white/80 font-poppins"
              style={{ fontSize: "24px" }}
            >
              General
            </button>
            <button
              onClick={() => navigate("/settings/audio")}
              className="w-full py-2 px-4 text-white border border-[#B8860B] hover:bg-[#B8860B] hover:text-black transition hover:scale-105 hover:shadow-xl hover:border-white/80 font-poppins"
              style={{ fontSize: "24px" }}
            >
              Audio
            </button>
            <button
              onClick={() => navigate("/settings/language")}
              className="w-full py-2 px-4 text-white border border-[#B8860B] hover:bg-[#B8860B] hover:text-black transition hover:scale-105 hover:shadow-xl hover:border-white/80 font-poppins"
              style={{ fontSize: "24px" }}
            >
              Language
            </button>
            <button
              onClick={() => navigate("/settings/help")}
              className="w-full py-2 px-4 text-white border border-[#B8860B] hover:bg-[#B8860B] hover:text-black transition hover:scale-105 hover:shadow-xl hover:border-white/80 font-poppins"
              style={{ fontSize: "24px" }}
            >
              Help
            </button>
          </div>
        </div>

        {/* Back Button - Calls handleBackClick function */}
        <button
          onClick={handleBackClick}
          className="w-full py-2 px-4 text-white border border-white/50 rounded-sm transition hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/80 font-poppins"
          style={{ fontSize: "24px" }}
        >
          Back
        </button>
      </div>

      {/* Content Panel */}
      <div className="w-[1300px] h-[800px] bg-white/10 rounded-[40px] border-2 border-white/50 backdrop-blur flex flex-col justify-between p-8 absolute top-[50px] left-[550px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
