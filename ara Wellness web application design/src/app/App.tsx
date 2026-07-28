import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, BookOpen, ChefHat, Edit3, Target, SlidersHorizontal, Leaf,
  ChevronDown, ChevronRight, X, Plus, Trash2, ArrowUp, ArrowDown,
  Check, RefreshCw, Sparkles, Search, Clock, Droplets, Heart, Timer,
  Moon, Sun, Monitor, Menu, ArrowRight
} from "lucide-react";

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @keyframes breatheOrb {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.18); }
      }
      @keyframes breatheOrbOuter {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.24); opacity: 0.15; }
      }
      @keyframes floatGently {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-14px) rotate(4deg); }
        66% { transform: translateY(-7px) rotate(-3deg); }
      }
      @keyframes floatGently2 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        40% { transform: translateY(-10px) rotate(-6deg); }
        70% { transform: translateY(-18px) rotate(3deg); }
      }
      @keyframes floatGently3 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(5deg); }
      }
      @keyframes scrollBounce {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(9px); }
      }
      @keyframes pulseRing {
        0%, 100% { transform: scale(0.96); opacity: 0.45; }
        50% { transform: scale(1.05); opacity: 0.15; }
      }
      @keyframes shimmerGrad {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes leafDrift {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
        30% { transform: translateY(-12px) translateX(6px) rotate(6deg); }
        65% { transform: translateY(-5px) translateX(-5px) rotate(-4deg); }
      }
      @keyframes dropFill {
        0% { transform: scaleY(0); }
        100% { transform: scaleY(1); }
      }
      .anim-breathe-orb { animation: breatheOrb 4.5s ease-in-out infinite; }
      .anim-breathe-orb-outer { animation: breatheOrbOuter 6s ease-in-out infinite; }
      .anim-breathe-orb-mid { animation: breatheOrb 5.5s ease-in-out infinite 0.6s; }
      .anim-float { animation: floatGently 8s ease-in-out infinite; }
      .anim-float-2 { animation: floatGently2 10s ease-in-out infinite; }
      .anim-float-3 { animation: floatGently3 12s ease-in-out infinite 1s; }
      .anim-scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }
      .anim-pulse-ring { animation: pulseRing 3.5s ease-in-out infinite; }
      .anim-pulse-ring-2 { animation: pulseRing 3.5s ease-in-out infinite 1s; }
      .anim-pulse-ring-3 { animation: pulseRing 3.5s ease-in-out infinite 2s; }
      .anim-leaf-drift { animation: leafDrift 9s ease-in-out infinite; }
      .anim-leaf-drift-2 { animation: leafDrift 11s ease-in-out infinite 2s; }
      .scroll-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .scroll-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .scroll-reveal-left {
        opacity: 0;
        transform: translateX(-24px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .scroll-reveal-left.visible {
        opacity: 1;
        transform: translateX(0);
      }
      .scroll-reveal-right {
        opacity: 0;
        transform: translateX(24px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .scroll-reveal-right.visible {
        opacity: 1;
        transform: translateX(0);
      }
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(166,184,155,0.3); border-radius: 3px; }
    `}</style>
  );
}

// ─── BOTANICAL SVGS ─────────────────────────────────────────────────────────
function BotanicalA({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 160" className={className} fill="none" aria-hidden>
      <path d="M45 155 C45 155 43 110 42 75 C40 40 34 18 45 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <path d="M45 100 C45 100 8 80 4 50 C0 22 24 18 42 38 C42 38 43 50 45 100" fill="currentColor" opacity="0.28"/>
      <path d="M45 75 C45 75 78 55 82 28 C86 4 63 0 47 22 C47 22 46 38 45 75" fill="currentColor" opacity="0.38"/>
      <path d="M44 48 C44 48 12 32 10 14 C8 0 28 -2 40 16 C40 16 42 28 44 48" fill="currentColor" opacity="0.22"/>
      <circle cx="45" cy="4" r="3.5" fill="currentColor" opacity="0.55"/>
    </svg>
  );
}
function BotanicalB({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 180" className={className} fill="none" aria-hidden>
      <path d="M55 172 C55 172 52 115 50 78 C47 42 38 20 55 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>
      <path d="M55 120 C45 105 10 95 5 65 C0 36 26 28 48 50 C50 65 53 88 55 120" fill="currentColor" opacity="0.22"/>
      <path d="M55 95 C65 80 98 70 104 42 C110 14 86 8 65 30 C62 44 58 70 55 95" fill="currentColor" opacity="0.32"/>
      <path d="M54 60 C50 48 24 36 22 18 C20 4 38 0 50 18 C51 25 52 40 54 60" fill="currentColor" opacity="0.20"/>
      <path d="M56 42 C62 30 82 20 84 8 C86 -2 72 -2 62 12 C60 18 58 28 56 42" fill="currentColor" opacity="0.18"/>
      <ellipse cx="55" cy="5" rx="4" ry="5" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}
function BotanicalC({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 110" className={className} fill="none" aria-hidden>
      <path d="M35 108 C35 60 34 42 35 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M35 72 C35 72 10 60 8 42 C6 26 20 22 32 36 C33 44 34 56 35 72" fill="currentColor" opacity="0.3"/>
      <path d="M35 55 C35 55 58 44 60 28 C62 12 48 10 38 24 C37 32 36 42 35 55" fill="currentColor" opacity="0.4"/>
      <circle cx="35" cy="8" r="3" fill="currentColor" opacity="0.55"/>
    </svg>
  );
}

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useLocalStorage<T>(key: string, init: T): [T, (v: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const set = useCallback((v: T | ((p: T) => T)) => {
    setVal(prev => {
      const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [val, set];
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── TYPES ──────────────────────────────────────────────────────────────────
type Page = "home" | "breathing" | "recipes" | "library" | "journal" | "checklist" | "settings";
type Mood = "happy" | "calm" | "neutral" | "stressed" | "tired" | "low";
type AccentKey = "sage" | "forest" | "terracotta" | "sand" | "lavender";
interface AppSettings {
  theme: "light" | "dark" | "system";
  accent: AccentKey;
  fontSize: "small" | "medium" | "large";
  reduceMotion: boolean;
  sound: boolean;
  defaultBreathing: string;
  defaultSessionLength: number;
}
interface CheckItem { id: string; text: string; done: boolean; }
interface JournalEntry { id: string; date: string; prompt: string; text: string; }
interface BreathMode {
  id: string; name: string; desc: string; benefit: string;
  inhale: number; hold1: number; exhale: number; hold2: number; cycles: number; color: string;
}
interface SmartRecipe {
  id: string; name: string; description: string;
  cuisine: string; mealTypes: string[]; cravings: string[]; time: number;
  difficulty: "easy" | "medium" | "advanced"; calories: number; calorieLevel: "light" | "balanced" | "high";
  protein: string; carbs: string; fat: string; fiber: string;
  diet: string[]; spiceLevel: "mild" | "medium" | "spicy" | "veryspicy";
  coreIngredients: string[]; optionalStaples: string[];
  fullIngredientList: string[]; steps: string[]; healthySwaps: string[]; matchReason: string;
}
interface ScoredRecipe { recipe: SmartRecipe; totalScore: number; ingredientScore: number; matchedCore: string[]; missingCore: string[]; }
interface SmartFilters { craving: string; meal: string; time: number; difficulty: string; diet: string; cuisines: string[]; calorieLevel: string; spiceLevel: string; }
interface LibraryArticle { id: string; title: string; category: string; readTime: string; summary: string; content: string[]; }

// ─── ACCENTS ────────────────────────────────────────────────────────────────
const ACCENTS: Record<AccentKey, { primary: string; soft: string; muted: string; hover: string; fg: string }> = {
  sage:       { primary: "#A6B89B", soft: "#A6B89B14", muted: "#A6B89B2E", hover: "#95A88A", fg: "#2E3B29" },
  forest:     { primary: "#5E8A64", soft: "#5E8A6414", muted: "#5E8A642E", hover: "#4D7953", fg: "#FDFAF5" },
  terracotta: { primary: "#C98A67", soft: "#C98A6714", muted: "#C98A672E", hover: "#B87A58", fg: "#FDFAF5" },
  sand:       { primary: "#C4A067", soft: "#C4A06714", muted: "#C4A0672E", hover: "#B39057", fg: "#FDFAF5" },
  lavender:   { primary: "#9B8EC4", soft: "#9B8EC414", muted: "#9B8EC42E", hover: "#8A7EB3", fg: "#FDFAF5" },
};
const DEFAULT_SETTINGS: AppSettings = {
  theme: "light", accent: "terracotta", fontSize: "medium",
  reduceMotion: false, sound: true, defaultBreathing: "box", defaultSessionLength: 25,
};

// ─── UTILS ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 10);
const sessionPick = <T,>(key: string, pool: T[]): T => {
  try {
    const k = `ara_sp_${key}`;
    const s = sessionStorage.getItem(k);
    if (s !== null) return pool[parseInt(s) % pool.length];
    const idx = Math.floor(Math.random() * pool.length);
    sessionStorage.setItem(k, String(idx));
    return pool[idx];
  } catch { return pool[0]; }
};
const dayPick = <T,>(pool: T[]): T => {
  const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return pool[doy % pool.length];
};
const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const QUOTES = [
  { text: "The present moment is the only time over which we have dominion.", author: "Thích Nhất Hạnh" },
  { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { text: "Rest is not idle. It is the fertile ground from which everything meaningful grows.", author: "AraNook" },
  { text: "Small acts of self-care are not indulgences. They are the infrastructure of a life.", author: "AraNook" },
  { text: "In stillness lives all the answers your hurrying mind has been racing past.", author: "AraNook" },
  { text: "You cannot pour from an empty vessel. Fill yourself first.", author: "AraNook" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Gratitude turns what we have into enough.", author: "Ancient proverb" },
  { text: "The body knows things a long time before the mind catches up.", author: "Annie Proulx" },
  { text: "What you practice grows stronger.", author: "Shauna Shapiro" },
  { text: "Your calm is your power.", author: "AraNook" },
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { text: "Wellness is not a destination. It is a practice, renewed each morning.", author: "AraNook" },
  { text: "Even rivers rest in the ocean. Even you deserve stillness.", author: "AraNook" },
  { text: "Deep breathing is our nervous system's love language.", author: "AraNook" },
  { text: "Inhale deeply — the world can wait for a single breath.", author: "AraNook" },
  { text: "You are one intentional choice away from a better day.", author: "AraNook" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Growth and comfort cannot coexist — but growth and peace can.", author: "AraNook" },
  { text: "Begin anywhere. Just begin.", author: "AraNook" },
];
const REFLECTION_PROMPTS = [
  "What is one thing that brought you a moment of genuine peace today?",
  "Name three things your body has done for you that you haven't thanked it for.",
  "What would you tell a younger version of yourself right now?",
  "What are you holding onto that no longer serves you?",
  "When did you last feel truly present? What made that possible?",
  "What is quietly growing in you right now, even if unseen?",
  "If your body could speak today, what would it ask for?",
  "What does 'enough' mean to you right now?",
  "What small habit would most improve the texture of your daily life?",
  "What would a slow, deliberate day look and feel like for you?",
  "What are you genuinely proud of, however small?",
  "What seeds are you planting in yourself today?",
];
const BREATH_MODES: BreathMode[] = [
  { id:"box",   name:"Box Breathing", desc:"Equal four-count rhythm",  benefit:"Reduces anxiety and improves focus", inhale:4,hold1:4,exhale:4,hold2:4,cycles:4,color:"#A6B89B" },
  { id:"478",   name:"4-7-8",         desc:"Inhale, hold, slow exhale", benefit:"Promotes deep relaxation and sleep",  inhale:4,hold1:7,exhale:8,hold2:0,cycles:3,color:"#9B8EC4" },
  { id:"calm",  name:"Deep Calm",     desc:"Extended exhale for the nervous system", benefit:"Activates the parasympathetic response", inhale:5,hold1:2,exhale:8,hold2:1,cycles:4,color:"#C98A67" },
  { id:"focus", name:"Focus Breath",  desc:"Balanced rhythm for clarity", benefit:"Sharpens attention, reduces brain fog",   inhale:4,hold1:4,exhale:4,hold2:0,cycles:5,color:"#5E8A64" },
  { id:"sleep", name:"Sleep Breath",  desc:"Heavy exhale to wind down",  benefit:"Prepares body and mind for deep rest",  inhale:4,hold1:6,exhale:8,hold2:0,cycles:4,color:"#9B8EC4" },
  { id:"custom",name:"Custom",        desc:"Set your own rhythm",        benefit:"Fully personalised practice",          inhale:4,hold1:2,exhale:6,hold2:2,cycles:4,color:"#C4A067" },
];
const INGREDIENT_DB: Record<string, string[]> = {
  "🥕 Vegetables": ["Tomato","Onion","Garlic","Potato","Sweet Potato","Carrot","Broccoli","Cauliflower","Zucchini / Courgette","Bell Pepper / Capsicum","Cucumber","Celery","Mushrooms","Corn","Peas","Green Beans","Asparagus","Brussels Sprouts","Beetroot","Spring Onion","Leek","Butternut Squash","Fennel","Cabbage"],
  "🌿 Indian Vegetables": ["Okra (Bhindi)","Brinjal / Eggplant","Bottle Gourd (Lauki)","Ridge Gourd (Turai)","Pumpkin","Raw Banana","Drumstick (Moringa)","Radish (Mooli)","Cluster Beans (Gavar)","Bitter Gourd (Karela)","Colocasia (Arbi)","Ivy Gourd (Tindora)","Banana Flower","Yam (Suran)"],
  "🍓 Fruits": ["Apple","Banana","Mango","Strawberries","Blueberries","Mixed Berries","Lemon","Lime","Orange","Avocado","Pineapple","Pomegranate","Kiwi","Dates","Grapes","Peach"],
  "🥬 Leafy Greens & Herbs": ["Spinach","Kale","Lettuce","Rocket / Arugula","Bok Choy","Swiss Chard","Watercress","Fenugreek Leaves (Methi)","Curry Leaves","Cilantro / Coriander","Fresh Basil","Parsley","Mint","Thyme","Rosemary","Oregano","Dill","Lemongrass","Green Chillies","Bay Leaves"],
  "🌾 Grains & Rice": ["Basmati Rice","Brown Rice","White Rice","Jasmine Rice","Quinoa","Rolled Oats","Bulgur","Couscous","Barley","Wild Rice","Poha (Flattened Rice)","Rava / Semolina","Daliya (Broken Wheat)","Sabudana (Tapioca Pearls)","Vermicelli"],
  "🫓 Flour & Bread": ["Wheat Flour (Atta)","Besan (Chickpea Flour)","Maida (All-Purpose Flour)","Ragi (Finger Millet)","Jowar Flour","Bajra Flour","Spaghetti","Penne","Linguine","Fusilli","Rice Noodles","Soba Noodles","Sourdough Bread","White Bread","Multigrain Bread","Tortillas","Pita Bread","Naan"],
  "🫘 Dals, Beans & Lentils": ["Toor Dal","Moong Dal (Yellow Split)","Chana Dal","Urad Dal","Masoor Dal","Whole Moong (Green Gram)","Chickpeas","Black Chana","Rajma (Kidney Beans)","Black Beans","Cannellini Beans","Butter Beans","Red Lentils","Green Lentils","Edamame","Mixed Sprouts"],
  "🥛 Dairy & Alternatives": ["Milk","Curd (Dahi / Yogurt)","Paneer","Ghee","Butter","Heavy Cream","Greek Yogurt","Cheddar Cheese","Feta Cheese","Mozzarella","Parmesan","Sour Cream","Oat Milk","Almond Milk","Coconut Milk (carton)","Buttermilk"],
  "🥚 Eggs": ["Eggs"],
  "🍗 Meat & Poultry": ["Chicken Breast","Chicken Thighs","Whole Chicken","Ground Beef / Mince","Beef Steak","Lamb","Lamb Chops","Pork","Bacon","Ham","Ground Turkey","Sausages"],
  "🦐 Seafood": ["Salmon","Shrimp / Prawns","Tuna (canned)","Fish (white fish)","Cod","Sea Bass","Sardines","Mackerel","Scallops"],
  "🌱 Plant Protein": ["Firm Tofu","Silken Tofu","Tempeh","Soya Chunks","Seitan"],
  "🥜 Nuts, Seeds & Butters": ["Peanuts","Cashews","Almonds","Walnuts","Pistachios","Pine Nuts","Coconut (fresh / desiccated)","Chia Seeds","Sesame Seeds","Sunflower Seeds","Flaxseeds","Pumpkin Seeds","Peanut Butter","Almond Butter","Tahini"],
  "🧂 Indian Spices": ["Turmeric","Cumin Seeds","Mustard Seeds","Coriander Powder","Red Chilli Powder","Kashmiri Chilli Powder","Garam Masala","Chaat Masala","Sambar Powder","Amchur (Dry Mango)","Kasuri Methi","Fenugreek Seeds","Asafoetida (Hing)","Paprika","Smoked Paprika","Cinnamon","Cloves","Cardamom","Black Pepper","Star Anise","Cumin Powder","Five Spice"],
  "🌶️ Flavour Bases & Aromatics": ["Ginger (Fresh)","Ginger-Garlic Paste","Tamarind","Coconut Milk (canned)","Jaggery (Gur)","Kokum","Saffron","Rose Water","Lemon","Lime"],
  "🧴 Condiments & Sauces": ["Soy Sauce","Tamari","Hot Sauce","Sriracha","Ketchup","Mustard","Dijon Mustard","Mayonnaise","Honey","Maple Syrup","Rice Vinegar","Balsamic Vinegar","Worcestershire Sauce","Fish Sauce","Oyster Sauce","Hoisin Sauce","Miso Paste","Teriyaki Sauce","Green Chutney","Tamarind Chutney"],
  "🍅 Canned & Jarred": ["Canned Tomatoes","Tomato Paste","Sun-dried Tomatoes","Olives","Capers","Red Curry Paste","Green Curry Paste","Vegetable Stock","Chicken Stock","Pesto"],
  "🧊 Frozen": ["Frozen Peas","Frozen Corn","Frozen Edamame","Frozen Berries","Frozen Spinach","Frozen Broccoli"],
  "🫙 Pantry Staples": ["Olive Oil","Vegetable Oil","Sesame Oil","Mustard Oil","Plain Flour","Bread Crumbs","Sugar","Brown Sugar","Vanilla Extract","Baking Powder","Cornstarch","Lemon Juice"],
};

const DEFAULT_SMART_FILTERS: SmartFilters = { craving:"any",meal:"all",time:0,difficulty:"any",diet:"none",cuisines:[],calorieLevel:"any",spiceLevel:"any" };

const INDIAN_SUBCUISINES = new Set(["North Indian","South Indian","Maharashtrian","Gujarati","Punjabi","Bengali","Rajasthani","Kerala","Tamil","Andhra","Indo-Chinese","Mughlai","Pan-Indian","Chettinad"]);
const cuisineMatches = (selected: string[], cuisine: string): boolean => {
  if (selected.length === 0 || selected.includes("Random")) return true;
  if (selected.includes("Indian") && INDIAN_SUBCUISINES.has(cuisine)) return true;
  return selected.includes(cuisine);
};

const CUISINE_GROUPS = [
  { label:"🇮🇳 Indian Regional", items:[{id:"Indian",label:"All Indian"},{id:"North Indian",label:"North Indian"},{id:"South Indian",label:"South Indian"},{id:"Punjabi",label:"Punjabi"},{id:"Maharashtrian",label:"Maharashtrian"},{id:"Gujarati",label:"Gujarati"},{id:"Andhra",label:"Andhra"},{id:"Kerala",label:"Kerala"},{id:"Bengali",label:"Bengali"},{id:"Indo-Chinese",label:"Indo-Chinese"}] },
  { label:"🌍 International", items:[{id:"Italian",label:"Italian"},{id:"Mediterranean",label:"Mediterranean"},{id:"Mexican",label:"Mexican"},{id:"Chinese",label:"Chinese"},{id:"Japanese",label:"Japanese"},{id:"Korean",label:"Korean"},{id:"Thai",label:"Thai"},{id:"Vietnamese",label:"Vietnamese"},{id:"American",label:"American"},{id:"French",label:"French"},{id:"Spanish",label:"Spanish"},{id:"Middle Eastern",label:"Middle Eastern"}] },
];

const WORLD_CUISINES_DATA = [
  { id:"Indian",        flag:"🇮🇳", label:"Indian",       desc:"Dal, curry & spice",        img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=260&fit=crop&auto=format" },
  { id:"Italian",       flag:"🇮🇹", label:"Italian",      desc:"Pasta, risotto & frittata", img:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=260&fit=crop&auto=format" },
  { id:"Japanese",      flag:"🇯🇵", label:"Japanese",     desc:"Ramen, teriyaki & miso",    img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=260&fit=crop&auto=format" },
  { id:"Mexican",       flag:"🇲🇽", label:"Mexican",      desc:"Tacos, burritos & salsa",   img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=260&fit=crop&auto=format" },
  { id:"Mediterranean", flag:"🇬🇷", label:"Mediterranean",desc:"Falafel, grain bowls",      img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=260&fit=crop&auto=format" },
  { id:"Chinese",       flag:"🇨🇳", label:"Chinese",      desc:"Stir fry, noodles & wok",  img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=260&fit=crop&auto=format" },
  { id:"Thai",          flag:"🇹🇭", label:"Thai",         desc:"Pad Thai, curry & tom yum", img:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=260&fit=crop&auto=format" },
  { id:"Korean",        flag:"🇰🇷", label:"Korean",       desc:"Bibimbap, kimchi & tofu",   img:"https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=260&fit=crop&auto=format" },
  { id:"French",        flag:"🇫🇷", label:"French",       desc:"Ratatouille, quiche & soup",img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=260&fit=crop&auto=format" },
  { id:"Spanish",       flag:"🇪🇸", label:"Spanish",      desc:"Paella, tapas & gazpacho",  img:"https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=400&h=260&fit=crop&auto=format" },
  { id:"Vietnamese",    flag:"🇻🇳", label:"Vietnamese",   desc:"Pho, spring rolls & banh mi",img:"https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=260&fit=crop&auto=format" },
  { id:"American",      flag:"🇺🇸", label:"American",     desc:"Wraps, salads & grills",    img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=260&fit=crop&auto=format" },
  { id:"Middle Eastern",flag:"🇱🇧", label:"Middle Eastern",desc:"Shakshuka, falafel & hummus",img:"https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=260&fit=crop&auto=format" },
  { id:"Random",        flag:"🎲",  label:"Surprise Me",  desc:"Explore any cuisine",       img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop&auto=format" },
];

const SMART_RECIPES: SmartRecipe[] = [
  // ── Indian Breakfast ──
  { id:"in01",name:"Poha",description:"Maharashtra's beloved breakfast of flattened rice with mustard seeds, curry leaves, and onion. Light, nourishing, 15-minute comfort.",cuisine:"Maharashtrian",mealTypes:["breakfast","snack"],cravings:["savoury","healthy","fresh-light"],time:15,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"6g",carbs:"48g",fat:"8g",fiber:"4g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Poha (Flattened Rice)","Onion","Green Chillies"],optionalStaples:["Mustard Seeds","Turmeric","Curry Leaves","Peanuts","Lemon","Coriander","Salt","Oil"],fullIngredientList:["1½ cups poha","1 large onion finely chopped","2 green chillies slit","1 tsp mustard seeds","¼ tsp turmeric","8-10 curry leaves","¼ cup roasted peanuts","Juice of ½ lemon","2 tbsp oil","Salt and fresh coriander"],steps:["Rinse poha under water until soft but not mushy. Drain and set aside.","Heat oil in wide pan. Add mustard seeds. When they splutter, add curry leaves and green chillies.","Add onion. Fry 3 min until translucent. Add turmeric and salt.","Add peanuts and toss. Add drained poha and mix gently.","Cook on low heat 2 min. Squeeze lemon. Garnish with coriander and serve."],healthySwaps:["Add grated carrot for more vitamins","Top with pomegranate seeds for sweetness","Use less oil for lighter version"],matchReason:"Poha with onion and green chillies is Maharashtra's most comforting breakfast — light, energising, and ready in 15 minutes." },
  { id:"in02",name:"Vegetable Upma",description:"Fluffy semolina porridge tempered with mustard seeds, curry leaves, and mixed vegetables. The quintessential South Indian breakfast.",cuisine:"South Indian",mealTypes:["breakfast","snack"],cravings:["savoury","comfort","healthy"],time:20,difficulty:"easy",calories:300,calorieLevel:"balanced",protein:"8g",carbs:"52g",fat:"8g",fiber:"5g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Rava / Semolina","Onion","Green Chillies"],optionalStaples:["Mustard Seeds","Curry Leaves","Carrot","Peas","Oil","Salt","Lemon","Peanuts"],fullIngredientList:["1 cup rava (semolina)","1 onion finely chopped","2 green chillies","2 cups boiling water","1 tsp mustard seeds","8-10 curry leaves","¼ cup mixed vegetables","2 tbsp oil","Salt and lemon juice"],steps:["Dry roast rava until light golden. Set aside.","Heat oil. Add mustard seeds. When they splutter add curry leaves and green chillies.","Add onion. Fry until translucent. Add vegetables. Cook 3 min.","Add boiling water and salt. Bring to simmer.","Add roasted rava stirring continuously to avoid lumps. Cover and cook 3 min. Serve with lemon squeeze."],healthySwaps:["Add more vegetables for extra nutrition","Try ragi upma with finger millet flour for more iron","Use ghee instead of oil for richer flavour"],matchReason:"Rava + onion + green chillies is upma's holy trinity — the most comforting South Indian breakfast that comes together in 20 minutes." },
  { id:"in03",name:"Paneer Bhurji",description:"Crumbled paneer sautéed with onion, tomato, and aromatic spices. Protein-packed, ready in 15 minutes, heavenly with roti.",cuisine:"North Indian",mealTypes:["breakfast","lunch","dinner"],cravings:["savoury","high-protein","comfort"],time:15,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"22g",carbs:"12g",fat:"26g",fiber:"3g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Paneer","Onion","Tomato"],optionalStaples:["Green Chillies","Ginger-Garlic Paste","Turmeric","Red Chilli Powder","Garam Masala","Coriander","Oil","Salt"],fullIngredientList:["200g paneer crumbled","1 large onion finely chopped","2 tomatoes chopped","1 tsp ginger-garlic paste","2 green chillies","½ tsp turmeric","1 tsp red chilli powder","½ tsp garam masala","2 tbsp oil","Salt and fresh coriander"],steps:["Heat oil. Add onion. Fry until golden about 5 min.","Add ginger-garlic paste and green chillies. Cook 2 min.","Add tomatoes and all spices. Cook until tomatoes break down about 5 min.","Add crumbled paneer. Mix well. Cook 3 min on medium heat.","Garnish with fresh coriander. Serve with roti or paratha."],healthySwaps:["Use low-fat paneer to reduce calories","Add capsicum for extra vitamins","Serve with multigrain roti for more fibre"],matchReason:"Paneer + onion + tomato creates the beloved bhurji — a quick, protein-rich North Indian dish that works for any meal." },
  { id:"in04",name:"Egg Bhurji",description:"Spiced scrambled eggs Indian-style with onion, tomato, and green chillies. The most satisfying 12-minute dhabha-style breakfast.",cuisine:"North Indian",mealTypes:["breakfast","lunch"],cravings:["savoury","high-protein","spicy"],time:12,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"18g",carbs:"10g",fat:"18g",fiber:"2g",diet:["glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Eggs","Onion","Tomato"],optionalStaples:["Green Chillies","Ginger-Garlic Paste","Turmeric","Red Chilli Powder","Garam Masala","Butter","Coriander","Salt"],fullIngredientList:["4 eggs beaten","1 large onion finely chopped","2 tomatoes finely chopped","2 green chillies","1 tsp ginger-garlic paste","½ tsp turmeric","½ tsp red chilli powder","¼ tsp garam masala","2 tbsp butter or oil","Salt and coriander"],steps:["Heat butter in pan. Add onion. Fry until golden.","Add ginger-garlic paste and green chillies. Cook 1 min.","Add tomatoes and spices. Cook until tomatoes are soft and oil separates.","Add beaten eggs. Scramble on medium heat keeping it soft and moist.","Garnish with coriander. Serve with buttered pav or roti."],healthySwaps:["Use 2 whole eggs + 2 egg whites to reduce fat","Add spinach for iron","Serve with multigrain bread for more fibre"],matchReason:"Eggs + onion + tomato in Indian spices creates bhurji — far more exciting than plain scrambled eggs and ready in 12 minutes." },
  { id:"in05",name:"Masala Omelette",description:"Fluffy Indian-style omelette with onion, tomato, green chillies, and spices. A dhabha breakfast classic that never disappoints.",cuisine:"North Indian",mealTypes:["breakfast","lunch"],cravings:["savoury","high-protein"],time:10,difficulty:"easy",calories:250,calorieLevel:"light",protein:"16g",carbs:"8g",fat:"16g",fiber:"2g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Eggs","Onion","Green Chillies"],optionalStaples:["Tomato","Coriander","Turmeric","Red Chilli Powder","Salt","Oil","Butter"],fullIngredientList:["3 eggs","1 small onion finely chopped","1-2 green chillies finely chopped","1 small tomato chopped","Fresh coriander","Pinch of turmeric","Salt to taste","1 tbsp oil or butter"],steps:["Beat eggs with salt, turmeric, and a little water until fluffy.","Add onion, green chillies, tomato, and coriander to egg mixture.","Heat oil in pan on medium heat. Pour in egg mixture.","Cook 2 min until bottom sets. Fold in half.","Cook 1 more min. Serve hot with buttered toast or roti."],healthySwaps:["Use olive oil instead of butter","Add spinach or capsicum for nutrients","Try with multigrain bread for more fibre"],matchReason:"Eggs + onion + green chillies is the simplest, most satisfying Indian breakfast — the humble masala omelette beloved at every dhabha." },
  { id:"in06",name:"Besan Chilla",description:"Crispy savoury pancakes from chickpea flour with onion, tomato, and spices. High protein, gluten-free, and incredibly quick.",cuisine:"North Indian",mealTypes:["breakfast","lunch","snack"],cravings:["savoury","healthy","high-protein"],time:15,difficulty:"easy",calories:260,calorieLevel:"balanced",protein:"14g",carbs:"30g",fat:"10g",fiber:"6g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Besan (Chickpea Flour)","Onion","Green Chillies"],optionalStaples:["Tomato","Coriander","Turmeric","Red Chilli Powder","Salt","Oil","Ajwain"],fullIngredientList:["1 cup besan","1 onion finely chopped","2 green chillies","1 tomato chopped","Fresh coriander","½ tsp turmeric","½ tsp red chilli powder","Pinch of ajwain","Salt and water to make batter","Oil for cooking"],steps:["Mix besan with spices and salt. Add water to make smooth pouring batter.","Add onion, green chillies, tomato, and coriander. Mix well.","Heat a non-stick tawa. Brush with oil.","Pour a ladleful of batter and spread into thin circle.","Cook 2 min, flip, cook 2 more min until golden. Serve with green chutney."],healthySwaps:["Add grated bottle gourd or spinach to batter","Serve with mint chutney instead of butter","Use very little oil with a good non-stick pan"],matchReason:"Besan + onion + green chillies creates chilla — a protein-rich pancake loved across India that requires zero fermentation." },
  { id:"in07",name:"Moong Dal Chilla",description:"Light, protein-rich crepes made from soaked moong dal. Easy to digest, high in protein, and ready without fermentation.",cuisine:"North Indian",mealTypes:["breakfast","snack"],cravings:["healthy","savoury","high-protein"],time:20,difficulty:"easy",calories:220,calorieLevel:"light",protein:"16g",carbs:"28g",fat:"6g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Moong Dal (Yellow Split)","Green Chillies","Ginger (Fresh)"],optionalStaples:["Onion","Coriander","Turmeric","Cumin Seeds","Salt","Oil"],fullIngredientList:["1 cup moong dal (soaked 2 hours)","2 green chillies","1 inch ginger","1 onion finely chopped","Fresh coriander","½ tsp cumin seeds","¼ tsp turmeric","Salt to taste","Oil for cooking"],steps:["Drain soaked moong dal. Grind with green chillies, ginger, and a little water to smooth batter.","Add onion, coriander, cumin, turmeric, and salt. Mix well.","Heat a tawa. Pour a ladleful of batter and spread thinly.","Drizzle oil around edges. Cook 2-3 min until golden.","Flip and cook 1-2 min more. Serve with curd or chutney."],healthySwaps:["Add paneer crumbles inside for extra protein","Load with grated vegetables","Eat with less oil using a good non-stick pan"],matchReason:"Moong dal + green chillies creates one of the healthiest Indian breakfasts — high protein, easy to digest, no fermentation needed." },
  { id:"in08",name:"Sabudana Khichdi",description:"Pearls of tapioca cooked with peanuts, green chillies, and ghee. A classic Maharashtrian fasting dish that is pure comfort.",cuisine:"Maharashtrian",mealTypes:["breakfast","snack"],cravings:["savoury","comfort"],time:20,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"8g",carbs:"62g",fat:"14g",fiber:"2g",diet:["vegetarian","glutenfree"],spiceLevel:"mild",coreIngredients:["Sabudana (Tapioca Pearls)","Peanuts","Green Chillies"],optionalStaples:["Potato","Cumin Seeds","Ghee","Lemon","Salt","Coriander","Jaggery (Gur)"],fullIngredientList:["1 cup sabudana (soaked overnight)","½ cup roasted peanuts coarsely ground","2 green chillies","1 boiled potato cubed","1 tsp cumin seeds","2 tbsp ghee","1 tsp lemon juice","Salt and coriander to garnish"],steps:["Soak sabudana in just enough water overnight. Pearls should be separate not sticky.","Heat ghee. Add cumin seeds. When they splutter add green chillies.","Add boiled potato. Cook 2 min.","Add soaked sabudana and peanut powder. Mix gently.","Cook on medium heat 5 min tossing occasionally. Add lemon, salt, garnish with coriander."],healthySwaps:["Add more peanuts for extra protein","Use sweet potato instead of regular potato","Reduce ghee and use light oil"],matchReason:"Sabudana + peanuts + green chillies creates khichdi that is simultaneously light and filling — beloved for fasting and everyday eating." },
  { id:"in09",name:"Masala Oats",description:"Savoury oats South Indian-style with a mustard-curry leaf tempering and mixed vegetables. Nutritious, quick, high-fibre.",cuisine:"South Indian",mealTypes:["breakfast"],cravings:["healthy","savoury"],time:15,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"10g",carbs:"46g",fat:"8g",fiber:"8g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Rolled Oats","Onion","Green Chillies"],optionalStaples:["Mustard Seeds","Curry Leaves","Tomato","Carrot","Peas","Turmeric","Salt","Oil","Lemon"],fullIngredientList:["1 cup rolled oats","1 onion finely chopped","2 green chillies","1 tomato","1 carrot grated","¼ cup peas","1 tsp mustard seeds","8-10 curry leaves","½ tsp turmeric","2 tbsp oil","Salt and lemon juice"],steps:["Heat oil. Add mustard seeds. When they splutter add curry leaves and green chillies.","Add onion. Fry 3 min. Add tomato, carrot, and peas. Cook 3 min.","Add turmeric, salt, and 1½ cups water. Bring to boil.","Add oats. Cook 3-4 min stirring until thick.","Squeeze lemon, garnish with coriander. Serve hot."],healthySwaps:["Use steel-cut oats for more fibre","Add spinach in the last minute","Top with roasted peanuts for crunch and protein"],matchReason:"Oats + onion + green chillies in South Indian tempering creates a breakfast that is nutritious, quick, and full of familiar Indian flavour." },
  { id:"in10",name:"Vegetable Daliya",description:"Wholesome broken wheat porridge with vegetables and mild spices. High in fibre, deeply nourishing, and incredibly easy.",cuisine:"North Indian",mealTypes:["breakfast","lunch"],cravings:["healthy","comfort"],time:25,difficulty:"easy",calories:310,calorieLevel:"balanced",protein:"10g",carbs:"52g",fat:"8g",fiber:"9g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Daliya (Broken Wheat)","Onion","Tomato"],optionalStaples:["Green Chillies","Carrot","Peas","Turmeric","Cumin Seeds","Oil","Salt","Coriander"],fullIngredientList:["1 cup daliya (broken wheat)","1 onion finely chopped","2 tomatoes","1 carrot diced","½ cup peas","2 green chillies","1 tsp cumin seeds","½ tsp turmeric","2 tbsp oil","Salt and coriander"],steps:["Dry roast daliya until light golden. Set aside.","Heat oil. Add cumin seeds. Add onion. Fry until translucent.","Add green chillies, tomato, carrot, and peas. Cook 3 min.","Add 2.5 cups water, turmeric, and salt. Bring to boil.","Add roasted daliya. Cover and cook on low heat 15 min. Garnish with coriander."],healthySwaps:["Add spinach in the last 5 minutes","Top with a dollop of curd for probiotics","Add paneer cubes for protein"],matchReason:"Daliya + onion + tomato makes one of India's most nutritious breakfasts — high fibre, slow-digesting, and deeply satisfying." },
  // ── Indian Dal & Curry ──
  { id:"in11",name:"Dal Tadka",description:"Comforting toor dal tempered with mustard seeds, cumin, garlic, and red chillies. The soul of Indian home cooking.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["comfort","savoury","healthy"],time:30,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"18g",carbs:"48g",fat:"8g",fiber:"12g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Toor Dal","Onion","Tomato"],optionalStaples:["Garlic","Cumin Seeds","Mustard Seeds","Red Chilli Powder","Turmeric","Ghee","Coriander","Salt"],fullIngredientList:["1 cup toor dal","1 onion finely chopped","2 tomatoes","3 garlic cloves","1 tsp cumin seeds","½ tsp mustard seeds","½ tsp red chilli powder","¼ tsp turmeric","1 tbsp ghee","Salt and coriander"],steps:["Pressure cook toor dal with turmeric and salt for 3 whistles until soft.","Heat ghee. Add cumin and mustard seeds.","Add garlic and onion. Fry until golden about 5 min.","Add tomatoes and red chilli powder. Cook until oil separates.","Pour tadka over cooked dal. Simmer 5 min. Garnish with coriander."],healthySwaps:["Use less ghee or switch to olive oil","Add spinach for iron","Serve with brown rice for more fibre"],matchReason:"Toor dal + onion + tomato is the cornerstone of Indian home cooking — this dal tadka is comfort in its purest, most elemental form." },
  { id:"in12",name:"Khichdi",description:"A one-pot dish of rice and moong dal with turmeric. The ultimate Indian comfort food — complete, nourishing, deeply satisfying.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["comfort","healthy"],time:25,difficulty:"easy",calories:340,calorieLevel:"balanced",protein:"14g",carbs:"56g",fat:"8g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Moong Dal (Yellow Split)","White Rice","Turmeric"],optionalStaples:["Cumin Seeds","Ghee","Ginger (Fresh)","Salt","Asafoetida (Hing)","Coriander"],fullIngredientList:["½ cup moong dal","½ cup rice","½ tsp turmeric","1 tsp cumin seeds","1 tbsp ghee","1 inch ginger grated","Pinch of asafoetida","Salt to taste","Fresh coriander"],steps:["Wash rice and dal together. Soak 15 min.","Heat ghee. Add cumin seeds and asafoetida. Add ginger.","Add rice and dal. Roast gently 2 min.","Add 3 cups water, turmeric, and salt. Pressure cook 3 whistles.","Mash slightly. Adjust consistency. Top with extra ghee. Serve with pickle and curd."],healthySwaps:["Add vegetables like carrot and peas for nutrients","Use brown rice for more fibre","Top with extra sprouts after cooking"],matchReason:"Moong dal + rice + turmeric is India's most nourishing combination — easy to digest, warming, and deeply comforting for body and soul." },
  { id:"in13",name:"Rajma Chawal",description:"Slow-cooked kidney beans in a thick, spiced onion-tomato masala. Punjab's most beloved Sunday lunch — rich, warming, perfect with rice.",cuisine:"Punjabi",mealTypes:["lunch","dinner"],cravings:["comfort","savoury","high-protein"],time:45,difficulty:"medium",calories:480,calorieLevel:"balanced",protein:"20g",carbs:"72g",fat:"10g",fiber:"16g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Rajma (Kidney Beans)","Onion","Tomato"],optionalStaples:["Garlic","Ginger (Fresh)","Cumin Seeds","Red Chilli Powder","Coriander Powder","Garam Masala","Oil","Salt","Basmati Rice"],fullIngredientList:["2 cups rajma (soaked overnight)","2 large onions finely chopped","3 tomatoes","2 tsp ginger-garlic paste","1 tsp cumin seeds","1 tsp red chilli powder","1 tsp coriander powder","½ tsp garam masala","2 tbsp oil","Salt and coriander"],steps:["Pressure cook soaked rajma until completely soft about 6-8 whistles. Reserve cooking water.","Heat oil. Add cumin seeds. Add onion. Fry until deep golden about 8 min.","Add ginger-garlic paste. Cook 2 min. Add tomatoes and all spices. Cook until oil separates.","Add cooked rajma with its water. Simmer 15-20 min until thick.","Season. Garnish with coriander. Serve with steamed basmati rice."],healthySwaps:["Cook with minimum oil","Add spinach near the end for iron","Serve with brown rice for more fibre"],matchReason:"Rajma + onion + tomato is the heart of Punjabi cuisine — a thick, hearty curry that is one of India's greatest comfort dishes." },
  { id:"in14",name:"Chole (Chana Masala)",description:"Spiced chickpeas in a tangy, robust masala. One of Punjab's most iconic dishes — bold, flavourful, and deeply satisfying.",cuisine:"Punjabi",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","spicy"],time:35,difficulty:"medium",calories:420,calorieLevel:"balanced",protein:"18g",carbs:"60g",fat:"12g",fiber:"14g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"spicy",coreIngredients:["Chickpeas","Onion","Tomato"],optionalStaples:["Ginger-Garlic Paste","Cumin Seeds","Red Chilli Powder","Garam Masala","Amchur (Dry Mango)","Coriander Powder","Oil","Salt"],fullIngredientList:["2 cans chickpeas","2 large onions finely chopped","3 tomatoes","2 tsp ginger-garlic paste","1 tsp cumin seeds","1 tsp red chilli powder","1 tsp coriander powder","1 tsp garam masala","½ tsp amchur","2 tbsp oil","Salt and coriander"],steps:["Heat oil. Add cumin seeds. Add onion. Fry until deep golden about 10 min.","Add ginger-garlic paste. Cook 2 min. Add tomatoes and all spices.","Cook until masala releases oil about 10 min.","Add chickpeas and 1 cup water. Simmer 15-20 min until thick and robust.","Garnish with raw onion, coriander, and lemon. Serve with rice or bhature."],healthySwaps:["Serve with kulcha instead of deep-fried bhature","Add kale for iron","Drizzle with yogurt to balance the spice"],matchReason:"Chickpeas + onion + tomato in bold Punjabi spices creates chole — a dish that defines North Indian street food culture." },
  { id:"in15",name:"Palak Paneer",description:"Velvety spiced spinach gravy with soft paneer cubes. A restaurant classic that is actually easy to make at home.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","healthy","comfort"],time:30,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"22g",carbs:"16g",fat:"24g",fiber:"6g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Spinach","Paneer","Onion"],optionalStaples:["Garlic","Ginger (Fresh)","Tomato","Red Chilli Powder","Garam Masala","Cream","Cumin Seeds","Oil","Salt"],fullIngredientList:["400g fresh spinach","200g paneer cubed","1 onion","2 garlic cloves","1 inch ginger","1 tomato","½ tsp red chilli powder","½ tsp garam masala","2 tbsp cream (optional)","2 tbsp oil","Salt and cumin seeds"],steps:["Blanch spinach in hot water 2 min. Cool in ice water. Blend smooth.","Heat oil. Add cumin seeds. Fry onion until golden. Add ginger-garlic.","Add tomato and spices. Cook until masala is thick.","Add spinach puree. Simmer 5 min. Adjust seasoning.","Add paneer cubes. Simmer 3 min. Stir in cream. Serve with naan or roti."],healthySwaps:["Skip cream for a lighter version","Use tofu instead of paneer for vegan","Add a handful of kale alongside spinach"],matchReason:"Spinach + paneer + onion creates one of India's most beloved curries — creamy, nutritious, and deeply satisfying." },
  { id:"in16",name:"Aloo Gobi",description:"Dry potato and cauliflower sabzi with ginger, cumin, and warm spices. Simple, everyday, impossibly good.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","healthy"],time:25,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"6g",carbs:"40g",fat:"10g",fiber:"7g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Potato","Cauliflower","Onion"],optionalStaples:["Ginger-Garlic Paste","Cumin Seeds","Turmeric","Red Chilli Powder","Coriander Powder","Garam Masala","Oil","Salt","Coriander"],fullIngredientList:["2 potatoes diced","1 small cauliflower florets","1 onion","1 tsp ginger-garlic paste","1 tsp cumin seeds","½ tsp turmeric","1 tsp coriander powder","½ tsp red chilli powder","¼ tsp garam masala","2 tbsp oil","Salt and fresh coriander"],steps:["Heat oil. Add cumin seeds. Add onion. Fry until golden.","Add ginger-garlic paste. Cook 1 min. Add turmeric and stir.","Add potatoes. Cook 5 min. Add cauliflower.","Add remaining spices and a splash of water. Cover and cook 12-15 min until tender.","Garnish with coriander. Serve with roti."],healthySwaps:["Use just 1 tbsp oil","Add peas for colour and sweetness","Add a pinch of kasuri methi for restaurant-style flavour"],matchReason:"Potato + cauliflower + onion in simple Indian spices is the most comforting everyday sabzi — familiar, homely, and deeply satisfying." },
  { id:"in17",name:"Bhindi Masala",description:"Crispy okra sautéed with onion, tomato, and spices. A quick everyday sabzi that pairs perfectly with dal and rice.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","healthy"],time:20,difficulty:"easy",calories:220,calorieLevel:"light",protein:"5g",carbs:"22g",fat:"12g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Okra (Bhindi)","Onion","Tomato"],optionalStaples:["Cumin Seeds","Turmeric","Red Chilli Powder","Coriander Powder","Amchur (Dry Mango)","Oil","Salt"],fullIngredientList:["400g okra sliced","1 large onion thinly sliced","2 tomatoes chopped","1 tsp cumin seeds","½ tsp turmeric","1 tsp coriander powder","½ tsp red chilli powder","½ tsp amchur","2 tbsp oil","Salt to taste"],steps:["Wash and dry bhindi thoroughly. Slice into rounds.","Heat oil in wide pan. Add cumin seeds. Add onion. Fry until golden.","Add bhindi. Cook uncovered on medium-high heat 8-10 min tossing occasionally.","Add tomatoes and all spices. Cook until bhindi is crispy and tomatoes are soft.","Add amchur. Serve dry with dal and rice or roti."],healthySwaps:["Use minimal oil with a wide pan so bhindi dries well","Air-fry bhindi for even less oil","Add besan coating for a Rajasthani variation"],matchReason:"Okra + onion + tomato makes this beloved bhindi masala — crispy, tangy, the kind of sabzi that disappears first from the plate." },
  { id:"in18",name:"Baingan Bharta",description:"Roasted, flame-charred brinjal mashed with onion, tomato, and spices. Earthy, smoky, irreplaceable.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:30,difficulty:"medium",calories:200,calorieLevel:"light",protein:"5g",carbs:"22g",fat:"10g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Brinjal / Eggplant","Onion","Tomato"],optionalStaples:["Garlic","Ginger (Fresh)","Green Chillies","Turmeric","Red Chilli Powder","Mustard Oil","Coriander","Salt"],fullIngredientList:["2 large brinjals","2 onions finely chopped","3 tomatoes finely chopped","3 garlic cloves","2 green chillies","½ tsp turmeric","1 tsp red chilli powder","2 tbsp mustard oil","Fresh coriander and salt"],steps:["Roast brinjals directly on flame turning regularly until skin chars and flesh is completely cooked about 15 min.","Peel under running water. Mash the flesh roughly.","Heat mustard oil. Add garlic, onion, and green chillies. Fry until golden.","Add tomatoes and spices. Cook until thick and oily.","Add mashed brinjal. Mix well. Cook 5 min. Garnish with coriander."],healthySwaps:["Roasting in oven at 220°C works if no gas flame","Mustard oil gives authentic flavour — use sparingly","Add fresh green peas to the bharta for sweetness"],matchReason:"Brinjal + onion + tomato becomes extraordinary when flame-roasted — this smoky bharta is Indian cooking at its most elemental." },
  { id:"in19",name:"Egg Curry",description:"Boiled eggs in a rich onion-tomato masala. Quick, economical, high-protein. The perfect weeknight Indian curry.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","high-protein"],time:25,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"18g",carbs:"16g",fat:"18g",fiber:"3g",diet:["glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Eggs","Onion","Tomato"],optionalStaples:["Garlic","Ginger (Fresh)","Red Chilli Powder","Coriander Powder","Garam Masala","Turmeric","Oil","Salt","Coriander"],fullIngredientList:["4 eggs hard boiled and peeled","2 onions finely chopped","3 tomatoes","2 tsp ginger-garlic paste","1 tsp red chilli powder","1 tsp coriander powder","¼ tsp turmeric","½ tsp garam masala","2 tbsp oil","Salt and coriander"],steps:["Score boiled eggs with a knife. Lightly fry them in oil until skin crisps. Remove.","In same pan fry onion until golden about 8 min. Add ginger-garlic paste.","Add tomatoes and all spices. Cook until masala is thick and oil separates.","Add fried eggs. Pour ½ cup water. Simmer 8 min.","Garnish with coriander. Serve with rice or roti."],healthySwaps:["Use 2 whole eggs + 2 extra whites to reduce fat","Use less oil for the masala","Add spinach to the curry for iron"],matchReason:"Eggs + onion + tomato creates the beloved egg curry — the quickest, most economical high-protein curry in Indian home cooking." },
  { id:"in20",name:"Chicken Curry",description:"Classic Indian chicken curry with fragrant masala. Rich, warming, and completely irresistible with rice or roti.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","high-protein","spicy"],time:40,difficulty:"medium",calories:420,calorieLevel:"balanced",protein:"36g",carbs:"14g",fat:"22g",fiber:"3g",diet:["glutenfree","dairyfree","highprotein"],spiceLevel:"spicy",coreIngredients:["Chicken Breast","Onion","Tomato"],optionalStaples:["Ginger-Garlic Paste","Curd (Dahi / Yogurt)","Red Chilli Powder","Coriander Powder","Garam Masala","Turmeric","Oil","Bay Leaves","Salt"],fullIngredientList:["500g chicken pieces","2 large onions","3 tomatoes","2 tbsp ginger-garlic paste","3 tbsp curd","1 tsp red chilli powder","1 tsp coriander powder","½ tsp turmeric","1 tsp garam masala","3 tbsp oil","Bay leaf and coriander"],steps:["Marinate chicken in curd, turmeric, and half the spices for 30 min.","Heat oil. Add bay leaf. Fry onion until deep golden about 10 min.","Add ginger-garlic paste. Cook 3 min. Add tomatoes and remaining spices.","Cook until masala releases oil. Add marinated chicken.","Brown chicken 5 min. Add water, cover, and simmer 20-25 min. Finish with garam masala and coriander."],healthySwaps:["Use skinless chicken breast for less fat","Add spinach to the curry for iron","Serve with brown rice for more fibre"],matchReason:"Chicken + onion + tomato is the base of every great Indian chicken curry — bold, aromatic, and deeply satisfying." },
  // ── Indian Rice & Flatbreads ──
  { id:"in21",name:"Jeera Rice",description:"Fragrant basmati rice tempered with cumin seeds and ghee. The simplest, most aromatic Indian rice — ready in 20 minutes.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:20,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"5g",carbs:"52g",fat:"6g",fiber:"1g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Basmati Rice","Cumin Seeds"],optionalStaples:["Ghee","Bay Leaves","Salt","Coriander"],fullIngredientList:["1 cup basmati rice","1 tsp cumin seeds","1 tbsp ghee","1 bay leaf","Salt to taste","Fresh coriander to garnish"],steps:["Wash basmati rice and soak 20 min. Drain.","Heat ghee in a pot. Add cumin seeds and bay leaf. Let sizzle 30 seconds.","Add rice. Toss in ghee 1 min.","Add 1.5 cups water and salt. Bring to boil. Reduce heat, cover, cook 12 min.","Rest 5 min. Fluff with fork. Garnish with coriander. Perfect with any dal or curry."],healthySwaps:["Use brown basmati for more fibre","Add whole spices like cardamom and cloves for more flavour","Serve with dal for a complete protein"],matchReason:"Basmati + cumin seeds + ghee creates jeera rice — the most versatile Indian rice dish, the perfect accompaniment to any curry." },
  { id:"in22",name:"Lemon Rice",description:"Bright, tangy South Indian rice with lemon, mustard seeds, and curry leaves. A complete meal in 15 minutes with leftover rice.",cuisine:"South Indian",mealTypes:["lunch","dinner","snack"],cravings:["savoury","fresh-light"],time:15,difficulty:"easy",calories:290,calorieLevel:"balanced",protein:"6g",carbs:"52g",fat:"8g",fiber:"2g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["White Rice","Lemon","Mustard Seeds"],optionalStaples:["Curry Leaves","Peanuts","Green Chillies","Turmeric","Asafoetida (Hing)","Oil","Salt","Coriander"],fullIngredientList:["2 cups cooked rice (cooled)","Juice of 1.5 lemons","1 tsp mustard seeds","8-10 curry leaves","2 green chillies slit","¼ tsp turmeric","¼ cup roasted peanuts","Pinch of asafoetida","2 tbsp oil","Salt to taste"],steps:["Mix turmeric into cooked rice gently. Set aside.","Heat oil in pan. Add mustard seeds. When they splutter add asafoetida, curry leaves, and green chillies.","Add peanuts and toss 1 min.","Add rice and mix gently on low heat.","Add lemon juice and salt. Toss well. Serve with pickle and pappad."],healthySwaps:["Add grated carrot for vitamins","Use brown rice for more fibre","Add edamame for plant protein"],matchReason:"Rice + lemon + mustard seeds creates one of South India's most beloved flavour combinations — bright, tangy, utterly refreshing." },
  { id:"in23",name:"Curd Rice",description:"Cooling comforting rice mixed with curd and a mustard-curry leaf tempering. South India's soul food.",cuisine:"South Indian",mealTypes:["lunch","dinner"],cravings:["comfort","healthy"],time:10,difficulty:"easy",calories:290,calorieLevel:"balanced",protein:"10g",carbs:"48g",fat:"6g",fiber:"1g",diet:["vegetarian","glutenfree"],spiceLevel:"mild",coreIngredients:["White Rice","Curd (Dahi / Yogurt)","Mustard Seeds"],optionalStaples:["Curry Leaves","Green Chillies","Ginger (Fresh)","Pomegranate","Coriander","Salt","Oil","Milk"],fullIngredientList:["2 cups cooked rice","1 cup thick curd","¼ cup milk","1 tsp mustard seeds","8-10 curry leaves","2 green chillies","1 inch ginger grated","Salt to taste","Coriander and pomegranate to garnish"],steps:["Mash cooked rice slightly. Add milk and mix to soften.","Add curd and salt. Mix well until creamy.","Heat oil. Add mustard seeds. When they splutter add curry leaves and green chillies.","Pour tempering over curd rice. Add grated ginger.","Garnish with coriander and pomegranate. Serve at room temperature."],healthySwaps:["Use low-fat curd for fewer calories","Add cucumber for extra cooling effect","Top with grated carrot for vitamins"],matchReason:"Rice + curd + mustard seeds creates thayir sadam — the ultimate South Indian cooling comfort, particularly beloved in summer." },
  { id:"in24",name:"Vegetable Pulao",description:"Fragrant one-pot basmati rice with whole spices, onion, and vegetables. Simple elegance for any occasion.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","aromatic"],time:30,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"8g",carbs:"62g",fat:"10g",fiber:"5g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Basmati Rice","Onion","Carrot"],optionalStaples:["Ghee","Bay Leaves","Cinnamon","Cardamom","Cloves","Cumin Seeds","Peas","Salt","Coriander","Vegetable Stock"],fullIngredientList:["1.5 cups basmati rice","1 onion thinly sliced","1 carrot diced","½ cup peas","2 tbsp ghee","1 bay leaf","1 cinnamon stick","3 cardamom","2 cloves","1 tsp cumin seeds","Salt and 2 cups vegetable stock"],steps:["Wash and soak rice 20 min. Heat ghee in a heavy pot.","Add whole spices (bay leaf, cinnamon, cardamom, cloves, cumin). Let sizzle 30 sec.","Add onion. Fry until golden brown about 8 min.","Add vegetables and cook 3 min. Add drained rice. Toss gently.","Add hot stock and salt. Bring to boil. Cover. Cook on lowest heat 12 min. Rest 5 min. Fluff gently."],healthySwaps:["Use brown basmati for more fibre","Add cashews and raisins for a festive variation","Serve with raita for a cooling side"],matchReason:"Basmati + onion + carrot with whole spices creates a pulao that is fragrant, elegant, and completely different from plain rice." },
  { id:"in25",name:"Aloo Paratha",description:"Flaky whole wheat flatbread stuffed with spiced mashed potato. Punjab's most beloved breakfast — absolutely irresistible.",cuisine:"Punjabi",mealTypes:["breakfast","lunch"],cravings:["comfort","savoury"],time:30,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"8g",carbs:"58g",fat:"12g",fiber:"5g",diet:["vegetarian"],spiceLevel:"medium",coreIngredients:["Wheat Flour (Atta)","Potato","Green Chillies"],optionalStaples:["Onion","Coriander","Cumin Seeds","Red Chilli Powder","Amchur (Dry Mango)","Ghee","Salt","Butter","Curd (Dahi / Yogurt)"],fullIngredientList:["2 cups wheat flour","3 boiled potatoes mashed","2 green chillies finely chopped","1 small onion finely chopped","1 tsp cumin seeds","½ tsp red chilli powder","½ tsp amchur","Fresh coriander","Salt to taste","Ghee or butter for cooking"],steps:["Mix flour with salt and water to make a soft dough. Rest 20 min.","Combine mashed potato, green chillies, onion, cumin, red chilli, amchur, coriander, and salt.","Divide dough into balls. Roll slightly. Place stuffing in centre. Seal and re-roll carefully.","Cook on hot tawa with ghee until golden and crispy on both sides.","Serve hot with butter, curd, and pickle."],healthySwaps:["Use whole wheat atta for full nutrition","Serve with low-fat curd","Reduce ghee and use cooking spray"],matchReason:"Atta + potato + green chillies creates aloo paratha — the ultimate Punjabi breakfast and one of India's most beloved dishes." },
  { id:"in26",name:"Thepla",description:"Gujarati flavoured flatbread with fenugreek leaves, spices, and curd. Perfect for travel, tiffin, or any meal — stays fresh for days.",cuisine:"Gujarati",mealTypes:["breakfast","lunch","snack"],cravings:["savoury","healthy"],time:25,difficulty:"medium",calories:280,calorieLevel:"balanced",protein:"8g",carbs:"44g",fat:"8g",fiber:"6g",diet:["vegetarian"],spiceLevel:"medium",coreIngredients:["Wheat Flour (Atta)","Fenugreek Leaves (Methi)","Curd (Dahi / Yogurt)"],optionalStaples:["Turmeric","Red Chilli Powder","Cumin Seeds","Sesame Seeds","Oil","Salt","Ginger (Fresh)"],fullIngredientList:["2 cups wheat flour","1 cup fresh methi leaves finely chopped","3 tbsp curd","1 tsp turmeric","1 tsp red chilli powder","1 tsp sesame seeds","1 tsp cumin seeds","Salt to taste","Oil for rolling and cooking"],steps:["Mix flour with methi, curd, turmeric, red chilli, sesame, cumin, and salt.","Add water gradually to make a semi-stiff dough. Rest 10 min.","Divide into balls. Roll into thin flatbreads.","Cook on hot tawa brushed with oil. Cook until golden spots appear on both sides.","Serve with curd, pickle, or shrikhand. Stays fresh for 2 days."],healthySwaps:["Add spinach for more iron","Use low-fat curd","Serve with mint-coriander chutney instead of butter"],matchReason:"Atta + methi + curd creates thepla — Gujarat's most iconic flatbread, loved for its bittersweet flavour and incredible keeping quality." },
  // ── Seafood ──
  { id:"in27",name:"Prawn Curry",description:"Fresh prawns in a spiced coconut-tomato masala. Coastal India's most celebratory seafood curry — ready in 25 minutes.",cuisine:"Kerala",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","high-protein"],time:25,difficulty:"medium",calories:360,calorieLevel:"balanced",protein:"28g",carbs:"12g",fat:"20g",fiber:"3g",diet:["glutenfree","dairyfree","highprotein"],spiceLevel:"spicy",coreIngredients:["Shrimp / Prawns","Coconut Milk (canned)","Onion"],optionalStaples:["Tomato","Ginger-Garlic Paste","Green Chillies","Turmeric","Red Chilli Powder","Coriander Powder","Curry Leaves","Mustard Seeds","Oil","Salt"],fullIngredientList:["400g prawns cleaned","400ml coconut milk","1 onion finely chopped","2 tomatoes","1 tsp ginger-garlic paste","2 green chillies","1 tsp red chilli powder","½ tsp turmeric","1 tsp coriander powder","Curry leaves and oil"],steps:["Heat oil. Add curry leaves and onion. Fry until translucent.","Add ginger-garlic paste and green chillies. Cook 2 min.","Add tomatoes and spices. Cook until thick.","Add coconut milk. Bring to a gentle simmer.","Add prawns. Cook 4-5 min until pink. Do not overcook. Serve with rice."],healthySwaps:["Use light coconut milk to reduce calories","Add spinach or drumstick leaves","Serve with brown rice for more fibre"],matchReason:"Prawns + coconut milk + onion creates the most iconic coastal Indian curry — fragrant, rich, and ready in 25 minutes." },
  { id:"in28",name:"Fish Curry",description:"Tangy coconut fish curry with tamarind and South Indian spices. A tropical, vibrant taste of the Indian coast.",cuisine:"South Indian",mealTypes:["lunch","dinner"],cravings:["savoury","tangy","high-protein"],time:25,difficulty:"medium",calories:340,calorieLevel:"balanced",protein:"30g",carbs:"12g",fat:"18g",fiber:"2g",diet:["glutenfree","dairyfree","highprotein"],spiceLevel:"spicy",coreIngredients:["Fish (white fish)","Coconut Milk (canned)","Tomato"],optionalStaples:["Onion","Tamarind","Ginger-Garlic Paste","Red Chilli Powder","Turmeric","Coriander Powder","Curry Leaves","Oil","Salt"],fullIngredientList:["400g firm fish (salmon, tilapia or any white fish)","1 cup coconut milk","2 tomatoes","1 onion","Lemon-sized tamarind soaked","1 tsp red chilli powder","½ tsp turmeric","2 green chillies","Curry leaves and oil"],steps:["Heat oil. Add curry leaves and onion. Fry until translucent.","Add ginger-garlic paste and tomatoes. Cook until soft.","Add spices, tamarind water, and coconut milk. Bring to simmer.","Add fish pieces. Cook 8-10 min until fish is just cooked through.","Season and serve with steamed rice."],healthySwaps:["Use salmon for omega-3 richness","Reduce coconut milk and add more tomato","Serve with a green salad alongside"],matchReason:"Fish + coconut milk + tomato creates a South Indian coastal curry — tangy, coconutty, ready in 25 minutes." },
  // ── Indian Snacks & Light ──
  { id:"in29",name:"Sprouts Chaat",description:"Nutrient-dense mixed sprouts with onion, tomato, chaat masala, and lemon. The most nourishing no-cook Indian snack.",cuisine:"North Indian",mealTypes:["breakfast","lunch","snack"],cravings:["healthy","fresh-light","tangy"],time:10,difficulty:"easy",calories:180,calorieLevel:"light",protein:"14g",carbs:"26g",fat:"3g",fiber:"10g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Mixed Sprouts","Onion","Tomato"],optionalStaples:["Lemon","Coriander","Chaat Masala","Green Chillies","Cucumber","Pomegranate","Salt"],fullIngredientList:["1 cup mixed sprouts","1 onion finely chopped","1 tomato diced","½ cucumber diced","2 tbsp fresh coriander","Juice of 1 lemon","1 tsp chaat masala","Salt to taste","Pomegranate seeds optional"],steps:["Steam or boil sprouts for 3-4 min until just cooked but still have bite. Cool.","Combine sprouts with onion, tomato, cucumber, and coriander.","Add lemon juice, chaat masala, and salt. Toss well.","Garnish with pomegranate seeds.","Serve immediately as a healthy breakfast or snack."],healthySwaps:["Add chickpeas for more protein","Include grated carrot for beta-carotene","Add a dollop of mint chutney for extra flavour"],matchReason:"Mixed sprouts + onion + tomato creates India's most nutritious chaat — raw power, fibre, and protein with zero cooking." },
  { id:"in30",name:"Fruit Chaat",description:"A rainbow of seasonal fruits with chaat masala, black salt, and lemon. India's most joyful no-cook snack.",cuisine:"Pan-Indian",mealTypes:["breakfast","snack"],cravings:["sweet","fresh-light","healthy"],time:10,difficulty:"easy",calories:180,calorieLevel:"light",protein:"2g",carbs:"42g",fat:"1g",fiber:"5g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Apple","Banana","Pomegranate"],optionalStaples:["Mango","Grapes","Orange","Kiwi","Lemon","Chaat Masala","Black Salt","Mint","Honey"],fullIngredientList:["1 apple diced","2 bananas sliced","½ cup pomegranate seeds","1 cup grapes","1 orange peeled and segmented","1 tsp chaat masala","Pinch of black salt","Juice of 1 lemon","Fresh mint leaves"],steps:["Combine all fruits in a large bowl.","Add lemon juice and toss gently to prevent browning.","Sprinkle chaat masala and black salt.","Toss gently. Taste and adjust seasoning.","Garnish with mint leaves and serve immediately."],healthySwaps:["Include berries for antioxidants","Try with a small dollop of Greek yogurt for protein","Add chia seeds for omega-3"],matchReason:"Apple + banana + pomegranate creates fruit chaat — a brilliantly simple Indian snack that proves fruit can be a flavour-packed experience." },
  { id:"in31",name:"Vegetable Sandwich",description:"Toasted Mumbai-style sandwich with potato, cucumber, beetroot, and green chutney. The king of Indian street food sandwiches.",cuisine:"Maharashtrian",mealTypes:["breakfast","snack","lunch"],cravings:["savoury","comfort"],time:15,difficulty:"easy",calories:340,calorieLevel:"balanced",protein:"10g",carbs:"56g",fat:"10g",fiber:"5g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Multigrain Bread","Potato","Onion"],optionalStaples:["Tomato","Cucumber","Beetroot","Butter","Green Chutney","Chaat Masala","Salt"],fullIngredientList:["4 slices multigrain bread","2 boiled potatoes sliced","1 tomato sliced","½ cucumber sliced","½ beetroot sliced","1 onion sliced","Butter","Green mint chutney","Chaat masala and salt"],steps:["Spread butter on bread slices. Add a generous layer of green chutney.","Layer with potato slices, tomato, cucumber, beetroot, and onion.","Sprinkle chaat masala and salt on vegetables.","Press with another slice and toast in sandwich maker or tawa with butter.","Cut diagonally. Serve with extra chutney and tomato ketchup."],healthySwaps:["Use whole wheat bread","Skip butter and use less chutney","Add avocado for healthy fats"],matchReason:"Bread + potato + onion creates Mumbai's famous vegetable sandwich — the kind of street food that makes every neighbourhood chai stall special." },
  { id:"in32",name:"Misal Pav",description:"Spicy sprouted moth bean curry topped with farsan, onion, and lime. Maharashtra's most fiery, beloved street food.",cuisine:"Maharashtrian",mealTypes:["breakfast","lunch","snack"],cravings:["spicy","comfort","tangy"],time:30,difficulty:"medium",calories:420,calorieLevel:"balanced",protein:"16g",carbs:"58g",fat:"12g",fiber:"14g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"veryspicy",coreIngredients:["Mixed Sprouts","Onion","Tomato"],optionalStaples:["Mustard Seeds","Curry Leaves","Coconut (fresh / desiccated)","Oil","Multigrain Bread","Chaat Masala","Lemon","Coriander"],fullIngredientList:["1 cup mixed sprouts (moth beans)","1 onion","2 tomatoes","1 tsp misal masala or garam masala","Mustard seeds and curry leaves","Coconut scraping","4 pav buns","Fried gram mix to top","Onion, coriander, lemon to garnish"],steps:["Heat oil. Add mustard seeds and curry leaves. Add onion. Fry golden.","Add tomatoes and misal masala. Cook until thick.","Add sprouts and water. Pressure cook 2 whistles.","Adjust consistency — should be a gravy.","Serve in bowls topped with fried gram mix, raw onion, coriander, lime. Eat with pav."],healthySwaps:["Reduce oil in tempering","Use less fried gram for fewer calories","Add more sprouts for fibre and protein"],matchReason:"Sprouts + onion + tomato in fiery Maharashtrian masala creates misal — street food that is simultaneously nutritious and explosively flavourful." },
  { id:"in33",name:"Paneer Wrap (Kathi Roll)",description:"Grilled paneer tikka wrapped in a soft roti with onion, chutneys, and chaat masala. Kolkata street food at its finest.",cuisine:"North Indian",mealTypes:["lunch","snack"],cravings:["savoury","comfort"],time:20,difficulty:"easy",calories:420,calorieLevel:"balanced",protein:"18g",carbs:"52g",fat:"16g",fiber:"4g",diet:["vegetarian"],spiceLevel:"medium",coreIngredients:["Paneer","Wheat Flour (Atta)","Onion"],optionalStaples:["Curd (Dahi / Yogurt)","Red Chilli Powder","Garam Masala","Bell Pepper / Capsicum","Chaat Masala","Green Chutney","Salt","Oil"],fullIngredientList:["200g paneer cubed","2 whole wheat rotis or tortillas","1 onion sliced","1 capsicum sliced","3 tbsp curd","1 tsp red chilli powder","½ tsp garam masala","Chaat masala","Green mint chutney and lemon"],steps:["Marinate paneer in curd, red chilli, garam masala, and salt for 10 min.","Cook paneer on a tawa or grill until charred on edges.","On the same tawa, lightly roast rotis with a little oil.","Layer roti with green chutney, onion rings, capsicum, paneer tikka.","Sprinkle chaat masala and lemon juice. Roll tightly."],healthySwaps:["Use multigrain roti for more fibre","Add extra vegetables","Use yogurt instead of cream-based dressing"],matchReason:"Paneer + atta + onion creates the kathi roll — a complete meal in your hand, beloved from Kolkata to Mumbai." },
  { id:"in34",name:"Ragi Dosa",description:"Crispy iron-rich finger millet crepes. Gluten-free, highly nutritious, with a delightful earthy flavour.",cuisine:"South Indian",mealTypes:["breakfast","lunch"],cravings:["healthy","savoury"],time:20,difficulty:"medium",calories:200,calorieLevel:"light",protein:"6g",carbs:"38g",fat:"4g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Ragi (Finger Millet)","Onion","Green Chillies"],optionalStaples:["Maida (All-Purpose Flour)","Cumin Seeds","Curry Leaves","Ginger (Fresh)","Salt","Oil","Coriander"],fullIngredientList:["1 cup ragi flour","2 tbsp rice flour or maida","1 onion finely chopped","2 green chillies","1 tsp cumin seeds","Curry leaves","Grated ginger","Salt to taste","Water to make thin batter"],steps:["Mix ragi flour, rice flour, onion, green chillies, cumin, curry leaves, ginger, and salt.","Add water to make a thin batter (thinner than wheat flour batter).","Rest 10 min. The batter should pour easily.","Pour onto hot tawa and spread into thin circles. Add oil around edges.","Cook until crispy on edges. Fold and serve with sambar and chutney."],healthySwaps:["Add chia seeds for omega-3","Serve with tomato chutney instead of coconut chutney for fewer calories","Add spinach to the batter for more iron"],matchReason:"Ragi + onion + green chillies creates a dosa that is far more nutritious than the regular rice variety — exceptionally high in iron and calcium." },
  { id:"in35",name:"Sambar",description:"Tangy, lentil-vegetable soup from South India with tamarind and sambar powder. The essential accompaniment to idli, dosa, and rice.",cuisine:"South Indian",mealTypes:["lunch","dinner"],cravings:["savoury","tangy","healthy"],time:30,difficulty:"medium",calories:260,calorieLevel:"light",protein:"14g",carbs:"38g",fat:"6g",fiber:"10g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Toor Dal","Tomato","Tamarind"],optionalStaples:["Drumstick (Moringa)","Onion","Sambar Powder","Turmeric","Mustard Seeds","Curry Leaves","Asafoetida (Hing)","Oil","Coriander","Salt"],fullIngredientList:["½ cup toor dal","2 tomatoes","Lemon-sized tamarind soaked","1 drumstick cut in pieces","1 onion","1 tbsp sambar powder","½ tsp turmeric","1 tsp mustard seeds","10 curry leaves","Pinch of asafoetida","Oil and salt"],steps:["Pressure cook toor dal with turmeric until soft.","Boil vegetables (drumstick, tomato, onion) in tamarind water 10 min.","Add cooked dal and sambar powder. Simmer 10 min.","Heat oil for tempering: mustard seeds, curry leaves, asafoetida.","Pour tempering over sambar. Season. Simmer 5 min. Serve with idli, dosa, or rice."],healthySwaps:["Add any seasonal vegetable — bottle gourd, brinjal, pumpkin","Reduce tamarind for less sour flavour","Add drumstick for its exceptional nutritional value"],matchReason:"Toor dal + tomato + tamarind creates sambar — the backbone of South Indian cuisine, as essential as rice itself." },
  { id:"in36",name:"Rasam",description:"Thin, peppery, tangy tomato soup from South India. A digestive, warming liquid gold — India's cure-all when you need comfort.",cuisine:"South Indian",mealTypes:["lunch","dinner"],cravings:["tangy","healthy","comfort"],time:20,difficulty:"easy",calories:120,calorieLevel:"light",protein:"6g",carbs:"16g",fat:"3g",fiber:"4g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"spicy",coreIngredients:["Tomato","Tamarind","Black Pepper"],optionalStaples:["Toor Dal","Garlic","Cumin Seeds","Mustard Seeds","Curry Leaves","Asafoetida (Hing)","Coriander","Oil","Salt"],fullIngredientList:["3 ripe tomatoes","Small ball of tamarind soaked in water","1 tsp black pepper coarsely crushed","1 tsp cumin seeds","4 garlic cloves","Curry leaves and asafoetida","1 tsp rasam powder (optional)","Mustard seeds","Oil and salt","Coriander to garnish"],steps:["Boil tomatoes and tamarind water together 10 min until tomatoes soften.","Mash tomatoes and strain through a sieve for a thin soup.","Add black pepper, garlic, and cumin. Simmer 10 min.","Heat oil. Add mustard seeds, curry leaves, asafoetida. Pour over rasam.","Garnish with coriander. Serve with rice or sip as a healing soup."],healthySwaps:["Add drumstick for extra nutrition","Drink as a soup for colds and coughs","Reduce tamarind for less sour flavour"],matchReason:"Tomato + tamarind + black pepper creates rasam — South India's cure-all soup that is as medicinal as it is deeply delicious." },
  { id:"in37",name:"Chana Dal Tadka",description:"Yellow split chickpeas simmered with spices and a smoky ghee tempering. Heartier and more textured than toor dal.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","healthy"],time:35,difficulty:"easy",calories:300,calorieLevel:"balanced",protein:"16g",carbs:"44g",fat:"8g",fiber:"10g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Chana Dal","Onion","Tomato"],optionalStaples:["Garlic","Ginger (Fresh)","Cumin Seeds","Red Chilli Powder","Turmeric","Amchur (Dry Mango)","Ghee","Coriander","Salt"],fullIngredientList:["1 cup chana dal soaked 30 min","1 onion finely chopped","2 tomatoes","2 tsp ginger-garlic paste","1 tsp cumin seeds","½ tsp red chilli powder","¼ tsp turmeric","½ tsp amchur","2 tbsp ghee","Salt and coriander"],steps:["Pressure cook soaked chana dal with turmeric and salt for 3 whistles until just tender.","Heat ghee. Add cumin seeds. Add onion. Fry until golden.","Add ginger-garlic paste. Add tomatoes and all spices. Cook until oil separates.","Add cooked dal. Simmer 5 min. Adjust consistency.","Garnish with coriander and a squeeze of lemon. Serve with rice or roti."],healthySwaps:["Use olive oil instead of ghee","Add spinach in the last few minutes","Serve with brown rice for more fibre"],matchReason:"Chana dal + onion + tomato creates a dal that is heartier and more textured — deeply satisfying and rich in protein and fibre." },
  // ── More Indian ──
  { id:"in38",name:"Methi Dal",description:"Earthy toor dal elevated with fresh fenugreek leaves and a mustard-cumin tempering. Nutritious, slightly bitter, deeply satisfying.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["healthy","savoury","comfort"],time:30,difficulty:"easy",calories:300,calorieLevel:"balanced",protein:"16g",carbs:"44g",fat:"6g",fiber:"12g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"medium",coreIngredients:["Toor Dal","Fenugreek Leaves (Methi)","Onion"],optionalStaples:["Tomato","Garlic","Cumin Seeds","Mustard Seeds","Turmeric","Red Chilli Powder","Ghee","Salt","Coriander"],fullIngredientList:["1 cup toor dal","1 cup fresh methi leaves chopped","1 onion","2 tomatoes","2 garlic cloves","1 tsp cumin seeds","½ tsp mustard seeds","½ tsp turmeric","½ tsp red chilli powder","1 tbsp ghee","Salt and coriander"],steps:["Pressure cook toor dal with turmeric and salt until soft.","Heat ghee. Add mustard and cumin seeds. Add garlic and onion. Fry until golden.","Add methi leaves. Cook until wilted about 3 min.","Add tomatoes and red chilli powder. Cook until soft.","Add cooked dal. Simmer 5 min. Garnish with coriander."],healthySwaps:["Add extra methi for more iron and bitterness","Use less ghee for a lighter version","Add spinach alongside methi for more greens"],matchReason:"Toor dal + methi + onion creates a nutritionally dense dal that balances the comforting richness of dal with the health benefits of fenugreek." },
  { id:"in39",name:"Paneer Fried Rice",description:"Indo-Chinese paneer fried rice with soy sauce and vegetables. Perfect use of leftover rice with a restaurant-style finish.",cuisine:"Indo-Chinese",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:20,difficulty:"easy",calories:440,calorieLevel:"balanced",protein:"20g",carbs:"56g",fat:"16g",fiber:"4g",diet:["vegetarian"],spiceLevel:"medium",coreIngredients:["Paneer","White Rice","Soy Sauce"],optionalStaples:["Garlic","Ginger (Fresh)","Spring Onion","Bell Pepper / Capsicum","Carrot","Peas","Sesame Oil","Oil","Black Pepper"],fullIngredientList:["2 cups cooked rice (cold)","150g paneer cubed","2 tbsp soy sauce","1 capsicum","1 carrot diced","¼ cup peas","3 garlic cloves","1 inch ginger","Spring onion","Sesame oil and oil","Black pepper"],steps:["Fry paneer cubes until golden on all sides. Set aside.","Heat oil in wok over high heat. Add garlic and ginger. Fry 30 sec.","Add vegetables. Stir-fry on high heat 3 min.","Add rice. Toss on high heat 3 min breaking clumps.","Add soy sauce, paneer, and spring onion. Toss well. Finish with sesame oil."],healthySwaps:["Use brown rice for more fibre","Add more vegetables","Reduce soy sauce for less sodium"],matchReason:"Paneer + rice + soy sauce creates Indo-Chinese fried rice — the perfect way to use leftover rice with bold, restaurant-style flavour." },
  { id:"in40",name:"Lauki Chana Dal",description:"Bottle gourd cooked slowly with chana dal. Light, digestive, and perfect for summer — nourishing simplicity.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["healthy","comfort","light"],time:35,difficulty:"easy",calories:260,calorieLevel:"light",protein:"14g",carbs:"40g",fat:"6g",fiber:"10g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Chana Dal","Bottle Gourd (Lauki)","Onion"],optionalStaples:["Tomato","Ginger (Fresh)","Cumin Seeds","Turmeric","Red Chilli Powder","Ghee","Coriander","Salt"],fullIngredientList:["½ cup chana dal (soaked 30 min)","1 small lauki peeled and cubed","1 onion","1 tomato","1 inch ginger","1 tsp cumin seeds","½ tsp turmeric","½ tsp red chilli powder","1 tbsp ghee","Salt and coriander"],steps:["Heat ghee. Add cumin seeds. Add onion. Fry until golden.","Add ginger and tomato. Cook until soft.","Add soaked chana dal, lauki, turmeric, red chilli, and 2.5 cups water.","Pressure cook 3 whistles until dal and lauki are soft.","Season. Garnish with coriander. Serve with rice or roti."],healthySwaps:["Add spinach for iron","Use less ghee","Lauki is excellent for weight management and digestion"],matchReason:"Chana dal + lauki creates a light, digestive-friendly dal — particularly nourishing during summer or when you need something gentle." },
  { id:"in41",name:"Aloo Beans Sabzi",description:"Dry potato and green beans sabzi with cumin and a squeeze of lemon. Simple, nutritious, everyday Indian home cooking.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","healthy","light"],time:20,difficulty:"easy",calories:220,calorieLevel:"light",protein:"5g",carbs:"36g",fat:"6g",fiber:"7g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Potato","Green Beans","Onion"],optionalStaples:["Cumin Seeds","Turmeric","Red Chilli Powder","Coriander Powder","Amchur (Dry Mango)","Oil","Salt","Coriander"],fullIngredientList:["2 potatoes cubed","200g green beans cut into pieces","1 small onion","1 tsp cumin seeds","½ tsp turmeric","½ tsp red chilli powder","½ tsp coriander powder","2 tbsp oil","Lemon juice and salt"],steps:["Heat oil. Add cumin seeds. Add onion. Cook until translucent.","Add potato. Cook 5 min on medium heat.","Add green beans, all spices, and a splash of water.","Cover and cook 10-12 min until both are tender.","Add lemon juice, season. Garnish with coriander."],healthySwaps:["Add chickpeas for extra protein","Use olive oil for healthier fat","Add capsicum for more vitamins"],matchReason:"Potato + green beans + onion creates a simple, satisfying everyday sabzi that requires minimal effort and uses what is always in your kitchen." },
  { id:"in42",name:"Bread Upma",description:"Leftover bread transformed into a flavourful South Indian-style upma with onion and tomato. Zero-waste cooking at its most delicious.",cuisine:"South Indian",mealTypes:["breakfast","snack"],cravings:["savoury","comfort"],time:15,difficulty:"easy",calories:300,calorieLevel:"balanced",protein:"8g",carbs:"46g",fat:"10g",fiber:"4g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Multigrain Bread","Onion","Tomato"],optionalStaples:["Green Chillies","Mustard Seeds","Curry Leaves","Turmeric","Peanuts","Oil","Lemon","Coriander","Salt"],fullIngredientList:["4-5 slices bread broken into pieces","1 onion finely chopped","1 tomato chopped","2 green chillies","1 tsp mustard seeds","Curry leaves","¼ tsp turmeric","2 tbsp oil","Peanuts optional","Lemon juice and coriander"],steps:["Cut bread into small cubes. Set aside.","Heat oil. Add mustard seeds. When they splutter add curry leaves and green chillies.","Add onion. Fry until translucent. Add tomato and turmeric.","Add peanuts if using and cook 2 min. Add bread pieces.","Toss gently on low heat 3 min. Add lemon juice. Season and serve."],healthySwaps:["Use multigrain bread for more fibre","Add vegetables for more nutrition","Use less oil with a non-stick pan"],matchReason:"Bread + onion + tomato creates bread upma — a brilliantly frugal South Indian dish that transforms stale bread into breakfast gold." },
  { id:"in43",name:"Masala Egg Toast",description:"Desi-style egg toast — crispy bread fried with a spiced egg coating. Street food breakfast in 8 minutes.",cuisine:"North Indian",mealTypes:["breakfast","snack"],cravings:["savoury","comfort"],time:8,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"16g",carbs:"32g",fat:"16g",fiber:"2g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Eggs","Multigrain Bread","Butter"],optionalStaples:["Onion","Green Chillies","Coriander","Turmeric","Salt","Red Chilli Powder"],fullIngredientList:["2 eggs","3 slices bread","1 tbsp butter","½ small onion finely chopped","1 green chilli","Fresh coriander","Pinch of turmeric","Salt and red chilli powder"],steps:["Beat eggs with onion, green chilli, coriander, turmeric, red chilli, and salt.","Dip bread slices in egg mixture coating both sides.","Heat butter in pan over medium heat.","Fry coated bread 2 min per side until golden and egg is set.","Serve immediately with ketchup or green chutney."],healthySwaps:["Use multigrain bread","Add spinach to the egg mixture","Use olive oil instead of butter"],matchReason:"Eggs + bread + butter with Indian spicing creates masala toast — the desi French toast that every Indian household knows and loves." },
  { id:"in44",name:"Kaddu Ki Sabzi (Pumpkin)",description:"Sweet and slightly tangy dry pumpkin sabzi with mustard seeds. A Rajasthani classic that pairs beautifully with plain dal.",cuisine:"Rajasthani",mealTypes:["lunch","dinner"],cravings:["savoury","sweet","comfort"],time:25,difficulty:"easy",calories:180,calorieLevel:"light",protein:"3g",carbs:"28g",fat:"6g",fiber:"5g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Pumpkin","Onion","Mustard Seeds"],optionalStaples:["Green Chillies","Turmeric","Red Chilli Powder","Coriander Powder","Amchur (Dry Mango)","Jaggery (Gur)","Oil","Salt","Coriander"],fullIngredientList:["400g pumpkin peeled and cubed","1 onion","2 green chillies","1 tsp mustard seeds","¼ tsp turmeric","½ tsp red chilli powder","½ tsp amchur","1 tsp jaggery optional","2 tbsp oil","Salt and coriander"],steps:["Heat oil. Add mustard seeds until they splutter.","Add onion and green chillies. Cook until translucent.","Add pumpkin, turmeric, red chilli, and a splash of water.","Cover and cook 15-18 min until soft. Add amchur and jaggery.","Toss gently. Garnish with coriander. Serve with roti."],healthySwaps:["Skip jaggery if watching sugar","Add chickpeas for protein","Sweet potato can substitute pumpkin"],matchReason:"Pumpkin + onion + mustard seeds creates kaddu sabzi — a sweet-tangy vegetable dish that pairs beautifully with plain dal and roti." },
  { id:"in45",name:"Patta Gobi Stir-Fry",description:"Quick, dry cabbage sabzi with mustard seeds, turmeric, and green chillies. The most underrated Indian vegetable dish.",cuisine:"South Indian",mealTypes:["lunch","dinner"],cravings:["healthy","savoury","light"],time:15,difficulty:"easy",calories:160,calorieLevel:"light",protein:"4g",carbs:"20g",fat:"6g",fiber:"6g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Cabbage","Onion","Green Chillies"],optionalStaples:["Mustard Seeds","Curry Leaves","Turmeric","Red Chilli Powder","Asafoetida (Hing)","Oil","Salt","Lemon","Coriander"],fullIngredientList:["1 small cabbage finely shredded","1 onion sliced","2 green chillies slit","1 tsp mustard seeds","Curry leaves","¼ tsp turmeric","½ tsp red chilli powder","Pinch of asafoetida","2 tbsp oil","Salt and lemon juice"],steps:["Heat oil. Add mustard seeds. When they splutter add curry leaves, asafoetida, and green chillies.","Add onion. Cook 2 min until translucent.","Add shredded cabbage. Toss on high heat.","Add turmeric, red chilli, and salt. Toss well.","Cook uncovered 8-10 min until cabbage is tender. Finish with lemon."],healthySwaps:["Add grated carrot for colour and nutrients","Include peas for sweetness and protein","Add fresh coconut for South Indian flair"],matchReason:"Cabbage + onion + green chillies creates the most economical, nutritious, quick sabzi in Indian cooking — never underestimate it." },
  { id:"in46",name:"Soya Chunks Curry",description:"Protein-packed soya chunks in a robust onion-tomato masala. Budget-friendly, high-protein Indian comfort food.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["savoury","high-protein","comfort"],time:30,difficulty:"easy",calories:340,calorieLevel:"balanced",protein:"28g",carbs:"28g",fat:"12g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Soya Chunks","Onion","Tomato"],optionalStaples:["Ginger-Garlic Paste","Red Chilli Powder","Coriander Powder","Garam Masala","Turmeric","Oil","Salt","Coriander","Curd (Dahi / Yogurt)"],fullIngredientList:["1 cup soya chunks (soaked and squeezed)","2 onions","3 tomatoes","2 tsp ginger-garlic paste","1 tsp red chilli powder","1 tsp coriander powder","½ tsp garam masala","¼ tsp turmeric","2 tbsp oil","Salt and coriander"],steps:["Soak soya chunks in hot water 15 min. Squeeze out all water.","Heat oil. Fry onion until golden about 7 min. Add ginger-garlic paste.","Add tomatoes and all spices. Cook until masala releases oil.","Add soya chunks. Toss well. Add ½ cup water.","Simmer 10 min until chunks absorb the masala. Garnish with coriander."],healthySwaps:["Marinate soya in curd and spices before cooking for better texture","Add vegetables like capsicum and peas","Serve with roti for a complete protein meal"],matchReason:"Soya chunks + onion + tomato creates a protein-rich curry that rivals meat in satisfaction — economical, nutritious, and genuinely tasty." },
  { id:"in47",name:"Vegetable Biryani",description:"Aromatic layered biryani with spiced vegetables, saffron-infused rice, and fried onions. A celebration rice.",cuisine:"Mughlai",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","aromatic"],time:60,difficulty:"advanced",calories:520,calorieLevel:"high",protein:"12g",carbs:"78g",fat:"16g",fiber:"7g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"medium",coreIngredients:["Basmati Rice","Onion","Curd (Dahi / Yogurt)"],optionalStaples:["Saffron","Ghee","Cinnamon","Cardamom","Cloves","Bay Leaves","Carrot","Peas","Mint","Garam Masala"],fullIngredientList:["2 cups basmati rice","2 cups mixed vegetables","2 large onions fried golden","1 cup thick curd","½ tsp saffron in warm milk","2 tbsp ghee","1 tbsp biryani masala","Whole spices (bay leaf, cinnamon, cloves, cardamom)","Mint leaves and salt"],steps:["Parboil basmati rice with whole spices until 70% cooked. Drain.","Marinate vegetables in curd, biryani masala, and salt for 30 min.","Layer: marinated vegetables, then parboiled rice, then fried onions, mint, and saffron milk.","Cover tightly with foil then lid. Cook on low heat (dum) for 25-30 min.","Open carefully. Mix gently from the bottom. Serve with raita."],healthySwaps:["Use low-fat curd for marinade","Roast onions instead of deep-frying","Add chickpeas for plant protein"],matchReason:"Basmati + onion + curd creates biryani — the crown jewel of Indian rice dishes, reserved for occasions worth celebrating." },
  { id:"in48",name:"Sprouts Khichdi",description:"Nutritious one-pot khichdi upgraded with mixed sprouts, moong dal, and warming spices. Power-packed comfort food.",cuisine:"North Indian",mealTypes:["lunch","dinner"],cravings:["healthy","comfort"],time:30,difficulty:"easy",calories:360,calorieLevel:"balanced",protein:"18g",carbs:"58g",fat:"8g",fiber:"12g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Moong Dal (Yellow Split)","White Rice","Mixed Sprouts"],optionalStaples:["Cumin Seeds","Ghee","Ginger (Fresh)","Turmeric","Salt","Asafoetida (Hing)","Coriander"],fullIngredientList:["½ cup moong dal","½ cup rice","½ cup mixed sprouts","1 tsp cumin seeds","1 tbsp ghee","1 inch ginger grated","¼ tsp turmeric","Pinch of asafoetida","Salt and fresh coriander"],steps:["Wash rice and dal together. Soak 15 min.","Heat ghee. Add cumin seeds and asafoetida. Add ginger.","Add rice, dal, and sprouts. Roast gently 2 min.","Add 3.5 cups water, turmeric, and salt. Pressure cook 3 whistles.","Adjust consistency. Garnish with coriander. Serve with pickle and curd."],healthySwaps:["Use brown rice for more fibre","Add grated carrot or spinach","Top with extra raw sprouts after cooking for crunch"],matchReason:"Moong dal + rice + mixed sprouts creates the most nutritious khichdi — complete protein, high fibre, and deeply comforting for body and soul." },
  { id:"in49",name:"Chicken Stir-Fry (Indo-Chinese)",description:"Crispy chicken tossed in a bold Indo-Chinese sauce with capsicum and spring onion. A restaurant favourite made at home.",cuisine:"Indo-Chinese",mealTypes:["lunch","dinner"],cravings:["spicy","savoury","high-protein"],time:25,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"34g",carbs:"18g",fat:"18g",fiber:"3g",diet:["dairyfree","highprotein"],spiceLevel:"spicy",coreIngredients:["Chicken Breast","Soy Sauce","Bell Pepper / Capsicum"],optionalStaples:["Onion","Garlic","Ginger (Fresh)","Green Chillies","Hot Sauce","Rice Vinegar","Cornstarch","Oil","Spring Onion"],fullIngredientList:["400g chicken breast thinly sliced","1 capsicum bell pepper","1 onion","3 garlic cloves","1 inch ginger","2 tbsp soy sauce","1 tbsp hot sauce","1 tsp vinegar","Cornstarch for coating","Oil and spring onion to garnish"],steps:["Coat chicken in cornstarch, salt, and a dash of soy sauce.","Pan fry chicken until crispy. Set aside.","In a wok stir-fry garlic and ginger on high heat. Add onion and capsicum.","Add soy sauce, hot sauce, and vinegar. Toss well.","Add fried chicken. Toss on high heat 2 min. Garnish with spring onion."],healthySwaps:["Air fry the chicken instead of pan frying","Use low-sodium soy sauce","Add broccoli for extra nutrition"],matchReason:"Chicken + soy sauce + bell pepper in Indo-Chinese style creates a dish that defines India's most popular restaurant cuisine." },
  { id:"in50",name:"Vegetable Paratha",description:"Whole wheat flatbread stuffed with mixed vegetables. Nutritious, portable, versatile — a wholesome meal any time of day.",cuisine:"North Indian",mealTypes:["breakfast","lunch"],cravings:["savoury","healthy","comfort"],time:25,difficulty:"medium",calories:320,calorieLevel:"balanced",protein:"8g",carbs:"52g",fat:"8g",fiber:"6g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Wheat Flour (Atta)","Cauliflower","Onion"],optionalStaples:["Carrot","Peas","Green Chillies","Coriander","Cumin Seeds","Oil","Salt"],fullIngredientList:["2 cups wheat flour","1 cup grated cauliflower","½ cup grated carrot","¼ cup peas","1 small onion","2 green chillies","½ tsp cumin","Salt and coriander","Oil for cooking"],steps:["Make soft dough with flour, salt, and water. Rest 15 min.","Mix vegetables with spices for filling.","Roll dough ball flat, place filling, seal, and roll gently.","Cook on tawa with oil until golden on both sides about 3 min per side.","Serve with curd and pickle."],healthySwaps:["Load up with more vegetables","Use olive oil instead of ghee","Serve with mint chutney instead of butter"],matchReason:"Atta + cauliflower + onion creates a nutritious paratha stuffed with goodness — the healthy Indian flatbread that travels beautifully." },
  // ── International ──
  { id:"int01",name:"Shakshuka",description:"Eggs poached in a spiced tomato sauce with onion and pepper. North African comfort food in a single pan.",cuisine:"Middle Eastern",mealTypes:["breakfast","lunch"],cravings:["savoury","spicy","comfort"],time:25,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"18g",carbs:"22g",fat:"16g",fiber:"5g",diet:["vegetarian","dairyfree","glutenfree"],spiceLevel:"spicy",coreIngredients:["Eggs","Tomato","Onion"],optionalStaples:["Olive Oil","Garlic","Cumin Seeds","Paprika","Red Chilli Powder","Coriander"],fullIngredientList:["4 eggs","4 tomatoes or 400g canned","1 onion sliced","3 garlic cloves","1 tsp cumin","1 tsp paprika","Olive oil","Parsley to garnish"],steps:["Sauté onion in olive oil 5 min. Add garlic, cumin, paprika, chili flakes.","Add tomatoes. Simmer 12-15 min until sauce thickens.","Make wells in sauce. Crack in eggs. Cover and cook 6-8 min.","Garnish with parsley. Serve with crusty bread."],healthySwaps:["Add a handful of spinach before the eggs","Stir in chickpeas for extra protein","Use whole wheat bread for serving"],matchReason:"Eggs and tomatoes are the soul of shakshuka — a deeply satisfying one-pan meal loved across the Middle East." },
  { id:"int02",name:"Pasta Marinara",description:"Al dente spaghetti in a bright, garlicky tomato sauce. Simple Italian perfection in 20 minutes.",cuisine:"Italian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:20,difficulty:"easy",calories:440,calorieLevel:"balanced",protein:"14g",carbs:"76g",fat:"10g",fiber:"5g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Spaghetti","Canned Tomatoes","Garlic"],optionalStaples:["Olive Oil","Basil","Red Chilli Powder","Salt","Parmesan","Onion"],fullIngredientList:["300g spaghetti","400g canned tomatoes","4 garlic cloves sliced","3 tbsp olive oil","Fresh basil","Chili flakes","Salt and parmesan to serve"],steps:["Cook spaghetti in salted boiling water until al dente.","Heat olive oil. Fry garlic until golden. Add chili flakes.","Add canned tomatoes. Simmer 12-15 min. Season generously.","Toss hot pasta into sauce. Add pasta water as needed.","Top with fresh basil and parmesan."],healthySwaps:["Use whole wheat pasta for more fibre","Add spinach or courgette to the sauce","Try lentil pasta for extra protein"],matchReason:"Spaghetti + canned tomatoes + garlic is the Neapolitan formula for perfection — bright, simple, timeless." },
  { id:"int03",name:"Egg Fried Rice",description:"Quick, satisfying Chinese-style fried rice with scrambled eggs and vegetables. Better than takeout.",cuisine:"Chinese",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:15,difficulty:"easy",calories:420,calorieLevel:"balanced",protein:"16g",carbs:"58g",fat:"12g",fiber:"3g",diet:["vegetarian","dairyfree"],spiceLevel:"mild",coreIngredients:["Eggs","White Rice","Soy Sauce"],optionalStaples:["Sesame Oil","Garlic","Spring Onion","Frozen Peas","Carrot","Vegetable Oil"],fullIngredientList:["2 cups cooked rice (day-old best)","3 eggs beaten","2 tbsp soy sauce","1 tsp sesame oil","2 garlic cloves","½ cup frozen peas","1 carrot diced"],steps:["Heat oil in wok over high heat. Fry garlic and carrot 2 min.","Push veg aside. Scramble eggs on other side until just set.","Add rice. Stir-fry together 3-4 min breaking up clumps.","Add peas and soy sauce. Toss well. Finish with sesame oil."],healthySwaps:["Use brown rice for more fibre","Replace half the rice with cauliflower rice","Add edamame for plant protein"],matchReason:"Rice + eggs + soy sauce is the classic fried rice formula — simple, fast, and deeply satisfying." },
  { id:"int04",name:"Thai Green Curry",description:"Fragrant coconut milk curry with green curry paste, vegetables, and jasmine rice. Aromatic, vibrant, absolutely delicious.",cuisine:"Thai",mealTypes:["lunch","dinner"],cravings:["spicy","savoury","comfort"],time:25,difficulty:"easy",calories:480,calorieLevel:"balanced",protein:"14g",carbs:"52g",fat:"22g",fiber:"6g",diet:["vegetarian","vegan","glutenfree","dairyfree"],spiceLevel:"spicy",coreIngredients:["Coconut Milk (canned)","Green Curry Paste","Jasmine Rice"],optionalStaples:["Firm Tofu","Broccoli","Bell Pepper / Capsicum","Zucchini / Courgette","Fish Sauce","Lemongrass","Lime","Thai Basil"],fullIngredientList:["400ml coconut milk","2 tbsp green curry paste","1.5 cups jasmine rice","250g firm tofu or chicken","1 cup mixed vegetables","Fish sauce or soy sauce","Lime juice","Thai basil or regular basil"],steps:["Cook jasmine rice.","Heat 2 tbsp coconut milk in pan. Fry curry paste until fragrant 2 min.","Add remaining coconut milk. Bring to simmer.","Add protein and vegetables. Cook 8-10 min.","Season with fish sauce and lime. Serve over rice with fresh basil."],healthySwaps:["Add more vegetables","Use light coconut milk","Serve with brown jasmine rice"],matchReason:"Coconut milk + green curry paste + jasmine rice creates Thai green curry — one of the most aromatic dishes in Asian cuisine." },
  { id:"int05",name:"Banana Pancakes",description:"Two-ingredient banana pancakes — naturally sweet, fluffy, ready in minutes. No flour, no refined sugar needed.",cuisine:"American",mealTypes:["breakfast"],cravings:["sweet","healthy"],time:12,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"12g",carbs:"36g",fat:"10g",fiber:"4g",diet:["vegetarian","glutenfree","dairyfree"],spiceLevel:"mild",coreIngredients:["Eggs","Banana"],optionalStaples:["Cinnamon","Vanilla Extract","Coconut Oil","Honey","Mixed Berries"],fullIngredientList:["2 ripe bananas","2 eggs","Pinch of cinnamon","½ tsp vanilla","Coconut oil for frying","Fresh fruit and honey to serve"],steps:["Mash bananas until smooth. Whisk in eggs, cinnamon, and vanilla.","Add 1 tsp baking powder for fluffier pancakes.","Heat coconut oil in non-stick pan. Drop tablespoons of batter in.","Cook 2 min until bubbles form. Flip. Cook 1 more min.","Serve with honey, fresh berries, and a dollop of Greek yogurt."],healthySwaps:["Add chia seeds for omega-3","Top with nut butter instead of syrup","Add blueberries to batter"],matchReason:"Bananas + eggs is all you need for naturally sweet pancakes. No flour, no refined sugar — effortless and delicious." },
  { id:"int06",name:"French Toast",description:"Golden, custardy French toast with cinnamon. A luxurious breakfast in 10 minutes.",cuisine:"French",mealTypes:["breakfast"],cravings:["sweet","comfort"],time:12,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"14g",carbs:"44g",fat:"16g",fiber:"2g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Eggs","Sourdough Bread","Butter"],optionalStaples:["Milk","Cinnamon","Vanilla Extract","Maple Syrup","Mixed Berries"],fullIngredientList:["3 eggs","4 thick slices bread","¼ cup milk","½ tsp cinnamon","½ tsp vanilla","Butter for frying","Maple syrup to serve"],steps:["Whisk eggs, milk, cinnamon, and vanilla in a shallow bowl.","Dip each bread slice for 20 seconds per side.","Cook in butter 2-3 min per side until golden.","Serve with maple syrup and fresh fruit."],healthySwaps:["Use wholegrain bread for more fibre","Top with berries instead of syrup","Use oat milk"],matchReason:"Eggs and bread transform into something magical here — a classic breakfast worth making on any slow morning." },
  { id:"int07",name:"Soy Glazed Salmon",description:"Miso-soy glazed salmon with sesame and spring onion. Japanese-inspired dinner ready in 20 minutes.",cuisine:"Japanese",mealTypes:["lunch","dinner"],cravings:["savoury","healthy","high-protein"],time:20,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"38g",carbs:"12g",fat:"18g",fiber:"1g",diet:["glutenfree","dairyfree","highprotein"],spiceLevel:"mild",coreIngredients:["Salmon","Soy Sauce","Miso Paste"],optionalStaples:["Honey","Sesame Oil","Garlic","Ginger (Fresh)","Sesame Seeds","Spring Onion","Jasmine Rice"],fullIngredientList:["2 salmon fillets","2 tbsp soy sauce","1 tbsp miso paste","1 tbsp honey","1 tsp sesame oil","2 garlic cloves","Grated ginger","Sesame seeds and spring onion to garnish"],steps:["Mix soy sauce, miso, honey, sesame oil, and ginger for glaze.","Marinate salmon 10 min.","Heat pan or preheat oven to 200°C. Cook salmon 4-5 min per side.","Brush with remaining glaze in last minute.","Garnish with sesame seeds and spring onion. Serve with rice."],healthySwaps:["Bake instead of pan-fry for less oil","Add steamed broccoli on the side","Serve with cauliflower rice to reduce carbs"],matchReason:"Salmon + soy sauce + miso creates a Japanese-inspired glaze that brings restaurant quality to a 20-minute weeknight dinner." },
  { id:"int08",name:"Avocado Toast",description:"Elevated avocado toast with feta, lemon, and chili. A nutritious, satisfying breakfast in 8 minutes.",cuisine:"American",mealTypes:["breakfast","lunch"],cravings:["savoury","healthy","fresh-light"],time:8,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"10g",carbs:"28g",fat:"22g",fiber:"9g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Avocado","Sourdough Bread","Lemon"],optionalStaples:["Feta Cheese","Chili Flakes","Sesame Seeds","Spring Onion","Olive Oil","Salt"],fullIngredientList:["2 slices sourdough","1 ripe avocado","Juice of ½ lemon","2 tbsp feta cheese","Chili flakes","Sesame seeds","Spring onion and olive oil"],steps:["Toast sourdough until deep golden.","Mash avocado with lemon juice, salt, and a drizzle of olive oil.","Spread generously on toast.","Top with feta, chili flakes, and sesame seeds.","Garnish with sliced spring onion."],healthySwaps:["Add a poached egg for protein","Use wholegrain bread for more fibre","Try with pickled cucumber on top"],matchReason:"Avocado + sourdough + lemon creates a toast that is both beautiful and deeply nourishing — a modern classic for good reason." },
  { id:"int09",name:"Mushroom Pasta",description:"Creamy garlic mushroom pasta with parmesan and thyme. An Italian weeknight classic that feels indulgent.",cuisine:"Italian",mealTypes:["lunch","dinner"],cravings:["comfort","savoury"],time:25,difficulty:"easy",calories:520,calorieLevel:"high",protein:"18g",carbs:"68g",fat:"20g",fiber:"4g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Penne","Mushrooms","Garlic"],optionalStaples:["Heavy Cream","Parmesan","Butter","Thyme","Parsley","Salt","Olive Oil"],fullIngredientList:["300g penne","400g mixed mushrooms sliced","4 garlic cloves","100ml heavy cream","50g parmesan","2 tbsp butter","Fresh thyme and parsley","Salt and pepper"],steps:["Cook pasta in salted boiling water until al dente.","Sauté mushrooms in butter over high heat until golden. Season.","Add garlic and thyme. Cook 1 min.","Add cream. Simmer 3 min. Add pasta and toss.","Finish with parmesan and parsley."],healthySwaps:["Use oat cream for lighter version","Half and half pasta with courgette noodles","Add spinach for iron"],matchReason:"Pasta + mushrooms + garlic creates a dish with deep, earthy umami that is both comforting and elegant." },
  { id:"int10",name:"Mediterranean Grain Bowl",description:"Quinoa with roasted vegetables, feta, olives, and a lemon-herb dressing. A nourishing, vibrant bowl.",cuisine:"Mediterranean",mealTypes:["lunch","dinner"],cravings:["healthy","fresh-light","savoury"],time:30,difficulty:"easy",calories:420,calorieLevel:"balanced",protein:"16g",carbs:"54g",fat:"16g",fiber:"8g",diet:["vegetarian","glutenfree"],spiceLevel:"mild",coreIngredients:["Quinoa","Feta Cheese","Lemon"],optionalStaples:["Bell Pepper / Capsicum","Zucchini / Courgette","Olives","Cucumber","Tomato","Olive Oil","Parsley","Garlic"],fullIngredientList:["1 cup quinoa","200g feta cheese","Juice of 1 lemon","1 capsicum","1 courgette","½ cup olives","1 cucumber","Cherry tomatoes","Olive oil, parsley, garlic for dressing"],steps:["Cook quinoa. Let cool slightly.","Roast capsicum and courgette at 200°C with olive oil 20 min.","Make dressing: whisk lemon juice, olive oil, garlic, and parsley.","Combine quinoa, roasted veg, cucumber, tomatoes, and olives.","Top with feta and drizzle with dressing."],healthySwaps:["Use dairy-free feta for vegan version","Add chickpeas for more protein","Include leafy greens as a base"],matchReason:"Quinoa + feta + lemon creates a Mediterranean bowl that is as nourishing as it is beautiful — perfect for meal prep." },
  { id:"int11",name:"Black Bean Burrito Bowl",description:"Spiced black beans with rice, corn, avocado, and lime sour cream. Mexican comfort that comes together quickly.",cuisine:"Mexican",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","healthy"],time:25,difficulty:"easy",calories:520,calorieLevel:"high",protein:"18g",carbs:"72g",fat:"16g",fiber:"16g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"spicy",coreIngredients:["Black Beans","White Rice","Avocado"],optionalStaples:["Corn","Tomato","Lime","Cumin Seeds","Paprika","Coriander","Sour Cream","Hot Sauce"],fullIngredientList:["1 can black beans","1.5 cups cooked rice","1 avocado","Corn kernels","2 tomatoes diced","Juice of 2 limes","1 tsp cumin","Smoked paprika","Fresh coriander","Sour cream to serve"],steps:["Season black beans with cumin, paprika, salt, and lime juice. Heat in pan 5 min.","Warm rice.","Mash avocado with lime juice and salt.","Build bowl: rice, beans, corn, tomatoes, avocado mash.","Top with coriander, sour cream, and hot sauce."],healthySwaps:["Use brown rice for more fibre","Coconut yogurt instead of sour cream","Add roasted sweet potato for more substance"],matchReason:"Black beans + rice + avocado creates the perfect burrito bowl — everything you need in one satisfying, plant-powered meal." },
  { id:"int12",name:"Crispy Tofu Stir-Fry",description:"Crispy golden tofu with broccoli and bell pepper in a garlicky soy-sesame sauce. A complete plant-based meal.",cuisine:"Chinese",mealTypes:["lunch","dinner"],cravings:["savoury","healthy","high-protein"],time:25,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"22g",carbs:"28g",fat:"18g",fiber:"6g",diet:["vegetarian","vegan","dairyfree","glutenfree","highprotein"],spiceLevel:"medium",coreIngredients:["Firm Tofu","Soy Sauce","Broccoli"],optionalStaples:["Sesame Oil","Garlic","Ginger (Fresh)","Bell Pepper / Capsicum","Sesame Seeds","Spring Onion","Cornstarch","Honey"],fullIngredientList:["400g firm tofu pressed and cubed","300g broccoli florets","1 capsicum","3 garlic cloves","2 tbsp soy sauce","1 tbsp sesame oil","1 tbsp honey","Grated ginger","Cornstarch for coating","Spring onion and sesame seeds"],steps:["Toss tofu in cornstarch. Pan fry until golden and crispy on all sides. Set aside.","Stir-fry broccoli and capsicum on high heat 4 min.","Add garlic and ginger. Cook 30 sec.","Make sauce: soy sauce, sesame oil, honey, and ginger. Add to pan.","Add tofu. Toss to coat. Garnish with sesame seeds and spring onion."],healthySwaps:["Bake tofu at 200°C for 25 min instead of frying","Add edamame for more protein","Use tamari for gluten-free version"],matchReason:"Tofu + soy sauce + broccoli creates a stir-fry that delivers the satisfying crunch and umami depth of restaurant Chinese food." },
  { id:"int13",name:"Overnight Oats",description:"Creamy, no-cook overnight oats with berries, banana, and honey. A nutritious breakfast that makes itself while you sleep.",cuisine:"American",mealTypes:["breakfast"],cravings:["healthy","sweet"],time:5,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"14g",carbs:"58g",fat:"10g",fiber:"8g",diet:["vegetarian"],spiceLevel:"mild",coreIngredients:["Rolled Oats","Milk","Mixed Berries"],optionalStaples:["Greek Yogurt","Honey","Banana","Chia Seeds","Vanilla Extract","Almond Butter","Cinnamon"],fullIngredientList:["1 cup rolled oats","1 cup milk or oat milk","½ cup Greek yogurt","1 tbsp chia seeds","2 tbsp honey","½ tsp vanilla","Mixed berries","1 banana sliced"],steps:["Combine oats, milk, yogurt, chia seeds, honey, and vanilla.","Stir well. Cover and refrigerate overnight.","In the morning stir well. Add a splash of milk if too thick.","Top with mixed berries and banana.","Add a drizzle of almond butter for more protein."],healthySwaps:["Use oat milk for dairy-free version","Reduce honey and add ripe banana for sweetness","Top with nuts for healthy fats"],matchReason:"Oats + milk + berries creates overnight oats — the most effortless nutritious breakfast that is ready before you wake up." },
  { id:"int14",name:"Spinach Omelette",description:"A light, protein-rich omelette with wilted spinach and feta. Done in 12 minutes — a perfect quick breakfast.",cuisine:"French",mealTypes:["breakfast","lunch"],cravings:["savoury","healthy","high-protein"],time:12,difficulty:"easy",calories:280,calorieLevel:"light",protein:"22g",carbs:"4g",fat:"18g",fiber:"2g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Spinach"],optionalStaples:["Butter","Feta Cheese","Salt","Parsley"],fullIngredientList:["3 large eggs","1 cup fresh spinach","1 tbsp butter","¼ cup feta optional","Salt and pepper"],steps:["Whisk eggs with a pinch of salt until frothy.","Melt butter in a non-stick pan. Wilt spinach 1 min.","Pour in eggs. Gently pull edges inward as they set.","When almost set add feta and fold in half. Serve immediately."],healthySwaps:["Use olive oil instead of butter","Add mushrooms for extra volume","Try nutritional yeast instead of feta for dairy-free"],matchReason:"Eggs and spinach are a classic combination — quick, protein-rich, and endlessly satisfying for any time of day." },
  { id:"int15",name:"Greek Salad Bowl",description:"Vibrant Mediterranean salad with cucumber, tomato, olives, and creamy feta. Refreshing, nourishing, no cooking needed.",cuisine:"Mediterranean",mealTypes:["lunch","snack"],cravings:["fresh-light","healthy","savoury"],time:10,difficulty:"easy",calories:280,calorieLevel:"light",protein:"10g",carbs:"18g",fat:"18g",fiber:"4g",diet:["vegetarian","glutenfree"],spiceLevel:"mild",coreIngredients:["Feta Cheese","Cucumber","Tomato"],optionalStaples:["Olives","Red Onion","Olive Oil","Lemon","Oregano","Salt"],fullIngredientList:["200g feta cheese","2 cucumbers diced","4 tomatoes chopped","½ red onion thinly sliced","½ cup olives","3 tbsp olive oil","Juice of 1 lemon","Dried oregano and salt"],steps:["Dice cucumber and tomatoes.","Slice red onion thinly.","Combine all vegetables and olives in a bowl.","Drizzle olive oil and lemon juice. Season with oregano and salt.","Top with feta chunks. Serve immediately."],healthySwaps:["Add chickpeas for more protein","Serve with whole wheat pita bread","Include avocado for healthy fats"],matchReason:"Feta + cucumber + tomato creates the most refreshing Mediterranean salad — simple, vibrant, and full of flavour." },
  { id:"int16",name:"Ratatouille",description:"Slow-cooked Provençal vegetable stew with courgette, eggplant, tomato, and herbs. Rustic French cooking at its best.",cuisine:"French",mealTypes:["lunch","dinner"],cravings:["comfort","savoury","healthy"],time:45,difficulty:"medium",calories:220,calorieLevel:"light",protein:"6g",carbs:"32g",fat:"10g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Brinjal / Eggplant","Zucchini / Courgette","Canned Tomatoes"],optionalStaples:["Onion","Garlic","Bell Pepper / Capsicum","Olive Oil","Fresh Basil","Thyme","Oregano","Salt"],fullIngredientList:["1 large eggplant cubed","2 courgettes sliced","400g canned tomatoes","1 onion","3 garlic cloves","1 bell pepper","3 tbsp olive oil","Fresh basil, thyme, oregano"],steps:["Heat olive oil. Sauté onion and garlic until soft.","Add bell pepper and eggplant. Cook 8 min.","Add courgette and tomatoes. Season with herbs.","Simmer on low heat 25-30 min until vegetables are tender and saucy.","Garnish with fresh basil. Serve with crusty bread or over pasta."],healthySwaps:["Serve with whole wheat bread for more fibre","Add chickpeas for protein","Use as a pasta sauce"],matchReason:"Eggplant + courgette + tomatoes slowly cooked together creates ratatouille — Provence's gift to the world of vegetable cooking." },
  { id:"int17",name:"Beef Bolognese",description:"A rich, slow-cooked meat sauce from Bologna with deeply flavoured minced beef, wine, and vegetables.",cuisine:"Italian",mealTypes:["lunch","dinner"],cravings:["comfort","savoury","high-protein"],time:50,difficulty:"medium",calories:620,calorieLevel:"high",protein:"38g",carbs:"68g",fat:"22g",fiber:"5g",diet:["dairyfree","highprotein"],spiceLevel:"mild",coreIngredients:["Ground Beef / Mince","Canned Tomatoes","Spaghetti"],optionalStaples:["Onion","Carrot","Celery","Garlic","Olive Oil","Tomato Paste","Parmesan","Fresh Basil"],fullIngredientList:["400g ground beef","400g canned tomatoes","300g spaghetti","1 onion finely diced","2 carrots diced","2 celery sticks","4 garlic cloves","Tomato paste","Olive oil and parmesan"],steps:["Sauté onion, carrot, celery until soft about 8 min.","Add garlic and beef. Brown on high heat.","Add tomato paste and canned tomatoes. Season.","Simmer uncovered 30-40 min until thick and rich.","Cook spaghetti. Toss with sauce. Top with parmesan."],healthySwaps:["Use lean beef mince","Substitute with lentil bolognese for plant-based","Add extra vegetables to the sauce"],matchReason:"Ground beef + canned tomatoes + spaghetti creates bolognese — the most satisfying of all Italian pasta sauces." },
  { id:"int18",name:"Garlic Butter Shrimp Pasta",description:"Linguine with buttery garlic prawns, lemon, and parsley. Restaurant-quality in 20 minutes.",cuisine:"Italian",mealTypes:["lunch","dinner"],cravings:["savoury","comfort","high-protein"],time:20,difficulty:"easy",calories:520,calorieLevel:"high",protein:"34g",carbs:"58g",fat:"18g",fiber:"3g",diet:["highprotein"],spiceLevel:"mild",coreIngredients:["Shrimp / Prawns","Linguine","Butter"],optionalStaples:["Garlic","Lemon","Parsley","Olive Oil","Chili Flakes","Parmesan","Salt"],fullIngredientList:["400g prawns cleaned","300g linguine","3 tbsp butter","4 garlic cloves sliced","Juice of 1 lemon","Chili flakes","Fresh parsley","Salt and olive oil"],steps:["Cook linguine in salted water until al dente.","Heat butter in wide pan. Fry garlic until golden.","Add prawns. Cook 2 min per side until pink. Add chili flakes.","Add lemon juice and a ladle of pasta water.","Toss linguine with sauce. Garnish with parsley."],healthySwaps:["Use olive oil instead of butter","Serve with zucchini noodles for low carb","Add cherry tomatoes for vitamins"],matchReason:"Prawns + linguine + butter is the Italian coastal formula for a dinner that feels luxurious and takes only 20 minutes." },
  { id:"int19",name:"Yogurt Berry Parfait",description:"Layered Greek yogurt, fresh berries, honey, and granola. Beautiful, nutritious, effortless in 5 minutes.",cuisine:"American",mealTypes:["breakfast","snack"],cravings:["sweet","healthy"],time:5,difficulty:"easy",calories:310,calorieLevel:"balanced",protein:"18g",carbs:"44g",fat:"6g",fiber:"4g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Greek Yogurt","Mixed Berries","Honey"],optionalStaples:["Rolled Oats","Vanilla Extract","Chia Seeds","Almonds","Mint"],fullIngredientList:["1 cup Greek yogurt","1 cup mixed berries","2 tbsp honey","½ cup granola or toasted oats","Fresh mint"],steps:["Stir vanilla into yogurt if desired.","Layer yogurt, berries, and granola in a glass or bowl.","Drizzle honey over top.","Garnish with mint leaves. Serve immediately or chill 30 min."],healthySwaps:["Coconut yogurt for dairy-free","Make your own granola without added sugar","Add chia seeds for omega-3"],matchReason:"Greek yogurt + berries + honey is a classic that takes 5 minutes and delivers complete nutrition beautifully." },
  { id:"int20",name:"Veggie Frittata",description:"A thick Italian baked omelette — the perfect vehicle for any vegetables in your fridge. Oven-finished, golden, satisfying.",cuisine:"Italian",mealTypes:["breakfast","lunch","dinner"],cravings:["savoury","healthy"],time:25,difficulty:"easy",calories:310,calorieLevel:"balanced",protein:"22g",carbs:"8g",fat:"20g",fiber:"3g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Bell Pepper / Capsicum","Onion"],optionalStaples:["Olive Oil","Garlic","Parmesan","Feta Cheese","Spinach","Salt"],fullIngredientList:["6 eggs","1 bell pepper diced","1 onion diced","½ cup cheese","2 tbsp olive oil","Garlic, salt, pepper","Spinach optional"],steps:["Preheat oven to 190°C. Sauté onion and bell pepper in oven-safe pan 5 min.","Whisk eggs with salt, pepper, and cheese. Pour over vegetables.","Cook on hob 3 min until edges set. Transfer to oven.","Bake 10-12 min until set and golden on top."],healthySwaps:["Load up with any vegetables you have","Add spinach or kale","Use dairy-free cheese"],matchReason:"A frittata is the smartest way to use eggs and whatever vegetables you have on hand — infinitely versatile." },
  // ── Italian extras ──
  { id:"it01",name:"Spinach Frittata",description:"A golden Italian omelette loaded with wilted spinach and melted parmesan. Baked to perfection, sliced like a pie.",cuisine:"Italian",mealTypes:["breakfast","lunch"],cravings:["savoury","healthy","high-protein"],time:20,difficulty:"easy",calories:290,calorieLevel:"light",protein:"22g",carbs:"5g",fat:"18g",fiber:"3g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Spinach"],optionalStaples:["Parmesan","Garlic","Olive Oil","Nutmeg","Salt","Feta Cheese"],fullIngredientList:["5 large eggs","3 cups fresh spinach","¼ cup parmesan grated","2 tbsp olive oil","2 garlic cloves","Pinch of nutmeg","Salt and pepper"],steps:["Preheat oven 190°C. Wilt spinach in olive oil with garlic 2 min. Squeeze dry.","Whisk eggs with parmesan, nutmeg, salt, and pepper.","Add spinach to eggs and mix well.","Pour into oven-safe pan. Cook on hob 3 min until edges set.","Transfer to oven. Bake 10 min until golden and puffed. Slice and serve."],healthySwaps:["Add sun-dried tomatoes for sweetness","Use dairy-free cheese for vegan version","Serve with a simple green salad"],matchReason:"Spinach + eggs in Italian style creates frittata — the simplest, most satisfying one-pan meal." },
  { id:"it02",name:"Tomato Bruschetta",description:"Crispy grilled bread topped with fresh tomatoes, garlic, and basil. The purest expression of Italian cooking.",cuisine:"Italian",mealTypes:["snack","breakfast","lunch"],cravings:["fresh-light","savoury"],time:10,difficulty:"easy",calories:220,calorieLevel:"light",protein:"7g",carbs:"32g",fat:"8g",fiber:"3g",diet:["vegetarian","vegan","dairyfree"],spiceLevel:"mild",coreIngredients:["Tomato","Sourdough Bread","Garlic"],optionalStaples:["Olive Oil","Fresh Basil","Salt","Black Pepper","Balsamic Vinegar"],fullIngredientList:["4 slices sourdough or ciabatta","3 ripe tomatoes diced","2 garlic cloves","3 tbsp olive oil","Fresh basil","Salt and black pepper","Splash of balsamic"],steps:["Toast or grill bread until golden and crispy.","While warm rub each slice with a halved garlic clove.","Toss diced tomatoes with olive oil, salt, pepper, and torn basil.","Spoon generously onto toast. Drizzle with balsamic if using. Serve immediately."],healthySwaps:["Whole grain bread for more fibre","Add sliced avocado for healthy fats","Ricotta on the bread for protein"],matchReason:"Tomatoes + bread + garlic + olive oil is bruschetta — Italy's greatest snack and proof that simple is best." },
  { id:"it03",name:"Baked Eggs Florentine",description:"Eggs nestled in a rich spinach and tomato sauce, baked until the whites are set and the yolks still runny.",cuisine:"Italian",mealTypes:["breakfast","lunch"],cravings:["savoury","comfort"],time:22,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"20g",carbs:"14g",fat:"18g",fiber:"4g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Spinach","Tomato"],optionalStaples:["Garlic","Olive Oil","Parmesan","Cream","Salt","Chili Flakes","Bread"],fullIngredientList:["4 eggs","3 cups spinach","3 tomatoes or 400g canned","2 garlic cloves","2 tbsp olive oil","¼ cup cream or parmesan","Salt and chili flakes"],steps:["Preheat oven to 200°C. Sauté garlic in olive oil 1 min.","Add tomatoes. Simmer 8 min until saucy. Add spinach and wilt.","Transfer to baking dish. Make 4 wells.","Crack an egg into each well. Season. Top with parmesan or swirl cream.","Bake 10-12 min until whites are set but yolks remain runny."],healthySwaps:["Skip cream for a lighter version","Add cannellini beans to the sauce for protein","Serve with whole grain toast"],matchReason:"Eggs + spinach + tomato in an Italian bake — elegant, warming, and achievable on a weekday morning." },
  { id:"it04",name:"Caprese Toast",description:"Creamy mozzarella, ripe tomato, and fragrant basil on grilled sourdough. Simple, elegant, unmistakably Italian.",cuisine:"Italian",mealTypes:["breakfast","snack","lunch"],cravings:["fresh-light","savoury"],time:8,difficulty:"easy",calories:380,calorieLevel:"balanced",protein:"16g",carbs:"30g",fat:"22g",fiber:"2g",diet:["vegetarian","glutenfree"],spiceLevel:"mild",coreIngredients:["Tomato","Sourdough Bread"],optionalStaples:["Mozzarella","Fresh Basil","Olive Oil","Balsamic Glaze","Salt","Black Pepper"],fullIngredientList:["2 slices sourdough toasted","2 ripe tomatoes sliced","125g fresh mozzarella","Fresh basil leaves","2 tbsp olive oil","Balsamic glaze","Sea salt and cracked pepper"],steps:["Toast sourdough until golden and firm.","Layer mozzarella slices on warm toast.","Top with tomato slices. Season with salt and pepper.","Scatter torn basil leaves generously.","Drizzle with olive oil and balsamic glaze. Eat immediately."],healthySwaps:["Use ricotta for lower fat","Whole grain bread for more fibre","Avocado slice adds healthy fats"],matchReason:"Tomato + mozzarella + basil is the Caprese trilogy — effortless Italian perfection on toast." },
  { id:"it05",name:"Italian Herb Omelette",description:"A classic folded Italian omelette fragrant with fresh herbs, parmesan, and slow-cooked onion.",cuisine:"Italian",mealTypes:["breakfast","lunch"],cravings:["savoury","high-protein"],time:12,difficulty:"easy",calories:270,calorieLevel:"light",protein:"20g",carbs:"4g",fat:"18g",fiber:"1g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Onion"],optionalStaples:["Parmesan","Fresh Basil","Olive Oil","Butter","Garlic","Salt"],fullIngredientList:["3 eggs","1 small onion thinly sliced","2 tbsp parmesan","Fresh basil and parsley","1 tbsp olive oil","1 tsp butter","Salt and pepper"],steps:["Soften onion in olive oil over low heat 6 min until sweet and golden.","Whisk eggs with grated parmesan, salt, and pepper.","Add butter to pan over medium heat. Pour in egg mixture.","As edges set, gently fold and cook 1 more min until creamy inside.","Slide onto plate. Top with fresh basil and extra parmesan."],healthySwaps:["Add sun-dried tomatoes for sweetness","Serve with a tomato side salad","Use olive oil only for dairy-free"],matchReason:"Eggs + onion + parmesan + herbs is the Italian kitchen staple — quick, satisfying, and deeply savoury." },
  // ── Korean ──
  { id:"kr01",name:"Bibimbap",description:"Korea's iconic mixed rice bowl — topped with seasoned vegetables, a fried egg, and fiery gochujang sauce.",cuisine:"Korean",mealTypes:["lunch","dinner"],cravings:["savoury","spicy","healthy","high-protein"],time:30,difficulty:"medium",calories:480,calorieLevel:"balanced",protein:"18g",carbs:"68g",fat:"14g",fiber:"6g",diet:["vegetarian","glutenfree"],spiceLevel:"medium",coreIngredients:["White Rice","Eggs","Spinach"],optionalStaples:["Carrot","Cucumber","Sesame Oil","Soy Sauce","Gochujang","Garlic","Sesame Seeds","Mushrooms"],fullIngredientList:["1½ cups cooked rice","2 eggs","2 cups spinach blanched","1 carrot julienned","1 cucumber julienned","1 cup mushrooms sautéed","2 tbsp gochujang","1 tsp sesame oil","Soy sauce and sesame seeds"],steps:["Cook rice. Prepare each vegetable topping separately: blanch spinach, julienne carrot and cucumber, sauté mushrooms. Season each with soy sauce, garlic, sesame oil.","Fry eggs sunny side up.","Arrange rice in a bowl. Place each topping in sections around the bowl.","Place fried egg in the centre. Add gochujang.","Drizzle with sesame oil and sprinkle sesame seeds. Mix vigorously before eating."],healthySwaps:["Use brown rice for more fibre","Add tofu for plant-based protein","Reduce gochujang for milder heat"],matchReason:"Rice + egg + vegetables + gochujang is bibimbap — Korea's most beloved one-bowl meal, colourful, balanced, and irresistible." },
  { id:"kr02",name:"Kimchi Fried Rice",description:"Bold, smoky fried rice made with fermented kimchi, egg, and sesame. A fiery Korean classic ready in 15 minutes.",cuisine:"Korean",mealTypes:["lunch","dinner"],cravings:["savoury","spicy","comfort"],time:15,difficulty:"easy",calories:420,calorieLevel:"balanced",protein:"14g",carbs:"60g",fat:"14g",fiber:"3g",diet:["dairyfree"],spiceLevel:"spicy",coreIngredients:["White Rice","Eggs","Onion"],optionalStaples:["Kimchi","Soy Sauce","Sesame Oil","Garlic","Spring Onion","Gochujang","Vegetable Oil"],fullIngredientList:["2 cups day-old cooked rice","2 eggs","1 cup kimchi chopped","1 onion diced","2 garlic cloves","2 tbsp soy sauce","1 tsp sesame oil","Gochujang to taste","Spring onion and sesame seeds"],steps:["Heat oil in wok over high heat. Fry onion and garlic 2 min.","Add kimchi. Stir-fry 3 min until slightly caramelised.","Add rice. Toss well pressing into hot wok to crisp slightly.","Add soy sauce and gochujang. Mix thoroughly.","Push rice to sides. Scramble eggs in centre then fold into rice.","Drizzle sesame oil. Garnish with spring onion and sesame seeds."],healthySwaps:["Add edamame or tofu for protein","Swap white rice for brown rice","Reduce gochujang for milder version"],matchReason:"Rice + egg + kimchi creates Korea's best pantry meal — sour, spicy, smoky, and deeply satisfying." },
  { id:"kr03",name:"Korean Tofu Soup (Sundubu Jjigae)",description:"Silky soft tofu in a deeply seasoned spicy broth with vegetables and egg. Korea's ultimate comfort dish.",cuisine:"Korean",mealTypes:["lunch","dinner"],cravings:["spicy","comfort","savoury"],time:20,difficulty:"easy",calories:220,calorieLevel:"light",protein:"16g",carbs:"12g",fat:"10g",fiber:"4g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"spicy",coreIngredients:["Soft Tofu","Eggs","Mushrooms"],optionalStaples:["Gochugaru","Garlic","Sesame Oil","Soy Sauce","Spring Onion","Zucchini","Vegetable Stock"],fullIngredientList:["300g soft tofu","2 eggs","1 cup mushrooms","2 tbsp gochugaru (Korean chilli flakes)","3 garlic cloves","1 tsp sesame oil","2 tbsp soy sauce","2 cups vegetable stock","Spring onion"],steps:["Heat sesame oil. Fry garlic and gochugaru 1 min until fragrant.","Add stock and bring to boil. Add mushrooms and simmer 5 min.","Gently spoon in soft tofu in large chunks. Do not stir.","Crack eggs directly into simmering stew. Season with soy sauce.","Cook 2-3 min until egg whites set. Garnish with spring onion."],healthySwaps:["Add spinach or zucchini for vegetables","Firm tofu for more texture","Use low-sodium soy sauce"],matchReason:"Soft tofu + egg + spicy broth is sundubu jjigae — the Korean stew that warms from the inside out." },
  { id:"kr04",name:"Korean Egg Roll (Gyeran Mari)",description:"Delicate Japanese-style rolled omelette seasoned with sesame oil and spring onion. Perfect with rice.",cuisine:"Korean",mealTypes:["breakfast","lunch"],cravings:["savoury","high-protein"],time:12,difficulty:"medium",calories:200,calorieLevel:"light",protein:"16g",carbs:"3g",fat:"14g",fiber:"1g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Spring Onion"],optionalStaples:["Sesame Oil","Soy Sauce","Salt","Carrot","Vegetable Oil"],fullIngredientList:["4 eggs","2 spring onions finely chopped","1 small carrot grated","1 tsp sesame oil","½ tsp soy sauce","Salt","Vegetable oil for pan"],steps:["Beat eggs with sesame oil, soy sauce, and salt until uniform.","Stir in spring onion and grated carrot.","Heat a rectangular or small pan over medium-low. Add a thin layer of oil.","Pour ⅓ of egg mixture. As it partially sets, roll from one side.","Slide roll to edge, add more mixture underneath. Roll again. Repeat until all egg is used.","Cool slightly. Slice into rounds and serve."],healthySwaps:["Add spinach for iron","Use less oil with a good non-stick pan","Serve with brown rice"],matchReason:"Eggs + spring onion rolled together is gyeran mari — Korea's most elegant quick breakfast." },
  { id:"kr05",name:"Korean Vegetable Pancake (Pajeon)",description:"Crispy, savoury pancake loaded with spring onion and vegetables. Dipped in soy sesame sauce.",cuisine:"Korean",mealTypes:["snack","lunch"],cravings:["savoury","comfort"],time:15,difficulty:"easy",calories:280,calorieLevel:"balanced",protein:"10g",carbs:"38g",fat:"10g",fiber:"3g",diet:["vegetarian","dairyfree"],spiceLevel:"mild",coreIngredients:["Eggs","Spring Onion","All-Purpose Flour"],optionalStaples:["Carrot","Zucchini","Soy Sauce","Sesame Oil","Sesame Seeds","Vegetable Oil","Rice Vinegar"],fullIngredientList:["1 cup plain flour","1 egg","¾ cup cold water","6 spring onions cut in lengths","1 small zucchini grated","1 carrot grated","Salt","Oil for frying","Dipping sauce: soy sauce, sesame oil, rice vinegar, chilli"],steps:["Mix flour, egg, and cold water to a smooth batter. Season with salt.","Add spring onion, zucchini, and carrot. Mix well.","Heat oil generously in flat pan over medium-high heat.","Pour in batter forming a large flat pancake. Press down firmly.","Cook 4 min until crispy and golden. Flip carefully. Cook 3 min more.","Slice into squares. Serve with dipping sauce."],healthySwaps:["Use half wholemeal flour for more fibre","Add kimchi to the batter","Bake instead of fry for lighter version"],matchReason:"Spring onion + egg + batter makes pajeon — Korea's beloved crispy pancake, especially good on a rainy day." },
  // ── Thai ──
  { id:"th01",name:"Pad Thai",description:"Thailand's most iconic stir-fried noodle dish with eggs, tofu, and a tangy tamarind sauce. Crowned with crushed peanuts.",cuisine:"Thai",mealTypes:["lunch","dinner"],cravings:["savoury","sweet","comfort"],time:25,difficulty:"medium",calories:520,calorieLevel:"balanced",protein:"22g",carbs:"72g",fat:"16g",fiber:"4g",diet:["vegetarian","dairyfree"],spiceLevel:"medium",coreIngredients:["Eggs","Rice Noodles","Onion"],optionalStaples:["Firm Tofu","Soy Sauce","Tamarind","Sugar","Lime","Bean Sprouts","Spring Onion","Peanuts","Vegetable Oil","Garlic"],fullIngredientList:["200g flat rice noodles","3 eggs","1 cup firm tofu cubed","1 cup bean sprouts","2 spring onions","3 tbsp soy sauce","2 tbsp tamarind paste","1 tbsp sugar","2 garlic cloves","Crushed peanuts and lime to serve"],steps:["Soak rice noodles in warm water 20 min until pliable. Drain.","Heat oil in wok over high heat. Fry tofu until golden. Remove.","Fry garlic 30 sec. Add noodles. Stir-fry 2 min.","Mix soy sauce, tamarind, and sugar. Pour over noodles.","Push noodles aside. Scramble eggs. Fold into noodles.","Add bean sprouts and spring onion. Toss briefly.","Serve topped with crushed peanuts, lime wedge, and chilli flakes."],healthySwaps:["Use zucchini noodles for lower carbs","Add shrimp or chicken for more protein","Reduce sugar in the sauce"],matchReason:"Rice noodles + eggs + tamarind sauce is Pad Thai — Thailand's national dish and one of the world's great noodle recipes." },
  { id:"th02",name:"Thai Green Curry",description:"Fragrant coconut green curry with vegetables and tofu. Aromatic, creamy, warmly spiced — ready in 25 minutes.",cuisine:"Thai",mealTypes:["dinner"],cravings:["spicy","comfort","savoury"],time:25,difficulty:"easy",calories:440,calorieLevel:"balanced",protein:"18g",carbs:"22g",fat:"28g",fiber:"5g",diet:["vegetarian","vegan","glutenfree","dairyfree"],spiceLevel:"spicy",coreIngredients:["Coconut Milk (canned)","Spinach","Onion"],optionalStaples:["Green Curry Paste","Garlic","Lime","Fish Sauce","Fresh Basil","Bell Pepper / Capsicum","Zucchini / Courgette","Sugar","Oil","Firm Tofu"],fullIngredientList:["400ml coconut milk","2 tbsp green curry paste","1 onion","1 bell pepper","1 zucchini","2 cups spinach","200g firm tofu","2 garlic cloves","1 tbsp fish sauce or soy sauce","Juice of 1 lime","Fresh Thai basil","Jasmine rice to serve"],steps:["Heat oil. Fry curry paste 1 min until fragrant.","Add onion and garlic. Cook 2 min.","Add coconut milk and bring to simmer.","Add bell pepper, zucchini, and tofu. Simmer 12 min.","Add spinach. Season with fish sauce and lime juice.","Garnish with Thai basil. Serve over jasmine rice."],healthySwaps:["Light coconut milk reduces calories","Chicken or prawns instead of tofu","Add extra vegetables for bulk"],matchReason:"Coconut milk + green curry paste + vegetables makes the fragrant Thai green curry — warming, complex, irresistible." },
  { id:"th03",name:"Tom Yum Soup",description:"Thailand's famous hot and sour soup with mushrooms, lemongrass, and lime. Bold, bright, and ready in 20 minutes.",cuisine:"Thai",mealTypes:["lunch","dinner"],cravings:["spicy","fresh-light","savoury"],time:20,difficulty:"easy",calories:160,calorieLevel:"light",protein:"8g",carbs:"14g",fat:"6g",fiber:"3g",diet:["vegetarian","vegan","glutenfree","dairyfree"],spiceLevel:"spicy",coreIngredients:["Mushrooms","Tomato","Onion"],optionalStaples:["Lemongrass","Lime","Chili","Galangal","Soy Sauce","Coconut Milk (canned)","Spring Onion","Coriander","Vegetable Stock"],fullIngredientList:["2 cups mushrooms sliced","2 tomatoes quartered","1 onion","1L vegetable stock","2 stalks lemongrass bruised","3 lime leaves","3 fresh chillies","Juice of 2 limes","2 tbsp soy sauce","Fresh coriander"],steps:["Bring stock to boil with lemongrass, lime leaves, and chillies 5 min.","Add mushrooms and tomatoes. Simmer 8 min.","Add onion. Cook 3 min more.","Remove lemongrass. Season with soy sauce and lime juice.","Taste for hot-sour balance. Garnish with coriander and serve immediately."],healthySwaps:["Add prawns for protein","Stir in a spoonful of coconut milk for creaminess","Add tofu for plant protein"],matchReason:"Mushrooms + tomato + lemongrass + lime makes tom yum — Thailand's most iconic broth, punchingly sour and bright." },
  { id:"th04",name:"Thai Basil Stir Fry",description:"Blazing wok stir fry with vegetables, fragrant Thai basil, and oyster sauce. Street food speed, restaurant flavour.",cuisine:"Thai",mealTypes:["lunch","dinner"],cravings:["savoury","spicy","high-protein"],time:15,difficulty:"easy",calories:320,calorieLevel:"balanced",protein:"20g",carbs:"18g",fat:"16g",fiber:"4g",diet:["dairyfree","glutenfree"],spiceLevel:"spicy",coreIngredients:["Eggs","Bell Pepper / Capsicum","Onion"],optionalStaples:["Garlic","Chili","Soy Sauce","Oyster Sauce","Fish Sauce","Sugar","Fresh Basil","Vegetable Oil","Mushrooms"],fullIngredientList:["3 eggs","1 bell pepper sliced","1 onion sliced","1 cup mushrooms","4 garlic cloves","3 red chillies","2 tbsp oyster sauce","1 tbsp fish sauce or soy sauce","1 tsp sugar","Large handful Thai basil leaves","Vegetable oil"],steps:["Heat wok until smoking. Add oil, garlic, and chilli. Cook 30 sec.","Add onion and bell pepper. Stir-fry 3 min on high heat.","Add mushrooms. Toss 2 min more.","Push to sides. Scramble eggs in centre. Fold into vegetables.","Add oyster sauce, fish sauce, and sugar. Toss well.","Remove from heat. Add basil and toss until just wilted."],healthySwaps:["Use chicken or prawns for more protein","Serve over cauliflower rice for lower carbs","Less oyster sauce for lower sodium"],matchReason:"Eggs + bell pepper + Thai basil in a blazing wok makes the iconic Thai basil stir fry — fast, fragrant, and addictive." },
  { id:"th05",name:"Mango Sticky Rice",description:"Thailand's beloved dessert — glutinous rice in sweet coconut milk with fresh ripe mango. Utterly indulgent.",cuisine:"Thai",mealTypes:["snack"],cravings:["sweet","comfort"],time:30,difficulty:"medium",calories:420,calorieLevel:"high",protein:"6g",carbs:"82g",fat:"12g",fiber:"3g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["White Rice","Mango","Coconut Milk (canned)"],optionalStaples:["Sugar","Salt","Sesame Seeds"],fullIngredientList:["1½ cups glutinous / sticky rice","1 can coconut milk","3 tbsp sugar","1 tsp salt","2 ripe mangoes sliced","Sesame seeds to garnish"],steps:["Soak sticky rice in water 1 hour. Drain and steam 25 min until translucent.","Warm coconut milk with sugar and salt — do not boil. Reserve ¼ cup for drizzling.","Mix rice with warm coconut milk. Cover and rest 15 min to absorb.","Serve rice mounded alongside sliced mango.","Drizzle reserved coconut milk over rice. Sprinkle sesame seeds."],healthySwaps:["Reduce sugar in coconut milk","Papaya works beautifully instead of mango","Serve with a sprinkle of toasted coconut"],matchReason:"Sticky rice + coconut milk + mango is Thailand's most beloved dessert — a perfect balance of sweet, creamy, and fresh." },
  // ── Vietnamese ──
  { id:"vn01",name:"Vietnamese Pho",description:"A deeply aromatic beef or vegetable noodle soup fragrant with star anise, cinnamon, and fresh herbs. Soul-restoring.",cuisine:"Vietnamese",mealTypes:["lunch","dinner"],cravings:["comfort","savoury"],time:35,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"18g",carbs:"52g",fat:"8g",fiber:"4g",diet:["dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Rice Noodles","Onion","Mushrooms"],optionalStaples:["Star Anise","Cinnamon","Soy Sauce","Fish Sauce","Ginger (Fresh)","Bean Sprouts","Fresh Basil","Lime","Chili","Vegetable Stock"],fullIngredientList:["200g flat rice noodles","1L vegetable stock","1 large onion halved","2 cups mushrooms","3 star anise","1 cinnamon stick","2 inch ginger","2 tbsp fish sauce or soy sauce","Bean sprouts, basil, lime, chilli to serve"],steps:["Char onion and ginger directly on a gas flame or under broiler until blackened. This gives the broth depth.","Bring stock to boil. Add charred onion, ginger, star anise, and cinnamon. Simmer 20 min.","Strain broth. Season with fish sauce and salt.","Cook noodles per packet. Divide into bowls.","Add mushrooms to broth. Simmer 5 min. Ladle hot broth over noodles.","Serve with a plate of bean sprouts, basil, lime wedges, and sliced chilli."],healthySwaps:["Add tofu or chicken for protein","Use low-sodium stock","Extra herbs and vegetables add nutrients without calories"],matchReason:"Rice noodles + star anise broth + fresh herbs is pho — Vietnam's greatest contribution to the world of noodle soups." },
  { id:"vn02",name:"Vietnamese Fresh Spring Rolls",description:"Rice paper rolls filled with vermicelli, fresh vegetables, and herbs. Served with peanut dipping sauce.",cuisine:"Vietnamese",mealTypes:["snack","lunch"],cravings:["fresh-light","healthy"],time:20,difficulty:"medium",calories:260,calorieLevel:"light",protein:"10g",carbs:"42g",fat:"6g",fiber:"5g",diet:["vegetarian","vegan","glutenfree","dairyfree"],spiceLevel:"mild",coreIngredients:["Rice Noodles","Cucumber","Carrot"],optionalStaples:["Rice Paper","Lettuce","Fresh Basil","Mint","Avocado","Peanut Butter","Soy Sauce","Lime","Garlic","Sugar"],fullIngredientList:["8 rice paper sheets","100g rice vermicelli","1 cucumber julienned","2 carrots julienned","Lettuce leaves","Fresh mint and basil","1 avocado sliced","Peanut sauce: peanut butter, soy, lime, garlic, water, sugar"],steps:["Soak vermicelli in hot water 5 min. Drain and cool.","Make peanut sauce: blend peanut butter, soy sauce, lime juice, garlic, and water until smooth.","Fill a shallow dish with warm water. Dip one rice paper for 15 sec until just pliable.","Lay flat. Place lettuce, noodles, vegetables, avocado, and herbs in a line.","Fold sides in then roll tightly from the bottom. Serve with peanut sauce."],healthySwaps:["Add tofu or shrimp for protein","Use mango instead of avocado for sweetness","More herbs and less noodle for lighter version"],matchReason:"Rice paper + fresh vegetables + peanut sauce is the Vietnamese spring roll — light, fresh, and deeply satisfying." },
  { id:"vn03",name:"Bánh Mì Bowl",description:"All the flavours of Vietnam's famous sandwich in a deconstructed rice bowl — pickled vegetables, fresh herbs, sriracha.",cuisine:"Vietnamese",mealTypes:["lunch","dinner"],cravings:["savoury","fresh-light"],time:20,difficulty:"easy",calories:420,calorieLevel:"balanced",protein:"18g",carbs:"58g",fat:"12g",fiber:"5g",diet:["dairyfree"],spiceLevel:"medium",coreIngredients:["White Rice","Carrot","Cucumber"],optionalStaples:["Rice Vinegar","Sugar","Soy Sauce","Sesame Oil","Garlic","Sriracha","Eggs","Spring Onion","Coriander / Cilantro","Lime"],fullIngredientList:["1½ cups cooked rice","2 carrots julienned","1 cucumber julienned","2 tbsp rice vinegar","1 tsp sugar","2 eggs fried","Soy sauce, sesame oil, sriracha","Fresh coriander and spring onion","Lime wedge"],steps:["Quick pickle carrots: toss with rice vinegar, sugar, and salt. Rest 10 min.","Cook rice. Fry eggs sunny side up.","Make dressing: mix soy sauce, sesame oil, and a little sriracha.","Assemble bowl: rice base, pickled carrot, fresh cucumber slices.","Top with fried egg. Drizzle dressing over everything.","Garnish with coriander, spring onion, and lime wedge."],healthySwaps:["Brown rice for more fibre","Add tofu for plant-based protein","Extra vegetables for more colour and nutrition"],matchReason:"Rice + pickled carrot + cucumber + egg is the banh mi bowl — all the bright Vietnamese flavours in a no-fuss dish." },
  // ── Spanish ──
  { id:"sp01",name:"Tortilla Española",description:"Spain's beloved thick potato omelette with slow-cooked onion. Golden outside, silky inside. A national icon.",cuisine:"Spanish",mealTypes:["breakfast","lunch","snack"],cravings:["savoury","comfort"],time:30,difficulty:"medium",calories:380,calorieLevel:"balanced",protein:"18g",carbs:"32g",fat:"20g",fiber:"3g",diet:["vegetarian","glutenfree","highprotein"],spiceLevel:"mild",coreIngredients:["Eggs","Potato","Onion"],optionalStaples:["Olive Oil","Salt","Garlic","Parsley"],fullIngredientList:["6 eggs","3 medium potatoes","1 large onion","6 tbsp olive oil","Salt and pepper","Fresh parsley to serve"],steps:["Peel and slice potatoes thinly. Slice onion into half-moons.","Cook potatoes and onion in olive oil over medium-low heat 20 min until soft, not brown.","Beat eggs well with salt. Add warm potato and onion mixture.","Return mix to pan over medium heat. Cook 4 min until mostly set.","Flip using a plate: put plate over pan, invert, slide back in. Cook 3 min more.","Rest 5 min before slicing. Serve warm or at room temperature."],healthySwaps:["Add spinach to the egg mixture","Sweet potato for more nutrients","Use less oil by baking in oven"],matchReason:"Eggs + potato + onion slowly combined is tortilla española — Spain's greatest contribution to egg cookery." },
  { id:"sp02",name:"Gazpacho",description:"Ice-cold Spanish blended tomato soup with cucumber and peppers. Refreshing, vibrant, zero cooking required.",cuisine:"Spanish",mealTypes:["lunch"],cravings:["fresh-light","healthy","savoury"],time:15,difficulty:"easy",calories:160,calorieLevel:"light",protein:"4g",carbs:"20g",fat:"8g",fiber:"4g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["Tomato","Cucumber","Bell Pepper / Capsicum"],optionalStaples:["Garlic","Olive Oil","Red Wine Vinegar","Onion","Bread","Salt","Ice Water"],fullIngredientList:["600g ripe tomatoes","1 cucumber","1 red bell pepper","1 small onion","2 garlic cloves","3 tbsp olive oil","2 tbsp red wine vinegar","Salt and pepper","Ice water if needed"],steps:["Core tomatoes. Roughly chop all vegetables.","Blend everything together until very smooth.","Add olive oil and vinegar. Blend again.","Season generously. Add ice water if too thick.","Strain through sieve if you want silky texture.","Refrigerate at least 2 hours until very cold. Serve with olive oil drizzle."],healthySwaps:["Add more cucumber for hydration","Skip bread for gluten-free version","Roasted peppers add depth"],matchReason:"Tomatoes + cucumber + bell pepper blended together is gazpacho — Spain's extraordinary raw soup, cooling and vibrant." },
  { id:"sp03",name:"Spanish Egg & Tomato (Huevos a la Flamenca)",description:"Eggs baked in a rich Spanish tomato sauce with peppers and onion. Rustic, smoky, scooped up with crusty bread.",cuisine:"Spanish",mealTypes:["breakfast","lunch"],cravings:["savoury","comfort"],time:25,difficulty:"easy",calories:310,calorieLevel:"balanced",protein:"18g",carbs:"18g",fat:"18g",fiber:"4g",diet:["vegetarian","glutenfree","dairyfree"],spiceLevel:"medium",coreIngredients:["Eggs","Tomato","Bell Pepper / Capsicum"],optionalStaples:["Onion","Garlic","Paprika","Olive Oil","Smoked Paprika","Salt","Parsley","Chorizo"],fullIngredientList:["4 eggs","4 tomatoes or 400g canned","1 bell pepper","1 onion","3 garlic cloves","1 tsp smoked paprika","2 tbsp olive oil","Salt and parsley"],steps:["Heat olive oil. Sauté onion and bell pepper 6 min until soft.","Add garlic and smoked paprika. Cook 1 min.","Add tomatoes. Simmer 10 min until thick and saucy. Season.","Make 4 wells in sauce. Crack eggs in.","Cover and cook 5-7 min until whites set and yolks remain runny.","Scatter parsley. Serve immediately with crusty bread."],healthySwaps:["Add chickpeas to the sauce for protein","Kale instead of pepper for more nutrition","Use whole grain bread for serving"],matchReason:"Eggs + tomatoes + peppers in a Spanish clay pot is huevos a la flamenca — Andalusia's answer to shakshuka, deeply smoky and satisfying." },
  { id:"sp04",name:"Vegetable Paella",description:"Spain's legendary saffron rice dish with mixed vegetables, paprika, and a caramelised socarrat base.",cuisine:"Spanish",mealTypes:["lunch","dinner"],cravings:["savoury","comfort"],time:40,difficulty:"medium",calories:480,calorieLevel:"balanced",protein:"12g",carbs:"78g",fat:"12g",fiber:"8g",diet:["vegetarian","vegan","dairyfree","glutenfree"],spiceLevel:"mild",coreIngredients:["White Rice","Bell Pepper / Capsicum","Tomato"],optionalStaples:["Onion","Garlic","Smoked Paprika","Saffron","Olive Oil","Green Beans","Peas","Vegetable Stock","Lemon"],fullIngredientList:["1½ cups paella rice or arborio","1 red and 1 yellow bell pepper","2 tomatoes","1 onion","4 garlic cloves","1 tsp smoked paprika","Pinch of saffron","3 cups hot vegetable stock","1 cup green beans","½ cup peas","3 tbsp olive oil","Lemon to serve"],steps:["Heat olive oil in wide paella pan or skillet. Sauté onion 5 min.","Add garlic, peppers, and smoked paprika. Cook 3 min.","Add tomatoes. Cook until broken down 5 min.","Add rice. Toast 1 min coating in flavoured oil.","Dissolve saffron in hot stock. Pour over rice evenly.","Add beans and peas. Simmer uncovered 18 min without stirring.","Increase heat last 2 min for the caramelised socarrat base. Rest 5 min.","Serve with lemon wedges."],healthySwaps:["Add chickpeas for extra protein","Artichoke hearts are traditional and delicious","Use less oil with a well-seasoned pan"],matchReason:"Rice + peppers + saffron + tomato makes paella — Spain's most spectacular and celebratory dish." },
];
const LIBRARY_ARTICLES: LibraryArticle[] = [
  { id:"l1",title:"The Science of Breathwork",category:"Breathing",readTime:"4 min",summary:"Why conscious breathing is one of the most powerful tools for nervous system regulation.",content:["When we breathe consciously, we directly influence the autonomic nervous system. The vagus nerve, stimulated by slow deep breaths, triggers a cascade of calming effects: reduced heart rate, lower cortisol, and a profound sense of ease.","Box breathing, used by Navy SEALs and surgeons, equalises the nervous system across four equal phases. Even two minutes of conscious breathing measurably shifts your physiological state. Unlike most wellness practices, the results are felt within seconds — not days or weeks."] },
  { id:"l2",title:"Anti-Inflammatory Eating",category:"Nutrition",readTime:"5 min",summary:"Foods that calm chronic inflammation — and why it matters far beyond the gym.",content:["Chronic low-grade inflammation underlies many modern health challenges — from fatigue and brain fog to metabolic disease. Food is one of our most powerful modulators of inflammation.","Foods that consistently reduce inflammatory markers include oily fish, leafy greens, berries, turmeric, olive oil, and fermented foods. The most impactful single change is replacing ultra-processed snacks with whole foods — nuts, fruit, legumes — and increasing the diversity of vegetables each week."] },
  { id:"l3",title:"Mobility vs. Flexibility",category:"Movement",readTime:"3 min",summary:"The difference, and why daily mobility work is more valuable for most people.",content:["Flexibility is passive — the range of motion available when a joint is moved externally. Mobility is active — the range you can control under your own muscular power. This difference matters enormously in practice.","Five minutes of daily mobility work — hip circles, thoracic rotations, shoulder CARs, ankle circles — consistently outperforms an occasional yoga class for long-term joint health and movement quality."] },
  { id:"l4",title:"Journaling for Mental Clarity",category:"Mental Wellness",readTime:"4 min",summary:"Expressive writing reduces rumination and measurably boosts emotional wellbeing.",content:["Dr. James Pennebaker's decades of research show that expressive writing reduces psychological distress, improves immune function, and leads to better mood and cognitive performance. The mechanism is a combination of emotional processing and the sense-making that narrative structure imposes on chaotic experience.","The most important principle: write for yourself, not an audience. The journal's value lies in the absence of performance. Messy, honest, contradictory writing is more therapeutically valuable than polished reflection."] },
  { id:"l5",title:"Sleep Architecture Explained",category:"Sleep",readTime:"5 min",summary:"How sleep works in cycles — and what disrupts each stage.",content:["Sleep is not uniform but a structured sequence of stages cycling roughly every 90 minutes. Early cycles contain more slow-wave sleep, critical for physical repair and memory consolidation. Later cycles contain more REM, associated with emotional processing and creativity.","Bright morning light sets the circadian clock and improves sleep quality the following night. It is one of the most powerful and underused sleep interventions available."] },
  { id:"l6",title:"Understanding Your Stress Response",category:"Stress Management",readTime:"4 min",summary:"The physiology of stress — and why understanding it changes how you manage it.",content:["The stress response is an ancient survival mechanism. In short bursts it sharpens focus and mobilises energy. The problem is chronic activation in response to psychological threats — deadlines, social conflicts, financial anxiety — that don't resolve quickly.","The most powerful antidote is activation of the parasympathetic nervous system through slow breathing, physical movement, social connection, laughter, and time in nature. These are not luxuries; they are physiological necessities."] },
  { id:"l7",title:"The Anatomy of a Habit",category:"Habit Building",readTime:"4 min",summary:"How habits form in the brain — and the minimal conditions needed to change them.",content:["Every habit consists of a trigger that initiates it, a behaviour it executes, and a reward that encodes it into memory. Understanding which element to target is key to changing any habit.","The most efficient entry point for new habits is cue manipulation: designing your environment so desirable cues are prominent and undesirable ones are hidden. This shifts the cognitive load before the moment of temptation arrives."] },
  { id:"l8",title:"What Self-Care Actually Means",category:"Self Care",readTime:"3 min",summary:"Moving beyond bubble baths — a more honest and useful definition.",content:["Self-care has been captured by consumer culture and redefined as indulgence. Real self-care is attending to your actual needs: physical, emotional, relational, and spiritual.","The test of genuine self-care: does this practice leave me more capable, more present, and more able to give? If it does, it is self-care. If it primarily numbs or distracts without restoring, it may be a coping mechanism in self-care clothing."] },
  { id:"l9",title:"Walking: The Underrated Superpower",category:"Movement",readTime:"4 min",summary:"Why walking may be the most effective exercise most people are chronically under-using.",content:["The research on walking is quietly extraordinary. Regular walking is associated with reduced all-cause mortality, improved cardiovascular health, better mood, enhanced creativity, and improved sleep quality — comparable in many outcomes to more intense exercise.","Walking in nature specifically reduces cortisol, lowers activity in the brain's rumination network, and improves subjective wellbeing. Even a 20-minute walk in a green space measurably changes blood chemistry."] },
  { id:"l10",title:"Gut Health and Mental Wellbeing",category:"Nutrition",readTime:"4 min",summary:"The gut-brain axis and why your digestive health matters for mood and cognition.",content:["The gut produces roughly 95% of the body's serotonin and houses an independent neural network so complex it is called the 'second brain.' Research into the gut-brain axis has transformed our understanding of how what we eat affects how we think and feel.","A diverse gut microbiome — fed by a wide variety of plant foods — is consistently associated with better mood, reduced anxiety, and improved cognitive function."] },
  { id:"l11",title:"Evening Rituals That Actually Work",category:"Sleep",readTime:"3 min",summary:"Evidence-backed wind-down practices for better sleep quality.",content:["The body's transition into sleep begins about two hours before you actually fall asleep, with a gradual drop in core body temperature and a rise in melatonin. Your evening environment either supports or undermines this process.","Effective wind-down practices: dim lights after sunset, avoid screens or use blue light filtering, take a warm bath (the subsequent cooling accelerates sleep onset), and maintain a consistent bedtime."] },
  { id:"l12",title:"Building Stress Resilience",category:"Stress Management",readTime:"4 min",summary:"The long-term practices that build your capacity to handle difficulty with grace.",content:["Resilience is not a fixed trait — it's a practice. Research shows that consistent habits measurably increase how well people handle adversity: regular exercise, strong social connection, a sense of meaning, adequate sleep, and the ability to tolerate uncertainty.","The most overlooked resilience-builder is the maintenance of joy. Regularly experiencing positive emotion builds a psychological reserve that makes difficulty more navigable."] },
];
const DEFAULT_TASKS = [
  "Drink 8 glasses of water","Stretch for 5 minutes","Go for a walk",
  "Meditate","Write in your journal","Read for 20 minutes","Eat a piece of fruit",
];
const MOOD_OPTIONS: { id: Mood; label: string; emoji: string; recs: { label: string; page: Page; desc: string }[] }[] = [
  { id:"happy",   emoji:"😊",label:"Happy",  recs:[{label:"Guided Breathing",page:"breathing",desc:"Celebrate with energising breath"},{label:"Library",page:"library",desc:"Explore inspiring reads"},{label:"Recipes",page:"recipes",desc:"Cook something nourishing"}] },
  { id:"calm",    emoji:"😌",label:"Calm",   recs:[{label:"Journal",page:"journal",desc:"Capture this peaceful state"},{label:"Library",page:"library",desc:"Deepen your mindfulness"},{label:"Breathing",page:"breathing",desc:"Sustain your calm"}] },
  { id:"neutral", emoji:"😐",label:"Neutral",recs:[{label:"Breathing",page:"breathing",desc:"Energise with focus breath"},{label:"Checklist",page:"checklist",desc:"Ground yourself in small tasks"},{label:"Library",page:"library",desc:"Find a motivating read"}] },
  { id:"stressed",emoji:"😟",label:"Stressed",recs:[{label:"Breathing",page:"breathing",desc:"Box breathing to reset your system"},{label:"Journal",page:"journal",desc:"Write it out — release the tension"},{label:"Library",page:"library",desc:"Read about stress management"}] },
  { id:"tired",   emoji:"😴",label:"Tired",  recs:[{label:"Breathing",page:"breathing",desc:"Sleep breath to restore you"},{label:"Library",page:"library",desc:"Read about rest and recovery"},{label:"Recipes",page:"recipes",desc:"Make something energising"}] },
  { id:"low",     emoji:"😔",label:"Low",    recs:[{label:"Journal",page:"journal",desc:"Gratitude journaling lifts mood"},{label:"Library",page:"library",desc:"Gentle self-care reading"},{label:"Breathing",page:"breathing",desc:"Calming breath for low days"}] },
];
const LIBRARY_CATS = ["All","Breathing","Nutrition","Movement","Mental Wellness","Sleep","Stress Management","Habit Building","Self Care"];
const CAT_COLORS: Record<string,string> = { Breathing:"#A6B89B",Nutrition:"#C98A67",Movement:"#5E8A64","Mental Wellness":"#9B8EC4",Sleep:"#6B8FB8","Stress Management":"#C4A067","Habit Building":"#7A8E6B","Self Care":"#C98A8A" };

// ─── NAV ────────────────────────────────────────────────────────────────────
const NAV_LINKS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id:"home",      label:"Home",      icon:<Leaf size={17}/> },
  { id:"breathing", label:"Breathing", icon:<Wind size={17}/> },
  { id:"recipes",   label:"Recipes",   icon:<ChefHat size={17}/> },
  { id:"library",   label:"Library",   icon:<BookOpen size={17}/> },
  { id:"journal",   label:"Journal",   icon:<Edit3 size={17}/> },
  { id:"checklist", label:"Checklist", icon:<Target size={17}/> },
  { id:"settings",  label:"Settings",  icon:<SlidersHorizontal size={17}/> },
];

function Nav({ page, setPage, accent }: { page: Page; setPage: (p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <>
      {/* Desktop top nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || page !== "home" ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => setPage("home")}
            className="font-['DM_Serif_Display'] text-2xl tracking-tight transition-colors text-foreground">
            AraNook
          </button>
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-['Manrope'] text-sm transition-all duration-200 ${
                  page === l.id ? "font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={page === l.id ? { backgroundColor: accent.primary, color: accent.fg } : {}}>
                {l.icon} {l.label}
              </button>
            ))}
          </div>
          {/* On mobile non-home pages the bottom tab bar handles navigation, so only show hamburger on home */}
          {page === "home" && (
            <button className="md:hidden p-2 text-foreground" onClick={() => setMenuOpen(p=>!p)} aria-label="Menu">
              {menuOpen ? <X size={21}/> : <Menu size={21}/>}
            </button>
          )}
          {/* On mobile non-home pages show current page label so the bar stays visually anchored */}
          {page !== "home" && (
            <span className="md:hidden font-['Manrope'] text-xs text-muted-foreground capitalize">
              {NAV_LINKS.find(l => l.id === page)?.label}
            </span>
          )}
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className="md:hidden bg-card border-b border-border">
              {NAV_LINKS.map(l => (
                <button key={l.id} onClick={()=>{setPage(l.id);setMenuOpen(false)}}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 font-['Manrope'] text-sm border-b border-border/50 last:border-0 ${page===l.id?"text-primary font-medium":"text-foreground"}`}>
                  {l.icon} {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Mobile bottom nav */}
      {page !== "home" && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="grid grid-cols-7 h-16">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={()=>setPage(l.id)}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${page===l.id ? "text-primary" : "text-muted-foreground"}`}>
                {l.icon}
                <span className="font-['Manrope'] text-[9px]">{l.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

// ─── HOME SECTIONS ──────────────────────────────────────────────────────────

function HeroSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const quote = useMemo(() => sessionPick("hquote", QUOTES), []);
  const [quoteVisible, setQuoteVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => setQuoteVisible(true), 600);
    }, 9000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 70% 55% at 15% 15%, rgba(166,184,155,0.28) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 85% 75%, rgba(201,138,103,0.16) 0%, transparent 55%),
          radial-gradient(ellipse 80% 70% at 50% 40%, rgba(230,211,138,0.10) 0%, transparent 65%),
          var(--background)
        `
      }}/>
      {/* Floating botanicals */}
      <BotanicalA className="absolute top-20 right-[7%] w-24 h-36 text-secondary opacity-45 anim-float hidden sm:block"/>
      <BotanicalB className="absolute bottom-24 left-[5%] w-20 h-32 text-primary opacity-30 anim-float-2 hidden sm:block"/>
      <BotanicalC className="absolute top-[30%] left-[10%] w-14 h-22 text-secondary opacity-20 anim-float-3 hidden lg:block"/>
      <BotanicalC className="absolute bottom-[30%] right-[12%] w-12 h-20 text-primary opacity-15 anim-float hidden lg:block"/>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Breathing orb */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-10">
          <div className="absolute w-36 h-36 rounded-full anim-breathe-orb-outer"
            style={{ border:"1px solid rgba(166,184,155,0.22)", background:"radial-gradient(circle, rgba(166,184,155,0.06) 0%, transparent 70%)" }}/>
          <div className="absolute w-24 h-24 rounded-full anim-breathe-orb-mid"
            style={{ border:"1px solid rgba(166,184,155,0.35)", background:"radial-gradient(circle, rgba(166,184,155,0.12) 0%, transparent 70%)" }}/>
          <div className="absolute w-16 h-16 rounded-full anim-breathe-orb"
            style={{ border:"1px solid rgba(166,184,155,0.5)", background:"radial-gradient(circle, rgba(166,184,155,0.2) 0%, transparent 70%)" }}/>
          <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background:`linear-gradient(135deg, #8FAF85 0%, #5E8A64 100%)`, boxShadow:`0 0 48px rgba(107,143,110,0.38), 0 0 96px rgba(107,143,110,0.12)` }}>
            <Wind size={22} color="white" strokeWidth={1.5}/>
          </div>
        </div>
        {/* Headline */}
        <h1 className="font-['DM_Serif_Display'] text-6xl sm:text-7xl lg:text-8xl text-foreground leading-[0.93] mb-5">
          Find your<br/><em>calm within</em>
        </h1>
        <p className="font-['Manrope'] text-sm tracking-[0.18em] uppercase mb-3 bg-gradient-to-r from-foreground/40 via-foreground/65 to-foreground/40 bg-clip-text text-transparent">
          {getGreeting()} — {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}
        </p>
        <p className="font-['Manrope'] text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed mb-8">
          A daily sanctuary for intentional breathing, honest reflection, and wholesome nourishment.
        </p>
        {/* Rotating quote */}
        <div className="mb-10 max-w-lg min-h-[4.5rem] flex flex-col items-center justify-center">
          <div className={`transition-all duration-500 ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <p className="font-['DM_Serif_Display'] italic text-xl text-muted-foreground leading-relaxed">"{quote.text}"</p>
            <p className="font-['Manrope'] text-xs text-muted-foreground/50 mt-2">— {quote.author}</p>
          </div>
        </div>
        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button onClick={() => setPage("breathing")}
            className="px-9 py-4 rounded-full font-['Manrope'] text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: accent.primary, color: accent.fg, boxShadow:`0 8px 32px ${accent.primary}38` }}>
            Begin your practice
          </button>
          <button onClick={() => setPage("recipes")}
            className="px-7 py-4 rounded-full font-['Manrope'] text-sm text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all duration-300">
            Explore recipes
          </button>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50">
        <span className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Scroll</span>
        <ChevronDown size={16} className="text-muted-foreground anim-scroll-bounce"/>
      </div>
    </section>
  );
}

function BreathingFeatureSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className={`relative min-h-screen flex items-center overflow-hidden scroll-reveal-left ${visible?"visible":""}`}
      style={{ backgroundColor: "#152015" }}>
      {/* Left content */}
      <div className="relative z-10 w-full lg:w-[52%] px-8 sm:px-12 lg:px-20 xl:px-28 py-24">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color:"rgba(166,184,155,0.55)" }}>
          Flagship Feature
        </p>
        <h2 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-7" style={{ color:"#F0EAE0" }}>
          Breathe<br/><em>with purpose</em>
        </h2>
        <p className="font-['Manrope'] text-base leading-relaxed max-w-md mb-10" style={{ color:"rgba(240,234,224,0.6)" }}>
          Six scientifically-backed techniques with animated guidance, calming sound, and a timer. Proven to reduce anxiety, sharpen focus, and prepare the body for deep rest.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {BREATH_MODES.map(m => (
            <span key={m.id} className="px-4 py-2 rounded-full font-['Manrope'] text-xs font-medium"
              style={{ backgroundColor: m.color + "1A", color: m.color, border:`1px solid ${m.color}35` }}>
              {m.name}
            </span>
          ))}
        </div>
        <button onClick={() => setPage("breathing")}
          className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
          style={{ backgroundColor:"#A6B89B", color:"#152015", boxShadow:"0 8px 32px rgba(166,184,155,0.2)" }}>
          <Wind size={16}/> Begin a session
        </button>
      </div>
      {/* Right — animated circle */}
      <div className="absolute right-[-5%] lg:right-[-12%] top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[560px] max-h-[560px]">
        <div className="absolute inset-0 rounded-full anim-pulse-ring" style={{ border:"1px solid rgba(166,184,155,0.18)" }}/>
        <div className="absolute inset-[10%] rounded-full anim-pulse-ring-2" style={{ border:"1px solid rgba(166,184,155,0.25)" }}/>
        <div className="absolute inset-[20%] rounded-full anim-pulse-ring-3" style={{ border:"1px solid rgba(166,184,155,0.32)" }}/>
        <div className="absolute inset-[30%] rounded-full anim-breathe-orb"
          style={{ background:"radial-gradient(circle, rgba(166,184,155,0.12) 0%, transparent 70%)", border:"1px solid rgba(166,184,155,0.40)" }}/>
        <div className="absolute inset-[42%] rounded-full flex items-center justify-center"
          style={{ background:"radial-gradient(135deg, rgba(166,184,155,0.25) 0%, rgba(94,138,100,0.15) 100%)", boxShadow:"0 0 80px rgba(166,184,155,0.15), 0 0 160px rgba(166,184,155,0.05)" }}>
          <Wind size={32} strokeWidth={1} style={{ color:"rgba(166,184,155,0.65)" }}/>
        </div>
      </div>
      {/* Botanical decorations */}
      <BotanicalA className="absolute left-8 bottom-10 w-16 h-26 opacity-[0.08]" style={{ color:"#A6B89B" }}/>
      <BotanicalB className="absolute right-8 top-12 w-14 h-22 opacity-[0.07]" style={{ color:"#A6B89B" }}/>
    </section>
  );
}

function QuoteMomentSection() {
  const [ref, visible] = useScrollReveal();
  const quote = useMemo(() => sessionPick("mqquote", QUOTES), []);
  return (
    <section ref={ref} className={`relative py-28 sm:py-36 overflow-hidden scroll-reveal ${visible?"visible":""}`}
      style={{ background:"linear-gradient(180deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <BotanicalC className="w-10 h-16 mx-auto mb-8 text-primary opacity-35"/>
        <blockquote>
          <p className="font-['DM_Serif_Display'] italic text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.2] mb-7">
            "{quote.text}"
          </p>
          <footer className="font-['Manrope'] text-sm text-muted-foreground tracking-wider">
            — {quote.author}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function MoodSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const [savedMood, setSavedMood] = useLocalStorage<{mood:Mood|null;date:string}>("ara_mood",{mood:null,date:""});
  const todayMood: Mood|null = savedMood.date === todayStr() ? savedMood.mood : null;
  const moodInfo = MOOD_OPTIONS.find(m => m.id === todayMood);
  const select = (m: Mood) => setSavedMood({mood:m,date:todayStr()});
  return (
    <section ref={ref} className={`py-24 sm:py-32 scroll-reveal ${visible?"visible":""}`}>
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-4">Check in with yourself</p>
        <h2 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-foreground mb-3">
          How are you feeling<br/><em>right now?</em>
        </h2>
        <p className="font-['Manrope'] text-muted-foreground mb-10">Select your mood and we'll suggest what your body and mind might need.</p>
        {/* Mood pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {MOOD_OPTIONS.map(m => (
            <button key={m.id} onClick={() => select(m.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border font-['Manrope'] text-sm transition-all duration-300 ${
                todayMood===m.id ? "border-transparent shadow-lg scale-105" : "border-border hover:border-primary/30 hover:scale-[1.02] bg-card"
              }`}
              style={todayMood===m.id ? { backgroundColor: accent.primary, color: accent.fg } : {}}>
              <span className="text-xl">{m.emoji}</span> {m.label}
            </button>
          ))}
        </div>
        {/* Recommendations */}
        <AnimatePresence>
          {moodInfo && (
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>
              <p className="font-['Manrope'] text-xs uppercase tracking-wider text-muted-foreground mb-4">Tailored for you right now</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {moodInfo.recs.map((r,i) => (
                  <motion.button key={r.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                    onClick={() => setPage(r.page)}
                    className="text-left p-5 rounded-2xl border border-border bg-card hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-1.5 h-1.5 rounded-full mb-3" style={{ backgroundColor: accent.primary }}/>
                    <p className="font-['DM_Serif_Display'] text-lg text-foreground group-hover:text-primary transition-colors">{r.label}</p>
                    <p className="font-['Manrope'] text-xs text-muted-foreground mt-1.5">{r.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ChecklistWaterSection({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const [items, setItems] = useLocalStorage<CheckItem[]>("ara_checklist", DEFAULT_TASKS.map(t=>({id:uid(),text:t,done:false})));
  const [waterData, setWaterData] = useLocalStorage<{count:number;date:string}>("ara_water",{count:0,date:""});
  const waterCount = waterData.date===todayStr() ? waterData.count : 0;
  const doneCount = items.filter(i=>i.done).length;
  const toggle = (id: string) => setItems(p => p.map(i => i.id===id ? {...i,done:!i.done} : i));
  const toggleWater = (idx: number) => setWaterData({count: idx < waterCount ? idx : idx+1, date:todayStr()});
  return (
    <section ref={ref} className={`py-20 sm:py-28 scroll-reveal ${visible?"visible":""}`}
      style={{ background:"linear-gradient(180deg, var(--background) 0%, var(--muted) 100%)" }}>
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-6">
        {/* Checklist */}
        <div className="md:col-span-3 bg-card rounded-3xl border border-border p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background:`linear-gradient(90deg, ${accent.primary} ${(doneCount/Math.max(items.length,1))*100}%, var(--muted) ${(doneCount/Math.max(items.length,1))*100}%)` }}/>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Daily Habits</p>
              <h3 className="font-['DM_Serif_Display'] text-2xl text-foreground">Today's Checklist</h3>
            </div>
            <span className="font-['Manrope'] text-sm text-muted-foreground">{doneCount}/{items.length}</span>
          </div>
          <div className="space-y-2.5">
            {items.slice(0,6).map(item => (
              <button key={item.id} onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-all text-left group">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.done?"border-transparent":"border-muted-foreground/30 group-hover:border-primary/50"}`}
                  style={item.done ? { backgroundColor:accent.primary,borderColor:accent.primary } : {}}>
                  {item.done && <Check size={11} color={accent.fg} strokeWidth={3}/>}
                </div>
                <span className={`font-['Manrope'] text-sm transition-all ${item.done?"line-through text-muted-foreground/50":"text-foreground"}`}>{item.text}</span>
              </button>
            ))}
          </div>
          {items.length > 6 && (
            <p className="font-['Manrope'] text-xs text-muted-foreground mt-3 ml-3">+{items.length-6} more tasks</p>
          )}
        </div>
        {/* Water tracker */}
        <div className="md:col-span-2 bg-card rounded-3xl border border-border p-8 flex flex-col justify-between">
          <div>
            <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Daily Goal</p>
            <h3 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-1">Hydration</h3>
            <p className="font-['Manrope'] text-sm text-muted-foreground mb-6">{waterCount} of 8 glasses</p>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {Array.from({length:8},(_,i) => (
                <button key={i} onClick={() => toggleWater(i)}
                  className="aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={i<waterCount ? { backgroundColor:accent.primary, boxShadow:`0 4px 16px ${accent.primary}30` } : { backgroundColor:"var(--muted)", border:"1px solid var(--border)" }}
                  aria-label={`Glass ${i+1}`}>
                  <Droplets size={16} color={i<waterCount ? accent.fg : "var(--muted-foreground)"} strokeWidth={i<waterCount?2:1.5}/>
                </button>
              ))}
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${(waterCount/8)*100}%`, backgroundColor:accent.primary }}/>
            </div>
            <p className="font-['Manrope'] text-xs text-muted-foreground mt-2">{Math.round((waterCount/8)*100)}% of daily goal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecipeSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className={`relative overflow-hidden scroll-reveal-right ${visible?"visible":""}`}
      style={{ backgroundColor:"#2B1608" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color:"rgba(201,138,103,0.7)" }}>
            Pantry Recipe Generator
          </p>
          <h2 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-7" style={{ color:"#F0EAE0" }}>
            Wholesome meals<br/><em>from what you have</em>
          </h2>
          <p className="font-['Manrope'] text-base leading-relaxed max-w-lg mb-10" style={{ color:"rgba(240,234,224,0.55)" }}>
            Select the ingredients in your pantry, set your preferences — craving, diet, cooking time — and we'll generate nourishing recipes tailored to you. Regenerate as many times as you like.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {["Vegan","Gluten Free","High Protein","Quick & Easy","Comfort Food","Meal Prep"].map(t => (
              <span key={t} className="px-3.5 py-1.5 rounded-full font-['Manrope'] text-xs"
                style={{ backgroundColor:"rgba(201,138,103,0.15)", color:"rgba(201,138,103,0.85)", border:"1px solid rgba(201,138,103,0.25)" }}>
                {t}
              </span>
            ))}
          </div>
          <button onClick={() => setPage("recipes")}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
            style={{ backgroundColor:"#C98A67", color:"#2B1608", boxShadow:"0 8px 32px rgba(201,138,103,0.25)" }}>
            <Sparkles size={16}/> Generate recipes
          </button>
        </div>
        {/* Food image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]" style={{ boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}>
            <img src={`https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&auto=format`}
              alt="Colorful healthy food bowl" className="w-full h-full object-cover opacity-80"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(135deg, rgba(43,22,8,0.3) 0%, transparent 60%)" }}/>
          </div>
          {/* Floating tags */}
          <div className="absolute -top-5 -right-4 bg-card rounded-2xl border border-border px-4 py-3 shadow-xl hidden sm:block">
            <p className="font-['DM_Serif_Display'] text-foreground text-base">380 kcal</p>
            <p className="font-['Manrope'] text-muted-foreground text-xs mt-0.5">per serving</p>
          </div>
          <div className="absolute -bottom-5 -left-4 bg-card rounded-2xl border border-border px-4 py-3 shadow-xl hidden sm:block">
            <p className="font-['DM_Serif_Display'] text-foreground text-base">12 recipes</p>
            <p className="font-['Manrope'] text-muted-foreground text-xs mt-0.5">in our library</p>
          </div>
          <BotanicalA className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-26 opacity-[0.12]" style={{ color:"#C98A67" }}/>
        </div>
      </div>
    </section>
  );
}

function LibrarySection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className={`py-24 sm:py-32 scroll-reveal ${visible?"visible":""}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Evidence-Based Knowledge</p>
            <h2 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-foreground">Wellness Library</h2>
          </div>
          <button onClick={() => setPage("library")}
            className="hidden sm:flex items-center gap-2 font-['Manrope'] text-sm transition-colors flex-shrink-0 hover:opacity-70"
            style={{ color: accent.primary }}>
            Browse all <ArrowRight size={15}/>
          </button>
        </div>
        {/* Magazine grid */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Featured large */}
          <button onClick={() => setPage("library")}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto group">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=700&fit=crop&auto=format"
              alt="Meditation practice" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(10deg, rgba(22,34,20,0.85) 0%, rgba(22,34,20,0.3) 55%, transparent 80%)" }}/>
            <div className="absolute bottom-0 left-0 p-7">
              <span className="font-['Manrope'] text-xs px-3 py-1.5 rounded-full mb-3 inline-block"
                style={{ backgroundColor:"rgba(166,184,155,0.2)", color:"rgba(166,184,155,0.9)", border:"1px solid rgba(166,184,155,0.3)" }}>
                {LIBRARY_ARTICLES[0].category}
              </span>
              <h3 className="font-['DM_Serif_Display'] text-2xl lg:text-3xl text-white leading-snug mt-2">{LIBRARY_ARTICLES[0].title}</h3>
              <p className="font-['Manrope'] text-sm mt-3 leading-relaxed line-clamp-2" style={{ color:"rgba(255,255,255,0.65)" }}>{LIBRARY_ARTICLES[0].summary}</p>
              <p className="font-['Manrope'] text-xs mt-3" style={{ color:"rgba(255,255,255,0.4)" }}>{LIBRARY_ARTICLES[0].readTime} read</p>
            </div>
          </button>
          {/* Smaller cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {LIBRARY_ARTICLES.slice(1,4).map(a => (
              <button key={a.id} onClick={() => setPage("library")}
                className="text-left bg-card rounded-2xl border border-border p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                <span className="font-['Manrope'] text-[10px] uppercase tracking-wider"
                  style={{ color: CAT_COLORS[a.category] ?? accent.primary }}>
                  {a.category} · {a.readTime}
                </span>
                <h3 className="font-['DM_Serif_Display'] text-lg text-foreground mt-2 group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                <p className="font-['Manrope'] text-xs text-muted-foreground mt-2 line-clamp-2">{a.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const prompt = useMemo(() => dayPick(REFLECTION_PROMPTS), []);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>("ara_journal", []);
  const save = () => {
    if (!text.trim()) return;
    setEntries(p => [{ id:uid(), date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}), prompt, text:text.trim() }, ...p]);
    setText(""); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };
  return (
    <section ref={ref} className={`relative overflow-hidden scroll-reveal-left ${visible?"visible":""}`}
      style={{ backgroundColor:"#1A1510" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: quote + label */}
        <div>
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color:"rgba(230,211,138,0.5)" }}>
            Gratitude Journal
          </p>
          <h2 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-8" style={{ color:"#F0EAE0" }}>
            Words that<br/><em>heal the mind</em>
          </h2>
          <p className="font-['Manrope'] text-base leading-relaxed mb-8" style={{ color:"rgba(240,234,224,0.5)" }}>
            Writing honestly about thoughts and feelings reduces stress, improves clarity, and builds emotional resilience. Even three minutes of daily journaling compounds over time.
          </p>
          {entries.length > 0 && (
            <div className="space-y-3">
              <p className="font-['Manrope'] text-xs uppercase tracking-wider" style={{ color:"rgba(240,234,224,0.35)" }}>Recent entries</p>
              {entries.slice(0,2).map(e => (
                <div key={e.id} className="p-4 rounded-2xl" style={{ backgroundColor:"rgba(240,234,224,0.06)", border:"1px solid rgba(240,234,224,0.08)" }}>
                  <p className="font-['Manrope'] text-xs mb-1.5" style={{ color:"rgba(240,234,224,0.35)" }}>{e.date}</p>
                  <p className="font-['Manrope'] text-sm line-clamp-2" style={{ color:"rgba(240,234,224,0.65)" }}>{e.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right: journal card */}
        <div className="relative">
          <div className="bg-[#F7F3EC] rounded-3xl p-8 relative overflow-hidden" style={{ boxShadow:"0 32px 80px rgba(0,0,0,0.35)" }}>
            {/* Paper lines */}
            {Array.from({length:8},(_,i) => (
              <div key={i} className="absolute left-12 right-6 h-px" style={{ top:`${88+i*36}px`, backgroundColor:"rgba(63,58,54,0.08)" }}/>
            ))}
            <div className="relative z-10">
              <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Today's Prompt</p>
              <p className="font-['DM_Serif_Display'] text-lg text-foreground italic leading-relaxed mb-5">"{prompt}"</p>
              <textarea value={text} onChange={e=>setText(e.target.value)} rows={4}
                placeholder="Begin writing freely…"
                className="w-full bg-transparent font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none leading-9 border-0"/>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-foreground/10">
                {saved ? (
                  <span className="font-['Manrope'] text-xs flex items-center gap-1.5" style={{ color:accent.primary }}>
                    <Check size={13}/> Saved to your journal
                  </span>
                ) : (
                  <span className="font-['Manrope'] text-xs text-muted-foreground">{text.length} characters</span>
                )}
                <div className="flex gap-2">
                  <button onClick={save} disabled={!text.trim()}
                    className="px-5 py-2 rounded-xl font-['Manrope'] text-xs font-medium transition-all disabled:opacity-40"
                    style={{ backgroundColor:accent.primary, color:accent.fg }}>
                    Save entry
                  </button>
                  <button onClick={() => setPage("journal")}
                    className="px-4 py-2 rounded-xl font-['Manrope'] text-xs text-muted-foreground border border-border hover:bg-muted transition-all">
                    Full journal
                  </button>
                </div>
              </div>
            </div>
          </div>
          <BotanicalB className="absolute -right-10 -bottom-10 w-20 h-32 opacity-[0.07]" style={{ color:"#F0EAE0" }}/>
        </div>
      </div>
    </section>
  );
}

function FocusSection({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const circumference = 2 * Math.PI * 52;
  const progress = (duration - timeLeft) / duration;
  useEffect(() => {
    if (!running || done) return;
    const t = setInterval(() => {
      setTimeLeft(p => { if (p <= 1) { setDone(true); setRunning(false); return 0; } return p-1; });
    }, 1000);
    return () => clearInterval(t);
  }, [running, done]);
  const setPreset = (m: number) => {
    const s = m*60; setDuration(s); setTimeLeft(s); setRunning(false); setDone(false);
  };
  const fmt = (secs: number) => `${String(Math.floor(secs/60)).padStart(2,"0")}:${String(secs%60).padStart(2,"0")}`;
  return (
    <section ref={ref} className={`py-24 sm:py-32 scroll-reveal ${visible?"visible":""}`}
      style={{ background:"linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-4">Pomodoro Timer</p>
        <h2 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-foreground mb-3">
          Find your <em>flow state</em>
        </h2>
        <p className="font-['Manrope'] text-muted-foreground mb-12 max-w-lg mx-auto">
          Protect your deep work with structured focus sessions. Choose your duration and let the timer do the rest.
        </p>
        {/* Timer ring */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--muted)" strokeWidth="5"/>
              <circle cx="60" cy="60" r="52" fill="none" strokeWidth="5" strokeLinecap="round"
                style={{ stroke:accent.primary, strokeDasharray:circumference, strokeDashoffset:circumference*(1-progress), transition:"stroke-dashoffset 1s linear" }}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-['DM_Serif_Display'] text-4xl text-foreground">{fmt(timeLeft)}</span>
              {done && <span className="font-['Manrope'] text-xs text-muted-foreground mt-1">Complete ✓</span>}
            </div>
          </div>
        </div>
        {/* Presets */}
        <div className="flex gap-2 justify-center mb-8">
          {[15,25,45,60].map(m => (
            <button key={m} onClick={() => setPreset(m)}
              className={`px-5 py-2.5 rounded-full font-['Manrope'] text-sm border transition-all ${duration===m*60?"border-transparent font-medium":"border-border text-muted-foreground hover:border-primary/40"}`}
              style={duration===m*60 ? { backgroundColor:accent.primary,color:accent.fg } : {}}>
              {m}m
            </button>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          {!done ? (
            <button onClick={() => setRunning(p=>!p)}
              className="px-10 py-3.5 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor:accent.primary,color:accent.fg,boxShadow:`0 8px 24px ${accent.primary}30` }}>
              {running ? "Pause" : "Start focus"}
            </button>
          ) : (
            <button onClick={() => setPreset(duration/60)}
              className="px-10 py-3.5 rounded-full font-['Manrope'] text-sm font-medium border border-border text-foreground hover:bg-muted transition-all">
              <RefreshCw size={14} className="inline mr-2"/>Again
            </button>
          )}
          {(running || timeLeft < duration) && !done && (
            <button onClick={() => { setRunning(false); setTimeLeft(duration); }}
              className="px-8 py-3.5 rounded-full font-['Manrope'] text-sm border border-border text-muted-foreground hover:text-foreground transition-all">
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function FooterSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const quote = useMemo(() => sessionPick("fquote", QUOTES), []);
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor:"#152015" }}>
      <BotanicalA className="absolute left-8 bottom-0 w-24 h-40 opacity-[0.09]" style={{ color:"#A6B89B" }}/>
      <BotanicalB className="absolute right-12 top-8 w-20 h-34 opacity-[0.07]" style={{ color:"#A6B89B" }}/>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="font-['DM_Serif_Display'] text-5xl lg:text-6xl leading-[1.1] italic mb-5" style={{ color:"rgba(240,234,224,0.8)" }}>
            "{quote.text}"
          </p>
          <p className="font-['Manrope'] text-sm" style={{ color:"rgba(240,234,224,0.35)" }}>— {quote.author}</p>
        </div>
        <div className="border-t border-b py-8 mb-8" style={{ borderColor:"rgba(240,234,224,0.08)" }}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <button onClick={() => setPage("home")} className="font-['DM_Serif_Display'] text-3xl" style={{ color:"rgba(240,234,224,0.8)" }}>
              AraNook
            </button>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {NAV_LINKS.map(l => (
                <button key={l.id} onClick={() => setPage(l.id)}
                  className="font-['Manrope'] text-sm transition-opacity hover:opacity-100 opacity-40"
                  style={{ color:"#F0EAE0" }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="font-['Manrope'] text-xs text-center" style={{ color:"rgba(240,234,224,0.25)" }}>
          © {new Date().getFullYear()} AraNook. Made with care for your wellbeing.
        </p>
      </div>
    </footer>
  );
}

function HomePage({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  return (
    <div>
      <HeroSection setPage={setPage} accent={accent}/>
      <BreathingFeatureSection setPage={setPage} accent={accent}/>
      <QuoteMomentSection/>
      <MoodSection setPage={setPage} accent={accent}/>
      <ChecklistWaterSection accent={accent}/>
      <RecipeSection setPage={setPage} accent={accent}/>
      <LibrarySection setPage={setPage} accent={accent}/>
      <JournalSection setPage={setPage} accent={accent}/>
      <FocusSection accent={accent}/>
      <FooterSection setPage={setPage} accent={accent}/>
    </div>
  );
}

// ─── BREATHING PAGE ──────────────────────────────────────────────────────────
function BreathingPage({ accent, settings }: { accent: typeof ACCENTS[AccentKey]; settings: AppSettings }) {
  const [selectedMode, setSelectedMode] = useState<BreathMode>(BREATH_MODES[0]);
  const [customVals, setCustomVals] = useState({ inhale:4, hold1:2, exhale:6, hold2:2, cycles:4 });
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(4);
  const mode = selectedMode.id === "custom" ? { ...selectedMode, ...customVals } : selectedMode;
  const phases = useMemo(() => [
    { phase:"inhale", dur:mode.inhale, label:"Inhale" },
    ...(mode.hold1 > 0 ? [{ phase:"hold1", dur:mode.hold1, label:"Hold" }] : []),
    { phase:"exhale", dur:mode.exhale, label:"Exhale" },
    ...(mode.hold2 > 0 ? [{ phase:"hold2", dur:mode.hold2, label:"Rest" }] : []),
  ], [mode.inhale, mode.hold1, mode.exhale, mode.hold2]);
  const idxRef = useRef(0); const countRef = useRef(mode.inhale); const cycleRef = useRef(1);
  const audioRef = useRef<{ctx:AudioContext;gain:GainNode}|null>(null);
  const stopAudio = useCallback(() => {
    if (!audioRef.current) return;
    const { ctx, gain } = audioRef.current;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
    setTimeout(() => { try { ctx.close(); } catch {} audioRef.current = null; }, 1000);
  }, []);
  const startAudio = useCallback(() => {
    if (!settings.sound) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = 396;
      gain.gain.value = 0; osc.start();
      gain.gain.setTargetAtTime(0.025, ctx.currentTime, 1);
      audioRef.current = { ctx, gain };
    } catch {}
  }, [settings.sound]);
  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      countRef.current--;
      setTimeLeft(countRef.current);
      if (countRef.current <= 0) {
        idxRef.current = (idxRef.current + 1) % phases.length;
        if (idxRef.current === 0) {
          cycleRef.current++;
          setCycle(cycleRef.current);
          if (cycleRef.current > totalCycles) { setFinished(true); stopAudio(); return; }
        }
        const p = phases[idxRef.current];
        setPhase(p.phase); countRef.current = p.dur; setTimeLeft(p.dur);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished, phases, totalCycles, stopAudio]);
  useEffect(() => () => stopAudio(), [stopAudio]);
  const begin = () => {
    idxRef.current=0; countRef.current=mode.inhale; cycleRef.current=1;
    setPhase("inhale"); setTimeLeft(mode.inhale); setCycle(1); setTotalCycles(mode.cycles);
    setFinished(false); setStarted(true); startAudio();
  };
  const reset = () => { setStarted(false); setFinished(false); stopAudio(); };
  const isExpanded = phase==="inhale"||phase==="hold1";
  const phaseDur = phases.find(p=>p.phase===phase)?.dur ?? 4;
  const phaseLabel = phases.find(p=>p.phase===phase)?.label ?? "Breathe";
  const circleColor = started ? mode.color : accent.primary;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor:"#0F1A10" }}>
      <div className="flex-1 max-w-4xl mx-auto px-5 py-10 w-full">
        <div className="pt-6 mb-10">
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color:"rgba(166,184,155,0.5)" }}>Guided Breathing</p>
          <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl" style={{ color:"#F0EAE0" }}>Your Breathing Practice</h1>
        </div>
        {/* Mode selector */}
        {!started && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {BREATH_MODES.map(m => (
              <button key={m.id} onClick={() => setSelectedMode(m)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${selectedMode.id===m.id?"border-transparent shadow-lg":"hover:shadow-sm"}`}
                style={selectedMode.id===m.id
                  ? { backgroundColor:m.color+"22", borderColor:m.color+"55", boxShadow:`0 8px 32px ${m.color}18` }
                  : { backgroundColor:"rgba(240,234,224,0.04)", borderColor:"rgba(240,234,224,0.08)" }}>
                <div className="w-2.5 h-2.5 rounded-full mb-3" style={{ backgroundColor:m.color }}/>
                <p className="font-['DM_Serif_Display'] text-base font-medium mb-1" style={{ color:"#F0EAE0" }}>{m.name}</p>
                <p className="font-['Manrope'] text-xs" style={{ color:"rgba(240,234,224,0.45)" }}>{m.desc}</p>
              </button>
            ))}
          </div>
        )}
        {/* Custom inputs */}
        {!started && selectedMode.id==="custom" && (
          <div className="rounded-2xl border p-5 mb-8" style={{ backgroundColor:"rgba(240,234,224,0.04)", borderColor:"rgba(240,234,224,0.08)" }}>
            <p className="font-['Manrope'] text-sm font-medium mb-4" style={{ color:"#F0EAE0" }}>Customise rhythm (seconds)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(["inhale","hold1","exhale","hold2"] as const).map(k => (
                <div key={k}>
                  <label className="font-['Manrope'] text-xs mb-1.5 block capitalize" style={{ color:"rgba(240,234,224,0.45)" }}>
                    {k==="hold1"?"Hold in":k==="hold2"?"Hold out":k}
                  </label>
                  <input type="number" min={0} max={12} value={customVals[k]}
                    onChange={e=>setCustomVals(p=>({...p,[k]:parseInt(e.target.value)||0}))}
                    className="w-full rounded-xl px-3 py-2 font-['Manrope'] text-sm outline-none"
                    style={{ backgroundColor:"rgba(240,234,224,0.08)", color:"#F0EAE0", border:"1px solid rgba(240,234,224,0.1)" }}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Breathing circle */}
        <div className="flex flex-col items-center py-8">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-80 h-80 rounded-full opacity-15 anim-pulse-ring" style={{ border:`1px solid ${circleColor}` }}/>
            <div className="absolute w-64 h-64 rounded-full opacity-20 anim-pulse-ring-2" style={{ border:`1px solid ${circleColor}` }}/>
            <div className="w-48 h-48 rounded-full flex flex-col items-center justify-center"
              style={{
                background:`radial-gradient(circle, ${circleColor}22 0%, transparent 70%)`,
                border:`1.5px solid ${circleColor}50`,
                transform:`scale(${isExpanded?1.22:1})`,
                transition:`transform ${phaseDur*0.93}s ease-in-out, border-color 0.8s ease`,
                boxShadow:`0 0 80px ${circleColor}15, 0 0 160px ${circleColor}08`,
              }}>
              {started && !finished ? (
                <>
                  <span className="font-['DM_Serif_Display'] text-6xl leading-none" style={{ color:circleColor }}>{timeLeft}</span>
                  <span className="font-['Manrope'] text-sm mt-2" style={{ color:"rgba(240,234,224,0.5)" }}>{phaseLabel}</span>
                </>
              ) : finished ? (
                <motion.div initial={{scale:0.5}} animate={{scale:1}} className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <p className="font-['Manrope'] text-xs" style={{ color:"rgba(240,234,224,0.5)" }}>Complete</p>
                </motion.div>
              ) : (
                <span className="font-['Manrope'] text-sm" style={{ color:"rgba(240,234,224,0.4)" }}>ready</span>
              )}
            </div>
          </div>
          {started && !finished && (
            <p className="font-['Manrope'] text-xs mb-6" style={{ color:"rgba(240,234,224,0.4)" }}>Cycle {cycle} of {totalCycles}</p>
          )}
          {finished && (
            <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-['DM_Serif_Display'] text-xl italic text-center mb-6" style={{ color:"rgba(240,234,224,0.8)" }}>
              {mode.name} complete. Your system has reset.
            </motion.p>
          )}
          {/* Controls */}
          <div className="flex gap-3">
            {!started ? (
              <button onClick={begin}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor:accent.primary, color:accent.fg, boxShadow:`0 8px 32px ${accent.primary}30` }}>
                <Wind size={16}/> Begin Session
              </button>
            ) : (
              <button onClick={reset} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-['Manrope'] text-sm transition-all"
                style={{ backgroundColor:"rgba(240,234,224,0.08)", color:"rgba(240,234,224,0.7)", border:"1px solid rgba(240,234,224,0.12)" }}>
                <RefreshCw size={15}/> Start Over
              </button>
            )}
          </div>
          {/* Phase stats */}
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            {([["Inhale",mode.inhale],["Hold",mode.hold1],["Exhale",mode.exhale],["Rest",mode.hold2]] as [string,number][]).map(([l,v]) =>
              v > 0 ? (
                <div key={l} className="rounded-2xl px-5 py-3 text-center" style={{ backgroundColor:"rgba(240,234,224,0.05)", border:"1px solid rgba(240,234,224,0.08)" }}>
                  <p className="font-['DM_Serif_Display'] text-2xl" style={{ color:circleColor }}>{v}</p>
                  <p className="font-['Manrope'] text-xs" style={{ color:"rgba(240,234,224,0.4)" }}>{l}s</p>
                </div>
              ) : null
            )}
          </div>
        </div>
        {/* Benefit */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-['Manrope'] px-5 py-2.5 rounded-full"
            style={{ backgroundColor:circleColor+"18", color:circleColor, border:`1px solid ${circleColor}30` }}>
            <Sparkles size={13}/> {mode.benefit}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── RECIPES PAGE ────────────────────────────────────────────────────────────
const SPICE_CONFIG = {
  mild:     { label: "Mild",      color: "#5E8A64", dots: 1 },
  medium:   { label: "Medium",    color: "#C4A067", dots: 2 },
  spicy:    { label: "Spicy",     color: "#E67E22", dots: 3 },
  veryspicy:{ label: "Very Spicy",color: "#C0392B", dots: 4 },
};

function SpiceDots({ level }: { level: SmartRecipe["spiceLevel"] }) {
  const cfg = SPICE_CONFIG[level];
  return (
    <span className="inline-flex items-center gap-0.5" title={cfg.label}>
      {Array.from({ length: cfg.dots }).map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: cfg.color }} />
      ))}
      {Array.from({ length: 4 - cfg.dots }).map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full inline-block opacity-20" style={{ backgroundColor: cfg.color }} />
      ))}
    </span>
  );
}

function RecipesPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIng, setCustomIng] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<string[]>("ara_recent_ings", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("ara_fav_recipes", []);
  const [filters, setFilters] = useState<SmartFilters>(DEFAULT_SMART_FILTERS);
  const [results, setResults] = useState<ScoredRecipe[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ingSearch, setIngSearch] = useState("");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{ ing: string; count: number }[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<"ingredients" | "results">("ingredients");

  const toggleIng = (ing: string) => setSelectedIngredients(p => p.includes(ing) ? p.filter(x => x !== ing) : [...p, ing]);

  const addCustom = () => {
    if (!customIng.trim()) return;
    const ing = customIng.trim();
    if (!selectedIngredients.includes(ing)) setSelectedIngredients(p => [...p, ing]);
    setCustomIng("");
  };

  const toggleCuisine = (id: string) => {
    if (id === "Random") {
      setFilters(p => ({ ...p, cuisines: p.cuisines.includes("Random") ? [] : ["Random"] }));
      return;
    }
    setFilters(p => ({
      ...p,
      cuisines: p.cuisines.includes(id)
        ? p.cuisines.filter(c => c !== id)
        : [...p.cuisines.filter(c => c !== "Random"), id]
    }));
  };

  const filteredCats = useMemo(() => {
    if (!ingSearch) return INGREDIENT_DB;
    const s = ingSearch.toLowerCase();
    const r: Record<string, string[]> = {};
    Object.entries(INGREDIENT_DB).forEach(([cat, items]) => {
      const m = items.filter(i => i.toLowerCase().includes(s));
      if (m.length) r[cat] = m;
    });
    return r;
  }, [ingSearch]);

  const displayResults = useMemo(() => showFavsOnly ? results.filter(r => favorites.includes(r.recipe.id)) : results, [results, favorites, showFavsOnly]);

  const matchIng = (user: string, recipe: string) => {
    const u = user.toLowerCase().trim(); const r = recipe.toLowerCase().trim();
    return r.includes(u) || u.includes(r);
  };

  const generate = () => {
    setGenerating(true); setActiveTab("results");
    setTimeout(() => {
      const hasSelection = selectedIngredients.length > 0;
      // STRICT cuisine pre-filter: when a cuisine is chosen, only that cuisine's recipes are considered
      const hasCuisineFilter = filters.cuisines.length > 0 && !filters.cuisines.includes("Random");
      const cuisinePool = hasCuisineFilter
        ? SMART_RECIPES.filter(r => cuisineMatches(filters.cuisines, r.cuisine))
        : SMART_RECIPES;
      const allScored: ScoredRecipe[] = cuisinePool.map(recipe => {
        const matchedCore: string[] = []; const missingCore: string[] = [];
        if (hasSelection) {
          recipe.coreIngredients.forEach(ci => {
            selectedIngredients.some(u => matchIng(u, ci)) ? matchedCore.push(ci) : missingCore.push(ci);
          });
        } else { missingCore.push(...recipe.coreIngredients); }
        const ingredientScore = recipe.coreIngredients.length > 0
          ? (matchedCore.length / recipe.coreIngredients.length) * 100 : 50;
        let filterScore = 0;
        if (filters.craving === "any" || recipe.cravings.includes(filters.craving)) filterScore += 22;
        if (filters.meal === "all" || recipe.mealTypes.includes(filters.meal)) filterScore += 22;
        if (filters.time === 0 || recipe.time <= filters.time) filterScore += 15;
        if (filters.difficulty === "any" || recipe.difficulty === filters.difficulty) filterScore += 15;
        if (filters.diet === "none" || recipe.diet.includes(filters.diet)) filterScore += 15;
        if (filters.calorieLevel === "any" || recipe.calorieLevel === filters.calorieLevel) filterScore += 6;
        if (filters.spiceLevel === "any" || recipe.spiceLevel === filters.spiceLevel) filterScore += 5;
        const totalScore = hasSelection
          ? (ingredientScore * 0.65) + (filterScore * 0.35) + Math.random() * 3
          : filterScore + Math.random() * 8;
        return { recipe, totalScore, ingredientScore: Math.round(ingredientScore), matchedCore, missingCore };
      });
      // When cuisine is selected, show all cuisine-matching recipes (no ingredient % gate)
      // When no cuisine, require 30% ingredient match if ingredients are selected
      const qualified = hasSelection && !hasCuisineFilter
        ? allScored.filter(s => s.ingredientScore >= 30)
        : allScored;
      qualified.sort((a, b) => b.totalScore - a.totalScore);
      const top = qualified.slice(0, 15);
      setResults(top);
      if (top.length < 5 && hasSelection && !hasCuisineFilter) {
        const missCounts: Record<string, number> = {};
        allScored.filter(s => s.ingredientScore < 30).forEach(s => s.missingCore.slice(0, 2).forEach(i => { missCounts[i] = (missCounts[i] || 0) + 1; }));
        setSuggestions(Object.entries(missCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([ing, count]) => ({ ing, count })));
      } else { setSuggestions([]); }
      if (hasSelection) setRecentlyUsed(p => [...selectedIngredients, ...p.filter(x => !selectedIngredients.includes(x))].slice(0, 12));
      setGenerating(false); setGenerated(true);
    }, 1800);
  };

  const toggleFav = (id: string) => setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const selectedCuisineLabel = filters.cuisines.length === 0 ? "Any cuisine" : filters.cuisines.includes("Random") ? "🎲 Surprise me" : filters.cuisines.slice(0, 2).join(", ") + (filters.cuisines.length > 2 ? ` +${filters.cuisines.length - 2}` : "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-6">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Smart Cooking Assistant</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-2">Pantry Recipe Generator</h1>
        <p className="font-['Manrope'] text-muted-foreground">Pick a cuisine. Add your ingredients. Get recipes that actually belong to that kitchen.</p>
      </div>

      {/* ─── Explore World Cuisines ─── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground">🌍 Explore World Cuisines</p>
          {filters.cuisines.length > 0 && !filters.cuisines.includes("Random") && (
            <button onClick={() => setFilters(p => ({ ...p, cuisines: [] }))}
              className="font-['Manrope'] text-xs px-3 py-1 rounded-full border transition-all"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
              Clear selection
            </button>
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {WORLD_CUISINES_DATA.map(c => {
            const isSelected = filters.cuisines.includes(c.id);
            return (
              <button key={c.id} onClick={() => toggleCuisine(c.id)}
                className="flex-shrink-0 w-32 rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.03] active:scale-[0.98] text-left"
                style={{ borderColor: isSelected ? accent.primary : "transparent", boxShadow: isSelected ? `0 0 0 2px ${accent.primary}` : "none" }}>
                <div className="relative h-20 bg-muted">
                  <img src={c.img} alt={c.label} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1.5 left-2 font-['Manrope'] text-white text-[10px] font-semibold uppercase tracking-wide">{c.label}</span>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accent.primary }}>
                      <Check size={10} color="white" />
                    </div>
                  )}
                </div>
                <div className="px-2 py-1.5 bg-card">
                  <p className="font-['Manrope'] text-[10px] text-muted-foreground leading-tight">{c.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        {filters.cuisines.length > 0 && !filters.cuisines.includes("Random") && (
          <p className="font-['Manrope'] text-xs mt-2 font-medium" style={{ color: accent.primary }}>
            Showing only: {filters.cuisines.join(", ")} — recipes from other cuisines are excluded
          </p>
        )}
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden flex gap-2 mb-5">
        {(["ingredients","results"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-1 py-2.5 rounded-xl font-['Manrope'] text-sm font-medium border transition-all capitalize"
            style={activeTab === t ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
            {t === "ingredients" ? `🥬 Ingredients${selectedIngredients.length > 0 ? ` (${selectedIngredients.length})` : ""}` : `🍽 Recipes${generated ? ` (${results.length})` : ""}`}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] gap-6">
        {/* ─── LEFT SIDEBAR ─── */}
        <div className={`${activeTab === "results" ? "hidden md:block" : "block"} space-y-4`}>

          {/* Ingredient Selector */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-3">What's in your kitchen?</h3>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={ingSearch} onChange={e => setIngSearch(e.target.value)} placeholder="Search ingredients…"
                className="w-full bg-muted pl-8 pr-3 py-2.5 rounded-xl font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
            <div className="flex gap-2 mb-4">
              <input value={customIng} onChange={e => setCustomIng(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustom()}
                placeholder="Add custom ingredient…"
                className="flex-1 bg-muted px-3 py-2 rounded-xl font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground outline-none" />
              <button onClick={addCustom} disabled={!customIng.trim()}
                className="px-3 py-2 rounded-xl font-['Manrope'] text-sm font-medium disabled:opacity-40 flex items-center"
                style={{ backgroundColor: accent.primary, color: accent.fg }}>
                <Plus size={15} />
              </button>
            </div>
            {recentlyUsed.length > 0 && !ingSearch && (
              <div className="mb-4">
                <p className="font-['Manrope'] text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Recently used</p>
                <div className="flex flex-wrap gap-1.5">
                  {recentlyUsed.slice(0, 8).map(ing => (
                    <button key={ing} onClick={() => toggleIng(ing)}
                      className="text-xs font-['Manrope'] px-2.5 py-1.5 rounded-full border transition-all"
                      style={selectedIngredients.includes(ing) ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                      {ing}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedIngredients.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-['Manrope'] text-[10px] uppercase tracking-wider text-muted-foreground">Selected ({selectedIngredients.length})</p>
                  <button onClick={() => setSelectedIngredients([])} className="font-['Manrope'] text-xs text-muted-foreground hover:text-foreground">Clear all</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIngredients.map(ing => (
                    <span key={ing} className="inline-flex items-center gap-1 text-xs font-['Manrope'] px-2.5 py-1.5 rounded-full"
                      style={{ backgroundColor: accent.primary, color: accent.fg }}>
                      {ing}<button onClick={() => toggleIng(ing)} className="opacity-70 hover:opacity-100"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-0.5 max-h-64 overflow-y-auto pr-1">
              {Object.entries(filteredCats).map(([cat, items]) => {
                const selCount = items.filter(i => selectedIngredients.includes(i)).length;
                return (
                  <div key={cat}>
                    <button onClick={() => setOpenCat(openCat === cat ? null : cat)}
                      className="w-full flex items-center justify-between font-['Manrope'] text-xs font-medium text-foreground py-2 px-1 hover:text-primary transition-colors">
                      <span>{cat}</span>
                      <span className="flex items-center gap-1.5">
                        {selCount > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: accent.soft, color: accent.primary }}>{selCount}</span>}
                        <ChevronRight size={12} className={`transition-transform ${openCat === cat ? "rotate-90" : ""}`} />
                      </span>
                    </button>
                    {openCat === cat && (
                      <div className="flex flex-wrap gap-1.5 pb-3 pl-1">
                        {items.map(i => (
                          <button key={i} onClick={() => toggleIng(i)}
                            className="text-xs font-['Manrope'] px-2.5 py-1.5 rounded-full border transition-all"
                            style={selectedIngredients.includes(i) ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--foreground)" }}>
                            {i}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cuisine selector */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <button className="w-full flex items-center justify-between mb-1" onClick={() => setShowFilters(p => !p)}>
              <div>
                <h3 className="font-['DM_Serif_Display'] text-xl text-foreground text-left">Cuisine & Preferences</h3>
                <p className="font-['Manrope'] text-xs text-muted-foreground text-left mt-0.5">{selectedCuisineLabel}</p>
              </div>
              <ChevronRight size={16} className={`text-muted-foreground transition-transform flex-shrink-0 ${showFilters ? "rotate-90" : ""}`} />
            </button>
            {showFilters && (
              <div className="space-y-5 mt-4">
                {/* Cuisine multi-select */}
                {CUISINE_GROUPS.map(group => (
                  <div key={group.label}>
                    <p className="font-['Manrope'] text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map(c => (
                        <button key={c.id} onClick={() => toggleCuisine(c.id)}
                          className="text-xs font-['Manrope'] px-2.5 py-1.5 rounded-full border transition-all"
                          style={filters.cuisines.includes(c.id) ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <button onClick={() => toggleCuisine("Random")}
                    className="text-xs font-['Manrope'] px-3 py-1.5 rounded-full border transition-all"
                    style={filters.cuisines.includes("Random") ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                    🎲 Surprise Me
                  </button>
                  {filters.cuisines.length > 0 && (
                    <button onClick={() => setFilters(p => ({ ...p, cuisines: [] }))} className="ml-2 font-['Manrope'] text-xs text-muted-foreground hover:text-foreground">
                      Clear
                    </button>
                  )}
                </div>
                {/* Other filters */}
                {([
                  ["Craving", "craving", [["any","Any"],["savoury","Savoury"],["sweet","Sweet"],["spicy","Spicy"],["comfort","Comfort"],["fresh-light","Fresh & Light"],["healthy","Healthy"],["high-protein","High Protein"]]],
                  ["Meal Type", "meal", [["all","Any"],["breakfast","Breakfast"],["lunch","Lunch"],["dinner","Dinner"],["snack","Snack"]]],
                  ["Cook Time", "time", [[0,"Any"],[10,"≤10 min"],[20,"≤20 min"],[30,"≤30 min"]]],
                  ["Spice Level", "spiceLevel", [["any","Any"],["mild","🌶 Mild"],["medium","🌶🌶 Medium"],["spicy","🌶🌶🌶 Spicy"],["veryspicy","🌶🌶🌶🌶 Very Spicy"]]],
                  ["Difficulty", "difficulty", [["any","Any"],["easy","Easy"],["medium","Medium"],["advanced","Advanced"]]],
                  ["Diet", "diet", [["none","Any"],["vegan","Vegan"],["vegetarian","Vegetarian"],["highprotein","High Protein"],["glutenfree","Gluten Free"],["dairyfree","Dairy Free"]]],
                  ["Calories", "calorieLevel", [["any","Any"],["light","Light"],["balanced","Balanced"],["high","High Energy"]]],
                ] as [string, keyof SmartFilters, [string|number, string][]][]).map(([label, key, opts]) => (
                  <div key={key}>
                    <label className="font-['Manrope'] text-xs text-muted-foreground mb-2 block">{label}</label>
                    <div className="flex flex-wrap gap-1.5">
                      {opts.map(([v, l]) => (
                        <button key={String(v)} onClick={() => setFilters(p => ({ ...p, [key]: v }))}
                          className="text-xs font-['Manrope'] px-3 py-1.5 rounded-full border transition-all"
                          style={filters[key] === v ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generate button */}
          <button onClick={generate} disabled={generating}
            className="w-full py-4 rounded-2xl font-['Manrope'] font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99]"
            style={{ backgroundColor: accent.primary, color: accent.fg, boxShadow: `0 8px 28px ${accent.primary}35` }}>
            {generating ? <><RefreshCw size={16} className="animate-spin" />Finding recipes…</> : <><Sparkles size={16} />{generated ? "Regenerate Recipes" : "Generate Recipes"}</>}
          </button>
        </div>

        {/* ─── RESULTS AREA ─── */}
        <div className={`${activeTab === "ingredients" ? "hidden md:block" : "block"}`}>

          {suggestions.length > 0 && (
            <div className="rounded-2xl border p-4 mb-5" style={{ backgroundColor: accent.soft, borderColor: accent.muted }}>
              <p className="font-['DM_Serif_Display'] text-base text-foreground mb-1.5">💡 Unlock more recipes</p>
              <p className="font-['Manrope'] text-sm text-muted-foreground mb-3">Adding any of these ingredients would open up more options:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button key={s.ing} onClick={() => toggleIng(s.ing)}
                    className="inline-flex items-center gap-1.5 text-sm font-['Manrope'] px-3.5 py-2 rounded-full border transition-all hover:scale-105"
                    style={{ backgroundColor: "var(--card)", borderColor: `${accent.primary}50`, color: accent.primary }}>
                    <Plus size={12} /> {s.ing} <span className="text-xs text-muted-foreground">+{s.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {generated && !generating && (
            <div className="flex items-center justify-between mb-4">
              <p className="font-['Manrope'] text-sm text-muted-foreground">
                {results.length} recipe{results.length !== 1 ? "s" : ""} found
                {selectedIngredients.length > 0 ? ` using your ${selectedIngredients.length} ingredients` : ""}
              </p>
              <button onClick={() => setShowFavsOnly(p => !p)}
                className="flex items-center gap-1.5 text-xs font-['Manrope'] px-3 py-1.5 rounded-full border transition-all"
                style={showFavsOnly ? { backgroundColor: accent.primary, color: accent.fg, borderColor: "transparent" } : { borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                <Heart size={11} /> Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
              </button>
            </div>
          )}

          {!generated && !generating && (
            <div className="flex flex-col items-center justify-center min-h-80 text-center py-20">
              <div className="w-18 h-18 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: accent.soft, width: "72px", height: "72px" }}>
                <ChefHat size={30} style={{ color: accent.primary }} />
              </div>
              <p className="font-['DM_Serif_Display'] text-2xl text-foreground mb-2">Your recipes await</p>
              <p className="font-['Manrope'] text-sm text-muted-foreground max-w-sm">
                {filters.cuisines.length > 0 && !filters.cuisines.includes("Random")
                  ? `${filters.cuisines.join(", ")} cuisine selected. Add ingredients and hit Generate — only ${filters.cuisines.join(" / ")} recipes will appear.`
                  : selectedIngredients.length === 0
                    ? "Choose a cuisine above, add ingredients, then hit Generate to discover recipes from that kitchen."
                    : `${selectedIngredients.length} ingredient${selectedIngredients.length !== 1 ? "s" : ""} selected. Hit Generate to find your recipes.`}
              </p>
            </div>
          )}

          {generating && (
            <div className="flex flex-col items-center justify-center min-h-80 py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-t-transparent mb-5"
                style={{ borderColor: accent.muted, borderTopColor: accent.primary }} />
              <p className="font-['DM_Serif_Display'] text-xl italic text-muted-foreground">
                {filters.cuisines.length > 0 && !filters.cuisines.includes("Random")
                  ? `Finding ${filters.cuisines.join(", ")} recipes…`
                  : selectedIngredients.length > 0 ? "Matching recipes to your pantry…" : "Curating your recipes…"}
              </p>
            </div>
          )}

          {generated && !generating && displayResults.length === 0 && showFavsOnly && (
            <div className="text-center py-16">
              <p className="font-['DM_Serif_Display'] text-xl text-muted-foreground mb-3">No saved recipes yet</p>
              <button onClick={() => setShowFavsOnly(false)} className="font-['Manrope'] text-sm" style={{ color: accent.primary }}>View all recipes</button>
            </div>
          )}

          {generated && !generating && displayResults.length > 0 && (
            <div className="space-y-4">
              {displayResults.map((sr, i) => {
                const { recipe, ingredientScore, matchedCore, missingCore } = sr;
                const isFav = favorites.includes(recipe.id);
                const isExpanded = expandedId === recipe.id;
                const matchColor = ingredientScore >= 70 ? "#4A8A52" : ingredientScore >= 40 ? "#C4A067" : "var(--muted-foreground)";
                return (
                  <motion.div key={recipe.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-['Manrope'] text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: accent.soft, color: accent.primary }}>{recipe.cuisine}</span>
                            <span className="font-['Manrope'] text-xs text-muted-foreground capitalize">{recipe.mealTypes[0]}</span>
                            <span className="font-['Manrope'] text-xs text-muted-foreground flex items-center gap-1"><Clock size={11} />{recipe.time} min</span>
                            <span className="font-['Manrope'] text-xs text-muted-foreground">{recipe.calories} kcal</span>
                            <span className="font-['Manrope'] text-xs text-muted-foreground capitalize">{recipe.difficulty}</span>
                            <span className="flex items-center gap-1"><SpiceDots level={recipe.spiceLevel} /><span className="font-['Manrope'] text-[10px] text-muted-foreground">{SPICE_CONFIG[recipe.spiceLevel].label}</span></span>
                          </div>
                          <h3 className="font-['DM_Serif_Display'] text-xl text-foreground leading-tight">{recipe.name}</h3>
                          <p className="font-['Manrope'] text-sm text-muted-foreground mt-1 leading-relaxed">{recipe.description}</p>
                        </div>
                        <button onClick={() => toggleFav(recipe.id)} className="flex-shrink-0 p-2 rounded-xl hover:bg-muted transition-colors">
                          <Heart size={18} fill={isFav ? accent.primary : "none"} style={{ color: isFav ? accent.primary : "var(--muted-foreground)" }} />
                        </button>
                      </div>

                      {selectedIngredients.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-['Manrope'] text-xs text-muted-foreground">Ingredient match</p>
                            <p className="font-['Manrope'] text-xs font-medium" style={{ color: matchColor }}>{ingredientScore}%</p>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${ingredientScore}%`, backgroundColor: matchColor }} />
                          </div>
                        </div>
                      )}

                      {selectedIngredients.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {matchedCore.map(ing => (
                            <span key={ing} className="inline-flex items-center gap-1 text-xs font-['Manrope'] px-2.5 py-1 rounded-full border"
                              style={{ backgroundColor: "#4A8A5212", color: "#4A8A52", borderColor: "#4A8A5228" }}>
                              <Check size={10} /> {ing}
                            </span>
                          ))}
                          {missingCore.map(ing => (
                            <span key={ing} className="text-xs font-['Manrope'] px-2.5 py-1 rounded-full border"
                              style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", borderColor: "var(--border)" }}>
                              Need: {ing}
                            </span>
                          ))}
                        </div>
                      )}

                      {recipe.optionalStaples.length > 0 && (
                        <p className="font-['Manrope'] text-[11px] text-muted-foreground/70 leading-relaxed">
                          <span className="font-medium">Pantry staples:</span>{" "}{recipe.optionalStaples.slice(0, 6).join(" · ")}{recipe.optionalStaples.length > 6 ? ` +${recipe.optionalStaples.length - 6} more` : ""}
                        </p>
                      )}
                    </div>

                    <button onClick={() => setExpandedId(isExpanded ? null : recipe.id)}
                      className="w-full flex items-center justify-between px-5 py-3 border-t border-border font-['Manrope'] text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
                      {isExpanded ? "Hide recipe" : "View full recipe"}
                      <ChevronRight size={15} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="p-5 pt-0 border-t border-border">
                            <div className="grid md:grid-cols-2 gap-6 mt-5">
                              <div>
                                <h4 className="font-['DM_Serif_Display'] text-base text-foreground mb-3">Full Ingredients</h4>
                                <ul className="space-y-1.5">
                                  {recipe.fullIngredientList.map((ing, j) => (
                                    <li key={j} className="flex items-start gap-2 font-['Manrope'] text-sm text-foreground">
                                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accent.primary }} />{ing}
                                    </li>
                                  ))}
                                </ul>
                                <h4 className="font-['DM_Serif_Display'] text-base text-foreground mb-2 mt-5">Nutrition</h4>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                  {[["Protein", recipe.protein], ["Carbs", recipe.carbs], ["Fat", recipe.fat], ["Fibre", recipe.fiber]].map(([k, v]) => (
                                    <div key={k} className="bg-muted rounded-xl py-2.5">
                                      <p className="font-['Manrope'] text-sm font-semibold text-foreground">{v}</p>
                                      <p className="font-['Manrope'] text-[10px] text-muted-foreground">{k}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-['DM_Serif_Display'] text-base text-foreground mb-3">Method</h4>
                                <ol className="space-y-3">
                                  {recipe.steps.map((s, j) => (
                                    <li key={j} className="flex gap-3">
                                      <span className="font-['DM_Serif_Display'] text-base flex-shrink-0 font-medium" style={{ color: accent.primary }}>{j + 1}.</span>
                                      <span className="font-['Manrope'] text-sm text-foreground leading-relaxed">{s}</span>
                                    </li>
                                  ))}
                                </ol>
                                {recipe.healthySwaps.length > 0 && (
                                  <>
                                    <h4 className="font-['DM_Serif_Display'] text-base text-foreground mb-2 mt-5">Healthy Swaps</h4>
                                    <ul className="space-y-1.5">
                                      {recipe.healthySwaps.map((s, j) => (
                                        <li key={j} className="flex items-start gap-2 font-['Manrope'] text-sm text-muted-foreground">
                                          <span style={{ color: accent.primary }} className="mt-0.5 flex-shrink-0">↔</span>{s}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-5 p-4 rounded-2xl" style={{ backgroundColor: accent.soft }}>
                              <p className="font-['DM_Serif_Display'] italic text-foreground text-base">"{recipe.matchReason}"</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── LIBRARY PAGE ────────────────────────────────────────────────────────────
function LibraryPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [cat, setCat] = useState("All");
  const [openArticle, setOpenArticle] = useState<LibraryArticle|null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    let list = cat==="All" ? LIBRARY_ARTICLES : LIBRARY_ARTICLES.filter(a=>a.category===cat);
    if (search) list = list.filter(a=>a.title.toLowerCase().includes(search.toLowerCase())||a.summary.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [cat,search]);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-10">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Knowledge Hub</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-2">Wellness Library</h1>
        <p className="font-['Manrope'] text-muted-foreground">Evidence-based reading across eight pillars of wellbeing.</p>
      </div>
      <div className="relative mb-5">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles…"
          className="w-full bg-card border border-border pl-10 pr-4 py-3 rounded-2xl font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"/>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {LIBRARY_CATS.map(c => (
          <button key={c} onClick={()=>setCat(c)}
            className={`font-['Manrope'] text-sm px-4 py-2 rounded-full border transition-all ${cat===c?"border-transparent font-medium":"border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
            style={cat===c?{backgroundColor:accent.primary,color:accent.fg}:{}}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a,i) => (
          <motion.button key={a.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
            onClick={()=>setOpenArticle(a)}
            className="text-left bg-card rounded-2xl border border-border p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Manrope'] text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor:(CAT_COLORS[a.category]??accent.primary)+"1A", color:CAT_COLORS[a.category]??accent.primary }}>
                {a.category}
              </span>
              <span className="font-['Manrope'] text-xs text-muted-foreground">{a.readTime}</span>
            </div>
            <h3 className="font-['DM_Serif_Display'] text-lg text-foreground group-hover:text-primary transition-colors leading-snug mb-2">{a.title}</h3>
            <p className="font-['Manrope'] text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.summary}</p>
          </motion.button>
        ))}
      </div>
      {filtered.length===0 && (
        <div className="text-center py-16">
          <p className="font-['DM_Serif_Display'] text-2xl text-muted-foreground">No articles found</p>
          <button onClick={()=>{setCat("All");setSearch("")}} className="font-['Manrope'] text-sm mt-3 transition-colors" style={{ color:accent.primary }}>Clear filters</button>
        </div>
      )}
      <AnimatePresence>
        {openArticle && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto"
            onClick={e=>e.target===e.currentTarget&&setOpenArticle(null)}>
            <motion.div initial={{scale:0.94,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.94,opacity:0}}
              className="bg-card rounded-3xl border border-border max-w-2xl w-full p-7 lg:p-9 shadow-2xl my-4">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="font-['Manrope'] text-xs px-2.5 py-1 rounded-full font-medium mb-3 inline-block"
                    style={{ backgroundColor:(CAT_COLORS[openArticle.category]??accent.primary)+"1A", color:CAT_COLORS[openArticle.category]??accent.primary }}>
                    {openArticle.category} · {openArticle.readTime} read
                  </span>
                  <h2 className="font-['DM_Serif_Display'] text-3xl lg:text-4xl text-foreground">{openArticle.title}</h2>
                </div>
                <button onClick={()=>setOpenArticle(null)} className="text-muted-foreground hover:text-foreground flex-shrink-0 mt-1"><X size={22}/></button>
              </div>
              <p className="font-['Manrope'] text-base italic text-muted-foreground mb-6 border-l-2 pl-4 leading-relaxed" style={{ borderColor:accent.primary }}>{openArticle.summary}</p>
              <div className="space-y-5">
                {openArticle.content.map((p,i) => (
                  <p key={i} className="font-['Manrope'] text-base text-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── JOURNAL PAGE ─────────────────────────────────────────────────────────────
function JournalPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>("ara_journal",[]);
  const [promptIdx, setPromptIdx] = useState(() => Math.floor(Math.random()*REFLECTION_PROMPTS.length));
  const [text, setText] = useState("");
  const [expandedEntry, setExpandedEntry] = useState<string|null>(null);
  const save = () => {
    if (!text.trim()) return;
    setEntries(p=>[{id:uid(),date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),prompt:REFLECTION_PROMPTS[promptIdx],text:text.trim()},...p]);
    setText(""); setPromptIdx(Math.floor(Math.random()*REFLECTION_PROMPTS.length));
  };
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-10">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Gratitude Journal</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground">Your Journal</h1>
      </div>
      <div className="bg-card rounded-3xl border border-border p-7 lg:p-8 mb-8 relative overflow-hidden">
        {/* Paper lines */}
        {Array.from({length:6},(_,i)=>(
          <div key={i} className="absolute left-12 right-6 h-px opacity-50" style={{ top:`${100+i*40}px`, backgroundColor:"var(--border)" }}/>
        ))}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Today's write</p>
              <p className="font-['DM_Serif_Display'] text-xl italic text-foreground leading-relaxed">"{REFLECTION_PROMPTS[promptIdx]}"</p>
            </div>
            <button onClick={()=>setPromptIdx(p=>(p+1)%REFLECTION_PROMPTS.length)}
              className="flex-shrink-0 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground mt-1">
              <RefreshCw size={16}/>
            </button>
          </div>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} placeholder="Write freely — there are no wrong answers here…"
            className="w-full bg-transparent border-0 outline-none font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground/50 resize-none leading-[2.5rem]"/>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <p className="font-['Manrope'] text-xs text-muted-foreground">{text.length} characters</p>
            <button onClick={save} disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-['Manrope'] text-sm font-medium transition-all disabled:opacity-50"
              style={{ backgroundColor:accent.primary,color:accent.fg }}>
              Save <Heart size={12}/>
            </button>
          </div>
        </div>
      </div>
      {entries.length > 0 && (
        <div>
          <h2 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-4">Past Entries</h2>
          <div className="space-y-3">
            {entries.map(e => (
              <div key={e.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={()=>setExpandedEntry(expandedEntry===e.id?null:e.id)}>
                  <div>
                    <p className="font-['Manrope'] text-xs text-muted-foreground mb-1">{e.date}</p>
                    <p className="font-['Manrope'] text-sm text-foreground line-clamp-1">{e.text}</p>
                  </div>
                  <ChevronRight size={16} className={`text-muted-foreground flex-shrink-0 transition-transform ${expandedEntry===e.id?"rotate-90":""}`}/>
                </button>
                <AnimatePresence>
                  {expandedEntry===e.id && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 border-t border-border">
                        <p className="font-['DM_Serif_Display'] text-sm italic text-muted-foreground mb-3">"{e.prompt}"</p>
                        <p className="font-['Manrope'] text-sm text-foreground leading-relaxed whitespace-pre-wrap">{e.text}</p>
                        <button onClick={()=>setEntries(p=>p.filter(x=>x.id!==e.id))}
                          className="mt-4 flex items-center gap-1.5 font-['Manrope'] text-xs text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 size={12}/> Delete entry
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CHECKLIST PAGE ──────────────────────────────────────────────────────────
function ChecklistPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [items, setItems] = useLocalStorage<CheckItem[]>("ara_checklist", DEFAULT_TASKS.map(t=>({id:uid(),text:t,done:false})));
  const [newText, setNewText] = useState("");
  const doneCount = items.filter(i=>i.done).length;
  const progress = items.length ? (doneCount/items.length)*100 : 0;
  const toggle  = (id: string) => setItems(p=>p.map(i=>i.id===id?{...i,done:!i.done}:i));
  const remove  = (id: string) => setItems(p=>p.filter(i=>i.id!==id));
  const moveUp  = (idx: number) => { if(idx===0)return; setItems(p=>{const n=[...p];[n[idx-1],n[idx]]=[n[idx],n[idx-1]];return n;}); };
  const moveDown= (idx: number) => setItems(p=>{if(idx>=p.length-1)return p;const n=[...p];[n[idx],n[idx+1]]=[n[idx+1],n[idx]];return n;});
  const add = () => { if(!newText.trim())return; setItems(p=>[...p,{id:uid(),text:newText.trim(),done:false}]); setNewText(""); };
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-3">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Daily Habits</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-1">Today's Checklist</h1>
        <p className="font-['Manrope'] text-muted-foreground">{doneCount} of {items.length} complete</p>
      </div>
      <div className="h-1.5 bg-muted rounded-full my-6 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor:accent.primary }} animate={{ width:`${progress}%` }} transition={{ duration:0.5 }}/>
      </div>
      {progress===100 && items.length > 0 && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          className="bg-card border border-border rounded-2xl p-5 mb-6 text-center">
          <p className="font-['DM_Serif_Display'] text-xl italic text-foreground">All done. You showed up for yourself today. ✨</p>
        </motion.div>
      )}
      <div className="space-y-2 mb-6">
        {items.map((item,idx) => (
          <motion.div key={item.id} layout initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
            className={`flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 group transition-all hover:shadow-sm ${item.done?"opacity-55":""}`}>
            <button onClick={()=>toggle(item.id)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.done?"border-transparent":"border-muted-foreground/30 group-hover:border-primary/50"}`}
              style={item.done?{backgroundColor:accent.primary}:{}}>
              {item.done && <Check size={11} color={accent.fg} strokeWidth={3}/>}
            </button>
            <span className={`flex-1 font-['Manrope'] text-sm ${item.done?"line-through text-muted-foreground/50":"text-foreground"}`}>{item.text}</span>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={()=>moveUp(idx)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><ArrowUp size={13}/></button>
              <button onClick={()=>moveDown(idx)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><ArrowDown size={13}/></button>
              <button onClick={()=>remove(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13}/></button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input value={newText} onChange={e=>setNewText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Add a new task…"
          className="flex-1 bg-card border border-border rounded-2xl px-4 py-3 font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"/>
        <button onClick={add} disabled={!newText.trim()}
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all hover:scale-105"
          style={{ backgroundColor:accent.primary }}>
          <Plus size={18} color={accent.fg}/>
        </button>
      </div>
      {doneCount > 0 && (
        <button onClick={()=>setItems(p=>p.filter(i=>!i.done))}
          className="font-['Manrope'] text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          <Trash2 size={13}/> Clear completed ({doneCount})
        </button>
      )}
    </div>
  );
}

// ─── SETTINGS PAGE ───────────────────────────────────────────────────────────
function SettingsPage({ settings, setSettings, accent }: { settings: AppSettings; setSettings:(v:AppSettings|((p:AppSettings)=>AppSettings))=>void; accent: typeof ACCENTS[AccentKey] }) {
  const set = <K extends keyof AppSettings>(k: K, v: AppSettings[K]) => setSettings(p=>({...p,[k]:v}));
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10 space-y-6">
      <div className="pt-6 mb-4">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Preferences</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-2">Settings</h1>
        <p className="font-['Manrope'] text-muted-foreground">All preferences saved automatically to your browser.</p>
      </div>
      {/* Appearance */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-['DM_Serif_Display'] text-xl text-foreground">Appearance</h2>
        <div>
          <label className="font-['Manrope'] text-sm text-muted-foreground mb-2 block">Theme</label>
          <div className="flex gap-3">
            {([["light","Light",Sun],["dark","Dark",Moon],["system","System",Monitor]] as [AppSettings["theme"],string,React.ComponentType<{size:number}>][]).map(([v,l,Icon])=>(
              <button key={v} onClick={()=>set("theme",v)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-['Manrope'] text-sm transition-all ${settings.theme===v?"border-transparent font-medium":"border-border text-foreground hover:border-primary/40"}`}
                style={settings.theme===v?{backgroundColor:accent.primary,color:accent.fg}:{}}>
                <Icon size={15}/>{l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="font-['Manrope'] text-sm text-muted-foreground mb-3 block">Accent Colour</label>
          <div className="flex gap-3 flex-wrap">
            {(Object.keys(ACCENTS) as AccentKey[]).map(k=>(
              <button key={k} onClick={()=>set("accent",k)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-['Manrope'] text-sm capitalize transition-all ${settings.accent===k?"border-transparent font-medium":"border-border text-foreground hover:border-primary/30"}`}
                style={settings.accent===k?{backgroundColor:ACCENTS[k].primary,color:ACCENTS[k].fg}:{}}>
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor:ACCENTS[k].primary }}/>{k}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="font-['Manrope'] text-sm text-muted-foreground mb-2 block">Text Size</label>
          <div className="flex gap-3">
            {(["small","medium","large"] as AppSettings["fontSize"][]).map(v=>(
              <button key={v} onClick={()=>set("fontSize",v)}
                className={`px-5 py-2.5 rounded-xl border font-['Manrope'] text-sm capitalize transition-all ${settings.fontSize===v?"border-transparent font-medium":"border-border text-foreground hover:border-primary/40"}`}
                style={settings.fontSize===v?{backgroundColor:accent.primary,color:accent.fg}:{}}>{v}</button>
            ))}
          </div>
        </div>
      </div>
      {/* Accessibility & Audio */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-['DM_Serif_Display'] text-xl text-foreground">Accessibility & Audio</h2>
        {([["reduceMotion","Reduce Motion","Minimise animations throughout the app"],["sound","Ambient Sound","Play a soft tone during breathing sessions"]] as [keyof AppSettings,string,string][]).map(([k,label,desc])=>(
          <div key={k} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-['Manrope'] text-sm font-medium text-foreground">{label}</p>
              <p className="font-['Manrope'] text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <button onClick={()=>set(k,!settings[k] as AppSettings[typeof k])} role="switch" aria-checked={!!settings[k]}
              className={`w-11 h-6 rounded-full flex-shrink-0 relative transition-colors`}
              style={settings[k]?{backgroundColor:accent.primary}:{backgroundColor:"var(--muted)"}}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[k]?"translate-x-5":"translate-x-0.5"}`}/>
            </button>
          </div>
        ))}
      </div>
      {/* Breathing defaults */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-['DM_Serif_Display'] text-xl text-foreground">Breathing Defaults</h2>
        <div>
          <label className="font-['Manrope'] text-sm text-muted-foreground mb-2 block">Default Mode</label>
          <div className="flex flex-wrap gap-2">
            {BREATH_MODES.map(m=>(
              <button key={m.id} onClick={()=>set("defaultBreathing",m.id)}
                className={`px-4 py-2 rounded-xl border font-['Manrope'] text-sm transition-all ${settings.defaultBreathing===m.id?"border-transparent font-medium":"border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}
                style={settings.defaultBreathing===m.id?{backgroundColor:accent.primary,color:accent.fg}:{}}>{m.name}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="font-['Manrope'] text-sm text-muted-foreground mb-2 block">
            Default Session Length: <strong className="text-foreground">{settings.defaultSessionLength} min</strong>
          </label>
          <input type="range" min={5} max={60} step={5} value={settings.defaultSessionLength}
            onChange={e=>set("defaultSessionLength",parseInt(e.target.value))}
            className="w-full" style={{ accentColor:accent.primary }}/>
          <div className="flex justify-between font-['Manrope'] text-xs text-muted-foreground mt-1"><span>5 min</span><span>60 min</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [settings, setSettings] = useLocalStorage<AppSettings>("ara_settings", DEFAULT_SETTINGS);
  const accent = ACCENTS[settings.accent];

  useEffect(() => {
    const isDark = settings.theme==="dark"||(settings.theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", accent.primary);
    document.documentElement.style.setProperty("--ring", accent.primary);
  }, [accent.primary]);

  useEffect(() => {
    const sizes = { small:"14px", medium:"16px", large:"18px" };
    document.documentElement.style.setProperty("--font-size", sizes[settings.fontSize]);
  }, [settings.fontSize]);

  const navigate = (p: Page) => {
    setPage(p);
    if (p !== "home") window.scrollTo({ top:0, behavior:"smooth" });
  };

  const renderPage = () => {
    switch(page) {
      case "breathing":  return <BreathingPage accent={accent} settings={settings}/>;
      case "recipes":    return <RecipesPage accent={accent}/>;
      case "library":    return <LibraryPage accent={accent}/>;
      case "journal":    return <JournalPage accent={accent}/>;
      case "checklist":  return <ChecklistPage accent={accent}/>;
      case "settings":   return <SettingsPage settings={settings} setSettings={setSettings} accent={accent}/>;
      default:           return <HomePage setPage={navigate} accent={accent}/>;
    }
  };

  return (
    <div className="min-h-screen bg-background font-['Manrope']">
      <GlobalStyles/>
      <Nav page={page} setPage={navigate} accent={accent}/>
      <div className={page !== "home" ? "pt-16" : ""}>
        <AnimatePresence mode="wait">
          <motion.div key={page}
            initial={{ opacity:0, y: settings.reduceMotion?0:8 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y: settings.reduceMotion?0:-8 }}
            transition={{ duration: settings.reduceMotion?0:0.3 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
