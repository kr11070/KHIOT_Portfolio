import type { Lang } from "./i18n";
import { supabase } from "./supabase";

export type LocalizedText = Record<Lang, string>;

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  tech: string[];
  /** 카드에 표시할 날짜 (예: "2026.07"). 없으면 표시되지 않습니다. */
  date?: string;
  /** public/ 기준 경로 (예: "/images/agile-squad/thumb.png"). 없으면 그라데이션 플레이스홀더가 대신 표시됩니다. */
  thumbnail?: string;
  links: {
    caseStudy?: string;
    demo?: string;
    github?: string;
  };
};

/** Supabase `side_projects` 테이블의 row 형태 */
type SideProjectRow = {
  slug: string;
  title_ko: string;
  title_en: string;
  title_ja: string;
  description_ko: string;
  description_en: string;
  description_ja: string;
  tech: string[];
  thumbnail: string | null;
  link_case_study: string | null;
  link_demo: string | null;
  link_github: string | null;
  project_date?: string | null;
};

function mapSideProjectRow(row: SideProjectRow): Project {
  return {
    slug: row.slug,
    // 폼으로 추가한 카드는 한국어만 있을 수 있으므로 en/ja가 비면 ko로 대체
    title: { ko: row.title_ko, en: row.title_en || row.title_ko, ja: row.title_ja || row.title_ko },
    description: {
      ko: row.description_ko,
      en: row.description_en || row.description_ko,
      ja: row.description_ja || row.description_ko,
    },
    tech: row.tech,
    date: row.project_date ?? undefined,
    thumbnail: row.thumbnail ?? undefined,
    links: {
      caseStudy: row.link_case_study ?? undefined,
      demo: row.link_demo ?? undefined,
      github: row.link_github ?? undefined,
    },
  };
}

/**
 * 사이드 프로젝트 목록을 Supabase `side_projects` 테이블에서 가져옵니다.
 * Supabase가 설정되지 않았거나 조회에 실패하면 아래 fallbackSideProjects로 대체합니다.
 */
export async function getSideProjects(): Promise<Project[]> {
  if (!supabase) return fallbackSideProjects;

  const { data, error } = await supabase
    .from("side_projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackSideProjects;

  return (data as SideProjectRow[]).map(mapSideProjectRow);
}

export type NewSideProject = {
  title: string;
  description: string;
  date?: string;
  thumbnail?: string;
  tech: string[];
  demo?: string;
  github?: string;
};

/**
 * "프로젝트 추가" 폼에서 호출. Supabase의 add_side_project 함수(RPC)로 저장하며,
 * 비밀번호 검증은 Supabase 쪽에서 이뤄집니다 (supabase/add_project_form.sql 참고).
 */
export async function addSideProject(
  input: NewSideProject,
  password: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!supabase) return { ok: false, message: "Supabase가 설정되지 않았습니다." };

  const base = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const slug = `${base || "project"}-${Date.now()}`;

  const { error } = await supabase.rpc("add_side_project", {
    p_password: password,
    p_slug: slug,
    p_title: input.title.trim(),
    p_description: input.description.trim(),
    p_date: input.date?.trim() || null,
    p_thumbnail: input.thumbnail?.trim() || null,
    p_tech: input.tech,
    p_demo: input.demo?.trim() || null,
    p_github: input.github?.trim() || null,
  });

  if (error) {
    if (error.message.includes("ADMIN_PASSWORD_MISMATCH"))
      return { ok: false, message: "비밀번호가 올바르지 않아요." };
    if (error.code === "PGRST202")
      return {
        ok: false,
        message: "추가 기능이 아직 설정되지 않았어요. supabase/add_project_form.sql을 실행해주세요.",
      };
    return { ok: false, message: `저장에 실패했어요: ${error.message}` };
  }
  return { ok: true };
}

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

/** Supabase 조회 실패 시 대체로 쓰이는 정적 목록 (side_projects 테이블 초기 시드와 내용을 맞춰주세요) */
export const fallbackSideProjects: Project[] = [
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
  {
    slug: "clothing-app-ux-research",
    title: {
      ko: "의류 쇼핑 앱 UX 리서치",
      en: "Clothing Shopping App UX Research",
      ja: "衣類ショッピングアプリ UXリサーチ",
    },
    description: {
      ko: "사용자 인터뷰 1건을 진행해 사이즈 정보 부정확, 색상 왜곡, 리뷰 신뢰도 부족 등 8개의 페인포인트를 도출하고 해결 우선순위를 정리한 UX 리서치 리포트입니다.",
      en: "A UX research report built from a single user interview, surfacing 8 pain points — inaccurate size info, color distortion, low review trust, and more — with prioritized solutions.",
      ja: "ユーザーインタビュー1件から、サイズ情報の不正確さや色の歪み、レビューの信頼性不足など8つのペインポイントを導き出し、解決の優先順位を整理したUXリサーチレポートです。",
    },
    tech: ["UX Research", "User Interview", "Claude"],
    date: "2026.04",
    links: {
      demo: "https://claude.ai/public/artifacts/72008362-d10e-471e-92b3-80b040bba396",
    },
  },
  {
    slug: "secondhand-app-market-analysis",
    title: {
      ko: "중고거래 앱 창업 시장 분석",
      en: "Secondhand App Market Analysis",
      ja: "中古取引アプリ市場分析",
    },
    description: {
      ko: "당근마켓·중고나라·번개장터의 경쟁사 포지셔닝과 TAM/SAM/SOM 시장 규모, 3년 수익 시나리오까지 정리한 신규 창업 분석 대시보드입니다.",
      en: "A startup analysis dashboard covering competitor positioning (Danggeun, Joonggonara, Bunjang), TAM/SAM/SOM market sizing, and a 3-year revenue scenario.",
      ja: "競合ポジショニングとTAM/SAM/SOM市場規模、3年間の収益シナリオまでまとめた新規創業分析ダッシュボードです。",
    },
    tech: ["Market Research", "TAM/SAM/SOM", "Claude"],
    date: "2026.07",
    links: {
      demo: "https://claude.ai/public/artifacts/e2540493-822c-4882-b54e-d021aa4d11b8",
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
