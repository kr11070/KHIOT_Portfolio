import type { Lang } from "./i18n";

export type LocalizedText = Record<Lang, string>;

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  tech: string[];
  /** public/ 기준 경로 (예: "/images/agile-squad/thumb.png"). 없으면 그라데이션 플레이스홀더가 대신 표시됩니다. */
  thumbnail?: string;
  links: {
    caseStudy?: string;
    demo?: string;
    github?: string;
  };
};

/**
 * ── 프로젝트 카드 추가 방법 ──
 * 아래 배열에 객체를 하나 추가하면 카드가 자동으로 늘어납니다.
 * title/description은 ko/en/ja 세 언어를 모두 채워주세요.
 */
export const mainProjects: Project[] = [
  {
    slug: "agile-squad",
    title: {
      ko: "Agile Squad — 한경 뉴스 리딩 경험 개선",
      en: "Agile Squad — Hankyung News Reading Experience",
      ja: "Agile Squad — 韓経ニュース読書体験の改善",
    },
    description: {
      ko: "2030 신규 사용자를 위한 경제 뉴스 앱 UX/UI. 사용자 리서치부터 읽기 난이도 슬라이더가 있는 인터랙티브 프로토타입까지 팀으로 완성했습니다.",
      en: "Economic-news app UX/UI for young readers — from user research to an interactive prototype with a reading-level slider, built as a scrum team.",
      ja: "20〜30代の新規ユーザー向け経済ニュースアプリのUX/UI。ユーザーリサーチから読みやすさスライダー付きプロトタイプまでチームで完成させました。",
    },
    tech: ["Figma", "UX Research", "Agile Scrum", "React", "Vite"],
    links: {
      caseStudy: "/case-studies/agile-squad",
      demo: "https://agileprojectprototype.netlify.app",
      github: "https://github.com/kr11070/KHIOT_Portfolio/tree/main/design-assets/agile-squad",
    },
  },
  {
    slug: "group-act",
    title: {
      ko: "Group Act — 팀 프로젝트",
      en: "Group Act — Team Project",
      ja: "Group Act — チームプロジェクト",
    },
    description: {
      ko: "케이스 스터디를 준비 중입니다. 곧 자세한 과정과 결과물을 공개할 예정이에요.",
      en: "Case study in progress — detailed process and outcomes coming soon.",
      ja: "ケーススタディを準備中です。詳しいプロセスと成果物を近日公開予定です。",
    },
    tech: ["UX Research", "Figma"],
    links: {
      caseStudy: "/case-studies/group-act",
    },
  },
];

export const sideProjects: Project[] = [
  {
    slug: "news-reading-mode",
    title: {
      ko: "뉴스 쉬운말 모드",
      en: "News Easy-Read Mode",
      ja: "ニュースやさしい言葉モード",
    },
    description: {
      ko: "뉴스 기사를 슬라이더로 3단계 읽기 난이도로 바꾸고, 외국어 기사는 한국어로 번역해주는 Chrome 확장 프로그램. 2026년 8월 웹스토어 공개를 목표로 개발 중입니다.",
      en: "A Chrome extension that adjusts news articles across three reading levels and translates foreign articles into Korean. Web Store launch targeted for Aug 2026.",
      ja: "ニュース記事をスライダーで3段階の読みやすさに変換し、外国語記事を韓国語に翻訳するChrome拡張。2026年8月のストア公開を目指しています。",
    },
    tech: ["Chrome Extension", "JavaScript", "Netlify Functions", "Groq API"],
    links: {
      demo: "/projects/news-reading-mode/index.html",
      github: "https://github.com/kr11070/KHIOT_Portfolio/tree/main/public/projects/news-reading-mode",
    },
  },
];

/** About 섹션 — 스킬 목록. 자유롭게 수정하세요. */
export const skills: string[] = [
  "Figma / FigJam",
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Design System",
  "Jira",
  "Agile Scrum",
  "HTML / CSS",
  "JavaScript",
  "React (기초)",
  "Chrome Extension",
  "AI 활용 (Groq API)",
];

export type ExperienceItem = {
  period: string;
  title: LocalizedText;
  detail: LocalizedText;
};

/** About 섹션 — 경험 타임라인. 실제 경력에 맞게 수정하세요. */
export const experiences: ExperienceItem[] = [
  {
    period: "2026.06 – 2026.07",
    title: {
      ko: "프로젝트 기반 UXUI 디자인 실전 캠프 5기",
      en: "Project-based UX/UI Design Bootcamp (5th)",
      ja: "プロジェクト型UX/UIデザイン実践キャンプ 5期",
    },
    detail: {
      ko: "Agile Squad 팀 — UX 리서치, 프로토타이핑, 스크럼 회의록",
      en: "Team Agile Squad — UX research, prototyping, scrum documentation",
      ja: "Agile Squadチーム — UXリサーチ、プロトタイピング、スクラム議事録",
    },
  },
  {
    period: "2026",
    title: {
      ko: "Group Act 팀 프로젝트",
      en: "Group Act Team Project",
      ja: "Group Act チームプロジェクト",
    },
    detail: {
      ko: "케이스 스터디 준비 중",
      en: "Case study in progress",
      ja: "ケーススタディ準備中",
    },
  },
  {
    period: "2026 –",
    title: {
      ko: "개인 프로젝트 — 뉴스 쉬운말 모드",
      en: "Personal Project — News Easy-Read Mode",
      ja: "個人プロジェクト — ニュースやさしい言葉モード",
    },
    detail: {
      ko: "Chrome 확장 기획·디자인·개발, 웹스토어 공개 준비",
      en: "Planning, design & development of a Chrome extension; preparing Web Store launch",
      ja: "Chrome拡張の企画・デザイン・開発、ストア公開準備",
    },
  },
];

/** 연락처/소셜 링크 — 실제 주소가 정해지면 여기만 바꾸면 됩니다. null이면 화면에 표시되지 않습니다. */
export const contactLinks = {
  email: "leejuhee010340@gmail.com",
  github: "https://github.com/kr11070",
  linkedin: null as string | null,
  instagram: null as string | null,
};

/** 이력서 PDF 경로 — public/resume.pdf 자리에 파일을 넣어주세요. */
export const resumeUrl = "/resume.pdf";
