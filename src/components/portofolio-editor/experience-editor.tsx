import { AccordionSection } from './accordion-sections';
import { ExperienceItemEditor } from './experinece-item-editor';

import { usePortfolioStore } from '../../store/portfolio.store';

export const ExperienceEditor = () => {
  const portfolio =
    usePortfolioStore(
      state => state.portfolio
    );

  const setPortfolio =
    usePortfolioStore(
      state => state.setPortfolio
    );

  if (!portfolio) {
    return null;
  }

  const experiences =
    portfolio.experience_section.items;

  const addExperience =
    () => {
      setPortfolio({
        ...portfolio,
        experience_section: {
          ...portfolio.experience_section,
          items: [
            ...experiences,
            {
              role: '',
              company: '',
              start_date: '',
              end_date: '',
              is_current: false,
              description: [],
              technologies: [],
            },
          ],
        },
      });
    };

  return (
    <AccordionSection
      title="Experience"
      subtitle={`${experiences.length} Jobs`}
    >
      <div className="space-y-4">
        {experiences.map(
          (
            experience,
            index
          ) => (
            <ExperienceItemEditor
              key={`${experience.company}-${experience.role}-${index}`}
              index={index}
              experience={
                experience
              }
            />
          )
        )}

        <button
          onClick={
            addExperience
          }
          className="
            rounded-xl

            border
            border-dashed

            px-4 py-3

            text-sm
            font-medium

            hover:bg-gray-50

            dark:hover:bg-gray-800
            dark:text-white
          "
        >
          + Add Experience
        </button>
      </div>
    </AccordionSection>
  );
};