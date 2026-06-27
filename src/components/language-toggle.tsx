import { useTranslation } from 'react-i18next';

const flags = {
  en: 'https://flagcdn.com/w40/us.png',
  id: 'https://flagcdn.com/w40/id.png',
};

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isId = i18n.language === 'id';

  const toggle = () => {
    const next = isId ? 'en' : 'id';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
    >
      <img
        src={isId ? flags.id : flags.en}
        alt={isId ? 'Indonesia' : 'English'}
        className="h-4 w-6 rounded-sm object-cover"
      />
      <span className="text-slate-700 dark:text-white">{isId ? 'ID' : 'EN'}</span>
    </button>
  );
};
