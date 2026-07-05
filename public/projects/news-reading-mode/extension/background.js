// server/ 폴더를 Netlify에 배포한 백엔드 사이트 주소입니다.
const API_BASE_URL = 'https://agileserver.netlify.app';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'NRM_SIMPLIFY') return false;

  (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/.netlify/functions/simplify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message.text, level: message.level, lang: message.lang }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`서버 응답 오류 (${res.status}): ${body.slice(0, 200)}`);
      }

      const data = await res.json();
      sendResponse({ ok: true, text: data.simplifiedText });
    } catch (err) {
      sendResponse({ ok: false, error: err.message });
    }
  })();

  return true; // keep the message channel open for the async response
});
