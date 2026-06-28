import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { AccordionSection } from './accordion-sections';
import { usePortfolioStore } from '../../store/portfolio.store';

export const HeroEditor = () => {
    const portfolio = usePortfolioStore(
        state => state.portfolio
    );

    const updateHero = usePortfolioStore(
        state => state.updateHero
    );

    if (!portfolio) {
        return null;
    }

    const hero = portfolio.hero;
    const { t } = useTranslation();

    const updateField = (
        field: keyof typeof hero,
        value: string
    ) => {
        updateHero({
            ...hero,
            [field]: value,
        });
    };

    const updateTitle = (
        field: 'prefix' | 'highlight',
        value: string
    ) => {
        updateHero({
            ...hero,
            title: {
                ...hero.title,
                [field]: value,
            },
        });
    };

    return (
        <AccordionSection
            title={t('editor_about')}
        >
            <div className="space-y-5">
                {/* Badge */}
                <div>
                    <label
                        className="
              mb-2 block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
                    >
                        {t('editor_field_badge')}
                    </label>

                    <input
                        value={hero.badge}
                        onChange={(
                            e: ChangeEvent<HTMLInputElement>
                        ) =>
                            updateField(
                                'badge',
                                e.target.value
                            )
                        }
                        className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4 py-3

              focus:border-violet-500
              focus:outline-none

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
                        placeholder="Mobile Developer"
                    />
                </div>

                {/* Headline */}
                <div>
                    <label
                        className="
              mb-2 block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
                    >
                        {t('editor_field_headline')}
                    </label>

                    <input
                        value={hero.headline}
                        onChange={e =>
                            updateField(
                                'headline',
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
              dark:bg-gray-800
              dark:text-white
            "
                        placeholder="Full Stack Engineer with 6+ years..."
                    />
                </div>

                {/* Title */}
                <div
                    className="
            grid gap-4
            md:grid-cols-2
          "
                >
                    <div>
                        <label
                            className="
                mb-2 block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
                        >
                            {t('editor_field_title_prefix')}
                        </label>

                        <input
                            value={
                                hero.title.prefix
                            }
                            onChange={e =>
                                updateTitle(
                                    'prefix',
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
                dark:bg-gray-800
                dark:text-white
              "
                            placeholder="Building"
                        />
                    </div>

                    <div>
                        <label
                            className="
                mb-2 block
                text-sm
                font-medium
              text-slate-700
              dark:text-slate-300
              "
                        >
                            {t('editor_field_title_highlight')}
                        </label>

                        <input
                            value={
                                hero.title.highlight
                            }
                            onChange={e =>
                                updateTitle(
                                    'highlight',
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
                dark:bg-gray-800
                dark:text-white
              "
                            placeholder="Digital Experiences"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label
                        className="
              mb-2 block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
                    >
                        {t('editor_field_description')}
                    </label>

                    <textarea
                        rows={8}
                        value={
                            hero.description
                        }
                        onChange={e =>
                            updateField(
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
              dark:bg-gray-800
              dark:text-white
            "
                        placeholder="Describe yourself..."
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label
                        className="
              mb-2 block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
                    >
                        {t('editor_field_short_description')}
                    </label>

                    <textarea
                        rows={3}
                        value={
                            hero.short_description
                        }
                        onChange={e =>
                            updateField(
                                'short_description',
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
              dark:bg-gray-800
              dark:text-white
            "
                        placeholder="Short summary..."
                    />
                </div>
            </div>
        </AccordionSection>
    );
};