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

  // 원문 → 쉬운말 → 쉽게읽기 → 원문 순으로 순환. 버튼 라벨은 "누르면 다음에 될 상태"를 보여준다.
  const LEVELS = ['original', 'simple', 'easy'];
  const NEXT_LABEL = { original: '쉬운말', simple: '쉽게읽기', easy: '원문' };
  let levelIndex = 0;
  const memoryCache = {}; // { simple: html, easy: html } - 이 페이지를 보는 동안만 유지

  const btn = document.createElement('button');
  btn.id = 'nrm-floating-btn';
  btn.type = 'button';
  btn.dataset.state = 'off';
  btn.innerText = NEXT_LABEL[LEVELS[levelIndex]];
  document.body.appendChild(btn);

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

  function setButtonToLevel(nextIndex, state) {
    levelIndex = nextIndex;
    btn.dataset.state = state;
    btn.innerText = NEXT_LABEL[LEVELS[levelIndex]];
  }

  async function applyLevel(nextIndex) {
    const level = LEVELS[nextIndex];

    if (level === 'original') {
      container.innerHTML = originalHtml;
      setButtonToLevel(nextIndex, 'off');
      return;
    }

    if (memoryCache[level]) {
      container.innerHTML = memoryCache[level];
      setButtonToLevel(nextIndex, 'on');
      return;
    }

    btn.dataset.state = 'loading';
    btn.innerText = '변환중';

    try {
      let html = await loadFromStorage(level);
      if (!html) {
        const simplifiedText = await requestSimplifiedText(originalText, level);
        html = textToHtml(simplifiedText);
        saveToStorage(level, html);
      }
      memoryCache[level] = html;
      container.innerHTML = html;
      setButtonToLevel(nextIndex, 'on');
    } catch (err) {
      setButtonToLevel(levelIndex, levelIndex === 0 ? 'off' : 'on');
      showToast('쉬운말 변환에 실패했어요: ' + err.message);
    }
  }

  btn.addEventListener('click', () => {
    if (btn.dataset.state === 'loading') return;
    const nextIndex = (levelIndex + 1) % LEVELS.length;
    applyLevel(nextIndex);
  });
})();
