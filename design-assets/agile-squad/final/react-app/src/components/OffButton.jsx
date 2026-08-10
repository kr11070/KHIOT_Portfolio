// 좌측 하단 OFF 버튼 — 클릭 시 브라우저 이전 화면으로 돌아감(뒤로가기).
export default function OffButton() {
  return (
    <button
      type="button"
      className="off-btn"
      aria-label="AIS 모드 종료"
      onClick={() => window.history.back()}
    >
      OFF
    </button>
  );
}
