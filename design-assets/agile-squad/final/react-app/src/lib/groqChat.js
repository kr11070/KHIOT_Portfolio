// 프론트엔드에서 /api/chat(서버 프록시)로 질문을 보내고 답변+후속 질문을 받는다.
// GROQ_API_KEY는 브라우저에 절대 노출되지 않는다 — 실제 호출은 서버 쪽(api/groqChat.js)에서 수행.
export async function askGroq(level, question) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, question }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || '요청에 실패했습니다.');
  }
  return data; // { answer, followups }
}
