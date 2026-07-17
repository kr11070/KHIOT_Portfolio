"use client";

import { useEffect, useState } from "react";
import { dict, pick, useLang } from "@/lib/i18n";
import { fallbackSideProjects, getSideProjects, mainProjects, type Project } from "@/lib/portfolio-data";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

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

  useEffect(() => {
    let cancelled = false;
    getSideProjects().then((projects) => {
      if (!cancelled) setSideProjects(projects);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="side-projects" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {pick(dict.side.title, lang)}
        </h2>
        <p className="mt-3 text-ink-soft">{pick(dict.side.subtitle, lang)}</p>
      </Reveal>

      {/* 사이드 프로젝트: 3열 카드 그리드 */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sideProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 100}>
            <ProjectCard project={project} compact />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
