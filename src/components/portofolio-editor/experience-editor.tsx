import { AccordionSection } from './accordion-sections';
import { ExperienceItemEditor } from './experinece-item-editor';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  const experiences = portfolio.experience_section.items;

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
      title={t('editor_experience')}
      subtitle={t('editor_jobs', { count: experiences.length })}
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
          onClick={addExperience}
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
          {t('editor_btn_add_experience')}
        </button>
      </div>
    </AccordionSection>
  );
};