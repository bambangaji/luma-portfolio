import { motion } from "framer-motion";

export const Footer = () => {
  const platforms = [
    // "GitHub",
    // "LinkedIn",
    // "Twitter",
    // "Google Scholar",
  ];

  return (
    <footer
      className="
        border-t py-12
        bg-white border-gray-100

        dark:bg-gray-950
        dark:border-gray-800

        transition-colors duration-300
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col items-center justify-between
          gap-4 px-6

          md:flex-row
        "
      >
        {/* Logo */}
        <div
          className="
            bg-gradient-to-r
            from-violet-500 to-cyan-400
            bg-clip-text
            text-2xl font-bold text-transparent
          "
        >
          Software Engineer
        </div>

        {/* Copyright */}
        <p
          className="
            text-sm
            text-slate-500 dark:text-slate-500
          "
        >
          © 2026 Software Engineer Portfolio. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          {platforms.map((platform) => (
            <motion.a
              key={platform}
              href="#"
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              className="
                text-sm font-medium
                transition-colors duration-300

                text-slate-500
                hover:text-violet-600

                dark:text-gray-400
                dark:hover:text-cyan-400
              "
            >
              {platform}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};