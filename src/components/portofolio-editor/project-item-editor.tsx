import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AccordionSection } from './accordion-sections';
import { usePortfolioStore } from '../../store/portfolio.store';

interface Props {
  index: number;

  project: {
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    technologies: string[];
  };
}

export const ProjectItemEditor = ({
  index,
  project,
}: Props) => {
  const portfolio =
    usePortfolioStore(
      state => state.portfolio
    );

  const setPortfolio =
    usePortfolioStore(
      state => state.setPortfolio
    );

  const [
    newTechnology,
    setNewTechnology,
  ] = useState('');

  const { t } = useTranslation();

  const updateProject = (
    field: string,
    value: any
  ) => {
    const items = [
      ...portfolio.project_section
        .items,
    ];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    setPortfolio({
      ...portfolio,

      project_section: {
        ...portfolio.project_section,
        items,
      },
    });
  };

  const removeProject =
    () => {
      setPortfolio({
        ...portfolio,

        project_section: {
          ...portfolio.project_section,

          items:
            portfolio.project_section.items.filter(
              (
                _,
                itemIndex
              ) =>
                itemIndex !==
                index
            ),
        },
      });
    };

  return (
    <AccordionSection
      title={
        project.title ||
        t('editor_label_new_project')
      }
      subtitle={`${project.technologies.length} Technologies`}
      defaultOpen={false}
    >
      <div className="space-y-5">
        {/* Title */}

        <div>
          <label
            className="
              mb-2 block

              text-sm
              font-medium

              text-slate-500
              dark:text-white
            "
          >
            {t('editor_field_project_title')}
          </label>

          <input
            value={
              project.title
            }
            onChange={e =>
              updateProject(
                'title',
                e.target.value
              )
            }
            className="
              w-full

              rounded-xl
              border

              border-gray-300

              px-4 py-3

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
            "
          />
        </div>

        {/* Description */}

        <div>
          <label
            className="
              mb-2 block

              text-sm
              font-medium

              text-slate-500
              dark:text-white
              
            "
          >
            {t('editor_field_description')}
          </label>

          <textarea
            rows={5}
            value={
              project.description
            }
            onChange={e =>
              updateProject(
                'description',
                e.target.value
              )
            }
            className="
              w-full

              rounded-xl
              border

              border-gray-300

              px-4 py-3

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
            "
          />
        </div>

        {/* URL */}

        <div>
          <label
            className="
              mb-2 block

              text-sm
              font-medium

              text-slate-500
              dark:text-white
            "
          >
            {t('editor_field_project_url')}
          </label>

          <input
            value={project.url}
            onChange={e =>
              updateProject(
                'url',
                e.target.value
              )
            }
            placeholder="https://..."
            className="
              w-full

              rounded-xl
              border

              border-gray-300

              px-4 py-3

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
            "
          />
        </div>

        {/* Thumbnail */}

        <div>
          <label
            className="
              mb-2 block

              text-sm
              font-medium

              text-slate-500
              dark:text-white
            "
          >
            {t('editor_field_thumbnail_url')}
          </label>

          <input
            value={
              project.thumbnail
            }
            onChange={e =>
              updateProject(
                'thumbnail',
                e.target.value
              )
            }
            placeholder="https://image..."
            className="
              w-full

              rounded-xl
              border

              border-gray-300

              px-4 py-3

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
            "
          />
        </div>

        {/* Preview */}

        {project.thumbnail && (
          <img
            src={
              project.thumbnail
            }
            alt={
              project.title
            }
            className="
              h-48
              w-full

              rounded-xl

              object-cover
            "
          />
        )}

        {/* Technologies */}

        <div>
          <label
            className="
              mb-3 block

              text-sm
              font-medium

              text-slate-500
              dark:text-white
            "
          >
            {t('editor_field_technologies')}
          </label>

          <div
            className="
              mb-3

              flex
              flex-wrap
              gap-2
            "
          >
            {project.technologies.map(
              (
                tech,
                techIndex
              ) => (
                <span
                  key={
                    techIndex
                  }
                  className="
                    flex
                    items-center
                    gap-2

                    rounded-full

                    bg-violet-100

                    px-3 py-1

                    text-sm

                    text-violet-700

                    dark:bg-violet-500/20
                    dark:text-violet-300
                  "
                >
                  {tech}

                  <button
                    onClick={() =>
                      updateProject(
                        'technologies',
                        project.technologies.filter(
                          (
                            _,
                            index
                          ) =>
                            index !==
                            techIndex
                        )
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              )
            )}
          </div>

          <div
            className="
              flex gap-2
            "
          >
            <input
              value={
                newTechnology
              }
              onChange={e =>
                setNewTechnology(
                  e.target.value
                )
              }
              placeholder="Microsoft Word"
              className="
                flex-1

                rounded-xl
                border

                border-gray-300

                px-4 py-3

                dark:border-gray-700
                dark:bg-gray-900
                dark:text-white
              "
            />

            <button
              onClick={() => {
                if (
                  !newTechnology.trim()
                ) {
                  return;
                }

                updateProject(
                  'technologies',
                  [
                    ...project.technologies,
                    newTechnology.trim(),
                  ]
                );

                setNewTechnology(
                  ''
                );
              }}
              className="
                rounded-xl

                bg-violet-600

                px-4

                text-white
              "
            >
              <Plus
                size={18}
              />
            </button>
          </div>
        </div>

        {/* Delete */}

        <button
          onClick={
            removeProject
          }
          className="
          text-sm
            text-red-500
            px-2 py-1
            rounded-md
            dark:border-gray-700
            dark:bg-gray-800
            border-gray-7000
            border
          "
        >
          {t('editor_btn_delete_project')}
        </button>
      </div>
    </AccordionSection>
  );
};