import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function HelpSettings() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const handleMenuClick = (type) => {
    switch (type) {
      case 'howToPlay':
        // Navigate to the instruction/tutorial page
        navigate('/instructions');
        break;
      case 'feedback':
        setModalContent({
          title: t('feedbackTitle'),
          content: t('feedbackContent')
        });
        setShowModal(true);
        break;
      case 'support':
        setModalContent({
          title: t('supportTitle'),
          content: t('supportContent')
        });
        setShowModal(true);
        break;
      default:
        return;
    }
  };

  const helpMenuItems = [
    { key: 'howToPlay', icon: '🎯', label: t('howToPlay') },
    { key: 'feedback', icon: '💬', label: t('feedback') },
    { key: 'support', icon: '🛠️', label: t('support') },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-transparent p-8">
      <h2 className="text-white font-bold font-cinzel text-5xl mb-16 text-center">
        {t('helpAndSupport')}
      </h2>

      <div className="flex flex-col items-center space-y-10 w-full max-w-md">
        {helpMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.key)}
            className="w-full text-white text-2xl font-poppins border border-white/50 rounded-xl py-6 bg-white/10 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/80 flex items-center justify-center space-x-4"
          >
            <span className="text-3xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 text-center space-y-4">
        <div className="text-white/70 text-lg font-poppins">
          {t('gameVersion')}: 1.0.0
        </div>
        <div className="text-white/70 text-sm font-poppins">
          {t('developedBy')}: Spellbound Studios
        </div>
      </div>

      {/* Help Modal - Only for Feedback and Support */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 font-cinzel">
                {modalContent.title}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors"
                aria-label={t('close')}
              >
                ×
              </button>
            </div>
            
            <div className="text-gray-700 text-lg leading-relaxed font-poppins whitespace-pre-line">
              {modalContent.content}
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#A0750A] transition-colors duration-200 font-poppins"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}