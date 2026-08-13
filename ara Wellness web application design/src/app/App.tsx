import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, BookOpen, Quote, Edit3, Target, SlidersHorizontal, Leaf,
  ChevronDown, ChevronRight, X, Plus, Trash2, ArrowUp, ArrowDown,
  Check, RefreshCw, Sparkles, Search, Clock, Droplets, Timer,
  Moon, Sun, Monitor, Menu, ArrowRight
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
import { trackEvent } from "../lib/analytics";

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
type Page = "home" | "breathing" | "affirmations" | "library" | "journal" | "checklist" | "settings";
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
interface BreathMode {
  id: string; name: string; desc: string; benefit: string;
  inhale: number; hold1: number; exhale: number; hold2: number; cycles: number; color: string;
}
interface LibraryArticle { id: string; title: string; category: string; readTime: string; summary: string; content: string[]; }
interface Affirmation { id: string; text: string; category: string; }

// ─── ACCENTS ────────────────────────────────────────────────────────────────
const ACCENTS: Record<AccentKey, { primary: string; soft: string; muted: string; hover: string; fg: string }> = {
  sage:       { primary: "#A6B89B", soft: "#A6B89B14", muted: "#A6B89B2E", hover: "#95A88A", fg: "#2E3B29" },
  forest:     { primary: "#5E8A64", soft: "#5E8A6414", muted: "#5E8A642E", hover: "#4D7953", fg: "#FDFAF5" },
  terracotta: { primary: "#C98A67", soft: "#C98A6714", muted: "#C98A672E", hover: "#B87A58", fg: "#FDFAF5" },
  sand:       { primary: "#C4A067", soft: "#C4A06714", muted: "#C4A0672E", hover: "#B39057", fg: "#FDFAF5" },
  lavender:   { primary: "#9B8EC4", soft: "#9B8EC414", muted: "#9B8EC42E", hover: "#8A7EB3", fg: "#FDFAF5" },
};
const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark", accent: "terracotta", fontSize: "medium",
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
const AFFIRMATIONS: Affirmation[] = [
  { id:"c01", category:"calm", text:"When did you last take a breath that actually reached your stomach?" },
  { id:"c02", category:"calm", text:"Put the phone face-down. Just for one song." },
  { id:"c03", category:"calm", text:"Your inbox will still be a mess in ten minutes. Breathe first." },
  { id:"c04", category:"calm", text:"Somewhere between the doomscrolling and the deadline, you forgot to exhale. Do it now." },
  { id:"c05", category:"calm", text:"The dishes can wait. This breath can't." },
  { id:"c06", category:"calm", text:"How does your body actually feel right now — not what you think it should feel." },
  { id:"c07", category:"calm", text:"You don't have to answer that text in the next five minutes." },
  { id:"c08", category:"calm", text:"Nothing on that notification screen is more urgent than this exhale." },
  { id:"c09", category:"calm", text:"Close your eyes for three seconds. What do you actually hear?" },
  { id:"c10", category:"calm", text:"The room can stay messy for one more hour. You can stay still for one more minute." },
  { id:"c11", category:"calm", text:"You keep waiting for permission to slow down. This is it." },
  { id:"c12", category:"calm", text:"Your shoulders climbed up to your ears again. Let them drop." },
  { id:"c13", category:"calm", text:"It's late and you're still scrolling. That's okay. Just notice it." },
  { id:"c14", category:"calm", text:"Quiet isn't a reward you have to earn by finishing the list." },
  { id:"c15", category:"calm", text:"You don't need the whole day to feel calm. You need the next ten seconds." },
  { id:"c16", category:"calm", text:"What would it feel like to just stop, right here, mid-sentence?" },
  { id:"c17", category:"calm", text:"The unread emails will still be unread in five minutes. Sit with this instead." },
  { id:"c18", category:"calm", text:"Nothing is chasing you. Not really. Not right now." },
  { id:"c19", category:"calm", text:"You can want to be productive and still let this minute be soft." },
  { id:"c20", category:"calm", text:"Unclench your jaw. Notice how much you were holding." },
  { id:"c21", category:"calm", text:"You keep checking the clock. What if you checked in with yourself instead?" },
  { id:"c22", category:"calm", text:"Not every silence needs a notification to fill it." },
  { id:"c23", category:"calm", text:"How are you, actually — not the version you'd text back to \"you good?\"" },
  { id:"c24", category:"calm", text:"The laundry pile isn't going anywhere. Neither are you. You can both just sit for a second." },
  { id:"c25", category:"calm", text:"Somewhere in the last hour you forgot you have a body. Come back to it." },
  { id:"c26", category:"calm", text:"This is the pause between songs. Let it stay quiet a little longer." },

  { id:"m01", category:"motivation", text:"You've reopened that same tab eleven times today. Just write one sentence." },
  { id:"m02", category:"motivation", text:"What's the smallest version of this you could do right now?" },
  { id:"m03", category:"motivation", text:"That laundry's been sitting there for three days. One load. That's it." },
  { id:"m04", category:"motivation", text:"You don't need a Monday to start. You need the next ten minutes." },
  { id:"m05", category:"motivation", text:"Nobody's timing how messy your first draft is." },
  { id:"m06", category:"motivation", text:"Text them back. Send the email. Do the awkward thing first." },
  { id:"m07", category:"motivation", text:"You've already survived every day you thought you couldn't. Add this one to the list." },
  { id:"m08", category:"motivation", text:"That gym bag's been by the door for a week. Just put your shoes on." },
  { id:"m09", category:"motivation", text:"What if \"good enough\" was actually good enough today?" },
  { id:"m10", category:"motivation", text:"You keep waiting to feel ready. Ready's not coming. Start anyway." },
  { id:"m11", category:"motivation", text:"One page. Not the whole book. One page." },
  { id:"m12", category:"motivation", text:"Your future self is watching you decide right now." },
  { id:"m13", category:"motivation", text:"That thing you've been avoiding is smaller than the anxiety about avoiding it." },
  { id:"m14", category:"motivation", text:"Set a five-minute timer. See what happens." },
  { id:"m15", category:"motivation", text:"Small effort today beats the perfect plan you never start." },
  { id:"m16", category:"motivation", text:"You don't have to want to do it. Do it anyway, then see how you feel." },
  { id:"m17", category:"motivation", text:"Rest and progress can happen the same day. They're not enemies." },
  { id:"m18", category:"motivation", text:"You've already done harder things than this. Remember that." },
  { id:"m19", category:"motivation", text:"The bar isn't \"impressive.\" The bar is \"done.\"" },
  { id:"m20", category:"motivation", text:"What would today look like if you tried, badly, on purpose?" },
  { id:"m21", category:"motivation", text:"Nobody remembers your slow starts. They remember that you finished." },
  { id:"m22", category:"motivation", text:"Open the doc. Don't write anything yet. Just open it." },
  { id:"m23", category:"motivation", text:"That unanswered message is heavier in your head than it needs to be. Send it." },
  { id:"m24", category:"motivation", text:"One percent better isn't nothing. It's compound interest." },
  { id:"m25", category:"motivation", text:"You don't need motivation. You need momentum — and momentum starts with one small move." },
  { id:"m26", category:"motivation", text:"What's one thing you'd actually feel proud of finishing today?" },

  { id:"w01", category:"worth", text:"When's the last time you said something kind to yourself, and actually meant it?" },
  { id:"w02", category:"worth", text:"You reread that text four times looking for a hidden insult. There wasn't one." },
  { id:"w03", category:"worth", text:"You are not the version of yourself that shows up in your head at 2am." },
  { id:"w04", category:"worth", text:"Someone out there has a photo of you they think is beautiful. You'll never see it." },
  { id:"w05", category:"worth", text:"You compared your messy room to someone's curated feed today. That's not a fair fight." },
  { id:"w06", category:"worth", text:"What would you tell your best friend if they said the thing you just said about yourself?" },
  { id:"w07", category:"worth", text:"The apology you're still owed doesn't decide whether you're worth loving." },
  { id:"w08", category:"worth", text:"You've been kind to people who never noticed. That still counts." },
  { id:"w09", category:"worth", text:"Nobody actually remembers your awkward moment from last Tuesday. You do. Let it go." },
  { id:"w10", category:"worth", text:"You are allowed to take up space in a room you didn't think you belonged in." },
  { id:"w11", category:"worth", text:"That unread message doesn't mean what your anxiety is telling you it means." },
  { id:"w12", category:"worth", text:"You keep shrinking yourself to fit places that were never built for you." },
  { id:"w13", category:"worth", text:"Somebody's favorite person talks to themselves the way you do. Try being gentler." },
  { id:"w14", category:"worth", text:"You're not behind — you're comparing your behind-the-scenes to everyone's highlight reel." },
  { id:"w15", category:"worth", text:"What if the thing you're insecure about is someone else's favorite thing about you?" },
  { id:"w16", category:"worth", text:"You don't owe anyone the smaller, quieter version of yourself." },
  { id:"w17", category:"worth", text:"The version of you that feels \"too much\" is somebody's whole favorite person." },
  { id:"w18", category:"worth", text:"You're allowed to like the photo you almost didn't post." },
  { id:"w19", category:"worth", text:"Nobody's grading how well you're doing this. Stop grading yourself." },
  { id:"w20", category:"worth", text:"You keep waiting for someone to say you're doing fine. Consider this that." },
  { id:"w21", category:"worth", text:"That mistake from three years ago isn't on anyone's mind but yours." },
  { id:"w22", category:"worth", text:"You're not too sensitive. You just notice what other people learned to ignore." },
  { id:"w23", category:"worth", text:"Somebody loves the loud laugh you keep trying to quiet down." },
  { id:"w24", category:"worth", text:"You are allowed to be proud of yourself in a room where no one's clapping." },
  { id:"w25", category:"worth", text:"The friend who hasn't texted back isn't thinking about you the way you think they are." },
  { id:"w26", category:"worth", text:"How would you describe yourself to a stranger who'd never met you before today?" },

  { id:"s01", category:"stress", text:"Whatever's spiking your heart rate right now won't matter this much in a week." },
  { id:"s02", category:"stress", text:"You're not actually in danger. Your body's just a little behind on the memo." },
  { id:"s03", category:"stress", text:"The version of this problem in your head is almost always scarier than the real one." },
  { id:"s04", category:"stress", text:"Whatever this is, it's not permanent. Even the bad feelings move eventually." },
  { id:"s05", category:"stress", text:"You don't have to solve it tonight. Tonight you just have to get through it." },
  { id:"s06", category:"stress", text:"Unclench your hands. You've probably been holding them like that for a while." },
  { id:"s07", category:"stress", text:"Not every problem needs you to be the one who solves it right now." },
  { id:"s08", category:"stress", text:"You're allowed to lower the bar today. Lower it as much as you need to." },
  { id:"s09", category:"stress", text:"Nobody's judging you as hard as you're judging yourself right now. Promise." },
  { id:"s10", category:"stress", text:"The stress will pass. It always has. Every single time." },
  { id:"s11", category:"stress", text:"You can care about something and still not have the energy to deal with it tonight." },
  { id:"s12", category:"stress", text:"Whatever's overwhelming you, break it into one next small step. Just one." },
  { id:"s13", category:"stress", text:"It's not weakness to need a minute. Take the minute." },
  { id:"s14", category:"stress", text:"You are handling more right now than most people around you even know about." },
  { id:"s15", category:"stress", text:"This feeling has a shelf life. It's shorter than it feels right now." },
  { id:"s16", category:"stress", text:"Waiting for news is its own kind of exhausting. You're allowed to be tired from it." },
  { id:"s17", category:"stress", text:"Not knowing what happens next doesn't mean something bad is coming." },
  { id:"s18", category:"stress", text:"Your body can only hold so much tension before it asks you to put some down." },
  { id:"s19", category:"stress", text:"The argument replaying in your head doesn't need a rematch tonight." },
  { id:"s20", category:"stress", text:"Money worries feel bigger at night than they do in the morning light." },
  { id:"s21", category:"stress", text:"You're allowed to worry about someone you love and still take care of yourself too." },
  { id:"s22", category:"stress", text:"A hard season doesn't mean a hard life. It's just a season." },
  { id:"s23", category:"stress", text:"Whatever you're bracing for, you can put your shoulders down while you wait." },
  { id:"s24", category:"stress", text:"You've gotten through uncertainty before, even when it didn't feel possible at the time." },
  { id:"s25", category:"stress", text:"Not every worry deserves your full attention tonight." },
  { id:"s26", category:"stress", text:"It's okay to feel behind in a race nobody actually asked you to run." },

  { id:"lo01", category:"love", text:"You keep waiting for someone else to choose you first. Choose yourself today." },
  { id:"lo02", category:"love", text:"Not every relationship that ends was a failure. Some just finished their chapter." },
  { id:"lo03", category:"love", text:"You don't have to perform to be loved. The right people stay for the real version." },
  { id:"lo04", category:"love", text:"That text you're overanalyzing probably means exactly what it says." },
  { id:"lo05", category:"love", text:"Love that requires you to shrink isn't love, it's a trade." },
  { id:"lo06", category:"love", text:"You are allowed to outgrow a relationship that once fit perfectly." },
  { id:"lo07", category:"love", text:"Being alone right now doesn't mean you're doing something wrong." },
  { id:"lo08", category:"love", text:"The right person won't need convincing to stay." },
  { id:"lo09", category:"love", text:"You can miss someone and still know it wasn't right." },
  { id:"lo10", category:"love", text:"Healthy love feels like relief, not proving yourself." },
  { id:"lo11", category:"love", text:"You don't owe anyone access to you just because they want it." },
  { id:"lo12", category:"love", text:"The apology you're waiting for might never come. You can heal without it." },
  { id:"lo13", category:"love", text:"You are not hard to love. You just haven't been loved correctly yet." },
  { id:"lo14", category:"love", text:"It's okay to want more from someone who's only giving you less." },
  { id:"lo15", category:"love", text:"The love you give yourself sets the standard for what you'll accept." },

  { id:"ca01", category:"career", text:"You don't have to have your career figured out by 30. Or 40." },
  { id:"ca02", category:"career", text:"That job rejection wasn't a referendum on your worth." },
  { id:"ca03", category:"career", text:"You can be good at your job and still be tired of it." },
  { id:"ca04", category:"career", text:"Nobody's career actually looked like a straight line, no matter what the profile suggests." },
  { id:"ca05", category:"career", text:"You're allowed to want more than \"stable\" from your work." },
  { id:"ca06", category:"career", text:"The promotion you didn't get isn't the last opportunity you'll ever have." },
  { id:"ca07", category:"career", text:"Burnout isn't a personal failure. It's a signal." },
  { id:"ca08", category:"career", text:"You can love parts of your job and still want to leave it." },
  { id:"ca09", category:"career", text:"Comparing your career timeline to someone else's highlight reel isn't fair to you." },
  { id:"ca10", category:"career", text:"It's okay to not have a five-year plan right now." },
  { id:"ca11", category:"career", text:"You are more than your job title." },
  { id:"ca12", category:"career", text:"That meeting where you froze up doesn't define your competence." },
  { id:"ca13", category:"career", text:"Changing your mind about your career path isn't wasted time." },
  { id:"ca14", category:"career", text:"You are allowed to outgrow a job that once felt like a dream." },
  { id:"ca15", category:"career", text:"Rest is part of a sustainable career, not a threat to it." },

  { id:"pd01", category:"productivity", text:"You don't need a better planner. You need to start the task in front of you." },
  { id:"pd02", category:"productivity", text:"Multitasking just means doing five things at 20% each." },
  { id:"pd03", category:"productivity", text:"That inbox-zero goal is costing you more focus than the inbox itself." },
  { id:"pd04", category:"productivity", text:"You can be productive and still take a real lunch break." },
  { id:"pd05", category:"productivity", text:"The to-do list isn't the enemy. Doing everything on it today is." },
  { id:"pd06", category:"productivity", text:"Done is better than perfect, more often than you think." },
  { id:"pd07", category:"productivity", text:"You work better in focused bursts than in eight hours of half-attention." },
  { id:"pd08", category:"productivity", text:"That task you keep postponing is taking up more mental space than doing it would." },
  { id:"pd09", category:"productivity", text:"Batch the small stuff. Protect your energy for the big stuff." },
  { id:"pd10", category:"productivity", text:"You don't have to feel motivated to be productive. You just have to start." },
  { id:"pd11", category:"productivity", text:"Your environment is either helping your focus or fighting it." },
  { id:"pd12", category:"productivity", text:"Not every task deserves the same amount of your energy." },
  { id:"pd13", category:"productivity", text:"You can plan the whole week and still only control today." },
  { id:"pd14", category:"productivity", text:"Progress hides in boring, repeated tasks, not just big wins." },
  { id:"pd15", category:"productivity", text:"Rest between tasks isn't wasted time. It's what makes the next task possible." },

  { id:"ot01", category:"overthinking", text:"You've replayed that conversation eleven times. It hasn't changed once." },
  { id:"ot02", category:"overthinking", text:"Most of what you're bracing for never actually happens." },
  { id:"ot03", category:"overthinking", text:"Your brain treats \"unresolved\" like \"urgent.\" It's not the same thing." },
  { id:"ot04", category:"overthinking", text:"The version of the story in your head is worse than reality, almost always." },
  { id:"ot05", category:"overthinking", text:"You can't think your way out of a feeling. You have to move through it." },
  { id:"ot06", category:"overthinking", text:"That late-night spiral doesn't have better information than daytime you." },
  { id:"ot07", category:"overthinking", text:"Not knowing the outcome yet is not the same as it going badly." },
  { id:"ot08", category:"overthinking", text:"You're not being thorough. You're stuck." },
  { id:"ot09", category:"overthinking", text:"The question you keep asking yourself doesn't have a better answer at midnight." },
  { id:"ot10", category:"overthinking", text:"Overthinking feels like control, but it's usually just noise." },
  { id:"ot11", category:"overthinking", text:"You can hold uncertainty without needing to solve it immediately." },
  { id:"ot12", category:"overthinking", text:"That awkward thing you said is filed away in your memory alone." },
  { id:"ot13", category:"overthinking", text:"Your mind is allowed to leave a thought unfinished." },
  { id:"ot14", category:"overthinking", text:"Rehearsing the worst case doesn't actually prepare you for it." },
  { id:"ot15", category:"overthinking", text:"The loop only stops when you decide to step outside of it." },

  { id:"he01q", category:"health", text:"You don't need a perfect routine. You need one habit you'll actually keep." },
  { id:"he02q", category:"health", text:"Missing one day at the gym doesn't undo the last twenty." },
  { id:"he03q", category:"health", text:"Your body remembers rest as much as it remembers effort." },
  { id:"he04q", category:"health", text:"You can respect your body without punishing it." },
  { id:"he05q", category:"health", text:"That skipped meal isn't discipline. It's just skipped fuel." },
  { id:"he06q", category:"health", text:"Healing isn't linear, and neither is feeling better." },
  { id:"he07q", category:"health", text:"You don't have to earn food with exercise." },
  { id:"he08q", category:"health", text:"Small consistent habits outlast dramatic short-term ones." },
  { id:"he09q", category:"health", text:"Your body has carried you through every hard day so far." },
  { id:"he10q", category:"health", text:"Rest days are part of the plan, not a break from it." },
  { id:"he11q", category:"health", text:"You are allowed to prioritize sleep over one more episode." },
  { id:"he12q", category:"health", text:"Progress in health often looks boring before it looks impressive." },
  { id:"he13q", category:"health", text:"You don't need to hate your body to want to take care of it." },
  { id:"he14q", category:"health", text:"Drinking the water actually does help. So does the walk." },
  { id:"he15q", category:"health", text:"Your health is a practice, not a single decision you make once." },

  { id:"cf01q", category:"confidence", text:"You rehearsed that sentence five times before saying it. Nobody could tell." },
  { id:"cf02q", category:"confidence", text:"The room didn't notice your nervous laugh as much as you think." },
  { id:"cf03q", category:"confidence", text:"Confidence isn't the absence of doubt. It's doing it anyway." },
  { id:"cf04q", category:"confidence", text:"You don't need permission to speak up in that meeting." },
  { id:"cf05q", category:"confidence", text:"That awkward silence after you spoke wasn't about you." },
  { id:"cf06q", category:"confidence", text:"You've survived every situation where you thought you'd embarrass yourself." },
  { id:"cf07q", category:"confidence", text:"Nobody's grading your small talk as hard as you are." },
  { id:"cf08q", category:"confidence", text:"You are allowed to take credit for what you actually did." },
  { id:"cf09q", category:"confidence", text:"The version of you that hesitates isn't more humble. Just more scared." },
  { id:"cf10q", category:"confidence", text:"You don't have to feel confident to act confident." },
  { id:"cf11q", category:"confidence", text:"That thing you're insecure about is smaller in the room than in your head." },
  { id:"cf12q", category:"confidence", text:"You've been more capable in more situations than you give yourself credit for." },
  { id:"cf13q", category:"confidence", text:"Standing by your answer, even shaky, beats folding just to sound agreeable." },
  { id:"cf14q", category:"confidence", text:"Nobody remembers your stumble as clearly as you do." },
  { id:"cf15q", category:"confidence", text:"You are allowed to believe you're good at something without over-explaining it." },

  { id:"gt01q", category:"gratitude", text:"You almost missed how good that coffee was this morning." },
  { id:"gt02q", category:"gratitude", text:"Somewhere today, something small went right and you didn't clock it." },
  { id:"gt03q", category:"gratitude", text:"Gratitude doesn't require things to be perfect first." },
  { id:"gt04q", category:"gratitude", text:"You have people who would drop things for you. That's not nothing." },
  { id:"gt05q", category:"gratitude", text:"The mundane parts of today are the parts you'll miss someday." },
  { id:"gt06q", category:"gratitude", text:"You noticed the sunset for three seconds today. That counts." },
  { id:"gt07q", category:"gratitude", text:"Not every good thing needs to be a big thing." },
  { id:"gt08q", category:"gratitude", text:"You are surrounded by things that took effort to get you here." },
  { id:"gt09q", category:"gratitude", text:"Somebody's day was better because you were in it today." },
  { id:"gt10q", category:"gratitude", text:"The ordinary day you're rushing through is somebody's dream day." },
  { id:"gt11q", category:"gratitude", text:"You've been given more soft landings than you probably remember." },
  { id:"gt12q", category:"gratitude", text:"Gratitude isn't ignoring what's hard. It's noticing what isn't." },
  { id:"gt13q", category:"gratitude", text:"You have more going right than your inner critic is willing to admit." },
  { id:"gt14q", category:"gratitude", text:"That warm meal, that decent night's sleep — those aren't guaranteed." },
  { id:"gt15q", category:"gratitude", text:"You are allowed to enjoy something good without waiting for the catch." },

  { id:"sp01", category:"sleep", text:"The scroll session at midnight isn't actually relaxing you." },
  { id:"sp02", category:"sleep", text:"Your to-do list will still be there tomorrow, rested or not." },
  { id:"sp03", category:"sleep", text:"You've been running on fumes and calling it normal." },
  { id:"sp04", category:"sleep", text:"Sleep isn't the reward for finishing everything. It's what lets you finish anything." },
  { id:"sp05", category:"sleep", text:"That \"just five more minutes\" has cost you an hour before." },
  { id:"sp06", category:"sleep", text:"Your brain does its best editing while you're asleep, not while you're awake at 1am." },
  { id:"sp07", category:"sleep", text:"You don't owe tonight one more productive hour." },
  { id:"sp08", category:"sleep", text:"Tired decisions are rarely your best decisions." },
  { id:"sp09", category:"sleep", text:"The bed has been ready for longer than you've been willing to get in it." },
  { id:"sp10", category:"sleep", text:"You can't pour into tomorrow from an empty, sleepless tonight." },
  { id:"sp11", category:"sleep", text:"Rest is not laziness. It's maintenance." },
  { id:"sp12", category:"sleep", text:"That show will still be there after eight hours of sleep." },
  { id:"sp13", category:"sleep", text:"You are allowed to go to bed before you feel like you've earned it." },
  { id:"sp14", category:"sleep", text:"Catching up on sleep this weekend doesn't undo a week of running on empty." },
  { id:"sp15", category:"sleep", text:"Tomorrow's version of you needs the sleep more than tonight's you needs one more episode." },

  { id:"c27", category:"calm", text:"The version of today that feels manageable starts with your next exhale." },
  { id:"c28", category:"calm", text:"You don't have to chase peace. Sometimes it just needs you to stop moving." },
  { id:"c29", category:"calm", text:"Somewhere in your body, a muscle has been tense since this morning. Find it." },
  { id:"c30", category:"calm", text:"This is allowed to be a slow afternoon." },
  { id:"c31", category:"calm", text:"You can want less from today and still have a good one." },
  { id:"c32", category:"calm", text:"The silence after you put the phone down is doing something for you." },
  { id:"c33", category:"calm", text:"Not every hour needs a plan attached to it." },
  { id:"c34", category:"calm", text:"You are allowed to be uneventful today." },
  { id:"c35", category:"calm", text:"Your breathing has been shallow for a while. Take one deep one." },
  { id:"c36", category:"calm", text:"The version of you that's rushing isn't more accomplished. Just more tired." },

  { id:"m27", category:"motivation", text:"You don't need the whole plan. You need the next five minutes of it." },
  { id:"m28", category:"motivation", text:"Getting started is usually harder than continuing. You're past the hardest part." },
  { id:"m29", category:"motivation", text:"Nobody built anything worth having in a straight line." },
  { id:"m30", category:"motivation", text:"The days you don't feel like it are the ones that actually count." },
  { id:"m31", category:"motivation", text:"You are further along than the version of you from six months ago." },
  { id:"m32", category:"motivation", text:"Discouraged and still moving forward are not mutually exclusive." },
  { id:"m33", category:"motivation", text:"That idea you keep coming back to might be worth finally starting." },
  { id:"m34", category:"motivation", text:"You've quietly become more capable than you give yourself credit for." },
  { id:"m35", category:"motivation", text:"It's not too late. It's just later than you planned, and that's fine." },
  { id:"m36", category:"motivation", text:"Every rough draft becomes something better than a blank page." },

  { id:"w27", category:"worth", text:"You don't have to justify your feelings to the people who caused them." },
  { id:"w28", category:"worth", text:"The love you didn't get as a kid, you can still learn to give yourself now." },
  { id:"w29", category:"worth", text:"You are not responsible for managing other people's comfort with your success." },
  { id:"w30", category:"worth", text:"Your existence doesn't require a purpose to justify it." },
  { id:"w31", category:"worth", text:"You can set a boundary without an apology attached to it." },
  { id:"w32", category:"worth", text:"Nobody else is qualified to define your worth. Not even the loud voice in your head." },
  { id:"w33", category:"worth", text:"You are allowed to walk away from what's hurting you, even slowly." },
  { id:"w34", category:"worth", text:"The people who truly know you don't need convincing of your worth." },
  { id:"w35", category:"worth", text:"You are not \"high maintenance\" for having needs." },
  { id:"w36", category:"worth", text:"Healing doesn't require you to forgive on anyone else's timeline." },

  { id:"s27", category:"stress", text:"You don't have to react to every emergency that isn't actually yours." },
  { id:"s28", category:"stress", text:"The version of the future you're stressed about hasn't happened yet." },
  { id:"s29", category:"stress", text:"Your to-do list is not a measure of your worth as a person." },
  { id:"s30", category:"stress", text:"You are allowed to disappoint the pressure you put on yourself." },
  { id:"s31", category:"stress", text:"Some days the win is just staying regulated." },
  { id:"s32", category:"stress", text:"The thing stressing you out right now will be a memory eventually." },
  { id:"s33", category:"stress", text:"You can be stressed and still be doing a good job." },
  { id:"s34", category:"stress", text:"It's okay if your best today looks smaller than your best yesterday." },
  { id:"s35", category:"stress", text:"Nobody actually expects you to have zero bad days." },
  { id:"s36", category:"stress", text:"You are handling a lot of invisible weight most people don't see." },

  { id:"lo16", category:"love", text:"You don't have to chase people who make you feel like a maybe." },
  { id:"lo17", category:"love", text:"Being single isn't a waiting room. It's still your life." },
  { id:"lo18", category:"love", text:"You are allowed to want consistency, not just intensity." },
  { id:"lo19", category:"love", text:"The right relationship won't ask you to abandon yourself to keep it." },
  { id:"lo20", category:"love", text:"You can love someone and still choose to walk away." },
  { id:"lo21", category:"love", text:"Real love doesn't come with a countdown to when you'll mess it up." },
  { id:"lo22", category:"love", text:"You're allowed to need reassurance without being called needy for it." },
  { id:"lo23", category:"love", text:"The love that's meant for you won't require you to beg for it." },
  { id:"lo24", category:"love", text:"You get to decide what you will and won't tolerate, regardless of how much you love someone." },
  { id:"lo25", category:"love", text:"Loving yourself first isn't selfish. It's the foundation everything else stands on." },

  { id:"ca16", category:"career", text:"You don't have to network like it's a personality trait to succeed." },
  { id:"ca17", category:"career", text:"The job that pays the bills right now doesn't have to be your whole identity." },
  { id:"ca18", category:"career", text:"You are allowed to want work-life balance and still be ambitious." },
  { id:"ca19", category:"career", text:"That colleague who seems to have it all figured out probably doesn't." },
  { id:"ca20", category:"career", text:"You can be new at something and still be good at your job." },
  { id:"ca21", category:"career", text:"Quiet competence is still competence, even without a spotlight." },
  { id:"ca22", category:"career", text:"You're allowed to say no to extra work that isn't yours to carry." },
  { id:"ca23", category:"career", text:"The career pivot you're scared to make might be the one that finally fits." },
  { id:"ca24", category:"career", text:"You don't have to love your job to be proud of how you show up for it." },
  { id:"ca25", category:"career", text:"Success doesn't have to look like everyone else's definition of it." },

  { id:"pd16", category:"productivity", text:"You don't need eight hours of hustle. You need one hour of real focus." },
  { id:"pd17", category:"productivity", text:"The task feels bigger in your head than it will once you actually start it." },
  { id:"pd18", category:"productivity", text:"You can be behind schedule and still make real progress today." },
  { id:"pd19", category:"productivity", text:"Checking your phone once more isn't a break. It's a distraction with extra steps." },
  { id:"pd20", category:"productivity", text:"Good systems outperform good intentions every time." },
  { id:"pd21", category:"productivity", text:"You don't have to optimize every minute to have a productive day." },
  { id:"pd22", category:"productivity", text:"The first draft doesn't need to be good. It just needs to exist." },
  { id:"pd23", category:"productivity", text:"Clearing one small task can loosen the grip of the bigger ones." },
  { id:"pd24", category:"productivity", text:"You work in cycles, not straight lines. Rest is part of the cycle." },
  { id:"pd25", category:"productivity", text:"Nobody's productivity looks like their curated morning routine." },

  { id:"ot16", category:"overthinking", text:"You are allowed to send the message without rereading it six times." },
  { id:"ot17", category:"overthinking", text:"That decision doesn't need to be perfect. It just needs to be made." },
  { id:"ot18", category:"overthinking", text:"Your anxious brain is a bad fortune teller. Stop trusting its predictions." },
  { id:"ot19", category:"overthinking", text:"The question isn't \"what if it goes wrong,\" it's \"what if it's fine.\"" },
  { id:"ot20", category:"overthinking", text:"You can act with 80% certainty. 100% rarely comes." },
  { id:"ot21", category:"overthinking", text:"Rehashing the day in bed doesn't change what already happened." },
  { id:"ot22", category:"overthinking", text:"You are not required to have an opinion ready on everything, instantly." },
  { id:"ot23", category:"overthinking", text:"The overthinking isn't protecting you. It's just exhausting you." },
  { id:"ot24", category:"overthinking", text:"Sometimes the answer is simpler than the fifteen scenarios you built around it." },
  { id:"ot25", category:"overthinking", text:"You can notice the spiral starting and choose not to get on it." },

  { id:"he16q", category:"health", text:"The workout you almost skipped is usually the one that helps the most." },
  { id:"he17q", category:"health", text:"Your body isn't a problem to fix. It's a home to take care of." },
  { id:"he18q", category:"health", text:"You don't need to overhaul everything today. Just one better choice." },
  { id:"he19q", category:"health", text:"Feeling tired isn't weakness. It's information." },
  { id:"he20q", category:"health", text:"Your relationship with food doesn't have to be a battle." },
  { id:"he21q", category:"health", text:"Consistency beats intensity when it comes to actually feeling better." },
  { id:"he22q", category:"health", text:"You are allowed to move your body for joy, not just for punishment." },
  { id:"he23q", category:"health", text:"That doctor's appointment you're avoiding isn't going to get less scary by waiting." },
  { id:"he24q", category:"health", text:"Recovery is part of training, not a break from it." },
  { id:"he25q", category:"health", text:"You deserve care, not just maintenance." },

  { id:"cf16q", category:"confidence", text:"You don't need to shrink your opinion to make it more palatable." },
  { id:"cf17q", category:"confidence", text:"The fear of being \"too much\" has kept you quieter than you needed to be." },
  { id:"cf18q", category:"confidence", text:"You are allowed to disagree without softening it into a question." },
  { id:"cf19q", category:"confidence", text:"Confidence grows in the moments you do the thing scared." },
  { id:"cf20q", category:"confidence", text:"Your ideas don't need a disclaimer before you share them." },
  { id:"cf21q", category:"confidence", text:"You've been more right than you gave yourself credit for." },
  { id:"cf22q", category:"confidence", text:"Owning your win out loud isn't bragging. It's honesty." },
  { id:"cf23q", category:"confidence", text:"You don't have to wait to be chosen. You can choose yourself first." },
  { id:"cf24q", category:"confidence", text:"The version of you that hesitated last time doesn't have to show up again." },
  { id:"cf25q", category:"confidence", text:"You are allowed to take the compliment without deflecting it." },

  { id:"gt16q", category:"gratitude", text:"You have survived one hundred percent of your worst days so far. That's worth noting." },
  { id:"gt17q", category:"gratitude", text:"Somebody remembers a kindness from you that you've long forgotten." },
  { id:"gt18q", category:"gratitude", text:"The bed you'll sleep in tonight is something not everyone has." },
  { id:"gt19q", category:"gratitude", text:"You've been given more chances to start over than you probably give yourself credit for." },
  { id:"gt20q", category:"gratitude", text:"That friend who checks in on you is doing something not everyone gets." },
  { id:"gt21q", category:"gratitude", text:"You're allowed to feel proud of surviving a year you didn't think you would." },
  { id:"gt22q", category:"gratitude", text:"The quiet, unremarkable comfort of today is still a gift." },
  { id:"gt23q", category:"gratitude", text:"You have hands that work, a mind that thinks, a heart that keeps trying. That's a lot." },
  { id:"gt24q", category:"gratitude", text:"Somewhere, someone is grateful you exist. You may never know who." },
  { id:"gt25q", category:"gratitude", text:"You get to wake up and try again. Not everyone gets that chance today." },

  { id:"sp16", category:"sleep", text:"Your bedtime isn't a punishment for the day ending. It's a gift to tomorrow." },
  { id:"sp17", category:"sleep", text:"The \"one more episode\" rarely feels as good as the sleep would have." },
  { id:"sp18", category:"sleep", text:"You don't have to solve tonight's worry before you're allowed to sleep." },
  { id:"sp19", category:"sleep", text:"Your body has been asking for rest longer than you've been ignoring it." },
  { id:"sp20", category:"sleep", text:"A tired mind convinces itself of things a rested mind wouldn't believe." },
  { id:"sp21", category:"sleep", text:"You are allowed to disappoint your inbox by going to bed on time." },
  { id:"sp22", category:"sleep", text:"The dishes will still be dirty tomorrow. Let them wait." },
  { id:"sp23", category:"sleep", text:"Sleep debt doesn't pay itself off with willpower." },
  { id:"sp24", category:"sleep", text:"Your best ideas tomorrow require an unremarkable, boring bedtime tonight." },
  { id:"sp25", category:"sleep", text:"You are allowed to end the day, even if it wasn't finished." },
];
const MANIFESTATIONS: Affirmation[] = [
  { id:"lv01", category:"love", text:"I am worthy of deep, healthy love." },
  { id:"lv02", category:"love", text:"I attract relationships that are safe, kind, and mutual." },
  { id:"lv03", category:"love", text:"I release relationships that no longer serve my growth." },
  { id:"lv04", category:"love", text:"I love myself first, and that love overflows into everything else." },
  { id:"lv05", category:"love", text:"I am open to giving and receiving love fully." },
  { id:"lv06", category:"love", text:"My heart is capable of healing and connection." },
  { id:"lv07", category:"love", text:"I choose people who choose me back, fully." },
  { id:"lv08", category:"love", text:"I deserve a love that feels easy, not exhausting." },
  { id:"lv09", category:"love", text:"I trust the timing of my own heart." },
  { id:"lv10", category:"love", text:"I am not afraid to ask for what I need in love." },
  { id:"lv11", category:"love", text:"I release old heartbreak and make room for new joy." },
  { id:"lv12", category:"love", text:"I am someone worth loving well." },
  { id:"lv13", category:"love", text:"I show up in my relationships with honesty and care." },
  { id:"lv14", category:"love", text:"I attract people who see and appreciate the real me." },
  { id:"lv15", category:"love", text:"My relationships reflect the peace I carry within." },

  { id:"cr01", category:"career", text:"I am capable of achieving my career goals." },
  { id:"cr02", category:"career", text:"I bring value wherever I show up." },
  { id:"cr03", category:"career", text:"I am allowed to grow into opportunities I don't feel 100% ready for." },
  { id:"cr04", category:"career", text:"My work ethic speaks for itself." },
  { id:"cr05", category:"career", text:"I am building a career that aligns with who I am." },
  { id:"cr06", category:"career", text:"I trust my skills and my ability to learn new ones." },
  { id:"cr07", category:"career", text:"I attract opportunities that match my potential." },
  { id:"cr08", category:"career", text:"I am not behind. I am on my own professional timeline." },
  { id:"cr09", category:"career", text:"I handle challenges at work with confidence and clarity." },
  { id:"cr10", category:"career", text:"I am worthy of recognition for the work I do." },
  { id:"cr11", category:"career", text:"I set boundaries that protect my energy at work." },
  { id:"cr12", category:"career", text:"My career is a journey, not a race against anyone else." },
  { id:"cr13", category:"career", text:"I am capable of learning whatever this next step requires." },
  { id:"cr14", category:"career", text:"I ask for what I'm worth." },
  { id:"cr15", category:"career", text:"I bring my full potential to the table, one day at a time." },

  { id:"sa01", category:"stress", text:"I release what is out of my control." },
  { id:"sa02", category:"stress", text:"I am safe, even when things feel uncertain." },
  { id:"sa03", category:"stress", text:"I choose ease over overwhelm." },
  { id:"sa04", category:"stress", text:"This feeling is temporary, and I will move through it." },
  { id:"sa05", category:"stress", text:"I allow myself to rest without guilt." },
  { id:"sa06", category:"stress", text:"I am capable of handling whatever today brings." },
  { id:"sa07", category:"stress", text:"I let go of the need to fix everything at once." },
  { id:"sa08", category:"stress", text:"My peace is not dependent on my circumstances." },
  { id:"sa09", category:"stress", text:"I breathe out tension and breathe in calm." },
  { id:"sa10", category:"stress", text:"I trust that this too shall pass." },
  { id:"sa11", category:"stress", text:"I am allowed to slow down, even when life feels fast." },
  { id:"sa12", category:"stress", text:"I release the pressure to have it all figured out." },
  { id:"sa13", category:"stress", text:"I choose to meet this moment with patience, not panic." },
  { id:"sa14", category:"stress", text:"I am stronger than the anxiety I'm feeling right now." },
  { id:"sa15", category:"stress", text:"I give myself grace during hard seasons." },

  { id:"pr01", category:"productivity", text:"I focus on progress, not perfection." },
  { id:"pr02", category:"productivity", text:"I am capable of finishing what I start." },
  { id:"pr03", category:"productivity", text:"I work with intention, not just urgency." },
  { id:"pr04", category:"productivity", text:"I give myself permission to work at my own pace." },
  { id:"pr05", category:"productivity", text:"I trust my ability to prioritize what matters most." },
  { id:"pr06", category:"productivity", text:"Small, consistent actions build the results I want." },
  { id:"pr07", category:"productivity", text:"I release the guilt of resting between tasks." },
  { id:"pr08", category:"productivity", text:"I am allowed to do one thing at a time." },
  { id:"pr09", category:"productivity", text:"My productivity does not define my worth." },
  { id:"pr10", category:"productivity", text:"I show up and do my best with the time I have." },
  { id:"pr11", category:"productivity", text:"I choose progress over the pressure to be perfect." },
  { id:"pr12", category:"productivity", text:"I am disciplined enough to follow through on what matters to me." },
  { id:"pr13", category:"productivity", text:"I trust myself to manage my time well." },
  { id:"pr14", category:"productivity", text:"I am capable of turning my ideas into action." },
  { id:"pr15", category:"productivity", text:"I celebrate what I complete instead of only what's left." },

  { id:"ov01", category:"overthinking", text:"I release the thoughts that don't serve me." },
  { id:"ov02", category:"overthinking", text:"I do not have to solve every \"what if\" today." },
  { id:"ov03", category:"overthinking", text:"My mind is allowed to be quiet." },
  { id:"ov04", category:"overthinking", text:"I trust myself to handle things as they come, not before." },
  { id:"ov05", category:"overthinking", text:"I choose to focus on what I know, not what I fear." },
  { id:"ov06", category:"overthinking", text:"Not every thought deserves my full attention." },
  { id:"ov07", category:"overthinking", text:"I release the need to have every answer right now." },
  { id:"ov08", category:"overthinking", text:"I let this thought pass without chasing it." },
  { id:"ov09", category:"overthinking", text:"I trust my decisions, even without certainty." },
  { id:"ov10", category:"overthinking", text:"I am allowed to think less and simply be more." },
  { id:"ov11", category:"overthinking", text:"My peace matters more than being right in my own head." },
  { id:"ov12", category:"overthinking", text:"I choose presence over spiraling." },
  { id:"ov13", category:"overthinking", text:"I release replaying what I cannot change." },
  { id:"ov14", category:"overthinking", text:"I trust that I'll figure it out when the time comes." },
  { id:"ov15", category:"overthinking", text:"I am not my thoughts. I am the one who notices them." },

  { id:"he01", category:"health", text:"I honor my body by listening to what it needs." },
  { id:"he02", category:"health", text:"I am worthy of feeling well, in mind and body." },
  { id:"he03", category:"health", text:"I choose habits that support my long-term health." },
  { id:"he04", category:"health", text:"My body is doing its best, and I thank it for that." },
  { id:"he05", category:"health", text:"I am patient with my body as it heals and grows." },
  { id:"he06", category:"health", text:"I nourish myself with food, rest, and movement I enjoy." },
  { id:"he07", category:"health", text:"I trust my body's signals and respond with care." },
  { id:"he08", category:"health", text:"I release guilt around rest — it's part of health, not a failure of it." },
  { id:"he09", category:"health", text:"I am capable of building habits that make me feel good." },
  { id:"he10", category:"health", text:"My health is a daily practice, not a one-time fix." },
  { id:"he11", category:"health", text:"I choose progress over perfection in how I care for myself." },
  { id:"he12", category:"health", text:"I am grateful for what my body allows me to do today." },
  { id:"he13", category:"health", text:"I give myself grace on the days that feel harder." },
  { id:"he14", category:"health", text:"I am learning to treat my body as an ally, not an enemy." },
  { id:"he15", category:"health", text:"Small choices today are building the health I want tomorrow." },

  { id:"cf01", category:"confidence", text:"I trust myself to handle what comes my way." },
  { id:"cf02", category:"confidence", text:"I speak with confidence because my voice matters." },
  { id:"cf03", category:"confidence", text:"I am allowed to take up space and be seen." },
  { id:"cf04", category:"confidence", text:"I don't need everyone's approval to know my own worth." },
  { id:"cf05", category:"confidence", text:"I walk into rooms as if I belong there — because I do." },
  { id:"cf06", category:"confidence", text:"I trust my instincts and act on them." },
  { id:"cf07", category:"confidence", text:"I am capable, even when I feel unsure." },
  { id:"cf08", category:"confidence", text:"My confidence doesn't depend on being perfect." },
  { id:"cf09", category:"confidence", text:"I stand behind my decisions." },
  { id:"cf10", category:"confidence", text:"I am becoming more sure of myself every day." },
  { id:"cf11", category:"confidence", text:"I don't shrink myself to make others comfortable." },
  { id:"cf12", category:"confidence", text:"I trust the value I bring to every room I enter." },
  { id:"cf13", category:"confidence", text:"I am allowed to be proud of myself out loud." },
  { id:"cf14", category:"confidence", text:"I choose self-trust over self-doubt." },
  { id:"cf15", category:"confidence", text:"I carry myself with quiet confidence, not arrogance." },

  { id:"gr01", category:"gratitude", text:"I notice the small good things, even on hard days." },
  { id:"gr02", category:"gratitude", text:"I am grateful for how far I've already come." },
  { id:"gr03", category:"gratitude", text:"I choose to see what's going right, not just what's missing." },
  { id:"gr04", category:"gratitude", text:"Gratitude turns what I have into enough." },
  { id:"gr05", category:"gratitude", text:"I appreciate the people who show up for me." },
  { id:"gr06", category:"gratitude", text:"I am thankful for this body that carries me through each day." },
  { id:"gr07", category:"gratitude", text:"I find something to be grateful for, even in ordinary moments." },
  { id:"gr08", category:"gratitude", text:"I honor the lessons hidden inside hard seasons." },
  { id:"gr09", category:"gratitude", text:"I am grateful for my own resilience." },
  { id:"gr10", category:"gratitude", text:"I notice beauty in the everyday, not just the extraordinary." },
  { id:"gr11", category:"gratitude", text:"I appreciate myself for showing up today." },
  { id:"gr12", category:"gratitude", text:"I am thankful for second chances and new beginnings." },
  { id:"gr13", category:"gratitude", text:"Gratitude is a practice I choose, again and again." },
  { id:"gr14", category:"gratitude", text:"I recognize the good that's already here." },
  { id:"gr15", category:"gratitude", text:"I am grateful for how much I've grown, even quietly." },

  { id:"sl01", category:"sleep", text:"I release the day and allow myself to rest." },
  { id:"sl02", category:"sleep", text:"My worth is not measured by how much I got done today." },
  { id:"sl03", category:"sleep", text:"I give myself permission to stop for the night." },
  { id:"sl04", category:"sleep", text:"Rest is productive. I let myself have it." },
  { id:"sl05", category:"sleep", text:"I trust that tomorrow can hold what today didn't finish." },
  { id:"sl06", category:"sleep", text:"I am allowed to close my eyes without solving everything first." },
  { id:"sl07", category:"sleep", text:"My body deserves deep, restorative rest." },
  { id:"sl08", category:"sleep", text:"I let go of today's tension so I can sleep in peace." },
  { id:"sl09", category:"sleep", text:"I am safe to rest. Nothing needs me right this second." },
  { id:"sl10", category:"sleep", text:"I release my to-do list until morning." },
  { id:"sl11", category:"sleep", text:"Sleep is how I take care of tomorrow's version of me." },
  { id:"sl12", category:"sleep", text:"I quiet my mind and let my body lead me into rest." },
  { id:"sl13", category:"sleep", text:"I am allowed to do nothing else tonight." },
  { id:"sl14", category:"sleep", text:"I trust the morning to bring clarity I don't have right now." },
  { id:"sl15", category:"sleep", text:"I let this day be enough, and I let myself rest." },
];
const MANIFESTATION_CATS: { id: string; label: string }[] = [
  { id:"all", label:"All" },
  { id:"love", label:"Love" },
  { id:"career", label:"Career" },
  { id:"stress", label:"Stress & Anxiety" },
  { id:"productivity", label:"Productivity" },
  { id:"overthinking", label:"Overthinking" },
  { id:"health", label:"Health" },
  { id:"confidence", label:"Confidence" },
  { id:"gratitude", label:"Gratitude" },
  { id:"sleep", label:"Sleep & Rest" },
];
const AFFIRMATION_CATS: { id: "all"|Affirmation["category"]; label: string }[] = [
  { id:"all", label:"All" },
  { id:"calm", label:"Calm" },
  { id:"motivation", label:"Motivation" },
  { id:"worth", label:"Self-Worth" },
  { id:"stress", label:"Stress Relief" },
  { id:"love", label:"Love" },
  { id:"career", label:"Career" },
  { id:"productivity", label:"Productivity" },
  { id:"overthinking", label:"Overthinking" },
  { id:"health", label:"Health" },
  { id:"confidence", label:"Confidence" },
  { id:"gratitude", label:"Gratitude" },
  { id:"sleep", label:"Sleep & Rest" },
];
const MIND_RESET_TECHNIQUES = [
  {
    id:"grounding", title:"5-4-3-2-1 Grounding", duration:"~2 min",
    desc:"Brings your attention back into the room when your thoughts are running ahead of you. Go through it slowly, out loud if you can.",
    steps:[
      "Name 5 things you can see around you right now.",
      "Name 4 things you can touch — notice their texture.",
      "Name 3 things you can hear, near or far.",
      "Name 2 things you can smell, or two smells you like.",
      "Name 1 thing you can taste, even if it's just the inside of your mouth.",
    ],
  },
  {
    id:"bodyscan", title:"One-Minute Body Scan", duration:"~1 min",
    desc:"A fast pass through your body to notice where you're holding tension — you don't have to fix it, just notice it.",
    steps:[
      "Jaw & shoulders — unclench, let them drop.",
      "Hands — uncurl your fingers.",
      "Stomach — let your next breath go all the way there.",
      "Feet — press them into the floor, feel the ground hold you.",
    ],
  },
  {
    id:"labeling", title:"Thought Labeling", duration:"~1 min",
    desc:"Catches a spiral early by naming what kind of thought it is, instead of following where it leads.",
    steps:[
      "Notice the thought that has your attention.",
      "Label it as one of: a worry, a memory, a plan, or a judgment.",
      "Let the label create a little distance — you're noticing the thought, not living inside it.",
      "If it keeps circling, the Thought Dump journal is built for setting it down entirely.",
    ],
  },
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
const MOOD_OPTIONS: { id: Mood; label: string; emoji: string; recs: { label: string; page: Page; desc: string; libraryCat?: string }[] }[] = [
  { id:"happy",   emoji:"😊",label:"Happy",  recs:[{label:"Guided Breathing",page:"breathing",desc:"Celebrate with energising breath"},{label:"Library",page:"library",desc:"Explore inspiring reads",libraryCat:"Self Care"},{label:"Affirmations",page:"affirmations",desc:"A line to match your joy"}] },
  { id:"calm",    emoji:"😌",label:"Calm",   recs:[{label:"Journal",page:"journal",desc:"Capture this peaceful state"},{label:"Library",page:"library",desc:"Deepen your mindfulness",libraryCat:"Mental Wellness"},{label:"Breathing",page:"breathing",desc:"Sustain your calm"}] },
  { id:"neutral", emoji:"😐",label:"Neutral",recs:[{label:"Breathing",page:"breathing",desc:"Energise with focus breath"},{label:"Checklist",page:"checklist",desc:"Ground yourself in small tasks"},{label:"Library",page:"library",desc:"Find a motivating read",libraryCat:"Habit Building"}] },
  { id:"stressed",emoji:"😟",label:"Stressed",recs:[{label:"Breathing",page:"breathing",desc:"Box breathing to reset your system"},{label:"Journal",page:"journal",desc:"Write it out — release the tension"},{label:"Library",page:"library",desc:"Read about stress management",libraryCat:"Stress Management"}] },
  { id:"tired",   emoji:"😴",label:"Tired",  recs:[{label:"Breathing",page:"breathing",desc:"Sleep breath to restore you"},{label:"Library",page:"library",desc:"Read about rest and recovery",libraryCat:"Sleep"},{label:"Affirmations",page:"affirmations",desc:"Gentle words for tired days"}] },
  { id:"low",     emoji:"😔",label:"Low",    recs:[{label:"Journal",page:"journal",desc:"Gratitude journaling lifts mood"},{label:"Library",page:"library",desc:"Gentle self-care reading",libraryCat:"Self Care"},{label:"Breathing",page:"breathing",desc:"Calming breath for low days"}] },
];
const LIBRARY_CATS = ["All","Breathing","Nutrition","Movement","Mental Wellness","Sleep","Stress Management","Habit Building","Self Care"];
const CAT_COLORS: Record<string,string> = { Breathing:"#A6B89B",Nutrition:"#C98A67",Movement:"#5E8A64","Mental Wellness":"#9B8EC4",Sleep:"#6B8FB8","Stress Management":"#C4A067","Habit Building":"#7A8E6B","Self Care":"#C98A8A" };

// ─── NAV ────────────────────────────────────────────────────────────────────
const NAV_LINKS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id:"home",      label:"Home",      icon:<Leaf size={17}/> },
  { id:"breathing", label:"Breathing", icon:<Wind size={17}/> },
  { id:"affirmations", label:"Affirmations", icon:<Quote size={17}/> },
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-28 sm:py-20">
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
          A daily sanctuary for intentional breathing, honest reflection, and quiet self-belief.
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
          <button onClick={() => setPage("affirmations")}
            className="px-7 py-4 rounded-full font-['Manrope'] text-sm text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all duration-300">
            Read today's affirmation
          </button>
        </div>
      </div>
      {/* Scroll indicator — decorative only; hidden on mobile where hero content already exceeds viewport height */}
      <div className="hidden sm:flex absolute bottom-8 flex-col items-center gap-2 opacity-50">
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

function MoodSection({ setPage, accent }: { setPage:(p:Page, opts?:{libraryCat?:string})=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const [savedMood, setSavedMood] = useLocalStorage<{mood:Mood|null;date:string}>("ara_mood",{mood:null,date:""});
  const todayMood: Mood|null = savedMood.date === todayStr() ? savedMood.mood : null;
  const moodInfo = MOOD_OPTIONS.find(m => m.id === todayMood);
  const select = (m: Mood) => { setSavedMood({mood:m,date:todayStr()}); trackEvent("mood_selected", { mood: m }); };
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
                    onClick={() => setPage(r.page, r.libraryCat ? {libraryCat:r.libraryCat} : undefined)}
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
                <motion.div whileTap={{scale:0.85}} animate={item.done?{scale:[1,1.15,1]}:{scale:1}} transition={{duration:0.3}}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${item.done?"border-transparent":"border-muted-foreground/30 group-hover:border-primary/50"}`}
                  style={item.done ? { backgroundColor:accent.primary,borderColor:accent.primary } : {}}>
                  <AnimatePresence>
                    {item.done && (
                      <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{duration:0.15}}>
                        <Check size={11} color={accent.fg} strokeWidth={3}/>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
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
                <motion.button key={i} whileTap={{scale:0.9}} whileHover={{scale:1.05}} onClick={() => toggleWater(i)}
                  animate={i===waterCount-1?{scale:[1,1.2,1]}:{scale:1}} transition={{duration:0.3}}
                  className="aspect-square rounded-2xl flex items-center justify-center"
                  style={i<waterCount ? { backgroundColor:accent.primary, boxShadow:`0 4px 16px ${accent.primary}30` } : { backgroundColor:"var(--muted)", border:"1px solid var(--border)" }}
                  aria-label={`Glass ${i+1}`}>
                  <Droplets size={16} color={i<waterCount ? accent.fg : "var(--muted-foreground)"} strokeWidth={i<waterCount?2:1.5}/>
                </motion.button>
              ))}
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div className="h-full rounded-full" animate={{ width:`${(waterCount/8)*100}%` }} transition={{duration:0.5}}
                style={{ backgroundColor:accent.primary }}/>
            </div>
            <p className="font-['Manrope'] text-xs text-muted-foreground mt-2">{Math.round((waterCount/8)*100)}% of daily goal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AffirmationsSection({ setPage, accent }: { setPage:(p:Page)=>void; accent: typeof ACCENTS[AccentKey] }) {
  const [ref, visible] = useScrollReveal();
  const combined = useMemo(() => [...AFFIRMATIONS, ...MANIFESTATIONS], []);
  const quote = useMemo(() => combined[Math.floor(Math.random()*combined.length)], [combined]);
  const catLabel = (AFFIRMATION_CATS.find(c => c.id === quote.category) ?? MANIFESTATION_CATS.find(c => c.id === quote.category))?.label ?? "";
  return (
    <section ref={ref} className={`relative overflow-hidden scroll-reveal-right ${visible?"visible":""}`}
      style={{ backgroundColor:"#241A08" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color:"rgba(217,187,106,0.7)" }}>
            Daily Affirmations
          </p>
          <h2 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-7" style={{ color:"#F0EAE0" }}>
            Words to carry<br/><em>through your day</em>
          </h2>
          <p className="font-['Manrope'] text-base leading-relaxed max-w-lg mb-10" style={{ color:"rgba(240,234,224,0.55)" }}>
            Short, honest lines for calm, motivation, self-worth, and stress relief. Filter by what today needs, or let one find you.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {AFFIRMATION_CATS.filter(c=>c.id!=="all").map(c => (
              <span key={c.id} className="px-3.5 py-1.5 rounded-full font-['Manrope'] text-xs"
                style={{ backgroundColor:"rgba(217,187,106,0.15)", color:"rgba(217,187,106,0.85)", border:"1px solid rgba(217,187,106,0.25)" }}>
                {c.label}
              </span>
            ))}
          </div>
          <button onClick={() => setPage("affirmations")}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
            style={{ backgroundColor:"#D9BB6A", color:"#241A08", boxShadow:"0 8px 32px rgba(217,187,106,0.25)" }}>
            <Quote size={16}/> Read today's line
          </button>
        </div>
        {/* Featured quote card */}
        <div className="relative">
          <div className="relative rounded-3xl p-10 sm:p-12" style={{ backgroundColor:"rgba(240,234,224,0.05)", border:"1px solid rgba(217,187,106,0.22)", boxShadow:"0 32px 80px rgba(0,0,0,0.35)" }}>
            <Quote size={26} style={{ color:"rgba(217,187,106,0.55)" }} className="mb-6"/>
            <p className="font-['DM_Serif_Display'] italic text-2xl sm:text-3xl leading-snug mb-6" style={{ color:"#F0EAE0" }}>
              "{quote.text}"
            </p>
            <span className="font-['Manrope'] text-xs uppercase tracking-wider" style={{ color:"rgba(217,187,106,0.65)" }}>
              {catLabel}
            </span>
          </div>
          <BotanicalC className="absolute -right-8 -bottom-8 w-16 h-26 opacity-[0.12]" style={{ color:"#D9BB6A" }}/>
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
  const [released, setReleased] = useState(false);
  const release = () => {
    if (!text.trim()) return;
    setText(""); setReleased(true); setTimeout(() => setReleased(false), 2600);
    trackEvent("journal_released", { char_count: text.trim().length, source: "home_teaser" });
  };
  return (
    <section ref={ref} className={`relative overflow-hidden scroll-reveal-left ${visible?"visible":""}`}
      style={{ backgroundColor:"#1A1510" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: quote + label */}
        <div>
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color:"rgba(230,211,138,0.5)" }}>
            Thought Dump Journal
          </p>
          <h2 className="font-['DM_Serif_Display'] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-8" style={{ color:"#F0EAE0" }}>
            Say it, then<br/><em>let it go</em>
          </h2>
          <p className="font-['Manrope'] text-base leading-relaxed mb-8" style={{ color:"rgba(240,234,224,0.5)" }}>
            Write whatever's taking up space in your head. Nothing here is saved, stored, or sent anywhere — not to us, not to your browser. Once you release it, it's genuinely gone.
          </p>
          <div className="p-4 rounded-2xl" style={{ backgroundColor:"rgba(240,234,224,0.06)", border:"1px solid rgba(240,234,224,0.08)" }}>
            <p className="font-['Manrope'] text-xs leading-relaxed" style={{ color:"rgba(240,234,224,0.45)" }}>
              Some thoughts don't need to be revisited — they just need somewhere to go.
            </p>
          </div>
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
                {released ? (
                  <span className="font-['Manrope'] text-xs flex items-center gap-1.5" style={{ color:accent.primary }}>
                    <Check size={13}/> Let go — nothing was saved
                  </span>
                ) : (
                  <span className="font-['Manrope'] text-xs text-muted-foreground">{text.length} characters</span>
                )}
                <div className="flex gap-2">
                  <button onClick={release} disabled={!text.trim()}
                    className="px-5 py-2 rounded-xl font-['Manrope'] text-xs font-medium transition-all disabled:opacity-40"
                    style={{ backgroundColor:accent.primary, color:accent.fg }}>
                    Release it
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

function HomePage({ setPage, accent }: { setPage:(p:Page, opts?:{libraryCat?:string})=>void; accent: typeof ACCENTS[AccentKey] }) {
  return (
    <div>
      <HeroSection setPage={setPage} accent={accent}/>
      <BreathingFeatureSection setPage={setPage} accent={accent}/>
      <QuoteMomentSection/>
      <MoodSection setPage={setPage} accent={accent}/>
      <ChecklistWaterSection accent={accent}/>
      <AffirmationsSection setPage={setPage} accent={accent}/>
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
          if (cycleRef.current > totalCycles) {
            setFinished(true); stopAudio();
            trackEvent("breathing_completed", { mode: mode.id, cycles: totalCycles });
            return;
          }
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
    trackEvent("breathing_started", { mode: mode.id, cycles: mode.cycles });
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
            {BREATH_MODES.map((m,i) => (
              <motion.button key={m.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                whileTap={{scale:0.97}} onClick={() => setSelectedMode(m)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${selectedMode.id===m.id?"border-transparent shadow-lg":"hover:shadow-sm"}`}
                style={selectedMode.id===m.id
                  ? { backgroundColor:m.color+"22", borderColor:m.color+"55", boxShadow:`0 8px 32px ${m.color}18` }
                  : { backgroundColor:"rgba(240,234,224,0.04)", borderColor:"rgba(240,234,224,0.08)" }}>
                <div className="w-2.5 h-2.5 rounded-full mb-3" style={{ backgroundColor:m.color }}/>
                <p className="font-['DM_Serif_Display'] text-base font-medium mb-1" style={{ color:"#F0EAE0" }}>{m.name}</p>
                <p className="font-['Manrope'] text-xs" style={{ color:"rgba(240,234,224,0.45)" }}>{m.desc}</p>
              </motion.button>
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

        {/* Quick Mind Reset techniques */}
        <div className="mt-20 pt-16" style={{ borderTop:"1px solid rgba(240,234,224,0.08)" }}>
          <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase mb-3 text-center" style={{ color:"rgba(166,184,155,0.5)" }}>
            Between breathing sessions
          </p>
          <h2 className="font-['DM_Serif_Display'] text-3xl lg:text-4xl text-center mb-3" style={{ color:"#F0EAE0" }}>
            Quick mind reset
          </h2>
          <p className="font-['Manrope'] text-sm text-center max-w-md mx-auto mb-10" style={{ color:"rgba(240,234,224,0.5)" }}>
            Three grounding techniques, each under two minutes, for moments you can't stop to breathe through a full session.
          </p>
          <div className="max-w-xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {MIND_RESET_TECHNIQUES.map((t,i) => (
                <motion.div key={t.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
                <AccordionItem value={t.id}
                  className="rounded-2xl mb-3 px-5 last:mb-0"
                  style={{ backgroundColor:"rgba(240,234,224,0.04)", border:"1px solid rgba(240,234,224,0.08)" }}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="font-['DM_Serif_Display'] text-base" style={{ color:"#F0EAE0" }}>{t.title}</span>
                      <span className="font-['Manrope'] text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor:"rgba(166,184,155,0.15)", color:"#A6B89B", border:"1px solid rgba(166,184,155,0.3)" }}>
                        {t.duration}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-['Manrope'] text-sm mb-4 leading-relaxed" style={{ color:"rgba(240,234,224,0.55)" }}>{t.desc}</p>
                    <ol className="space-y-2">
                      {t.steps.map((s,i) => (
                        <li key={i} className="font-['Manrope'] text-sm flex gap-3" style={{ color:"rgba(240,234,224,0.75)" }}>
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5"
                            style={{ backgroundColor:"rgba(166,184,155,0.15)", color:"#A6B89B" }}>{i+1}</span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AFFIRMATIONS PAGE ────────────────────────────────────────────────────────
type AffirmMode = "quotes" | "affirmations";
function getAffirmPool(mode: AffirmMode, cat: "all"|Affirmation["category"]) {
  const src = mode === "affirmations" ? MANIFESTATIONS : AFFIRMATIONS;
  return cat === "all" ? src : src.filter(a => a.category === cat);
}

function AffirmationsModeSelect({ onSelect, accent }: { onSelect:(m:AffirmMode)=>void; accent: typeof ACCENTS[AccentKey] }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pb-24 md:pb-16 text-center">
      <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Before we begin</p>
      <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-3">What do you need right now?</h1>
      <p className="font-['Manrope'] text-muted-foreground mb-12 max-w-md mx-auto">Something to read and reflect on, or a line you can repeat to yourself until it feels true?</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.button initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
          whileHover={{y:-4}} whileTap={{scale:0.98}} onClick={()=>onSelect("quotes")}
          className="text-left bg-card rounded-3xl border border-border p-7 hover:border-primary/40 transition-colors">
          <Quote size={22} style={{ color:accent.primary }} className="mb-4"/>
          <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-2">A quote to reflect on</h3>
          <p className="font-['Manrope'] text-sm text-muted-foreground leading-relaxed">Short, honest observations — the kind of thing a friend who gets it would say.</p>
        </motion.button>
        <motion.button initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
          whileHover={{y:-4}} whileTap={{scale:0.98}} onClick={()=>onSelect("affirmations")}
          className="text-left bg-card rounded-3xl border border-border p-7 hover:border-primary/40 transition-colors">
          <Sparkles size={22} style={{ color:accent.primary }} className="mb-4"/>
          <h3 className="font-['DM_Serif_Display'] text-xl text-foreground mb-2">An affirmation to repeat</h3>
          <p className="font-['Manrope'] text-sm text-muted-foreground leading-relaxed">First-person lines you can say to yourself daily to manifest and reinforce how you want to feel.</p>
        </motion.button>
      </div>
    </div>
  );
}

function AffirmationsPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [mode, setModeRaw] = useState<AffirmMode|null>(null);
  const [cat, setCat] = useState<string>("all");
  const pool = useMemo(() => mode ? getAffirmPool(mode, cat) : [], [mode, cat]);
  const [featured, setFeatured] = useState<Affirmation|null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const recentRef = useRef<string[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const catList = mode === "affirmations" ? MANIFESTATION_CATS : AFFIRMATION_CATS;
  const setMode = (m: AffirmMode) => { setModeRaw(m); setCat("all"); trackEvent("affirmations_mode_selected", { type: m }); };

  const shuffle = (m: AffirmMode = mode ?? "quotes", c = cat) => {
    const p = getAffirmPool(m, c);
    const recentCap = Math.max(1, Math.min(recentRef.current.length, p.length - 1));
    const recent = recentRef.current.slice(-recentCap);
    const candidates = p.filter(a => !recent.includes(a.id));
    const next = (candidates.length ? candidates : p)[Math.floor(Math.random() * (candidates.length ? candidates.length : p.length))];
    recentRef.current = [...recentRef.current, next.id].slice(-8);
    setFeatured(next);
    setFadeKey(k=>k+1);
    trackEvent("affirmation_shuffled", { type: m, category: c });
  };

  const selectFeatured = (a: Affirmation) => {
    setFeatured(a);
    setFadeKey(k=>k+1);
    recentRef.current = [...recentRef.current, a.id].slice(-8);
    stageRef.current?.scrollIntoView({ behavior:"smooth", block:"center" });
    trackEvent("affirmation_selected", { type: mode, id: a.id, category: a.category });
  };

  useEffect(() => {
    if (!mode) return;
    recentRef.current = [];
    shuffle(mode, cat);
    // eslint-disable-next-line
  }, [mode, cat]);

  if (!mode) return <AffirmationsModeSelect onSelect={setMode} accent={accent}/>;

  const isAffirm = mode === "affirmations";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-8 flex items-start justify-between gap-4 flex-wrap">
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.25}}>
            <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              {isAffirm ? "Affirmations to repeat" : "Quotes to reflect on"}
            </p>
            <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-2">
              {isAffirm ? "Say it until it's true" : "Affirmations & Quotes"}
            </h1>
            <p className="font-['Manrope'] text-muted-foreground">
              {isAffirm ? "Pick what's on your mind, and repeat these daily, out loud if you can." : "Pick a mood, or let one find you."}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-1.5 bg-muted rounded-full p-1">
          <button onClick={()=>setMode("quotes")}
            className={`px-4 py-2 rounded-full font-['Manrope'] text-xs font-medium transition-all ${!isAffirm?"bg-card text-foreground shadow-sm":"text-muted-foreground"}`}>
            Quotes
          </button>
          <button onClick={()=>setMode("affirmations")}
            className={`px-4 py-2 rounded-full font-['Manrope'] text-xs font-medium transition-all ${isAffirm?"bg-card text-foreground shadow-sm":"text-muted-foreground"}`}>
            Affirmations
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {catList.map(c => (
          <button key={c.id} onClick={()=>setCat(c.id)}
            className={`font-['Manrope'] text-sm px-4 py-2 rounded-full border transition-all ${cat===c.id?"border-transparent font-medium":"border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
            style={cat===c.id?{backgroundColor:accent.primary,color:accent.fg}:{}}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Featured stage */}
      <div ref={stageRef} className="bg-card rounded-3xl border border-border p-10 sm:p-14 mb-6 text-center min-h-[180px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {featured && (
            <motion.blockquote key={fadeKey} initial={{opacity:0,y:10,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:0.98}} transition={{duration:0.35,ease:"easeOut"}}>
              <p className={`font-['DM_Serif_Display'] text-2xl sm:text-3xl text-foreground leading-snug max-w-xl ${isAffirm?"":"italic"}`}>
                {isAffirm ? featured.text : `"${featured.text}"`}
              </p>
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-3 mb-14">
        <button onClick={()=>shuffle()}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Manrope'] text-sm font-medium transition-all hover:scale-105"
          style={{ backgroundColor:accent.primary, color:accent.fg }}>
          <RefreshCw size={14}/> {isAffirm ? "Give me another" : "Shuffle a new line"}
        </button>
      </div>

      {/* Browse grid */}
      <h2 className="font-['DM_Serif_Display'] text-2xl text-foreground mb-4">Browse them all — tap one to feature it</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {pool.map((a,i) => {
          const isFeatured = featured?.id===a.id;
          const cardClass = `text-left bg-card rounded-2xl border p-5 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] ${isFeatured?"border-transparent shadow-md":"border-border"}`;
          const cardStyle = isFeatured?{boxShadow:`0 0 0 2px ${accent.primary}`}:{};
          const content = (
            <>
              <span className="font-['Manrope'] text-[10px] uppercase tracking-wider block mb-2" style={{ color:accent.primary }}>
                {catList.find(c=>c.id===a.category)?.label}
              </span>
              <p className={`font-['DM_Serif_Display'] text-base text-foreground leading-relaxed ${isAffirm?"":"italic"}`}>
                {isAffirm ? a.text : `"${a.text}"`}
              </p>
            </>
          );
          // Only the first ~16 cards get a Framer-driven entrance — animating hundreds of
          // motion components at once (with layout tracking) is what caused the jank.
          return i < 16 ? (
            <motion.button key={a.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.03,duration:0.25}}
              onClick={()=>selectFeatured(a)} className={cardClass} style={cardStyle}>
              {content}
            </motion.button>
          ) : (
            <button key={a.id} onClick={()=>selectFeatured(a)} className={cardClass} style={cardStyle}>
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── LIBRARY PAGE ────────────────────────────────────────────────────────────
function LibraryPage({ accent, initialCat }: { accent: typeof ACCENTS[AccentKey]; initialCat?: string|null }) {
  const [cat, setCat] = useState(initialCat && LIBRARY_CATS.includes(initialCat) ? initialCat : "All");
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
          <motion.button key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.04,duration:0.25}}
            onClick={()=>{setOpenArticle(a); trackEvent("library_article_opened", { id: a.id, category: a.category, title: a.title });}}
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
function JournalPage({ accent, setPage }: { accent: typeof ACCENTS[AccentKey]; setPage:(p:Page)=>void }) {
  const [promptIdx, setPromptIdx] = useState(() => Math.floor(Math.random()*REFLECTION_PROMPTS.length));
  const [text, setText] = useState("");
  const [releaseTokens, setReleaseTokens] = useState<{key:string;word:string;dx:number;dy:number;rot:number;dur:number;delay:number}[]>([]);
  const [releasing, setReleasing] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [justReleased, setJustReleased] = useState(false);

  const release = () => {
    if (!text.trim()) return;
    const rawWords = text.split(/(\s+)/).filter(w => w.length > 0);
    // Cluster words into small groups so we never animate more than ~30 nodes at once,
    // regardless of entry length — keeps the release smooth even for long entries.
    const targetNodeCount = 30;
    const clusterSize = Math.max(1, Math.ceil(rawWords.length / targetNodeCount));
    const words = clusterSize === 1
      ? rawWords
      : rawWords.reduce<string[]>((acc, w, i) => {
          if (i % clusterSize === 0) acc.push(w); else acc[acc.length-1] += w;
          return acc;
        }, []);
    const tokens = words.map((word, i) => ({
      key: `${i}-${word}-${Math.random()}`,
      word,
      dx: (Math.random() - 0.5) * 90,
      dy: -(50 + Math.random() * 90),
      rot: (Math.random() - 0.5) * 40,
      dur: 1.1 + Math.random() * 0.7,
      delay: i * 0.014 + Math.random() * 0.04,
    }));
    trackEvent("journal_released", { char_count: text.trim().length, word_count: rawWords.length, source: "journal_page" });
    setReleaseTokens(tokens);
    setText("");
    setReleasing(true);
    setPulsing(true);
    setPromptIdx(Math.floor(Math.random()*REFLECTION_PROMPTS.length));
    setTimeout(() => setPulsing(false), 700);
    setTimeout(() => { setReleasing(false); setReleaseTokens([]); }, 2100);
    setJustReleased(true);
    setTimeout(() => setJustReleased(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
      <div className="pt-6 mb-10">
        <p className="font-['Manrope'] text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Thought Dump Journal</p>
        <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-foreground mb-3">Say it, then let it go</h1>
        <p className="font-['Manrope'] text-sm text-muted-foreground max-w-md">
          Nothing you write here is saved, stored, or sent anywhere — not to a server, not to your browser. Once you release it, it's genuinely gone.
        </p>
      </div>
      <div className="bg-card rounded-3xl border border-border p-7 lg:p-8 mb-8 relative overflow-hidden">
        {/* Glow pulse on release — a separate layer with only opacity animated (cheap, compositor-only) instead of animating box-shadow directly, which would repaint the whole card every frame */}
        <AnimatePresence>
          {pulsing && (
            <motion.div aria-hidden className="absolute inset-0 pointer-events-none rounded-3xl"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35, ease:"easeOut" }}
              style={{ boxShadow:`0 0 40px ${accent.primary}40`, zIndex:0 }}/>
          )}
        </AnimatePresence>
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
              aria-label="New journal prompt"
              className="flex-shrink-0 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground mt-1">
              <RefreshCw size={16}/>
            </button>
          </div>
          <div className="relative">
            <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} disabled={releasing}
              placeholder="Write freely — there are no wrong answers here…"
              className="w-full bg-transparent border-0 outline-none font-['Manrope'] text-sm text-foreground placeholder:text-muted-foreground/50 resize-none leading-[2.5rem] disabled:opacity-50"/>
            {releasing && (
              <div aria-hidden className="absolute inset-0 pointer-events-none font-['Manrope'] text-sm text-foreground leading-[2.5rem]">
                {releaseTokens.map(t => t.word.trim() === "" ? (
                  <span key={t.key}>{t.word}</span>
                ) : (
                  <motion.span key={t.key} className="inline-block"
                    initial={{ opacity:1, x:0, y:0, rotate:0 }}
                    animate={{ opacity:0, x:t.dx, y:t.dy, rotate:t.rot }}
                    transition={{ duration:t.dur, delay:t.delay, ease:"easeOut" }}>
                    {t.word}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <AnimatePresence mode="wait">
              {justReleased ? (
                <motion.p key="released" initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="font-['Manrope'] text-xs flex items-center gap-1.5" style={{ color:accent.primary }}>
                  <Check size={13}/> Let go — nothing was saved
                </motion.p>
              ) : (
                <motion.p key="count" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="font-['Manrope'] text-xs text-muted-foreground">
                  {text.length} characters, held by no one but you
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button onClick={release} disabled={!text.trim() || releasing} whileTap={{scale:0.95}}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-['Manrope'] text-sm font-medium transition-all disabled:opacity-50"
              style={{ backgroundColor:accent.primary,color:accent.fg }}>
              Release it <Wind size={14}/>
            </motion.button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-border p-5">
        <h2 className="font-['DM_Serif_Display'] text-lg text-foreground mb-2">Why nothing is saved</h2>
        <p className="font-['Manrope'] text-sm text-muted-foreground leading-relaxed">
          A lot of journaling apps ask you to build a habit of reviewing old entries. This one doesn't — some thoughts don't need to be revisited, they just need somewhere to go. Want something to look back on instead? Try today's <button onClick={()=>setPage("affirmations")} className="underline" style={{color:accent.primary}}>affirmation</button>.
        </p>
      </div>
    </div>
  );
}

// ─── CHECKLIST PAGE ──────────────────────────────────────────────────────────
function ChecklistPage({ accent }: { accent: typeof ACCENTS[AccentKey] }) {
  const [items, setItems] = useLocalStorage<CheckItem[]>("ara_checklist", DEFAULT_TASKS.map(t=>({id:uid(),text:t,done:false})));
  const [newText, setNewText] = useState("");
  const doneCount = items.filter(i=>i.done).length;
  const progress = items.length ? (doneCount/items.length)*100 : 0;
  const completedTrackedRef = useRef(false);
  useEffect(() => {
    if (progress === 100 && items.length > 0 && !completedTrackedRef.current) {
      completedTrackedRef.current = true;
      trackEvent("checklist_completed", { item_count: items.length });
    } else if (progress < 100) {
      completedTrackedRef.current = false;
    }
  }, [progress, items.length]);
  const toggle  = (id: string) => setItems(p=>p.map(i=>i.id===id?{...i,done:!i.done}:i));
  const remove  = (id: string) => setItems(p=>p.filter(i=>i.id!==id));
  const moveUp  = (idx: number) => { if(idx===0)return; setItems(p=>{const n=[...p];[n[idx-1],n[idx]]=[n[idx],n[idx-1]];return n;}); };
  const moveDown= (idx: number) => setItems(p=>{if(idx>=p.length-1)return p;const n=[...p];[n[idx],n[idx+1]]=[n[idx+1],n[idx]];return n;});
  const add = () => { if(!newText.trim())return; setItems(p=>[...p,{id:uid(),text:newText.trim(),done:false}]); setNewText(""); trackEvent("checklist_item_added", {}); };
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
            <motion.button whileTap={{scale:0.85}} onClick={()=>toggle(item.id)}
              animate={item.done?{scale:[1,1.15,1]}:{scale:1}} transition={{duration:0.3}}
              data-analytics={`checklist_toggle: ${item.text}`}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${item.done?"border-transparent":"border-muted-foreground/30 group-hover:border-primary/50"}`}
              style={item.done?{backgroundColor:accent.primary}:{}}>
              <AnimatePresence>
                {item.done && (
                  <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{duration:0.15}}>
                    <Check size={11} color={accent.fg} strokeWidth={3}/>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <span className={`flex-1 font-['Manrope'] text-sm ${item.done?"line-through text-muted-foreground/50":"text-foreground"}`}>{item.text}</span>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={()=>moveUp(idx)} data-analytics="checklist_move_up" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><ArrowUp size={13}/></button>
              <button onClick={()=>moveDown(idx)} data-analytics="checklist_move_down" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><ArrowDown size={13}/></button>
              <button onClick={()=>remove(item.id)} data-analytics="checklist_remove_item" className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13}/></button>
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
  const set = <K extends keyof AppSettings>(k: K, v: AppSettings[K]) => {
    setSettings(p=>({...p,[k]:v}));
    trackEvent("settings_changed", { setting: k, value: String(v) });
  };
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
              data-analytics={`toggle_${k}_${!settings[k]}`}
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
const PAGE_PATHS: Record<Page, string> = {
  home: "/", breathing: "/breathing", affirmations: "/affirmations",
  library: "/library", journal: "/journal", checklist: "/checklist", settings: "/settings",
};
const PAGE_TITLES: Record<Page, string> = {
  home: "Aranook — A Quiet Place to Reset",
  breathing: "Breathing — Aranook",
  affirmations: "Affirmations & Quotes — Aranook",
  library: "Wellness Library — Aranook",
  journal: "Thought Dump Journal — Aranook",
  checklist: "Daily Checklist — Aranook",
  settings: "Settings — Aranook",
};

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

  const [libraryFilter, setLibraryFilter] = useState<string|null>(null);
  const navigate = (p: Page, opts?: { libraryCat?: string }) => {
    setPage(p);
    setLibraryFilter(opts?.libraryCat ?? null);
    if (p !== "home") window.scrollTo({ top:0, behavior:"smooth" });
    // Give every internal "page" a real virtual URL so the SPA page-view
    // listener (patched replaceState in AnalyticsProvider) fires a GA
    // page_view for it — without this, GA only ever sees the initial load.
    document.title = PAGE_TITLES[p];
    window.history.replaceState(null, "", PAGE_PATHS[p]);
  };

  const renderPage = () => {
    switch(page) {
      case "breathing":  return <BreathingPage accent={accent} settings={settings}/>;
      case "affirmations": return <AffirmationsPage accent={accent}/>;
      case "library":    return <LibraryPage accent={accent} initialCat={libraryFilter}/>;
      case "journal":    return <JournalPage accent={accent} setPage={navigate}/>;
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
