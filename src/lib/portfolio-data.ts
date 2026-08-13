import { collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import type { Lang } from "./i18n";
import { auth, db } from "./firebase";

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
    /** 클릭 시 새 탭 대신 파일 다운로드를 트리거합니다 (예: 디자인 시스템 md 문서). */
    download?: string;
    /** 다운로드 파일이 2개일 때 쓰는 두 번째 다운로드 링크. */
    download2?: string;
  };
};

/** Firestore `side_projects` 컬렉션의 문서 형태 (문서 ID = slug) */
type SideProjectDoc = {
  title: LocalizedText;
  description: LocalizedText;
  tech: string[];
  date?: string | null;
  thumbnail?: string | null;
  links: {
    caseStudy?: string | null;
    demo?: string | null;
    github?: string | null;
    download?: string | null;
    download2?: string | null;
  };
  sortOrder: number;
};

function fromNullable<T>(v: T | null | undefined): T | undefined {
  return v ?? undefined;
}

/**
 * 사이드 프로젝트 목록을 Firestore `side_projects` 컬렉션에서 가져옵니다.
 * Firebase가 설정되지 않았거나 조회에 실패하면 아래 fallbackSideProjects로 대체합니다.
 */
export async function getSideProjects(): Promise<Project[]> {
  if (!db) return fallbackSideProjects;

  try {
    const snap = await getDocs(query(collection(db, "side_projects"), orderBy("sortOrder", "asc")));
    if (snap.empty) return fallbackSideProjects;

    return snap.docs.map((d) => {
      const data = d.data() as SideProjectDoc;
      return {
        slug: d.id,
        title: data.title,
        description: data.description,
        tech: data.tech,
        date: fromNullable(data.date),
        thumbnail: fromNullable(data.thumbnail),
        links: {
          caseStudy: fromNullable(data.links.caseStudy),
          demo: fromNullable(data.links.demo),
          github: fromNullable(data.links.github),
          download: fromNullable(data.links.download),
          download2: fromNullable(data.links.download2),
        },
      };
    });
  } catch {
    return fallbackSideProjects;
  }
}

export type NewSideProject = {
  title: string;
  description: string;
  date?: string;
  thumbnail?: string;
  tech: string[];
  demo?: string;
  github?: string;
  download?: string;
};

/** 빈 문자열은 null로, 나머지는 trim해서 저장 (Firestore는 undefined 필드를 허용하지 않음) */
function orNull(v?: string) {
  const trimmed = v?.trim();
  return trimmed ? trimmed : null;
}

/**
 * "프로젝트 추가" 폼에서 호출. 로그인된 관리자만 Firestore에 새 문서를 만들 수 있습니다
 * (쓰기 권한은 Firestore 보안 규칙에서 request.auth로 검증).
 */
export async function addSideProject(
  input: NewSideProject
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!db || !auth) return { ok: false, message: "Firebase가 설정되지 않았습니다." };
  if (!auth.currentUser) return { ok: false, message: "로그인이 필요해요." };

  const base = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const slug = `${base || "project"}-${Date.now()}`;

  try {
    const snap = await getDocs(collection(db, "side_projects"));
    const maxSort = snap.docs.reduce((max, d) => Math.max(max, (d.data().sortOrder as number) ?? 0), 0);

    await setDoc(doc(db, "side_projects", slug), {
      title: { ko: input.title.trim(), en: input.title.trim(), ja: input.title.trim() },
      description: { ko: input.description.trim(), en: input.description.trim(), ja: input.description.trim() },
      tech: input.tech,
      date: orNull(input.date),
      thumbnail: orNull(input.thumbnail),
      links: {
        demo: orNull(input.demo),
        github: orNull(input.github),
        download: orNull(input.download),
      },
      sortOrder: maxSort + 10,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: `저장에 실패했어요: ${(error as Error).message}` };
  }
}

/**
 * 카드의 "✏️ 수정" 폼에서 호출. 로그인된 관리자만 문서를 갱신할 수 있습니다.
 */
export async function updateSideProject(
  slug: string,
  input: NewSideProject
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!db || !auth) return { ok: false, message: "Firebase가 설정되지 않았습니다." };
  if (!auth.currentUser) return { ok: false, message: "로그인이 필요해요." };

  try {
    await updateDoc(doc(db, "side_projects", slug), {
      title: { ko: input.title.trim(), en: input.title.trim(), ja: input.title.trim() },
      description: { ko: input.description.trim(), en: input.description.trim(), ja: input.description.trim() },
      tech: input.tech,
      date: orNull(input.date),
      thumbnail: orNull(input.thumbnail),
      "links.demo": orNull(input.demo),
      "links.github": orNull(input.github),
      "links.download": orNull(input.download),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: `저장에 실패했어요: ${(error as Error).message}` };
  }
}

/**
 * 카드의 "🗑️ 삭제" 버튼에서 호출. 로그인된 관리자만 문서를 삭제할 수 있습니다.
 */
export async function deleteSideProject(
  slug: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!db || !auth) return { ok: false, message: "Firebase가 설정되지 않았습니다." };
  if (!auth.currentUser) return { ok: false, message: "로그인이 필요해요." };

  try {
    await deleteDoc(doc(db, "side_projects", slug));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: `삭제에 실패했어요: ${(error as Error).message}` };
  }
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
    date: "2026.06.19 – 2026.07.02",
    thumbnail: "/images/agile-squad/thumb.png",
    links: {
      caseStudy: "/case-studies/agile-squad",
      demo: "https://hkaisproject.netlify.app",
      github: "https://github.com/kr11070/News_easymode.git",
    },
  },
  {
    slug: "group-act",
    title: {
      ko: "Group Act — AI 기반 경제 뉴스 학습 경험 개선",
      en: "Group Act — AI-Powered Economic News Learning Experience",
      ja: "Group Act — AIベース経済ニュース学習体験の改善",
    },
    description: {
      ko: "종이신문의 밑줄·메모 경험을 모바일로 확장한 AI 기반 경제 뉴스 학습 서비스 'Papertory'. 하이라이트 요약, 쉬운 기사 설명, 게임형 콘텐츠로 경제 뉴스 입문자의 진입장벽을 낮추는 프로토타입을 팀으로 완성했습니다.",
      en: "\"Papertory\" — an AI-powered economic news learning service that brings the paper-newspaper habit of underlining and note-taking to mobile. Built as a team, with AI highlight summaries, simplified articles, and game-like content that lower the entry barrier for news beginners.",
      ja: "紙の新聞で線を引きメモを取る読書体験をモバイルに拡張したAIベースの経済ニュース学習サービス「Papertory」。ハイライト要約、やさしい記事解説、ゲーム型コンテンツで経済ニュース初心者の参入障壁を下げるプロトタイプをチームで完成させました。",
    },
    tech: ["UX Research", "Figma", "React", "AI"],
    date: "2026.07.03 – 2026.07.30",
    thumbnail: "/images/group-act/thumb.webp",
    links: {
      caseStudy: "/case-studies/group-act",
      github: "https://github.com/kr11070/teamproject_groupact.git",
    },
  },
];

/** Firestore 조회 실패 시 대체로 쓰이는 정적 목록 (Firestore의 side_projects 컬렉션과 내용을 맞춰주세요) */
export const fallbackSideProjects: Project[] = [
  {
    slug: "news-reading-mode",
    title: {
      ko: "뉴스 쉬운말 모드",
      en: "News Easy-Read Mode",
      ja: "ニュースやさしい言葉モード",
    },
    description: {
      ko: "뉴스 기사를 슬라이더로 원문/쉽게읽기 2단계로 바꾸고, 외국어 기사는 한국어로 번역해주는 Chrome 확장 프로그램. 2026년 8월 웹스토어 공개를 목표로 개발 중입니다.",
      en: "A Chrome extension that toggles news articles between original and easy-read mode, and translates foreign articles into Korean. Web Store launch targeted for Aug 2026.",
      ja: "ニュース記事をスライダーで原文/やさしい読み方の2段階に切り替え、外国語記事を韓国語に翻訳するChrome拡張。2026年8月のストア公開を目指しています。",
    },
    tech: ["Chrome Extension", "JavaScript", "Netlify Functions", "Groq API"],
    date: "2026.08.12",
    thumbnail: "/images/news-reading-mode/thumb.webp",
    links: {
      github: "https://github.com/kr11070/News_easymode",
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
    date: "2026.04.15",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/portfolio/fashionapp.webm",
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
    date: "2026.04.17",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98",
    links: {
      demo: "https://marketinsight.ai.studio",
    },
  },
  {
    slug: "nipet-naepet-business-plan",
    title: {
      ko: "니펫내펫 — 반려동물 매칭 플랫폼 사업계획서",
      en: "Nipet Naepet — Pet Matching Platform Business Plan",
      ja: "ニペットネペット — ペットマッチングプラットフォーム事業計画書",
    },
    description: {
      ko: "책임 없이 반려동물과 교감할 수 있는 매칭·위탁 플랫폼의 6개월 실행 사업계획서. 서울 영등포구를 기점으로 시드 3억 원, 18개월 손익분기 시나리오를 시장 데이터 기반으로 설계했습니다.",
      en: "A 6-month business plan for a pet-matching platform that lets people bond with animals without full ownership. Seed funding of ₩300M, targeting break-even at 18 months in Seoul's Yeongdeungpo district, backed by market data.",
      ja: "責任を負わずにペットと触れ合えるマッチング・預かりプラットフォームの6ヶ月実行事業計画書。ソウル永登浦区を拠点に、シード3億ウォン、18ヶ月での損益分岐を市場データに基づいて設計しました。",
    },
    tech: ["Business Plan", "Market Research", "Claude"],
    date: "2026.04.21",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/pet.webm",
    links: {
      demo: "https://claude.ai/public/artifacts/395ba06b-8a10-47ac-8668-3e75cf6ddc56",
    },
  },
  {
    slug: "kissa-design-system",
    title: {
      ko: "喫茶 Kissa — 빈티지 디자인 시스템",
      en: "Kissa — A Vintage-Inspired Design System",
      ja: "喫茶 Kissa — ヴィンテージデザインシステム",
    },
    description: {
      ko: "일본·대만의 옛 킷사텐(다방) 감성에서 출발한 컬러·타이포그래피 디자인 시스템. Primitive → Semantic → Molecule 3단 레이어로 214개 토큰을 구성하고, 다크 모드는 Primitive 반전만으로 전환됩니다.",
      en: "A color and typography design system inspired by old Japanese/Taiwanese kissaten (tea rooms). 214 tokens across a three-layer Primitive → Semantic → Molecule structure, with dark mode achieved by simply inverting the Primitive scale.",
      ja: "日本・台湾の昔ながらの喫茶店の感性から生まれたカラー・タイポグラフィのデザインシステム。Primitive → Semantic → Moleculeの3層構造で214個のトークンを構成し、ダークモードはPrimitiveの反転だけで切り替わります。",
    },
    tech: ["Design System", "Design Tokens", "Claude"],
    date: "2026.05.14",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C",
    links: {
      demo: "https://claude.ai/public/artifacts/9f673cf7-a6ab-4807-879e-fbe8172ab2ef",
      download: "/design-system/kissa-design-system.md",
    },
  },
  {
    slug: "hankyung-eureka-ux-report",
    title: {
      ko: "한경유레카 UX 개선 리포트 — 2.0 개편 이후 구독자 분석",
      en: "Hankyung Eureka UX Report — Subscriber Impact of the 2.0 Redesign",
      ja: "韓経ユレカ UX改善レポート — 2.0リニューアル後の購読者分析",
    },
    description: {
      ko: "한경유레카 앱 2.0 개편(AI 컨센서스, 유레카 프리미엄, 알고리즘 콘텐츠 UI/UX 전면 개편) 전후로 신규 유료 구독자 추이를 2024.01~2026.06 데이터로 비교 분석한 UX 리포트입니다.",
      en: "A UX analytics report comparing new paid-subscriber trends before and after Hankyung Eureka's 2.0 redesign (AI consensus scoring, Eureka Premium, a full algorithmic content UI/UX overhaul), using Jan 2024–Jun 2026 data.",
      ja: "韓経ユレカアプリの2.0リニューアル（AIコンセンサス、ユレカプレミアム、アルゴリズムコンテンツのUI/UX全面刷新）前後で新規有料購読者の推移を2024年1月〜2026年6月のデータで比較分析したUXレポートです。",
    },
    tech: ["Data Analytics", "UX Research", "Claude"],
    date: "2026.07",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%9C%A0%EB%A0%88%EC%B9%B4",
    links: {
      demo: "https://claude.ai/public/artifacts/90dcb3f4-fc02-4c29-aae4-b600d5e95d1c",
    },
  },
  {
    slug: "magicpath-guide",
    title: {
      ko: "매직패스 가이드 — 놀이공원 날씨 동선 추천 서비스",
      en: "Magicpath Guide — Weather-Based Amusement Park Routing",
      ja: "マジックパスガイド — 天気連動アトラクション動線推薦サービス",
    },
    description: {
      ko: "실시간 날씨·혼잡도를 분석해 맞춤형 놀이공원 동선을 추천하는 서비스 콘셉트. 데이터 기반 페르소나로 사용자 니즈를 검증하고, 개요·페르소나 2개 탭으로 구성한 케이스 스터디 페이지입니다.",
      en: "A service concept that recommends personalized amusement-park routes using real-time weather and congestion data, validated with a data-driven persona — presented as a two-tab (overview/persona) case study page.",
      ja: "リアルタイムの天気・混雑度を分析してパーソナライズされたアトラクション動線を提案するサービスコンセプト。データドリブンなペルソナで検証し、概要・ペルソナの2つのタブで構成したケーススタディページです。",
    },
    tech: ["Service Design", "Figma", "UX Research", "Case Study"],
    date: "2026.05",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%86%80%EC%9D%B4%EA%B3%B5%EC%9B%90%EB%8F%99%EC%84%A0%EC%95%B1.webm",
    links: {
      caseStudy: "/case-studies/magicpath-guide",
      download: "/case-studies/magicpath-guide/놀이공원_스마트동선앱_PRD.docx",
    },
  },
  {
    slug: "food-hygiene-service",
    title: {
      ko: "AI 식품위생 관리 서비스",
      en: "AI Food Hygiene Management Service",
      ja: "AI食品衛生管理サービス",
    },
    description: {
      ko: "자영업자를 위한 AI 기반 위생 큐레이션 서비스 PRD. 일일 체크리스트 자동 생성, 위생 점수(Health Score) 산출, 카메라 기반 AI 비전 스캐너로 사고 발생 전 위험 징후를 예방합니다.",
      en: "A PRD for an AI-powered hygiene curation service for small food business owners — auto-generated daily checklists, a Health Score, and a camera-based AI vision scanner that catches risk signs before incidents happen.",
      ja: "自営業者向けのAIベース衛生キュレーションサービスのPRD。日次チェックリストの自動生成、衛生スコア（Health Score）算出、カメラベースのAIビジョンスキャナーで事故発生前にリスクの兆候を予防します。",
    },
    tech: ["PRD", "Service Design", "AI", "Case Study"],
    date: "2026.05",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/AI-%EC%9C%84%EC%83%9D%EA%B4%80%EB%A6%AC-%EC%84%9C%EB%B9%84%EC%8A%A4.webm",
    links: {
      caseStudy: "/case-studies/food-hygiene-service",
      download: "/projects/food-hygiene-service/식품위생관리서비스_PRD.docx",
      download2: "/projects/food-hygiene-service/식품위생관리서비스_PRD_상세.xlsx",
    },
  },
  {
    slug: "moonlight-journey",
    title: {
      ko: "달빛 기행 — 경주 야간 관광 앱",
      en: "Moonlight Journey — Gyeongju Night Tourism App",
      ja: "月明かり紀行 — 慶州ナイトツーリズムアプリ",
    },
    description: {
      ko: "일몰·점등 시각과 실시간 혼잡도를 알려주어 경주의 야경 명소를 가장 좋은 순간에 즐기도록 돕는 관광 앱 콘셉트. 오디오 도슨트, 별자리 지도, 날씨 기반 관측 지수로 감성적인 야간 경험을 설계했습니다.",
      en: "A tourism app concept that surfaces sunset/lighting times and real-time crowd levels so visitors catch Gyeongju's night spots at their best moment — with an audio docent, a constellation map, and a weather-based stargazing index.",
      ja: "日没・点灯時刻とリアルタイムの混雑度を知らせ、慶州の夜景スポットを最高の瞬間に楽しめるよう導く観光アプリコンセプト。オーディオドーセント、星座マップ、天気ベースの観測指数で情緒的な夜の体験を設計しました。",
    },
    tech: ["Service Design", "Figma", "Mobile App", "Case Study"],
    date: "2026.07",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%8B%AC%EB%B9%9B%EA%B8%B0%ED%96%89",
    links: {
      caseStudy: "/case-studies/moonlight-journey",
    },
  },
  {
    slug: "airbnb-dashboard",
    title: {
      ko: "에어비앤비 대시보드",
      en: "Airbnb Impact Dashboard",
      ja: "Airbnbインパクトダッシュボード",
    },
    description: {
      ko: "에어비앤비의 국내 지역경제 기여도(GDP·일자리·게스트 지출)와 비도시 예약 비중 성장을 분석하고, 2024년 영업신고 의무화 등 규제 변화에 대응하는 호스트 시장 전략을 정리한 인사이트 대시보드입니다.",
      en: "An insight dashboard analyzing Airbnb's contribution to Korea's regional economy (GDP, jobs, guest spending) and the growth of non-urban bookings, alongside host market strategies responding to 2024 business-registration regulations.",
      ja: "エアビーアンドビーの国内地域経済への貢献度（GDP・雇用・ゲスト支出）と非都市部予約の増加を分析し、2024年の営業申告義務化などの規制変化に対応するホスト向け市場戦略をまとめたインサイトダッシュボードです。",
    },
    tech: ["Market Research", "Data Analytics", "Google AI Studio"],
    date: "2026.04.16",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%97%90%EC%96%B4%EB%B9%84%EC%95%A4%EB%B9%84",
    links: {
      demo: "https://product-insight-dashboard-223453858568.us-west1.run.app",
    },
  },
  {
    slug: "titanic-survivors-dashboard",
    title: {
      ko: "타이타닉 생존자 분석 대시보드",
      en: "Titanic Survivors Analysis Dashboard",
      ja: "タイタニック生存者分析ダッシュボード",
    },
    description: {
      ko: "타이타닉 탑승객 데이터를 분석해 좌석 등급·성별·나이에 따른 생존율을 인터랙티브 차트로 시각화한 데이터 분석 대시보드입니다.",
      en: "An interactive data-analysis dashboard visualizing Titanic passenger survival rates by class, gender, and age.",
      ja: "タイタニック号の乗客データを分析し、客室クラス・性別・年齢別の生存率をインタラクティブなチャートで可視化したデータ分析ダッシュボードです。",
    },
    tech: ["Data Analytics", "Data Visualization", "Dashboard"],
    date: "2026.04.20",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89",
    links: {
      demo: "https://titanic-survivors-dashboard-223453858568.us-west1.run.app",
    },
  },
  {
    slug: "herehear-music-player",
    title: {
      ko: "HereHear — 지역맞춤 뮤직 플레이어",
      en: "HereHear — Location-Curated Music Player",
      ja: "HereHear — 位置連動ミュージックプレイヤー",
    },
    description: {
      ko: "현재 위치와 취향을 입력하면 그 지역 분위기에 맞는 음악을 추천하는 AI 큐레이션 뮤직 플레이어. Gemini API로 곡을 직접 선정하고, 좋아요·스킵 반응을 학습해 추천을 개인화합니다.",
      en: "An AI-curated music player that recommends songs matching the local mood based on your current location and taste. Gemini picks the tracks, and the app learns from likes and skips to personalize future recommendations.",
      ja: "現在地と好みを入力すると、その地域の雰囲気に合う音楽をおすすめするAIキュレーション音楽プレイヤー。Gemini APIで楽曲を選定し、いいね・スキップの反応を学習してレコメンドを個人化します。",
    },
    tech: ["JavaScript", "Gemini API", "iTunes API", "Geolocation"],
    date: "2026.06.11",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%AE%A4%EC%A7%81%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4.webm",
    links: {
      demo: "https://herehear.leejuhee010340.workers.dev",
      github: "https://github.com/kr11070/MusicPlayer_HereHear",
    },
  },
];

export type Skill = {
  name: string;
  /** 숙련도 (0~100%) */
  level: number;
};

/** About 섹션 — 스킬 목록과 숙련도. level 값은 예시이니 실제 역량에 맞게 자유롭게 수정하세요. */
export const skills: Skill[] = [
  { name: "Figma / FigJam", level: 90 },
  { name: "UX Research", level: 80 },
  { name: "Wireframing", level: 80 },
  { name: "Prototyping", level: 75 },
  { name: "Design System", level: 70 },
  { name: "Jira", level: 60 },
  { name: "Agile Scrum", level: 65 },
  { name: "HTML / CSS", level: 60 },
  { name: "JavaScript", level: 50 },
  { name: "React (기초)", level: 40 },
  { name: "Chrome Extension", level: 45 },
  { name: "AI 활용 (Groq API)", level: 55 },
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
