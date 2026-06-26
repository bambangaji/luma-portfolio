import { Trash2, Plus } from 'lucide-react';

import { AccordionSection } from './accordion-sections';

import { usePortfolioStore } from '../../store/portfolio.store';
import { DatePickerField } from '../picker/date-picker-field';

interface Education {
  degree: string;
  institution: string;
  start_date: string | null;
  end_date: string | null;
  gpa: number | null;
  description: string[];
}

interface Props {
  index: number;
}

export const EducationItemEditor = ({
  index,
}: Props) => {
  const portfolio = usePortfolioStore(
    state => state.portfolio
  );

  const setPortfolio = usePortfolioStore(
    state => state.setPortfolio
  );

  if (!portfolio) {
    return null;
  }

  const education =
    portfolio.education_section[index];

  const updateEducation = (
    field: keyof Education,
    value: Education[keyof Education]
  ) => {
    const items = [
      ...portfolio.education_section,
    ];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    setPortfolio({
      ...portfolio,
      education_section: items,
    });
  };

  const updateDescription = (
    descriptionIndex: number,
    value: string
  ) => {
    const descriptions = [
      ...education.description,
    ];

    descriptions[descriptionIndex] =
      value;

    updateEducation(
      'description',
      descriptions
    );
  };

  const addDescription = () => {
    updateEducation(
      'description',
      [
        ...education.description,
        '',
      ]
    );
  };

  const removeDescription = (
    descriptionIndex: number
  ) => {
    updateEducation(
      'description',
      education.description.filter(
        (_, i) =>
          i !== descriptionIndex
      )
    );
  };

  const removeEducation = () => {
    setPortfolio({
      ...portfolio,
      education_section:
        portfolio.education_section.filter(
          (_, i) =>
            i !== index
        ),
    });
  };

  return (
    <AccordionSection
      title={
        education.degree ||
        'New Education'
      }
      subtitle={
        education.institution
      }
      defaultOpen={false}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500 dark:text-white">
              Degree
            </label>

            <input
              value={
                education.degree
              }
              onChange={e =>
                updateEducation(
                  'degree',
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500 dark:text-white">
              Institution
            </label>

            <input
              value={
                education.institution
              }
              onChange={e =>
                updateEducation(
                  'institution',
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500 dark:text-white">
              GPA
            </label>

            <input
              type="number"
              step="0.01"
              value={
                education.gpa ?? ''
              }
              onChange={e =>
                updateEducation(
                  'gpa',
                  e.target.value === ''
                    ? null
                    : Number(
                      e.target.value
                    )
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DatePickerField
            label="Start Date"
            value={
              education.start_date
            }
            onChange={value =>
              updateEducation(
                'start_date',
                value
              )
            }
          />

          <DatePickerField
            label="End Date"
            value={
              education.end_date
            }
            onChange={value =>
              updateEducation(
                'end_date',
                value
              )
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-500 dark:text-white">
              Description
            </h4>

            <button
              type="button"
              onClick={
                addDescription
              }
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          {(education.description ?? []).map(
            (
              item,
              descriptionIndex
            ) => (
              <div
                key={
                  descriptionIndex
                }
                className="flex items-start gap-2"
              >
                <textarea
                  rows={3}
                  value={item}
                  onChange={e =>
                    updateDescription(
                      descriptionIndex,
                      e.target.value
                    )
                  }
                  placeholder="Description..."
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeDescription(
                      descriptionIndex
                    )
                  }
                  className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={
            removeEducation
          }
          className="text-sm
            text-red-500
            px-2 py-1
            rounded-md
            dark:border-gray-700
            dark:bg-gray-800
            border-gray-7000
            border"
        >
          Delete Education
        </button>
      </div>
    </AccordionSection>
  );
};