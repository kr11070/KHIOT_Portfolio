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

  // Agile Squad 프로토타입과 동일한 3단계: 원문(0) / 쉬운말(1) / 쉽게읽기(2)
  const LEVELS = ['original', 'simple', 'easy'];
  const LEVEL_TOPS = [15, 50, 85]; // 트랙 안에서 각 단계의 점/노브 위치(%)
  let appliedLevel = 0; // 현재 본문에 적용된 단계
  let loading = false;
  const memoryCache = {}; // { simple: html, easy: html } — 이 페이지를 보는 동안만 유지

  // ── 세로 슬라이더 UI (프로토타입의 rlv 구조 이식) ──
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
    '  <div class="nrm-rlv-knob" style="top:' + LEVEL_TOPS[0] + '%"><div class="nrm-rlv-knob-dot"></div></div>' +
    '</div>' +
    '<span class="nrm-rlv-label" data-level="2">쉽게읽기</span>';
  document.body.appendChild(root);

  const track = root.querySelector('.nrm-rlv-track');
  const knob = root.querySelector('.nrm-rlv-knob');
  const dots = root.querySelectorAll('.nrm-rlv-dot');
  const labels = root.querySelectorAll('.nrm-rlv-label');

  function setKnob(levelIndex) {
    knob.style.top = LEVEL_TOPS[levelIndex] + '%';
    dots.forEach((d, i) => d.classList.toggle('active', i === levelIndex));
    labels.forEach((l) => l.classList.toggle('active', Number(l.dataset.level) === levelIndex));
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

  function storageKey(level) {
    return `nrm-cache:${location.href}:${level}`;
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

  function textToHtml(text) {
    return text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => `<p>${line.trim()}</p>`)
      .join('');
  }

  async function requestSimplifiedText(rawText, level) {
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

  async function selectLevel(nextIndex) {
    if (loading) return;
    if (nextIndex === appliedLevel) {
      setKnob(nextIndex); // 드래그 후 제자리로 스냅만
      return;
    }
    const level = LEVELS[nextIndex];
    const prevIndex = appliedLevel;

    if (level === 'original') {
      container.innerHTML = originalHtml;
      appliedLevel = nextIndex;
      setKnob(nextIndex);
      return;
    }

    if (memoryCache[level]) {
      container.innerHTML = memoryCache[level];
      appliedLevel = nextIndex;
      setKnob(nextIndex);
      return;
    }

    loading = true;
    knob.classList.add('loading');
    setKnob(nextIndex); // 노브는 먼저 이동시키고, 실패하면 되돌린다

    try {
      let html = await loadFromStorage(level);
      if (!html) {
        const simplifiedText = await requestSimplifiedText(originalText, level);
        html = textToHtml(simplifiedText);
        saveToStorage(level, html);
      }
      memoryCache[level] = html;
      container.innerHTML = html;
      appliedLevel = nextIndex;
    } catch (err) {
      setKnob(prevIndex);
      showToast('변환에 실패했어요: ' + err.message);
    } finally {
      loading = false;
      knob.classList.remove('loading');
    }
  }

  // ── 트랙 드래그: 노브가 포인터를 연속적으로 따라오고, 놓으면 가장 가까운 단계로 스냅 ──
  const MIN_TOP = LEVEL_TOPS[0];
  const MAX_TOP = LEVEL_TOPS[LEVEL_TOPS.length - 1];
  let dragging = false;

  // 포인터 Y좌표 → 트랙 안에서의 노브 위치(%). 점 범위(15~85%) 밖으로는 못 나가게 클램프.
  function topPercentFromEvent(e) {
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return Math.max(MIN_TOP, Math.min(MAX_TOP, ratio * 100));
  }

  // 현재 노브 위치(%)에서 가장 가까운 단계 인덱스
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

  function moveKnobFree(topPercent) {
    knob.style.top = topPercent + '%';
    // 드래그 중에는 가장 가까운 단계를 점/라벨 하이라이트로만 미리 보여준다 (변환은 아직 안 함)
    const near = nearestLevel(topPercent);
    dots.forEach((d, i) => d.classList.toggle('active', i === near));
    labels.forEach((l) => l.classList.toggle('active', Number(l.dataset.level) === near));
  }

  track.addEventListener('pointerdown', (e) => {
    if (loading) return;
    dragging = true;
    knob.classList.add('dragging'); // top 트랜지션 끄기 → 포인터에 1:1로 붙어서 움직임
    try { track.setPointerCapture(e.pointerId); } catch (_) {}
    moveKnobFree(topPercentFromEvent(e));
  });

  track.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    moveKnobFree(topPercentFromEvent(e));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    knob.classList.remove('dragging'); // 트랜지션 다시 켜기 → 스냅이 부드럽게
    try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    selectLevel(nearestLevel(topPercentFromEvent(e)));
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  labels.forEach((l) => l.addEventListener('click', () => selectLevel(Number(l.dataset.level))));
})();
