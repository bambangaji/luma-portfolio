import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AccordionSection } from './accordion-sections';
import { usePortfolioStore } from '../../store/portfolio.store';
import { DatePickerField } from '../picker/date-picker-field';

interface Props {
  index: number;

  experience: any;
}

export const ExperienceItemEditor = ({
  index,
  experience,
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
    newResponsibility,
    setNewResponsibility,
  ] = useState('');

  const [
    newTechnology,
    setNewTechnology,
  ] = useState('');

  const { t } = useTranslation();

  const updateExperience =
    (
      field: string,
      value: any
    ) => {
      const items =
        [
          ...portfolio
            .experience_section
            .items,
        ];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      setPortfolio({
        ...portfolio,
        experience_section: {
          ...portfolio.experience_section,
          items,
        },
      });
    };

  const setCurrentExperience = (
    experienceIndex: number
  ) => {
    const items =
      portfolio.experience_section.items.map(
        (item, index) => ({
          ...item,
          is_current:
            index ===
            experienceIndex,
          end_date:
            index ===
              experienceIndex
              ? 'Present'
              : item.end_date ===
                'Present'
                ? ''
                : item.end_date,
        })
      );

    setPortfolio({
      ...portfolio,
      experience_section: {
        ...portfolio.experience_section,
        items,
      },
    });
  };

  const removeExperience =
    () => {
      setPortfolio({
        ...portfolio,
        experience_section: {
          ...portfolio.experience_section,
          items:
            portfolio.experience_section.items.filter(
              (
                _,
                i
              ) =>
                i !==
                index
            ),
        },
      });
    };

  return (
    <AccordionSection
      title={
        experience.role ||
        t('editor_label_new_experience')
      }
      subtitle={
        experience.company
      }
      defaultOpen={false}
    >
      <div className="space-y-5">
        {/* Role */}
        <input
          value={
            experience.role
          }
          onChange={e =>
            updateExperience(
              'role',
              e.target.value
            )
          }
          placeholder="Role"
          className="
            w-full
            rounded-xl
            border
            px-4 py-3
             dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
          "
        />

        {/* Company */}
        <input
          value={
            experience.company
          }
          onChange={e =>
            updateExperience(
              'company',
              e.target.value
            )
          }
          placeholder="Company"
          className="
            w-full
            rounded-xl
            border
            px-4 py-3
             dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
          "
        />
        <div
          className="
    rounded-2xl

    border
    border-gray-200

    bg-gray-50

    p-5

    dark:border-gray-800
    dark:bg-gray-800/20
  "
        >
          <div
            className="
      mb-4

      text-sm
      font-semibold

      text-slate-500
      dark:text-white
    "
          >
            {t('editor_field_employment_period')}
          </div>

          <div
            className="
      grid gap-4

      md:grid-cols-2
    "
          >
            <DatePickerField
              label={t('editor_field_start_date')}
              value={experience.start_date}
              onChange={value =>
                updateExperience(
                  'start_date',
                  value
                )
              }
            />

            {experience.is_current ? (
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
                  {t('editor_field_end_date')}
                </label>

                <div
                  className="
            flex
            h-[50px]
            items-center

            rounded-xl

            border

            border-green-200

            bg-green-50

            px-4

            font-medium

            text-green-700

            dark:border-green-900
            dark:bg-green-900/20
            dark:text-green-400
          "
                >
                  ✓ Present
                </div>
              </div>
            ) : (
              <DatePickerField
                label="End Date"
                value={
                  experience.end_date
                }
                onChange={value =>
                  updateExperience(
                    'end_date',
                    value
                  )
                }
              />
            )}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() =>
                setCurrentExperience(
                  index
                )
              }
              className={`
        rounded-full

        px-4 py-2

        text-sm
        font-medium

        transition-all

        ${experience.is_current
                  ? `
              bg-green-100
              text-green-700

              dark:bg-green-900/30
              dark:text-green-400
            `
                  : `
              bg-gray-100
              text-slate-500

              hover:bg-gray-200

              dark:bg-gray-800
              dark:text-white
            `
                }
      `}
            >
              {experience.is_current
                ? t('editor_btn_current_active')
                : t('editor_btn_set_current')}
            </button>
          </div>
        </div>


        {/* Current */}
        <label
          className="
            flex
            items-center
            gap-2
            dark:text-white
          "
        >
          <input
            type="checkbox"
            checked={
              experience.is_current
            }
            onChange={() =>
              setCurrentExperience(
                index
              )
            }
          />

          Current Position
        </label>

        {/* Technologies */}
        <div>
          <h4
            className="
              mb-2
              font-medium
              dark:text-white
            "
          >
            {t('editor_field_technologies')}
          </h4>

          <div
            className="
              mb-3
              flex
              flex-wrap
              gap-2
            "
          >
            {experience.technologies.map(
              (
                tech: string,
                techIndex: number
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
                   dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
                    px-3 py-1
                  "
                >
                  {tech}

                  <button
                    onClick={() =>
                      updateExperience(
                        'technologies',
                        experience.technologies.filter(
                          (
                            _: string,
                            i: number
                          ) =>
                            i !==
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

          <div className="flex gap-2">
            <input
              value={
                newTechnology
              }
              onChange={e =>
                setNewTechnology(
                  e.target.value
                )
              }
              placeholder="Angular"
              className="
                flex-1
                rounded-xl
                border
                px-4 py-3
                 dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
              "
            />

            <button
              onClick={() => {
                if (
                  !newTechnology.trim()
                )
                  return;

                updateExperience(
                  'technologies',
                  [
                    ...experience.technologies,
                    newTechnology,
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
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <h4
            className="
              mb-2
              font-medium
              dark:text-white
            "
          >
            {t('editor_field_responsibilities')}
          </h4>

          <div className="space-y-2">
            {experience.description.map(
              (
                item: string,
                descIndex: number
              ) => (
                <div
                  key={
                    descIndex
                  }
                  className="
                    flex
                    items-start
                    gap-2
                    
                  "
                >
                  <textarea
                    value={item}
                    onChange={e => {
                      const updated =
                        [
                          ...experience.description,
                        ];

                      updated[
                        descIndex
                      ] =
                        e.target.value;

                      updateExperience(
                        'description',
                        updated
                      );
                    }}
                    className="
                      flex-1
                      rounded-xl
                      border
                      px-3 py-2
                          dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
                    "
                  />

                  <button
                    onClick={() =>
                      updateExperience(
                        'description',
                        experience.description.filter(
                          (
                            _: string,
                            i: number
                          ) =>
                            i !==
                            descIndex
                        )
                      )
                    }
                  >
                    <Trash2
                      className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                      size={16}
                    />
                  </button>
                </div>
              )
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={
                newResponsibility
              }
              onChange={e =>
                setNewResponsibility(
                  e.target.value
                )
              }
              placeholder="New responsibility"
              className="
                flex-1
                rounded-xl
                border
                px-4 py-3
                 dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
              "
            />

            <button
              onClick={() => {
                if (
                  !newResponsibility.trim()
                )
                  return;

                updateExperience(
                  'description',
                  [
                    ...experience.description,
                    newResponsibility,
                  ]
                );

                setNewResponsibility(
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
              <Plus size={18} />
            </button>
          </div>
        </div>

        <button
          onClick={
            removeExperience
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
          {t('editor_btn_delete_experience')}
        </button>
      </div>
    </AccordionSection>
  );
};