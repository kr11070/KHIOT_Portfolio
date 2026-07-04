(function () {
  'use strict';

  const SITE_CONFIGS = [
    { host: /(^|\.)news\.naver\.com$/, selector: '#dic_area, #articleBodyContents' },
    { host: /(^|\.)n\.news\.naver\.com$/, selector: '#dic_area, #articleBodyContents' },
    { host: /(^|\.)v\.daum\.net$/, selector: '.article_view, #harmonyContainer' },
    { host: /(^|\.)news\.daum\.net$/, selector: '.article_view, #harmonyContainer' },
    { host: /(^|\.)hankyung\.com$/, selector: 'div.article-contents, .article-body' },
  ];

  function findArticleContainer() {
    const host = window.location.hostname;
    const config = SITE_CONFIGS.find((c) => c.host.test(host));
    if (!config) return null;
    return document.querySelector(config.selector);
  }

  const container = findArticleContainer();
  if (!container) return;

  const originalHtml = container.innerHTML;
  let simplifiedHtml = null;
  let isOn = false;

  const btn = document.createElement('button');
  btn.id = 'nrm-floating-btn';
  btn.type = 'button';
  btn.dataset.state = 'off';
  btn.innerText = '쉬운말';
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

  async function requestSimplifiedText(rawText) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'NRM_SIMPLIFY', text: rawText }, (response) => {
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

  btn.addEventListener('click', async () => {
    if (btn.dataset.state === 'loading') return;

    if (isOn) {
      container.innerHTML = originalHtml;
      isOn = false;
      btn.dataset.state = 'off';
      btn.innerText = '쉬운말';
      return;
    }

    if (simplifiedHtml) {
      container.innerHTML = simplifiedHtml;
      isOn = true;
      btn.dataset.state = 'on';
      btn.innerText = '원문';
      return;
    }

    btn.dataset.state = 'loading';
    btn.innerText = '변환중';

    try {
      const rawText = container.innerText.trim().slice(0, 6000);
      const simplifiedText = await requestSimplifiedText(rawText);
      simplifiedHtml = simplifiedText
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => `<p>${line.trim()}</p>`)
        .join('');
      container.innerHTML = simplifiedHtml;
      isOn = true;
      btn.dataset.state = 'on';
      btn.innerText = '원문';
    } catch (err) {
      btn.dataset.state = 'off';
      btn.innerText = '쉬운말';
      showToast('쉬운말 변환에 실패했어요: ' + err.message);
    }
  });
})();
