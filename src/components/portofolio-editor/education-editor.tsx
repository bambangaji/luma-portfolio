import { AccordionSection } from './accordion-sections';
import { EducationItemEditor } from './education-item-editor';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

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
      title={t('editor_education')}
      subtitle={t('editor_records', { count: portfolio.education_section.length })}
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
          onClick={addEducation}
          className="
            flex w-full items-center justify-center gap-2
            rounded-xl border-2 border-dashed
            border-violet-200 bg-violet-50/50
            px-4 py-4 text-sm font-semibold text-violet-600
            transition-colors hover:bg-violet-100 hover:border-violet-300
            dark:border-violet-500/30 dark:bg-violet-500/10
            dark:text-violet-400 dark:hover:bg-violet-500/20
          "
        >
          {t('editor_btn_add_education')}
        </button>
      </div>
    </AccordionSection>
  );
};