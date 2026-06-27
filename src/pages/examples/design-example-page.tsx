import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { LandingPageService } from '../../services/landing-page-service';

const projectColors = [
  { bg: '#E8E0D5', text: '#1a1a1a' },
  { bg: '#C8D8E8', text: '#0f1f2f' },
  { bg: '#D8E8D0', text: '#0f200f' },
  { bg: '#EAD8E8', text: '#200f20' },
  { bg: '#E8E8C8', text: '#201f0f' },
];

export default function DesignExamplePage() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const [showAllExp, setShowAllExp] = useState(false);

  const pi       = LandingPageService.getPersonalInformation();
  const socials  = LandingPageService.getSocials();
  const education = LandingPageService.getEducation();
  const certs    = LandingPageService.getCertifications();
  const exps     = [...LandingPageService.getExperiences()].sort(
    (a, b) => (b.is_current ? 1 : 0) - (a.is_current ? 1 : 0)
  );
  const projects = LandingPageService.getProjects();
  const skills   = LandingPageService.getSkills().categories.flatMap(c => c.items);

  const bg     = isDark ? '#0d0d0d' : '#fafaf8';
  const fg     = isDark ? '#e8e8e8' : '#111111';
  const mute   = isDark ? '#777'    : '#888';
  const border = isDark ? '#2a2a2a' : '#e0e0e0';

  return (
    <div style={{ background: bg, color: fg }} className="min-h-screen font-sans antialiased">

      {/* ── HERO ── */}
      <section className="mx-auto max-w-5xl px-8 pt-40 pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">

          {/* Photo or icon */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="shrink-0">
            {pi.image
              ? <img src={pi.image} alt={pi.full_name}
                  className="h-48 w-48 rounded-2xl object-cover grayscale lg:h-64 lg:w-64"
                  style={{ border: `1px solid ${border}` }} />
              : <div className="flex h-48 w-48 items-center justify-center rounded-2xl lg:h-64 lg:w-64"
                  style={{ border: `1px solid ${border}`, background: isDark ? '#1a1a1a' : '#f0ede8' }}>
                  <UserCircle2 size={80} style={{ color: mute }} />
                </div>
            }
          </motion.div>

          {/* Bio */}
          <div className="flex-1">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight lg:text-6xl">
              {pi.full_name} is a{' '}
              <span style={{ color: mute }}>designer &amp; creative</span>{' '}
              based in {pi.location.city}.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed lg:text-lg"
              style={{ color: mute }}>
              {pi.description}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-2">
              {skills.slice(0, 14).map(s => (
                <span key={s} style={{ border: `1px solid ${border}`, color: mute }}
                  className="rounded-full px-3 py-1 text-xs font-medium">{s}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="mx-auto max-w-5xl px-8 pb-24 space-y-5">
        {projects.map((p, i) => {
          const col = projectColors[i % projectColors.length];
          return (
            <motion.a key={p.title}
              href={p.url ? (p.url.startsWith('http') ? p.url : `https://${p.url}`) : '#'}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ scale: 1.005 }}
              className="group block overflow-hidden rounded-2xl"
              style={{ background: col.bg }}>

              {p.thumbnail
                ? <img src={p.thumbnail} alt={p.title} className="h-72 w-full object-cover" />
                : null
              }

              <div className="relative flex h-[360px] items-end p-8 lg:h-[440px]">
                {/* watermark number */}
                <span className="absolute right-8 top-8 select-none text-[120px] font-black leading-none opacity-[0.07]"
                  style={{ color: col.text }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* tech tags */}
                <div className="absolute left-8 top-8 flex flex-wrap gap-2">
                  {p.technologies.map(t => (
                    <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: 'rgba(0,0,0,0.1)', color: col.text }}>{t}</span>
                  ))}
                </div>

                <div>
                  <h2 className="text-3xl font-bold leading-tight lg:text-4xl" style={{ color: col.text }}>
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed opacity-70" style={{ color: col.text }}>
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold opacity-50 transition-opacity group-hover:opacity-100"
                    style={{ color: col.text }}>
                    View project →
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="mx-auto max-w-5xl px-8 pb-24"
        style={{ borderTop: `1px solid ${border}`, paddingTop: '4rem' }}>
        <h2 className="mb-10 text-2xl font-bold">Experience</h2>
        <div>
          {(showAllExp ? exps : exps.slice(0, 3)).map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              style={{ borderBottom: `1px solid ${border}` }}
              className="grid grid-cols-[140px_1fr] gap-8 py-8 lg:grid-cols-[200px_1fr]">
              <div>
                <div className="text-sm font-semibold">{exp.company}</div>
                <div className="mt-1 text-xs" style={{ color: mute }}>{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</div>
              </div>
              <div>
                <div className="font-semibold">{exp.role}</div>
                <ul className="mt-3 space-y-1.5">
                  {exp.description.map((d, j) => (
                    <li key={j} className="text-sm leading-relaxed" style={{ color: mute }}>— {d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        {exps.length > 3 && (
          <button onClick={() => setShowAllExp(p => !p)}
            className="mt-6 text-sm font-semibold transition-opacity hover:opacity-50"
            style={{ color: mute }}>
            {showAllExp ? 'Show less ↑' : 'Show all experience ↓'}
          </button>
        )}
      </section>

      {/* ── EDUCATION & CERTS ── */}
      <section className="mx-auto max-w-5xl px-8 pb-24"
        style={{ borderTop: `1px solid ${border}`, paddingTop: '4rem' }}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Education</h2>
            {education.map((e, i) => (
              <div key={i}>
                <div className="font-semibold">{e.degree}</div>
                <div className="mt-1 text-sm" style={{ color: mute }}>{e.institution}</div>
                <div className="mt-0.5 text-xs" style={{ color: mute }}>
                  {e.start_date} — {e.end_date}{e.gpa ? ` · GPA ${e.gpa}` : ''}
                </div>
              </div>
            ))}
          </div>
          {certs.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Certifications</h2>
              {certs.map(c => (
                <div key={c.name} style={{ borderBottom: `1px solid ${border}` }}
                  className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs" style={{ color: mute }}>{c.issuer}</div>
                  </div>
                  <span className="text-xs" style={{ color: mute }}>{c.year}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${border}` }}
        className="mx-auto max-w-5xl px-8 py-12 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm" style={{ color: mute }}>{pi.full_name} · {pi.location.city}</span>
        <div className="flex flex-wrap gap-6">
          {socials.map(s => (
            <a key={s.type}
              href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium transition-opacity hover:opacity-50">
              {s.type}
            </a>
          ))}
          <a href={`mailto:${pi.email}`}
            className="text-sm font-medium transition-opacity hover:opacity-50">
            {pi.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
