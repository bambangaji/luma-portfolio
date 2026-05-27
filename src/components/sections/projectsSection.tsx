import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  BrainCircuit,
  CloudCog,
  Globe,
  Smartphone,
  Workflow,
} from 'lucide-react';

import { SectionTitle } from './sectionTitle';
import { LandingPageService } from '../../services/landingPageService';

const categoryIcons = {
  'Web Application': Globe,
  'Service & API': Workflow,
  'AI Workflow Automation': BrainCircuit,
  'Cloud & DevOps': CloudCog,
  'Mobile Application': Smartphone,
};

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] =
    useState('All');

  const projects = LandingPageService.getProjects();

  const filters = useMemo(() => {
    const categories = new Set(
      projects.map((project) => project.category)
    );

    return ['All', ...categories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === activeFilter ||
        project.tags.includes(activeFilter)
    );
  }, [activeFilter, projects]);

  return (
    <section
      id="projects"
      className="
        bg-white py-24
        transition-colors duration-300
        dark:bg-gray-900
      "
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Featured Projects"
          subtitle="Showcasing innovative digital solutions from concept to production"
        />

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`
                  rounded-full px-5 py-2
                  font-medium
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-violet-600 to-cyan-500
                        text-white shadow-lg
                      `
                      : `
                        bg-gray-100 text-slate-700
                        hover:bg-gray-200

                        dark:bg-gray-800
                        dark:text-gray-300
                        dark:hover:bg-gray-700
                      `
                  }
                `}
              >
                {filter}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="
            grid gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon =
                categoryIcons[
                  project.category as keyof typeof categoryIcons
                ] ?? Globe;

              return (
                <motion.a
                  key={project.id}
                  layout
                  href={project.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group overflow-hidden rounded-2xl
                    transition-all duration-300

                    border-gray-200
                    hover:border-violet-300
                    hover:shadow-2xl

                    dark:border-gray-700
                    dark:bg-gray-800/50
                    dark:hover:border-violet-500/50
                  "
                >
                  {/* Thumbnail / Icon */}
                  <div
                    className="
                      relative flex h-52 items-center justify-center
                      overflow-hidden

                      bg-gradient-to-br
                      from-violet-500/10
                      via-cyan-500/10
                      to-fuchsia-500/10
                    "
                  >
                    {/* Background Glow */}
                    <div
                      className="
                        absolute h-40 w-40 rounded-full
                        bg-violet-500/20 blur-3xl
                      "
                    />

                    {/* Animated Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                      className="
                        relative z-10 rounded-3xl
                      
                        backdrop-blur-xl
                      "
                    >
                      <Icon
                        className="
                          h-16 w-16
                          text-violet-600
                          dark:text-cyan-400
                        "
                      />
                    </motion.div>

                    {/* Overlay */}
                    <div
                      className="
                        absolute inset-0
                        flex flex-col justify-end
                        bg-gradient-to-t
                        from-black/70 via-black/10 to-transparent
                        p-5
                      "
                    >
                      <div className="text-lg font-bold text-white">
                        {project.metrics}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="
                        mb-2 text-xl font-bold
                        text-slate-900 dark:text-white
                      "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                        mb-5 text-sm leading-relaxed
                        text-slate-600 dark:text-slate-400
                      "
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-md px-2.5 py-1
                            text-xs font-medium

                            bg-violet-50 text-violet-600
                            dark:bg-violet-500/10
                            dark:text-violet-400
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};