import { motion } from 'framer-motion';

import {
  Award,
  Calendar,
  GraduationCap
} from 'lucide-react';

import { SectionTitle } from './section-title';

import { LandingPageService } from '../../services/landing-page-service';

export const AboutSection = () => {
  const hero = LandingPageService.getHero();

  const personalInformation =
    LandingPageService.getPersonalInformation();

  const education = LandingPageService.getEducation()[0];
  const certifications =
    LandingPageService.getCertifications();
  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-white py-24
        transition-colors duration-300
        dark:bg-gray-950
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute left-1/2 top-0
          h-[500px] w-[500px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          title="About Me"
          subtitle={hero.headline}
        />

        <div
          className="
            grid items-center gap-16
            lg:grid-cols-2
          "
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Profile Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="
                relative overflow-hidden rounded-3xl

                border border-gray-200

                bg-gradient-to-br
                from-violet-50 via-white to-cyan-50

                p-4 shadow-2xl

                dark:border-gray-800
                dark:from-gray-900
                dark:via-gray-900
                dark:to-black
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute left-1/2 top-1/2
                  h-72 w-72
                  -translate-x-1/2 -translate-y-1/2
                  rounded-full
                  bg-violet-500/20 blur-3xl
                "
              />

              {/* Profile Image */}
              <div className="relative z-10 overflow-hidden rounded-3xl">
                <img
                  src={personalInformation.image}
                  alt={personalInformation.full_name}
                  className="
                  grayscale
                    h-[520px] w-full
                    object-cover
                  "
                />
              </div>

              {/* Floating Education Card */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                  absolute bottom-8 right-8
                  max-w-[280px]
                  z-[999]
                  rounded-2xl border
                  border-white/20

                  bg-white/80 p-5
                  shadow-2xl
                  backdrop-blur-xl

                  dark:bg-gray-900/80
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <GraduationCap
                    className="
                      h-5 w-5
                      text-violet-600 dark:text-cyan-400
                    "
                  />

                  <span
                    className="
                      text-sm font-medium
                      text-slate-500 dark:text-slate-400
                    "
                  >
                    Degree
                  </span>
                </div>

                <div
                  className="
                    text-lg font-semibold
                    text-slate-900 dark:text-white
                  "
                >
                  {education.degree}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Headline */}
            <div>
              <h3
                className="
                  mb-5 text-4xl font-bold leading-tight
                  text-slate-900 dark:text-white
                "
              >
                Profile
              </h3>

              <p
                className="
                  text-lg leading-relaxed
                  text-slate-600 dark:text-slate-400
                "
              >
                <span
                  className="
                    font-semibold
                    text-slate-900 dark:text-white
                  "
                >
                  {personalInformation.full_name}
                </span>{' '}
                — {hero.description}
              </p>
            </div>

            {/* Information Cards */}
            <div
              className="
                 gap-4
                sm:grid-cols-2
              "
            >
              {/* Education */}
              <div
                className="
                  rounded-2xl border
                  border-gray-200
                  bg-gray-50

                  p-5

                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="
                      rounded-xl p-2

                      bg-violet-100
                      dark:bg-violet-500/10
                    "
                  >
                    <GraduationCap
                      className="
                        h-5 w-5
                        text-violet-600 dark:text-cyan-400
                      "
                    />
                  </div>

                  <div
                    className="
                      text-sm font-medium
                      text-slate-500 dark:text-slate-400
                    "
                  >
                    Education
                  </div>
                </div>

                {/* Degree */}
                <div
                  className="
                    text-lg font-bold leading-snug
                    text-slate-900 dark:text-white
                  "
                >
                  {education.degree}
                </div>

                {/* Institution */}
                <div
                  className="
                    mt-1 text-sm
                    text-slate-600 dark:text-slate-400
                  "
                >
                  {education.institution}
                </div>

                {/* Date */}
                <div
                  className="
                    mt-4 flex items-center gap-2
                    text-xs
                  
                  "
                >
                  <Calendar className="h-3.5 w-3.5" />

                  <span className="text-slate-500 dark:text-slate-400">
                    {education.start_date} —{' '}
                    {education.end_date}
                  </span>
                </div>

                {/* GPA */}
                <div
                  className="
                    mt-3 inline-flex rounded-full

                    bg-violet-100
                    px-3 py-1

                    text-xs font-medium
                    text-violet-700

                    dark:bg-violet-500/10
                    dark:text-violet-300
                  "
                >
                  GPA {education.gpa}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div
                className="
                  mb-5 flex items-center gap-2
                "
              >
                <Award
                  className="
                    h-5 w-5
                    text-violet-600 dark:text-cyan-400
                  "
                />

                <h4
                  className="
                    text-lg font-semibold
                    text-slate-900 dark:text-white
                  "
                >
                  Certifications
                </h4>
              </div>

              <div className="space-y-4">
                {certifications.map(
                  certification => (
                    <motion.div
                      key={`${certification.name}-${certification.year}`}
                      whileHover={{
                        y: -2,
                      }}
                      className="
          rounded-2xl border

          border-gray-200
          bg-gray-50

          p-5

          transition-all duration-300

          hover:border-violet-300
          hover:shadow-lg

          dark:border-gray-800
          dark:bg-gray-900
          dark:hover:border-violet-500/30
        "
                    >
                      <div
                        className="
            mb-2 flex items-center justify-between
          "
                      >
                        <h5
                          className="
              font-semibold
              text-slate-900 dark:text-white
            "
                        >
                          {certification.name}
                        </h5>

                        {certification.year > 0 && (
                          <span
                            className="
                rounded-full

                bg-violet-100
                px-3 py-1

                text-xs font-medium
                text-violet-700

                dark:bg-violet-500/10
                dark:text-violet-300
              "
                          >
                            {certification.year}
                          </span>
                        )}
                      </div>

                      <p
                        className="
            text-sm font-medium
            text-slate-600 dark:text-slate-400
          "
                      >
                        {certification.issuer}
                      </p>

                      {certification.description && (
                        <p
                          className="
              mt-2 text-sm leading-relaxed
              text-slate-500 dark:text-slate-500
            "
                        >
                          {certification.description}
                        </p>
                      )}
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};