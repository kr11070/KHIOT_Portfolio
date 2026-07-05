(function () {
  'use strict';

  const SITE_CONFIGS = [
    { host: /(^|\.)news\.naver\.com$/, selector: '#dic_area, #articleBodyContents' },
    { host: /(^|\.)n\.news\.naver\.com$/, selector: '#dic_area, #articleBodyContents' },
    { host: /(^|\.)v\.daum\.net$/, selector: '.article_view, #harmonyContainer' },
    { host: /(^|\.)news\.daum\.net$/, selector: '.article_view, #harmonyContainer' },
    { host: /(^|\.)hankyung\.com$/, selector: 'div.article-contents, .article-body' },
    { host: /(^|\.)joongang\.co\.kr$/, selector: '#article_body' },
    { host: /(^|\.)donga\.com$/, selector: '.news_body' },
    { host: /(^|\.)hani\.co\.kr$/, selector: '.article-text' },
    { host: /(^|\.)yna\.co\.kr$/, selector: '#articleWrap' },
    // 조선일보는 자바스크립트로 기사를 나중에 그려주는 방식이라 선택자를 확정 검증하지 못했음.
    // 아래 selector가 안 맞으면 findArticleContainer의 <article> 태그 대체 로직으로 넘어감.
    { host: /(^|\.)chosun\.com$/, selector: 'article, .article-body' },
  ];

  function findArticleContainer() {
    const host = window.location.hostname;
    const config = SITE_CONFIGS.find((c) => c.host.test(host));
    const configured = config ? document.querySelector(config.selector) : null;
    if (configured) return configured;
    // 등록된 선택자가 없거나 페이지 구조가 달라 못 찾은 경우, 마지막으로 <article> 태그를 시도.
    return document.querySelector('article');
  }

  const container = findArticleContainer();
  if (!container) return;

  // 항상 "원문" 기준으로만 변환을 요청하기 위해, 처음 한 번만 원문 텍스트/HTML을 저장해둔다.
  const originalHtml = container.innerHTML;
  const originalText = container.innerText.trim().slice(0, 6000);

  // 대상 요소보다 앞(문서 순서상)에 나오는 텍스트의 총 길이. 요소 내부(캡션 등)는 제외.
  function textLengthBefore(rootEl, targetEl) {
    let len = 0;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const pos = targetEl.compareDocumentPosition(node);
      if (pos & Node.DOCUMENT_POSITION_PRECEDING && !(pos & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
        len += node.textContent.length;
      }
    }
    return len;
  }

  // 원문에 있던 이미지(figure/img)를 "원문 내 상대 위치(0~1)"와 함께 추출한다.
  // 변환본에서도 같은 비율 지점의 문단 사이에 끼워 넣어 원래 위치를 유지하기 위함.
  function extractImageItems(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    // 지연 로딩(lazy-load) 이미지는 진짜 사진이 로드되기 전까지 src에 흐린 플레이스홀더나
    // 투명 픽셀을 넣어두는 경우가 많다. src가 비어 있을 때뿐 아니라, data-* 속성에
    // 진짜 주소가 있으면 항상 그걸 우선해서 플레이스홀더를 덮어써야 한다.
    tmp.querySelectorAll('img').forEach((img) => {
      const lazySrc =
        img.getAttribute('data-src') ||
        img.getAttribute('data-lazy-src') ||
        img.getAttribute('data-original') ||
        img.getAttribute('data-original-src');
      if (lazySrc) img.setAttribute('src', lazySrc);

      const lazySrcset = img.getAttribute('data-srcset');
      if (lazySrcset) img.setAttribute('srcset', lazySrcset);

      // "loading=lazy"가 남아있으면 브라우저가 뷰포트 근처까지 또 로드를 미룰 수 있어 제거
      img.removeAttribute('loading');
    });
    const totalTextLen = (tmp.textContent || '').length || 1;
    const seen = new Set();
    const items = [];
    tmp.querySelectorAll('figure, img').forEach((el) => {
      if (el.tagName === 'IMG') {
        if (el.closest('figure')) return; // figure 안의 img는 figure 쪽에서 한 번만 수집
      } else if (!el.querySelector('img')) {
        return; // 이미지가 없는 figure는 제외
      }
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      const src = img.getAttribute('src');
      if (!src || seen.has(src)) return;
      seen.add(src);
      items.push({
        html: el.outerHTML,
        ratio: textLengthBefore(tmp, el) / totalTextLen,
      });
    });
    return items;
  }

  const imageItems = extractImageItems(originalHtml);

  // 원문이 한국어가 아니면(영어/일본어 등) 슬라이더 아래에 번역 버튼을 띄운다.
  // 문자 종류 비율로 대략 판별: 한글이 어느 정도 섞여 있으면 한국어로 간주해 건너뛴다.
  function detectForeignLanguage(text) {
    const sample = text.slice(0, 800);
    const hangul = (sample.match(/[가-힣]/g) || []).length;
    const kana = (sample.match(/[぀-ヿ]/g) || []).length; // 히라가나/가타카나 (일본어 고유)
    const latin = (sample.match(/[A-Za-z]/g) || []).length;
    const letters = hangul + kana + latin;
    if (letters < 20) return null; // 판별하기엔 글자 수가 너무 적음
    if (hangul / letters > 0.15) return null; // 한글이 섞여 있으면 한국어로 간주
    if (kana > 5) return 'ja';
    if (latin / letters > 0.5) return 'en';
    return null;
  }

  const foreignLang = detectForeignLanguage(originalText);

  // Agile Squad 프로토타입과 동일한 3단계: 원문(0) / 쉬운말(1) / 쉬운말(2)
  const LEVELS = ['original', 'simple', 'easy'];
  const LEVEL_TOPS = [15, 50, 85]; // 트랙 안에서 각 단계의 점/노브 위치(%)
  const HALF_GAP = (LEVEL_TOPS[1] - LEVEL_TOPS[0]) / 2; // 인접 단계 중간 지점까지의 거리

  let appliedLevel = 0; // 마지막으로 확정된 단계
  let displayedIndex = 0; // 지금 본문에 실제로 표시 중인 단계 (드래그 중엔 확정 전에도 바뀜; 번역 표시 중엔 -1)
  let busy = false; // 확정 후 변환/페이드가 끝날 때까지 true
  let translateOn = false; // 지금 번역본이 표시되고 있는지
  const memoryCache = {}; // { simple: html, easy: html, translate: html } — 이 페이지를 보는 동안만 유지
  const prefetching = {}; // { simple: Promise, ... } — 진행 중인 변환 요청 중복 방지

  // ── 세로 슬라이더 UI (프로토타입의 rlv 구조 이식) ──
  // #nrm-panel(화면에 고정되는 바깥 껍데기) 안에 슬라이더 카드와, 필요하면 번역 버튼을 세로로 쌓는다.
  const panel = document.createElement('div');
  panel.id = 'nrm-panel';
  document.body.appendChild(panel);

  const root = document.createElement('div');
  root.id = 'nrm-slider';
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', '읽기 난이도 선택');
  root.innerHTML =
    '<span class="nrm-rlv-label active" data-level="0">원문</span>' +
    '<div class="nrm-rlv-track">' +
    '  <span class="nrm-rlv-dot active" style="top:' + LEVEL_TOPS[0] + '%"></span>' +
    '  <span class="nrm-rlv-dot" style="top:' + LEVEL_TOPS[1] + '%"></span>' +
    '  <span class="nrm-rlv-dot" style="top:' + LEVEL_TOPS[2] + '%"></span>' +
    '  <div class="nrm-rlv-knob"><div class="nrm-rlv-knob-dot"></div></div>' +
    '</div>' +
    '<span class="nrm-rlv-label" data-level="2">쉬운말</span>';
  panel.appendChild(root);

  const track = root.querySelector('.nrm-rlv-track');
  const knob = root.querySelector('.nrm-rlv-knob');
  const dots = root.querySelectorAll('.nrm-rlv-dot');
  const labels = root.querySelectorAll('.nrm-rlv-label');

  // 한국어가 아닌 기사일 때만, 슬라이더 카드 바로 아래에 번역 버튼을 추가한다.
  let translateBtn = null;
  if (foreignLang) {
    translateBtn = document.createElement('button');
    translateBtn.id = 'nrm-translate-btn';
    translateBtn.type = 'button';
    translateBtn.textContent = '한국어로 번역';
    panel.appendChild(translateBtn);
  }

  // 노브는 top(%) 대신 transform: translateY(px)로 움직인다.
  // top은 매 프레임 레이아웃을 다시 계산해야 하는 속성이라, 빠르게 움직일 때
  // 원 모양이 위아래로 늘어져 보이는 렌더링 아티팩트가 생길 수 있다.
  // transform은 GPU 합성(compositing)만으로 처리되어 항상 매끈하게 움직인다.
  function setKnobPercent(percent) {
    const px = (percent / 100) * track.clientHeight;
    knob.style.transform = `translate(-50%, -50%) translateY(${px}px)`;
  }

  function setKnob(levelIndex) {
    setKnobPercent(LEVEL_TOPS[levelIndex]);
    highlightLevel(levelIndex);
  }

  setKnobPercent(LEVEL_TOPS[0]); // 초기 위치 지정 (transition 없이 즉시)

  function highlightLevel(levelIndex) {
    dots.forEach((d, i) => d.classList.toggle('active', i === levelIndex));
    labels.forEach((l) => l.classList.toggle('active', Number(l.dataset.level) === levelIndex));
  }

  // 번역 버튼의 표시 상태(글자/활성 스타일)만 갱신. 실제 본문 전환은 호출부에서 처리.
  function setTranslateState(on) {
    if (!translateBtn) return;
    translateOn = on;
    translateBtn.textContent = on ? '원문 보기' : '한국어로 번역';
    translateBtn.classList.toggle('active', on);
  }

  function showToast(message) {
    const existing = document.getElementById('nrm-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'nrm-toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // v5: 지연 로딩 플레이스홀더 대신 실제 이미지 주소를 항상 우선 사용하도록 추출 로직 변경
  function storageKey(level) {
    return `nrm-cache:v5:${location.href}:${level}`;
  }

  function loadFromStorage(level) {
    return new Promise((resolve) => {
      chrome.storage.local.get(storageKey(level), (result) => {
        resolve(result[storageKey(level)] || null);
      });
    });
  }

  function saveToStorage(level, html) {
    chrome.storage.local.set({ [storageKey(level)]: html });
  }

  // 원문 사이트 고유 스타일은 건드리지 않도록, 변환된 본문에만 프로토타입 스타일 래퍼(.nrm-converted)를 씌운다.
  function textToHtml(text) {
    const lines = text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => `<p>${line.trim()}</p>`);

    let body;
    if (!imageItems.length) {
      body = lines.join('');
    } else {
      // 각 이미지를 원문에서의 상대 위치(ratio)에 해당하는 문단 사이에 삽입한다.
      // 예: 원문 40% 지점에 있던 사진은 변환본에서도 문단 수 기준 40% 지점에 들어간다.
      const n = lines.length;
      const inserts = new Map(); // "lines[idx] 바로 앞" 위치 → 삽입할 이미지 HTML 목록
      imageItems.forEach((item) => {
        const idx = Math.max(0, Math.min(n, Math.round(item.ratio * n)));
        if (!inserts.has(idx)) inserts.set(idx, []);
        inserts.get(idx).push(item.html);
      });

      const result = [];
      for (let i = 0; i <= n; i++) {
        if (inserts.has(i)) {
          result.push('<div class="nrm-image">' + inserts.get(i).join('') + '</div>');
        }
        if (i < n) result.push(lines[i]);
      }
      body = result.join('');
    }

    return '<div class="nrm-converted">' + body + '</div>';
  }

  function requestSimplifiedText(rawText, level) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'NRM_SIMPLIFY', text: rawText, level }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (!response || !response.ok) {
          reject(new Error((response && response.error) || '알 수 없는 오류'));
          return;
        }
        resolve(response.text);
      });
    });
  }

  // 이미 캐시된 내용이 있으면 동기적으로 반환 (원문 포함). 없으면 null.
  function contentForLevel(levelIndex) {
    if (levelIndex === 0) return originalHtml;
    return memoryCache[LEVELS[levelIndex]] || null;
  }

  // 해당 단계의 변환 결과를 확보 (storage 캐시 → 없으면 AI 요청). 중복 요청은 하나로 합쳐짐.
  function ensureContent(level) {
    if (memoryCache[level]) return Promise.resolve(memoryCache[level]);
    if (prefetching[level]) return prefetching[level];
    const p = (async () => {
      let html = await loadFromStorage(level);
      if (!html) {
        const simplifiedText = await requestSimplifiedText(originalText, level);
        html = textToHtml(simplifiedText);
        saveToStorage(level, html);
      }
      memoryCache[level] = html;
      return html;
    })();
    prefetching[level] = p;
    p.then(
      () => { delete prefetching[level]; },
      () => { delete prefetching[level]; } // 실패 시 다음에 재시도할 수 있게 비워둔다
    );
    return p;
  }

  const FADE_MS = 220;

  // 트랜지션을 켠 상태로 본문 투명도를 목표값까지 페이드
  function fadeOpacityTo(value) {
    return new Promise((resolve) => {
      container.classList.add('nrm-fade');
      container.classList.remove('nrm-fade-drag');
      container.style.opacity = String(value);
      setTimeout(resolve, FADE_MS);
    });
  }

  // ── 단계 확정 (드래그 놓기 / 라벨 클릭) ──
  async function commitLevel(targetIndex) {
    if (busy) return;
    setKnob(targetIndex);

    // 드래그 중 이미 해당 단계 내용이 표시된 상태면, 투명도만 다시 올리면 끝
    // 단, 번역본이 표시 중이었다면(displayedIndex는 -1) 반드시 슬라이더 단계 내용으로 되돌려야 하므로 건너뛴다.
    if (targetIndex === displayedIndex && !translateOn) {
      appliedLevel = targetIndex;
      fadeOpacityTo(1);
      return;
    }

    busy = true;
    const level = LEVELS[targetIndex];
    const needsFetch = !contentForLevel(targetIndex);
    if (needsFetch) knob.classList.add('loading');

    try {
      const html = targetIndex === 0 ? originalHtml : await ensureContent(level);
      knob.classList.remove('loading');
      await fadeOpacityTo(0);
      container.innerHTML = html;
      displayedIndex = targetIndex;
      setTranslateState(false); // 슬라이더로 전환했으니 번역 버튼 상태도 원위치
      await fadeOpacityTo(1);
      appliedLevel = targetIndex;
    } catch (err) {
      knob.classList.remove('loading');
      setKnob(appliedLevel);
      // 드래그 중 다른 단계 내용이 표시돼 있었다면 확정 단계의 내용으로 되돌린다
      if (displayedIndex !== appliedLevel) {
        const fallback = contentForLevel(appliedLevel);
        if (fallback) {
          container.innerHTML = fallback;
          displayedIndex = appliedLevel;
        }
      }
      fadeOpacityTo(1);
      showToast('변환에 실패했어요: ' + err.message);
    } finally {
      busy = false;
    }
  }

  // ── 트랙 드래그: 노브가 포인터를 연속적으로 따라오고, 본문도 실시간으로 페이드 ──
  // 이동/놓기 이벤트는 window에서 받는다. 트랙 요소에만 걸면 포인터가 트랙을 벗어났을 때
  // pointerup을 놓쳐 드래그 상태가 꼬일 수 있다.
  const MIN_TOP = LEVEL_TOPS[0];
  const MAX_TOP = LEVEL_TOPS[LEVEL_TOPS.length - 1];
  let dragging = false;
  let lastTopPercent = LEVEL_TOPS[0];

  function topPercentFromEvent(e) {
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return Math.max(MIN_TOP, Math.min(MAX_TOP, ratio * 100));
  }

  function nearestLevel(topPercent) {
    let best = 0;
    let bestDist = Infinity;
    LEVEL_TOPS.forEach((t, i) => {
      const dist = Math.abs(topPercent - t);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }

  function onDragMove(topPercent) {
    lastTopPercent = topPercent;
    setKnobPercent(topPercent);

    const near = nearestLevel(topPercent);
    highlightLevel(near);

    // 중간 지점을 넘어 다른 단계 구역에 들어가면, 준비된 내용이 있을 때 본문을 바로 교체
    if (near !== displayedIndex) {
      setTranslateState(false); // 슬라이더를 만졌으니 번역 표시 상태는 해제
      const html = contentForLevel(near);
      if (html) {
        container.innerHTML = html;
        displayedIndex = near;
      } else {
        // 아직 변환 안 된 단계면 드래그 중에 미리 요청을 시작해둔다 (놓을 때쯤 준비되도록)
        ensureContent(LEVELS[near])
          .then((h) => {
            if (dragging && nearestLevel(lastTopPercent) === near && displayedIndex !== near) {
              container.innerHTML = h;
              displayedIndex = near;
            }
          })
          .catch(() => {}); // 드래그 중 프리페치 실패는 조용히 넘기고, 놓을 때 다시 시도
      }
    }

    // 노브가 단계 중심에서 멀어질수록 본문이 투명해짐 (중간 지점에서 최소 10%)
    const dist = Math.abs(topPercent - LEVEL_TOPS[near]);
    const t = Math.min(1, dist / HALF_GAP);
    container.style.opacity = String(1 - t * 0.9);
  }

  track.addEventListener('pointerdown', (e) => {
    if (busy) return;
    e.preventDefault();
    dragging = true;
    knob.classList.add('dragging'); // top 트랜지션 끄기 → 포인터에 1:1로 붙어서 움직임
    container.classList.add('nrm-fade', 'nrm-fade-drag'); // 투명도도 트랜지션 없이 즉각 반응
    onDragMove(topPercentFromEvent(e));
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    onDragMove(topPercentFromEvent(e));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    knob.classList.remove('dragging'); // 트랜지션 다시 켜기 → 스냅이 부드럽게
    commitLevel(nearestLevel(topPercentFromEvent(e)));
  }

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  labels.forEach((l) => l.addEventListener('click', () => commitLevel(Number(l.dataset.level))));

  // ── 번역 버튼: 슬라이더 단계와 별개로, 원문/번역본을 토글 ──
  if (translateBtn) {
    translateBtn.addEventListener('click', async () => {
      if (busy) return;

      if (translateOn) {
        // 끄기: 슬라이더가 가리키는 현재 단계 내용으로 복귀
        busy = true;
        setTranslateState(false);
        try {
          await fadeOpacityTo(0);
          container.innerHTML = contentForLevel(appliedLevel);
          displayedIndex = appliedLevel;
          await fadeOpacityTo(1);
        } finally {
          busy = false;
        }
        return;
      }

      busy = true;
      const needsFetch = !memoryCache.translate;
      if (needsFetch) {
        translateBtn.classList.add('loading');
        translateBtn.textContent = '번역 중...';
      }

      try {
        const html = await ensureContent('translate');
        translateBtn.classList.remove('loading');
        await fadeOpacityTo(0);
        container.innerHTML = html;
        displayedIndex = -1; // 슬라이더의 세 단계 어디에도 속하지 않는 상태
        setTranslateState(true);
        await fadeOpacityTo(1);
      } catch (err) {
        translateBtn.classList.remove('loading');
        setTranslateState(false);
        fadeOpacityTo(1);
        showToast('번역에 실패했어요: ' + err.message);
      } finally {
        busy = false;
      }
    });
  }
})();
