import { motion } from 'framer-motion';

type Props = {
  title: string;
  subtitle: string;
};

export const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16 text-center"
    >
      <h2
        className="
          mb-4 text-4xl font-bold
          text-slate-900 dark:text-white
          md:text-5xl
        "
      >
        {title}
      </h2>

      <div
        className="
          mx-auto mb-4 h-1 w-20 rounded-full
          bg-gradient-to-r
          from-violet-500 to-cyan-400
        "
      />

      <p
        className="
          mx-auto max-w-2xl text-lg
          text-slate-600 dark:text-slate-400
        "
      >
        {subtitle}
      </p>
    </motion.div>
  );
};