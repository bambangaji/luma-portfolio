import { useState } from 'react';

import {
  Trash2,
  Plus,
} from 'lucide-react';

import { AccordionSection } from './accordion-sections';

import { usePortfolioStore } from '../../store/portfolio.store';

interface Props {
  category: {
    category: string;
    score: number;
    items: string[];
  };

  index: number;
}

export const SkillCategoryEditor = ({
  category,
  index,
}: Props) => {
  const [newSkill, setNewSkill] =
    useState('');

  const portfolio =
    usePortfolioStore(
      state => state.portfolio
    );

  const setPortfolio =
    usePortfolioStore(
      state => state.setPortfolio
    );

  const updateCategory =
    (
      field:
        | 'category'
        | 'score',
      value:
        | string
        | number
    ) => {
      const categories =
        [
          ...portfolio.skill_section
            .categories,
        ];

      categories[index] = {
        ...categories[index],
        [field]: value,
      };

      setPortfolio({
        ...portfolio,
        skill_section: {
          ...portfolio.skill_section,
          categories,
        },
      });
    };

  const addSkill = () => {
    if (
      !newSkill.trim()
    ) {
      return;
    }

    const categories =
      [
        ...portfolio.skill_section
          .categories,
      ];

    categories[index] = {
      ...categories[index],
      items: [
        ...categories[index]
          .items,
        newSkill.trim(),
      ],
    };

    setPortfolio({
      ...portfolio,
      skill_section: {
        ...portfolio.skill_section,
        categories,
      },
    });

    setNewSkill('');
  };

  const removeSkill = (
    skillIndex: number
  ) => {
    const categories =
      [
        ...portfolio.skill_section
          .categories,
      ];

    categories[index] = {
      ...categories[index],
      items:
        categories[
          index
        ].items.filter(
          (_, i) =>
            i !==
            skillIndex
        ),
    };

    setPortfolio({
      ...portfolio,
      skill_section: {
        ...portfolio.skill_section,
        categories,
      },
    });
  };

  const removeCategory =
    () => {
      const categories =
        portfolio.skill_section.categories.filter(
          (_, i) =>
            i !== index
        );

      setPortfolio({
        ...portfolio,
        skill_section: {
          ...portfolio.skill_section,
          categories,
        },
      });
    };

  return (
    <AccordionSection
      title={
        category.category
      }
      subtitle={`${category.items.length} Skills`}
      defaultOpen={false}
    >
      <div className="space-y-5">
        {/* Category Name */}
        <div>
          <label
            className="
              mb-2 block
              text-sm
              font-medium
              dark:text-white
              text-slate-500
            "
          >
            Category Name
          </label>

          <input
            value={
              category.category
            }
            onChange={e =>
              updateCategory(
                'category',
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border

              px-4
              py-3
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          />
        </div>

        {/* Score */}
        <div>
          <div
            className="
              mb-2
              flex
              justify-between
              dark:text-white
            "
          >
            <span className="text-sm font-medium dark:text-white text-slate-500">
              Score
            </span>

            <span className="text-sm  dark:text-white text-slate-500"> 
              {
                category.score
              }
              %
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={
              category.score
            }
            onChange={e =>
              updateCategory(
                'score',
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          />
        </div>

        {/* Skills */}
        <div>
          <label
            className="
              mb-2 block
              text-sm
              font-medium
              dark:text-white
              text-slate-500
            "
          >
            Skills
          </label>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {category.items.map(
              (
                skill,
                skillIndex
              ) => (
                <div
                  key={`${skill}-${skillIndex}`}
                  className="
                    flex
                    items-center
                    gap-2

                    rounded-full

                    bg-violet-100

                    px-3
                    py-1

                    text-sm
                  "
                >
                  {skill}

                  <button
                    onClick={() =>
                      removeSkill(
                        skillIndex
                      )
                    }
                  >
                    <Trash2
                    className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                      size={
                        14
                      }
                    />
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Add Skill */}
        <div
          className="
            flex gap-2
          "
        >
          <input
            value={
              newSkill
            }
            onChange={e =>
              setNewSkill(
                e.target.value
              )
            }
            onKeyDown={e => {
              if (
                e.key ===
                'Enter'
              ) {
                addSkill();
              }
            }}
            placeholder="Type skill and press Enter"
            className="
              flex-1
              rounded-xl
              border

              px-4
              py-3
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          />

          <button
            onClick={
              addSkill
            }
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

        {/* Delete Category */}
        <button
          onClick={
            removeCategory
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
          Delete Category
        </button>
      </div>
    </AccordionSection>
  );
};