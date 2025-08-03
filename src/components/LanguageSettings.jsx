import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function LanguageSettings() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [language, setLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en"); // Default to English
    }
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const applyChanges = () => {
    // Save language to localStorage
    localStorage.setItem("selectedLanguage", language);
    
    // Dispatch custom event to notify other components about language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language } 
    }));
    
    console.log(`Language changed to: ${language}`);
    showSuccessToast(t('settingsAppliedSuccess'));
  };

  const handleRestore = () => {
    setShowModal(true);
  };

  const confirmRestore = () => {
    setLanguage("en"); // Reset to English
    localStorage.setItem("selectedLanguage", "en");
    
    // Dispatch event for language reset
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: "en" } 
    }));
    
    console.log("Language reset to English!");
    setShowModal(false);
    showSuccessToast(t('settingsRestoredSuccess'));
  };

  const showSuccessToast = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  // Language options with their display names
  const getLanguageOptions = () => [
    { value: "en", label: t('languageEnglish') },
    { value: "es", label: t('languageSpanish') },
    { value: "fr", label: t('languageFrench') },
    { value: "de", label: t('languageGerman') },
    { value: "jp", label: t('languageJapanese') }
  ];

  const getCurrentLanguageName = () => {
    const languageOptions = getLanguageOptions();
    const currentLang = languageOptions.find(lang => lang.value === language);
    return currentLang ? currentLang.label : t('languageEnglish');
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
          {t('chooseLanguage')}
        </h2>

        <div className="flex flex-col items-center justify-center mt-[100px] space-y-8">
          <div className="text-white font-poppins text-lg mb-4">
            {t('currentLanguage')}: <span className="font-bold">{getCurrentLanguageName()}</span>
          </div>
          
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-[500px] py-2 px-4 rounded bg-white/40 border border-white text-black font-poppins text-xl backdrop-blur focus:outline-none"
          >
            <option value="" disabled>
              {t('selectLanguage')}
            </option>
            {getLanguageOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {language && (
            <div className="text-white/80 font-poppins text-sm text-center max-w-md">
              <p>{t('selected')}: <span className="font-semibold">{getCurrentLanguageName()}</span></p>
              <p className="mt-2">{t('applyChangesInstruction')}</p>
            </div>
          )}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-between pt-[120px] px-8 max-w-[700px] mx-auto">
          <button
            onClick={handleRestore}
            className="text-white py-3 px-6 border border-white hover:bg-white hover:text-black transition-all duration-300 font-poppins text-lg hover:scale-105 hover:shadow-lg"
          >
            {t('restoreChanges')}
          </button>
          <button 
            onClick={applyChanges}
            disabled={!language}
            className={`py-3 px-6 border transition-all duration-300 font-poppins text-lg hover:scale-105 hover:shadow-lg ${
              language 
                ? 'text-white border-[#B8860B] bg-[#B8860B]/20 hover:bg-[#B8860B] hover:text-black' 
                : 'text-gray-500 border-gray-500 cursor-not-allowed'
            }`}
          >
            {t('applyChanges')}
          </button>
        </div>
      </div>

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-poppins animate-pulse">
          {showSuccessMessage}
        </div>
      )}

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800">{t('confirmRestore')}</h3>
            <p className="text-gray-700">
              {t('restoreConfirmMessage')}
            </p>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-200 transition-colors duration-200 font-poppins"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmRestore}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 font-poppins"
              >
                {t('yesReset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}