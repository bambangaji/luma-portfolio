import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../components/app-header';
import {
  Sparkles, Rocket, Eye, Pencil, Cpu,
  CheckCircle, XCircle, ArrowRight, Star, Upload,
  Wand2, Globe, Briefcase, Search, BadgeCheck,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const FIELDS: { label: string; href?: string }[] = [
  { label: '📸 Photography' },
  { label: '📊 Accounting',  href: '/examples/accounting' },
  { label: '🛍️ Retail' },
  { label: '🏥 Healthcare' },
  { label: '🍳 Culinary' },
  { label: '🎨 Design',     href: '/examples/design' },
  { label: '🏗️ Engineering' },
  { label: '📚 Education' },
  { label: '⚖️ Legal' },
  { label: '🎵 Music' },
  { label: '✈️ Hospitality' },
  { label: '💼 Sales' },
];

export const LandingPage = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Upload, label: t('step1_label'), desc: t('step1_desc') },
    { icon: Cpu,    label: t('step2_label'), desc: t('step2_desc') },
    { icon: Wand2,  label: t('step3_label'), desc: t('step3_desc') },
    { icon: Pencil, label: t('step4_label'), desc: t('step4_desc') },
    { icon: Eye,    label: t('step5_label'), desc: t('step5_desc') },
    { icon: Rocket, label: t('step6_label'), desc: t('step6_desc') },
  ];

  const benefits = [
    { icon: BadgeCheck, title: t('benefit1_title'), desc: t('benefit1_desc') },
    { icon: Globe,      title: t('benefit2_title'), desc: t('benefit2_desc') },
    { icon: Briefcase,  title: t('benefit3_title'), desc: t('benefit3_desc') },
    { icon: Search,     title: t('benefit4_title'), desc: t('benefit4_desc') },
  ];

  const beforeAfter = [
    { label: t('ba_photo_label'),   before: t('ba_photo_before'),   after: t('ba_photo_after') },
    { label: t('ba_account_label'), before: t('ba_account_before'), after: t('ba_account_after') },
    { label: t('ba_retail_label'),  before: t('ba_retail_before'),  after: t('ba_retail_after') },
  ];

  const reviews = [
    { name: t('review1_name'), role: t('review1_role'), avatar: 'SD', rating: 5, text: t('review1') },
    { name: t('review2_name'), role: t('review2_role'), avatar: 'BS', rating: 5, text: t('review2') },
    { name: t('review3_name'), role: t('review3_role'), avatar: 'MP', rating: 5, text: t('review3') },
    { name: t('review4_name'), role: t('review4_role'), avatar: 'RH', rating: 5, text: t('review4') },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white overflow-x-hidden">

      <AppHeader />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-[#0a0a0f] dark:via-[#0d0d1a] dark:to-[#050510]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.04)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(139,92,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.07)_1px,transparent_1px)]" />
        <motion.div className="absolute -left-32 top-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px] dark:bg-violet-600/30"
          animate={{ scale: [1, 1.1, 1], x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-2 text-sm font-semibold text-violet-600 backdrop-blur dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
            <Sparkles size={14} /> {t('badge')}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-slate-900 dark:text-white">{t('hero_title1')}</span>
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent dark:text-transparent">
              {t('hero_highlight')}
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">{t('hero_title2')}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t('hero_sub')}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="mb-10 text-sm text-slate-400 dark:text-slate-600">{t('hero_note')}</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-4">
            <Link to="/generate-resume">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-9 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/30 transition-all">
                <Sparkles size={18} /> {t('btn_generate')}
              </motion.span>
            </Link>
            <Link to="/bambang-aji-pangestu">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white/60 px-9 py-4 text-base font-bold text-slate-900 backdrop-blur transition-colors hover:bg-gray-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                <Eye size={18} /> {t('btn_example')}
              </motion.span>
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-10">
            {[['500+', t('stat_portfolios')], ['4×', t('stat_interviews')], ['2 min', t('stat_setup')]].map(([val, lbl]) => (
              <div key={String(lbl)} className="text-center">
                <div className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-2xl font-extrabold text-transparent">{val}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-300 pt-1.5 dark:border-slate-700">
            <div className="h-2 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
          </div>
        </motion.div>
      </section>

      {/* ── WORKS FOR EVERY FIELD ── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-[#0d0d1a]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp()}>
            <span className="mb-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              {t('fields_eyebrow')}
            </span>
            <h2 className="text-2xl font-extrabold dark:text-white text-slate-700">{t('fields_title')}</h2>
            <p className="mt-3 mb-8 text-slate-500 dark:text-slate-400">{t('fields_sub')}</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-2">
            {FIELDS.map((field, i) => {
              const chip = (
                <motion.span key={field.label}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all
                    ${field.href
                      ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:shadow-md cursor-pointer dark:border-violet-600/40 dark:bg-violet-500/10 dark:text-violet-300'
                      : 'border-gray-200 bg-white text-slate-700 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300'
                    }`}>
                  {field.label} {field.href && <span className="ml-1 text-xs opacity-60">↗</span>}
                </motion.span>
              );
              return field.href
                ? <Link key={field.label} to={field.href}>{chip}</Link>
                : chip;
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              {t('how_eyebrow')}
            </span>
            <h2 className="text-2xl font-extrabold dark:text-white text-slate-700">{t('how_title')}</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">{t('how_sub')}</p>
          </motion.div>
          <div className="grid gap-4 lg:grid-cols-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.label} {...fadeUp(i * 0.07)}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-violet-500/10 dark:border-gray-800/80 dark:bg-gray-900/60">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-violet-500 dark:text-violet-400">Step {i + 1}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">{step.label}</h3>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-28 px-6 bg-slate-50 dark:bg-[#0d0d1a]">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400">
              {t('why_eyebrow')}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-700 dark:text-white">{t('why_title')}</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">{t('why_sub')}</p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} {...fadeUp(i * 0.09)}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 dark:border-gray-800/80 dark:bg-gray-900/60">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-2xl transition-all group-hover:scale-150" />
                  <div className="relative mb-4 inline-flex rounded-xl bg-gradient-to-br from-violet-100 to-cyan-100 p-3 dark:from-violet-500/15 dark:to-cyan-500/15">
                    <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              {t('ba_eyebrow')}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-700 dark:text-white">{t('ba_title')}</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">{t('ba_sub')}</p>
          </motion.div>
          <div className="space-y-5">
            {beforeAfter.map((item, i) => (
              <motion.div key={item.label} {...fadeUp(i * 0.1)}
                className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
                <div className="border-b border-gray-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-200">
                  {item.label}
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="border-b border-gray-200 bg-red-50/80 p-5 dark:border-gray-800 dark:bg-red-950/25 md:border-b-0 md:border-r">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-500">
                      <XCircle size={13} /> {t('before_label')}
                    </div>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.before}</p>
                  </div>
                  <div className="bg-emerald-50/80 p-5 dark:bg-emerald-950/25">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle size={13} /> {t('after_label')}
                    </div>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-200">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-28 px-6 bg-slate-50 dark:bg-[#0d0d1a]">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              {t('reviews_eyebrow')}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-700 dark:text-white">{t('reviews_title')}</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">{t('reviews_sub')}</p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <motion.div key={r.name} {...fadeUp(i * 0.08)}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800/80 dark:bg-gray-900/60">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-extrabold text-white">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <motion.div {...fadeUp()} className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative px-12 py-20 text-center text-white">
            <div className="mb-4 inline-block rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              {t('cta_badge')}
            </div>
            <h2 className="text-3xl font-extrabold">{t('cta_title')}</h2>
            <p className="mt-4 text-lg text-white/75">{t('cta_sub')}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/generate-resume">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 font-bold text-violet-600 shadow-xl transition-all">
                  <Sparkles size={18} /> {t('btn_generate')}
                </motion.span>
              </Link>
              <Link to="/bambang-aji-pangestu">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 px-9 py-4 font-bold text-white backdrop-blur transition-colors hover:bg-white/15">
                  <Eye size={18} /> {t('btn_example')} <ArrowRight size={16} />
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 py-10 dark:border-gray-800/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 sm:flex-row">
          <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-base font-extrabold text-transparent dark:text-transparent">
            LUMA PORTFOLIO
          </span>
          <span>{t('footer_copy')}</span>
          <div className="flex gap-6">
            <Link to="/generate-resume" className="transition-colors hover:text-violet-500">{t('footer_generate')}</Link>
            <Link to="/portofolio-editor" className="transition-colors hover:text-violet-500">{t('footer_editor')}</Link>
            <Link to="/bambang-aji-pangestu" className="transition-colors hover:text-violet-500">{t('footer_example')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
