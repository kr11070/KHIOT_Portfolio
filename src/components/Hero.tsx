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

      {/* 배경을 가로지르는 초대형 고스트 타이포 — 편집 잡지 표지 같은 대담한 인상 */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] select-none whitespace-nowrap text-center font-extrabold leading-none tracking-tighter text-ink/[0.05]"
        style={{ fontSize: "clamp(6rem, 19vw, 15rem)" }}
      >
        PORTFOLIO
      </p>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-5 pb-24 pt-28">
        {/* 작게 기울인 배지 — 대담한 타이포와 균형을 잡아주는 디테일 */}
        <Reveal>
          <span className="inline-flex w-fit -rotate-2 items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-xs font-bold tracking-wide text-accent-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            2026 PORTFOLIO
          </span>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 text-lg font-medium text-ink-soft">{pick(dict.hero.greeting, lang)}</p>
        </Reveal>
        <Reveal delay={160}>
          <h1 className="mt-2 text-6xl font-extrabold leading-[0.95] tracking-tighter md:text-8xl">
            {pick(dict.hero.name, lang)}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 font-serif text-2xl italic text-accent-deep md:text-3xl">
            {pick(dict.hero.role, lang)}
          </p>
        </Reveal>
        <Reveal delay={320}>
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

        {/* 스크롤 유도 인디케이터 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-ink/20 p-1.5">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-ink/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
