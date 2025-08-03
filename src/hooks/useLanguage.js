import { useState, useEffect } from 'react';

// Complete translations object
const translations = {
  en: {
    // Game Title
    gameTitle: 'Spellbound',
    
    // Main Menu
    play: 'Play',
    learnHowToPlay: 'Learn How to Play',
    settings: 'Settings',
    exit: 'Exit',
    exitGameMessage: 'Are you sure you want to exit the game?',
    
    // Settings
    gameOptions: 'Game Options',
    general: 'General',
    audio: 'Audio',
    language: 'Language',
    help: 'Help',
    back: 'Back',

    //Pause Menu
    epicTitled: 'EPIC ADVENTURE',
  paused: 'PAUSED',
  chooseNextPaused: 'Choose your next move',
  resumePaused: 'RESUME',
  restartPaused: 'RESTART',
  optionsPaused: 'OPTIONS',
  exitPaused: 'EXIT',
  exitTitlePaused: 'EXIT GAME?',
  exitConfirmPaused: 'Are you sure you want to exit?',
  unsavedWarningPaused: 'All unsaved progress will be lost!',
  cancelPaused: 'CANCEL',
  exitGamePaused: 'EXIT GAME',
    
    // Language Settings
    chooseLanguage: 'Choose Language',
    currentLanguage: 'Current Language',
    selectLanguage: 'Select your language',
    selected: 'Selected',
    applyChangesInstruction: 'Click "Apply Changes" to save your language preference.',
    restoreChanges: 'Restore Changes',
    applyChanges: 'Apply Changes',
    confirmRestore: 'Confirm Restore',
    restoreConfirmMessage: 'Are you sure you want to reset the language to English?',
    cancel: 'Cancel',
    yesReset: 'Yes, Reset',
    settingsAppliedSuccess: 'Your settings have been successfully applied.',
    settingsRestoredSuccess: 'Settings have been restored to default values.',
    
    // Language Options
    languageEnglish: 'English',
    languageSpanish: 'Español (Spanish)',
    languageFrench: 'Français (French)',
    languageGerman: 'Deutsch (German)',
    languageJapanese: '日本語 (Japanese)',
    
    // CategoryScreen translations
    selectCategory: 'Select Category',
    mysticLibrary: 'Mystic Library',
    piratesParley: "Pirate's Parley",
    nebulaLexis: 'Nebula Lexis',
    enchantedRealm: 'Enchanted Realm',
    clickToPlay: 'Click to Play',
    
    // Instruction Component translations
    skip: "Skip",
    step: "Step",
    of: "of",
    howToPlay: "How to Play",
    tutorialStep: "Tutorial step illustration",
    handClickAnimation: "Hand click animation",
    previous: "Previous",
    next: "Next",
    playNow: "Play Now",
    
    // Tutorial content
    tutorialWelcome: "📖 Welcome to Spellbound! Your goal is to form words by selecting letter tiles.",
    tutorialClickTiles: "🟡 Click on letter tiles to select them and form words.",
    tutorialSubmit: "✅ Click Submit to confirm your word and earn points!",
    tutorialEarnPoints: "📈 Earn enough points to level up and progress!",
    tutorialReady: "🎉 Now you are ready! Let's play!",
    
    // Help & Support
    helpAndSupport: 'Help & Support',
    feedback: 'Feedback',
    support: 'Support',
    comingSoonMessage: '{item} page is coming soon.',
    feedbackTitle: 'Feedback',
    feedbackContent: 'We value your feedback! Please share your thoughts about the game:\n\n• What do you like most about Spellbound?\n• Are there any features you\'d like to see improved?\n• Have you encountered any bugs or issues?\n• Any suggestions for new features?\n\nYou can reach us at: feedback@spellboundgame.com\n\nThank you for helping us make Spellbound better!',
    supportTitle: 'Help & Support',
    supportContent: 'Need help with Spellbound? Here are some resources:\n\n🎯 GAMEPLAY HELP:\n• Check the "How to Play" tutorial\n• Practice with shorter words first\n• Look for bonus tiles to maximize points\n\n🔧 TECHNICAL SUPPORT:\n• Make sure your browser is up to date\n• Clear browser cache if experiencing issues\n• Disable ad blockers if the game won\'t load\n\n📧 CONTACT US:\nFor additional support, email: support@spellboundgame.com\n\nWe\'re here to help you enjoy your magical word adventure!',
    gameVersion: 'Game Version',
    developedBy: 'Developed By',
    close: 'Close',
    
    // Alt text for images
    gameLogoAlt: 'Spellbound Game Logo',
    tutorialImageAlt: 'Game Tutorial Illustration',
    menuBackgroundAlt: 'Main Menu Background',
    dragonAlt: 'Magical Dragon',

    // Audio Settings
    audioSettings: 'Audio Settings',
    music: 'Music',
    soundEffects: 'Sound Effects',
    audioSettingsAppliedSuccess: 'Audio settings applied successfully!',
    confirmRestoreAudio: 'Restore Changes?',
    restoreAudioConfirmMessage: 'Are you sure you want to reset all audio settings?',
    mute: 'Mute',

    // General Settings
    generalSettings: 'General Settings',
    graphics: 'GRAPHICS',
    display: 'DISPLAY',
    videoQuality: 'VIDEO QUALITY',
    generalSettingsAppliedSuccess: 'Settings saved successfully!',
    confirmRestoreGeneral: 'Restore Changes?',
    restoreGeneralConfirmMessage: 'Are you sure you want to reset to default?',

    // Difficulty Screen
    selectDifficulty: "Select Difficulty",
    yourScore: "Total Score",
    progress: "Progress",
    unlocked: "Unlocked",
    locked: "Locked",
    level: "Level",
    loading: "Loading",
    unlockAt: "Unlock at",
    points: "points",
    
    // Difficulty Levels
    difficultyApprentice: "Apprentice",
    difficultyScholar: "Scholar",
    difficultyMaster: "Master", 
    difficultyGrandmaster: "Grandmaster",
    
    // Difficulty Descriptions
    apprenticeDesc: "Perfect for beginners - easy questions",
    scholarDesc: "Moderate challenge - intermediate level",
    masterDesc: "Expert level difficulty - hard questions",
    grandmasterDesc: "Ultimate challenge - extremely difficult",

    // Levels Screen
    mode: 'Mode',
    totalScore: 'Total Score',
    completed: 'Completed',
    readyToPlay: 'Ready to Play',
    stars: 'Stars',
    levels: 'Levels',
    difficultyProgress: 'Difficulty Progress',
    difficultyCompleted: 'Difficulty Completed!',
    levelUnlocked: 'LEVEL UNLOCKED!',
    levelUnlockedMessage: 'Level {level} is now available!',
    awesome: 'Awesome!',
    categoryScore: "Score",

    // Game Screen
    progressToVictory: 'Progress to Victory',
    timeLeft: 'Time Left',
    mission: 'Mission',
    formWordsWith: 'Form words with',
    selectedWord: 'Selected Word',
    noWordSelected: 'No word selected',
    foundWords: 'Found Words',
    noWordsFoundYet: 'No words found yet',
    gameStats: 'Game Stats',
    wordsFound: 'Words Found',
    bestWord: 'Best Word',
    submit: 'SUBMIT',
    undo: 'UNDO',
    victory: 'VICTORY',
    levelComplete: 'Level {level} Complete',
    finalScore: 'Final Score',
    nextLevel: 'Next Level',
    moreLevels: 'More Levels',
    replay: 'Replay',
    home: 'Home',
    invalidWord: 'Invalid Word',
    makeSureYourWord: 'Make sure your word',
    hasLetters: 'Has {min}-{max} letters',
    isValidWord: 'Is a valid English word',
    hasntBeenUsed: 'Hasn\'t been used before',
    existsInDictionary: 'Exists in our {category} dictionary',
    tryAgain: 'Try Again',
    timesUp: 'Time\'s Up',
    target: 'Target',
    wordLength: 'Word Length',
    minimum: 'Minimum',
    letters: 'letters',
    wordRequirements: 'Word Requirements',
    createWordsInstruction: 'Create words with {min}-{max} letters in the {category} theme',
    category: 'Category',
  },
  
  es: {
    // Game Title
    gameTitle: 'Hechizado',
    
    // Main Menu
    play: 'Jugar',
    learnHowToPlay: 'Aprender a Jugar',
    settings: 'Configuración',
    exit: 'Salir',
    exitGameMessage: '¿Estás seguro de que quieres salir del juego?',
    
    // Settings
    gameOptions: 'Opciones del Juego',
    general: 'General',
    audio: 'Audio',
    language: 'Idioma',
    help: 'Ayuda',
    back: 'Atrás',
    
    //Pause Menu
    epicTitled: 'AVENTURA ÉPICA',
  paused: 'PAUSADO',
  chooseNextPaused: 'Elige tu próxima acción',
  resumePaused: 'CONTINUAR',
  restartPaused: 'REINICIAR',
  optionsPaused: 'OPCIONES',
  exitPaused: 'SALIR',
  exitTitlePaused: '¿SALIR DEL JUEGO?',
  exitConfirmPaused: '¿Estás seguro de que quieres salir?',
  unsavedWarningPaused: '¡Todo el progreso no guardado se perderá!',
  cancelPaused: 'CANCELAR',
  exitGamePaused: 'SALIR DEL JUEGO',
    
    // Language Settings
    chooseLanguage: 'Elegir Idioma',
    currentLanguage: 'Idioma Actual',
    selectLanguage: 'Selecciona tu idioma',
    selected: 'Seleccionado',
    applyChangesInstruction: 'Haz clic en "Aplicar Cambios" para guardar tu preferencia de idioma.',
    restoreChanges: 'Restaurar Cambios',
    applyChanges: 'Aplicar Cambios',
    confirmRestore: 'Confirmar Restauración',
    restoreConfirmMessage: '¿Estás seguro de que quieres restablecer el idioma al inglés?',
    cancel: 'Cancelar',
    yesReset: 'Sí, Restablecer',
    settingsAppliedSuccess: 'Tu configuración se ha aplicado exitosamente.',
    settingsRestoredSuccess: 'La configuración se ha restaurado a los valores predeterminados.',
    
    // Language Options
    languageEnglish: 'English',
    languageSpanish: 'Español (Spanish)',
    languageFrench: 'Français (French)',
    languageGerman: 'Deutsch (German)',
    languageJapanese: '日本語 (Japanese)',
    
    // CategoryScreen translations
    selectCategory: 'Seleccionar Categoría',
    mysticLibrary: 'Biblioteca Mística',
    piratesParley: 'Parlamento Pirata',
    nebulaLexis: 'Nebula Lexis',
    enchantedRealm: 'Reino Encantado',
    clickToPlay: 'Haz clic para jugar',
    
    // Instruction
    skip: "Saltar",
    step: "Paso",
    of: "de",
    howToPlay: "Cómo Jugar",
    tutorialStep: "Ilustración del paso del tutorial",
    handClickAnimation: "Animación de clic de mano",
    previous: "Anterior",
    next: "Siguiente",
    playNow: "Jugar Ahora",
    
    // Tutorial content
    tutorialWelcome: "📖 ¡Bienvenido a Spellbound! Tu objetivo es formar palabras seleccionando fichas de letras.",
    tutorialClickTiles: "🟡 Haz clic en las fichas de letras para seleccionarlas y formar palabras.",
    tutorialSubmit: "✅ ¡Haz clic en Enviar para confirmar tu palabra y ganar puntos!",
    tutorialEarnPoints: "📈 ¡Consigue suficientes puntos para subir de nivel y progresar!",
    tutorialReady: "🎉 ¡Ya estás listo! ¡Vamos a jugar!",
    
    // Help & Support
    helpAndSupport: 'Ayuda y Soporte',
    feedback: 'Comentarios',
    support: 'Soporte',
    comingSoonMessage: 'La página de {item} estará disponible pronto.',
    feedbackTitle: 'Comentarios',
    feedbackContent: '¡Valoramos tus comentarios! Por favor comparte tus pensamientos sobre el juego:\n\n• ¿Qué es lo que más te gusta de Hechizado?\n• ¿Hay alguna característica que te gustaría ver mejorada?\n• ¿Has encontrado algún error o problema?\n• ¿Alguna sugerencia para nuevas características?\n\nPuedes contactarnos en: feedback@spellboundgame.com\n\n¡Gracias por ayudarnos a hacer Hechizado mejor!',
    supportTitle: 'Ayuda y Soporte',
    supportContent: '¿Necesitas ayuda con Hechizado? Aquí tienes algunos recursos:\n\n🎯 AYUDA DE JUEGO:\n• Revisa el tutorial "Cómo Jugar"\n• Practica primero con palabras más cortas\n• Busca fichas de bonificación para maximizar puntos\n\n🔧 SOPORTE TÉCNICO:\n• Asegúrate de que tu navegador esté actualizado\n• Limpia la caché del navegador si tienes problemas\n• Desactiva los bloqueadores de anuncios si el juego no carga\n\n📧 CONTÁCTANOS:\nPara soporte adicional, email: support@spellboundgame.com\n\n¡Estamos aquí para ayudarte a disfrutar tu aventura mágica de palabras!',
    gameVersion: 'Versión del Juego',
    developedBy: 'Desarrollado Por',
    close: 'Cerrar',
    
    // Alt text for images
    gameLogoAlt: 'Logo del Juego Hechizado',
    tutorialImageAlt: 'Ilustración del Tutorial del Juego',
    menuBackgroundAlt: 'Fondo del Menú Principal',
    dragonAlt: 'Dragón Mágico',

    // Audio Settings
    audioSettings: 'Configuración de Audio',
    music: 'Música',
    soundEffects: 'Efectos de Sonido',
    audioSettingsAppliedSuccess: '¡Configuración de audio aplicada exitosamente!',
    confirmRestoreAudio: '¿Restaurar Cambios?',
    restoreAudioConfirmMessage: '¿Estás seguro de que quieres restablecer toda la configuración de audio?',
    mute: 'Silencio',

    // General Settings
    generalSettings: 'Configuración General',
    graphics: 'GRÁFICOS',
    display: 'PANTALLA',
    videoQuality: 'CALIDAD DE VIDEO',
    generalSettingsAppliedSuccess: '¡Configuración guardada exitosamente!',
    confirmRestoreGeneral: '¿Restaurar Cambios?',
    restoreGeneralConfirmMessage: '¿Estás seguro de que quieres restablecer a los valores predeterminados?',

    // Difficulty Screen
    selectDifficulty: "Seleccionar Dificultad",
    yourScore: "Puntuación Total",
    progress: "Progreso", 
    unlocked: "Desbloqueado",
    locked: "Bloqueado",
    level: "Nivel",
    loading: "Cargando",
    unlockAt: "Desbloquear en",
    points: "puntos",
    
    // Difficulty Levels
    difficultyApprentice: "Aprendiz",
    difficultyScholar: "Erudito",
    difficultyMaster: "Maestro",
    difficultyGrandmaster: "Gran Maestro",
    
    // Difficulty Descriptions
    apprenticeDesc: "Perfecto para principiantes - preguntas fáciles",
    scholarDesc: "Desafío moderado - nivel intermedio", 
    masterDesc: "Dificultad de nivel experto - preguntas difíciles",
    grandmasterDesc: "Desafío definitivo - extremadamente difícil",

    // Levels Screen
    mode: 'Modo',
    totalScore: 'Puntuación Total',
    completed: 'Completado',
    readyToPlay: 'Listo para Jugar',
    stars: 'Estrellas',
    levels: 'Niveles',
    difficultyProgress: 'Progreso de Dificultad',
    difficultyCompleted: '¡Dificultad Completada!',
    levelUnlocked: '¡NIVEL DESBLOQUEADO!',
    levelUnlockedMessage: '¡El nivel {level} ya está disponible!',
    awesome: '¡Increíble!',
    categoryScore: "Puntuación",

    // Game Screen
    progressToVictory: 'Progreso hacia la Victoria',
    timeLeft: 'Tiempo Restante',
    mission: 'Misión',
    formWordsWith: 'Forma palabras con',
    selectedWord: 'Palabra Seleccionada',
    noWordSelected: 'Ninguna palabra seleccionada',
    foundWords: 'Palabras Encontradas',
    noWordsFoundYet: 'Aún no se han encontrado palabras',
    gameStats: 'Estadísticas del Juego',
    wordsFound: 'Palabras Encontradas',
    bestWord: 'Mejor Palabra',
    submit: 'ENVIAR',
    undo: 'DESHACER',
    victory: 'VICTORIA',
    levelComplete: 'Nivel {level} Completado',
    finalScore: 'Puntuación Final',
    nextLevel: 'Siguiente Nivel',
    moreLevels: 'Más Niveles',
    replay: 'Repetir',
    home: 'Inicio',
    invalidWord: 'Palabra Inválida',
    makeSureYourWord: 'Asegúrate de que tu palabra',
    hasLetters: 'Tenga {min}-{max} letras',
    isValidWord: 'Sea una palabra válida en español',
    hasntBeenUsed: 'No haya sido usada antes',
    existsInDictionary: 'Exista en nuestro diccionario de {category}',
    tryAgain: 'Intentar de Nuevo',
    timesUp: 'Se Acabó el Tiempo',
    target: 'Objetivo',
    wordLength: 'Longitud de Palabra',
    minimum: 'Mínimo',
    letters: 'letras',
    wordRequirements: 'Requisitos de Palabra',
    createWordsInstruction: 'Crea palabras con {min}-{max} letras en el tema {category}',
    category: 'Categoría',
  },
  
  fr: {
    // Game Title
    gameTitle: 'Ensorcelé',
    
    // Main Menu
    play: 'Jouer',
    learnHowToPlay: 'Apprendre à Jouer',
    settings: 'Paramètres',
    exit: 'Quitter',
    exitGameMessage: 'Êtes-vous sûr de vouloir quitter le jeu?',
    
    // Settings
    gameOptions: 'Options du Jeu',
    general: 'Général',
    audio: 'Audio',
    language: 'Langue',
    help: 'Aide',
    back: 'Retour',

    //Pause Menu
    epicTitled: 'AVENTURE ÉPIQUE',
  paused: 'EN PAUSE',
  chooseNextPaused: 'Choisissez votre prochaine action',
  resumePaused: 'REPRENDRE',
  restartPaused: 'RECOMMENCER',
  optionsPaused: 'OPTIONS',
  exitPaused: 'QUITTER',
  exitTitlePaused: 'QUITTER LE JEU ?',
  exitConfirmPaused: 'Êtes-vous sûr de vouloir quitter ?',
  unsavedWarningPaused: 'Tous les progrès non enregistrés seront perdus !',
  cancelPaused: 'ANNULER',
  exitGamePaused: 'QUITTER LE JEU',
    
    // Language Settings
    chooseLanguage: 'Choisir la Langue',
    currentLanguage: 'Langue Actuelle',
    selectLanguage: 'Sélectionnez votre langue',
    selected: 'Sélectionné',
    applyChangesInstruction: 'Cliquez sur "Appliquer les Changements" pour sauvegarder votre préférence de langue.',
    restoreChanges: 'Restaurer les Changements',
    applyChanges: 'Appliquer les Changements',
    confirmRestore: 'Confirmer la Restauration',
    restoreConfirmMessage: 'Êtes-vous sûr de vouloir réinitialiser la langue à l\'anglais?',
    cancel: 'Annuler',
    yesReset: 'Oui, Réinitialiser',
    settingsAppliedSuccess: 'Vos paramètres ont été appliqués avec succès.',
    settingsRestoredSuccess: 'Les paramètres ont été restaurés aux valeurs par défaut.',
    
    // Language Options
    languageEnglish: 'English',
    languageSpanish: 'Español (Spanish)',
    languageFrench: 'Français (French)',
    languageGerman: 'Deutsch (German)',
    languageJapanese: '日本語 (Japanese)',
    
    // CategoryScreen translations
    selectCategory: 'Sélectionner Catégorie',
    mysticLibrary: 'Bibliothèque Mystique',
    piratesParley: 'Parlement des Pirates',
    nebulaLexis: 'Nebula Lexis',
    enchantedRealm: 'Royaume Enchanté',
    clickToPlay: 'Cliquez pour Jouer',
    
    // Instruction 
    skip: "Passer",
    step: "Étape",
    of: "de",
    howToPlay: "Comment Jouer",
    tutorialStep: "Illustration de l'étape du tutoriel",
    handClickAnimation: "Animation de clic de main",
    previous: "Précédent",
    next: "Suivant",
    playNow: "Jouer Maintenant",
    
    // Tutorial content
    tutorialWelcome: "📖 Bienvenue dans Spellbound ! Votre objectif est de former des mots en sélectionnant des tuiles de lettres.",
    tutorialClickTiles: "🟡 Cliquez sur les tuiles de lettres pour les sélectionner et former des mots.",
    tutorialSubmit: "✅ Cliquez sur Soumettre pour confirmer votre mot et gagner des points !",
    tutorialEarnPoints: "📈 Gagnez suffisamment de points pour monter de niveau et progresser !",
    tutorialReady: "🎉 Vous êtes prêt ! Jouons !",
    
    // Help & Support
    helpAndSupport: 'Aide et Support',
    feedback: 'Commentaires',
    support: 'Support',
    comingSoonMessage: 'La page {item} arrive bientôt.',
    feedbackTitle: 'Commentaires',
    feedbackContent: 'Nous apprécions vos commentaires ! Partagez vos réflexions sur le jeu :\n\n• Qu\'aimez-vous le plus dans Ensorcelé ?\n• Y a-t-il des fonctionnalités que vous aimeriez voir améliorées ?\n• Avez-vous rencontré des bugs ou des problèmes ?\n• Des suggestions pour de nouvelles fonctionnalités ?\n\nVous pouvez nous contacter à : feedback@spellboundgame.com\n\nMerci de nous aider à améliorer Ensorcelé !',
    supportTitle: 'Aide et Support',
    supportContent: 'Besoin d\'aide avec Ensorcelé ? Voici quelques ressources :\n\n🎯 AIDE DE JEU :\n• Consultez le tutoriel "Comment Jouer"\n• Pratiquez d\'abord avec des mots plus courts\n• Cherchez des tuiles bonus pour maximiser les points\n\n🔧 SUPPORT TECHNIQUE :\n• Assurez-vous que votre navigateur est à jour\n• Videz le cache du navigateur en cas de problèmes\n• Désactivez les bloqueurs de publicités si le jeu ne charge pas\n\n📧 NOUS CONTACTER :\nPour un support supplémentaire, email : support@spellboundgame.com\n\nNous sommes là pour vous aider à profiter de votre aventure magique de mots !',
    gameVersion: 'Version du Jeu',
    developedBy: 'Développé Par',
    close: 'Fermer',
    
    // Alt text for images
    gameLogoAlt: 'Logo du Jeu Ensorcelé',
    tutorialImageAlt: 'Illustration du Tutoriel du Jeu',
    menuBackgroundAlt: 'Arrière-plan du Menu Principal',
    dragonAlt: 'Dragon Magique',

    // Audio Settings
    audioSettings: 'Paramètres Audio',
    music: 'Musique',
    soundEffects: 'Effets Sonores',
    audioSettingsAppliedSuccess: 'Paramètres audio appliqués avec succès !',
    confirmRestoreAudio: 'Restaurer les Changements ?',
    restoreAudioConfirmMessage: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres audio ?',
    mute: 'Muet',

    // General Settings
    generalSettings: 'Paramètres Généraux',
    graphics: 'GRAPHIQUES',
    display: 'AFFICHAGE',
    videoQuality: 'QUALITÉ VIDÉO',
    generalSettingsAppliedSuccess: 'Paramètres sauvegardés avec succès !',
    confirmRestoreGeneral: 'Restaurer les Changements ?',
    restoreGeneralConfirmMessage: 'Êtes-vous sûr de vouloir revenir aux paramètres par défaut ?',

    // Difficulty Screen  
    selectDifficulty: "Sélectionner Difficulté",
    yourScore: "Score Total",
    progress: "Progrès",
    unlocked: "Débloqué", 
    locked: "Verrouillé",
    level: "Niveau",
    loading: "Chargement",
    unlockAt: "Débloquer à",
    points: "points",
    
    // Difficulty Levels
    difficultyApprentice: "Apprenti", 
    difficultyScholar: "Érudit",
    difficultyMaster: "Maître",
    difficultyGrandmaster: "Grand Maître",
    
    // Difficulty Descriptions
    apprenticeDesc: "Parfait pour les débutants - questions faciles",
    scholarDesc: "Défi modéré - niveau intermédiaire",
    masterDesc: "Difficulté niveau expert - questions difficiles", 
    grandmasterDesc: "Défi ultime - extrêmement difficile",

    // Levels Screen
    mode: 'Mode',
    totalScore: 'Score Total',
    completed: 'Terminé',
    readyToPlay: 'Prêt à Jouer',
    stars: 'Étoiles',
    levels: 'Niveaux',
    difficultyProgress: 'Progrès de Difficulté',
    difficultyCompleted: 'Difficulté Terminée!',
    levelUnlocked: 'NIVEAU DÉBLOQUÉ!',
    levelUnlockedMessage: 'Le niveau {level} est maintenant disponible!',
    awesome: 'Fantastique!',
    categoryScore: "Score",

    // Game Screen
    progressToVictory: 'Progrès vers la Victoire',
    timeLeft: 'Temps Restant',
    mission: 'Mission',
    formWordsWith: 'Formez des mots avec',
    selectedWord: 'Mot Sélectionné',
    noWordSelected: 'Aucun mot sélectionné',
    foundWords: 'Mots Trouvés',
    noWordsFoundYet: 'Aucun mot trouvé pour le moment',
    gameStats: 'Statistiques de Jeu',
    wordsFound: 'Mots Trouvés',
    bestWord: 'Meilleur Mot',
    submit: 'SOUMETTRE',
    undo: 'ANNULER',
    victory: 'VICTOIRE',
    levelComplete: 'Niveau {level} Terminé',
    finalScore: 'Score Final',
    nextLevel: 'Niveau Suivant',
    moreLevels: 'Plus de Niveaux',
    replay: 'Rejouer',
    home: 'Accueil',
    invalidWord: 'Mot Invalide',
    makeSureYourWord: 'Assurez-vous que votre mot',
    hasLetters: 'A {min}-{max} lettres',
    isValidWord: 'Est un mot français valide',
    hasntBeenUsed: 'N\'a pas été utilisé avant',
    existsInDictionary: 'Existe dans notre dictionnaire {category}',
    tryAgain: 'Réessayer',
    timesUp: 'Temps Écoulé',
    target: 'Objectif',
    wordLength: 'Longueur du Mot',
    minimum: 'Minimum',
    letters: 'lettres',
    wordRequirements: 'Exigences de Mot',
    createWordsInstruction: 'Créez des mots avec {min}-{max} lettres sur le thème {category}',
    category: 'Catégorie',
  },
  
  de: {
    // Game Title
    gameTitle: 'Verzaubert',
    
    // Main Menu
    play: 'Spielen',
    learnHowToPlay: 'Spielen Lernen',
    settings: 'Einstellungen',
    exit: 'Beenden',
    exitGameMessage: 'Sind Sie sicher, dass Sie das Spiel beenden möchten?',
    
    // Settings
    gameOptions: 'Spieloptionen',
    general: 'Allgemein',
    audio: 'Audio',
    language: 'Sprache',
    help: 'Hilfe',
    back: 'Zurück',

    //Pause Menu
    epicTitled: 'EPISCHES ABENTEUER',
  paused: 'PAUSIERT',
  chooseNextPaused: 'Wähle deinen nächsten Schritt',
  resumePaused: 'FORTSETZEN',
  restartPaused: 'NEUSTART',
  optionsPaused: 'OPTIONEN',
  exitPaused: 'BEENDEN',
  exitTitlePaused: 'SPIEL BEENDEN?',
  exitConfirmPaused: 'Bist du sicher, dass du das Spiel beenden möchtest?',
  unsavedWarningPaused: 'Alle nicht gespeicherten Fortschritte gehen verloren!',
  cancelPaused: 'ABBRECHEN',
  exitGamePaused: 'SPIEL BEENDEN',
    
    // Language Settings
    chooseLanguage: 'Sprache Wählen',
    currentLanguage: 'Aktuelle Sprache',
    selectLanguage: 'Wählen Sie Ihre Sprache',
    selected: 'Ausgewählt',
    applyChangesInstruction: 'Klicken Sie auf "Änderungen Anwenden", um Ihre Spracheinstellung zu speichern.',
    restoreChanges: 'Änderungen Zurücksetzen',
    applyChanges: 'Änderungen Anwenden',
    confirmRestore: 'Zurücksetzen Bestätigen',
    restoreConfirmMessage: 'Sind Sie sicher, dass Sie die Sprache auf Englisch zurücksetzen möchten?',
    cancel: 'Abbrechen',
    yesReset: 'Ja, Zurücksetzen',
    settingsAppliedSuccess: 'Ihre Einstellungen wurden erfolgreich angewendet.',
    settingsRestoredSuccess: 'Die Einstellungen wurden auf die Standardwerte zurückgesetzt.',
    
    // Language Options
    languageEnglish: 'English',
    languageSpanish: 'Español (Spanish)',
    languageFrench: 'Français (French)',
    languageGerman: 'Deutsch (German)',
    languageJapanese: '日本語 (Japanese)',
    
    // CategoryScreen translations
    selectCategory: 'Kategorie Auswählen',
    mysticLibrary: 'Mystische Bibliothek',
    piratesParley: 'Piraten Verhandlung',
    nebulaLexis: 'Nebula Lexis',
    enchantedRealm: 'Verzaubertes Reich',
    clickToPlay: 'Klicken zum Spielen',
    
    // Instruction 
    skip: "Überspringen",
    step: "Schritt",
    of: "von",
    howToPlay: "Spielanleitung",
    tutorialStep: "Tutorial-Schritt Illustration",
    handClickAnimation: "Hand-Klick Animation",
    previous: "Vorherige",
    next: "Weiter",
    playNow: "Jetzt Spielen",
    
    // Tutorial content 
    tutorialWelcome: "📖 Willkommen bei Spellbound! Dein Ziel ist es, Wörter zu bilden, indem du Buchstaben auswählst.",
    tutorialClickTiles: "🟡 Klicke auf Buchstabenfelder, um sie auszuwählen und Wörter zu bilden.",
    tutorialSubmit: "✅ Klicke auf Senden, um dein Wort zu bestätigen und Punkte zu verdienen!",
    tutorialEarnPoints: "📈 Erhalte genug Punkte, um aufzusteigen und Fortschritte zu machen!",
    tutorialReady: "🎉 Jetzt bist du bereit! Lass uns spielen!",
    
    // Help & Support
    helpAndSupport: 'Hilfe & Support',
    feedback: 'Feedback',
    support: 'Support',
    comingSoonMessage: 'Die {item}-Seite kommt bald.',
    feedbackTitle: 'Feedback',
    feedbackContent: 'Wir schätzen Ihr Feedback! Teilen Sie uns Ihre Gedanken zum Spiel mit:\n\n• Was gefällt Ihnen am meisten an Verzaubert?\n• Gibt es Funktionen, die Sie gerne verbessert sehen möchten?\n• Sind Ihnen Bugs oder Probleme aufgefallen?\n• Haben Sie Vorschläge für neue Funktionen?\n\nSie können uns erreichen unter: feedback@spellboundgame.com\n\nVielen Dank, dass Sie uns helfen, Verzaubert besser zu machen!',
    supportTitle: 'Hilfe & Support',
    supportContent: 'Brauchen Sie Hilfe mit Verzaubert? Hier sind einige Ressourcen:\n\n🎯 SPIELHILFE:\n• Schauen Sie sich das "Wie man spielt" Tutorial an\n• Üben Sie zuerst mit kürzeren Wörtern\n• Suchen Sie nach Bonus-Kacheln für maximale Punkte\n\n🔧 TECHNISCHER SUPPORT:\n• Stellen Sie sicher, dass Ihr Browser aktuell ist\n• Leeren Sie den Browser-Cache bei Problemen\n• Deaktivieren Sie Werbeblocker, wenn das Spiel nicht lädt\n\n📧 KONTAKT:\nFür zusätzlichen Support, E-Mail: support@spellboundgame.com\n\nWir sind da, um Ihnen zu helfen, Ihr magisches Wortabenteuer zu genießen!',
    gameVersion: 'Spielversion',
    developedBy: 'Entwickelt Von',
    close: 'Schließen',
    
    // Alt text for images
    gameLogoAlt: 'Verzaubert Spiel Logo',
    tutorialImageAlt: 'Spiel Tutorial Illustration',
    menuBackgroundAlt: 'Hauptmenü Hintergrund',
    dragonAlt: 'Magischer Drache',

    // Audio Settings
    audioSettings: 'Audio-Einstellungen',
    music: 'Musik',
    soundEffects: 'Soundeffekte',
    audioSettingsAppliedSuccess: 'Audio-Einstellungen erfolgreich angewendet!',
    confirmRestoreAudio: 'Änderungen Zurücksetzen?',
    restoreAudioConfirmMessage: 'Sind Sie sicher, dass Sie alle Audio-Einstellungen zurücksetzen möchten?',
    mute: 'Stumm',

    // General Settings
    generalSettings: 'Allgemeine Einstellungen',
    graphics: 'GRAFIKEN',
    display: 'ANZEIGE',
    videoQuality: 'VIDEOQUALITÄT',
    generalSettingsAppliedSuccess: 'Einstellungen erfolgreich gespeichert!',
    confirmRestoreGeneral: 'Änderungen Zurücksetzen?',
    restoreGeneralConfirmMessage: 'Sind Sie sicher, dass Sie auf die Standardwerte zurücksetzen möchten?',

    // Difficulty Screen
    selectDifficulty: "Schwierigkeit Wählen",
    yourScore: "Gesamtpunktzahl", 
    progress: "Fortschritt",
    unlocked: "Freigeschaltet",
    locked: "Gesperrt",
    level: "Stufe",
    loading: "Laden",
    unlockAt: "Freischalten bei",
    points: "Punkte",
    
    // Difficulty Levels
    difficultyApprentice: "Lehrling",
    difficultyScholar: "Gelehrter", 
    difficultyMaster: "Meister",
    difficultyGrandmaster: "Großmeister",
    
    // Difficulty Descriptions
    apprenticeDesc: "Perfekt für Anfänger - einfache Fragen",
    scholarDesc: "Moderate Herausforderung - mittleres Niveau",
    masterDesc: "Expertenschwierigkeit - schwere Fragen",
    grandmasterDesc: "Ultimative Herausforderung - extrem schwierig",

    // Levels Screen
    mode: 'Modus',
    totalScore: 'Gesamtpunktzahl',
    completed: 'Abgeschlossen',
    readyToPlay: 'Bereit zu Spielen',
    stars: 'Sterne',
    levels: 'Level',
    difficultyProgress: 'Schwierigkeits-Fortschritt',
    difficultyCompleted: 'Schwierigkeit Abgeschlossen!',
    levelUnlocked: 'LEVEL FREIGESCHALTET!',
    levelUnlockedMessage: 'Level {level} ist jetzt verfügbar!',
    awesome: 'Fantastisch!',
    categoryScore: "Punktzahl",

    // Game Screen
    progressToVictory: 'Fortschritt zum Sieg',
    timeLeft: 'Verbleibende Zeit',
    mission: 'Mission',
    formWordsWith: 'Bilden Sie Wörter mit',
    selectedWord: 'Ausgewähltes Wort',
    noWordSelected: 'Kein Wort ausgewählt',
    foundWords: 'Gefundene Wörter',
    noWordsFoundYet: 'Noch keine Wörter gefunden',
    gameStats: 'Spielstatistiken',
    wordsFound: 'Gefundene Wörter',
    bestWord: 'Bestes Wort',
    submit: 'SENDEN',
    undo: 'RÜCKGÄNGIG',
    victory: 'SIEG',
    levelComplete: 'Level {level} Abgeschlossen',
    finalScore: 'Endpunktzahl',
    nextLevel: 'Nächstes Level',
    moreLevels: 'Mehr Level',
    replay: 'Wiederholen',
    home: 'Startseite',
    invalidWord: 'Ungültiges Wort',
    makeSureYourWord: 'Stellen Sie sicher, dass Ihr Wort',
    hasLetters: '{min}-{max} Buchstaben hat',
    isValidWord: 'Ein gültiges deutsches Wort ist',
    hasntBeenUsed: 'Noch nicht verwendet wurde',
    existsInDictionary: 'In unserem {category} Wörterbuch existiert',
    tryAgain: 'Nochmal Versuchen',
    timesUp: 'Zeit Abgelaufen',
    target: 'Ziel',
    wordLength: 'Wortlänge',
    minimum: 'Mindestens',
    letters: 'Buchstaben',
    wordRequirements: 'Wortanforderungen',
    createWordsInstruction: 'Erstellen Sie Wörter mit {min}-{max} Buchstaben zum Thema {category}',
    category: 'Kategorie',
  },
  
  jp: {
    // Game Title
    gameTitle: 'スペルバウンド',
    
    // Main Menu
    play: 'プレイ',
    learnHowToPlay: '遊び方を学ぶ',
    settings: '設定',
    exit: '終了',
    exitGameMessage: 'ゲームを終了してもよろしいですか？',
    
    // Settings
    gameOptions: 'ゲームオプション',
    general: '一般',
    audio: 'オーディオ',
    language: '言語',
    help: 'ヘルプ',
    back: '戻る',

    //Pause Menu
    epicTitled: 'エピックアドベンチャー',
  paused: '一時停止中',
  chooseNextPaused: '次の動きを選択してください',
  resumePaused: '再開',
  restartPaused: '再スタート',
  optionsPaused: 'オプション',
  exitPaused: '終了',
  exitTitlePaused: 'ゲームを終了しますか？',
  exitConfirmPaused: '本当に終了しますか？',
  unsavedWarningPaused: '保存されていない進行状況はすべて失われます！',
  cancelPaused: 'キャンセル',
  exitGamePaused: 'ゲーム終了',
    
    // Language Settings
    chooseLanguage: '言語を選択',
    currentLanguage: '現在の言語',
    selectLanguage: '言語を選択してください',
    selected: '選択済み',
    applyChangesInstruction: '言語設定を保存するには「変更を適用」をクリックしてください。',
    restoreChanges: '変更をリセット',
    applyChanges: '変更を適用',
    confirmRestore: 'リセットの確認',
    restoreConfirmMessage: '言語を英語にリセットしてもよろしいですか？',
    cancel: 'キャンセル',
    yesReset: 'はい、リセット',
    settingsAppliedSuccess: '設定が正常に適用されました。',
    settingsRestoredSuccess: '設定がデフォルト値に復元されました。',
    
    // Language Options
    languageEnglish: 'English',
    languageSpanish: 'Español (Spanish)',
    languageFrench: 'Français (French)',
    languageGerman: 'Deutsch (German)',
    languageJapanese: '日本語 (Japanese)',
    
    // CategoryScreen translations
    selectCategory: 'カテゴリを選択',
    mysticLibrary: 'ミスティック図書館',
    piratesParley: '海賊の談話',
    nebulaLexis: 'ネビュラ・レクシス',
    enchantedRealm: '魔法の王国',
    clickToPlay: 'クリックしてプレイ',
    
    // Instruction 
    skip: "スキップ",
    step: "ステップ",
    of: "の",
    howToPlay: "遊び方",
    tutorialStep: "チュートリアルステップの説明",
    handClickAnimation: "手のクリックアニメーション",
    previous: "前へ",
    next: "次へ",
    playNow: "今すぐプレイ",
    
    // Tutorial content
    tutorialWelcome: "📖 Spellboundへようこそ！タイルを選択して単語を作ることが目的です。",
    tutorialClickTiles: "🟡 文字タイルをクリックして選択し、単語を作成しましょう。",
    tutorialSubmit: "✅ 「送信」をクリックして単語を確定し、ポイントを獲得しましょう！",
    tutorialEarnPoints: "📈 ポイントを獲得してレベルアップを目指しましょう！",
    tutorialReady: "🎉 準備完了！さあ、プレイしましょう！",
    
    // Help & Support
    helpAndSupport: 'ヘルプとサポート',
    feedback: 'フィードバック',
    support: 'サポート',
    comingSoonMessage: '{item}ページは近日公開予定です。',
    feedbackTitle: 'フィードバック',
    feedbackContent: 'あなたのフィードバックを大切にします！ゲームについてのご意見をお聞かせください：\n\n• スペルバウンドで最も気に入っている点は？\n• 改善してほしい機能はありますか？\n• バグや問題に遭遇しましたか？\n• 新機能の提案はありますか？\n\nお問い合わせ先：feedback@spellboundgame.com\n\nスペルバウンドをより良くするためのご協力ありがとうございます！',
    supportTitle: 'ヘルプとサポート',
    supportContent: 'スペルバウンドでお困りですか？こちらのリソースをご利用ください：\n\n🎯 ゲームプレイヘルプ：\n• 「遊び方」チュートリアルをご確認ください\n• まず短い単語で練習しましょう\n• ボーナスタイルを探してポイントを最大化\n\n🔧 技術サポート：\n• ブラウザが最新版であることを確認\n• 問題がある場合はブラウザキャッシュをクリア\n• ゲームが読み込まれない場合は広告ブロッカーを無効化\n\n📧 お問い合わせ：\n追加サポートが必要な場合：support@spellboundgame.com\n\n魔法の単語アドベンチャーをお楽しみいただけるよう、サポートいたします！',
    gameVersion: 'ゲームバージョン',
    developedBy: '開発者',
    close: '閉じる',
    
    // Alt text for images
    gameLogoAlt: 'スペルバウンドゲームロゴ',
    tutorialImageAlt: 'ゲームチュートリアルイラスト',
    menuBackgroundAlt: 'メインメニュー背景',
    dragonAlt: '魔法のドラゴン',
    
    // Audio Settings
    audioSettings: 'オーディオ設定',
    music: '音楽',
    soundEffects: '効果音',
    audioSettingsAppliedSuccess: 'オーディオ設定が正常に適用されました！',
    confirmRestoreAudio: '変更をリセットしますか？',
    restoreAudioConfirmMessage: 'すべてのオーディオ設定をリセットしてもよろしいですか？',
    mute: 'ミュート',

    // General Settings
    generalSettings: '一般設定',
    graphics: 'グラフィック',
    display: 'ディスプレイ',
    videoQuality: 'ビデオ品質',
    generalSettingsAppliedSuccess: '設定が正常に保存されました！',
    confirmRestoreGeneral: '変更をリセットしますか？',
    restoreGeneralConfirmMessage: 'デフォルト設定にリセットしてもよろしいですか？',

    // Difficulty Screen
    selectDifficulty: "難易度を選択", 
    yourScore: "合計スコア",
    progress: "進捗",
    unlocked: "アンロック済み",
    locked: "ロック中",
    level: "レベル", 
    loading: "読み込み中",
    unlockAt: "アンロック条件:",
    points: "ポイント",
    
    // Difficulty Levels
    difficultyApprentice: "見習い",
    difficultyScholar: "学者",
    difficultyMaster: "マスター",
    difficultyGrandmaster: "グランドマスター",
    
    // Difficulty Descriptions
    apprenticeDesc: "初心者に最適 - 簡単な問題",
    scholarDesc: "適度な挑戦 - 中級レベル",
    masterDesc: "エキスパートレベル - 難しい問題", 
    grandmasterDesc: "究極の挑戦 - 非常に困難",

    // Levels Screen
    mode: 'モード',
    totalScore: '総スコア',
    completed: '完了',
    readyToPlay: 'プレイ準備完了',
    stars: 'スター',
    levels: 'レベル',
    difficultyProgress: '難易度の進捗',
    difficultyCompleted: '難易度クリア！',
    levelUnlocked: 'レベルアンロック！',
    levelUnlockedMessage: 'レベル{level}が利用可能になりました！',
    awesome: '素晴らしい！',
    categoryScore: "スコア",

    // Game Screen
    progressToVictory: '勝利への進歩',
    timeLeft: '残り時間',
    mission: 'ミッション',
    formWordsWith: '次で単語を作成',
    selectedWord: '選択された単語',
    noWordSelected: '単語が選択されていません',
    foundWords: '見つけた単語',
    noWordsFoundYet: 'まだ単語が見つかっていません',
    gameStats: 'ゲーム統計',
    wordsFound: '見つけた単語',
    bestWord: '最高の単語',
    submit: '送信',
    undo: '元に戻す',
    victory: '勝利',
    levelComplete: 'レベル{level}完了',
    finalScore: '最終スコア',
    nextLevel: '次のレベル',
    moreLevels: 'もっとレベル',
    replay: 'リプレイ',
    home: 'ホーム',
    invalidWord: '無効な単語',
    makeSureYourWord: 'あなたの単語が次であることを確認',
    hasLetters: '{min}-{max}文字である',
    isValidWord: '有効な日本語の単語である',
    hasntBeenUsed: '以前に使用されていない',
    existsInDictionary: '私たちの{category}辞書に存在する',
    tryAgain: 'もう一度試す',
    timesUp: '時間切れ',
    target: '目標',
    wordLength: '単語の長さ',
    minimum: '最小',
    letters: '文字',
    wordRequirements: '単語の要件',
    createWordsInstruction: '{category}テーマで{min}-{max}文字の単語を作成',
    category: 'カテゴリー',
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      if (translations[newLanguage]) {
        setCurrentLanguage(newLanguage);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Translation function
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  // Get current language
  const getCurrentLanguage = () => currentLanguage;

  // Set language manually (if needed)
  const setLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('selectedLanguage', language);
    }
  };

  // Get all available languages
  const getAvailableLanguages = () => Object.keys(translations);

  return {
    t,
    currentLanguage,
    getCurrentLanguage,
    setLanguage,
    getAvailableLanguages
  };
};