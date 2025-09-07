"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const links = pathname.startsWith("/blog")
    ? [{ href: "/", label: "Home" }] // only Home when inside blog
    : [
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" },
        { href: "/blog", label: "Blog" },
      ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* 👉 Logo / Photo Slot */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Go to homepage">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full overflow-hidden"
            style={{ display: "inline-block" }}
          >
            <Image
              src="/profile.jpg"
              alt="Portrait of Aditya Raj Singh"
              width={40}
              height={40}
              sizes="(max-width: 768px) 40px, 40px"
              className="h-10 w-10 object-cover object-center border-5 border-black shadow-soft"
              priority
            />
          </motion.div>
          <span className="font-serif text-lg font-bold">Aditya Raj Singh</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-accent-400 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-base-100 text-base-900 hover:bg-accent-500 
             dark:bg-base-800 dark:text-white dark:hover:bg-accent-500 dark:hover:text-white 
             transition-colors shadow-soft"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} className="text-black hover:text-white transition-colors durstion-500"/> : <Sun size={18} className="text-black hover:text-white transition-colors durstion-500"/>}
          </button>
        </nav>

        {/* 👉 FIX: Add theme toggle button for mobile view outside of navigation */}
        <div className="md:hidden flex items-center">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 mr-4 rounded-full bg-base-100 text-base-900 hover:bg-accent-500 
             dark:bg-base-800 dark:text-white dark:hover:bg-accent-500 dark:hover:text-white 
             transition-colors shadow-soft"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} className="text-black hover:text-white transition-colors durstion-500"/> : <Sun size={18} className="text-black hover:text-white transition-colors durstion-500"/>}
          </button>
          
          {/* Mobile Nav Toggle */}
          <button
            className="flex flex-col space-y-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span className="h-0.5 w-6 bg-base-900"></span>
            <span className="h-0.5 w-6 bg-base-900"></span>
            <span className="h-0.5 w-6 bg-base-900"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-base-100" aria-label="Mobile"
        >
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block hover:text-accent-400 transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
          </div>
        </motion.nav>
      )}
    </header>
  );
}
