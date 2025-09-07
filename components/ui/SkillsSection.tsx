"use client";

import { FaReact, FaJava, FaGitAlt, FaDatabase, FaDocker } from "react-icons/fa";
import { SiSpringboot, SiTailwindcss, SiPostman, SiKubernetes, SiJavascript } from "react-icons/si";
import SkillBar from "@/components/ui/SkillBar";
import Section from "@/components/ui/Section";

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      className="bg-white dark:bg-[radial-gradient(_theme(colors.slate.900)_0%,_theme(colors.black)_50%)] z-[1000]"
    >
      <div className="wrap max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-base-900 dark:text-white">Skills</h2>
        <p className="mt-2 text-sm text-base-700 dark:text-base-300">
          My core technical stack and tools I use day-to-day.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold text-base-800 dark:text-base-200">Frontend</h3>
            <div className="mt-4 space-y-4">
              <SkillBar 
                name="React" 
                level={85} 
                icon={<FaReact className="text-sky-500" />} 
              />
              <SkillBar
                name="Javascript"
                level={90}
                icon={<SiJavascript className="text-yellow-500"/>}
              />
              <SkillBar
                name="Tailwind CSS"
                level={90}
                icon={<SiTailwindcss className="text-sky-400" />}
              />
              <SkillBar
                name="Framer Motion"
                level={65}
                icon={<FaReact className="text-pink-400" />}
              />
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className="text-xl font-semibold text-base-800 dark:text-base-200">Backend</h3>
            <div className="mt-4 space-y-4">
              <SkillBar name="Java" level={90} icon={<FaJava className="text-red-500" />} />
              <SkillBar
                name="Spring Boot"
                level={80}
                icon={<SiSpringboot className="text-green-600" />}
              />
              <SkillBar
                name="REST APIs"
                level={80}
                icon={<FaDatabase className="text-indigo-500" />}
              />
              <SkillBar name="DataBase" level={85} icon={<FaDatabase className="text-blue-600" />} />
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xl font-semibold text-base-800 dark:text-base-200">
              Tools & Platforms
            </h3>
            <div className="mt-4 space-y-4">
              <SkillBar name="Git" level={85} icon={<FaGitAlt className="text-orange-600" />} />
              <SkillBar
                name="GitHub"
                level={90}
                icon={<FaGitAlt className="text-black dark:text-white" />}
              />
              <SkillBar name="Postman" level={80} icon={<SiPostman className="text-orange-500" />} />
              <SkillBar
                name="Docker (Basic)"
                level={70}
                icon={<FaDocker className="text-gray-700 dark:text-gray-300" />}
              />
              <SkillBar
                name="Kubernetes (Basic)"
                level={70}
                icon={<SiKubernetes className="text-gray-700 dark:text-gray-300" />}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
