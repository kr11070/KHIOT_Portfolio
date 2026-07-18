const mustHaveFeatures = [
  {
    title: "AI 자동 큐레이션 체크리스트",
    body: "업종·운영 기간·환경 데이터(날씨, 온습도)를 분석해 일일 맞춤형 체크리스트를 자동 생성합니다. 전국 공통 법규와 관할 보건소 특이사항을 통합 반영하고, 사진 촬영·음성 입력 등 멀티모달 입력을 지원합니다.",
  },
  {
    title: "행정 D-Day 가이드",
    body: "오픈 예정일을 입력하면 인허가 절차와 위생 교육 일정을 역산해 로드맵으로 만들어줍니다. 실사 핵심 항목을 미리 점검해 준비율(%)을 보여주는 '가상 실사 모드'로 예비 창업자의 불안감을 줄입니다.",
  },
  {
    title: "리스크 예측 알림",
    body: "기상청·케이웨더 데이터와 식중독지수를 연동해 냉장고 온도 이상, 장마철 습도 급등 같은 위험 신호를 사고가 나기 전에 알려줍니다. 식품안전나라의 회수·판매 중지 품목도 실시간으로 확인할 수 있습니다.",
  },
  {
    title: "AI 위생 점수 (Health Score)",
    body: "매일의 점검 기록을 분석해 0~100점의 객관적 위생 점수를 산출합니다. 반복적으로 누락되는 항목을 분석해 개인별 취약 관리 포인트를 짚어주는 주간 인사이트 리포트도 함께 제공합니다.",
  },
  {
    title: "AI 비전 스캐너",
    body: "카메라로 조리 구역·개인 위생 상태를 촬영하면 시설 기준 판정을 보조하고, 식재료 포장지의 유통기한을 OCR로 자동 인식해 등록합니다. 오염 영역의 면적까지 계산해 점수에 정량적으로 반영합니다.",
  },
];

const screens = [
  {
    title: "로드맵 설정 — 행정 D-Day 가이드",
    body: "개업 예정일을 입력하면 D-Day 기준으로 위생 관리 일정이 자동 생성됩니다. 입력이 끝나면 D-42처럼 남은 일수와 예정 일정이 카드로 정리됩니다.",
    image: "/case-studies/food-hygiene-service/roadmap.png",
  },
  {
    title: "홈 대시보드 — 오늘의 위생 관리",
    body: "매장 출근 확인, 식중독지수·주방 환경 요약, 오늘의 점검 타임라인을 한 화면에서 보여줍니다. AI가 현재 위생 상태를 한 줄로 요약해 알려줍니다.",
    image: "/case-studies/food-hygiene-service/dashboard.png",
  },
  {
    title: "창업 체크리스트 — 가상 실사 모드",
    body: "전체 항목 중 완료율을 퍼센트로 보여주고, 창업자가 자주 놓치는 실수와 전문가 팁을 함께 제공해 실사 전 준비 상태를 스스로 점검할 수 있게 합니다.",
    image: "/case-studies/food-hygiene-service/checklist.png",
  },
  {
    title: "일일 위생 루틴 — 멀티모달 점검 흐름",
    body: "AI가 오늘의 5대 핵심 점검 항목을 선별한 뒤, 상황에 맞게 터치 입력·비전 스캔(유통기한/청결도 촬영)·음성 명령(STT) 중 하나로 점검을 완료할 수 있도록 설계했습니다.",
    image: "/case-studies/food-hygiene-service/flow.png",
  },
];

export default function FoodHygieneServiceArticle() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-accent-deep">
        Product Requirements · AI Service
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
        AI 식품위생 관리 서비스
      </h1>
      <p className="mt-3 text-lg italic text-ink-soft">
        AI 기반 맞춤형 위생 큐레이션 · 리스크 예측 · 디지털 위생 기록 플랫폼
      </p>

      <div className="mt-10 flex flex-col gap-14">
        {/* 문제 정의 & 목표 */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight">문제 정의</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            대부분의 자영업자는 식중독 사고나 실사 적발 등 문제가 터진 후에야 대응합니다.
            평상시 자신의 위생 상태가 어느 수준인지 객관적으로 파악하기 어려운 것이 근본
            원인입니다. 복잡한 식품위생법과 행정 절차는 예비 창업자에게 심리적 불안감을 주고,
            1인 운영 매장은 수백 개 품목의 유통기한·온습도 관리에서 누수가 생기기 쉽습니다.
          </p>
          <h2 className="mt-8 text-xl font-extrabold tracking-tight">목표</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            복잡한 위생 법규와 방대한 관리 항목을 AI가 지능적으로 큐레이션하여, 창업자는
            &lsquo;본업(서비스/판매)&rsquo;에만 집중할 수 있는 환경을 만듭니다. AI가 매일의
            점검 기록을 분석해 &lsquo;위생 점수(Health Score)&rsquo;를 산출하고, 위험 징후를
            사전에 감지해 사고를 예방하는 선순환 구조를 목표로 합니다.
          </p>
        </section>

        {/* 필수 기능 */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight">필수 기능 (Must Have)</h2>
          <div className="mt-5 flex flex-col gap-4">
            {mustHaveFeatures.map((f) => (
              <div key={f.title} className="rounded-2.5xl border border-line p-5">
                <h3 className="font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 화면 */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight">주요 화면</h2>
          <div className="mt-6 flex flex-col gap-8">
            {screens.map((s, i) => (
              <div
                key={s.title}
                className={`flex flex-col gap-5 sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full max-w-[240px] shrink-0 self-center rounded-2.5xl border border-line shadow-card"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
