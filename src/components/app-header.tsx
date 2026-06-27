import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { LanguageToggle } from './language-toggle';

export const AppHeader = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 40));
  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); }, [isDark]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-xl dark:bg-gray-950/80' : 'bg-transparent'
      }`}
      initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/">
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-xl font-black tracking-tight text-transparent dark:text-transparent">
            LUMA PORTFOLIO
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button onClick={() => setIsDark(p => !p)}
            className="flex items-center justify-center rounded-xl border border-gray-300 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-indigo-500" />}
          </button>
          <Link to="/login">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
              Sign In
            </motion.span>
          </Link>
          <Link to="/register">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md">
              <Sparkles size={14} /> Register
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
