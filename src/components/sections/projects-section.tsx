import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  BrainCircuit,
  CloudCog,
  Globe,
  Smartphone,
  Workflow,
} from 'lucide-react';

import { SectionTitle } from './section-title';
import { LandingPageService } from '../../services/landing-page-service';

const categoryIcons = {
  Angular: Globe,
  React: Globe,
  Vue: Globe,

  SpringBoot: Workflow,
  NodeJS: Workflow,
  '.NET': Workflow,

  Flutter: Smartphone,
  Ionic: Smartphone,

  AWS: CloudCog,
  Docker: CloudCog,
  Kubernetes: CloudCog,

  n8n: BrainCircuit,
  LLaMA: BrainCircuit,
};

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] =
    useState('All');

  const projectSection =
    LandingPageService.getProjectSection();
  console.log('Project Section:', projectSection);
  const projects =
    projectSection.items;

  const filters = useMemo(
    () => [
      'All',
      ...projectSection.categories,
    ],
    [projectSection]
  );

  const filteredProjects =
    useMemo(() => {
      if (
        activeFilter ===
        'All'
      ) {
        return projects;
      }

      return projects.filter(
        project =>
          project.technologies.includes(
            activeFilter
          )
      );
    }, [
      activeFilter,
      projects,
    ]);

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
          title={
            projectSection.title
          }
          subtitle="
            Showcasing projects,
            experiences, and
            solutions built
            through real-world
            collaboration.
          "
        />

        {/* Filters */}
        <div
          className="
            mb-12 flex flex-wrap
            justify-center gap-3
          "
        >
          {filters.map(
            filter => {
              const isActive =
                activeFilter ===
                filter;

              return (
                <motion.button
                  key={filter}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setActiveFilter(
                      filter
                    )
                  }
                  className={`
                    rounded-full
                    px-5 py-2
                    font-medium
                    transition-all
                    duration-300

                    ${isActive
                      ? `
                          bg-gradient-to-r
                          from-violet-600
                          to-cyan-500
                          text-white
                          shadow-lg
                        `
                      : `
                          bg-gray-100
                          text-slate-700

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
            }
          )}
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
          <AnimatePresence
            mode="popLayout"
          >
            {filteredProjects.map(
              (
                project,
                index
              ) => {
                const primaryTech =
                  project
                    .technologies?.[0] ??
                  '';

                const Icon =
                  categoryIcons[
                  primaryTech as keyof typeof categoryIcons
                  ] ?? Globe;

                return (
                  <motion.a
                    key={
                      project.title
                    }
                    layout
                    href={
                      project.url ||
                      '#'
                    }
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
                      delay:
                        index *
                        0.05,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl

                      border
                      border-gray-200

                      transition-all
                      duration-300

                      hover:border-violet-300
                      hover:shadow-2xl

                      dark:border-gray-700
                      dark:bg-gray-800/50
                      dark:hover:border-violet-500/50
                    "
                  >
                    {/* Thumbnail */}
                    <div
                      className="
                        relative
                        h-52
                        overflow-hidden
                      "
                    >
                      {project.thumbnail ? (
                        <img
                          src={
                            project.thumbnail
                          }
                          alt={
                            project.title
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            items-center
                            justify-center

                            bg-gradient-to-br
                            from-violet-500/10
                            via-cyan-500/10
                            to-fuchsia-500/10
                          "
                        >
                          <Icon
                            className="
                              h-16 w-16

                              text-violet-600
                              dark:text-cyan-400
                            "
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="
                          mb-2
                          text-xl
                          font-bold

                          text-slate-900
                          dark:text-white
                        "
                      >
                        {project.title}
                      </h3>

                      <p
                        className="
                          mb-5
                          text-sm
                          leading-relaxed

                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        {project.description}
                      </p>

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {project.technologies.map(
                          (tech: string) => (
                            <span
                              key={tech}
                              className="
                                rounded-md
                                px-2.5 py-1

                                text-xs
                                font-medium

                                bg-violet-50
                                text-violet-600

                                dark:bg-violet-500/10
                                dark:text-violet-400
                              "
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </motion.a>
                );
              }
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
