const journey = [
  {
    stage: "1. 탐색",
    behavior: "일몰 전, 오늘 밤 가볼 만한 야경 스팟 검색",
    feature: "일몰 시각 알림 및 스팟별 점등 상태 확인",
  },
  {
    stage: "2. 이동",
    behavior: "최적의 야경 동선 확인 및 이동",
    feature: "밤길 안전 경로 및 야간 셔틀/택시 정보",
  },
  {
    stage: "3. 도착",
    behavior: "유적지 도착 및 야경 감상",
    feature: "달빛 도슨트(오디오) 및 AR 과거 복원",
  },
  {
    stage: "4. 휴식",
    behavior: "야간 영업 중인 카페/바 찾기",
    feature: "'심야 영업' 필터링 및 창가 자리 예약",
  },
  {
    stage: "5. 기록",
    behavior: "야경 사진 촬영 및 공유",
    feature: "야경 촬영 가이드(필터/구도) 및 디지털 방명록",
  },
];

const screens = [
  {
    title: "홈 — 오늘의 경주 달빛",
    body: "일몰까지 남은 시간과 점등 상태를 배너로 안내하고, 동궁과 월지·첨성대·월정교 등 주요 스팟을 실시간 혼잡도(CROWD)와 함께 카드로 보여줍니다.",
    image: "/case-studies/moonlight-journey/home.png",
  },
  {
    title: "스팟 상세 — 동궁과 월지",
    body: "점등 시간과 한 줄 소개, 오디오로 들을 수 있는 '달빛 도슨트', 그 자리에서 보이는 별자리를 알려주는 '별빛 지도'로 구성됩니다.",
    image: "/case-studies/moonlight-journey/spot-detail.png",
  },
  {
    title: "달빛 도슨트 (오디오 가이드)",
    body: "경덕왕 시대의 역사와 다리의 재탄생 이야기를 들려주는 오디오 플레이어. 유적지에 도착했을 때 '체험'으로 노출됩니다.",
    image: "/case-studies/moonlight-journey/docent.png",
  },
  {
    title: "저녁 예보 — 날씨 정보",
    body: "관측 지수·습도·풍속·달의 모양을 종합해 '별 보기 좋은 밤' 같은 감성적인 상태 메시지로 전달하고, 시간별 온도·흐림 정도를 차트로 보여줍니다. 오늘의 관측 팁도 함께 제공합니다.",
    image: "/case-studies/moonlight-journey/weather.png",
  },
];

export default function MoonlightJourneyArticle() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-accent-deep">
        Service Design · Gyeongju
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
        달빛 기행 (Moonlight Journey)
      </h1>
      <p className="mt-3 text-lg italic text-ink-soft">&lsquo;별을 따라 걷는 경주길&rsquo;</p>

      <div className="mt-10 flex flex-col gap-14">
        {/* 서비스 개요 */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight">서비스 개요</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            일몰시간과 점등시간 정보를 전달하여 적절한 시간에 관광할 수 있도록 돕는 경주 야간
            관광 앱입니다. 가장 유명한 &lsquo;동궁과 월지&rsquo;부터 시작해 &lsquo;월정교&rsquo;,
            &lsquo;첨성대&rsquo; 등 주요 스팟의 유동인구를 실시간으로 파악하고, 야경 관측
            최적도를 시각화해 하늘의 맑음과 달의 밝기에 따라 &ldquo;달무리 맑음&rdquo;,
            &ldquo;별빛 흐림&rdquo; 등의 감성적인 상태 메시지를 전달합니다.
          </p>
          <p className="mt-2 leading-relaxed text-ink-soft">
            또한 해당 스팟에서 보이는 별자리를 알려주며, 걸어온 길따라 별조각이 남아
            &lsquo;나의 기록&rsquo;에서 확인할 수 있습니다.
          </p>
        </section>

        {/* 사용자 여정 */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight">사용자 여정 (User Journey)</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="py-2 pr-4">단계</th>
                  <th className="py-2 pr-4">사용자 여정</th>
                  <th className="py-2">기대 경험 &amp; 기능</th>
                </tr>
              </thead>
              <tbody>
                {journey.map((row) => (
                  <tr key={row.stage} className="border-b border-line/70 align-top">
                    <td className="py-3 pr-4 font-bold text-ink">{row.stage}</td>
                    <td className="py-3 pr-4 text-ink-soft">{row.behavior}</td>
                    <td className="py-3 text-ink-soft">{row.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  className="w-full max-w-[220px] shrink-0 self-center rounded-2.5xl border border-line shadow-card"
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
