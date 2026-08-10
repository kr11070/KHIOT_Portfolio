// ==UserScript==
// @name         한국경제 쉬운말 토글
// @match        https://www.hankyung.com/article/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const container = document.querySelector('div.article-contents');
  if (!container) return;

  // 창 폭이 이 값 이하일 때만 카드와 위치를 맞춤 (그 이상일 땐 DEFAULT_LEFT 고정값 사용)
  const NARROW_BREAKPOINT = 500;
  const DEFAULT_LEFT = 24;

  const btn = document.createElement('button');
  btn.innerText = 'AIS';
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    z-index: 999999;
    display: flex;
    width: 56px;
    height: 56px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    border: 2px solid rgba(180, 200, 255, 0.00);
    background: radial-gradient(50% 50% at 50% 50%, #FFF 0%, #F0F0F3 100%);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.08);
    color: #3182f6;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  `;
  document.body.appendChild(btn);

  // 한경PREMIUM9 카드(article-support) 요소
  const support = document.querySelector('div.article-support');

  function updateButtonPosition() {
    let left;

    if (window.innerWidth <= NARROW_BREAKPOINT && support) {
      left = support.getBoundingClientRect().left;
    } else {
      left = DEFAULT_LEFT;
    }

    if (left < 12) left = 12;
    btn.style.left = `${left}px`;
  }

  updateButtonPosition();
  window.addEventListener('resize', updateButtonPosition);
  window.addEventListener('load', updateButtonPosition);

  btn.addEventListener('click', () => {
    // 지금 보고 있는 원문 기사 URL을 쿼리 파라미터(from)에 실어서 함께 전달
    const currentArticleUrl = window.location.href;
    const targetUrl = `https://hkaisproject.netlify.app/?from=${encodeURIComponent(currentArticleUrl)}`;
    window.location.href = targetUrl;
  });
})();
