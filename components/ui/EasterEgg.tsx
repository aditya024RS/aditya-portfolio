"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pastelColors = [
  "#FFB6B9", // pink
  "#FFDAC1", // peach
  "#E2F0CB", // green
  "#B5EAD7", // teal
  "#C7CEEA", // lavender
];

export default function EasterEgg() {
  const [glitch, setGlitch] = useState(false);
  const [accent, setAccent] = useState<string | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const sequence = [
      "a", "d", "i", "t", "y", "a",
      "r", "a", "j",
      "s", "i", "n", "g", "h",
      "Enter",
    ];
    let current = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === sequence[current]) {
        current++;
        if (current === sequence.length) {
          triggerEasterEgg();
          current = 0;
        }
      } else {
        current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    setAccent(randomColor);
    setGlitch(true);
    setToast(true);

    // 🔊 Play sound
    const audio = new Audio("/sounds/easter-egg.mp3");
    audio.volume = 0.1; // subtle
    audio.play();

    // Stop glitch after 3s
    setTimeout(() => {
      setGlitch(false);
    }, 3000);

    // Hide toast + reset accent after 5s
    setTimeout(() => {
      setToast(false);
      setAccent(null);
    }, 5000);
  };

  if (!accent) return null;

  return (
    <>
      {/* Glitch effect */}
      {glitch && (
        <style jsx global>{`
          body * {
            animation: glitch 150ms infinite;
          }
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            100% { transform: translate(0); }
          }
        `}</style>
      )}

      {/* Accent color override */}
      {accent && (
        <style jsx global>{`
          :root {
            --tw-prose-links: ${accent};
          }
          .bg-accent-500 { background-color: ${accent} !important; }
          .text-accent-500 { color: ${accent} !important; }
          .border-accent-500 { border-color: ${accent} !important; }
        `}</style>
      )}

      {/* Toast message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-accent-500 px-6 py-3 rounded-xl2 shadow-lg z-[9999] mx-2"
          >
            ✨ You found the hidden egg! Keep pushing boundaries
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
