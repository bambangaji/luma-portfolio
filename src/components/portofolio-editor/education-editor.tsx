import { AccordionSection } from './accordion-sections';
import { EducationItemEditor } from './education-item-editor';

import { usePortfolioStore } from '../../store/portfolio.store';

export const EducationEditor = () => {
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

  const addEducation = () => {
    setPortfolio({
      ...portfolio,

      education_section: [
        ...portfolio.education_section,
        {
          degree: '',
          institution: '',
          start_date: null,
          end_date: null,
          gpa: null,
          description: [],
        },
      ],
    });
  };

  return (
    <AccordionSection
      title="Education"
      subtitle={`${portfolio.education_section.length} Records`}
    >
      <div className="space-y-4">
        {portfolio.education_section.map(
          (
            education,
            index
          ) => (
            <EducationItemEditor
              key={index}
              index={index}
            />
          )
        )}

        <button
          onClick={
            addEducation
          }
          className="

            rounded-xl

            border
            border-dashed

            border-violet-300

            px-4
            py-3

            font-medium

            text-violet-600

            hover:bg-white-50

            dark:border-white-500/40
            dark:hover:bg-gray-500/10
            dark:text-white
          "
        >
          + Add Education
        </button>
      </div>
    </AccordionSection>
  );
};