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
    side: { ko: "사이드 프로젝트", en: "Side Projects", ja: "サイドプロジェクト" },
    contact: { ko: "연락처", en: "Contact", ja: "連絡先" },
    resume: { ko: "이력서", en: "Resume", ja: "履歴書" },
  },
  hero: {
    greeting: { ko: "안녕하세요,", en: "Hello, I'm", ja: "こんにちは、" },
    name: { ko: "이주희입니다", en: "Lee Juhee", ja: "イ・ジュヒです" },
    role: { ko: "UI/UX 디자이너", en: "UI/UX Designer", ja: "UI/UXデザイナー" },
    tagline: {
      ko: "사용자의 이야기에서 출발해, 누구나 읽기 쉬운 경험을 설계합니다.",
      en: "Designing approachable experiences that begin with users' stories.",
      ja: "ユーザーの声から出発し、誰にでも読みやすい体験をデザインします。",
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
    introTitle: { ko: "소개", en: "Introduction", ja: "自己紹介" },
    introBody: {
      ko: "사용자 인터뷰와 데이터에서 출발해 와이어프레임, 인터랙티브 프로토타입까지 만드는 UI/UX 디자이너입니다. 애자일 스크럼 팀 협업 경험이 있고, 아이디어를 빠르게 실제로 동작하는 형태로 검증하는 것을 좋아합니다.",
      en: "I'm a UI/UX designer who moves from user interviews and data to wireframes and interactive prototypes. I've worked in agile scrum teams and love validating ideas quickly in working form.",
      ja: "ユーザーインタビューとデータから出発し、ワイヤーフレームやインタラクティブなプロトタイプまで作るUI/UXデザイナーです。アジャイルスクラムでのチーム経験があり、アイデアを素早く動く形で検証することが好きです。",
    },
    skillsTitle: { ko: "스킬 & 툴", en: "Skills & Tools", ja: "スキル＆ツール" },
    expTitle: { ko: "경험", en: "Experience", ja: "経験" },
    quote: {
      ko: "“어려운 것을 쉽게 보여주는 것이 디자인의 역할이라고 믿습니다.”",
      en: "“I believe design's job is to make the difficult feel easy.”",
      ja: "“難しいものをやさしく見せることがデザインの役割だと信じています。”",
    },
  },
  projects: {
    title: { ko: "Projects", en: "Projects", ja: "Projects" },
    subtitle: {
      ko: "팀으로 함께 만든 메인 프로젝트입니다.",
      en: "Main projects built together with a team.",
      ja: "チームで一緒に作ったメインプロジェクトです。",
    },
    caseStudy: { ko: "케이스 스터디", en: "Case Study", ja: "ケーススタディ" },
    demo: { ko: "라이브 데모", en: "Live Demo", ja: "ライブデモ" },
    github: { ko: "GitHub", en: "GitHub", ja: "GitHub" },
  },
  side: {
    title: { ko: "Side Projects", en: "Side Projects", ja: "Side Projects" },
    subtitle: {
      ko: "가볍게 만들고 꾸준히 다듬는 개인 프로젝트입니다.",
      en: "Personal projects, built light and polished steadily.",
      ja: "気軽に作り、こつこつ磨いている個人プロジェクトです。",
    },
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
