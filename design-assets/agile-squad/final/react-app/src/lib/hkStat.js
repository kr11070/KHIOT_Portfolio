// hk-stat 수치 하이라이트 팝오버 엔진 — 원본 initHkStatHighlight 이식.
// 본문은 dangerouslySetInnerHTML 로 렌더링되므로, 렌더 후 이 함수를 ref 에 대해 실행해
// 각 .hk-stat 요소에 팝오버 마크업과 클릭 동작을 부착합니다.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function initHkStatHighlight(root) {
  root = root || document;
  root.querySelectorAll('.hk-stat').forEach(function (el) {
    if (el.dataset.hkInit) return;
    el.dataset.hkInit = '1';
    var label = el.dataset.label || '',
      unit = el.dataset.unit || '',
      basis = el.dataset.basis || '',
      source = el.dataset.source || '',
      def = el.dataset.def || '',
      sourceUrl = el.dataset.sourceUrl || '';
    var pop = document.createElement('span');
    pop.className = 'hk-stat-popover';
    var rows = '';
    if (label) rows += '<span class="hk-stat-row"><span class="hk-k">지표</span><span class="hk-v">' + escapeHtml(label) + '</span></span>';
    if (unit) rows += '<span class="hk-stat-row"><span class="hk-k">단위</span><span class="hk-v">' + escapeHtml(unit) + '</span></span>';
    if (basis) rows += '<span class="hk-stat-row"><span class="hk-k">기준시각</span><span class="hk-v">' + escapeHtml(basis) + '</span></span>';
    if (source) rows += '<span class="hk-stat-row"><span class="hk-k">출처</span><span class="hk-v">' + escapeHtml(source) + '</span></span>';
    var defBlock = def ? '<span class="hk-stat-def"><span class="hk-k">정의</span><p>' + escapeHtml(def) + '</p></span>' : '';
    var actions = sourceUrl ? '<span class="hk-stat-actions"><button type="button" class="hk-stat-btn" data-hk-action="source" data-hk-url="' + escapeHtml(sourceUrl) + '">원문 보기</button></span>' : '';
    pop.innerHTML = rows + defBlock + actions;
    el.appendChild(pop);
    el.addEventListener('click', function (e) {
      if (e.target.closest('.hk-stat-btn')) return;
      var wasOpen = el.classList.contains('hk-open');
      document.querySelectorAll('.hk-stat.hk-open').forEach(function (o) {
        o.classList.remove('hk-open');
      });
      if (!wasOpen) el.classList.add('hk-open');
    });
  });
}

// 문서 레벨 클릭 처리(원문 보기 버튼 / 바깥 클릭 시 닫기)를 한 번만 등록합니다.
let docHandlerAttached = false;
export function attachHkStatDocHandler() {
  if (docHandlerAttached) return;
  docHandlerAttached = true;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.hk-stat-btn[data-hk-action="source"]');
    if (btn) {
      var url = btn.dataset.hkUrl;
      if (url && url !== '#') window.open(url, '_blank', 'noopener');
      return;
    }
    if (!e.target.closest('.hk-stat')) {
      document.querySelectorAll('.hk-stat.hk-open').forEach(function (o) {
        o.classList.remove('hk-open');
      });
    }
  });
}
