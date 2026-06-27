import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles, FileText, Rocket, Eye, Pencil, Cpu,
  CheckCircle, XCircle, ArrowRight, Star, Upload,
  Wand2, Globe, Briefcase, Search, BadgeCheck
} from 'lucide-react';

/* ─── data ─────────────────────────────────────────────── */
const steps = [
  { icon: Upload,   label: 'Upload PDF',        desc: 'Drop your existing resume in PDF format.' },
  { icon: Cpu,      label: 'AI Extracts Data',  desc: 'AI reads every section — skills, jobs, projects.' },
  { icon: Wand2,    label: 'ATS Conversion',    desc: 'Reformatted into a keyword-rich ATS structure.' },
  { icon: Pencil,   label: 'Live Edit',         desc: 'Customise everything in the visual editor.' },
  { icon: Eye,      label: 'Preview',           desc: 'See your live portfolio before publishing.' },
  { icon: Rocket,   label: 'Deploy & Share',    desc: 'One click. Your portfolio is live online.' },
];

const benefits = [
  { icon: BadgeCheck, title: 'ATS-Optimised Resume',      desc: 'Beat automated screening with keyword-rich, structured content that parsers love.' },
  { icon: Globe,      title: 'Live Portfolio Site',        desc: 'A polished, publicly shareable portfolio URL — impress recruiters instantly.' },
  { icon: Briefcase,  title: 'Job-Hunting Workflow',       desc: 'From resume → portfolio → deploy. The complete workflow to land your next role.' },
  { icon: Search,     title: 'Recruiter-Ready Profile',    desc: 'Companies can quickly scan your skills, projects, and experience in one place.' },
];

const beforeAfter = [
  {
    label: 'Skills',
    before: 'JavaScript, React, Node',
    after:  'Frontend: React · TypeScript · Tailwind\nBackend: Node.js · Express · PostgreSQL',
  },
  {
    label: 'Experience',
    before: 'Worked at Acme Corp as a developer from 2021 to 2023.',
    after:  'Software Engineer · Acme Corp\nJan 2021 – Dec 2023\n• Reduced page load time by 40% via lazy loading\n• Led migration from REST to GraphQL',
  },
  {
    label: 'Summary',
    before: 'I am a hardworking developer who loves coding.',
    after:  'Full Stack Engineer with 3+ years building scalable web apps using React & Node.js. Passionate about performance and clean architecture.',
  },
];

const reviews = [
  {
    name: 'Rina Kartika',
    role: 'Frontend Engineer · Jakarta',
    avatar: 'RK',
    rating: 5,
    text: 'I uploaded my old Word-converted PDF and in 2 minutes had a beautiful portfolio. Got 3 interview calls the same week!',
  },
  {
    name: 'Dimas Pratama',
    role: 'Backend Developer · Bandung',
    avatar: 'DP',
    rating: 5,
    text: 'The ATS conversion is insane. My resume was rejected by every ATS before. Now my response rate jumped to 60%.',
  },
  {
    name: 'Sarah Chen',
    role: 'Full Stack Dev · Singapore',
    avatar: 'SC',
    rating: 5,
    text: 'Super clean editor. I tweaked my hero, rearranged projects, hit deploy — done in 10 minutes. Looks premium.',
  },
  {
    name: 'Arif Nugroho',
    role: 'Mobile Engineer · Surabaya',
    avatar: 'AN',
    rating: 4,
    text: 'Didn\'t expect AI to classify my Flutter & Kotlin skills so accurately. The portfolio literally looks hand-designed.',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

/* ─── component ────────────────────────────────────────── */
export const LandingPage = () => (
  <div className="min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-white overflow-x-hidden">

    {/* ── HERO ── */}
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-950 dark:to-black" />
      <motion.div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-3xl"
        animate={{ scale: [1, 1.15, 1], x: [0, 60, 0] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
        animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="mb-6 inline-block rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-cyan-400">
          ✦ AI-Powered Portfolio Builder
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Your Resume → ATS Resume<br />
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            + Live Portfolio
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Upload your PDF → AI converts it to an ATS-friendly resume and builds a stunning portfolio site — ready to share with companies in minutes.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mb-10 text-sm text-slate-400 dark:text-slate-500">
          No design skills needed · No manual formatting · No templates to fight
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4">
          <Link to="/generate-resume">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-xl transition-all">
              <Sparkles size={18} /> Generate from Resume
            </motion.span>
          </Link>
          <Link to="/portofolio-editor">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5">
              <Pencil size={18} /> Open Editor
            </motion.span>
          </Link>
        </motion.div>

        {/* social proof bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          {[['500+', 'Portfolios Built'], ['4× ', 'More Interview Calls'], ['2 min', 'Avg. Setup Time']].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{val}</div>
              <div>{lbl}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section className="py-28 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-500">How it works</p>
          <h2 className="text-4xl font-bold">From resume to hired — 6 steps</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">The complete workflow to get a job faster.</p>
        </motion.div>

        <div className="relative">
          {/* connector line (desktop) */}
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-violet-400 to-cyan-400 opacity-20 lg:block" />

          <div className="grid gap-6 lg:grid-cols-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.label} {...fadeUp(i * 0.07)}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-violet-500">Step {i + 1}</span>
                    </div>
                    <h3 className="font-semibold">{step.label}</h3>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ── BENEFITS ── */}
    <section className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-500">Why Luma</p>
          <h2 className="text-4xl font-bold">Everything companies want to see</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Make it easy for recruiters to say yes.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.title} {...fadeUp(i * 0.08)}
                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mb-2 font-semibold">{b.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── BEFORE / AFTER ── */}
    <section className="py-28 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-500">Transformation</p>
          <h2 className="text-4xl font-bold">Before vs After</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">See exactly what AI does to your raw resume content.</p>
        </motion.div>

        <div className="space-y-6">
          {beforeAfter.map((item, i) => (
            <motion.div key={item.label} {...fadeUp(i * 0.1)}
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="border-b border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-300">
                {item.label}
              </div>
              <div className="grid md:grid-cols-2">
                {/* Before */}
                <div className="border-b border-gray-200 bg-red-50 p-5 dark:border-gray-800 dark:bg-red-950/20 md:border-b-0 md:border-r">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                    <XCircle size={13} /> Before
                  </div>
                  <p className="whitespace-pre-line text-sm text-slate-600 dark:text-slate-400">{item.before}</p>
                </div>
                {/* After */}
                <div className="bg-emerald-50 p-5 dark:bg-emerald-950/20">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CheckCircle size={13} /> After (ATS-Optimised)
                  </div>
                  <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">{item.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── REVIEWS ── */}
    <section className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-500">Reviews</p>
          <h2 className="text-4xl font-bold">Devs who got hired</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Real people, real results.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.div key={r.name} {...fadeUp(i * 0.08)}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-28 px-6">
      <motion.div {...fadeUp()}
        className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 p-1 shadow-2xl shadow-violet-500/20">
        <div className="rounded-[22px] bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 px-12 py-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            Free · No sign-up required
          </div>
          <h2 className="text-4xl font-extrabold">Ready to get hired?</h2>
          <p className="mt-4 text-lg text-white/80">
            Upload your resume now. Your portfolio will be live in under 2 minutes.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/generate-resume">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-violet-600 shadow-lg transition-shadow hover:shadow-xl">
                <Sparkles size={18} /> Generate from Resume
              </motion.span>
            </Link>
            <Link to="/bambang-aji-pangestu">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                <Eye size={18} /> See Example Portfolio <ArrowRight size={16} />
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>

    {/* ── FOOTER ── */}
    <footer className="border-t border-gray-100 py-10 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 dark:text-slate-500 sm:flex-row">
        <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-base font-bold text-transparent">
          LUMA PORTFOLIO
        </span>
        <span>© 2026 Luma Portfolio. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/generate-resume" className="hover:text-violet-500 transition-colors">Generate</Link>
          <Link to="/portofolio-editor" className="hover:text-violet-500 transition-colors">Editor</Link>
          <Link to="/bambang-aji-pangestu" className="hover:text-violet-500 transition-colors">Example</Link>
        </div>
      </div>
    </footer>
  </div>
);
