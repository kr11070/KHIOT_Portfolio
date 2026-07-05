const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// 쉬운말/쉽게읽기는 "번역"이 아니라 같은 언어 안에서의 난이도 조절이므로,
// 원문이 어떤 언어든 그 언어를 유지해야 한다. 그런데 "원문과 동일한 언어로 답해"처럼
// 한국어로 된 지시만 줘서는, 모델이 시스템 프롬프트 자체의 언어(한국어)에 끌려가서
// 결국 한국어로 답하는 경우가 많았다 (지시 문구에 언어 이름만 못박아도 마찬가지였음).
// 그래서 지시 자체를 해당 언어로 작성해서, 모델이 프롬프트의 언어를 그대로 잇게 만든다.
const COMMON_RULES = {
  ko: '결과는 문단마다 줄바꿈으로 구분해서 순수 텍스트로만 답해줘 (마크다운, HTML 태그 사용 금지). ' +
    '원문의 핵심 사실과 수치는 빠뜨리지 말고 그대로 유지해줘. ' +
    '반드시 한국어로만 답하고, 다른 언어나 문자는 절대 섞지 마.',
  en: 'Respond in plain text only, separating paragraphs with line breaks (no markdown or HTML tags). ' +
    'Keep every key fact and figure from the original. ' +
    'Respond only in English — do not mix in Korean or any other language.',
  ja: '結果は段落ごとに改行で区切ったプレーンテキストのみで答えてください（マークダウンやHTMLタグは禁止）。' +
    '原文の重要な事実や数値は省略せずそのまま残してください。' +
    '必ず日本語のみで答え、韓国語など他の言語や文字を絶対に混ぜないでください。',
};

const LEVEL_TASKS = {
  ko: {
    // 쉬운말: 원문보다 쉽지만 정보는 상세히 유지
    simple:
      '너는 뉴스 기사를 쉬운 말로 다시 써주는 도우미야. ' +
      '어려운 용어나 전문 용어는 풀어서 설명하고, "-습니다"체로 정중하게 써줘. ' +
      '원문보다는 이해하기 쉽게 바꾸되, 세부 정보는 최대한 유지해줘. ',
    // 쉽게읽기: 훨씬 더 단순하고 짧은 문장, 친근한 말투
    easy:
      '너는 뉴스 기사를 초등학교 저학년도 이해할 수 있을 만큼 아주 쉬운 말로 다시 써주는 도우미야. ' +
      '문장은 아주 짧게 끊어서, 친근하고 부드러운 말투로 써줘. ' +
      '어려운 단어는 완전히 풀어서 설명하고, 세부 설명은 줄이더라도 핵심 사실은 꼭 남겨줘. ',
  },
  en: {
    simple:
      'You are an assistant who rewrites news articles in simpler language. ' +
      'Explain difficult or technical terms in plain words, and use a polite, neutral tone. ' +
      'Make it easier to understand than the original while keeping the details as complete as possible. ',
    easy:
      'You are an assistant who rewrites news articles in extremely simple language, suitable for a young child. ' +
      'Use very short sentences and a warm, friendly tone. ' +
      'Fully explain any difficult words; you may drop minor details but must keep the key facts. ',
  },
  ja: {
    simple:
      'あなたはニュース記事をやさしい言葉に書き直すアシスタントです。' +
      '難しい専門用語はわかりやすく説明し、丁寧な言葉遣いで書いてください。' +
      '原文より理解しやすくしつつ、できるだけ詳しい情報を残してください。 ',
    easy:
      'あなたはニュース記事を小学校低学年でも理解できるくらいとてもやさしい言葉に書き直すアシスタントです。' +
      '文章はとても短く区切り、親しみやすく柔らかい言い方で書いてください。' +
      '難しい言葉は完全に説明し、細かい説明は省いても構いませんが、重要な事実は必ず残してください。 ',
  },
};

// 번역: 영어/일본어 등 외국어 기사를 자연스러운 한국어로 옮김 (여기서만 실제로 한국어로 바뀜)
const TRANSLATE_PROMPT =
  '너는 전문 번역가야. 다음 뉴스 기사를 자연스러운 한국어로 번역해줘. ' +
  '의역으로 뜻을 바꾸지 말고, 원문의 의미와 뉘앙스를 정확하게 전달하는 데 집중해줘. ' +
  '문단 구성도 원문과 비슷하게 유지해줘. ' +
  '숫자·단위·화폐 단위(예: 兆, 億, ウォン, %)와 회사명 뒤에 붙는 접미사(예: 社, 株式会社)도 ' +
  '한자나 가나를 그대로 옮겨적지 말고 반드시 한국어 표기(예: 조, 억, 원)로 바꿔줘. ' +
  COMMON_RULES.ko;

function buildSystemPrompt(level, lang) {
  if (level === 'translate') return TRANSLATE_PROMPT;
  const langKey = lang === 'en' || lang === 'ja' ? lang : 'ko';
  const tasks = LEVEL_TASKS[langKey];
  const task = tasks[level] || tasks.simple;
  return task + COMMON_RULES[langKey];
}

// llama-3.3-70b-versatile가 일본어 원문의 숫자/단위/회사 접미사 한자·가나를
// 지시에도 불구하고 그대로 남기는 경우가 있어(예: "10兆ウォン"), 번역 결과에
// 한해 자주 나오는 패턴을 후처리로 한국어 표기로 치환한다.
function fixJapaneseLeakage(text) {
  return text
    .replace(/株式会社/g, '주식회사')
    .replace(/兆/g, '조')
    .replace(/億/g, '억')
    .replace(/万/g, '만')
    .replace(/ウォン/g, '원')
    .replace(/ドル/g, '달러')
    .replace(/円/g, '엔')
    .replace(/\s*社/g, '')
    .replace(/[ \t]{2,}/g, ' ');
}

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
  let level;
  let lang;
  try {
    ({ text, level, lang } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: '잘못된 요청 본문입니다.' }) };
  }

  if (!text || typeof text !== 'string') {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'text 필드가 필요합니다.' }) };
  }

  const systemPrompt = buildSystemPrompt(level, lang);

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
          { role: 'system', content: systemPrompt },
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
    let simplifiedText = data.choices?.[0]?.message?.content?.trim();

    if (!simplifiedText) {
      return { statusCode: 502, headers: corsHeaders, body: JSON.stringify({ error: 'Groq 응답에서 텍스트를 찾지 못했습니다.' }) };
    }

    if (level === 'translate') simplifiedText = fixJapaneseLeakage(simplifiedText);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ simplifiedText }),
    };
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message }) };
  }
};
