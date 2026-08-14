"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "ko" | "en" | "ja";

export const LANGS: Lang[] = ["ko", "en", "ja"];
export const LANG_LABELS: Record<Lang, string> = { ko: "한", en: "EN", ja: "日" };

/** UI 문구 사전. 새 문구가 필요하면 여기에 ko/en/ja 세 언어로 추가하세요. */
export const dict = {
  nav: {
    about: { ko: "소개", en: "About", ja: "紹介" },
    projects: { ko: "프로젝트", en: "Projects", ja: "プロジェクト" },
    side: { ko: "케이스 스터디", en: "Case Study", ja: "ケーススタディ" },
    contact: { ko: "연락처", en: "Contact", ja: "連絡先" },
    resume: { ko: "이력서", en: "Resume", ja: "履歴書" },
  },
  hero: {
    greeting: { ko: "안녕하세요,", en: "Hello, I'm", ja: "こんにちは、" },
    name: { ko: "이주희입니다", en: "Lee Juhee", ja: "イ・ジュヒです" },
    role: { ko: "Product Designer", en: "Product Designer", ja: "Product Designer" },
    tagline: {
      ko: "사용자 경험을 빚는 유저 인터페이스 디자인을 하고있습니다.",
      en: "Crafting user experiences through interface design.",
      ja: "ユーザー体験を形づくるUIデザインをしています。",
    },
    viewProjects: { ko: "프로젝트 보기", en: "View Projects", ja: "プロジェクトを見る" },
    contactMe: { ko: "연락하기", en: "Get in Touch", ja: "お問い合わせ" },
  },
  about: {
    title: { ko: "About Me", en: "About Me", ja: "About Me" },
    subtitle: {
      ko: "리서치로 문제를 찾고, 프로토타입으로 답을 확인합니다.",
      en: "I find problems through research and validate answers with prototypes.",
      ja: "リサーチで課題を見つけ、プロトタイプで答えを確かめます。",
    },
    skillsTitle: { ko: "스킬 & 툴", en: "Skills & Tools", ja: "スキル＆ツール" },
    expTitle: { ko: "타임라인", en: "Timeline", ja: "タイムライン" },
  },
  me: {
    title: { ko: "저는 주희입니다.", en: "I'm Juhee.", ja: "私はジュヒです。" },
    roleTitle: { ko: "디자이너 주희는", en: "As a designer, Juhee", ja: "デザイナー、ジュヒは" },
    body: {
      ko: "사용자 인터뷰와 데이터에서 출발해 와이어프레임, 인터랙티브 프로토타입까지 만드는 UI/UX 디자이너입니다. 애자일 스크럼과 그룹 액트 팀 협업 경험이 있고, 아이디어를 실제로 동작하는 형태로 빠르게 검증합니다.\n\n디자인 밖에서 마주치는 것들, 예를 들면 좋아하는 음악이나 못 먹는 음식, 우연히 알게 된 사람들의 이야기 같은 것들도 결국은 다 관찰과 공감의 연습이라고 생각합니다.",
      en: "I'm a UI/UX designer who moves from user interviews and data to wireframes and interactive prototypes. I've worked in Agile Scrum and on the Group Act team, and I like to quickly validate ideas in a working form.\n\nThings outside of design, like music I love, foods I can't stand, or stories from people I met by chance, are all, in the end, practice in observation and empathy.",
      ja: "ユーザーインタビューとデータから出発し、ワイヤーフレームやインタラクティブなプロトタイプまで作るUI/UXデザイナーです。アジャイルスクラムとGroup Actチームでの協業経験があり、アイデアを素早く実際に動く形で検証します。\n\nデザインの外で出会うもの、例えば好きな音楽や苦手な食べ物、偶然知った人々の物語のようなものも、結局はすべて観察と共感の練習だと思っています。",
    },
  },
  inspiration: {
    title: { ko: "Inspiration", en: "Inspiration", ja: "Inspiration" },
    subtitle: {
      ko: "일상에서 우연히 만나 오래 눈에 남은 것들을 모아둔 자리입니다. 좋은 디자인을 만들기 위한 재료이자 연료입니다.",
      en: "A small collection of things I've come across in everyday life and couldn't stop thinking about — the raw material and fuel behind good design.",
      ja: "日常でふと出会い、長く心に残ったものを集めた場所です。良いデザインをつくるための材料であり燃料です。",
    },
  },
  projects: {
    title: { ko: "Projects", en: "Projects", ja: "Projects" },
    subtitle: {
      ko: "팀으로 함께 만든 메인 프로젝트입니다.",
      en: "Main projects built together with a team.",
      ja: "チームで一緒に作ったメインプロジェクトです。",
    },
    caseStudy: { ko: "상세 보기", en: "View Details", ja: "詳細を見る" },
    demo: { ko: "라이브 데모", en: "Live Demo", ja: "ライブデモ" },
    github: { ko: "GitHub", en: "GitHub", ja: "GitHub" },
    download: { ko: "파일 다운로드", en: "Download File", ja: "ファイルダウンロード" },
  },
  side: {
    title: { ko: "케이스 스터디", en: "Case Study", ja: "ケーススタディ" },
    subtitle: {
      ko: "가볍게 만들고 꾸준히 다듬는 개인 프로젝트입니다.",
      en: "Personal projects, built light and polished steadily.",
      ja: "気軽に作り、こつこつ磨いている個人プロジェクトです。",
    },
    sortByDate: { ko: "최신순", en: "Latest First", ja: "新着順" },
    sortDefault: { ko: "오래된순", en: "Oldest First", ja: "古い順" },
  },
  contact: {
    title: { ko: "Contact", en: "Contact", ja: "Contact" },
    subtitle: {
      ko: "프로젝트 제안, 채용 문의 모두 환영합니다.",
      en: "Open to project proposals and job opportunities.",
      ja: "プロジェクトのご提案・採用のご連絡、歓迎します。",
    },
    emailBtn: { ko: "이메일 보내기", en: "Send an Email", ja: "メールを送る" },
  },
  footer: {
    copyright: {
      ko: "© 2026 Lee Juhee. 직접 설계하고 만들었습니다.",
      en: "© 2026 Lee Juhee. Designed & built by me.",
      ja: "© 2026 Lee Juhee. 自らデザイン・制作しました。",
    },
  },
} as const;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue>({ lang: "ko", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // 마지막으로 고른 언어를 기억해뒀다가 다음 방문 때 그대로 적용
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-lang");
    if (saved === "ko" || saved === "en" || saved === "ja") setLangState(saved);
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem("portfolio-lang", next);
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** { ko, en, ja } 객체에서 현재 언어의 문자열을 꺼내는 헬퍼 */
export function pick<T extends Record<Lang, string>>(obj: T, lang: Lang): string {
  return obj[lang];
}
