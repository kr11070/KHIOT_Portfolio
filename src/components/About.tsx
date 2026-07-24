"use client";

import { dict, pick, useLang } from "@/lib/i18n";
import { experiences, skills } from "@/lib/portfolio-data";
import Reveal from "./Reveal";

export default function About() {
  const { lang } = useLang();

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {pick(dict.about.title, lang)}
        </h2>
        <p className="mt-3 text-ink-soft">{pick(dict.about.subtitle, lang)}</p>
      </Reveal>

      {/* 벤토 그리드: 소개(넓게) / 한 줄 철학 / 스킬 / 경험(넓게) */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2" delay={100}>
          <div className="h-full rounded-2.5xl border border-line bg-white/70 p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-deep">
              {pick(dict.about.introTitle, lang)}
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">{pick(dict.about.introBody, lang)}</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex h-full items-center rounded-2.5xl bg-accent-soft p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <p className="font-serif text-lg italic leading-relaxed text-accent-deep">
              {pick(dict.about.quote, lang)}
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-3" delay={150}>
          <div className="rounded-2.5xl border border-line bg-white/70 p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-deep">
              {pick(dict.about.skillsTitle, lang)}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="w-32 shrink-0 text-sm font-semibold text-ink-soft sm:w-36">
                    {skill.name}
                  </span>
                  <div className="relative h-2 flex-1 rounded-full bg-accent-soft">
                    <div
                      className="h-2 rounded-full bg-accent-dark"
                      style={{ width: `${skill.level}%` }}
                    />
                    <span
                      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent-deep shadow"
                      style={{ left: `calc(${skill.level}% - 6px)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-3" delay={250}>
          <div className="rounded-2.5xl border border-line bg-white/70 p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-deep">
              {pick(dict.about.expTitle, lang)}
            </h3>
            <ol className="mt-5 space-y-5">
              {experiences.map((exp) => (
                <li key={exp.period} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <span className="w-36 shrink-0 text-sm font-semibold text-ink-faint">
                    {exp.period}
                  </span>
                  <div>
                    <p className="font-bold">{pick(exp.title, lang)}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{pick(exp.detail, lang)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
