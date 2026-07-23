"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { dict, pick, useLang } from "@/lib/i18n";
import { fallbackSideProjects, getSideProjects, mainProjects, type Project } from "@/lib/portfolio-data";
import AddProjectCard from "./AddProjectCard";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

/** project.date는 "2026.07" 형식이라 문자열 비교로 최신순 정렬이 가능. 날짜 없는 카드는 뒤로 보냄 */
function sortByDateDesc(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
}

export function Projects() {
  const { lang } = useLang();

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {pick(dict.projects.title, lang)}
        </h2>
        <p className="mt-3 text-ink-soft">{pick(dict.projects.subtitle, lang)}</p>
      </Reveal>

      {/* 메인 프로젝트: 2열 그리드 */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {mainProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 120}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SideProjects() {
  const { lang } = useLang();
  const [sideProjects, setSideProjects] = useState<Project[]>(fallbackSideProjects);
  const [sortByDate, setSortByDate] = useState(false);

  const reload = useCallback(() => {
    getSideProjects().then(setSideProjects);
  }, []);

  useEffect(() => {
    let cancelled = false;
    getSideProjects().then((projects) => {
      if (!cancelled) setSideProjects(projects);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayedProjects = useMemo(
    () => (sortByDate ? sortByDateDesc(sideProjects) : sideProjects),
    [sideProjects, sortByDate]
  );

  return (
    <section id="side-projects" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {pick(dict.side.title, lang)}
            </h2>
            <p className="mt-3 text-ink-soft">{pick(dict.side.subtitle, lang)}</p>
          </div>
          <button
            type="button"
            onClick={() => setSortByDate((prev) => !prev)}
            aria-pressed={sortByDate}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
              sortByDate
                ? "border-accent-dark bg-accent-soft text-accent-deep"
                : "border-line bg-white/60 text-ink-soft hover:border-accent-dark hover:text-accent-deep"
            }`}
          >
            <span aria-hidden="true">↓</span>
            {sortByDate ? pick(dict.side.sortByDate, lang) : pick(dict.side.sortDefault, lang)}
          </button>
        </div>
      </Reveal>

      {/* 사이드 프로젝트: 3열 카드 그리드 */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 100} className="relative h-full">
            <ProjectCard project={project} compact />
            <EditProjectButton project={project} onUpdated={reload} />
            <DeleteProjectButton project={project} onDeleted={reload} />
          </Reveal>
        ))}
        <Reveal delay={sideProjects.length * 100} className="h-full">
          <AddProjectCard onAdded={reload} />
        </Reveal>
      </div>
    </section>
  );
}
