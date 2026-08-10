// Epic AI 사이드바: 무료/유료 토글, 탭(AI 검증 대화 / 이해관계자 시각), 페이월.
import { useRef, useState } from 'react';
import { levels } from '../data/levels';
import { askGroq } from '../lib/groqChat';

// 이 기사에서 확인 가능한 프리미엄 인사이트 수(읽기 난이도와 무관하게 항상 동일한 고정값).
// 원문(levels[0]) 기준 hk-stat 검증 수치 개수 + 이해관계자 시각 카드 수(3개)로 계산.
// 현재 읽기 레벨의 본문을 기준으로 세면 쉽게읽기 모드일 때 수치가 급감해 버려,
// "쉬운 읽기" 자체를 위축시키는 신호가 되므로 항상 원문 기준으로 고정한다.
const INSIGHT_COUNT = (levels[0].body.match(/class="hk-stat"/g) || []).length + 3;

// 추천 질문. label은 칩에 보여줄 짧은 문구, question은 실제로 입력창에 채워질(=질문될) 전체 문장.
const SUGGESTED_QUESTIONS = [
  { label: '상하수도 순손실 2조3138억원의 출처는?', question: '상하수도 순손실 2조3138억원의 정확한 출처는?' },
  { label: '우리 지역 3인 가구 요금 인상액은?', question: '우리 지역 3인 가구 기준 요금 인상액은 얼마인가요?' },
  { label: '요금 현실화율이 낮은 지자체 순위는?', question: '요금 현실화율이 낮은 지자체 순위 요약은?' },
];
// 쉽게읽기 모드(level 2) 전용 추천 질문.
const EASY_SUGGESTED_QUESTIONS = [
  { label: '2조3138억원은 어디서 나온 숫자예요?', question: '2조3138억원은 어디서 나온 숫자예요?' },
  { label: '우리 집 수도요금은 얼마나 오르나요?', question: '우리 집 수도요금은 얼마나 오르나요?' },
  { label: '요금을 제일 조금 걷는 동네는 어디예요?', question: '요금을 제일 조금 걷는 동네는 어디예요?' },
];

export default function Sidebar({ level, onSubOpen, isPremium }) {
  const isPro = isPremium;
  const [tab, setTab] = useState('ai'); // 'ai' | 'stake'
  const [input, setInput] = useState('');
  const [flash, setFlash] = useState(false);
  const [askCount, setAskCount] = useState(0);
  const [messages, setMessages] = useState([]); // [{ id, question, answer, loading }] — 질문할 때마다 아래로 쌓임
  const [usedQuestions, setUsedQuestions] = useState(() => new Set()); // 이미 물어본 추천 질문(question 값 기준)
  const flashTimerRef = useRef(null);
  const msgIdRef = useRef(0);

  const lockedStyle = isPro
    ? { opacity: 1, pointerEvents: 'auto' }
    : { opacity: 0.3, pointerEvents: 'none' };

  const activeSuggestions = level === 2 ? EASY_SUGGESTED_QUESTIONS : SUGGESTED_QUESTIONS;
  const remainingSuggestions = activeSuggestions.filter((s) => !usedQuestions.has(s.question));

  // GROQ 연동: 서버 프록시(/api/chat)에 질문을 보내고, 기사 본문에 근거한 답변 + 후속 질문 3개를 받는다.
  // 실패 원인(레이트리밋, 네트워크 오류 등)은 콘솔에 남겨야 재현 없이도 디버깅할 수 있다.
  async function sendQuestion(id, question) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, loading: true, error: false } : m))
    );
    try {
      const { answer, followups } = await askGroq(level, question);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, loading: false, error: false, answer, followups } : m))
      );
    } catch (err) {
      console.error('[groq chat] 답변 요청 실패:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, loading: false, error: true, answer: '답변을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.', followups: [] }
            : m
        )
      );
    }
  }

  // 새 질문은 기존 대화 아래로 쌓이고(리스트), 각 항목은 등장할 때 페이드인된다.
  function handleAsk() {
    if (!isPro) return;
    const v = input.trim();
    if (!v) return;
    const id = msgIdRef.current++;
    setMessages((prev) => [...prev, { id, question: v, answer: '', loading: true, error: false, followups: [] }]);
    setInput('');
    setAskCount((n) => n + 1);
    if (activeSuggestions.some((s) => s.question === v)) {
      setUsedQuestions((prev) => new Set(prev).add(v));
    }
    sendQuestion(id, v);
  }

  function handleRetry(m) {
    if (!isPro || m.loading) return;
    sendQuestion(m.id, m.question);
  }

  // 키보드로 입력을 모두 지운 순간(비어있지 않다가 → 비게 됨)에만 flash 효과.
  function handleInputChange(e) {
    const next = e.target.value;
    if (input !== '' && next === '') {
      setFlash(false);
      requestAnimationFrame(() => setFlash(true));
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => setFlash(false), 350);
    }
    setInput(next);
  }

  return (
    <aside className="art-sidebar aside">
      <div className="art-sidebar-sticky">
        <p className="panel-title">AI 궁금증 해결소</p>
        <p className="panel-sub">
          {level === 2 ? '궁금한 점을 물어보세요!' : '기사 밖으로 나갈 필요 없는 원스톱 자본시장 분석'}
        </p>

        <div className="tab-bar">
          <button className={'tab-btn' + (tab === 'ai' ? ' active' : '')} onClick={() => setTab('ai')}>AI 대화</button>
          <button className={'tab-btn' + (tab === 'stake' ? ' active' : '')} onClick={() => setTab('stake')}>다른 생각</button>
        </div>

        {/* AI 검증 대화 */}
        <div className={'ai-view' + (tab === 'ai' ? ' active' : '')}>
          <div className="paywall-wrap">
            <div style={lockedStyle}>
              {messages.length === 0 && (
                <div className="chips">
                  {activeSuggestions.map((s) => (
                    <button key={s.question} className="chip" onClick={() => isPro && setInput(s.question)}>{s.label}</button>
                  ))}
                </div>
              )}
              {messages.length > 0 && (() => {
                const last = messages[messages.length - 1];
                // 마지막 답변에 AI가 생성한 후속 질문이 있으면 그걸 우선 보여주고,
                // 없으면(로딩 중이거나 실패한 경우) 기존 추천 질문으로 대체한다.
                const followupChips = !last.loading && last.followups && last.followups.length > 0
                  ? last.followups.map((q) => ({ label: q, question: q }))
                  : remainingSuggestions;
                return (
                  <>
                    <div className="ai-qa-list">
                      {messages.map((m) => (
                        <div className="ai-qa-item" key={m.id}>
                          <div className="ai-qa-bubble ai-qa-q">{m.question}</div>
                          <div className={'ai-qa-bubble ai-qa-a' + (m.loading ? ' loading' : '') + (m.error ? ' error' : '')}>
                            {m.loading ? (
                              <span className="ai-qa-dots"><span></span><span></span><span></span></span>
                            ) : m.answer}
                          </div>
                          {m.error && !m.loading && (
                            <button className="ai-qa-retry" onClick={() => handleRetry(m)}>다시 시도</button>
                          )}
                        </div>
                      ))}
                    </div>
                    {followupChips.length > 0 && (
                      <div className="chips">
                        {followupChips.map((s) => (
                          <button key={s.question} className="chip" onClick={() => isPro && setInput(s.question)}>{s.label}</button>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
              <div className="input-row">
                <input
                  className={'ai-input' + (flash ? ' flash' : '')}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                />
                <button className="ask-btn" onClick={handleAsk}>질문</button>
              </div>
              {level !== 2 && (
                <div className="sim-card">
                  <p className="sim-label"><i className="ti ti-chart-dots" aria-hidden="true"></i> 구독 활용 현황</p>
                  <div className="sim-grid">
                    <div className="sim-cell"><div className="sim-key">AI 검증 대화 사용</div><div className="sim-val">{askCount}회</div></div>
                    <div className="sim-cell"><div className="sim-key">이 기사 프리미엄 인사이트</div><div className="sim-val">{INSIGHT_COUNT}개</div></div>
                  </div>
                </div>
              )}
            </div>
            {!isPro && (
              <div className="paywall-overlay">
                <div className="lock-gate">
                  <div className="lock-icon"><i className="ti ti-lock" aria-hidden="true"></i></div>
                  <p className="lock-title">{level === 2 ? '돈을 내야 볼 수 있어요' : '유료 구독 전용 기능입니다'}</p>
                  <p className="lock-desc">
                    {level === 2
                      ? <>AI랑 대화하고 구독 현황을 보려면<br />한경 프리미엄에 가입해야 해요.</>
                      : <>AI 대화 및 구독 활용 현황은<br />한경 프리미엄 구독자에게 제공됩니다.</>}
                  </p>
                  <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>{level === 2 ? '구독하고 잠금 풀기 →' : '유료 구독 신청 후 잠금해제 →'}</button>
                  <p className="lock-cta-note">{level === 2 ? '2주 동안 공짜예요 · 언제든 그만둘 수 있어요' : '7일 무료 체험 후 결제 · 언제든 해지 가능'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 이해관계자 시각 */}
        <div className={'ai-view' + (tab === 'stake' ? ' active' : '')}>
          <div className="paywall-wrap">
            <div style={lockedStyle}>
              {level === 2 ? (
                <>
                  <div className="stake-card">
                    <p className="stake-label">정부 담당자 이야기</p>
                    <p className="stake-body">"상하수도 적자가 2조 원이 넘었어요. 그래서 요금을 올릴 수밖에 없어요. 낡은 관을 안 고치면 나중에 더 큰 사고가 날 수도 있거든요."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">창원·보령시 수도국 이야기</p>
                    <p className="stake-body">"여러 해 동안 요금을 안 올렸더니 해마다 100억 원 넘게 적자가 쌓였어요. 그래서 한꺼번에 말고 조금씩 나눠서 올리려고 해요."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">시민 단체 이야기</p>
                    <p className="stake-body">"요금이 갑자기 많이 오르면 형편이 어려운 분들이 더 힘들어져요. 요금을 올리기 전에 새는 물부터 먼저 줄여야 해요."</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="stake-card">
                    <p className="stake-label">행정안전부 지방재정 담당 입장</p>
                    <p className="stake-body">"상하수도 순손실이 2조원을 넘어선 만큼 요금 현실화는 불가피하다. 노후 관로 보수와 정수시설 투자 재원을 확보하지 못하면 안전 사고로 이어질 수 있다는 점을 지자체와 공유하고 있다."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">지자체(창원·보령 등) 상수도사업본부 설명</p>
                    <p className="stake-body">"수년간 요금을 동결해 온 탓에 연평균 100억원대 적자가 누적됐다. 단계적 인상으로 주민 부담을 최소화하되 원가 회수율을 정상화하는 것이 목표다."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">시민·소비자 단체 논평</p>
                    <p className="stake-body">"동시다발적 인상은 취약계층 생계비를 직접 압박한다. 요금 인상에 앞서 공기업 방만 경영 점검과 누수율 개선이 선행돼야 한다."</p>
                  </div>
                </>
              )}
            </div>
            {!isPro && (
              <div className="paywall-overlay">
                <div className="lock-gate">
                  <div className="lock-icon"><i className="ti ti-users" aria-hidden="true"></i></div>
                  <p className="lock-title">{level === 2 ? '다른 생각 보기 (구독자만)' : '다른 생각 요약 (유료 전용)'}</p>
                  <p className="lock-desc">
                    {level === 2
                      ? <>사람마다 다르게 생각하는 부분을<br />짧게 정리해 줘요.</>
                      : <>기사 원문 내의 다양한 이익집단의<br />상충되는 시선을 요약합니다.</>}
                  </p>
                  <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>{level === 2 ? '구독하고 잠금 풀기 →' : '유료 구독 신청 후 잠금해제 →'}</button>
                  <p className="lock-cta-note">{level === 2 ? '2주 동안 공짜예요 · 언제든 그만둘 수 있어요' : '7일 무료 체험 후 결제 · 언제든 해지 가능'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
