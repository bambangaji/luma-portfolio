import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { BarChart3, Briefcase, Award, CheckCircle, Mail, Linkedin, ChevronDown, TrendingUp, Shield, BookOpen, ExternalLink, UserCircle2 } from 'lucide-react';
import { LandingPageService } from '../../services/landing-page-service';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const socialIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t === 'linkedin') return Linkedin;
  if (t === 'email') return Mail;
  return Mail;
};

const skillIcon = (category: string) => {
  if (category.toLowerCase().includes('tax')) return Shield;
  if (category.toLowerCase().includes('tool')) return BarChart3;
  if (category.toLowerCase().includes('soft')) return TrendingUp;
  return BookOpen;
};

export default function AccountingExamplePage() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const [showAll, setShowAll] = useState(false);

  const pi       = LandingPageService.getPersonalInformation();
  const edu      = LandingPageService.getEducation()[0];
  const certs    = LandingPageService.getCertifications();
  const exps     = [...LandingPageService.getExperiences()].sort((a, b) =>
    new Date(b.end_date || b.start_date).getTime() - new Date(a.end_date || a.start_date).getTime()
  );
  const projects = LandingPageService.getProjects();
  const skills   = LandingPageService.getSkills().categories;

  return (
    <div className={`min-h-screen font-sans transition-colors ${isDark ? 'bg-[#060b12] text-white' : 'bg-[#f4f7fb] text-slate-900'}`}>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-[#060b12] via-blue-950/30 to-[#060b12]' : 'bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50'}`} />
        <motion.div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]"
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <div>
              {/* Photo or icon */}
              <div className="mb-6">
                {pi.image
                  ? <img src={pi.image} alt={pi.full_name}
                      className="h-24 w-24 rounded-2xl object-cover grayscale border border-blue-100 dark:border-gray-700" />
                  : <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-blue-100 bg-blue-50'}`}>
                      <UserCircle2 size={40} className="text-blue-400" />
                    </div>
                }
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                <BarChart3 size={14} /> Certified Public Accountant
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
                className="mb-5 text-5xl font-extrabold leading-tight lg:text-6xl">
                {pi.full_name}
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">CPA · Finance Expert</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className={`mb-8 text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {pi.description}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-3">
                <a href="#experience" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-7 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl">
                  <Briefcase size={16} /> View Experience
                </a>
                <a href="#contact" className={`inline-flex items-center gap-2 rounded-xl border px-7 py-3 font-bold transition-colors ${isDark ? 'border-white/15 text-white hover:bg-white/5' : 'border-gray-300 text-slate-900 hover:bg-blue-50'}`}>
                  <Mail size={16} /> Contact
                </a>
              </motion.div>
            </div>

            {/* Right — key metrics */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: 'Years Experience', value: '7+', color: 'blue' },
                { icon: BarChart3,  label: 'Reports Managed', value: '500+', color: 'emerald' },
                { icon: Shield,    label: 'Tax Audits Won', value: '5',    color: 'blue' },
                { icon: Award,     label: 'Certifications', value: '3',    color: 'emerald' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className={`rounded-2xl border p-5 ${isDark ? 'border-gray-800 bg-gray-900/60' : 'border-gray-200 bg-white'}`}>
                  <div className={`mb-2 inline-flex rounded-xl p-2 ${color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/15' : 'bg-emerald-100 dark:bg-emerald-500/15'}`}>
                    <Icon size={18} className={color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'} />
                  </div>
                  <div className="text-2xl font-extrabold">{value}</div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={`py-24 px-6 ${isDark ? 'bg-[#0a1018]' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl">
          <motion.div {...fade()} className="mb-12">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">About</span>
            <h2 className="text-3xl font-extrabold">Professional Background</h2>
          </motion.div>
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div {...fade(0.1)}>
              <div className={`rounded-2xl border p-6 mb-5 ${isDark ? 'border-gray-800 bg-gray-900/60' : 'border-blue-100 bg-blue-50/40'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Education</span>
                </div>
                <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</div>
                <div className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{edu.institution}</div>
                <div className={`text-sm mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{edu.start_date} — {edu.end_date} · GPA {edu.gpa}</div>
              </div>
              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{pi.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Award size={16} className="text-emerald-500" /> Certifications</h3>
              <div className="space-y-3">
                {certs.map(c => (
                  <div key={c.name} className={`flex items-center justify-between rounded-2xl border p-4 ${isDark ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                      <div>
                        <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.name}</div>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.issuer}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">{c.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={`py-24 px-6 ${isDark ? 'bg-[#060b12]' : 'bg-[#f4f7fb]'}`}>
        <div className="mx-auto max-w-6xl">
          <motion.div {...fade()} className="mb-12">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">Skills</span>
            <h2 className="text-3xl font-extrabold">Core Competencies</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => {
              const Icon = skillIcon(s.category);
              return (
                <motion.div key={s.category} {...fade(i * 0.08)}
                  className={`rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-gray-800 bg-gray-900/60' : 'border-gray-200 bg-white'}`}>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-500/15">
                      <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{s.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map(item => (
                      <span key={item} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className={`py-24 px-6 ${isDark ? 'bg-[#0a1018]' : 'bg-white'}`}>
        <div className="mx-auto max-w-4xl">
          <motion.div {...fade()} className="mb-12">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">Experience</span>
            <h2 className="text-3xl font-extrabold">Work History</h2>
          </motion.div>
          <div className="space-y-6">
            {(showAll ? exps : exps.slice(0, 3)).map((exp, i) => (
              <motion.div key={i} {...fade(i * 0.07)}
                className={`rounded-2xl border p-6 transition-all hover:shadow-md ${isDark ? 'border-gray-800 bg-gray-900/60' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Briefcase size={13} className="text-blue-500" />
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{exp.company}</span>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? 'bg-gray-800 text-slate-300' : 'bg-blue-100 text-blue-700'}`}>
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((d, j) => (
                    <li key={j} className={`flex gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" />{d}
                    </li>
                  ))}
                </ul>
                {exp.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map(t => (
                      <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-gray-800 dark:text-slate-300">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {exps.length > 3 && (
            <button onClick={() => setShowAll(p => !p)}
              className="mt-6 flex items-center gap-1 rounded-xl border border-blue-300 px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-500/10">
              {showAll ? 'Show Less' : 'View All'} <ChevronDown size={15} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className={`py-24 px-6 ${isDark ? 'bg-[#060b12]' : 'bg-[#f4f7fb]'}`}>
        <div className="mx-auto max-w-6xl">
          <motion.div {...fade()} className="mb-12">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">Projects</span>
            <h2 className="text-3xl font-extrabold">Key Achievements</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div key={p.title} {...fade(i * 0.08)}
                className={`rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-gray-800 bg-gray-900/60 hover:border-emerald-500/30' : 'border-gray-200 bg-white hover:border-emerald-300'}`}>
                <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-2.5 dark:bg-emerald-500/15">
                  <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map(t => (
                    <span key={t} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={`py-24 px-6 ${isDark ? 'bg-[#0a1018]' : 'bg-white'}`}>
        <div className="mx-auto max-w-3xl">
          <motion.div {...fade()} className="mb-10">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">Contact</span>
            <h2 className="text-3xl font-extrabold">Get in Touch</h2>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Available for senior accounting, finance, or consulting roles.</p>
          </motion.div>
          <div className="flex flex-col gap-4">
            {LandingPageService.getSocials().map((s, i) => {
              const Icon = socialIcon(s.type);
              return (
                <motion.a key={i} {...fade(i * 0.07)} href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all hover:shadow-md ${isDark ? 'border-gray-800 bg-gray-900/60 hover:border-blue-500/30' : 'border-gray-200 bg-gray-50 hover:border-blue-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-2.5 dark:bg-blue-500/15">
                      <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.type}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.value}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-blue-400" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={`border-t py-8 text-center text-sm ${isDark ? 'border-gray-800 text-slate-500' : 'border-gray-100 text-slate-400'}`}>
        © 2026 {pi.full_name} · CPA · All rights reserved.
      </footer>
    </div>
  );
}
