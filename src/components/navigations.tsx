import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageToggle } from './language-toggle';

const navLinks = [
  { label: 'About',      href: '#about',      isRoute: false },
  { label: 'Skills',     href: '#skills',     isRoute: false },
  { label: 'Projects',   href: '#projects',   isRoute: false },
  { label: 'Experience', href: '#experience', isRoute: false },
  { label: 'Contact',    href: '#contact',    isRoute: false },
];

type Props = { isDark: boolean; toggle: () => void };

export const Navigation = ({ isDark, toggle }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-white/10 shadow-2xl backdrop-blur-2xl bg-white/80 dark:bg-gray-950/80' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent dark:text-transparent">
            LUMA PORTFOLIO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const cls = "group relative overflow-hidden rounded-2xl px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-white hover:bg-white/10 transition-colors";
            return link.isRoute
              ? <Link key={link.label} to={link.href} className={cls}>{link.label}</Link>
              : <a key={link.label} href={link.href} className={cls}>{link.label}</a>;
          })}

          {/* controls */}
          <div className="ml-3 flex items-center gap-2 border-l border-white/10 pl-3">
            <LanguageToggle />
            <button onClick={toggle}
              className="flex items-center justify-center rounded-xl border border-gray-300 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
              {isDark
                ? <Sun size={16} className="text-yellow-400" />
                : <Moon size={16} className="text-indigo-500" />}
            </button>
          </div>
        </nav>

        {/* Mobile burger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button onClick={toggle}
            className="flex items-center justify-center rounded-xl border border-gray-300 p-2 dark:border-gray-700">
            {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-indigo-500" />}
          </button>
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setMobileOpen(p => !p)}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-900 dark:text-white">
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-white/95 backdrop-blur-2xl dark:bg-gray-950/95 md:hidden">
            <nav className="flex flex-col px-6 py-4">
              {navLinks.map((link, i) => (
                link.isRoute
                  ? <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-slate-900 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/5">
                      <span>{link.label}</span><span className="opacity-40">→</span>
                    </Link>
                  : <motion.a key={link.label} href={link.href}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-slate-900 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/5">
                      <span>{link.label}</span><span className="opacity-40">→</span>
                    </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
