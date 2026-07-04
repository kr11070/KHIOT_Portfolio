const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT =
  '너는 뉴스 기사를 초등학생도 이해할 수 있는 쉬운 말로 다시 써주는 도우미야. ' +
  '문장은 짧게, 어려운 용어는 풀어서 설명하고, 원문의 핵심 사실과 수치는 그대로 유지해줘. ' +
  '결과는 문단마다 줄바꿈으로 구분해서 순수 텍스트로만 답해줘 (마크다운, HTML 태그 사용 금지).';

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'GROQ_API_KEY 환경변수가 설정되어 있지 않습니다.' }),
    };
  }

  let text;
  try {
    ({ text } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: '잘못된 요청 본문입니다.' }) };
  }

  if (!text || typeof text !== 'string') {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'text 필드가 필요합니다.' }) };
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Groq API 오류: ${errBody.slice(0, 300)}` }),
      };
    }

    const data = await res.json();
    const simplifiedText = data.choices?.[0]?.message?.content?.trim();

    if (!simplifiedText) {
      return { statusCode: 502, headers: corsHeaders, body: JSON.stringify({ error: 'Groq 응답에서 텍스트를 찾지 못했습니다.' }) };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ simplifiedText }),
    };
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message }) };
  }
};
