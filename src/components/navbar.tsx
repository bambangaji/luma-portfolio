import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();
  const links = [
    { name: "Beranda", href: "/" },
    { name: "Pencarian", href: "/search" },
    { name: "Whatsapp", href: "/whatsapp" },
    { name: "Tentang Kami", href: "/about-us" },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800 dark:bg-gray-900 text-white transition-colors duration-300">
      <div></div>
      <ul className="flex space-x-2">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors duration-200 hover:bg-gray-700 hover:font-bold dark:text-white ${
                  isActive ? "bg-gray-700 font-bold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Theme toggle button */}
      <button
        onClick={() => (typeof toggleTheme === "function" ? toggleTheme() : undefined)}
        className="p-2 rounded-full border border-gray-500 hover:bg-gray-700 transition-all duration-200"
        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-yellow-300" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </button>
    </nav>
  );
}

