"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Timeline from "@/components/ui/Timeline";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ContactForm from "@/components/ui/ContactForm";
import GitHubActivity from "@/components/ui/GitHubActivity";
import SkillsSection from "@/components/ui/SkillsSection";
import Testimonials from "@/components/ui/Testimonials";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <Section className="bg-accent-50 text-center dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 transition-colors z-[1000]">
        <motion.p
          className="text-sm uppercase tracking-widest opacity-70 dark:opacity-80 dark:text-accent-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hello, I’m
        </motion.p>

        <motion.h1
          className="mt-2 text-3xl sm:text-4xl md:text-6xl font-serif text-balance text-base-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Aditya Raj Singh
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-base-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Minimal code, maximal impact.
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          aria-label="Primary call to action"
        >
          <Button href="#projects">View My Work</Button>
        </motion.div>
      </Section>

      {/* About */}
      <Section id="about" className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 dark:border-t dark:border-blue-100 transition-colors z-[1000]">
        <h2 className="text-2xl md:text-3xl font-serif text-base-900 dark:text-white">About</h2>
        <p className="mt-4 max-w-5xl text-base-700 dark:text-gray-300">
          I’m Aditya Raj Singh, a Full-Stack Java Developer passionate about building scalable and
          creative applications with <strong>Spring Boot, React, and REST APIs</strong>. Based in
          Howrah, West Bengal — blending problem-solving with elegant design.
        </p>

        {/* 👉 Timeline */}
        <div className="mt-8 space-y-2 text-sm md:text-base text-base-700 dark:text-gray-300 z-[1000]">
          <Timeline
            items={[
              {
                year: "2023–2027",
                title: "B.Tech CSE, Haldia Institute of Technology",
              },
              {
                year: "2024",
                title: "Member, Computer Society of India",
              },
              {
                year: "2021–2023",
                title: "Higher Secondary, St. Thomas Church School",
                description: "87.25%",
              },
              {
                year: "2020–2021",
                title: "Secondary, Vikramshila Academy",
                description: "76.20%",
              },
            ]}
          />
        </div>

        {/* 👉 Resume Download Button */}
        <div className="mt-6">
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            aria-label="Download resume"
          >
            <a
              href="/resume.pdf"
              download
              className="inline-block rounded-xl2 bg-accent-500 px-6 py-3 font-medium text-white shadow-soft hover:scale-105 hover:bg-accent-700 transition-all duration-300 
            hover:text-white dark:hover:bg-accent-400 dark:hover:text-base-900"
            >
              📄 Download Resume
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Projects */}
      <ProjectsGrid />

      {/* 👉 GitHub Activity */}
      <Section id="activity" className="bg-base-50 dark:bg-gradient-to-b dark:from-slate-950 dark:to-black transition-colors z-[1000]">
        <h2 className="text-2xl md:text-3xl font-serif base-900 dark:text-white">GitHub Activity</h2>
        <p className="mt-2 max-w-3xl text-base-700 dark:text-gray-300">
          [ Recent pushes, PRs, issues & more — auto-fetched from my public events. ]
        </p>
        <GitHubActivity />
      </Section>

      {/* Skills */}
      <SkillsSection />

      <Testimonials />

      {/* Contact */}
      <Section id="contact" className="dark:bg-black transition-colors z-[1000]">
        <h2 className="text-2xl md:text-3xl font-serif base-900 dark:text-white">Contact</h2>
        <p className="mt-4 max-w-3xl text-base-700 dark:text-gray-300">
          Let’s build something impactful together. Feel free to reach out.
        </p>
        <ContactForm />
      </Section>

      {/* Footer */}
      <footer className="py-8 text-sm text-center border-t border-base-100 dark:border-base-800 bg-white dark:bg-black transition-colors z-[1000]">
        <div className="text-base-700 dark:text-gray-400">
          © {new Date().getFullYear()} Aditya Raj Singh. All Rights Reserved.
        </div>
        <div className="mt-1 text-accent-500 dark:text-accent-400">
          Pushing boundaries, one project at a time.
        </div>
      </footer>
    </main>
  );
}
