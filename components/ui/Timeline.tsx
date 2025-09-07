"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  description?: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-base-100 ml-4 z-[1000]">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.25 }}
          className="mb-8 ml-4"
        >
          <div className="absolute -left-2.5 top-1.5 h-3 w-3 rounded-full bg-accent-500 shadow-soft" />
          <h3 className="text-lg font-semibold">{item.year} — {item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
