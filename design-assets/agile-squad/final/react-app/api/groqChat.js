// Groq 채팅 요청 처리 (서버 전용). 이 파일은 src/ 밖에 두어 클라이언트 번들에 포함되지 않도록 하고,
// GROQ_API_KEY는 여기서만(Vite dev 미들웨어 / Netlify Function) 다룬다.
import { levels } from '../src/data/levels.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const TONE_BY_LEVEL = {
  0: '한국경제 기사 원문 특유의 정중하고 간결한 경제 저널리즘 문체(하십시오체)',
  1: '핵심을 놓치지 않으면서 쉬운 말로 풀어 설명하는 친절한 문체',
  2: '초등학생도 이해할 수 있을 만큼 쉽고 다정한 존댓말체',
};

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export async function handleChatRequest({ level, question, apiKey }) {
  if (!apiKey) throw new Error('GROQ_API_KEY가 설정되지 않았습니다.');
  const q = (question || '').trim();
  if (!q) throw new Error('질문이 비어 있습니다.');

  const lvl = levels[level] ?? levels[0];
  const articleText = stripHtml(lvl.body);
  const tone = TONE_BY_LEVEL[level] ?? TONE_BY_LEVEL[0];

  const systemPrompt = [
    '당신은 뉴스 기사 하단에 붙은 AI 질의응답 어시스턴트입니다.',
    '아래 [기사 본문]에 실제로 담긴 내용만 근거로 답하세요. 본문에 없는 사실은 지어내지 말고,',
    '답을 찾을 수 없으면 정중히 "기사에서 확인할 수 없는 내용입니다"라는 취지로 안내하세요.',
    `문체: ${tone}`,
    '반드시 한국어로, 다음 JSON 형식으로만 답하세요(다른 텍스트 금지):',
    '{"answer": "본문에 근거한 답변", "followups": ["후속 질문1", "후속 질문2", "후속 질문3"]}',
    'followups는 이 기사 내용을 바탕으로 독자가 이어서 궁금해할 만한 질문 정확히 3개.',
  ].join('\n');

  const userPrompt = `[기사 제목]\n${lvl.title}\n\n[기사 본문]\n${articleText}\n\n[독자 질문]\n${q}`;

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
      max_tokens: 700,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Groq API 오류 (${res.status}): ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content ?? '{}';

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { answer: raw, followups: [] };
  }

  const answer = typeof parsed.answer === 'string' && parsed.answer.trim()
    ? parsed.answer.trim()
    : '답변을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.';
  const followups = Array.isArray(parsed.followups)
    ? parsed.followups.filter((x) => typeof x === 'string' && x.trim()).slice(0, 3)
    : [];

  return { answer, followups };
}
