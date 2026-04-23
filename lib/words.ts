import type { Word } from "./types";

export const WORDS: Word[] = [
  // EASY
  { id: "apple", answer: "APPLE", difficulty: "easy", clues: ["A common fruit", "Keeps the doctor away", "Often red or green"] },
  { id: "dog", answer: "DOG", difficulty: "easy", clues: ["A four-legged pet", "Best friend of humans", "Says woof"] },
  { id: "sun", answer: "SUN", difficulty: "easy", clues: ["A bright object", "Rises in the east", "Center of our solar system"] },
  { id: "book", answer: "BOOK", difficulty: "easy", clues: ["You can read it", "Has pages", "Found in libraries"] },
  { id: "rain", answer: "RAIN", difficulty: "easy", clues: ["Falls from the sky", "Makes things wet", "Comes from clouds"] },
  { id: "cat", answer: "CAT", difficulty: "easy", clues: ["A common pet", "Says meow", "Loves to nap"] },
  { id: "tree", answer: "TREE", difficulty: "easy", clues: ["Has leaves and bark", "Grows in forests", "Provides shade"] },
  { id: "car", answer: "CAR", difficulty: "easy", clues: ["A common vehicle", "Has four wheels", "Runs on fuel or electricity"] },
  { id: "milk", answer: "MILK", difficulty: "easy", clues: ["A white liquid", "Comes from cows", "Goes well with cereal"] },
  { id: "moon", answer: "MOON", difficulty: "easy", clues: ["Seen at night", "Has phases", "Earth's natural satellite"] },
  { id: "fish", answer: "FISH", difficulty: "easy", clues: ["Lives in water", "Has fins", "Often eaten on Fridays"] },
  { id: "bird", answer: "BIRD", difficulty: "easy", clues: ["Has feathers", "Most can fly", "Lays eggs"] },
  { id: "house", answer: "HOUSE", difficulty: "easy", clues: ["A place to live", "Has rooms", "Has a roof"] },
  { id: "shoe", answer: "SHOE", difficulty: "easy", clues: ["You wear it", "Comes in pairs", "Protects your feet"] },
  { id: "ball", answer: "BALL", difficulty: "easy", clues: ["A round object", "Used in many sports", "Bounces"] },
  { id: "phone", answer: "PHONE", difficulty: "easy", clues: ["A device for talking", "Often kept in a pocket", "Rings when called"] },
  { id: "chair", answer: "CHAIR", difficulty: "easy", clues: ["You sit on it", "Usually has four legs", "Found around tables"] },
  { id: "key", answer: "KEY", difficulty: "easy", clues: ["Opens a lock", "Made of metal", "Often kept on a ring"] },
  { id: "snow", answer: "SNOW", difficulty: "easy", clues: ["Falls from the sky", "White and cold", "Comes in winter"] },
  { id: "fire", answer: "FIRE", difficulty: "easy", clues: ["Hot and bright", "Can be dangerous", "Used for cooking"] },

  // MEDIUM
  { id: "guitar", answer: "GUITAR", difficulty: "medium", clues: ["A musical instrument", "Has six strings", "Often used in rock music"] },
  { id: "rocket", answer: "ROCKET", difficulty: "medium", clues: ["Travels at high speed", "Goes to space", "Built by NASA and SpaceX"] },
  { id: "pirate", answer: "PIRATE", difficulty: "medium", clues: ["Sails the seas", "Often has a parrot", "Buries treasure"] },
  { id: "castle", answer: "CASTLE", difficulty: "medium", clues: ["A large stone building", "Has walls and towers", "Where kings once lived"] },
  { id: "dragon", answer: "DRAGON", difficulty: "medium", clues: ["A mythical creature", "Breathes fire", "Often guards treasure"] },
  { id: "ocean", answer: "OCEAN", difficulty: "medium", clues: ["A vast body of water", "Salty", "Covers most of Earth"] },
  { id: "pizza", answer: "PIZZA", difficulty: "medium", clues: ["A popular food", "Round with toppings", "Originated in Italy"] },
  { id: "coffee", answer: "COFFEE", difficulty: "medium", clues: ["A morning drink", "Made from beans", "Contains caffeine"] },
  { id: "winter", answer: "WINTER", difficulty: "medium", clues: ["A cold season", "Comes after autumn", "Brings snow"] },
  { id: "doctor", answer: "DOCTOR", difficulty: "medium", clues: ["Helps sick people", "Wears a white coat", "Studied medicine"] },
  { id: "camera", answer: "CAMERA", difficulty: "medium", clues: ["Captures images", "Has a lens", "Used by photographers"] },
  { id: "robot", answer: "ROBOT", difficulty: "medium", clues: ["A machine that moves", "Often programmable", "Featured in science fiction"] },
  { id: "ninja", answer: "NINJA", difficulty: "medium", clues: ["A stealthy warrior", "Wears black", "From feudal Japan"] },
  { id: "bridge", answer: "BRIDGE", difficulty: "medium", clues: ["Crosses a gap", "Made of steel or stone", "Used by cars or people"] },
  { id: "magnet", answer: "MAGNET", difficulty: "medium", clues: ["Attracts metal", "Has two poles", "Sticks to fridges"] },
  { id: "violin", answer: "VIOLIN", difficulty: "medium", clues: ["A stringed instrument", "Played with a bow", "Smaller than a cello"] },
  { id: "tiger", answer: "TIGER", difficulty: "medium", clues: ["A big cat", "Has stripes", "Lives in Asia"] },
  { id: "engine", answer: "ENGINE", difficulty: "medium", clues: ["Powers a vehicle", "Burns fuel or runs on electricity", "Has many moving parts"] },

  // HARD
  { id: "compass", answer: "COMPASS", difficulty: "hard", clues: ["A navigation tool", "Has a magnetic needle", "Always points north"] },
  { id: "echo", answer: "ECHO", difficulty: "hard", clues: ["A reflected sound", "Heard in caves", "A repetition of yourself"] },
  { id: "phoenix", answer: "PHOENIX", difficulty: "hard", clues: ["A mythical bird", "Reborn from ashes", "Also a city in Arizona"] },
  { id: "labyrinth", answer: "LABYRINTH", difficulty: "hard", clues: ["A complex maze", "Easy to get lost in", "Famous one held a Minotaur"] },
  { id: "telescope", answer: "TELESCOPE", difficulty: "hard", clues: ["Makes things look closer", "Used to see stars", "Galileo improved it"] },
  { id: "volcano", answer: "VOLCANO", difficulty: "hard", clues: ["A mountain that erupts", "Spews lava", "Pompeii was destroyed by one"] },
  { id: "pyramid", answer: "PYRAMID", difficulty: "hard", clues: ["A four-sided structure", "Found in Egypt", "Built as a tomb"] },
  { id: "vampire", answer: "VAMPIRE", difficulty: "hard", clues: ["A nocturnal creature", "Drinks blood", "Afraid of garlic"] },
  { id: "mirror", answer: "MIRROR", difficulty: "hard", clues: ["Shows your reflection", "Made of glass", "Said to bring bad luck if broken"] },
  { id: "thunder", answer: "THUNDER", difficulty: "hard", clues: ["A loud sound", "Follows lightning", "Heard during storms"] },
  { id: "diamond", answer: "DIAMOND", difficulty: "hard", clues: ["A precious gemstone", "The hardest natural material", "Often set in rings"] },
  { id: "octopus", answer: "OCTOPUS", difficulty: "hard", clues: ["A sea creature", "Has eight arms", "Can change color"] },
  { id: "harvest", answer: "HARVEST", difficulty: "hard", clues: ["The reaping of crops", "Happens in autumn", "A celebration of the season"] },
  { id: "shadow", answer: "SHADOW", difficulty: "hard", clues: ["Cast by light", "Follows you around", "Longer at sunrise and sunset"] },
  { id: "anchor", answer: "ANCHOR", difficulty: "hard", clues: ["Holds a ship in place", "Heavy and metal", "Dropped to the sea floor"] },
  { id: "wizard", answer: "WIZARD", difficulty: "hard", clues: ["Practices magic", "Often has a long beard", "Wears robes and a pointed hat"] },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRoundWords(count: number): Word[] {
  const easy = shuffle(WORDS.filter((w) => w.difficulty === "easy"));
  const med = shuffle(WORDS.filter((w) => w.difficulty === "medium"));
  const hard = shuffle(WORDS.filter((w) => w.difficulty === "hard"));
  // 4 easy, 4 medium, 2 hard for a 10-round game
  const easyCount = Math.round(count * 0.4);
  const medCount = Math.round(count * 0.4);
  const hardCount = count - easyCount - medCount;
  return shuffle([
    ...easy.slice(0, easyCount),
    ...med.slice(0, medCount),
    ...hard.slice(0, hardCount),
  ]);
}
