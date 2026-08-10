// 세로 읽기 레벨 슬라이더 (원문 / 쉬운말 / 쉽게읽기).
// 드래그 / 클릭 → Y좌표 비율로 레벨 계산 (원본 슬라이더 로직 이식).
import { useEffect, useRef, useState } from 'react';
import { percentageMap } from '../data/levels';

const GHOST_DURATION = 1000; // ms — .rlv-knob-ghost 페이드아웃 트랜지션과 동일하게 유지

const FOLLOW_EASE = 0.15; // 스크롤 후 목표 위치를 따라잡는 보간 계수 (클수록 빨리 따라붙음)

export default function ReadingLevelSlider({ level, onChange }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const prevLevelRef = useRef(level);
  const ghostIdRef = useRef(0);
  const [ghosts, setGhosts] = useState([]);
  const containerRef = useRef(null);
  const followRef = useRef(null);
  const currentYRef = useRef(null);

  // 레벨이 바뀌면 이전 knob 위치에 잔상(ghost)을 남기고 페이드아웃 후 제거.
  useEffect(() => {
    if (prevLevelRef.current !== level) {
      const id = ghostIdRef.current++;
      setGhosts((prev) => [...prev, { id, top: percentageMap[prevLevelRef.current] }]);
      const timer = setTimeout(() => {
        setGhosts((prev) => prev.filter((g) => g.id !== id));
      }, GHOST_DURATION);
      prevLevelRef.current = level;
      return () => clearTimeout(timer);
    }
    prevLevelRef.current = level;
  }, [level]);

  // 화면(뷰포트) 중앙을 목표로 하되, 스크롤 직후 곧바로 스냅되지 않고
  // 부드럽게 뒤따라가는(lerp) 느낌을 주기 위해 매 프레임 위치를 보간.
  useEffect(() => {
    const container = containerRef.current;
    const follow = followRef.current;
    if (!container || !follow) return;

    let rafId;

    function computeTargetY(rect, elHeight) {
      const viewportCenter = window.innerHeight / 2;
      const minY = rect.top;
      const maxY = rect.bottom - elHeight;
      if (maxY < minY) return rect.top + (rect.height - elHeight) / 2;
      return Math.max(minY, Math.min(maxY, viewportCenter - elHeight / 2));
    }

    const rect0 = container.getBoundingClientRect();
    currentYRef.current = computeTargetY(rect0, follow.offsetHeight);
    follow.style.left = rect0.left + 'px';
    follow.style.width = rect0.width + 'px';
    follow.style.transform = `translateY(${currentYRef.current}px)`;

    function tick() {
      const rect = container.getBoundingClientRect();
      const elHeight = follow.offsetHeight;
      const targetY = computeTargetY(rect, elHeight);
      currentYRef.current += (targetY - currentYRef.current) * FOLLOW_EASE;
      follow.style.left = rect.left + 'px';
      follow.style.width = rect.width + 'px';
      follow.style.transform = `translateY(${currentYRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function levelFromEvent(e) {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return ratio < 0.3 ? 0 : ratio > 0.7 ? 2 : 1;
  }

  function handlePointerDown(e) {
    draggingRef.current = true;
    try { trackRef.current.setPointerCapture(e.pointerId); } catch (_) {}
    onChange(levelFromEvent(e));
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    const lv = levelFromEvent(e);
    if (lv !== level) onChange(lv);
  }

  function handlePointerUp(e) {
    draggingRef.current = false;
    try { trackRef.current.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  return (
    <div className="article-support" ref={containerRef}>
      <div className="rlv-follow" ref={followRef}>
      <div className="rlv" role="group" aria-label="읽기 난이도 선택">
        <span
          className={'rlv-label' + (level === 0 ? ' active' : '')}
          data-level="0"
          onClick={() => onChange(0)}
        >
          원문
        </span>
        <div
          className="rlv-track"
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {ghosts.map((g) => (
            <div key={g.id} className="rlv-knob-ghost" style={{ top: g.top + '%' }}></div>
          ))}
          {percentageMap.map((top, i) => (
            <span
              key={i}
              className={'rlv-dot' + (i === level ? ' active' : '')}
              style={{ top: top + '%' }}
            ></span>
          ))}
          <div
            className={'rlv-knob' + (draggingRef.current ? ' dragging' : '')}
            style={{ top: percentageMap[level] + '%' }}
          >
            <div className="rlv-knob-dot"></div>
          </div>
        </div>
        <span
          className={'rlv-label' + (level === 2 ? ' active' : '')}
          data-level="2"
          onClick={() => onChange(2)}
        >
          쉽게읽기
        </span>
      </div>
      </div>
    </div>
  );
}
