import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, ArrowRight, Home, RotateCcw, Zap, Target, Clock, Award } from "lucide-react";
import tileTexture from "../assets/tile-texture.jpg";
import PauseMenu from "./PauseMenu";
import { useLanguage } from "../hooks/useLanguage";
import {
  playSFX,
  playNotification,
  playWordSubmit,
  playWordError,
  playVictoryByStars,
  playTimesUp,
  playTileClick,
  playTileDeselect,
  // setSFXVolume,
  // setNotificationVolume,
  // restoreVolumes,
} from "../utils/AudioManager.jsx";

// Background images for categories
import mysticLibraryImg from "../assets/mystic-library.png";
import piratesParleyImg from "../assets/pirates-parley.png";
import nebulaLexisImg from "../assets/nebula-lexis.png";
import enchantedRealmImg from "../assets/enchanted-realm.png";

const categoryBackgrounds = {
  "mystic-library": mysticLibraryImg,
  "pirates-parley": piratesParleyImg,
  "nebula-lexis": nebulaLexisImg,
  "enchanted-realm": enchantedRealmImg,
};

// Enhanced word lists by category and difficulty
const wordLists = {
  "mystic-library": {
    apprentice: [
      // Magic basics (3-5 letters)
      "MAGIC", "BOOK", "SPELL", "WAND", "CAST", "HEX", "CHARM", "FIRE", "POWER", "RUNE",
      "MAGE", "SAGE", "TOME", "ORBS", "GEMS", "GOLD", "STAR", "MOON", "SUN", "CAVE",
      "WISE", "OLD", "NEW", "DARK", "LIGHT", "BLUE", "RED", "WARD", "BIND", "HEAL",
      "BURN", "COLD", "WARM", "DEEP", "HIGH", "PURE", "WILD", "CALM", "FURY", "HOPE",
      // Common words for easier gameplay
      "ACT", "AGE", "ALL", "ANT", "ARM", "ASK", "BAG", "BAR", "BAT", "BED",
      "BEE", "BIG", "BIT", "BOX", "BOY", "BUG", "BUN", "BUS", "CAB", "CAP",
      "CAR", "CAT", "COW", "CUP", "CUT", "DEN", "DOG", "DOT", "EAR", "EAT",
      "EGG", "END", "EYE", "FAN", "FAT", "FIG", "FIT", "FIX", "FLY", "FUN",
      "GAP", "GAS", "HAT", "HEN", "HOP", "HOT", "ICE", "INK", "JAR", "JAW",
      "JET", "JOY", "KEY", "KIT", "LAB", "LAP", "LEG", "LET", "LOG", "MAN",
      "SKY", "LIP", "HAM", "RAT", "GOD", "WIN", "DIP", "ADD", "HIT", "RUN",
      "SIT", "GET", "PUT", "HELP", "MAKE", "TAKE", "GIVE", "COME", "GOES"
    ],
    scholar: [
      // Medium magic words (4-6 letters)
      "WIZARD", "POTION", "DRAGON", "ENCHANT", "MYSTIC", "ARCANE", "ELDER", "FLAME", "SPIRIT", "CRYSTAL",
      "ANCIENT", "LIBRARY", "SCROLL", "GRIMOIRE", "CANDLE", "CAULDRON", "RITUAL", "TEMPLE", "SHRINE", "ALTAR",
      "DIVINE", "SACRED", "BLESSED", "CURSED", "SHADOW", "PHANTOM", "WRAITH", "SPECTER", "BANISH", "SUMMON",
      "INVOKE", "PORTAL", "VORTEX", "ENERGY", "MATRIX", "NEXUS", "CIPHER", "GLYPH", "SYMBOL", "SIGIL",
      "TOWER", "CASTLE", "DUNGEON", "CHAMBER", "VAULT", "STUDY", "LEARN", "TEACH", "WISDOM", "POWER",
      "STRONG", "MIGHTY", "FOCUS", "CENTER", "BALANCE", "HARMONY", "CHAOS", "ORDER", "NATURE", "EARTH",
      "WATER", "WINDS", "STORMS", "THUNDER", "LIGHTNING", "FROST", "BLAZE", "INFERNO", "HEALING", "RESTORE",
      "SHIELD", "DEFEND", "ATTACK", "STRIKE", "BATTLE", "COMBAT", "VICTORY", "DEFEAT", "HONOR", "GLORY",
      "QUEST", "JOURNEY", "TRAVEL", "EXPLORE", "DISCOVER", "REVEAL", "HIDDEN", "SECRET", "MYSTERY", "RIDDLE"
    ],
    master: [
      // Advanced magic words (5-8 letters)
      "SPELLBOUND", "ENCHANTMENT", "SORCERER", "MYSTICAL", "CONJURE", "INCANTATION", "ALCHEMY", "DIVINATION", "NECROMANCY",
      "WIZARDRY", "WITCHCRAFT", "THAUMATURGE", "ARCANUM", "GRIMOIRE", "SPELLBOOK", "FAMILIAR", "APPRENTICE", "MAGICIAN",
      "ILLUSION", "PHANTASM", "MIRAGE", "VISION", "PROPHECY", "ORACLE", "FORTUNE", "DESTINY", "ETERNAL", "INFINITE",
      "CELESTIAL", "STELLAR", "COSMIC", "UNIVERSAL", "TEMPORAL", "DIMENSIONAL", "ETHEREAL", "SPECTRAL", "ASTRAL",
      "ELEMENTAL", "PRIMORDIAL", "FUNDAMENTAL", "ESSENTIAL", "QUINTESSENCE", "TRANSFORMATION", "METAMORPHOSIS",
      "TELEPORTATION", "LEVITATION", "MANIFESTATION", "MATERIALIZATION", "CRYSTALLINE", "LUMINOUS", "RADIANT",
      "BRILLIANT", "MAGNIFICENT", "GLORIOUS", "MAJESTIC", "SUBLIME", "TRANSCENDENT", "ENLIGHTENED", "AWAKENED",
      "POWERFUL", "FORMIDABLE", "INVINCIBLE", "LEGENDARY", "MYTHICAL", "FABLED", "RENOWNED", "CELEBRATED",
      "SANCTUARY", "CITADEL", "FORTRESS", "STRONGHOLD", "BASTION", "HAVEN", "REFUGE", "RETREAT", "SOLITUDE"
    ],
    grandmaster: [
      // Expert magic words (6+ letters)
      "THAUMATURGY", "PRESTIDIGITATION", "TRANSMUTATION", "EVOCATION", "ABJURATION", "CONJURATION", "ENCHANTMENT",
      "DIVINATION", "NECROMANCY", "ILLUSION", "CHRONOMANCY", "PYROMANCY", "HYDROMANCY", "GEOMANCY", "AEROMANCY",
      "BIBLIOMANCY", "CRYSTALLOMANCY", "ONEIROMANCY", "SCRYING", "AUGURY", "SOOTHSAYING", "CLAIRVOYANCE",
      "TELEPATHY", "PSYCHOKINESIS", "TELEKINESIS", "PRECOGNITION", "RETROCOGNITION", "OMNISCIENCE", "OMNIPOTENCE",
      "TRANSCENDENCE", "ASCENSION", "ENLIGHTENMENT", "ILLUMINATION", "REVELATION", "EPIPHANY", "AWAKENING",
      "CONSCIOUSNESS", "SUBCONSCIOUSNESS", "SUPERCONSCIOUSNESS", "METAPHYSICAL", "SUPERNATURAL", "PARANORMAL",
      "EXTRAORDINARY", "PHENOMENAL", "MIRACULOUS", "WONDROUS", "MARVELOUS", "SPECTACULAR", "MAGNIFICENT",
      "INCOMPREHENSIBLE", "UNFATHOMABLE", "INEXPLICABLE", "MYSTERIOUS", "ENIGMATIC", "CRYPTIC", "ESOTERIC",
      "ARCANE", "OCCULT", "HERMETIC", "CABALISTIC", "ALCHEMICAL", "PHILOSOPHICAL", "METAPHYSICAL", "ONTOLOGICAL"
    ]
  },

  "pirates-parley": {
    apprentice: [
      // Pirate basics (3-5 letters)
      "SHIP", "SAIL", "CREW", "GOLD", "MAP", "SEA", "RUM", "PORT", "MAST", "DECK",
      "ROPE", "BOAT", "WAVE", "WIND", "FISH", "HOOK", "NET", "FLAG", "SKULL", "BONE",
      "SWORD", "BLADE", "CHEST", "COIN", "JEWEL", "PEARL", "CORAL", "SHELL", "BEACH", "SAND",
      "ROCK", "CAVE", "ISLE", "BAY", "CAPE", "CLIFF", "STORM", "RAIN", "SUN", "STAR",
      "NIGHT", "DAY", "DAWN", "DUSK", "TIDE", "DEEP", "BLUE", "GREEN", "BLACK", "WHITE",
      // Common words
      "ACT", "AGE", "ALL", "ANT", "ARM", "ASK", "BAG", "BAR", "BAT", "BED",
      "BEE", "BIG", "BIT", "BOX", "BOY", "BUG", "BUN", "BUS", "CAB", "CAP",
      "CAR", "CAT", "COW", "CUP", "CUT", "DEN", "DOG", "DOT", "EAR", "EAT",
      "EGG", "END", "EYE", "FAN", "FAT", "FIG", "FIT", "FIX", "FLY", "FUN",
      "GAP", "GAS", "HAT", "HEN", "HOP", "HOT", "ICE", "INK", "JAR", "JAW",
      "JET", "JOY", "KEY", "KIT", "LAB", "LAP", "LEG", "LET", "LOG", "MAN",
      "SKY", "LIP", "HAM", "RAT", "GOD", "WIN", "DIP", "ADD", "HIT", "RUN"
    ],
    scholar: [
      // Medium pirate words (4-6 letters)
      "PIRATE", "TREASURE", "CAPTAIN", "PARROT", "CANNON", "ANCHOR", "COMPASS", "ISLAND", "PLUNDER", "CUTLASS",
      "BUCCANEER", "GALLEON", "FRIGATE", "SLOOP", "BRIG", "SCHOONER", "VESSEL", "HARBOR", "WHARF", "DOCK",
      "TAVERN", "KRAKEN", "SEAWEED", "BARNACLE", "DOLPHIN", "WHALE", "SHARK", "OCTOPUS", "JELLYFISH", "STARFISH",
      "HORIZON", "VOYAGE", "JOURNEY", "ADVENTURE", "EXPLORE", "DISCOVER", "SEARCH", "HUNT", "RAID", "ATTACK",
      "DEFEND", "BATTLE", "FIGHT", "DUEL", "VICTORY", "DEFEAT", "HONOR", "GLORY", "BRAVE", "BOLD",
      "FIERCE", "WILD", "ROUGH", "TOUGH", "STRONG", "SWIFT", "QUICK", "AGILE", "CLEVER", "CUNNING",
      "LOYAL", "TRUST", "FRIEND", "ENEMY", "RIVAL", "DANGER", "PERIL", "THREAT", "RESCUE", "ESCAPE",
      "FREEDOM", "LIBERTY", "JUSTICE", "REVENGE", "BETRAYAL", "MUTINY", "REBEL", "OUTLAW", "ROGUE", "BANDIT",
      "LEGEND", "MYTH", "TALE", "STORY", "SONG", "BALLAD", "LORE", "FAME", "RENOWN", "INFAMY"
    ],
    master: [
      // Advanced pirate words (5-8 letters)
      "BUCCANEER", "PRIVATEER", "MARAUDER", "SCALLYWAG", "BLACKBEARD", "JOLLYROGER", "CROSSBONES", "PLUNDERER",
      "FREEBOOTER", "CORSAIR", "SEAFARER", "NAVIGATOR", "HELMSMAN", "QUARTERMASTER", "FIRSTMATE", "BOATSWAIN",
      "SMUGGLER", "MERCHANT", "TRADER", "EXPLORER", "ADVENTURER", "WANDERER", "NOMAD", "VAGABOND", "OUTCAST",
      "TREASUREHUNTER", "FORTUNESEEKER", "GOLDDIGGER", "JEWELTHIEF", "PEARLDIVER", "DEEPSEA", "HIGHSEAS",
      "CARIBBEAN", "ATLANTIC", "PACIFIC", "MEDITERRANEAN", "TROPICAL", "EXOTIC", "REMOTE", "DISTANT", "FARAWAY",
      "MYSTERIOUS", "LEGENDARY", "INFAMOUS", "NOTORIOUS", "FEARSOME", "FORMIDABLE", "INVINCIBLE", "UNSTOPPABLE",
      "SHIPWRECK", "MAROONED", "CASTAWAY", "STRANDED", "ABANDONED", "FORSAKEN", "DESOLATE", "BARREN", "UNTAMED",
      "TEMPEST", "HURRICANE", "TYPHOON", "MONSOON", "SQUALL", "GALE", "WHIRLPOOL", "MAELSTROM", "TSUNAMI",
      "UNCHARTED", "UNEXPLORED", "UNDISCOVERED", "FORBIDDEN", "CURSED", "HAUNTED", "GHOSTLY", "SPECTRAL"
    ],
    grandmaster: [
      // Expert pirate words (6+ letters)
      "SWASHBUCKLER", "FILIBUSTER", "BUCCANEERING", "PRIVATEERING", "MARAUDING", "SEAFARING", "PLUNDERING",
      "COMMANDEERING", "PIRACY", "BRIGANDAGE", "LAWLESSNESS", "ANARCHY", "REBELLION", "INSURRECTION", "MUTINY",
      "MARITIME", "NAUTICAL", "OCEANIC", "AQUATIC", "MARINE", "NAVAL", "COASTAL", "LITTORAL", "PELAGIC",
      "ARCHIPELAGO", "ATOLL", "LAGOON", "REEF", "SHOAL", "SANDBAR", "PENINSULA", "PROMONTORY", "HEADLAND",
      "NAVIGATION", "CARTOGRAPHY", "ASTRONOMY", "CELESTIAL", "CONSTELLATION", "MERIDIAN", "LATITUDE", "LONGITUDE",
      "BAROMETRIC", "METEOROLOGICAL", "ATMOSPHERIC", "HYDROGRAPHIC", "OCEANOGRAPHIC", "TOPOGRAPHIC", "GEOGRAPHIC",
      "SWASHBUCKLING", "BUCCANEERING", "SEAFARING", "ADVENTUROUS", "DAREDEVIL", "AUDACIOUS", "INTREPID", "VALIANT",
      "TREACHEROUS", "PERILOUS", "HAZARDOUS", "DANGEROUS", "PRECARIOUS", "FORMIDABLE", "INTIMIDATING", "MENACING",
      "UNPRECEDENTED", "EXTRAORDINARY", "PHENOMENAL", "SPECTACULAR", "MAGNIFICENT", "STUPENDOUS", "COLOSSAL"
    ]
  },

  "nebula-lexis": {
    apprentice: [
      // Space basics (3-5 letters)
      "STAR", "MOON", "SHIP", "BEAM", "VOID", "NOVA", "COMET", "ORBIT", "SPACE", "ALIEN",
      "ROBOT", "LASER", "FUEL", "MARS", "EARTH", "SUN", "SKY", "LIGHT", "DARK", "BLUE",
      "RED", "ROCK", "DUST", "GAS", "ICE", "FIRE", "HEAT", "COLD", "FAST", "SLOW",
      "BIG", "SMALL", "FAR", "NEAR", "HIGH", "LOW", "DEEP", "WIDE", "LONG", "SHORT",
      "METAL", "GLASS", "STEEL", "WIRE", "CODE", "DATA", "INFO", "TECH", "GEAR", "TOOL",
      // Common words
      "ACT", "AGE", "ALL", "ANT", "ARM", "ASK", "BAG", "BAR", "BAT", "BED",
      "BEE", "BIG", "BIT", "BOX", "BOY", "BUG", "BUN", "BUS", "CAB", "CAP",
      "CAR", "CAT", "COW", "CUP", "CUT", "DEN", "DOG", "DOT", "EAR", "EAT",
      "EGG", "END", "EYE", "FAN", "FAT", "FIG", "FIT", "FIX", "FLY", "FUN",
      "GAP", "GAS", "HAT", "HEN", "HOP", "HOT", "ICE", "INK", "JAR", "JAW",
      "JET", "JOY", "KEY", "KIT", "LAB", "LAP", "LEG", "LET", "LOG", "MAN",
      "SKY", "LIP", "HAM", "RAT", "GOD", "WIN", "DIP", "ADD", "HIT", "RUN"
    ],
    scholar: [
      // Medium space words (4-6 letters)
      "GALAXY", "PLANET", "NEBULA", "COSMOS", "QUANTUM", "PHOTON", "NEUTRON", "FUSION", "WORMHOLE", "ASTEROID",
      "SATELLITE", "SPACECRAFT", "ROCKET", "SHUTTLE", "STATION", "MODULE", "PROBE", "ROVER", "DRONE", "ANDROID",
      "CYBORG", "HOLOGRAM", "PLASMA", "ENERGY", "MATTER", "ANTIMATTER", "PARTICLE", "MOLECULE", "ATOM", "ELECTRON",
      "PROTON", "NUCLEUS", "RADIATION", "SPECTRUM", "FREQUENCY", "WAVELENGTH", "VELOCITY", "ACCELERATION", "GRAVITY",
      "MAGNETIC", "ELECTRIC", "SONIC", "THERMAL", "KINETIC", "POTENTIAL", "NUCLEAR", "ATOMIC", "MOLECULAR", "CELLULAR",
      "DIGITAL", "ANALOG", "BINARY", "MATRIX", "NETWORK", "SYSTEM", "PROGRAM", "SOFTWARE", "HARDWARE", "INTERFACE",
      "TERMINAL", "CONSOLE", "DISPLAY", "MONITOR", "SENSOR", "SCANNER", "DETECTOR", "TRANSMITTER", "RECEIVER", "SIGNAL",
      "BEACON", "RADAR", "SONAR", "LIDAR", "TELESCOPE", "MICROSCOPE", "LABORATORY", "RESEARCH", "EXPERIMENT", "DISCOVERY",
      "EXPLORATION", "EXPEDITION", "MISSION", "VOYAGE", "JOURNEY", "TRAVEL", "TRANSPORT", "VEHICLE", "ENGINE", "THRUSTER"
    ],
    master: [
      // Advanced space words (5-8 letters)
      "SUPERNOVA", "QUASAR", "BLACKHOLE", "SPACETIME", "HYPERDRIVE", "STARSHIP", "TELESCOPE", "OBSERVATORY",
      "CONSTELLATION", "INTERSTELLAR", "INTERGALACTIC", "EXTRATERRESTRIAL", "EXOPLANET", "ASTRONAUT", "COSMONAUT",
      "SPACECRAFT", "MOTHERSHIP", "BATTLESHIP", "CRUISER", "DESTROYER", "FIGHTER", "INTERCEPTOR", "TRANSPORT",
      "TERRAFORMING", "COLONIZATION", "SETTLEMENT", "OUTPOST", "SPACEPORT", "LAUNCHPAD", "DOCKING", "AIRLOCK",
      "ATMOSPHERIC", "PRESSURIZED", "ARTIFICIAL", "SYNTHETIC", "CYBERNETIC", "BIOMECHANICAL", "NANOTECHNOLOGY",
      "BIOTECHNOLOGY", "GENETIC", "CLONING", "MUTATION", "EVOLUTION", "ADAPTATION", "SURVIVAL", "EXTINCTION",
      "CIVILIZATION", "INTELLIGENCE", "CONSCIOUSNESS", "TELEPATHY", "PSYCHIC", "PARANORMAL", "SUPERNATURAL",
      "DIMENSIONAL", "PARALLEL", "ALTERNATE", "MULTIVERSE", "TIMELINE", "TEMPORAL", "CHRONOLOGICAL", "SEQUENTIAL",
      "SYNCHRONOUS", "ASYNCHRONOUS", "SIMULTANEOUS", "INSTANTANEOUS", "ACCELERATION", "DECELERATION", "MOMENTUM"
    ],
    grandmaster: [
      // Expert space words (6+ letters)
      "EXTRATERRESTRIAL", "INTERSTELLAR", "INTERGALACTIC", "GRAVITATIONAL", "ELECTROMAGNETIC", "ASTROPHYSICS",
      "COSMOLOGY", "ASTRONOMY", "ASTROBIOLOGY", "XENOBIOLOGY", "EXOBIOLOGY", "PLANETOLOGY", "METEOROLOGY",
      "HELIOSEISMOLOGY", "SPECTROSCOPY", "PHOTOMETRY", "ASTROMETRY", "CHRONOMETRY", "INTERFEROMETRY",
      "RADIOTELESCOPY", "CRYOGENICS", "SUPERCONDUCTIVITY", "SUPERFLUIDITY", "THERMODYNAMICS", "ELECTRODYNAMICS",
      "QUANTUMMECHANICS", "RELATIVITY", "UNCERTAINTY", "ENTANGLEMENT", "SUPERPOSITION", "DECOHERENCE",
      "WAVEFUNCTION", "PROBABILITY", "DETERMINISM", "CAUSALITY", "SPACETIME", "CURVATURE", "SINGULARITY",
      "EVENTHORIZON", "SCHWARZSCHILD", "KERR", "REISSNER", "NORDSTROM", "PENROSE", "HAWKING", "EINSTEIN",
      "HEISENBERG", "SCHRODINGER", "PLANCK", "HUBBLE", "DOPPLER", "REDSHIFT", "BLUESHIFT", "PARALLAX",
      "LUMINOSITY", "MAGNITUDE", "BRIGHTNESS", "DISTANCE", "PARSEC", "LIGHTYEAR", "ASTRONOMICALUNIT"
    ]
  },

  "enchanted-realm": {
    apprentice: [
      // Fantasy basics (3-5 letters)
      "FAIRY", "TREE", "WOOD", "LEAF", "BIRD", "DEER", "FROG", "POND", "HILL", "PATH",
      "ROSE", "VINE", "MOSS", "HERB", "SEED", "ROOT", "STEM", "BLOOM", "PETAL", "THORN",
      "BERRY", "FRUIT", "NUT", "ACORN", "PINE", "OAK", "ELM", "ASH", "FIR", "YEW",
      "GLEN", "DELL", "VALE", "BROOK", "CREEK", "RIVER", "LAKE", "POOL", "SPRING", "WELL",
      "STONE", "ROCK", "CAVE", "GROTTO", "GROVE", "GLADE", "MEADOW", "FIELD", "PLAIN", "MOOR",
      // Common words
      "ACT", "AGE", "ALL", "ANT", "ARM", "ASK", "BAG", "BAR", "BAT", "BED",
      "BEE", "BIG", "BIT", "BOX", "BOY", "BUG", "BUN", "BUS", "CAB", "CAP",
      "CAR", "CAT", "COW", "CUP", "CUT", "DEN", "DOG", "DOT", "EAR", "EAT",
      "EGG", "END", "EYE", "FAN", "FAT", "FIG", "FIT", "FIX", "FLY", "FUN",
      "GAP", "GAS", "HAT", "HEN", "HOP", "HOT", "ICE", "INK", "JAR", "JAW",
      "JET", "JOY", "KEY", "KIT", "LAB", "LAP", "LEG", "LET", "LOG", "MAN",
      "SKY", "LIP", "HAM", "RAT", "GOD", "WIN", "DIP", "ADD", "HIT", "RUN"
    ],
    scholar: [
      // Medium fantasy words (4-6 letters)
      "FOREST", "UNICORN", "DRAGON", "CASTLE", "KNIGHT", "PRINCESS", "GARDEN", "FLOWER", "RAINBOW", "BUTTERFLY",
      "MUSHROOM", "CRYSTAL", "PHOENIX", "GRIFFIN", "PEGASUS", "CENTAUR", "NYMPH", "SPRITE", "PIXIE", "GOBLIN",
      "HOBBIT", "DWARF", "GIANT", "TROLL", "OGRE", "WITCH", "WARLOCK", "DRUID", "SHAMAN", "HEALER",
      "VILLAGE", "COTTAGE", "TOWER", "BRIDGE", "ARCHWAY", "GATEWAY", "PORTAL", "PASSAGE", "TUNNEL", "CAVERN",
      "WATERFALL", "RAPIDS", "WHIRLPOOL", "GEYSER", "HOTSPRING", "MINERAL", "GEMSTONE", "DIAMOND", "EMERALD", "RUBY",
      "SAPPHIRE", "TOPAZ", "AMETHYST", "QUARTZ", "GARNET", "PEARL", "CORAL", "AMBER", "JADE", "OPAL",
      "MOONBEAM", "SUNRAY", "STARLIGHT", "TWILIGHT", "DAWN", "DUSK", "AURORA", "COMET", "METEOR", "NEBULA",
      "ENCHANTED", "MAGICAL", "MYSTICAL", "ANCIENT", "SACRED", "BLESSED", "DIVINE", "PURE", "INNOCENT", "GENTLE",
      "PEACEFUL", "SERENE", "TRANQUIL", "HARMONIOUS", "MELODIOUS", "WHIMSICAL", "PLAYFUL", "JOYFUL", "CHEERFUL"
    ],
    master: [
      // Advanced fantasy words (5-8 letters)
      "ENCHANTED", "MYSTICAL", "WOODLAND", "TOADSTOOL", "DRAGONFLY", "FIREFLY", "WATERFALL", "MOONBEAM",
      "FAIRYLAND", "WONDERLAND", "DREAMLAND", "NEVERLAND", "PARADISE", "UTOPIA", "SANCTUARY", "HAVEN",
      "ELDERWOOD", "SILVERLEAF", "GOLDENBOUGH", "STARFLOWER", "MOONPETAL", "SUNBLOSSOM", "DEWDROP", "RAINDROP",
      "SPELLWEAVER", "DREAMCATCHER", "WISHMAKER", "STORYKEEPER", "TIMEKEEPER", "GATEKEEPER", "GUARDIAN", "PROTECTOR",
      "SHAPESHIFTER", "METAMORPH", "CHANGELING", "TRANSFORMER", "ILLUSIONIST", "ENCHANTER", "CHARMER", "BEWITCHER",
      "WHISPERING", "MURMURING", "BABBLING", "GURGLING", "RUSTLING", "FLUTTERING", "SHIMMERING", "GLIMMERING",
      "SPARKLING", "TWINKLING", "GLOWING", "RADIANT", "LUMINOUS", "BRILLIANT", "DAZZLING", "MAGNIFICENT",
      "EXTRAORDINARY", "PHENOMENAL", "MIRACULOUS", "WONDROUS", "MARVELOUS", "SPECTACULAR", "BREATHTAKING",
      "SPELLBINDING", "MESMERIZING", "CAPTIVATING", "ENTRANCING", "HYPNOTIC", "BEWITCHING", "ENCHANTING"
    ],
    grandmaster: [
      // Expert fantasy words (6+ letters)
      "ENCHANTMENT", "MAGNIFICENT", "EXTRAORDINARY", "SUPERNATURAL", "OTHERWORLDLY", "FANTASTICAL", "WHIMSICAL",
      "METAMORPHOSIS", "TRANSFORMATION", "TRANSFIGURATION", "TRANSMUTATION", "MANIFESTATION", "MATERIALIZATION",
      "CRYSTALLIZATION", "PETRIFICATION", "FOSSILIZATION", "MINERALIZATION", "CALCIFICATION", "OSSIFICATION",
      "BIOLUMINESCENCE", "PHOSPHORESCENCE", "FLUORESCENCE", "IRIDESCENCE", "OPALESCENCE", "INCANDESCENCE",
      "EFFERVESCENCE", "EVANESCENCE", "QUINTESSENCE", "LUMINESCENCE", "TRANSLUCENCE", "TRANSPARENCY",
      "KALEIDOSCOPIC", "PRISMATIC", "CHROMATIC", "POLYCHROMATIC", "MONOCHROMATIC", "ACHROMATIC", "DICHROMATIC",
      "AERODYNAMIC", "HYDRODYNAMIC", "THERMODYNAMIC", "ELECTROMAGNETIC", "PHOTOSYNTHETIC", "BIOLUMINESCENT",
      "PSYCHEDELIC", "HALLUCINOGENIC", "MINDALTERING", "CONSCIOUSNESSEXPANDING", "TRANSCENDENTAL", "METAPHYSICAL",
      "INCOMPREHENSIBLE", "UNFATHOMABLE", "INEXPLICABLE", "INDESCRIBABLE", "UNIMAGINABLE", "INCONCEIVABLE"
    ]
  }
};

// Constants
const rows = 8;
const cols = 8;

// Enhanced random letter generation with better distribution
const generateRandomLetter = (category, difficulty) => {
  const vowels = "AEIOU";
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  
  // Adjust vowel probability based on difficulty
  const vowelProbability = {
    apprentice: 0.4,
    scholar: 0.35,
    master: 0.3,
    grandmaster: 0.25
  };
  
  const prob = vowelProbability[difficulty] || 0.35;
  
  if (Math.random() < prob) {
    return vowels[Math.floor(Math.random() * vowels.length)];
  } else {
    return consonants[Math.floor(Math.random() * consonants.length)];
  }
};

// Enhanced score calculation with more factors
const calculateStars = (score, targetScore, timeLeft, initialTime, wordsFound, difficulty) => {
  const scoreRatio = Math.min(score / targetScore, 1.5); // Allow bonus for exceeding target
  const timeRatio = timeLeft / initialTime;
  const wordBonus = Math.min(wordsFound / 10, 0.5); // Bonus for finding many words
  
  // Difficulty multiplier for star requirements
  const difficultyMultiplier = {
    apprentice: 1.0,
    scholar: 0.9,
    master: 0.8,
    grandmaster: 0.7
  };
  
  const multiplier = difficultyMultiplier[difficulty] || 1.0;
  const performanceScore = (scoreRatio * 0.6 + timeRatio * 0.3 + wordBonus * 0.1) * multiplier;
  
  if (performanceScore >= 0.9) return 3;
  if (performanceScore >= 0.7) return 2;
  return 1;
};

// Enhanced scoring system
const calculateWordScore = (word, difficulty, timeBonus = 0) => {
  const baseScore = word.length * 10;
  const difficultyMultiplier = {
    apprentice: 1.0,
    scholar: 1.2,
    master: 1.5,
    grandmaster: 2.0
  };
  
  const lengthBonus = word.length >= 6 ? word.length * 5 : 0;
  const multiplier = difficultyMultiplier[difficulty] || 1.0;
  
  return Math.floor((baseScore + lengthBonus + timeBonus) * multiplier);
};

export default function Gameplay() {
  const { levelId, category, difficulty } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const currentLevel = parseInt(levelId, 10) || 1;

  // Enhanced time modifiers with level scaling
  const timeModifiers = {
    apprentice: 150 - (currentLevel - 1) * 10,
    scholar: 120 - (currentLevel - 1) * 10,
    master: 90 - (currentLevel - 1) * 10,
    grandmaster: 60 - (currentLevel - 1) * 10,
  };

  const initialTime = Math.max(timeModifiers[difficulty] || 90, 30); // Minimum 30 seconds

  // Enhanced target score calculation
  const baseTargetScore = {
    apprentice: 150,
    scholar: 200,
    master: 300,
    grandmaster: 450
  };
  
  const targetScore = (baseTargetScore[difficulty] || 200) + (currentLevel - 1) * 75;

  // Get word list for current category and difficulty
  const currentWordList = useMemo(() => {
    return wordLists[category]?.[difficulty] || wordLists["mystic-library"]["apprentice"];
  }, [category, difficulty]);

  // Enhanced letter requirements based on difficulty
  const letterRequirements = {
    apprentice: { min: 3, max: 5 },
    scholar: { min: 3, max: 6 },
    master: { min: 4, max: 7 },
    grandmaster: { min: 4, max: 8 }
  };

  const currentRequirements = letterRequirements[difficulty] || letterRequirements.apprentice;

  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFailed, setIsModalFailed] = useState(false);
  const [isVictoryModal, setIsVictoryModal] = useState(false);
  const [submittedWords, setSubmittedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showNotification, setShowNotification] = useState(true);
  const [starsEarned, setStarsEarned] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [lastWordScore, setLastWordScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [consecutiveWords, setConsecutiveWords] = useState(0);
  const [bestWord, setBestWord] = useState({ word: "", score: 0 });

  const progress = Math.min((score / targetScore) * 100, 100);
  const backgroundImg = categoryBackgrounds[category] || mysticLibraryImg;

  // Initialize grid with better letter distribution
  const initializeGrid = useCallback(() => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => generateRandomLetter(category, difficulty))
    );
  }, [category, difficulty]);

  // Enhanced tile selection logic
  const handleClick = (r, c) => {
  if (gameStatus !== "playing" || isPaused) return;
  
  const isAlreadySelected = selected.some(tile => tile.r === r && tile.c === c);
  if (isAlreadySelected) {
    // Remove this tile and all tiles selected after it
    const tileIndex = selected.findIndex(tile => tile.r === r && tile.c === c);
    setSelected(selected.slice(0, tileIndex));
    playTileDeselect(); // Add this for deselecting tiles
    return;
  }

  if (selected.length >= currentRequirements.max) {
    setIsModalOpen(true);
    playWordError();
    return;
  }

  // Check adjacency logic...
  if (selected.length > 0) {
    const lastTile = selected[selected.length - 1];
    const isAdjacent = Math.abs(r - lastTile.r) <= 1 && Math.abs(c - lastTile.c) <= 1;
    if (!isAdjacent) {
      if (difficulty === "grandmaster") {
        playWordError();
        return;
      }
    }
  }

  // SUCCESS - Tile selected!
  playTileClick(); // Sound for selecting tiles
  setSelected([...selected, { r, c }]);
};

  // Enhanced word submission with better feedback
  const submitWord = useCallback(() => {
    if (gameStatus !== "playing" || selected.length === 0) return;

    const word = selected.map((tile) => grid[tile.r][tile.c]).join("");

    if (word.length < currentRequirements.min) {
      playWordError();
      setIsModalOpen(true);
      return;
    }

    if (submittedWords.includes(word)) {
      playWordError();
      setIsModalOpen(true);
      return;
    }

    if (!currentWordList.includes(word)) {
      playWordError();
      setIsModalOpen(true);
      setConsecutiveWords(0); // Reset combo on invalid word
      return;
    }

    // SUCCESS - Word is valid!
    playWordSubmit();

    // Calculate enhanced score with bonuses
    const timeBonus = timeLeft > initialTime * 0.8 ? 20 : timeLeft > initialTime * 0.5 ? 10 : 0;
    const comboBonus = consecutiveWords * 5;
    const wordScore = calculateWordScore(word, difficulty, timeBonus + comboBonus);
    
    setLastWordScore(wordScore);
    setShowScoreAnimation(true);
    setTimeout(() => setShowScoreAnimation(false), 1500);

    const newScore = score + wordScore;
    setScore(newScore);
    setConsecutiveWords(prev => prev + 1);
    setComboCount(prev => prev + 1);
    
    // Track best word
    if (wordScore > bestWord.score) {
      setBestWord({ word, score: wordScore });
    }
    
    // Add time bonus for good words
    const timeAddition = Math.min(word.length, 6);
    setTimeLeft((prev) => Math.min(prev + timeAddition, initialTime * 1.2)); // Cap at 120% of initial time

    // Enhanced grid manipulation
    const newGrid = [...grid.map((row) => [...row])];
    selected.forEach(({ r, c }) => (newGrid[r][c] = null));
    dropTiles(newGrid);

    setSubmittedWords([...submittedWords, word]);
    setSelected([]);

    // Check win condition
    if (newScore >= targetScore) {
      handleVictory(newScore);
    }

    // Play success sound effect
    playSFX("playWordSubmit");
  }, [selected, grid, submittedWords, currentWordList, score, targetScore, difficulty, timeLeft, initialTime, consecutiveWords, bestWord.score, currentRequirements.min, gameStatus]);

  // Enhanced victory handling
  const handleVictory = useCallback((finalScore) => {
    setGameStatus("completed");
    setFinalScore(finalScore);
    
    const stars = calculateStars(finalScore, targetScore, timeLeft, initialTime, submittedWords.length, difficulty);
    setStarsEarned(stars);
    
    saveGameProgress(stars, finalScore);
    setIsVictoryModal(true);
    
    // Play victory sound
     playVictoryByStars(stars);
  }, [targetScore, timeLeft, initialTime, submittedWords.length, difficulty]);

  // Enhanced save system with consistent keys
  const saveGameProgress = useCallback((stars, score) => {
    try {
      // Use consistent key format matching Levels.jsx
      const levelKey = `level_${category}_${difficulty}_${currentLevel}`;
      const levelData = {
        completed: true,
        stars: stars,
        starsEarned: stars, // Backup property
        score: score,
        timestamp: Date.now(),
        wordsFound: submittedWords.length,
        bestWord: bestWord.word,
        timeRemaining: timeLeft
      };
      
      localStorage.setItem(levelKey, JSON.stringify(levelData));
      console.log(`Saved level data to key: ${levelKey}`, levelData);
      
      // Also save with alternative key format for backward compatibility
      const altLevelKey = `${category}_${difficulty}_level_${currentLevel}`;
      localStorage.setItem(altLevelKey, JSON.stringify(levelData));
      
      // Update category score
      const categoryScoreKey = `playerScore_${category}`;
      const currentCategoryScore = parseInt(localStorage.getItem(categoryScoreKey) || "0", 10);
      const newCategoryScore = currentCategoryScore + score;
      localStorage.setItem(categoryScoreKey, newCategoryScore.toString());
      
      // Update global score
      const globalScore = parseInt(localStorage.getItem("playerScore") || "0", 10);
      localStorage.setItem("playerScore", (globalScore + score).toString());
      
      console.log(`Progress saved: Level ${currentLevel} completed with ${stars} stars, score: ${score}`);
    } catch (error) {
      console.error("Error saving game progress:", error);
    }
  }, [category, difficulty, currentLevel, submittedWords.length, bestWord.word, timeLeft]);

  // Enhanced tile dropping with animation potential
  const dropTiles = useCallback((newGrid) => {
    // First, drop existing tiles
    for (let c = 0; c < cols; c++) {
      for (let r = rows - 1; r >= 0; r--) {
        if (newGrid[r][c] === null) {
          for (let above = r - 1; above >= 0; above--) {
            if (newGrid[above][c] !== null) {
              newGrid[r][c] = newGrid[above][c];
              newGrid[above][c] = null;
              break;
            }
          }
        }
      }
      
      // Fill empty spaces with new letters
      for (let r = 0; r < rows; r++) {
        if (newGrid[r][c] === null) {
          newGrid[r][c] = generateRandomLetter(category, difficulty);
        }
      }
    }
    setGrid(newGrid);
  }, [category, difficulty]);

  // Enhanced clear functions
  const clearLastLetter = useCallback(() => {
    if (selected.length > 0) {
      setSelected(selected.slice(0, selected.length - 1));
    }
  }, [selected]);

  const clearSelection = useCallback(() => setSelected([]), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  // Enhanced timer with game state management
  useEffect(() => {
    if (!isPaused && timeLeft > 0 && gameStatus === "playing") {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("failed");
            setIsModalFailed(true);
            playTimesUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isPaused, timeLeft, gameStatus]);

  // Enhanced restart function
  const handleRestart = useCallback(() => {
    setGrid(initializeGrid());
    setTimeLeft(initialTime);
    setGameStatus("playing");
    setIsModalOpen(false);
    setIsModalFailed(false);
    setIsVictoryModal(false);
    setScore(0);
    setSelected([]);
    setSubmittedWords([]);
    setIsPaused(false);
    setStarsEarned(0);
    setFinalScore(0);
    setComboCount(0);
    setConsecutiveWords(0);
    setBestWord({ word: "", score: 0 });
    setLastWordScore(0);
  }, [initializeGrid, initialTime]);

  // Initialize game on level change
  useEffect(() => {
    handleRestart();
  }, [levelId, handleRestart]);

  // Navigation functions
  const handleExit = useCallback(() => navigate("/"), [navigate]);
  
  const handleNextLevel = useCallback(() => {
    if (currentLevel < 3) {
      navigate(`/play/${category}/${difficulty}/level/${currentLevel + 1}`);
    } else {
      navigate(`/play/${category}/${difficulty}`);
    }
  }, [currentLevel, category, difficulty, navigate]);

  const handleBackToLevels = useCallback(() => {
    navigate(`/play/${category}/${difficulty}`);
  }, [category, difficulty, navigate]);

  // Hide notification after delay
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Enhanced Score Animation Component
  const ScoreAnimation = () => (
    <AnimatePresence>
      {showScoreAnimation && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0], y: -100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-2xl">
            +{lastWordScore}
            {consecutiveWords > 1 && (
              <span className="text-sm ml-2">🔥x{consecutiveWords}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Enhanced Victory Modal Component
  const VictoryModal = () => (
    <AnimatePresence>
      {isVictoryModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full mx-4 overflow-hidden"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/90 via-yellow-500/90 to-orange-500/90" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <Trophy size={80} className="mx-auto text-yellow-100 drop-shadow-lg" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-white mb-2 drop-shadow-lg font-cinzel"
              >
                {t('victory')}!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-yellow-100 mb-6 drop-shadow"
              >
                {t('levelComplete', { level: currentLevel })}!
              </motion.p>

              {/* Enhanced Stats Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <Target className="mx-auto mb-1 text-white" size={24} />
                  <p className="text-yellow-100 text-sm">Final Score</p>
                  <p className="text-2xl font-bold text-white">{finalScore}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <Zap className="mx-auto mb-1 text-white" size={24} />
                  <p className="text-yellow-100 text-sm">Words Found</p>
                  <p className="text-2xl font-bold text-white">{submittedWords.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <Clock className="mx-auto mb-1 text-white" size={24} />
                  <p className="text-yellow-100 text-sm">{t('timeLeft')}</p>
                  <p className="text-2xl font-bold text-white">{timeLeft}s</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <Award className="mx-auto mb-1 text-white" size={24} />
                  <p className="text-yellow-100 text-sm">{t('bestWord')}</p>
                  <p className="text-lg font-bold text-white">{bestWord.word || "N/A"}</p>
                </div>
              </motion.div>

              {/* Stars Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-2 mb-6"
              >
                {[1, 2, 3].map((star, index) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.9 + (index * 0.1),
                      type: "spring",
                      stiffness: 300 
                    }}
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= starsEarned
                          ? "text-yellow-200"
                          : "text-yellow-600/50"
                      } drop-shadow-lg`}
                      fill={star <= starsEarned ? "#fef3c7" : "none"}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex gap-3 justify-center flex-wrap"
              >
                {currentLevel < 3 ? (
                  <button
                    onClick={handleNextLevel}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <ArrowRight size={20} />
                    {t('nextLevel')}
                  </button>
                ) : (
                  <button
                    onClick={handleBackToLevels}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Star size={20} />
                    {t('moreLevels')}
                  </button>
                )}

                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RotateCcw size={20} />
                  {t('replay')}
                </button>

                <button
                  onClick={handleExit}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Home size={20} />
                  {t('home')}
                </button>
              </motion.div>
            </div>

            {/* Enhanced Floating Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-200 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -150, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360, 720],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-row items-stretch bg-[#222] text-white min-h-screen w-screen overflow-hidden ${isPaused ? "filter blur-md" : ""}`}
      >
        {/* Enhanced Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-[#1b1b1b] to-[#0f0f0f] text-white flex flex-col justify-between p-4 shadow-2xl border-r-2 border-gray-700">
          <div className="flex flex-col gap-4 items-center">
            {/* Enhanced Title */}
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-extrabold text-white font-serif"
              style={{
                fontFamily: "Cinzel, serif",
                textShadow: `-3px -3px 0 #B22222, 3px -3px 0 #B22222, -3px 3px 0 #B22222, 3px 3px 0 #B22222`
              }}
            >
              SPELLBOUND
            </motion.h1>

            {/* Enhanced Score Display */}
            <motion.div 
              className="w-full border-2 border-gradient-to-r from-yellow-400 to-orange-500 py-3 text-center text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg"
              animate={{ 
                scale: showScoreAnimation ? [1, 1.1, 1] : 1,
                boxShadow: showScoreAnimation ? 
                  ["0 0 0 0 rgba(251, 191, 36, 0.7)", "0 0 0 10px rgba(251, 191, 36, 0)", "0 0 0 0 rgba(251, 191, 36, 0)"] : 
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.6 }}
            >
              {score.toLocaleString()}
              {consecutiveWords > 1 && (
                <div className="text-sm text-yellow-400 flex items-center justify-center gap-1">
                  <span>🔥</span>
                  <span>Combo x{consecutiveWords}</span>
                </div>
              )}
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="w-full">
              <div className="text-center text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                <span>{t('progressToVictory')}</span>
                <span className="text-yellow-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-5 shadow-inner border border-gray-600">
                <motion.div
                  className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 h-5 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                  animate={{ width: `${progress}%` }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
              </div>
              <div className="text-center text-xs mt-1 text-gray-400">
                {score.toLocaleString()} / {targetScore.toLocaleString()}
              </div>
            </div>

            {/* Enhanced Timer */}
            <div className="w-full text-center mt-4">
              <div className="text-2xl font-bold text-white mb-2">
                {t('timeLeft')}: 
                <motion.span 
                  className={`ml-2 ${timeLeft <= 20 ? 'text-red-500' : timeLeft <= 40 ? 'text-orange-500' : 'text-green-500'}`}
                  animate={timeLeft <= 10 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                >
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </motion.span>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded-full border border-gray-600 overflow-hidden">
                <motion.div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    timeLeft <= 20 ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                    timeLeft <= 40 ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 
                    'bg-gradient-to-r from-green-600 to-green-400'
                  }`}
                  style={{ width: `${(timeLeft / initialTime) * 100}%` }}
                  animate={{ 
                    width: `${(timeLeft / initialTime) * 100}%`,
                    boxShadow: timeLeft <= 10 ? 
                      ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 4px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"] : 
                      "none"
                  }}
                  transition={{ duration: timeLeft <= 10 ? 1 : 0.3, repeat: timeLeft <= 10 ? Infinity : 0 }}
                />
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex space-x-3 w-full">
              <motion.button
                onClick={submitWord}
                disabled={selected.length < currentRequirements.min}
                whileHover={{ scale: selected.length >= currentRequirements.min ? 1.05 : 1 }}
                whileTap={{ scale: selected.length >= currentRequirements.min ? 0.95 : 1 }}
                className="flex-1 border-2 border-green-600 py-3 font-bold text-white bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg shadow-lg text-lg"
              >
                {t('submit')}
                {selected.length > 0 && (
                  <span className="block text-sm mt-1">
                    {selected.length}/{currentRequirements.max} letters
                  </span>
                )}
              </motion.button>

              <motion.button
                onClick={clearLastLetter}
                disabled={selected.length === 0}
                whileHover={{ scale: selected.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selected.length > 0 ? 0.95 : 1 }}
                className="flex-1 border-2 border-orange-600 py-3 font-bold text-white bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 disabled:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg shadow-lg text-lg"
              >
                {t('undo')}
              </motion.button>
            </div>

            {/* Enhanced Stats Panel */}
            <div className="w-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-500/30">
              <h3 className="text-lg font-bold text-center mb-3 text-blue-300">{t('gameStats')}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold">{submittedWords.length}</div>
                  <div className="text-gray-300">{t('wordsFound')}</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">{bestWord.word || "None"}</div>
                   <div className="text-gray-300">{t('bestWord')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mission Panel */}
          <div className="mt-4 bg-gradient-to-br from-red-900/90 to-red-800/90 text-white p-4 rounded-xl shadow-xl border-2 border-red-600/50">
            <p className="text-xl font-bold mb-4 text-center text-yellow-300">{t('mission')}</p>
            <div className="space-y-2 text-center">
              <p className="text-lg">
                {t('formWordsWith')} 
                <span className="text-yellow-300 font-bold mx-1">
                  {currentRequirements.min}-{currentRequirements.max}
                </span>
                letters
              </p>
              <div className="text-sm text-gray-300 space-y-1">
                <div>{t('level')} {currentLevel} • {t(`difficulty${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`) || difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
                <div>{t('category')}: {t(category) || category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Control Buttons */}
          <div className="flex justify-around items-center mt-6">
            <motion.button 
              onClick={handlePause} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl shadow-lg text-white hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
            >
              ⏸
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 rounded-xl shadow-lg text-white hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
            >
              🔊
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-xl shadow-lg text-white hover:from-green-500 hover:to-green-400 transition-all duration-300"
            >
              ❓
            </motion.button>
          </div>
        </div>

        {/* Enhanced Main Grid Section */}
        <div className="w-2/3 flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 relative">
          {/* Score Animation */}
          <ScoreAnimation />

          {/* Enhanced Selected Word Display */}
          <motion.div 
            className="flex flex-col items-center mb-6 w-full"
            animate={{ scale: selected.length > 0 ? 1.02 : 1 }}
          >
            <div className="w-full max-w-2xl flex justify-center items-center bg-gradient-to-r from-[#D4AF75] to-[#B8941F] p-4 rounded-xl shadow-2xl border-2 border-[#8B6914]">
              <h2 className="text-xl font-semibold text-black text-center">
                <strong>{t('selectedWord')}: </strong>
                {selected.length === 0 ? (
                  <span className="text-gray-600">{t('noWordSelected')}</span>
                ) : (
                  <motion.span
                    key={selected.map((tile) => grid[tile.r][tile.c]).join("")}
                    initial={{ scale: 1.2, color: "#059669" }}
                    animate={{ scale: 1, color: "#000000" }}
                    className="font-bold tracking-wider"
                  >
                    {selected.map((tile) => grid[tile.r][tile.c]).join("")}
                  </motion.span>
                )}
                {selected.length > 0 && (
                  <span className="text-sm ml-2 text-gray-700">
                    ({selected.length} letters)
                  </span>
                )}
              </h2>
            </div>
          </motion.div>

          {/* Enhanced Submitted Words Display */}
          <motion.div className="flex flex-col items-center mb-6 w-full">
            <div className="w-full max-w-2xl flex justify-center items-center bg-gradient-to-r from-[#D4AF75] to-[#B8941F] p-4 rounded-xl shadow-2xl border-2 border-[#8B6914] min-h-[60px]">
              <div className="text-center w-full">
                <h2 className="text-lg font-semibold text-black mb-2">
                  <strong>{t('foundWords')} ({submittedWords.length}):</strong>
                </h2>
                {submittedWords.length === 0 ? (
                  <span className="text-gray-600">{t('noWordsFoundYet')}</span>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2 max-h-16 overflow-y-auto">
                    {submittedWords.slice(-8).map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {submittedWords.length > 8 && (
                      <span className="text-gray-600 text-sm">
                        +{submittedWords.length - 8} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Grid */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-8 gap-2 bg-gradient-to-br from-[#8B6F47] to-[#5D4B3A] p-4 rounded-2xl shadow-2xl border-4 border-[#5D4B3A]"
            style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)" }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const isSelected = selected.some(tile => tile.r === r && tile.c === c);
                const selectionIndex = selected.findIndex(tile => tile.r === r && tile.c === c);
                
                return (
                  <motion.div
                    key={`${r}-${c}-${letter}`}
                    onClick={() => handleClick(r, c)}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: isSelected ? 0 : 5,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isSelected ? 1.15 : 1,
                      rotate: isSelected ? [0, 5, -5, 0] : 0,
                      borderWidth: isSelected ? "3px" : "2px"
                    }}
                    transition={{ 
                      duration: 0.2,
                      rotate: { duration: 0.3, repeat: isSelected ? Infinity : 0, repeatType: "reverse" }
                    }}
                    className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl shadow-lg cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-600 z-10' 
                        : 'bg-gradient-to-br from-[#D4AF75] to-[#B8941F] border-[#A87C4F] hover:from-yellow-200 hover:to-yellow-300'
                    }`}
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      color: "#000",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      backgroundImage: isSelected ? 'none' : `url(${tileTexture})`,
                      backgroundSize: "cover",
                      backgroundBlendMode: "overlay"
                    }}
                  >
                    {letter}
                    
                    {/* Selection order indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                      >
                        {selectionIndex + 1}
                      </motion.div>
                    )}
                    
                    {/* Glow effect for selected tiles */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(251, 191, 36, 0.7)",
                            "0 0 0 8px rgba(251, 191, 36, 0)",
                            "0 0 0 0 rgba(251, 191, 36, 0.7)"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Word Length Indicator */}
          <motion.div 
            className="mt-4 text-center"
            animate={{ opacity: selected.length > 0 ? 1 : 0.6 }}
          >
            <div className="text-white text-lg">
              {t('wordLength')}: {selected.length} / {currentRequirements.max}
            </div>
            <div className="flex justify-center mt-2 gap-1">
              {Array.from({ length: currentRequirements.max }, (_, i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < selected.length ? 'bg-yellow-400' : 
                    i < currentRequirements.min ? 'bg-red-400' : 'bg-gray-600'
                  }`}
                  animate={{ scale: i === selected.length - 1 ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {t('minimum')}: {currentRequirements.min} {t('letters')}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Modals */}
      <VictoryModal />
      <PauseMenu isPaused={isPaused} onResume={handleResume} onRestart={handleRestart} onExit={handleExit} />

      {/* Enhanced Invalid Word Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4"
            >
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">{t('invalidWord')}!</h2>
              <div className="text-gray-700 space-y-2">
                <p>{t('makeSureYourWord')}:</p>
                <ul className="text-left space-y-1">
                  <li>• {t('hasLetters', { min: currentRequirements.min, max: currentRequirements.max })}</li>
                  <li>• {t('isValidWord')}</li>
                  <li>• {t('hasntBeenUsed')}</li>
                  <li>• {t('existsInDictionary', { category: category.replace('-', ' ') })}</li>
                </ul>
              </div>
              <motion.button 
                onClick={closeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-bold shadow-lg"
              >
                {t('tryAgain')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Game Over Modal */}
      <AnimatePresence>
        {isModalFailed && gameStatus === "failed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              className="bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 text-white"
            >
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold mb-4">{t('timesUp')}!</h2>
              <div className="space-y-3 mb-6">
                <p className="text-xl">{t('finalScore')}: <span className="font-bold text-yellow-300">{score.toLocaleString()}</span></p>
                <p>{t('wordsFound')}: <span className="font-bold">{submittedWords.length}</span></p>
                <p>{t('target')}: <span className="font-bold">{targetScore.toLocaleString()}</span></p>
              </div>
              <div className="flex gap-4 justify-center">
                <motion.button 
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-bold shadow-lg"
                >
                  {t('tryAgain')}
                </motion.button>
                <motion.button 
                  onClick={handleExit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-bold shadow-lg"
                >
                  Exit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl shadow-2xl z-40 border border-white/20"
          >
            <div className="text-center">
              <div className="text-lg font-bold mb-1">📝 {t('wordRequirements')}</div>
              <div className="text-sm">
                {t('createWordsInstruction', { 
                  min: currentRequirements.min, 
                  max: currentRequirements.max, 
                  category: category.replace('-', ' ') 
                })}!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}