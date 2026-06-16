import { motion, useScroll, useTransform } from 'framer-motion';
import { LandingPageService } from '../../services/landingPageService';

export const HeroSection = () => {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const hero = LandingPageService.getHero();
  const stats = LandingPageService.getStats();
  return (
    <section
      id="hero"
      className="
        relative flex min-h-screen items-center justify-center overflow-hidden
        bg-white dark:bg-gray-950
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-violet-50 to-cyan-50
            dark:from-gray-950 dark:to-black
          "
        />

        <motion.div
          className="
            absolute left-1/4 top-1/4
            h-96 w-96 rounded-full
            bg-violet-500/20 blur-3xl
          "
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="
            absolute bottom-1/4 right-1/4
            h-80 w-80 rounded-full
            bg-cyan-500/20 blur-3xl
          "
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="
    relative z-10 mx-auto max-w-4xl
    px-6 text-center

    pt-28 pb-16

    sm:pt-32
    md:pt-20 md:pb-0
  "
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="  mb-5 inline-block rounded-full border  border-violet-100 bg-violet-50  px-3 py-1.5
  text-xs font-medium
  text-violet-600
  dark:border-white/10
  dark:bg-white/5
  dark:text-cyan-400
  sm:px-4 sm:py-2
  sm:text-sm
"
        >
          {hero.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
  mb-5

  text-4xl font-bold leading-tight
  tracking-tight

  text-slate-900
  dark:text-white

  sm:text-5xl
  md:text-6xl
  lg:text-7xl
"
        >
          {hero.title.prefix}
          <br />

          <span
            className="
              bg-gradient-to-r
              from-violet-500 via-purple-500 to-cyan-400
              bg-clip-text text-transparent dark:text-transparent
            "
          >
            {hero.title.highlight}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="
  mx-auto mb-8
  max-w-2xl

  text-base leading-relaxed
  text-slate-600

  dark:text-slate-400

  sm:text-lg
  md:text-xl
"
        >
          {hero.short_description || hero.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              rounded-xl bg-gradient-to-r
              from-violet-600 to-cyan-500
              px-8 py-4
              font-semibold text-white
              shadow-lg shadow-violet-500/25
              transition-shadow
              hover:shadow-xl hover:shadow-violet-500/30
            "
          >
            View Projects
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              rounded-xl border border-gray-300
              px-8 py-4
              font-semibold
              text-slate-900
              transition-colors
              hover:bg-gray-50

              dark:border-white/20
              dark:text-white
              dark:hover:bg-white/10
            "
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
    mt-16 flex justify-center gap-12
  "
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div
                className="
          text-3xl font-bold
          text-slate-900 dark:text-white
        "
              >
                {stat.value}
              </div>

              <div
                className="
          text-sm
          text-slate-500 dark:text-slate-400
        "
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};