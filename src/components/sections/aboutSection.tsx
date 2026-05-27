import { motion } from 'framer-motion';
import { SectionTitle } from './sectionTitle';
import { LandingPageService } from '../../services/landingPageService';

export const AboutSection = () => {
  const summary = LandingPageService.getAbout();

  return (
    <section
      id="about"
      className="
        bg-white py-24
        transition-colors duration-300
        dark:bg-gray-900
      "
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="About Me"
          subtitle={summary.tagline}
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="
                aspect-square overflow-hidden rounded-2xl
                bg-gradient-to-br
                from-violet-100 to-cyan-100
                dark:bg-gray-800
              "
            >
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  className="
                    h-64 w-64
                    text-violet-500 dark:text-violet-400
                  "
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <motion.circle
                    cx="100"
                    cy="100"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="currentColor"
                    opacity="0.3"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="8"
                    fill="currentColor"
                  />

                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={
                        100 +
                        80 *
                          Math.cos(
                            (i * Math.PI * 2) / 8
                          )
                      }
                      cy={
                        100 +
                        80 *
                          Math.sin(
                            (i * Math.PI * 2) / 8
                          )
                      }
                      r="4"
                      fill="currentColor"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              className="
                absolute -bottom-4 -right-4
                rounded-xl border p-6 shadow-xl

                border-gray-100 bg-white
                dark:border-gray-700 dark:bg-gray-800
              "
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <div
                className="
                  bg-gradient-to-r
                  from-violet-500 to-cyan-400
                  bg-clip-text text-2xl font-bold text-transparent
                "
              >
                {summary.education.degree}
              </div>

              <div
                className="
                  text-sm
                  text-gray-500 dark:text-gray-400
                "
              >
                {summary.education.field}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3
              className="
                text-2xl font-bold
                text-slate-900 dark:text-white
              "
            >
              {summary.headline}
            </h3>

            <p
              className="
                text-lg leading-relaxed
                text-slate-600 dark:text-slate-400
              "
            >
              {summary.description}
            </p>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {summary.expertise.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2"
                >
                  <div
                    className="
                      h-2 w-2 rounded-full
                      bg-gradient-to-r
                      from-violet-500 to-cyan-400
                    "
                  />

                  <span
                    className="
                      text-slate-700 dark:text-slate-300
                    "
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};