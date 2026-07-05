// server/ 폴더를 Netlify에 배포한 백엔드 사이트 주소입니다.
const API_BASE_URL = 'https://agileserver.netlify.app';

// Netlify 함수가 콜드 스타트나 AI 응답 지연으로 간헐적으로 502/504를 내는 경우가 있어,
// 서버 오류(5xx)나 네트워크 실패는 잠깐 기다렸다가 한 번 자동 재시도한다.
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 1500;

async function callSimplify(payload) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let retryable = true;
    try {
      const res = await fetch(`${API_BASE_URL}/.netlify/functions/simplify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) return await res.json();

      const body = await res.text();
      // 4xx는 요청 자체가 잘못된 것이라 재시도해도 소용없음
      retryable = res.status >= 500;
      lastError = new Error(`서버 응답 오류 (${res.status}): ${body.slice(0, 200)}`);
    } catch (err) {
      lastError = err; // 네트워크 실패 등은 재시도 대상
    }
    if (!retryable) break;
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
  throw lastError;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'NRM_SIMPLIFY') return false;

  (async () => {
    try {
      const data = await callSimplify({ text: message.text, level: message.level, lang: message.lang });
      sendResponse({ ok: true, text: data.simplifiedText });
    } catch (err) {
      sendResponse({ ok: false, error: err.message });
    }
  })();

  return true; // keep the message channel open for the async response
});
