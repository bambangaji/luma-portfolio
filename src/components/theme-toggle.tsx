import { motion } from 'framer-motion';

type Props = {
  isDark: boolean;
  toggle: () => void;
};

export const ThemeToggle = ({ isDark, toggle }: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="
        fixed top-6 right-6
        z-[999]

        p-3 rounded-full
        border shadow-lg backdrop-blur-md

        transition-all duration-300

        bg-white/80 border-gray-200
        hover:border-violet-400

        dark:bg-gray-800/80
        dark:border-gray-700
        dark:hover:border-cyan-400
      "
    >
      {isDark ? (
        <svg
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </motion.button>
  );
};