import React from "react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 font-cinzel">📞 Support</h1>

      <p className="text-lg text-center max-w-xl mb-8">
        Need help? Reach out to us at:
      </p>

      <ul className="space-y-4 text-center text-lg">
        <li>Email: <span className="text-yellow-300">support@spellboundapp.com</span></li>
        <li>Phone: <span className="text-yellow-300">+1 (234) 567-8900</span></li>
        <li>Discord: <span className="text-yellow-300">discord.gg/spellbound</span></li>
      </ul>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 px-6 py-2 text-lg bg-white/10 backdrop-blur border border-white/50 rounded-xl hover:bg-white/20 hover:border-white/80 hover:scale-105 transition"
      >
        ⬅ Back
      </button>
    </div>
  );
}
