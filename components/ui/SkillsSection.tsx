"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SkillPill from "@/components/ui/SkillPill";

// Icons
import { 
  SiReact, SiTailwindcss, SiFramer, SiHtml5, SiCss3,
  SiSpringboot, SiPostgresql, SiMysql, SiMongodb,
  SiDocker, SiGit, SiGithubactions, SiKubernetes,
  SiNodedotjs, SiPython, SiJavascript, SiC,
  SiPostman, SiIntellijidea, SiJunit5
} from "react-icons/si";
import { FaJava, FaNetworkWired } from "react-icons/fa";
import { TbApi, TbBrandVscode } from "react-icons/tb";

// Data Structure
const SKILLS = {
  Languages: [
    { label: "Java", icon: <FaJava className="text-orange-600" /> },
    { label: "Python", icon: <SiPython className="text-yellow-500" /> },
    { label: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { label: "C", icon: <SiC className="text-blue-500" /> },
    { label: "SQL", icon: <SiPostgresql className="text-indigo-400" /> }, // Using PG icon as generic SQL rep
  ],
  Frontend: [
    { label: "React", icon: <SiReact className="text-blue-500" /> },
    { label: "HTML5 & CSS3", icon: <SiHtml5 className="text-orange-600" /> },
    { label: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { label: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
  ],
  Backend: [
    { label: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
    { label: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
    { label: "REST APIs", icon: <TbApi className="text-gray-500 dark:text-gray-300" /> },
    { label: "Microservices", icon: <FaNetworkWired className="text-slate-500" /> },
  ],
  Databases: [
    { label: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { label: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    { label: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  ],
  DevOps: [
    { label: "Docker", icon: <SiDocker className="text-blue-500" /> },
    { label: "Kubernetes", icon: <SiKubernetes className="text-blue-600" /> },
    { label: "Git & GitHub", icon: <SiGit className="text-orange-500" /> },
    { label: "CI/CD", icon: <SiGithubactions className="text-blue-400" /> },
  ],
  "Tools & IDEs": [
    { label: "VS Code", icon: <TbBrandVscode className="text-blue-500" /> },
    { label: "IntelliJ IDEA", icon: <SiIntellijidea className="text-purple-500" /> },
    { label: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { label: "JUnit", icon: <SiJunit5 className="text-green-600" /> },
  ],
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      className="bg-white dark:bg-black transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-base-900 dark:text-white"
          >
            Skills & Tooling
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-base-700 dark:text-gray-400"
          >
            A comprehensive look at the languages, frameworks, and tools I use to build software.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-4"
            >
              {/* Category Title */}
              <h3 className="text-xl font-serif text-base-900 dark:text-white border-l-4 border-base-200 dark:border-base-800 pl-3">
                {category}
              </h3>

              {/* Pills Container */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillPill
                    key={skill.label}
                    label={skill.label}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}