import { AccordionSection } from './accordion-sections';
import { SkillCategoryEditor } from './skills-category-editor';

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

  const skillSection =
    portfolio.skill_section;

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
      title="Skills"
      subtitle={`${skillSection.categories.length} Categories`}
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
            rounded-xl

            border
            border-dashed

            px-4
            py-3

            text-sm
            font-medium
            dark:text-white
            hover:bg-gray-50

            dark:hover:bg-gray-800
          "
        >
          + Add Category
        </button>
      </div>
    </AccordionSection>
  );
};