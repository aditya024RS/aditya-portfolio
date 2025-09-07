"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number; // percentage 0–100
  icon?: React.ReactNode;
}

export default function SkillBar({ name, level, icon }: SkillBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-base-900 dark:text-white">
            {name}
          </span>
        </div>
        <span className="text-xs text-base-500 dark:text-base-400">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-base-200 dark:bg-base-800 overflow-hidden border">
        <motion.div
          className="h-full rounded-full bg-accent-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}
