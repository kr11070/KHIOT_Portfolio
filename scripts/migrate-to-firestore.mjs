// 일회성 마이그레이션 스크립트: portfolio-data.ts의 fallbackSideProjects를 Firestore로 옮깁니다.
// 실행 전 Firestore 보안 규칙을 임시로 "allow write: if true"로 열어둔 상태여야 합니다.
// 실행: node scripts/migrate-to-firestore.mjs

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT9zHfw9qZtGql1m0r7UgC5ta-zERSi-8",
  authDomain: "khiot-3c540.firebaseapp.com",
  projectId: "khiot-3c540",
  storageBucket: "khiot-3c540.firebasestorage.app",
  messagingSenderId: "564537764144",
  appId: "1:564537764144:web:fdf79519e211e69e3980f5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// portfolio-data.ts의 fallbackSideProjects와 동일한 내용
const projects = [
  {
    slug: "news-reading-mode",
    title: { ko: "뉴스 쉬운말 모드", en: "News Easy-Read Mode", ja: "ニュースやさしい言葉モード" },
    description: {
      ko: "뉴스 기사를 슬라이더로 3단계 읽기 난이도로 바꾸고, 외국어 기사는 한국어로 번역해주는 Chrome 확장 프로그램. 2026년 8월 웹스토어 공개를 목표로 개발 중입니다.",
      en: "A Chrome extension that adjusts news articles across three reading levels and translates foreign articles into Korean. Web Store launch targeted for Aug 2026.",
      ja: "ニュース記事をスライダーで3段階の読みやすさに変換し、外国語記事を韓国語に翻訳するChrome拡張。2026年8月のストア公開を目指しています。",
    },
    tech: ["Chrome Extension", "JavaScript", "Netlify Functions", "Groq API"],
    date: null,
    thumbnail: null,
    links: {
      caseStudy: null,
      demo: "/projects/news-reading-mode/index.html",
      github: "https://github.com/kr11070/KHIOT_Portfolio/tree/main/public/projects/news-reading-mode",
      download: null,
      download2: null,
    },
  },
  {
    slug: "clothing-app-ux-research",
    title: { ko: "의류 쇼핑 앱 UX 리서치", en: "Clothing Shopping App UX Research", ja: "衣類ショッピングアプリ UXリサーチ" },
    description: {
      ko: "사용자 인터뷰 1건을 진행해 사이즈 정보 부정확, 색상 왜곡, 리뷰 신뢰도 부족 등 8개의 페인포인트를 도출하고 해결 우선순위를 정리한 UX 리서치 리포트입니다.",
      en: "A UX research report built from a single user interview, surfacing 8 pain points — inaccurate size info, color distortion, low review trust, and more — with prioritized solutions.",
      ja: "ユーザーインタビュー1件から、サイズ情報の不正確さや色の歪み、レビューの信頼性不足など8つのペインポイントを導き出し、解決の優先順位を整理したUXリサーチレポートです。",
    },
    tech: ["UX Research", "User Interview", "Claude"],
    date: "2026.04",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/portfolio/fashionapp.webm",
    links: { caseStudy: null, demo: "https://claude.ai/public/artifacts/72008362-d10e-471e-92b3-80b040bba396", github: null, download: null, download2: null },
  },
  {
    slug: "secondhand-app-market-analysis",
    title: { ko: "중고거래 앱 창업 시장 분석", en: "Secondhand App Market Analysis", ja: "中古取引アプリ市場分析" },
    description: {
      ko: "당근마켓·중고나라·번개장터의 경쟁사 포지셔닝과 TAM/SAM/SOM 시장 규모, 3년 수익 시나리오까지 정리한 신규 창업 분석 대시보드입니다.",
      en: "A startup analysis dashboard covering competitor positioning (Danggeun, Joonggonara, Bunjang), TAM/SAM/SOM market sizing, and a 3-year revenue scenario.",
      ja: "競合ポジショニングとTAM/SAM/SOM市場規模、3年間の収益シナリオまでまとめた新規創業分析ダッシュボードです。",
    },
    tech: ["Market Research", "TAM/SAM/SOM", "Claude"],
    date: "2026.07",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98",
    links: { caseStudy: null, demo: "https://marketinsight.ai.studio", github: null, download: null, download2: null },
  },
  {
    slug: "nipet-naepet-business-plan",
    title: { ko: "니펫내펫 — 반려동물 매칭 플랫폼 사업계획서", en: "Nipet Naepet — Pet Matching Platform Business Plan", ja: "ニペットネペット — ペットマッチングプラットフォーム事業計画書" },
    description: {
      ko: "책임 없이 반려동물과 교감할 수 있는 매칭·위탁 플랫폼의 6개월 실행 사업계획서. 서울 영등포구를 기점으로 시드 3억 원, 18개월 손익분기 시나리오를 시장 데이터 기반으로 설계했습니다.",
      en: "A 6-month business plan for a pet-matching platform that lets people bond with animals without full ownership. Seed funding of ₩300M, targeting break-even at 18 months in Seoul's Yeongdeungpo district, backed by market data.",
      ja: "責任を負わずにペットと触れ合えるマッチング・預かりプラットフォームの6ヶ月実行事業計画書。ソウル永登浦区を拠点に、シード3億ウォン、18ヶ月での損益分岐を市場データに基づいて設計しました。",
    },
    tech: ["Business Plan", "Market Research", "Claude"],
    date: "2026.04",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/pet.webm",
    links: { caseStudy: null, demo: "https://claude.ai/public/artifacts/395ba06b-8a10-47ac-8668-3e75cf6ddc56", github: null, download: null, download2: null },
  },
  {
    slug: "kissa-design-system",
    title: { ko: "喫茶 Kissa — 빈티지 디자인 시스템", en: "Kissa — A Vintage-Inspired Design System", ja: "喫茶 Kissa — ヴィンテージデザインシステム" },
    description: {
      ko: "일본·대만의 옛 킷사텐(다방) 감성에서 출발한 컬러·타이포그래피 디자인 시스템. Primitive → Semantic → Molecule 3단 레이어로 214개 토큰을 구성하고, 다크 모드는 Primitive 반전만으로 전환됩니다.",
      en: "A color and typography design system inspired by old Japanese/Taiwanese kissaten (tea rooms). 214 tokens across a three-layer Primitive → Semantic → Molecule structure, with dark mode achieved by simply inverting the Primitive scale.",
      ja: "日本・台湾の昔ながらの喫茶店の感性から生まれたカラー・タイポグラフィのデザインシステム。Primitive → Semantic → Moleculeの3層構造で214個のトークンを構成し、ダークモードはPrimitiveの反転だけで切り替わります。",
    },
    tech: ["Design System", "Design Tokens", "Claude"],
    date: null,
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C",
    links: { caseStudy: null, demo: "https://claude.ai/public/artifacts/9f673cf7-a6ab-4807-879e-fbe8172ab2ef", github: null, download: "/design-system/kissa-design-system.md", download2: null },
  },
  {
    slug: "hankyung-eureka-ux-report",
    title: { ko: "한경유레카 UX 개선 리포트 — 2.0 개편 이후 구독자 분석", en: "Hankyung Eureka UX Report — Subscriber Impact of the 2.0 Redesign", ja: "韓経ユレカ UX改善レポート — 2.0リニューアル後の購読者分析" },
    description: {
      ko: "한경유레카 앱 2.0 개편(AI 컨센서스, 유레카 프리미엄, 알고리즘 콘텐츠 UI/UX 전면 개편) 전후로 신규 유료 구독자 추이를 2024.01~2026.06 데이터로 비교 분석한 UX 리포트입니다.",
      en: "A UX analytics report comparing new paid-subscriber trends before and after Hankyung Eureka's 2.0 redesign (AI consensus scoring, Eureka Premium, a full algorithmic content UI/UX overhaul), using Jan 2024–Jun 2026 data.",
      ja: "韓経ユレカアプリの2.0リニューアル（AIコンセンサス、ユレカプレミアム、アルゴリズムコンテンツのUI/UX全面刷新）前後で新規有料購読者の推移を2024年1月〜2026年6月のデータで比較分析したUXレポートです。",
    },
    tech: ["Data Analytics", "UX Research", "Claude"],
    date: "2026.07",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%9C%A0%EB%A0%88%EC%B9%B4",
    links: { caseStudy: null, demo: "https://claude.ai/public/artifacts/90dcb3f4-fc02-4c29-aae4-b600d5e95d1c", github: null, download: null, download2: null },
  },
  {
    slug: "magicpath-guide",
    title: { ko: "매직패스 가이드 — 놀이공원 날씨 동선 추천 서비스", en: "Magicpath Guide — Weather-Based Amusement Park Routing", ja: "マジックパスガイド — 天気連動アトラクション動線推薦サービス" },
    description: {
      ko: "실시간 날씨·혼잡도를 분석해 맞춤형 놀이공원 동선을 추천하는 서비스 콘셉트. 데이터 기반 페르소나로 사용자 니즈를 검증하고, 개요·페르소나 2개 탭으로 구성한 케이스 스터디 페이지입니다.",
      en: "A service concept that recommends personalized amusement-park routes using real-time weather and congestion data, validated with a data-driven persona — presented as a two-tab (overview/persona) case study page.",
      ja: "リアルタイムの天気・混雑度を分析してパーソナライズされたアトラクション動線を提案するサービスコンセプト。データドリブンなペルソナで検証し、概要・ペルソナの2つのタブで構成したケーススタディページです。",
    },
    tech: ["Service Design", "Figma", "UX Research", "Case Study"],
    date: "2026.05",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%86%80%EC%9D%B4%EA%B3%B5%EC%9B%90%EB%8F%99%EC%84%A0%EC%95%B1.webm",
    links: { caseStudy: "/case-studies/magicpath-guide", demo: null, github: null, download: "/case-studies/magicpath-guide/놀이공원_스마트동선앱_PRD.docx", download2: null },
  },
  {
    slug: "food-hygiene-service",
    title: { ko: "AI 식품위생 관리 서비스", en: "AI Food Hygiene Management Service", ja: "AI食品衛生管理サービス" },
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
      demo: null,
      github: null,
      download: "/projects/food-hygiene-service/식품위생관리서비스_PRD.docx",
      download2: "/projects/food-hygiene-service/식품위생관리서비스_PRD_상세.xlsx",
    },
  },
  {
    slug: "moonlight-journey",
    title: { ko: "달빛 기행 — 경주 야간 관광 앱", en: "Moonlight Journey — Gyeongju Night Tourism App", ja: "月明かり紀行 — 慶州ナイトツーリズムアプリ" },
    description: {
      ko: "일몰·점등 시각과 실시간 혼잡도를 알려주어 경주의 야경 명소를 가장 좋은 순간에 즐기도록 돕는 관광 앱 콘셉트. 오디오 도슨트, 별자리 지도, 날씨 기반 관측 지수로 감성적인 야간 경험을 설계했습니다.",
      en: "A tourism app concept that surfaces sunset/lighting times and real-time crowd levels so visitors catch Gyeongju's night spots at their best moment — with an audio docent, a constellation map, and a weather-based stargazing index.",
      ja: "日没・点灯時刻とリアルタイムの混雑度を知らせ、慶州の夜景スポットを最高の瞬間に楽しめるよう導く観光アプリコンセプト。オーディオドーセント、星座マップ、天気ベースの観測指数で情緒的な夜の体験を設計しました。",
    },
    tech: ["Service Design", "Figma", "Mobile App", "Case Study"],
    date: "2026.07",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%8B%AC%EB%B9%9B%EA%B8%B0%ED%96%89",
    links: { caseStudy: "/case-studies/moonlight-journey", demo: null, github: null, download: null, download2: null },
  },
  {
    slug: "airbnb-dashboard",
    title: { ko: "에어비앤비 대시보드", en: "Airbnb Impact Dashboard", ja: "Airbnbインパクトダッシュボード" },
    description: {
      ko: "에어비앤비의 국내 지역경제 기여도(GDP·일자리·게스트 지출)와 비도시 예약 비중 성장을 분석하고, 2024년 영업신고 의무화 등 규제 변화에 대응하는 호스트 시장 전략을 정리한 인사이트 대시보드입니다.",
      en: "An insight dashboard analyzing Airbnb's contribution to Korea's regional economy (GDP, jobs, guest spending) and the growth of non-urban bookings, alongside host market strategies responding to 2024 business-registration regulations.",
      ja: "エアビーアンドビーの国内地域経済への貢献度（GDP・雇用・ゲスト支出）と非都市部予約の増加を分析し、2024年の営業申告義務化などの規制変化に対応するホスト向け市場戦略をまとめたインサイトダッシュボードです。",
    },
    tech: ["Market Research", "Data Analytics", "Google AI Studio"],
    date: "2026.04.16",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%97%90%EC%96%B4%EB%B9%84%EC%95%A4%EB%B9%84",
    links: { caseStudy: null, demo: "https://product-insight-dashboard-223453858568.us-west1.run.app", github: null, download: null, download2: null },
  },
  {
    slug: "titanic-survivors-dashboard",
    title: { ko: "타이타닉 생존자 분석 대시보드", en: "Titanic Survivors Analysis Dashboard", ja: "タイタニック生存者分析ダッシュボード" },
    description: {
      ko: "타이타닉 탑승객 데이터를 분석해 좌석 등급·성별·나이에 따른 생존율을 인터랙티브 차트로 시각화한 데이터 분석 대시보드입니다.",
      en: "An interactive data-analysis dashboard visualizing Titanic passenger survival rates by class, gender, and age.",
      ja: "タイタニック号の乗客データを分析し、客室クラス・性別・年齢別の生存率をインタラクティブなチャートで可視化したデータ分析ダッシュボードです。",
    },
    tech: ["Data Analytics", "Data Visualization", "Dashboard"],
    date: "2026.08",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89",
    links: { caseStudy: null, demo: "https://titanic-survivors-dashboard-223453858568.us-west1.run.app", github: null, download: null, download2: null },
  },
  {
    slug: "herehear-music-player",
    title: { ko: "HereHear — 지역맞춤 뮤직 플레이어", en: "HereHear — Location-Curated Music Player", ja: "HereHear — 位置連動ミュージックプレイヤー" },
    description: {
      ko: "현재 위치와 취향을 입력하면 그 지역 분위기에 맞는 음악을 추천하는 AI 큐레이션 뮤직 플레이어. Gemini API로 곡을 직접 선정하고, 좋아요·스킵 반응을 학습해 추천을 개인화합니다.",
      en: "An AI-curated music player that recommends songs matching the local mood based on your current location and taste. Gemini picks the tracks, and the app learns from likes and skips to personalize future recommendations.",
      ja: "現在地と好みを入力すると、その地域の雰囲気に合う音楽をおすすめするAIキュレーション音楽プレイヤー。Gemini APIで楽曲を選定し、いいね・スキップの反応を学習してレコメンドを個人化します。",
    },
    tech: ["JavaScript", "Gemini API", "iTunes API", "Geolocation"],
    date: "2026.06.11",
    thumbnail: "https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%AE%A4%EC%A7%81%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4.webm",
    links: { caseStudy: null, demo: "https://herehear.leejuhee010340.workers.dev", github: "https://github.com/kr11070/MusicPlayer_HereHear", download: null, download2: null },
  },
];

for (let i = 0; i < projects.length; i++) {
  const { slug, ...rest } = projects[i];
  await setDoc(doc(db, "side_projects", slug), {
    ...rest,
    sortOrder: (i + 1) * 10,
    createdAt: serverTimestamp(),
  });
  console.log(`✓ ${slug}`);
}

console.log(`\nDone — migrated ${projects.length} projects.`);
process.exit(0);
