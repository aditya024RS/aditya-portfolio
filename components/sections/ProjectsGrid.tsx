"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import Modal from "../ui/Modal";

const projects = [
  {
    title: "Recyconnect",
    description: "A Sustainable waste management platform connecting recyclers with users.",
    details: "Engineered a full-stack, map-based web application to connect users with local recycling services, featuring an interactive map (Leaflet.js) and secure JWT and OAuth2 authentication, dynamic user/provider dashboards, real time map filtering, and data management with PostgreSQL.",
    tags: ["Full-Stack", "Web", "React", "Spring Boot", "PostgreSQL","TailwindCSS", "REST APIs", "Java"],
    link: "https://github.com/aditya024RS/Recyconnect",
    images: ["/projects/recyconnect-1.png", "/projects/recyconnect-2.png", "/projects/recyconnect-3.png", "/projects/recyconnect-4.png", "/projects/recyconnect-5.png"]
  },
  {
    title: "E-Commerce Platform",
    description: "An End-to-end shopping app with Product browsing, Cart funcationality, Orders and Tracking.",
    details: "A fully functional Amazon clone built with JavaScript, HTML, and CSS. This project replicates core e-commerce features like product browsing, search, shopping cart, checkout, orders and tracking. Designed to be responsive and user-friendly.",
    tags: ["Frontend", "Web", "JavaScript"],
    link: "https://github.com/aditya024RS/Amazon-Clone-JavaScript",
    images: ["/projects/ecommerce-1.png", "/projects/ecommerce-2.png", "/projects/ecommerce-3.png", "/projects/ecommerce-4.png"],
  },
  {
    title: "AdiBook",
    description: "A secure and modern PHP-based user login system with authentication and session management.",
    details: "Users Login System is a secure and responsive user authentication system built using PHP, MySQL, HTML/CSS. It allows users to register, log in, manage profiles, and recover passwords. The system uses hashed passwords, session-based authentication, and MySQL relational tables to ensure data integrity and security.",
    tags: ["Full-Stack", "Web", "PHP", "MySQL"],
    link: "https://github.com/aditya024RS/Users_Login_System_PHP",
    images: ["/projects/adibook-1.png", "/projects/adibook-2.png", "/projects/adibook-3.png"],
  },
  {
    title: "Movie Recommendation App",
    description: "A responsive movie search application built with React, utilizing the TMDB API.",
    details: "A dynamic React application built featuring real-time data fetching from a public API, reusable components, and responsive design.",  
    tags: ["Frontend", "Web", "React"],
    link: "https://github.com/aditya024RS/Movie-App-React",
    images: ["/projects/movie-reco-1.png", "/projects/movie-reco-2.png", "/projects/movie-reco-3.png", "/projects/movie-reco-4.png"],
  },
  {
    title: "BulkBuddy",
    description: "A full-stack web app that helps street vendors source raw materials at the best prices from nearby stores.  ~|Contributor|",
    details: "A streamlined bulk ordering platform built with React and Firebase for vendors. It features sellers to list their shops with items. And vendors, who can search for nearby stores and place a bulk-order for an item. It has dynamic role-based dashboards with modern UI/UX with accurate analysis of spends and income.",  
    tags: ["Frontend", "Web", "React"],
    link: "https://github.com/Akash-Adak/Vendor-Bulk-Order",
    images: ["/projects/bulkbuddy-1.png", "/projects/bulkbuddy-2.png", "/projects/bulkbuddy-3.png"],
  },
];

const allTags = ["All", "Full-Stack", "Web", "React", "Spring Boot", "Java", "PostgreSQL", "TailwindCSS", "REST APIs", "Frontend", "JavaScript",  "PHP", "MySQL"];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");


  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  const nextImage = () => {
    if (!selectedProject) return;
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <Section
      id="projects"
      className="bg-base-100 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors z-[1000]"
    >
      <h2 className="text-2xl md:text-4xl font-serif text-base-900 dark:text-white text-shadow-black">
        Projects
      </h2>
      <p className="mt-4 max-w-3xl text-base-700 dark:text-gray-500">
        A few selected works that blend functionality, creativity, and technical precision.
      </p>

      {/* 👉 Filter Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 text-sm rounded-md border hover:bg-accent-500 dark:text-gray-800 transition-all duration-300 ${
              filter === tag
                ? "bg-accent-500 text-white border-accent-500"
                : "bg-white dark:bg-base-800 border-base-200 dark:border-base-700 hover:bg-accent-50 dark:hover:bg-accent-700 dark:hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 👉 Projects Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 dark:text-gray-300">
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            onClick={() => {
              setSelectedProject(project);
              setCurrentIndex(0);
            }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* 👉 Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div>
            {/* Carousel */}
            <div className="relative mb-4 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (direction: "next" | "prev") => ({
                      x: direction === "next" ? 300 : -300,
                      opacity: 0,
                      scale: 0.95,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      zIndex: 1,
                    },
                    exit: (direction: "next" | "prev") => ({
                      x: direction === "next" ? -300 : 300,
                      opacity: 0,
                      scale: 0.95,
                      zIndex: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x * velocity.x;

                    if (swipe < -1000) {
                      setDirection("next");
                      setCurrentIndex((prev) => (prev + 1) % selectedProject.images.length);
                    } else if (swipe > 1000) {
                      setDirection("prev");
                      setCurrentIndex(
                        (prev) =>
                          (prev - 1 + selectedProject.images.length) %
                          selectedProject.images.length,
                      );
                    }
                  }}
                >
                  <Image
                    src={selectedProject.images[currentIndex]}
                    alt={`${selectedProject.title} screenshot ${currentIndex + 1}`}
                    width={800}
                    height={450}
                    className="rounded-xl2 shadow-soft object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev/Next Buttons */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ◀
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* Dot Indicators */}
            {selectedProject.images.length > 1 && (
              <div className="flex justify-center space-x-2 mb-4">
                {selectedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentIndex
                        ? "bg-accent-500"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-accent-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Project Info */}
            <h3 className="text-2xl font-serif text-base-900 dark:text-white">
              {selectedProject.title}
            </h3>
            <p className="mt-2 text-base text-base-700 dark:text-base-200">
              {selectedProject.details}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-md bg-accent-50 text-accent-700 dark:bg-accent-700 dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-accent-500 hover:text-accent-700 dark:hover:text-accent-200"
              >
                🔗 View on GitHub
              </a>
            )}
          </div>
        )}
      </Modal>
    </Section>
  );
}
