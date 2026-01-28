"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SkillPillProps {
  label: string;
  icon?: ReactNode;
}

const pillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
};

export default function SkillPill({ label, icon }: SkillPillProps) {
  return (
    <motion.div
      variants={pillVariants}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl
        bg-white dark:bg-base-900
        border border-base-100 dark:border-base-800
        shadow-soft cursor-default
        text-sm font-medium
        text-base-900 dark:text-white
        transition-colors"
    >
      {icon && <span className="text-lg opacity-80">{icon}</span>}
      <span>{label}</span>
    </motion.div>
  );
}