"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl2 bg-white p-6 shadow-soft border border-base-100 hover:shadow-lg hover:border-accent-200 cursor-pointer min-h-[290px] lg:min-h-[240px]"
    >
      <h3 className="text-xl font-serif font-bold text-base-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-accent-50 text-accent-700 dark:bg-accent-700 dark:text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-accent-500 hover:text-accent-400 dark:hover:text-accent-700
          transition-all duration-300"
        >
          🔗 View Project
        </a>
      )}
    </motion.div>
  );
}
