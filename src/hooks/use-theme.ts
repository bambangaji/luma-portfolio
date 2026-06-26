import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage and persist the theme state (light/dark)
 * across local storage and the document root element.
 * @returns {[string, () => void]} [currentTheme, toggleTheme]
 */
export const useTheme = () => {
  // Initialize theme from local storage or default to 'light'
  const [theme, setTheme] = useState<string>("light");

  // Effect to apply the theme class and persist it in local storage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme state
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return [theme, toggleTheme];
};