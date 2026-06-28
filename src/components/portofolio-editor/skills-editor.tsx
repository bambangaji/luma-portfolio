import { AccordionSection } from './accordion-sections';
import { SkillCategoryEditor } from './skills-category-editor';
import { useTranslation } from 'react-i18next';
import { usePortfolioStore } from '../../store/portfolio.store';

export const SkillsEditor = () => {
  const portfolio =
    usePortfolioStore(
      state => state.portfolio
    );

  const updatePortfolio =
    usePortfolioStore(
      state => state.setPortfolio
    );

  if (!portfolio) {
    return null;
  }

  const { t } = useTranslation();

  const skillSection = portfolio.skill_section;

  const addCategory = () => {
    updatePortfolio({
      ...portfolio,
      skill_section: {
        ...skillSection,
        categories: [
          ...skillSection.categories,
          {
            category:
              'New Category',
            score: 75,
            items: [],
          },
        ],
      },
    });
  };

  return (
    <AccordionSection
      title={t('editor_skills')}
      subtitle={t('editor_categories', { count: skillSection.categories.length })}
    >
      <div className="space-y-4">
        {skillSection.categories.map(
          (
            category,
            index
          ) => (
            <SkillCategoryEditor
              key={`${category.category}-${index}`}
              category={category}
              index={index}
            />
          )
        )}

        <button
          onClick={addCategory}
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
          {t('editor_btn_add_category')}
        </button>
      </div>
    </AccordionSection>
  );
};