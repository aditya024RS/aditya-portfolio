"use client";

import { motion } from "framer-motion";
import Section from "./Section";

const testimonials = [
  {
    quote:
      "Aditya is an excellent developer with strong problem-solving skills. His ability to adapt and deliver clean solutions is impressive.",
    name: "Dr. S. Banerjee",
    role: "Professor, Haldia Institute of Technology",
  },
  {
    quote:
      "Working with Aditya on our group project was a pleasure. He’s a great teammate and always keeps the team motivated.",
    name: "Rohit Sharma",
    role: "Peer & Project Collaborator",
  },
  {
    quote:
      "Aditya brings creativity and technical depth together. His portfolio projects are polished and impactful.",
    name: "Priya Mehta",
    role: "Student, Computer Society of India",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials" className="py-16 md:py-24 bg-base-50 dark:bg-[radial-gradient(_theme(colors.slate.900)_0%,_theme(colors.black)_25%)] z-[1000]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
          Testimonials
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl2 bg-white dark:bg-base-800 shadow-soft p-6 flex flex-col"
              >
                <p className="text-base italic leading-relaxed text-base-700 dark:text-black">
                  “{t.quote}”
                </p>
                <div className="mt-4 font-medium text-base-900 dark:text-base-300">
                  {t.name}
                </div>
                <div className="text-sm text-accent-500 dark:text-blue-900">
                  {t.role}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
