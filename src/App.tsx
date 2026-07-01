import { Outlet, useLocation } from 'react-router-dom'
import { Navigation } from './components/navigations'
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

export default function App() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggle = () => setIsDark(p => !p);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const location = useLocation();
  const showNav = ['/bambang-aji-pangestu', '/examples/design', '/examples/accounting'].includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        {showNav && <Navigation isDark={isDark} toggle={toggle} />}
        <main className="mx-auto">
          <Outlet context={{ isDark }} />
        </main>
      </div>
    </>
  );
}
