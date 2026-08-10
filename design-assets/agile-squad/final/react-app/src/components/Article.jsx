// 기사 본문 영역. 제목/본문은 읽기 레벨(level)에 따라 바뀌며,
// 본문의 수치 하이라이트 팝오버는 렌더 후 initHkStatHighlight 로 부착합니다.
import { useEffect, useRef } from 'react';
import { levels } from '../data/levels';
import { initHkStatHighlight, attachHkStatDocHandler } from '../lib/hkStat';
import { useFadeLevel } from '../lib/useFadeLevel';

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function highlighterCursor(color) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='26' viewBox='0 0 20 26'><polygon points='5,2 15,2 17,9 13,18 7,18 3,9' fill='${color}' stroke='#191f28' stroke-width='1.2' stroke-linejoin='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 10 18, crosshair`;
}

function unwrapMark(mark) {
  const parent = mark.parentNode;
  if (!parent) return;
  while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
  parent.removeChild(mark);
  parent.normalize();
}

function FigureImg({ level }) {
  return level === 2 ? (
    <img
      src="/water-story-illustration.png"
      alt="수도요금 이야기 4컷 일러스트"
      style={{ width: '100%', display: 'block' }}
      loading="lazy"
    />
  ) : (
    <img
      src="/water.png"
      alt="줄줄이 오르는 지자체 상·하수도 요금 표"
      style={{ width: '100%', display: 'block' }}
      loading="lazy"
    />
  );
}

export default function Article({ level, highlightColor, eraserActive }) {
  const bodyRef = useRef(null);
  const { currentLevel, prevLevel } = useFadeLevel(level);

  // 문서 레벨 클릭 핸들러는 최초 1회 등록.
  useEffect(() => {
    attachHkStatDocHandler();
  }, []);

  // 레벨이 바뀌어 본문 HTML 이 갈릴 때마다 팝오버 재부착.
  useEffect(() => {
    if (bodyRef.current) initHkStatHighlight(bodyRef.current);
  }, [currentLevel]);

  const heroCaption =
    currentLevel === 2
      ? '여러 동네에서 수도요금이 오르고 있어요 / 한국경제 자료사진'
      : '전국 지자체가 하반기부터 상하수도 요금을 줄줄이 인상한다. / 한국경제 자료사진';

  // 지우개 모드: 드래그로 지나간(또는 클릭한) 형광펜 하이라이트를 제거.
  function handleBodyMouseUpEraser() {
    const body = bodyRef.current;
    if (!body) return;
    const selection = window.getSelection();
    const marks = body.querySelectorAll('.hk-highlight-mark');
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      if (body.contains(range.commonAncestorContainer)) {
        marks.forEach((mark) => {
          if (range.intersectsNode(mark)) unwrapMark(mark);
        });
      }
      selection.removeAllRanges();
    }
  }

  // 형광펜 모드: 드래그로 선택한 영역을 선택된 색상(20~30% 투명도)으로 밑줄/하이라이트 표시.
  function handleBodyMouseUpHighlight() {
    if (!highlightColor) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    if (!bodyRef.current || !bodyRef.current.contains(range.commonAncestorContainer)) return;
    const mark = document.createElement('mark');
    mark.className = 'hk-highlight-mark';
    mark.style.backgroundColor = hexToRgba(highlightColor, 0.25);
    try {
      range.surroundContents(mark);
    } catch {
      mark.appendChild(range.extractContents());
      range.insertNode(mark);
    }
    selection.removeAllRanges();
  }

  function handleBodyMouseUp(e) {
    if (eraserActive) {
      handleBodyMouseUpEraser();
      const clickedMark = e.target.closest && e.target.closest('.hk-highlight-mark');
      if (clickedMark && bodyRef.current && bodyRef.current.contains(clickedMark)) {
        unwrapMark(clickedMark);
      }
      return;
    }
    handleBodyMouseUpHighlight();
  }

  return (
    <main className="art-main content">
      <div className={'ai-summary-card' + (currentLevel !== 2 ? ' ai-summary-card--mono' : '')}>
        <p className="ai-summary-head"><i className="ti ti-sparkles" aria-hidden="true"></i> {levels[currentLevel].summaryHead}</p>
        <p className="ai-summary-body">{levels[currentLevel].summary}</p>
      </div>

      <div className="hk-crossfade">
        {prevLevel !== null && (
          <div
            key={'old-' + prevLevel}
            aria-hidden="true"
            className={'art-body hk-stat-scope hk-crossfade-old' + (prevLevel === 2 ? ' art-body--easy' : '')}
            dangerouslySetInnerHTML={{ __html: levels[prevLevel].body }}
          />
        )}
        <div
          key={'new-' + currentLevel}
          ref={bodyRef}
          className={'art-body hk-stat-scope hk-crossfade-new' + (currentLevel === 2 ? ' art-body--easy' : '')}
          style={
            eraserActive
              ? { cursor: highlighterCursor('#FFFFFF') }
              : highlightColor
              ? { cursor: highlighterCursor(highlightColor) }
              : undefined
          }
          onMouseUp={handleBodyMouseUp}
          dangerouslySetInnerHTML={{ __html: levels[currentLevel].body }}
        />
      </div>

      <div className="hk-crossfade">
        {prevLevel !== null && (
          <figure key={'oldfig-' + prevLevel} aria-hidden="true" className="art-figure hk-crossfade-old">
            <FigureImg level={prevLevel} />
          </figure>
        )}
        <figure key={'newfig-' + currentLevel} className="art-figure hk-crossfade-new">
          <FigureImg level={currentLevel} />
        </figure>
      </div>

      <p className="art-hero-cap">{heroCaption}</p>

      {/* 비밀 수첩 — 기사 이해도 확인 퀴즈 (쉽게읽기 모드 전용) */}
      {currentLevel === 2 && (
        <div className="glossary">
          <div className="glossary-row">
            <span className="glossary-hole"></span>
            <div className="glossary-title">
              기사를 잘 읽었나요?
            </div>
          </div>
          <div className="glossary-list">
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 수도요금이 오르는 이유는?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 낡은 수도관을 고치기 위해서예요</div>
            </div>
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 요금이 오르는 지역은 어디인가요?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 수원, 창원, 용인, 여주 같은 곳이에요</div>
            </div>
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 2024년에 전국 수도 사업이 잃은 돈은 얼마인가요?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 2조3138억원이에요</div>
            </div>
          </div>
        </div>
      )}

      <div className="art-author-card">
        <div className="art-author-head">
          <div className="art-author-avatar-group">
            <img className="art-author-avatar" src="/Lee.png" alt="이소이 기자" />
            <img className="art-author-avatar" src="/kang-taewoo.png" alt="강태우 기자" />
            <img className="art-author-avatar" src="/Kim.png" alt="김해연 기자" />
          </div>
          <div className="art-author-name">이소이·강태우·김해연 기자</div>
        </div>
        <div className="art-author-desc">안녕하세요. 한국경제 사회부입니다.</div>
      </div>
    </main>
  );
}
