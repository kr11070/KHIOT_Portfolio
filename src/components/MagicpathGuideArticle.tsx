"use client";

import { useState } from "react";

type Tab = "overview" | "persona";

const features = [
  {
    title: "놀이공원 선택",
    body: "에버랜드, 롯데월드, 레고랜드 중 방문할 놀이공원을 선택하면 실시간 날씨와 혼잡도 기반 가이드가 시작됩니다.",
    image: "/case-studies/magicpath-guide/park-select.png",
  },
  {
    title: "날씨 예보 기반 분석",
    body: "온도, 강수량뿐 아니라 '불쾌지수'와 '체감온도'까지 분석해 시각화합니다. 시간대별 혼잡도 예측도 함께 보여줍니다.",
    image: "/case-studies/magicpath-guide/weather-detail.png",
  },
  {
    title: "큐레이션 & 실시간 순위",
    body: "현재 위치와 혼잡도를 고려해 가장 빨리 탈 수 있는 어트랙션을 추천하고, 실시간 대기 시간이 가장 긴 인기 어트랙션 순위 정보를 제공합니다.",
    image: "/case-studies/magicpath-guide/attraction-status.png",
  },
  {
    title: "최적 동선 추천 & 커뮤니티 채팅",
    body: "성별·연령·동행 구성(아이 동반, 데이트 등)에 맞춘 경로를 추천하고, 갑작스러운 날씨 변화 시 실시간으로 경로를 재계산(Re-routing)합니다. 같은 놀이공원 방문객끼리 소통하는 실시간 채널도 있습니다.",
    image: "/case-studies/magicpath-guide/route-recommend.png",
  },
];

const personalizationLogic = [
  {
    label: "아이 동반",
    body: "가족안전 — 키즈존 중심 동선",
  },
  {
    label: "커플",
    body: "퍼레이드 관람 및 사진 명당 위주 동선",
  },
  {
    label: "스릴 마니아",
    body: "어트랙션 대기 시간 최소화, 인기 어트랙션 위주 최단 시간 순환 동선",
  },
];

const outcomes = [
  {
    title: "사용자 편의",
    body: "대기 시간을 줄여 놀이공원 경험 만족도 극대화",
  },
  {
    title: "혼잡도 분산",
    body: "특정 어트랙션에 쏠리는 인원을 분산시켜 공원 내 안전사고 예방 기여",
  },
  {
    title: "현장감 강화",
    body: "실시간 채팅 기능을 통해 앱 사용자의 체류 시간 및 활성 사용자수 증대",
  },
];

const personaFacts = [
  { label: "거주", value: "성동구 아파트 · 독립 혼거" },
  { label: "학력", value: "4년제 · 경영·행정·법" },
  { label: "동행 유형", value: "친한 친구 그룹 (즉흥형)" },
  { label: "방문 목적", value: "스트레스 해소 + 스릴 추구" },
  { label: "날씨 민감도", value: "폭염·폭우 회피, 맑음 최선호" },
];

const personaKeywords = [
  "롯데월드",
  "에버랜드",
  "강남 클럽 투어",
  "뚝섬한강공원 야간 산책",
  "넷플릭스 시리즈 정주행",
  "배달 매운 음식 탐색",
  "식자재 유통망 분석",
  "거래처 협상 전략",
  "유통 계약서 법적 리스크 검토",
  "영업 제안서 구성",
];

const personaScenario = [
  { label: "날씨 조건", value: "맑음 → 야외 스릴 어트랙션 우선" },
  { label: "동행 유형", value: "친구 그룹 → 즉흥 경로 변경 허용" },
  { label: "핵심 목표", value: "스트레스 해소 + 최대 탑승 수" },
  { label: "기피 상황", value: "긴 대기줄, 폭염·폭우, 과도한 계획" },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "개요" },
  { id: "persona", label: "페르소나" },
];

export default function MagicpathGuideArticle() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-accent-deep">
        UX Concept · 2026.05.08
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
        매직패스 가이드 (Magicpath Guide)
      </h1>
      <p className="mt-3 text-lg italic text-ink-soft">
        &lsquo;비오는데 어떤 놀이기구를 타러가지?&rsquo;
      </p>

      {/* 탭 */}
      <div className="mt-8 flex gap-2 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
              tab === t.id
                ? "border-accent-dark text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div className="mt-10 flex flex-col gap-14">
          {/* 서비스 개요 */}
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">서비스 개요</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              실시간 날씨 예보와 혼잡도 데이터를 분석하여 사용자(성별, 나이, 동행자)에게
              최적화된 맞춤형 놀이공원 동선을 설계해 주는 가이드 서비스입니다.
            </p>
            <p className="mt-2 leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">타겟 사용자</span> — 줄 서는 시간을
              최소화하고 싶은 가족, 연인, 친구 단위 방문객.
            </p>
          </section>

          {/* 주요 기능 */}
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">주요 기능 및 화면 구성</h2>
            <div className="mt-6 flex flex-col gap-8">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`flex flex-col gap-5 sm:flex-row ${
                    i % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full max-w-[220px] shrink-0 self-center rounded-2.5xl border border-line shadow-card"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 사용자 맞춤형 추천 로직 */}
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">
              사용자 맞춤형 추천 로직 (Personalization)
            </h2>
            <p className="mt-3 text-sm text-ink-soft">사용자 정보 기반 추천 경로 예시</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {personalizationLogic.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2.5xl border border-line bg-accent-soft/50 p-4"
                >
                  <p className="text-xs font-bold text-accent-deep">{p.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 기대 효과 */}
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">기대 효과</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {outcomes.map((o) => (
                <div key={o.title} className="rounded-2.5xl border border-line p-4">
                  <p className="text-sm font-bold text-ink">{o.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{o.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 커뮤니티 채팅 스크린샷 */}
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">현장 커뮤니티 채팅</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              같은 놀이공원에 입장한 사람들끼리만 소통 가능한 실시간 채널. &ldquo;지금
              T-익스프레스 대기 줄 줄어들었어요!&rdquo;, &ldquo;식당가 OO 메뉴
              품절입니다&rdquo; 같은 생생한 현장 정보를 교환합니다.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/magicpath-guide/chat.png"
              alt="에버랜드 채팅 화면"
              className="mt-5 w-full max-w-[220px] rounded-2.5xl border border-line shadow-card"
            />
          </section>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-8">
          <p className="text-xs font-bold tracking-wide text-ink-faint">
            핵심 페르소나 — Nemotron-Personas-Korea 100만 데이터 추출
          </p>

          {/* 페르소나 헤더 */}
          <div className="rounded-2.5xl border border-line bg-white/70 p-6 shadow-card">
            <h2 className="text-2xl font-extrabold tracking-tight">임혜령</h2>
            <p className="mt-1 text-sm text-ink-soft">식품 영업원</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["31세 · 여", "미혼", "서울 성동구"].map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-deep"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {personaFacts.map((f) => (
                <div key={f.label}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                    {f.label}
                  </p>
                  <p className="mt-0.5 text-sm text-ink">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 인용 */}
          <blockquote className="border-l-2 border-accent-dark pl-4 text-sm italic leading-relaxed text-ink-soft">
            &ldquo;롯데월드나 에버랜드의 티익스프레스 같은 스릴 넘치는 놀이기구에 몸을 싣고
            비명을 지르며 일주일치 스트레스를 한꺼번에 털어냅니다. 계획표보다 현장 분위기에
            맞춰 즉흥적으로 경로를 변경하며 최적의 동선을 찾아냅니다.&rdquo;
          </blockquote>

          {/* 관심사 키워드 */}
          <section>
            <h3 className="text-sm font-extrabold tracking-tight text-ink">
              관심사 키워드 (Hobbies and Interests)
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {personaKeywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-line bg-cream-deep px-2.5 py-1 text-[11px] font-bold text-ink-soft"
                >
                  {k}
                </span>
              ))}
            </div>
          </section>

          {/* 앱 활용 시나리오 */}
          <section>
            <h3 className="text-sm font-extrabold tracking-tight text-ink">앱 활용 시나리오</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {personaScenario.map((s) => (
                <div key={s.label} className="rounded-2.5xl border border-line p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-ink">{s.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 장기 목표 */}
          <section>
            <h3 className="text-sm font-extrabold tracking-tight text-ink">
              장기 목표 (Career Goals and Ambitions)
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              성수동 뒷골목에 자신의 안목으로 선별한 품목만 취급하는{" "}
              <span className="font-bold text-ink">식자재 편집숍 창업</span>을 구상하고 있습니다.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
