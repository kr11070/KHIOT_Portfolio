"use client";

import { dict, pick, useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 은은하게 떠다니는 포인트 컬러 블롭 */}
      <div
        aria-hidden="true"
        className="hero-blob pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="hero-blob pointer-events-none absolute -left-32 top-64 h-80 w-80 rounded-full bg-cream-deep blur-3xl"
        style={{ animationDelay: "-7s" }}
      />

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-5 pb-24 pt-28">
        <Reveal>
          <p className="text-lg font-medium text-ink-soft">{pick(dict.hero.greeting, lang)}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            {pick(dict.hero.name, lang)}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 font-serif text-2xl italic text-accent-deep md:text-3xl">
            {pick(dict.hero.role, lang)}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            {pick(dict.hero.tagline, lang)}
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5"
            >
              {pick(dict.hero.viewProjects, lang)}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-white/70 px-6 py-3 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-accent-dark"
            >
              {pick(dict.hero.contactMe, lang)}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
