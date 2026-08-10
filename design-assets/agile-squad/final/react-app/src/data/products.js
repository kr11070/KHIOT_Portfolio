// 구독 상품 목록 — 원본 프로토타입의 products 배열 그대로.
export const products = [
  { id: 1, name: '한경 디지털 에디션', desc: '국내 최고 경제지의 깊이 있는 분석 기사를 PC와 모바일 어디서든 고화질 지면으로', price: 9900, bg: '#e8f3ff', ic: '#3182f6', icon: 'ti-device-desktop' },
  { id: 2, name: '한경 비즈니스', desc: '심층적인 비즈니스 인사이트와 트렌드 분석이 담긴 주간 경제 매거진을 디지털로', price: 12000, bg: '#eef2ff', ic: '#6366f1', icon: 'ti-briefcase' },
  { id: 3, name: '모바일 한경', desc: '출퇴근 시간, 바쁜 일상 속에서 가장 빠르게 주요 뉴스를 브리핑해주는 모바일 앱', price: 7500, bg: '#f0fdf4', ic: '#10b981', icon: 'ti-device-mobile' },
  { id: 4, name: '글로벌 마켓', desc: '월가 현지 특파원들이 전하는 생생한 글로벌 시장 분석과 투자 전략 리포트를 독점으로', price: 15000, bg: '#fffbeb', ic: '#f59e0b', icon: 'ti-world' },
  { id: 5, name: '한경 마켓인사이트', desc: '자본시장의 A to Z. IPO·M&A·공시 분석 등 전문가를 위한 심층 리포트', price: 22000, bg: '#fff1f2', ic: '#ef4444', icon: 'ti-chart-candle' },
];

// 선택 개수별 번들 할인율.
export function discountRate(count) {
  return count <= 1 ? 0 : count === 2 ? 0.1 : count === 3 ? 0.2 : 0.3;
}

export function formatKRW(n) {
  return n.toLocaleString('ko-KR') + '원';
}
