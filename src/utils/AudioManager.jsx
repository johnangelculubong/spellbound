// Import sound files
import wordSubmitSfx from '../assets/audio/word-submit.wav';
import wordErrorSfx from '../assets/audio/word-error.mp3';
import victory3StarsSfx from '../assets/audio/victory-3-stars.mp3';
import victory2StarsSfx from '../assets/audio/victory-2-stars.wav';
import victory1StarSfx from '../assets/audio/victory-1-star.wav';
import timesUpSfx from '../assets/audio/times-up.wav'; 
import tileClickSfx from '../assets/audio/tile-click.wav';
import tileDeselectSfx from '../assets/audio/tile-deselect.wav';

let musicAudio = null;
let sfxVolume = 0.5; // 0.0 - 1.0
let musicVolume = 0.5; // 0.0 - 1.0
let notificationVolume = 0.5; // 0.0 - 1.0

const clampVolume = (v) => Math.max(0, Math.min(1, v));
const savedMusic = localStorage.getItem("musicVolume");
if (savedMusic !== null) {
  musicVolume = clampVolume(Number(savedMusic) / 100);
}

export const playMusic = (file) => {
  const savedVolume = localStorage.getItem("musicVolume");
  musicVolume = savedVolume !== null ? clampVolume(Number(savedVolume) / 100) : musicVolume;

  if (musicVolume === 0) {
    console.log("Music volume is 0, not playing music.");
    return;
  }

  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  }

  musicAudio = new Audio(file);
  musicAudio.loop = true;
  musicAudio.volume = musicVolume;

  musicAudio.play().catch((err) => {
    console.warn("Music play was interrupted or blocked:", err);
  });
};

export const stopMusic = () => {
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
    musicAudio = null; // <- Important!
  }
};

export const setMusicVolume = (volume) => {
  musicVolume = clampVolume(volume / 100);
  localStorage.setItem("musicVolume", volume); // Save in 0–100 scale

  if (musicAudio) {
    if (musicVolume === 0) {
      musicAudio.pause();
      musicAudio.currentTime = 0;
      musicAudio = null; // 🔥 this is crucial to avoid restarting from playMusic
    } else {
      musicAudio.volume = musicVolume;

      if (musicAudio.paused && musicAudio.currentTime > 0) {
        musicAudio.play().catch((err) => {
          console.warn("Music resume failed:", err);
        });
      }
    }
  }
};

export const setSFXVolume = (volume) => {
  sfxVolume = clampVolume(volume / 100);
};

export const setNotificationVolume = (volume) => {
  notificationVolume = clampVolume(volume / 100);
};

export const restoreVolumes = () => {
  sfxVolume = 0.5;
  musicVolume = 0.5;
  notificationVolume = 0.5;

  if (musicAudio) {
    musicAudio.volume = musicVolume;
  }
};

export const playSFX = (file) => {
  const audio = new Audio(file);
  audio.volume = clampVolume(sfxVolume);
  audio.play().catch((err) => {
    console.warn("SFX play failed:", err);
  });
};

export const playNotification = (file) => {
  const audio = new Audio(file);
  audio.volume = clampVolume(notificationVolume);
  audio.play().catch((err) => {
    console.warn("Notification sound failed:", err);
  });
};

// New sound functions for gameplay
export const playWordSubmit = () => {
  const audio = new Audio(wordSubmitSfx);
  audio.volume = clampVolume(sfxVolume);
  audio.play().catch((err) => {
    console.warn("Word submit sound failed:", err);
  });
};

export const playWordError = () => {
  const audio = new Audio(wordErrorSfx);
  audio.volume = clampVolume(sfxVolume);
  audio.play().catch((err) => {
    console.warn("Word error sound failed:", err);
  });
};

export const playVictoryByStars = (stars) => {
  let soundFile;
  
  switch(stars) {
    case 3:
      soundFile = victory3StarsSfx;
      break;
    case 2:
      soundFile = victory2StarsSfx;
      break;
    case 1:
    default:
      soundFile = victory1StarSfx;
      break;
  }
  
  const audio = new Audio(soundFile);
  audio.volume = clampVolume(notificationVolume);
  audio.play().catch((err) => {
    console.warn("Victory sound failed:", err);
  });
};

// Add this new function for times up
export const playTimesUp = () => {
  const audio = new Audio(timesUpSfx);
  audio.volume = clampVolume(notificationVolume);
  audio.play().catch((err) => {
    console.warn("Times up sound failed:", err);
  });
};

export const playTileClick = () => {
  const audio = new Audio(tileClickSfx);
  audio.volume = clampVolume(sfxVolume);
  audio.play().catch((err) => {
    console.warn("Tile click sound failed:", err);
  });
};

// Add this new function
export const playTileDeselect = () => {
  const audio = new Audio(tileDeselectSfx);
  audio.volume = clampVolume(sfxVolume);
  audio.play().catch((err) => {
    console.warn("Tile deselect sound failed:", err);
  });
};