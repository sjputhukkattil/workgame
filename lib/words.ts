import type { Word } from "./types";

// Clue order convention: [0] cryptic/clever, [1] medium nudge, [2] obvious giveaway.
// Answers are always common English words. Clues do the work, not the vocabulary.
export const WORDS: Word[] = [
  // EASY
  { id: "apple", answer: "APPLE", difficulty: "easy", clues: ["Newton's gravity tutor", "Doctor repellent if eaten daily", "Crisp red or green fruit"] },
  { id: "dog", answer: "DOG", difficulty: "easy", clues: ["God, but mirrored", "Pavlov's drooling subject", "Says woof, fetches sticks"] },
  { id: "sun", answer: "SUN", difficulty: "easy", clues: ["8 minutes of light away", "Rises in the east", "Bright yellow star, daytime"] },
  { id: "book", answer: "BOOK", difficulty: "easy", clues: ["Has a spine but no bones", "You read it page by page", "Bound paper with chapters"] },
  { id: "rain", answer: "RAIN", difficulty: "easy", clues: ["Sky's leak", "Cats and dogs, allegedly", "Wet drops from clouds"] },
  { id: "cat", answer: "CAT", difficulty: "easy", clues: ["Schrödinger's iconic pet", "Says meow, knocks cups off tables", "Furry pet, hates baths"] },
  { id: "tree", answer: "TREE", difficulty: "easy", clues: ["Has rings but no fingers", "Where leaves call home", "Plant with trunk and branches"] },
  { id: "car", answer: "CAR", difficulty: "easy", clues: ["Henry Ford's assembly hit", "Four wheels, one driver", "Vehicle you drive on roads"] },
  { id: "milk", answer: "MILK", difficulty: "easy", clues: ["Cow's daily contribution", "Pours white, goes with cookies", "White drink from cows"] },
  { id: "moon", answer: "MOON", difficulty: "easy", clues: ["Apollo 11's target", "Waxes and wanes", "Bright orb seen at night"] },
  { id: "fish", answer: "FISH", difficulty: "easy", clues: ["Breathes water, can't blink", "Pisces' symbol", "Swims with fins, has scales"] },
  { id: "bird", answer: "BIRD", difficulty: "easy", clues: ["Dinosaur's flying cousin", "Lays eggs, often sings", "Feathered animal that flies"] },
  { id: "house", answer: "HOUSE", difficulty: "easy", clues: ["Three little pigs built three", "Place with roof and rooms", "Where you live"] },
  { id: "shoe", answer: "SHOE", difficulty: "easy", clues: ["Cinderella lost one at midnight", "Comes in pairs, has laces", "Worn on your feet"] },
  { id: "ball", answer: "BALL", difficulty: "easy", clues: ["Round in shape, round in dance", "Bounces, used in sport", "Round bouncy object"] },
  { id: "phone", answer: "PHONE", difficulty: "easy", clues: ["Bell rang the first one", "Pocket-sized, addictive", "Rings, makes calls"] },
  { id: "chair", answer: "CHAIR", difficulty: "easy", clues: ["Four legs, can't walk", "Found around tables", "You sit on it"] },
  { id: "key", answer: "KEY", difficulty: "easy", clues: ["Houdini escaped many", "Pairs with a lock", "Small metal thing that opens locks"] },
  { id: "snow", answer: "SNOW", difficulty: "easy", clues: ["Rain's cold cousin", "Frosty's building material", "White flakes that fall in winter"] },
  { id: "fire", answer: "FIRE", difficulty: "easy", clues: ["Prometheus's stolen gift", "What you light on a stove", "Hot and bright, burns things"] },
  { id: "water", answer: "WATER", difficulty: "easy", clues: ["H₂O, technically", "Fish swim in it, you drink it", "Clear liquid, fills oceans"] },
  { id: "sleep", answer: "SLEEP", difficulty: "easy", clues: ["Sheep-counting outcome", "Dreams' delivery method", "What you do at night with eyes closed"] },

  // MEDIUM
  { id: "guitar", answer: "GUITAR", difficulty: "medium", clues: ["Hendrix once set one on fire", "Has six strings and a neck", "Played in most rock bands"] },
  { id: "rocket", answer: "ROCKET", difficulty: "medium", clues: ["Goes up, fights gravity", "SpaceX builds them", "Vehicle that flies to space"] },
  { id: "pirate", answer: "PIRATE", difficulty: "medium", clues: ["Says 'arrr' and 'matey'", "Flies the Jolly Roger", "Sea bandit with treasure and parrot"] },
  { id: "castle", answer: "CASTLE", difficulty: "medium", clues: ["Moats surround them", "Kings and queens lived here", "Big stone fortress"] },
  { id: "dragon", answer: "DRAGON", difficulty: "medium", clues: ["Smaug's species", "Khaleesi had three", "Mythical fire-breathing creature"] },
  { id: "ocean", answer: "OCEAN", difficulty: "medium", clues: ["Covers 71% of Earth", "Salty and vast", "Big body of salt water"] },
  { id: "pizza", answer: "PIZZA", difficulty: "medium", clues: ["Naples' edible export", "Round, cheesy, sliced into 8", "Italian food with cheese and toppings"] },
  { id: "coffee", answer: "COFFEE", difficulty: "medium", clues: ["Monday morning's hero", "Made from roasted beans", "Hot caffeinated drink"] },
  { id: "winter", answer: "WINTER", difficulty: "medium", clues: ["The Starks were warning about it", "Comes after autumn", "Cold season with snow"] },
  { id: "doctor", answer: "DOCTOR", difficulty: "medium", clues: ["Wears a white coat and a stethoscope", "Hippocrates' modern heir", "Person who treats sick people"] },
  { id: "camera", answer: "CAMERA", difficulty: "medium", clues: ["Click, flash, captured", "Has a lens and shutter", "Used by photographers to take pictures"] },
  { id: "robot", answer: "ROBOT", difficulty: "medium", clues: ["Word coined in a 1920 Czech play", "Asimov gave it three laws", "Programmable mechanical being"] },
  { id: "ninja", answer: "NINJA", difficulty: "medium", clues: ["Black-clad and silent", "Throws stars, climbs walls", "Feudal Japanese stealth fighter"] },
  { id: "bridge", answer: "BRIDGE", difficulty: "medium", clues: ["London's falls down in a song", "Connects two sides of a river", "Crosses gaps for cars or people"] },
  { id: "magnet", answer: "MAGNET", difficulty: "medium", clues: ["Iron's invisible suitor", "Has a north and south end", "Sticks to your fridge"] },
  { id: "violin", answer: "VIOLIN", difficulty: "medium", clues: ["Stradivari built the famous ones", "Played with a bow, four strings", "Small bowed string instrument"] },
  { id: "tiger", answer: "TIGER", difficulty: "medium", clues: ["Orange with black stripes", "Tony cereal mascot", "Big striped wild cat"] },
  { id: "engine", answer: "ENGINE", difficulty: "medium", clues: ["Vehicle's mechanical heart", "Burns fuel or runs on volts", "Powers cars and trains"] },
  { id: "library", answer: "LIBRARY", difficulty: "medium", clues: ["Alexandria had a famous one", "Quiet zone full of books", "Building where you borrow books"] },
  { id: "compass", answer: "COMPASS", difficulty: "medium", clues: ["Magnetic guide", "Has a needle that points north", "Navigation tool with a needle"] },
  { id: "garden", answer: "GARDEN", difficulty: "medium", clues: ["Eden was the first one", "Where vegetables grow on purpose", "Plot of land with flowers or plants"] },
  { id: "thunder", answer: "THUNDER", difficulty: "medium", clues: ["Thor's hammer sound effect", "Comes right after lightning", "Loud rumble during storms"] },

  // HARD
  { id: "echo", answer: "ECHO", difficulty: "hard", clues: ["Sound's lazy mimic", "Heard in canyons and caves", "Sound that bounces back"] },
  { id: "phoenix", answer: "PHOENIX", difficulty: "hard", clues: ["Rises from its own ashes", "Harry Potter had one named Fawkes", "Mythical fiery bird reborn from ash"] },
  { id: "telescope", answer: "TELESCOPE", difficulty: "hard", clues: ["Galileo's stargazing tool", "Hubble's namesake instrument", "Lets you see far-away stars"] },
  { id: "volcano", answer: "VOLCANO", difficulty: "hard", clues: ["Earth's pressure valve", "Pompeii's destroyer", "Mountain that erupts with lava"] },
  { id: "pyramid", answer: "PYRAMID", difficulty: "hard", clues: ["Egyptian tomb shape", "Four triangular sides meet at a point", "Triangular stone monument in Egypt"] },
  { id: "vampire", answer: "VAMPIRE", difficulty: "hard", clues: ["Garlic-averse, sun-allergic", "Dracula's species", "Blood-drinking undead creature"] },
  { id: "mirror", answer: "MIRROR", difficulty: "hard", clues: ["Honest in reverse", "Snow White's stepmother consulted one", "Glass that shows your reflection"] },
  { id: "diamond", answer: "DIAMOND", difficulty: "hard", clues: ["Carbon under heavy pressure", "A girl's best friend, allegedly", "Hardest, sparkliest gemstone"] },
  { id: "octopus", answer: "OCTOPUS", difficulty: "hard", clues: ["Has three hearts and eight arms", "Camouflage champion of the sea", "Sea creature with eight arms"] },
  { id: "shadow", answer: "SHADOW", difficulty: "hard", clues: ["Follows you on sunny days", "Light's silhouetted absence", "Dark shape made by blocking light"] },
  { id: "anchor", answer: "ANCHOR", difficulty: "hard", clues: ["Heavy keeper of ships", "Drops to the seabed", "Iron hook that holds a boat still"] },
  { id: "wizard", answer: "WIZARD", difficulty: "hard", clues: ["Gandalf's day job", "Wears a robe, waves a staff", "Magic-user with pointy hat"] },
  { id: "puzzle", answer: "PUZZLE", difficulty: "hard", clues: ["A thousand pieces of patience", "Jigsaw or crossword", "Brain-teaser to solve"] },
  { id: "riddle", answer: "RIDDLE", difficulty: "hard", clues: ["The Sphinx asked Oedipus one", "Question with a tricky answer", "A puzzling question or word game"] },
  { id: "river", answer: "RIVER", difficulty: "hard", clues: ["Flows to the sea", "The Nile, the Amazon, the Thames", "Long flowing body of water"] },
  { id: "clock", answer: "CLOCK", difficulty: "hard", clues: ["Has two hands but no fingers", "Tick-tocks all day", "Tells you the time"] },
  { id: "ladder", answer: "LADDER", difficulty: "hard", clues: ["Unlucky to walk under one", "Way up to a roof or attic", "Frame with rungs you climb"] },
  { id: "feather", answer: "FEATHER", difficulty: "hard", clues: ["Light as itself, idiomatically", "Birds wear thousands", "Soft thing covering a bird"] },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 10-round mix: 4 easy / 4 medium / 2 hard. All answers are common English words;
// the cryptic first clue does the work, not obscure vocabulary.
export function pickRoundWords(count: number): Word[] {
  const easy = shuffle(WORDS.filter((w) => w.difficulty === "easy"));
  const med = shuffle(WORDS.filter((w) => w.difficulty === "medium"));
  const hard = shuffle(WORDS.filter((w) => w.difficulty === "hard"));

  if (count === 10) {
    return shuffle([
      ...easy.slice(0, 4),
      ...med.slice(0, 4),
      ...hard.slice(0, 2),
    ]);
  }

  // Generic fallback.
  const easyCount = Math.max(1, Math.round(count * 0.4));
  const medCount = Math.max(1, Math.round(count * 0.4));
  const hardCount = Math.max(0, count - easyCount - medCount);
  return shuffle([
    ...easy.slice(0, easyCount),
    ...med.slice(0, medCount),
    ...hard.slice(0, hardCount),
  ]);
}

// Reveal schedule per difficulty (ms when clue [1] and clue [2] become visible).
// Bumped back faster so the game stays snappy.
export function clueRevealSchedule(d: Word["difficulty"]): [number, number] {
  switch (d) {
    case "easy": return [7000, 16000];
    case "medium": return [9000, 19000];
    case "hard": return [11000, 21000];
    case "expert": return [13000, 23000];
  }
}
