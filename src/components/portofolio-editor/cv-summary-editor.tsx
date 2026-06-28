import { AccordionSection } from './accordion-sections';
import { useTranslation } from 'react-i18next';
import {
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Star,
    Lightbulb,
    ArrowUpRight,
} from 'lucide-react';

// ── Dummy data ──────────────────────────────────────────────────────────────

const dummySummary = {
    overall_score: 74,
    max_score: 100,
    grade: 'B+',

    section_scores: [
        { label: 'About / Hero', score: 90 },
        { label: 'Education', score: 80 },
        { label: 'Skills', score: 70 },
        { label: 'Experience', score: 65 },
        { label: 'Projects', score: 60 },
    ],

    strengths: [
        'Clear and concise personal summary that highlights your expertise.',
        'Multiple project entries demonstrate practical, hands-on experience.',
        'Relevant tech-stack skills are well-categorised by domain.',
    ],

    suggestions: [
        {
            section: 'Experience',
            tip: 'Add measurable impact (e.g. "reduced load time by 40%") to each role.',
        },
        {
            section: 'Projects',
            tip: 'Include live demo links and GitHub URLs so recruiters can verify your work.',
        },
        {
            section: 'Skills',
            tip: 'Specify proficiency levels (Beginner / Intermediate / Advanced) for each skill.',
        },
        {
            section: 'Education',
            tip: 'Mention relevant coursework or academic achievements if GPA ≥ 3.5.',
        },
    ],

    improvements: [
        'Add a professional photo to make your profile more personable.',
        'Include at least one certification badge (e.g. AWS, Google, Meta).',
        'Keep total CV length to 1–2 pages; trim rarely-used technologies.',
        'Use action verbs at the start of every experience bullet point.',
    ],
};

// ── Helper: circular score ring ───────────────────────────────────────────

const ScoreRing = ({
    score,
    max,
    grade,
}: {
    score: number;
    max: number;
    grade: string;
}) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const fill = (score / max) * circumference;
    const colour =
        score >= 80
            ? '#22c55e'
            : score >= 60
              ? '#f59e0b'
              : '#ef4444';

    return (
        <div className="relative flex items-center justify-center">
            <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
            >
                {/* Background track */}
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress arc */}
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke={colour}
                    strokeWidth="10"
                    strokeDasharray={`${fill} ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                    style={{
                        transition: 'stroke-dasharray 0.6s ease',
                    }}
                />
            </svg>

            {/* Centre label */}
            <div className="absolute flex flex-col items-center leading-none">
                <span
                    className="text-3xl font-bold text-slate-900 dark:text-white"
                    style={{ color: colour }}
                >
                    {score}
                </span>
                <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    / {max}
                </span>
                <span
                    className="mt-1 rounded px-1.5 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: colour }}
                >
                    {grade}
                </span>
            </div>
        </div>
    );
};

// ── Helper: mini progress bar ─────────────────────────────────────────────

const MiniBar = ({
    label,
    score,
}: {
    label: string;
    score: number;
}) => {
    const colour =
        score >= 80
            ? 'bg-green-500'
            : score >= 60
              ? 'bg-amber-400'
              : 'bg-red-400';

    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">
                    {label}
                </span>
                <span className="font-semibold text-slate-800 dark:text-white">
                    {score}%
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${colour}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────────────

export const CvSummaryEditor = () => {
    const { overall_score, max_score, grade, section_scores, strengths, suggestions, improvements } =
        dummySummary;
    const { t } = useTranslation();

    return (
        <AccordionSection
            title={t('cv_summary_title')}
            subtitle={t('cv_summary_subtitle')}
        >
            <div className="space-y-6">

                {/* ── Overall score + section breakdown ── */}
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
                    {/* Ring */}
                    <div className="flex flex-col items-center gap-2 sm:shrink-0">
                        <ScoreRing
                            score={overall_score}
                            max={max_score}
                            grade={grade}
                        />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {t('cv_summary_overall')}
                        </span>
                    </div>

                    {/* Section bars */}
                    <div className="w-full flex-1 space-y-4">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {t('cv_summary_breakdown')}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {section_scores.map(s => (
                                <MiniBar
                                    key={s.label}
                                    label={s.label}
                                    score={s.score}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Strengths ── */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <CheckCircle
                            size={16}
                            className="text-green-500"
                        />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {t('cv_summary_strengths')}
                        </p>
                    </div>
                    <ul className="space-y-2">
                        {strengths.map((s, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            >
                                <Star
                                    size={14}
                                    className="mt-0.5 shrink-0 text-green-500"
                                />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Suggestions ── */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <Lightbulb
                            size={16}
                            className="text-amber-500"
                        />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {t('cv_summary_suggestions')}
                        </p>
                    </div>
                    <div className="space-y-2">
                        {suggestions.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-900/15"
                            >
                                <span className="mt-0.5 shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-800/40 dark:text-amber-300">
                                    {s.section}
                                </span>
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    {s.tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Areas to Improve ── */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <TrendingUp
                            size={16}
                            className="text-violet-500"
                        />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {t('cv_summary_improvements')}
                        </p>
                    </div>
                    <ul className="space-y-2">
                        {improvements.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-800 dark:bg-violet-900/20 dark:text-violet-300"
                            >
                                <ArrowUpRight
                                    size={14}
                                    className="mt-0.5 shrink-0 text-violet-500"
                                />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Disclaimer ── */}
                <div className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
                    <AlertTriangle
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t('cv_summary_disclaimer')}
                    </p>
                </div>
            </div>
        </AccordionSection>
    );
};
