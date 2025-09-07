"use client";

import { MotionA } from "@/components/ui/motion";

export default function Button({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <MotionA
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className="inline-block rounded-xl2 bg-accent-500 px-6 py-3 font-medium text-white shadow-soft transition-all duration-300 hover:bg-accent-700 hover:text-white dark:hover:bg-accent-400 dark:hover:text-base-900"
    >
      {children}
    </MotionA>
  );
}
