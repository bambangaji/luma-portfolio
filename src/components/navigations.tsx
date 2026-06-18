import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'About', href: '#about', isRoute: false },
  { label: 'Skills', href: '#skills', isRoute: false },
  { label: 'Projects', href: '#projects', isRoute: false },
  { label: 'Experience', href: '#experience', isRoute: false },
  { label: 'Contact', href: '#contact', isRoute: false },

  {
    label: 'Generate Resume',
    href: '/generate-resume',
    isRoute: true,
  },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className={`fixed inset-x-0 top-0 z-50 bg-transparent border-b transition-all duration-300 ${scrolled
        ? 'border-white/10  bg-transparent shadow-2xl backdrop-blur-2xl'
        : 'border-transparent bg-transparent'
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center"
        >
          <Link
            to="/"
            className="relative z-10"
          >
            <span className="relative text-2xl font-black tracking-tight">
              <span
                className="
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-500
          to-cyan-400
          bg-clip-text
          text-transparent
          dark:text-transparent
        "
              >
                LUMA PORTFOLIO
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const content = (
              <>
                <span className="absolute inset-0 rounded-2xl border border-cyan-400/20 bg-white/5 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100" />

                <span className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-cyan-400/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative z-10 text-slate-900 dark:text-white">
                  {link.label}
                </span>
              </>
            );

            if (link.isRoute) {
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to={link.href}
                    className="
            group relative overflow-hidden
            rounded-2xl px-5 py-2.5
            text-sm font-medium
          "
                  >
                    {content}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="
        group relative overflow-hidden
        rounded-2xl px-5 py-2.5
        text-sm font-medium
      "
              >
                {content}
              </motion.a>
            );
          })}
        </nav>

        {/* Mobile Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition-all duration-300 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-neutral-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  <span>{link.label}</span>

                  <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};