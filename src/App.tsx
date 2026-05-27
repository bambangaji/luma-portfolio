import { Outlet } from 'react-router-dom'
import { ThemeToggle } from './components/theme-toggle'
import { Navigation } from './components/navigations'
import { useEffect, useState } from 'react';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    console.log('Toggled theme, isDark:', !isDark);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />

      <Navigation />

      <main className="mx-auto">
        <Outlet context={{ isDark }} />
      </main>
    </div>
  );
}