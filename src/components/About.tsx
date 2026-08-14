"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dict, pick, useLang, type Lang } from "@/lib/i18n";
import {
  experiences,
  fallbackSideProjects,
  fallbackSkills,
  getSkills,
  meProfileImage,
  type LocalizedText,
  type Skill,
} from "@/lib/portfolio-data";
import Reveal from "./Reveal";

/** 경험(experiences)과 케이스 스터디를 한 타임라인에서 함께 다루기 위한 공통 형태 */
type TimelineSource = {
  period: string;
  title: LocalizedText;
  detail?: LocalizedText;
  href?: string;
  /** 이 기간 안에서 진행한 하위 팀 프로젝트들 (예: 캠프 안의 Agile Squad·Group Act) */
  subProjects?: { period: string; title: LocalizedText; detail?: LocalizedText }[];
};

/** 케이스 스터디 페이지가 연결된 사이드 프로젝트만 타임라인에 노출합니다. */
const caseStudySources: TimelineSource[] = fallbackSideProjects
  .filter((p) => p.date && p.links.caseStudy)
  .map((p) => ({ period: p.date!, title: p.title, href: p.links.caseStudy }));

type ParsedSource = { source: TimelineSource; start: Date; end: Date | null; isMilestone: boolean };
type RangeEntry = { range: ParsedSource; milestones: ParsedSource[] };

const FAR_FUTURE = new Date(8640000000000000);

/** "2025.01 – 2025.12" / "2025.03" / "2026.07 –" 형태의 period 문자열을 날짜 범위로 파싱합니다. */
function parsePeriod(period: string): { start: Date; end: Date | null; isMilestone: boolean } {
  const raw = period.split("–").map((s) => s.trim());
  const parseDate = (s: string) => {
    const [y, m, d] = s.split(".").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  const start = parseDate(raw[0]);
  if (raw.length === 1) return { start, end: start, isMilestone: true };
  return { start, end: raw[1] ? parseDate(raw[1]) : null, isMilestone: false };
}

type TimelineNode =
  | { type: "milestone"; start: Date; item: ParsedSource }
  | { type: "single"; start: Date; entry: RangeEntry };

/** 특정 시점(졸업, 케이스 스터디 등)을 해당 기간에 속한 항목의 하위 항목으로 붙여서 타임라인 노드를 만듭니다. */
function buildTimelineNodes(sources: TimelineSource[]): TimelineNode[] {
  const parsed = sources.map((source) => ({ source, ...parsePeriod(source.period) }));
  const ranges = parsed.filter((p) => !p.isMilestone);
  const milestones = parsed
    .filter((p) => p.isMilestone)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const effectiveEnd = (p: ParsedSource) => p.end ?? FAR_FUTURE;

  const milestonesByRange = new Map<number, ParsedSource[]>();
  const standaloneMilestones: ParsedSource[] = [];
  milestones.forEach((m) => {
    // 여러 기간에 겹칠 경우, 가장 기간이 짧은(가장 구체적인) 항목의 하위로 붙입니다.
    let idx = -1;
    let bestDuration = Infinity;
    ranges.forEach((r, i) => {
      if (r.start <= m.start && m.start <= effectiveEnd(r)) {
        const duration = effectiveEnd(r).getTime() - r.start.getTime();
        if (duration < bestDuration) {
          bestDuration = duration;
          idx = i;
        }
      }
    });
    if (idx === -1) standaloneMilestones.push(m);
    else milestonesByRange.set(idx, [...(milestonesByRange.get(idx) ?? []), m]);
  });

  const nodes: TimelineNode[] = ranges.map((range, i) => ({
    type: "single",
    start: range.start,
    entry: { range, milestones: milestonesByRange.get(i) ?? [] },
  }));
  standaloneMilestones.forEach((m) => {
    nodes.push({ type: "milestone", start: m.start, item: m });
  });

  return nodes.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** 사진이 없을 때 대신 보여주는 자리 표시자 */
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft via-cream-deep to-accent/40">
      <span className="select-none font-serif text-3xl italic text-accent-deep/70">{label}</span>
    </div>
  );
}

/** 스킬 데이터 로딩 중 보여줄 자리 표시자. 실제 목록과 뒤바뀌는 느낌을 없애기 위해 fallback을 바로 그리지 않습니다. */
function SkillsSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex animate-pulse items-center gap-4">
          <span className="h-4 w-32 shrink-0 rounded bg-line sm:w-36" />
          <span className="h-2 flex-1 rounded-full bg-line" />
        </div>
      ))}
    </div>
  );
}

/** 졸업 같은 경험 마일스톤과, 케이스 스터디 페이지로 연결되는 마일스톤을 함께 렌더링합니다. */
function MilestoneRow({ item, lang }: { item: ParsedSource; lang: Lang }) {
  const title = pick(item.source.title, lang);
  const content = item.source.href ? (
    <Link href={item.source.href} className="text-accent-deep underline decoration-accent-soft underline-offset-2 hover:text-ink">
      {title}
    </Link>
  ) : (
    <span className="text-ink-soft">{title}</span>
  );
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 text-sm">
      <span className="font-semibold text-ink-faint">{item.source.period}</span>
      {content}
    </li>
  );
}

/** 기간 항목 한 줄(제목·상세) + 하위 팀 프로젝트 + 마일스톤(케이스 스터디 등)을 함께 렌더링합니다. */
function RangeRow({ entry, lang }: { entry: RangeEntry; lang: Lang }) {
  const { source } = entry.range;
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <span className="w-28 shrink-0 text-sm font-semibold text-ink-faint">{source.period}</span>
        <div>
          <p className="font-bold">{pick(source.title, lang)}</p>
          {source.detail && <p className="mt-0.5 text-sm text-ink-soft">{pick(source.detail, lang)}</p>}
        </div>
      </div>
      {entry.milestones.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-l border-dashed border-accent-soft pl-4 sm:ml-[8.5rem]">
          {entry.milestones.map((m, mi) => (
            <MilestoneRow key={mi} item={m} lang={lang} />
          ))}
        </ul>
      )}
      {source.subProjects && source.subProjects.length > 0 && (
        <ol className="mt-3 space-y-3 border-l border-accent-soft pl-4 sm:ml-[8.5rem]">
          {source.subProjects.map((sp, spi) => (
            <li key={spi} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <span className="w-20 shrink-0 text-xs font-semibold text-ink-faint">{sp.period}</span>
              <div>
                <p className="text-sm font-bold text-ink-soft">{pick(sp.title, lang)}</p>
                {sp.detail && <p className="text-xs text-ink-faint">{pick(sp.detail, lang)}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function About() {
  const { lang } = useLang();
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const timelineNodes = buildTimelineNodes([...experiences, ...caseStudySources]);

  useEffect(() => {
    let cancelled = false;
    getSkills().then((s) => {
      if (!cancelled) setSkills(s.length > 0 ? s : fallbackSkills);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {pick(dict.about.title, lang)}
        </h2>
        <p className="mt-3 text-ink-soft">{pick(dict.about.subtitle, lang)}</p>
      </Reveal>

      {/* 저는 주희입니다 — 카드(둥근 모서리·그림자) 없이 배경색만으로 구분. 배경만 화면 끝까지 풀블리드,
          콘텐츠 박스는 섹션과 같은 max-w-5xl 기준이라 스킬/경험 카드와 폭이 정확히 일치합니다. */}
      <Reveal delay={100}>
        <div className="relative mt-10">
          <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-accent-soft" />
          <div className="grid gap-8 py-12 md:grid-cols-2 md:py-16">
            <div className="h-64 overflow-hidden rounded-2.5xl md:h-full">
              {meProfileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meProfileImage} alt="이주희" className="h-full w-full object-cover" />
              ) : (
                <ImagePlaceholder label="주희" />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                {pick(dict.me.title, lang)}
              </h2>
              <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-accent-deep">
                {pick(dict.me.roleTitle, lang)}
              </h3>
              <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
                {pick(dict.me.body, lang)
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 벤토 그리드: 스킬 / 경험(넓게) */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-3" delay={150}>
          <div className="rounded-2.5xl border border-line bg-white/70 p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-deep">
              {pick(dict.about.skillsTitle, lang)}
            </h3>
            {skills === null ? (
              <SkillsSkeleton />
            ) : (
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
            )}
          </div>
        </Reveal>

        <Reveal className="md:col-span-3" delay={250}>
          <div className="rounded-2.5xl border border-line bg-white/70 p-7 shadow-card transition-shadow hover:shadow-card-hover">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-deep">
              {pick(dict.about.expTitle, lang)}
            </h3>
            <ol className="relative mt-6 space-y-6 border-l-2 border-accent-soft pl-6">
              {timelineNodes.map((node, i) => {
                if (node.type === "milestone") {
                  return (
                    <li key={i} className="relative">
                      <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent-deep" />
                      <ul>
                        <MilestoneRow item={node.item} lang={lang} />
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={i} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent-dark" />
                    <RangeRow entry={node.entry} lang={lang} />
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
