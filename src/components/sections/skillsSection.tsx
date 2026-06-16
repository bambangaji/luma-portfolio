import { motion } from "framer-motion";
import { SectionTitle } from "./sectionTitle";
import { LandingPageService } from "../../services/landingPageService";

export const SkillsSection = () => {
  const skillSection = LandingPageService.getSkills();

  return (
    <section
      id="skills"
      className="
        py-24
        bg-gray-50 dark:bg-gray-950
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title={skillSection.title}
          subtitle={skillSection.subtitle}
        />

        <div
          className="
    grid gap-6
    md:grid-cols-2
    lg:grid-cols-3
  "
        >
          {skillSection.categories.map(
            (skill, index) => (
              <motion.div
                key={skill.category}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}
                className="
          rounded-2xl
          border
          p-6

          bg-white
          border-gray-200

          hover:border-violet-300
          hover:shadow-xl

          dark:bg-gray-900
          dark:border-gray-800
          dark:hover:border-violet-500/50
        "
              >
                {/* Header */}
                <div
                  className="
            mb-4
            flex
            items-center
            justify-between
          "
                >
                  <h3
                    className="
              font-semibold
              text-slate-900
              dark:text-white
            "
                  >
                    {skill.category}
                  </h3>

                  <span
                    className="
              text-sm
              font-medium

              text-violet-600
              dark:text-cyan-400
            "
                  >
                    {skill.score}%
                  </span>
                </div>

                {/* Progress */}
                <div
                  className="
            mb-5
            h-2
            w-full
            overflow-hidden
            rounded-full

            bg-gray-100
            dark:bg-gray-800
          "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${skill.score}%`,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1,
                      delay:
                        index * 0.2,
                    }}
                    className="
              h-full
              rounded-full

              bg-gradient-to-r
              from-violet-500
              to-cyan-400
            "
                  />
                </div>

                {/* Skills */}
                <div
                  className="
            flex
            flex-wrap
            gap-2
          "
                >
                  {skill.items.map(
                    (
                      item: string
                    ) => (
                      <span
                        key={item}
                        className="
                  rounded-full
                  px-3 py-1

                  text-xs
                  font-medium

                  bg-gray-100
                  text-slate-700

                  hover:bg-gray-200

                  dark:bg-gray-800
                  dark:text-gray-300
                  dark:hover:bg-gray-700
                "
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};