"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const API_KEY_STORAGE = "song-sora-anthropic-key";
const MODEL = "claude-sonnet-5";

const SYSTEM_PROMPT = `당신은 "송소라"라는 이름의 UX 리서치 페르소나를 연기하는 AI입니다. 이 페르소나는 2026년 7월 20일 진행된 실제 사용자 인터뷰(신규 뉴스 기록 서비스 '한경 페이퍼' UX 리서치, Group Act 팀 프로젝트)를 바탕으로 만들어졌습니다.

## 기본 정보
- 이름: 송소라, 32세, 서울 강동구 거주
- 직업: 인사관리 직장인 (인재개발팀 교육훈련 사무원)
- 성향: "정리 덕후" — 다이어리와 노션으로 하루를 기록하고 정돈하는 걸 좋아함. 커리어 성장(인사관리 분야)과 자산 관리에 관심이 많음.

## 목표
- 인사관리 전문성 강화를 위한 업계 동향 파악
- 경제·자산 지식을 체계적으로 쌓기
- 기록을 통한 자기계발과 성취감 확보

## 페인포인트
- 뉴스에서 읽은 핵심 맥락과 수치가 금방 휘발됨
- 스크랩함에 저장만 하고 다시 안 보게 됨
- 표·그래프가 본문과 따로 놀아서 이해가 늦음
- 기록하는 데 생각보다 시간이 많이 듦

## 니즈
- 출근길 짧은 시간 안에 핵심만 빠르게 파악
- 읽은 내용을 "나만의 자료"로 축적
- 뉴스를 내 자산 상황과 연결해서 이해
- SNS 공유로 함께 공부

## 행동 패턴
- 평일 아침 8시, 출근길 지하철에서 포털 앱 헤드라인 위주로 뉴스를 훑음
- 깊이 있는 트렌드 분석이 필요할 땐 한국경제 기사를 찾아 읽음
- 정보가 휘발되는 게 싫어서 카카오톡이나 노션에 직접 옮겨 적는데, 이게 번거로움
- 핵심 문장엔 형광펜을 긋고 짧은 인사이트를 메모하는 습관
- 카페에서 SNS(인스타)에 감성 공유 카드를 올리는 걸 좋아함

## 기능 선호도 (한경 페이퍼 서비스에 대해)
1순위 "내 지갑 번역기" — 금리·물가 같은 거시 뉴스를 내 대출이자·적금 영향으로 개인화해주는 기능에 가장 큰 매력을 느낌
2순위 AI 패널(질의응답/요약)과 쉬운 말 풀이 — 유용하지만 필수까진 아님
3순위 게이미피케이션 리워드(디지털 서재, 스티커) — 초반 흥미 요소는 되지만, 오프라인 세미나 예약권 같은 실질적 혜택과 연결돼야 지속 동기가 됨

## 인터뷰에서 실제로 한 말 (말투 참고용)
- "핵심 수치가 한눈에 들어오면 좋겠어요"
- "데이터가 한눈에 들어오면 이해하기 좋을 것 같아요"
- "그건 '나만의 자료'가 되는 거잖아요"
- "지식이 시각적으로 쌓이는 게 보이면 습관이 될 것 같아요"
- "공유 카드를 앱에서 바로 만들어주면 자주 올릴 것 같아요"
- "내 성장에 도움 되는 앱이라는 인상을 받으면 충성도가 높아질 것 같아요"

## 답변 규칙
- 항상 1인칭으로, 위 인물이 되어 자연스러운 존댓말(해요체)로 답하세요. 인터뷰이가 실제로 답하듯 구체적인 일상 디테일(지하철, 형광펜, 노션, 카페, 디지털 서재 등)을 섞어서 대답하세요.
- 답변은 2~5문장 정도로 짧고 자연스럽게. 설문 답변처럼 딱딱하게 나열하지 마세요.
- 위에 없는 정보(가족관계, 정치성향, 구체적 회사명 등)를 물으면, 실제 인터뷰에서 다루지 않은 부분이라 자연스럽게 얼버무리거나 "그건 인터뷰에서 여쭤보지 않으셨네요" 식으로 캐릭터를 유지하면서 넘어가세요. 없는 사실을 지어내 단정하지 마세요.
- 누군가 "너 AI야?", "진짜 사람이야?" 같은 정체성 질문을 하면, 캐릭터를 벗고 솔직하게 답하세요: 이것은 실제 UX 인터뷰를 바탕으로 만든 AI 페르소나 시뮬레이션이며, 실존 인물의 신원이 아니라는 점을 알려주세요.
- 인사말이나 잡담에도 페르소나답게(정리·기록을 좋아하는 성향) 반응하세요.`;

const INTRO_MESSAGE =
  "안녕하세요! 저는 '한경 페이퍼' UX 리서치 인터뷰를 바탕으로 만들어진 AI 페르소나, 송소라예요. 뉴스 읽는 습관이나 기록하는 방식에 대해 궁금하신 거 편하게 물어보세요 :)";

export default function SongSoraInterviewArticle() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(API_KEY_STORAGE);
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveKey = (value: string) => {
    setApiKey(value);
    if (value.trim()) {
      window.localStorage.setItem(API_KEY_STORAGE, value.trim());
    } else {
      window.localStorage.removeItem(API_KEY_STORAGE);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    if (!apiKey.trim()) {
      setError("먼저 Anthropic API 키를 입력해주세요.");
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`(${res.status}) ${body.slice(0, 200)}`);
      }

      const data = await res.json();
      const reply: string =
        data?.content?.map((block: { text?: string }) => block.text ?? "").join("") ?? "";

      setMessages([...nextMessages, { role: "assistant", content: reply || "(응답이 비어있어요)" }]);
    } catch (err) {
      setError(
        `메시지를 보내지 못했어요: ${(err as Error).message}. API 키가 맞는지, 사용량 한도가 남아있는지 확인해주세요.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-accent-deep hover:underline">
        <span aria-hidden="true">←</span> 홈으로 돌아가기
      </Link>

      <p className="mt-8 text-xs font-bold uppercase tracking-widest text-ink-faint">
        AI 페르소나 인터뷰 시뮬레이터
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">송소라와 1:1 인터뷰</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Group Act 팀 프로젝트 &apos;한경 페이퍼&apos; UX 리서치의 실제 인터뷰(2026.07.20)와 사용자 시나리오를
        학습한 AI가 그 페르소나로 답합니다. 실존 인물이 아니라, 인터뷰 데이터를 재구성한 시뮬레이션이에요.
      </p>

      <div className="mt-6 rounded-2.5xl border border-line bg-white/70 p-5">
        <label htmlFor="api-key" className="text-sm font-bold text-ink">
          Anthropic API 키
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="api-key"
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => saveKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-accent-dark"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="shrink-0 rounded-xl border border-line px-3 py-2 text-xs font-bold text-ink-soft hover:border-accent-dark"
          >
            {showKey ? "숨기기" : "보기"}
          </button>
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          이 키는 브라우저(localStorage)에만 저장되고, Anthropic 서버로 직접 전송돼요. 이 사이트 서버로는 전송되지
          않습니다. 키가 없다면{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent-deep hover:underline"
          >
            console.anthropic.com
          </a>
          에서 발급받을 수 있어요.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2.5xl border border-line bg-white/70 p-5">
        <div className="flex max-h-[480px] flex-col gap-3 overflow-y-auto">
          <ChatBubble role="assistant" content={INTRO_MESSAGE} />
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && <ChatBubble role="assistant" content="…" typing />}
          <div ref={bottomRef} />
        </div>

        {error && <p className="text-sm font-bold text-red-600">{error}</p>}

        <div className="flex items-end gap-2 border-t border-line pt-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="송소라 님에게 궁금한 걸 물어보세요 (Enter로 전송, Shift+Enter로 줄바꿈)"
            rows={2}
            className="w-full resize-none rounded-xl border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-accent-dark"
          />
          <button
            type="button"
            onClick={send}
            disabled={loading || !input.trim()}
            className="btn-glossy shrink-0 rounded-xl px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            보내기
          </button>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={resetChat}
            className="self-start text-xs font-bold text-ink-faint hover:text-accent-deep hover:underline"
          >
            대화 초기화
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-faint">
        인터뷰 원본 자료는{" "}
        <a
          href="https://github.com/aykim-portfolio/2_hk_uxui_05_teamproject_groupact"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-accent-deep hover:underline"
        >
          Group Act 팀 프로젝트 저장소
        </a>
        에서 볼 수 있어요.
      </p>
    </main>
  );
}

function ChatBubble({
  role,
  content,
  typing = false,
}: {
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
        {!isUser && <p className="mb-1 text-xs font-bold text-accent-deep">송소라</p>}
        <div
          className={`rounded-2.5xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser ? "bg-accent-soft text-ink" : "bg-cream-deep text-ink"
          }`}
        >
          {typing ? (
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
            </span>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
