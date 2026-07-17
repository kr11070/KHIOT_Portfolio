"use client";

import { dict, pick, useLang } from "@/lib/i18n";
import type { Project } from "@/lib/portfolio-data";

/** 썸네일이 없을 때 프로젝트 첫 글자로 만드는 그라데이션 플레이스홀더 */
function ThumbPlaceholder({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft via-cream-deep to-accent/40">
      <span className="select-none font-serif text-5xl italic text-accent-deep/70">
        {title.charAt(0)}
      </span>
    </div>
  );
}

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { lang } = useLang();
  const title = pick(project.title, lang);

  const links = [
    { href: project.links.caseStudy, label: pick(dict.projects.caseStudy, lang), external: false },
    { href: project.links.demo, label: pick(dict.projects.demo, lang), external: true },
    { href: project.links.github, label: pick(dict.projects.github, lang), external: true },
  ].filter((l): l is { href: string; label: string; external: boolean } => Boolean(l.href));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2.5xl border border-line bg-white/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      {/* 썸네일 */}
      <div className={`overflow-hidden ${compact ? "h-36" : "h-52"}`}>
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={`${title} 썸네일`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ThumbPlaceholder slug={project.slug} title={title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.date && (
          <p className="mb-1 text-[11px] font-bold tracking-wide text-ink-soft/70">{project.date}</p>
        )}
        <h3 className={`font-extrabold tracking-tight ${compact ? "text-lg" : "text-xl"}`}>
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
          {pick(project.description, lang)}
        </p>

        {/* 사용 기술 */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-deep"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* 링크 */}
        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="rounded-full border border-line px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-accent-dark hover:bg-accent-soft hover:text-accent-deep"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
