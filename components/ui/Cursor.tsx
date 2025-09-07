"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-multiply dark:mix-blend-normal"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: hovering ? 1.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        width: 24,
        height: 24,
        // Use CSS variables for the colors
        backgroundColor:  "var(--cursor-bg)",
        boxShadow: "var(--cursor-shadow)",
      }}
    />
  );
}
