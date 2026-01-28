"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  featured = false,
  link,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative rounded-2xl border p-7 cursor-pointer bg-white dark:bg-base-900 transition-shadow min-h-[290px] lg:min-h-[240px]
        ${
          featured
            ? "border-accent-200 shadow-lg"
            : "border-base-100 shadow-soft hover:shadow-md"
        }`}
    >
      {featured && (
        <span className="absolute top-4 right-4 text-xs uppercase tracking-widest text-accent-600">
          Flagship
        </span>
      )}

      <h3 className="text-xl md:text-2xl font-serif font-semibold text-base-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm text-base-700 dark:text-gray-400">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
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
