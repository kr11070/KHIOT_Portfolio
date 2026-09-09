"use client";

import { useRef, type ReactNode } from "react";
import { dict, pick, useLang } from "@/lib/i18n";
import type { Project } from "@/lib/portfolio-data";

const VIDEO_THUMBNAIL_PATTERN = /\.(mp4|webm|mov)(\?.*)?$/i;

/** 썸네일 래퍼 — 라이브 데모 링크가 있으면 클릭 시 새 탭으로 바로 이동 */
function Thumb({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

/** 썸네일이 없을 때 프로젝트 첫 글자로 만드는 그라데이션 플레이스홀더 */
function ThumbPlaceholder({ title }: { title: string }) {
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
  hideCaseStudyLink = false,
}: {
  project: Project;
  compact?: boolean;
  /** 메인 프로젝트 카드에서는 "상세 보기" 칩을 숨깁니다. */
  hideCaseStudyLink?: boolean;
}) {
  const { lang } = useLang();
  const title = pick(project.title, lang);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 다운로드 파일이 2개면 확장자를 붙여 구분 (예: "파일 다운로드 (DOCX)")
  const downloadLabel = pick(dict.projects.download, lang);
  const fileExt = (href?: string) => href?.split(".").pop()?.toUpperCase();
  const hasTwoDownloads = Boolean(project.links.download && project.links.download2);

  const links = [
    {
      href: hideCaseStudyLink ? undefined : project.links.caseStudy,
      label: pick(dict.projects.caseStudy, lang),
      external: false,
      download: false,
    },
    {
      href: project.links.demo,
      label: project.links.demoLabel ? pick(project.links.demoLabel, lang) : pick(dict.projects.demo, lang),
      external: true,
      download: false,
    },
    { href: project.links.github, label: pick(dict.projects.github, lang), external: true, download: false },
    {
      href: project.links.download,
      label: hasTwoDownloads ? `${downloadLabel} (${fileExt(project.links.download)})` : downloadLabel,
      external: false,
      download: true,
    },
    {
      href: project.links.download2,
      label: `${downloadLabel} (${fileExt(project.links.download2)})`,
      external: false,
      download: true,
    },
  ].filter(
    (l): l is { href: string; label: string; external: boolean; download: boolean } => Boolean(l.href)
  );

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2.5xl border border-line bg-white/70 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
    >
      {/* 썸네일 — 라이브 데모 링크가 있으면 클릭 시 바로 이동 */}
      <Thumb href={project.links.demo} className={`relative overflow-hidden ${compact ? "h-36" : "h-52"}`}>
        {project.thumbnail ? (
          VIDEO_THUMBNAIL_PATTERN.test(project.thumbnail) ? (
            <video
              ref={videoRef}
              src={project.thumbnail}
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail}
              alt={`${title} 썸네일`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <ThumbPlaceholder title={title} />
        )}
        {project.date && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-cream backdrop-blur-sm">
            {project.date}
          </span>
        )}
      </Thumb>

      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-6"}`}>
        <h3 className={`font-extrabold tracking-tight ${compact ? "text-lg" : "text-xl"}`}>{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {pick(project.description, lang)}
        </p>

        {/* 기술 태그 — 인스타그램 해시태그처럼 설명 바로 아래에 */}
        {project.tech.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold text-accent-deep">
            {project.tech.map((t) => (
              <span key={t}>#{t.replace(/\s+/g, "")}</span>
            ))}
          </p>
        )}

        {/* 링크 — 첫 번째는 강조된 버튼, 나머지는 아웃라인 */}
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                download={link.download}
                className={
                  i === 0
                    ? "rounded-full bg-accent-dark px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-accent"
                    : "rounded-full border border-line px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-accent-dark hover:bg-accent-soft hover:text-accent-deep"
                }
              >
                {link.label} {link.download ? "↓" : "↗"}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
