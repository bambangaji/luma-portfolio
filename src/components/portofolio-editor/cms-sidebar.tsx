import {
  User,
  Briefcase,
  FolderKanban,
  Wrench,
  Palette,
} from 'lucide-react';

const menus = [
  {
    key: 'profile',
    label: 'Profile',
    icon: User,
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: Briefcase,
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: FolderKanban,
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: Wrench,
  },
  {
    key: 'theme',
    label: 'Theme',
    icon: Palette,
  },
];

export const CmsSidebar = () => {
  return (
    <aside
      className="
        border
        border-gray-200

        bg-white

        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      <div
        className="
          border-b
          border-gray-200
          p-6

          dark:border-gray-800
        "
      >
        <h2
          className="
            text-xl
            font-bold

            text-slate-900
            dark:text-white
          "
        >
          Portfolio Builder
        </h2>

        <p
          className="
            mt-1
            text-sm

            text-slate-500
            dark:text-slate-400
          "
        >
          Edit your portfolio content
        </p>
      </div>

      <div className="p-4">
        {menus.map(menu => {
          const Icon =
            menu.icon;

          return (
            <button
              key={menu.key}
              className="
                mb-2 flex
                w-full
                items-center
                gap-3

                rounded-xl
                px-4 py-3

                text-left

                transition-all

                hover:bg-violet-50

                dark:hover:bg-gray-800
              "
            >
              <Icon
                className="
                  h-5 w-5

                  text-violet-600
                "
              />

              <span
                className="
                  font-medium

                  text-slate-700
                  dark:text-gray-200
                "
              >
                {menu.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};