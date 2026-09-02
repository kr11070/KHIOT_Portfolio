"use client";

import { useState } from "react";

type Tab = "overview" | "research" | "features" | "flow" | "persona";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "개요" },
  { id: "research", label: "리서치" },
  { id: "features", label: "기능·UX" },
  { id: "flow", label: "플로우" },
  { id: "persona", label: "페르소나" },
];

const roles = [
  { label: "Owner", body: "회의 개설 및 캘린더 연동, 전체 권한을 가진 회의 주최자." },
  { label: "Controller", body: "임원·리더십. 최종 승인/반려와 전자 서명으로 법적 구속력을 부여." },
  { label: "Manager", body: "회의를 주도하고 내용을 편집·정정하며 액션 플랜을 관리하는 실무 책임자." },
  { label: "Viewer", body: "일반 팀원·외부 게스트. 전체 회의록 탭은 숨김, AI 요약본과 자신의 액션 아이템만 확인." },
];

const kpis = [
  { title: "요약본 생성 속도", body: "회의 종료 후 AI 요약본 제공 완료까지 평균 소요 시간 — Target 30분 이내" },
  { title: "정정 리드타임", body: "Viewer의 정정 요청이 외부 채널로 Manager에게 도달해 수정 완료되기까지 걸리는 시간" },
  { title: "액션 이행률", body: "생성된 액션 플랜의 Jira 티켓 자동 전환율 및 실제 이행 완료율" },
  { title: "보안 위배 건수", body: "권한 등급별 뷰 분기 로직의 정보 보안 위배 건수 — Target 0건" },
];

const marketStats = [
  { value: "월 40%+", label: "AI 회의록 서비스 유료 고객 평균 성장률" },
  { value: "연 20%+", label: "아시아 지역 음성인식(STT) AI 시장 성장률" },
  { value: "660만", label: "국내 유사 서비스(클로바노트) 누적 가입자 수" },
];

const swot = [
  { title: "Strength", body: "기업별 워크플로우에 맞춘 커스터마이징 지원. 후발주자로서 기존 경쟁사에 없는 기능을 추가해 출시 가능." },
  { title: "Weakness", body: "인지도 부족. 보안 인증·익명 커스텀 팀 대응 등 초기 비용 부담." },
  { title: "Opportunity", body: "압도적 1위 경쟁사가 없는 시장. 가격·기능에 따라 다양한 경쟁사가 존재하지만 다들 기능적 약점 보유." },
  { title: "Threat", body: "경쟁자 다수(레드오션), 기업 내 자체 솔루션 개발과 경쟁, 글로벌 경쟁사의 협업 툴 내 기능 흡수 가능성." },
];

const stakeholders = [
  { quadrant: "영향력 높음 · 관심 낮음", strategy: "만족 유지", items: ["정부 규제기관", "규제 관련 법률 관계자"] },
  { quadrant: "영향력 높음 · 관심 높음", strategy: "적극 관리", items: ["서비스 사용자"] },
  { quadrant: "영향력 낮음 · 관심 낮음", strategy: "관찰", items: ["경영진", "노조 / 근로자"] },
  { quadrant: "영향력 낮음 · 관심 높음", strategy: "정보 공유", items: ["기업 내 DB 관리 부서", "사내 개발 엔지니어링", "기업 내 보안팀", "기업 투자자"] },
];

const fiveForces = [
  {
    title: "대체재",
    level: 3,
    levelLabel: "높음",
    body: "노션·Slack·Teams 등 협업 툴에 내장된 자체 AI(Zoom AI Companion, MS Copilot, Google Gemini)가 가장 강력한 대체재. 전사 솔루션 도입 전에 이미 손에 익은 범용 툴의 AI 기능으로 회의록을 때우고 있을 확률이 매우 높음. 대기업은 자체 IT 계열사(삼성SDS, LG CNS 등)의 무료 도구도 대안이 됨.",
  },
  {
    title: "공급자",
    level: 2,
    levelLabel: "중간",
    body: "OpenAI·Anthropic 등 LLM API, 음성인식(STT) 엔진 공급자에 대한 의존도가 높음. 공급업체가 API 가격을 인상하거나 정책을 변경하면 수익성에 즉각적인 타격을 입는 구조.",
  },
  {
    title: "구매자",
    level: 2,
    levelLabel: "중간",
    body: "B2B 구매자는 ROI 입증과 보안 심사를 요구하며 가격에 민감함. 회의록 도구가 기존 워크플로우에 자연스럽게 녹아들지 못하면 외면당하고, 구매 결정도 여러 부서 위원회가 분담해 의사결정 과정이 김.",
  },
];

const pricingTiers = [
  {
    tier: "저가형 (무료 ~ 월 10달러)",
    body: "Otter.ai, Tactiq.io 등. 기본 회의 요약·공유는 충분하지만 한국어 품질이 낮음. 개인·스타트업 초기 단계에 적합.",
  },
  {
    tier: "중가형 (월 10~30달러)",
    body: "Fireflies.ai, Avoma.com, 네이버웍스 클로바노트. 협업 툴 연동과 CRM 관리 강점은 있으나 엔터프라이즈 보안 기능이 제한적. 중소기업에 적합.",
  },
  {
    tier: "고가형 (월 30달러 이상 / 계약제)",
    body: "Callabo.ai, Fellow.app, Read.ai 등. ISO 27001·RBAC·감사 로그 등 엔터프라이즈 보안은 충실하지만 온라인·전화 회의까지 아우르는 인프라가 필요한 대기업 환경에 특화.",
  },
];

const moscow = {
  must: [
    "심리스한 연동: Google/Outlook 캘린더 및 주요 화상회의(Zoom, Meet, Teams) 봇 참여",
    "고정밀 STT & 화자 분리: Whisper급 이상 인식률, 다인원 발언자 구분, 업계 전문 용어 사전",
    "오디오를 텍스트로 변환하고 기본 문단형 요약본 제공",
    "모바일-웹 동기화: 현장(모바일 녹음)과 사무실(웹 편집) 간 실시간 싱크",
    "엔터프라이즈 보안: SOC2·ISO 인증 및 데이터 암호화(일본 시장 데이터센터 고려)",
  ],
  should: [
    "고도화된 아카이브 검색: 수개월 전 회의록도 1초 만에 찾는 필터링·전역 검색",
    "회사 고유 보고서 양식(Word/PPT/Notion)에 맞춰 AI가 자동으로 채우는 요약 템플릿 매핑",
    "다국어 지원(엔진별 검토 필요) 및 회의 중 실시간 통역 자막(Live Caption)",
    "권한 관리(RBAC): 부서별·프로젝트별 접근 권한 설정 UI",
  ],
  could: [
    "회의록 기반 RAG 챗봇: 사내 지식 + 회의 내용을 결합해 질문에 답변",
    "'Executive Summary(임원 보고용)'와 '실무자용 액션 아이템'을 분리해 구조화하는 화면 UI",
    "회의 내용 기반 스마트 디렉토리: 주제·프로젝트명·고객사를 인식해 자동 폴더 정리",
  ],
  wont: [
    "미팅룸에 대기자로 입장하는 화상회의 봇 개발 (브라우저 확장 프로그램으로 대체 — 미팅 거부감 유발 우려)",
    "회의 참여자 참여도 및 감정 분석",
    "ROI 가시화 대시보드 (시간 단축·효율 향상을 수치로 보여주는 기능)",
  ],
};

const screens = [
  "로그인 및 권한 선택 화면 (게스트 코드 입력창 포함)",
  "원클릭 대기방 및 참석 예정자 상태(불참/지각) 확인 화면",
  "회의 진행 화면 — 실시간 자막·개인화 번역 자막 선택 UI, 화자별 고유 색상 타임라인",
  "회의 종료 후 화면 — (Manager 이상) 전체 회의록+AI 요약본 / (Viewer) AI 요약본 탭만 노출",
  "승인/반려 화면 — Controller 전용 전자서명 패널과 반려 사유 기입란",
];

const errorHandling = [
  { situation: "Viewer 수정 시도", handling: "\"수정 권한이 없습니다\" 편집 모드 진입 불가 안내 팝업" },
  { situation: "실시간 화자 인식 오류", handling: "Manager 이상 권한에게 실시간 정정 UI 제공" },
  { situation: "캘린더 미동의", handling: "동의 유도 노출 / 게스트는 미동의 시 즉시 대기방 수동 입장으로 분기" },
];

const phase1 = [
  { step: "1", title: "Google 계정 동의 및 연동 (최초 1회)", body: "웹사이트 또는 크롬 확장 프로그램에서 [Google 계정 연동]을 클릭해 캘린더·미트 데이터 접근 권한에 동의합니다." },
  { step: "2", title: "회의 5분 전 알림", body: "웹/모바일 푸시 알림으로 회의 시작을 미리 안내합니다." },
  { step: "3", title: "원클릭 입장", body: "알림을 클릭하면 회의실 입장과 동시에 AI 기록이 자동으로 시작됩니다." },
  { step: "4", title: "이전 아카이브 맥락 검색", body: "AI가 오늘 미팅 제목·참석자를 기반으로 관련 과거 회의록을 [핵심 요약 카드]로 사이드바에 추천합니다." },
  { step: "5", title: "진행자 모드 / 참여자 모드 활성화", body: "진행자에게는 '아카이브 검색'과 '템플릿 지정' 권한을, 참여자에게는 '실시간 자막'과 '개인 메모' 기능을 우선 노출합니다." },
];

const phase2 = [
  { step: "1", title: "기록 시작 및 다국어 안내", body: "진행자가 [기록 시작] 버튼을 누르면 \"실시간 다국어 인식으로 편하게 회의하세요\" 안내 팝업이 3초간 표시됩니다." },
  { step: "2", title: "참가자 자동 인식 및 매핑", body: "구글 미트 참가자 프로필과 음성 파형을 분석해 [참가자 A, B, C]를 자동 인식하고 사이드바에 매핑합니다." },
  { step: "3", title: "실시간 오디오 → 텍스트 변환(STT)", body: "Whisper/Chirp 엔진이 오디오를 실시간 텍스트로 변환하고, AI가 맥락을 인지해 오탈자·문법·전문 용어를 실시간 보정합니다." },
];

const phase3 = [
  { step: "1", title: "실시간 대시보드 진입", body: "회의 종료 즉시 전원의 화면이 스크립트 리포트로 전환되고, 상단에 [참가자 동의 현황: 1/4명] 인디케이터가 표시됩니다." },
  { step: "2", title: "비동기 개별 하이라이트 검수", body: "AI가 오인식·화자 분리가 모호한 구간을 하이라이트하면, 참가자는 본인 발언 구간을 확인 후 [동의]하거나 [정정 요청]을 남깁니다." },
  { step: "3", title: "병목 방지", body: "전원이 동의하면 즉시 다음 단계로 진행. 미동의자가 있어도 진행자가 최종 동의하거나 설정된 시간(예: 1시간)이 지나면 자동 승인됩니다." },
  { step: "4", title: "최종 트리거", body: "스크립트 동의가 완료되면 AI가 요약본 생성을 시작하고, 진행자에게 인앱 푸시 알림을 보냅니다." },
];

const adminFlow = [
  "대시보드 링크 클릭 → 시스템이 사내 직급/역할 권한 판별 (과장급 이상)",
  "관리자 뷰(Admin View) 진입 — 화면이 좌/우로 분할 노출",
  "좌측: 임원 보고용(배경·핵심 의사결정·리스크 중심 줄글) / 우측: 실무자용 액션 플랜(담당자별 체크박스·마감기한)",
  "임원 보고서 서식은 내보내기 전 직접 수정·보완, 실무자 Task 할당 내용도 직접 수정·추가",
  "좌우 영역 전체 검수 후 상단 [확인 완료] 클릭 — 검수가 필요한 관리자 전원이 완료하면 최종 요약본 확정",
];

const staffFlow = [
  "대시보드 링크 클릭 → 시스템이 사내 직급/역할 권한 판별 (사원~대리급)",
  "실무자 뷰(Staff View) 진입 — '실무자용 액션 플랜' 탭만 노출, 임원 보고서 화면은 숨김",
  "본인 이름으로 할당된 Task와 마감 기한을 확인",
  "세부 수정이 필요하면 배정된 Task의 체크리스트 항목을 직접 수정·보완",
  "피드백/질문이 있으면 [코멘트 달기 + 담당자 지정] 버튼으로 의견 전달",
  "확인 완료 후 자신에게 할당된 업무를 즉시 시작",
];

const personaFacts = [
  { label: "직업", value: "바텐더 (2~3년제 전문대학 졸업)" },
  { label: "거주", value: "서울 중구 단독주택 · 혼자 거주" },
  { label: "혼인", value: "미혼" },
  { label: "취미", value: "필라테스·웨이트, 당구, 국내 자연 경관 출사 여행" },
];

const personaKeywords = [
  "클래식 칵테일 조주",
  "고객 심리 파악 및 맞춤형 응대",
  "제철 재료 창작 레시피",
  "바 운영 및 재고 관리",
  "을지로 인쇄소 거리",
  "독립 서점·작은 전시회",
];

export default function TaskLitArticle() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-accent-deep">
        PRD · Service Design · 2026.05.27 – 2026.06.04
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">TaskLit</h1>
      <p className="mt-3 text-lg italic text-ink-soft">
        &lsquo;이전 미팅, 어떤 내용이었죠?&rsquo;
      </p>

      {/* 탭 */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-line">
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

      {tab === "overview" && (
        <div className="mt-10 flex flex-col gap-14">
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">서비스 개요</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              회의가 끝나면 STT 텍스트, 오디오, 액션 플랜 같은 방대한 데이터가 한꺼번에
              쏟아지지만, 권한별 보안 관리가 없어 누구나 회의록 전체에 접근하고, 미연동
              게스트는 입장 장벽에 막히고, 다국어 회의는 일괄 자막만 제공돼 소통 효율이
              떨어집니다. <span className="font-bold text-ink">TaskLit</span>은 Owner·Controller·Manager·Viewer
              4개 역할에 따라 화면과 접근 범위를 다르게 제공하고, 회의 종료 30분~1시간
              이내에 AI가 요약본과 담당자별 액션 플랜을 자동으로 자산화하는 AI 회의록
              서비스 PRD입니다.
            </p>
            <p className="mt-2 leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">4인 팀 프로젝트</span>로 진행한 컨셉 기획이며,
              실제로 구현된 서비스는 아닙니다. 문제 정의부터 시장 리서치, 기능 정의, 유저
              플로우 설계까지의 PRD 산출물을 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">차별점</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "하이브리드 자막",
                  body: "방 전체 기본 자막과 개인화 언어 필터를 동시 지원",
                },
                {
                  title: "권한별 UI 분기",
                  body: "Viewer에게는 전체 회의록을 숨기고 'AI 요약본 탭'만 제공",
                },
                {
                  title: "Controller 승인 프로세스",
                  body: "반려 시 비고란을 통해 Manager에게 즉시 에스컬레이션",
                },
              ].map((d) => (
                <div key={d.title} className="rounded-2.5xl border border-line p-4">
                  <p className="text-sm font-bold text-ink">{d.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">역할 체계</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {roles.map((r) => (
                <div key={r.label} className="rounded-2.5xl border border-line bg-accent-soft/50 p-4">
                  <p className="text-xs font-bold text-accent-deep">{r.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">성공 지표 (KPI)</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {kpis.map((k) => (
                <div key={k.title} className="rounded-2.5xl border border-line p-4">
                  <p className="text-sm font-bold text-ink">{k.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{k.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "research" && (
        <div className="mt-10 flex flex-col gap-14">
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">시장 임팩트</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {marketStats.map((s) => (
                <div key={s.label} className="rounded-2.5xl border border-line bg-white/70 p-4 text-center shadow-card">
                  <p className="text-2xl font-extrabold tracking-tight text-accent-deep">{s.value}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
            <blockquote className="mt-5 border-l-2 border-accent-dark pl-4 text-sm italic leading-relaxed text-ink-soft">
              AI 회의록 서비스는 월평균 40% 이상의 유료 고객 성장세와 데이터 자산화 수요를
              바탕으로 기업 디지털 전환(DX)의 전략적 요충지로 부상했습니다. 다만 AI 기본법에
              따른 투명성 확보 의무, 기밀 유출·근로자 감시 우려 등 사회적 리스크가 공존하는
              환경이라, 내부 업무용 서비스의 법적 예외 조항을 전략적으로 활용하고 보안·인프라
              안정성을 차별화 요소로 구축하는 방향이 필요합니다.
            </blockquote>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">경쟁사 포지셔닝</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              가격과 엔터프라이즈 보안·기능 수준 두 축으로 경쟁사를 배치하면, TaskLit이 노려야
              할 빈자리가 &lsquo;저비용이면서도 신뢰할 수 있는 보안&rsquo; 구간에 있다는 게
              보입니다.
            </p>
            <svg viewBox="0 0 400 260" className="mt-5 w-full" role="img" aria-label="가격 대비 엔터프라이즈 기능 포지셔닝 맵">
              <line x1="50" y1="220" x2="370" y2="220" stroke="#9AA093" strokeWidth="1.5" />
              <line x1="50" y1="220" x2="50" y2="14" stroke="#9AA093" strokeWidth="1.5" />
              <polygon points="374,220 365,216 365,224" fill="#9AA093" />
              <polygon points="50,10 46,19 54,19" fill="#9AA093" />
              <text x="50" y="236" fontSize="10" fill="#5C6357">가격 낮음</text>
              <text x="368" y="236" fontSize="10" fill="#5C6357" textAnchor="end">가격 높음</text>
              <text x="52" y="12" fontSize="10" fill="#5C6357">보안·엔터프라이즈 기능 ↑</text>

              <line x1="112" y1="188" x2="322" y2="52" stroke="#E7E3D8" strokeWidth="1.5" strokeDasharray="4 4" />

              <circle cx="112" cy="188" r="7" fill="#7DB36B" />
              <text x="112" y="170" fontSize="11" fontWeight="700" fill="#22261F" textAnchor="middle">저가형</text>
              <text x="112" y="203" fontSize="9" fill="#5C6357" textAnchor="middle">Otter · Tactiq</text>

              <circle cx="230" cy="118" r="7" fill="#7DB36B" />
              <text x="230" y="100" fontSize="11" fontWeight="700" fill="#22261F" textAnchor="middle">중가형</text>
              <text x="230" y="133" fontSize="9" fill="#5C6357" textAnchor="middle">Fireflies · 클로바노트</text>

              <circle cx="322" cy="52" r="7" fill="#7DB36B" />
              <text x="322" y="34" fontSize="11" fontWeight="700" fill="#22261F" textAnchor="middle">고가형</text>
              <text x="322" y="67" fontSize="9" fill="#5C6357" textAnchor="middle">Callabo · Read.ai</text>

              <circle cx="150" cy="98" r="8" fill="#4F7A41" stroke="#FAF8F2" strokeWidth="2" />
              <text x="150" y="80" fontSize="11" fontWeight="800" fill="#4F7A41" textAnchor="middle">TaskLit 목표</text>
            </svg>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {pricingTiers.map((p) => (
                <div key={p.tier} className="rounded-2.5xl border border-line p-3">
                  <p className="text-xs font-bold text-ink">{p.tier}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">
              5 Forces — 대체재 · 공급자 · 구매자
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
                    <th className="py-2 pr-4">Force</th>
                    <th className="py-2 pr-4">위협도</th>
                    <th className="py-2">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {fiveForces.map((f) => (
                    <tr key={f.title} className="border-b border-line/70 align-top">
                      <td className="py-3 pr-4 font-bold text-ink">{f.title}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-1.5">
                          <span className="flex gap-0.5">
                            {[1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className={`h-2 w-4 rounded-full ${
                                  i <= f.level ? "bg-accent-dark" : "bg-line"
                                }`}
                              />
                            ))}
                          </span>
                          <span className="text-xs font-bold text-ink-soft">{f.levelLabel}</span>
                        </div>
                      </td>
                      <td className="py-3 text-ink-soft">{f.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">SWOT 분석</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {swot.map((s) => (
                <div
                  key={s.title}
                  className={`rounded-2.5xl border p-4 ${
                    s.title === "Strength" || s.title === "Opportunity"
                      ? "border-accent-dark bg-accent-soft/50"
                      : "border-line bg-cream-deep"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      s.title === "Strength" || s.title === "Opportunity"
                        ? "text-accent-deep"
                        : "text-ink"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              ★ 기존 경쟁사의 이미지 고착화와 기능적 빈틈을 노려, 타깃을 &lsquo;초기
              저비용·모듈형 커스터마이징 워크플로우&rsquo;로 좁혀 틈새시장을 빠르게 선점하는
              전략을 세웠습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">BCG 매트릭스</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              현재는 시장 점유율이 낮은 <span className="font-bold text-ink">Question Mark</span>
              에 위치하지만, 시장 성장률 자체가 높고 글로벌 확장 가능성도 있어{" "}
              <span className="font-bold text-ink">Star</span>로의 도약을 목표로 합니다.
            </p>
            <svg viewBox="0 0 380 300" className="mt-5 w-full" role="img" aria-label="BCG 매트릭스, 현재 Question Mark에서 Star로의 목표 이동">
              <rect x="40" y="20" width="160" height="120" fill="#EDF4E8" stroke="#E7E3D8" />
              <rect x="200" y="20" width="160" height="120" fill="#EDF4E8" stroke="#7DB36B" strokeWidth="2" />
              <rect x="40" y="140" width="160" height="120" fill="#F3F0E7" stroke="#E7E3D8" />
              <rect x="200" y="140" width="160" height="120" fill="#F3F0E7" stroke="#E7E3D8" />

              <line x1="40" y1="260" x2="40" y2="12" stroke="#9AA093" strokeWidth="1.5" />
              <polygon points="40,8 36,17 44,17" fill="#9AA093" />
              <line x1="40" y1="260" x2="368" y2="260" stroke="#9AA093" strokeWidth="1.5" />
              <polygon points="372,260 363,256 363,264" fill="#9AA093" />

              <text x="42" y="10" fontSize="10" fill="#5C6357">시장 성장률 ↑</text>
              <text x="60" y="277" fontSize="10" fill="#5C6357">낮음</text>
              <text x="330" y="277" fontSize="10" fill="#5C6357">높음</text>
              <text x="200" y="292" fontSize="10" fill="#5C6357" textAnchor="middle">상대적 시장 점유율</text>

              <text x="120" y="85" fontSize="14" fontWeight="800" fill="#4F7A41" textAnchor="middle">Star</text>
              <text x="280" y="78" fontSize="14" fontWeight="800" fill="#4F7A41" textAnchor="middle">Question Mark</text>
              <text x="280" y="96" fontSize="10" fill="#4F7A41" textAnchor="middle">(현재 위치)</text>
              <text x="120" y="205" fontSize="14" fontWeight="800" fill="#9AA093" textAnchor="middle">Cash Cow</text>
              <text x="280" y="205" fontSize="14" fontWeight="800" fill="#9AA093" textAnchor="middle">Dog</text>

              <path d="M 255 120 Q 200 88 178 96" stroke="#4F7A41" strokeWidth="2" fill="none" strokeDasharray="4 3" markerEnd="url(#tasklit-arrow)" />
              <circle cx="258" cy="122" r="6" fill="#4F7A41" />
              <text x="205" y="82" fontSize="10" fontWeight="700" fill="#4F7A41" textAnchor="middle">목표 이동</text>

              <defs>
                <marker id="tasklit-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#4F7A41" />
                </marker>
              </defs>
            </svg>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">이해관계자 맵</h2>
            <p className="mt-2 text-xs text-ink-faint">Power / Interest 사분면 분석</p>
            <div className="relative mt-5 rounded-2.5xl border border-line pb-3 pl-3 pr-3 pt-7">
              <span className="absolute left-4 top-2 text-[10px] font-bold text-ink-faint">
                영향력(Power) ↑
              </span>
              <span className="absolute bottom-2 right-4 text-[10px] font-bold text-ink-faint">
                관심도(Interest) →
              </span>
              <div className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-2">
                {stakeholders.map((s, i) => {
                  const quadrantBorders = [
                    "border-b border-line sm:border-r",
                    "border-b border-line",
                    "border-b border-line sm:border-b-0 sm:border-r",
                    "",
                  ];
                  return (
                  <div
                    key={s.quadrant}
                    className={`p-4 ${quadrantBorders[i]}`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wide text-accent-deep">
                      {s.quadrant} · {s.strategy}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-full border border-line bg-cream-deep px-2.5 py-1 text-[11px] font-bold text-ink-soft"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {tab === "features" && (
        <div className="mt-10 flex flex-col gap-14">
          <section>
            <h2 className="text-xl font-extrabold tracking-tight">MoSCoW 우선순위</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Must", items: moscow.must, accent: true },
                { title: "Should", items: moscow.should, accent: false },
                { title: "Could", items: moscow.could, accent: false },
                { title: "Won't", items: moscow.wont, accent: false },
              ].map((col) => (
                <div
                  key={col.title}
                  className={`rounded-2.5xl border p-4 ${
                    col.accent ? "border-accent-dark bg-accent-soft/50" : "border-line"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${col.accent ? "text-accent-deep" : "text-ink"}`}
                  >
                    {col.title}
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {col.items.map((it) => (
                      <li key={it} className="text-xs leading-relaxed text-ink-soft">
                        · {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">핵심 화면 구성</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {screens.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span className="shrink-0 font-bold text-accent-deep">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">예상 오류 처리</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
                    <th className="py-2 pr-4">상황</th>
                    <th className="py-2">처리 방법</th>
                  </tr>
                </thead>
                <tbody>
                  {errorHandling.map((e) => (
                    <tr key={e.situation} className="border-b border-line/70 align-top">
                      <td className="py-3 pr-4 font-bold text-ink">{e.situation}</td>
                      <td className="py-3 text-ink-soft">{e.handling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {tab === "flow" && (
        <div className="mt-10 flex flex-col gap-14">
          {[
            { title: "Phase 1 · 회의 전 (Preparation)", steps: phase1 },
            { title: "Phase 2 · 회의 중 (In-Meeting)", steps: phase2 },
            { title: "Phase 3 · 회의 직후 (Verification)", steps: phase3 },
          ].map((phase) => (
            <section key={phase.title}>
              <h2 className="text-xl font-extrabold tracking-tight">{phase.title}</h2>
              <div className="mt-5 flex flex-col gap-4">
                {phase.steps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent-deep">
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-extrabold tracking-tight">
              대시보드 진입 후 권한별 워크플로우
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              사내 직급에 따라 관리자 뷰와 실무자 뷰로 자동 분기됩니다.
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-accent-deep">
                  관리자 뷰 (과장급 이상)
                </p>
                <ol className="mt-3 flex flex-col gap-2.5 border-l-2 border-line pl-4">
                  {adminFlow.map((f, i) => (
                    <li key={i} className="text-sm leading-relaxed text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-accent-deep">
                  실무자 뷰 (사원~대리급)
                </p>
                <ol className="mt-3 flex flex-col gap-2.5 border-l-2 border-line pl-4">
                  {staffFlow.map((f, i) => (
                    <li key={i} className="text-sm leading-relaxed text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </div>
      )}

      {tab === "persona" && (
        <div className="mt-10 flex flex-col gap-8">
          <p className="text-xs font-bold tracking-wide text-ink-faint">핵심 페르소나</p>

          <div className="rounded-2.5xl border border-line bg-white/70 p-6 shadow-card">
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-studies/tasklit-ai-meeting-notes/persona-kimjaeyoung.jpg"
                alt="페르소나 김재영 — 을지로 바에서 칵테일을 만드는 바텐더"
                className="w-full max-w-[220px] shrink-0 self-center rounded-2xl border border-line object-cover shadow-card sm:self-start"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold tracking-tight">김재영</h2>
                <p className="mt-1 text-sm text-ink-soft">바텐더</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["25세 · 여", "미혼", "서울 중구"].map((b) => (
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
            </div>
          </div>

          <blockquote className="border-l-2 border-accent-dark pl-4 text-sm italic leading-relaxed text-ink-soft">
            &ldquo;을지로의 낡은 정취와 현대적 감각을 동시에 품은 채, 칵테일 한 잔에 예술적
            취향을 담아내며 자신만의 작은 세계를 구축해가는 20대 바텐더입니다. 손님의 표정
            하나로 오늘의 기분을 읽어내어 그에 맞는 칵테일을 제안하는 세심함을 갖췄습니다.&rdquo;
          </blockquote>

          <section>
            <h3 className="text-sm font-extrabold tracking-tight text-ink">관심사 키워드</h3>
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

          <section>
            <h3 className="text-sm font-extrabold tracking-tight text-ink">장기 목표</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              단순히 술을 파는 곳이 아니라 짧은 여행을 온 듯한 느낌을 주는 작은 테마 바를
              운영하며, 매달 하나의 주제로 음악과 칵테일을 큐레이팅하는 공간을 만드는 구체적인
              계획을 세우고 있습니다.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
