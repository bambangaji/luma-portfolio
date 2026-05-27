import { useState } from "react";
import { LandingPageService } from "../../services/landingPageService";

export const ExperienceSectionTwo = () => {
  const experiences = LandingPageService.getExperiences();
  const [showAll, setShowAll] = useState(false);

  const displayedExperiences = showAll
    ? experiences
    : experiences.slice(0, 3);

  return (
    <section
      id="experience"
      className="
        py-24 px-6
        bg-gray-50 dark:bg-gray-950
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="
              text-3xl md:text-4xl font-bold mb-4
              text-slate-900 dark:text-white
            "
          >
            Experience
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            My professional journey in software engineering and AI.
          </p>
        </div>

        {/* Timeline */}
        <div
          className="
            relative ml-3 md:ml-6 space-y-12
            border-l border-slate-200 dark:border-gray-800
          "
        >
          {displayedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot */}
              <div
                className="
                  absolute -left-[6px] top-2
                  w-3 h-3 rounded-full
                  bg-blue-500
                  ring-4 ring-gray-50 dark:ring-gray-950
                  transition-transform duration-300
                  group-hover:scale-125
                "
              />

              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>

                <span
                  className="
                    text-sm font-medium whitespace-nowrap
                    px-3 py-1 rounded-full
                    bg-slate-100 text-slate-600
                    dark:bg-gray-800 dark:text-slate-400
                  "
                >
                  {exp.period}
                </span>
              </div>

              {/* Company */}
              <p className="mb-4 font-medium text-blue-600 dark:text-blue-400">
                {exp.company}
              </p>

              {/* Description */}
              <ul className="space-y-3">
                {exp.description.map((desc, i) => (
                  <li
                    key={i}
                    className="
                      flex items-start gap-3
                      text-sm leading-relaxed
                    "
                  >
                    <span
                      className="
                        mt-2 w-1.5 h-1.5 rounded-full shrink-0
                        bg-slate-400 dark:bg-slate-500
                      "
                    />

                    <span className="text-slate-700 dark:text-slate-300">
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {experiences.length > 3 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="
        rounded-xl
        border border-violet-500/20
        bg-violet-500/10
        px-6 py-3
        font-medium
        text-violet-600
        transition-all duration-300
        hover:bg-violet-500/20

        dark:text-cyan-400
      "
              >
                {showAll
                  ? 'Show Less'
                  : 'View All Experiences'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};