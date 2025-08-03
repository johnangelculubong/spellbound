// utils/scoreUtils.js

/**
 * Score management utilities for consistent data handling
 * between Difficulty and Levels components
 */

// Score thresholds for difficulty levels
export const SCORE_THRESHOLDS = {
  apprentice: 0,
  scholar: 300,
  master: 800,
  grandmaster: 1200,
};

/**
 * Get the player's score for a specific category
 * @param {string} category - The game category
 * @returns {number} The player's score
 */
export const getCategoryScore = (category) => {
  const categoryScore = localStorage.getItem(`playerScore_${category}`);
  const generalScore = localStorage.getItem("playerScore");
  return parseInt(categoryScore || generalScore || "0", 10);
};

/**
 * Update the player's score for a specific category
 * @param {string} category - The game category
 * @param {number} score - The new score
 */
export const updateCategoryScore = (category, score) => {
  localStorage.setItem(`playerScore_${category}`, score.toString());
  // Also update general score for backward compatibility
  localStorage.setItem("playerScore", score.toString());
};

/**
 * Get level completion data
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @param {number} levelId - The level number
 * @returns {object} Level data object
 */
export const getLevelData = (category, difficulty, levelId) => {
  const levelKey = `${category}_${difficulty}_level_${levelId}`;
  return JSON.parse(localStorage.getItem(levelKey) || '{}');
};

/**
 * Save level completion data
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @param {number} levelId - The level number
 * @param {object} levelData - The level data to save
 */
export const saveLevelData = (category, difficulty, levelId, levelData) => {
  const levelKey = `${category}_${difficulty}_level_${levelId}`;
  const dataToSave = {
    completed: levelData.completed || false,
    stars: levelData.stars || 0,
    score: levelData.score || 0,
    timestamp: levelData.timestamp || Date.now(),
    ...levelData
  };
  localStorage.setItem(levelKey, JSON.stringify(dataToSave));
};

/**
 * Check if a difficulty is unlocked for a category
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @returns {boolean} Whether the difficulty is unlocked
 */
export const isDifficultyUnlocked = (category, difficulty) => {
  const score = getCategoryScore(category);
  return score >= SCORE_THRESHOLDS[difficulty];
};

/**
 * Check if a level is unlocked
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @param {number} levelId - The level number
 * @returns {boolean} Whether the level is unlocked
 */
export const isLevelUnlocked = (category, difficulty, levelId) => {
  // Check if difficulty is unlocked first
  if (!isDifficultyUnlocked(category, difficulty)) {
    return false;
  }
  
  // Level 1 is always unlocked if difficulty is unlocked
  if (levelId === 1) {
    return true;
  }
  
  // Check if previous level is completed
  const prevLevelData = getLevelData(category, difficulty, levelId - 1);
  return prevLevelData.completed || false;
};

/**
 * Get all unlocked difficulties for a category
 * @param {string} category - The game category
 * @returns {string[]} Array of unlocked difficulty names
 */
export const getUnlockedDifficulties = (category) => {
  const score = getCategoryScore(category);
  return Object.keys(SCORE_THRESHOLDS).filter(
    difficulty => score >= SCORE_THRESHOLDS[difficulty]
  );
};

/**
 * Calculate total stats for a difficulty
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @returns {object} Stats object with totalScore, completedLevels, totalStars
 */
export const getDifficultyStats = (category, difficulty) => {
  let totalScore = 0;
  let completedLevels = 0;
  let totalStars = 0;
  
  for (let i = 1; i <= 3; i++) {
    const levelData = getLevelData(category, difficulty, i);
    if (levelData.completed) {
      totalScore += levelData.score || 0;
      completedLevels++;
      totalStars += levelData.stars || 0;
    }
  }
  
  return {
    totalScore,
    completedLevels,
    totalStars
  };
};

/**
 * Mark a level as seen (for unlock animations)
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @param {number} levelId - The level number
 */
export const markLevelAsSeen = (category, difficulty, levelId) => {
  const levelKey = `${category}_${difficulty}_level_${levelId}`;
  localStorage.setItem(`${levelKey}_seen`, 'true');
};

/**
 * Check if a level was just unlocked (for animations)
 * @param {string} category - The game category
 * @param {string} difficulty - The difficulty level
 * @param {number} levelId - The level number
 * @returns {boolean} Whether the level was just unlocked
 */
export const wasLevelJustUnlocked = (category, difficulty, levelId) => {
  const levelKey = `${category}_${difficulty}_level_${levelId}`;
  return !localStorage.getItem(`${levelKey}_seen`);
};