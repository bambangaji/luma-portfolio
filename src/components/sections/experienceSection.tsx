import { SectionTitle } from "./sectionTitle";
import { motion } from "framer-motion";

export const ExperienceSection = () => {
  const experiences = [
    {
      role: "Senior AI Engineer",
      company: "TechCorp AI",
      period: "2023 - Present",
      description:
        "Leading AI research and development team, building large-scale language models and deploying them to production serving millions of users.",
      tech: ["LLMs", "PyTorch", "Kubernetes", "AWS"],
    },
    {
      role: "Machine Learning Engineer",
      company: "DataDriven Inc.",
      period: "2021 - 2023",
      description:
        "Developed and deployed computer vision models for quality inspection systems, reducing defect rates by 40%.",
      tech: ["Computer Vision", "TensorFlow", "Docker", "GCP"],
    },
    {
      role: "AI Research Scientist",
      company: "University Research Lab",
      period: "2019 - 2021",
      description:
        "Published 8 papers in top conferences (NeurIPS, ICML). Research focused on efficient transformer architectures and few-shot learning.",
      tech: ["Research", "Transformers", "PyTorch", "CUDA"],
    },
  ];

  return (
    <section
      id="experience"
      className="
        py-24
        bg-gray-50 dark:bg-gray-950
        transition-colors duration-300
      "
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle
          title="Professional Journey"
          subtitle="My career progression in AI & Machine Learning"
        />

        <div className="relative">
          {/* Timeline Line */}
          <div
            className="
              absolute left-8 top-0 bottom-0 w-[2px]
              md:left-1/2
              bg-gray-200 dark:bg-gray-800
            "
          >
            <div
              className="
                absolute inset-0 opacity-40
                bg-gradient-to-b
                from-cyan-500 via-violet-500 to-cyan-500
              "
            />
          </div>

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.role}
                initial={{
                  opacity: 0,
                  x: isEven ? -40 : 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className={`
                  relative mb-16 flex items-start last:mb-0
                  ${isEven ? "md:flex-row-reverse" : ""}
                `}
              >
                {/* Dot */}
                <div
                  className="
                    absolute left-8 z-10
                    h-4 w-4 -translate-x-1/2 rounded-full border-4
                    shadow-lg transition-colors duration-300
                    md:left-1/2

                    bg-white dark:bg-gray-950
                  "
                  style={{
                    borderColor:
                      index === 0 ? "#06b6d4" : "#8b5cf6",
                  }}
                />

                {/* Glow */}
                <motion.div
                  className="
                    absolute left-8 z-10
                    h-4 w-4 -translate-x-1/2 rounded-full
                    pointer-events-none
                    md:left-1/2
                  "
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                  style={{
                    backgroundColor:
                      index === 0 ? "#06b6d4" : "#8b5cf6",
                  }}
                />

                {/* Card Wrapper */}
                <div
                  className={`
                    w-full pl-20 md:w-1/2
                    ${
                      isEven
                        ? "md:pr-12 md:pl-0"
                        : "md:pl-12"
                    }
                  `}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    className="
                      group relative rounded-2xl border p-6
                      transition-all duration-300

                      bg-white border-gray-200
                      hover:border-violet-300 hover:shadow-xl

                      dark:bg-gray-900
                      dark:border-gray-800
                      dark:hover:border-cyan-500/50
                    "
                  >
                    {/* Hover Border */}
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        rounded-2xl p-[1px]
                        opacity-0 transition-opacity duration-300
                        group-hover:opacity-100
                      "
                    >
                      <div
                        className="
                          h-full w-full rounded-2xl
                          bg-gradient-to-r
                          from-violet-500/50
                          via-cyan-500/50
                          to-violet-500/50
                        "
                        style={{
                          WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                    </div>

                    {/* Meta */}
                    <div className="relative z-10 mb-3 flex flex-wrap items-center gap-3">
                      <span
                        className="
                          rounded-full border px-3 py-1
                          text-xs font-semibold

                          bg-violet-100 text-violet-600 border-violet-200

                          dark:bg-cyan-500/10
                          dark:text-cyan-400
                          dark:border-cyan-500/30
                        "
                      >
                        {exp.period}
                      </span>

                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        •
                      </span>

                      <span
                        className="
                          text-sm font-medium
                          text-gray-500 dark:text-gray-400
                        "
                      >
                        {exp.company}
                      </span>
                    </div>

                    {/* Role */}
                    <h3
                      className="
                        relative z-10 mb-2
                        text-xl font-bold
                        text-slate-900 dark:text-white
                      "
                    >
                      {exp.role}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        relative z-10 mb-4
                        text-sm leading-relaxed
                        text-slate-600 dark:text-slate-400
                      "
                    >
                      {exp.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                      className="
                        relative z-10 flex flex-wrap gap-2
                        border-t border-dashed pt-4

                        border-gray-200 dark:border-gray-800
                      "
                    >
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-md px-2 py-1
                            text-xs font-medium
                            transition-colors

                            bg-gray-100 text-gray-600
                            hover:bg-gray-200

                            dark:bg-gray-800
                            dark:text-gray-300
                            dark:hover:bg-gray-700
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};