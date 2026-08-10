// 기사 제목/바이라인 — article 본문과 aside(Epic AI) 컬럼 상단을 모두 가로지르는 헤더.
import { useEffect, useRef, useState } from 'react';
import { levels } from '../data/levels';
import { useFadeLevel } from '../lib/useFadeLevel';

const highlightColors = ['#ABF800', '#8344FF', '#FF3CA4', '#FF7D00', '#143C7E'];

export default function ArticleHeader({
  level,
  highlightColor,
  onHighlightColorChange,
  eraserActive,
  onEraserActiveChange,
}) {
  const { currentLevel, prevLevel } = useFadeLevel(level);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteWrapRef = useRef(null);
  const highlightActive = paletteOpen || !!highlightColor;

  useEffect(() => {
    if (!paletteOpen) return;
    function handleOutside(e) {
      if (paletteWrapRef.current && !paletteWrapRef.current.contains(e.target)) {
        setPaletteOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [paletteOpen]);

  function handleIconClick() {
    if (highlightColor) {
      onHighlightColorChange(null);
      setPaletteOpen(false);
    } else {
      onEraserActiveChange(false);
      setPaletteOpen((v) => !v);
    }
  }

  function handleSwatchClick(color) {
    onEraserActiveChange(false);
    onHighlightColorChange(color);
    setPaletteOpen(false);
  }

  function handleEraserClick() {
    if (eraserActive) {
      onEraserActiveChange(false);
    } else {
      onHighlightColorChange(null);
      setPaletteOpen(false);
      onEraserActiveChange(true);
    }
  }

  return (
    <div className="art-header">
      <div className="hk-crossfade">
        {prevLevel !== null && (
          <h1
            key={'old-' + prevLevel}
            aria-hidden="true"
            className={'art-title hk-crossfade-old' + (prevLevel === 2 ? ' art-title--easy' : '')}
          >
            {levels[prevLevel].title}
          </h1>
        )}
        <h1
          key={'new-' + currentLevel}
          className={'art-title hk-crossfade-new' + (currentLevel === 2 ? ' art-title--easy' : '')}
        >
          {levels[currentLevel].title}
        </h1>
      </div>

      <div className="art-byline">
        <div className={'art-byline-left' + (currentLevel === 2 ? ' art-byline-left--easy' : '')}>
          <div className="art-authors">
            <span className="art-author">
              <span className="art-avatar">
                <img src="/Lee.png" alt="이소이 기자" />
              </span>
              <span className="art-team">이소이 기자</span>
            </span>
            <span className="art-author">
              <span className="art-avatar">
                <img src="/kang-taewoo.png" alt="강태우 기자" />
              </span>
              <span className="art-team">강태우 기자</span>
            </span>
            <span className="art-author">
              <span className="art-avatar">
                <img src="/Kim.png" alt="김해연 기자" />
              </span>
              <span className="art-team">김해연 기자</span>
            </span>
          </div>
          <span className="art-dates">입력: 2026.06.30 18:17  수정: 2026.07.01 00:37</span>
        </div>
        <div className="art-byline-icons">
          <div className="art-byline-icon-wrap" ref={paletteWrapRef}>
            <svg
              className={'art-highlight-icon' + (highlightActive ? ' active' : '')}
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              aria-label="형광펜"
              onClick={handleIconClick}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 11L3 17V20H12L15 17M22 12L17.4 16.6C17.0261 16.9665 16.5235 17.1717 16 17.1717C15.4765 17.1717 14.9739 16.9665 14.6 16.6L9.4 11.4C9.03355 11.0261 8.82829 10.5235 8.82829 10C8.82829 9.47649 9.03355 8.97386 9.4 8.6L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {paletteOpen && (
              <div className="hk-color-palette">
                {highlightColors.map((c) => (
                  <button
                    key={c}
                    className="hk-color-swatch"
                    style={{ background: c }}
                    aria-label={c}
                    onClick={() => handleSwatchClick(c)}
                  />
                ))}
              </div>
            )}
          </div>
          <svg
            className={'art-highlight-icon' + (eraserActive ? ' active' : '')}
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            aria-label="지우개"
            onClick={handleEraserClick}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.9999 21.0001H12.8339M12.8339 21.0001H7.99994C7.73624 21.0007 7.47502 20.9491 7.23132 20.8484C6.98762 20.7476 6.76624 20.5997 6.57994 20.4131L2.58594 16.4141C2.211 16.039 2.00037 15.5304 2.00037 15.0001C2.00037 14.4697 2.211 13.9611 2.58594 13.5861L12.5859 3.58607C12.7717 3.40027 12.9922 3.25288 13.2349 3.15232C13.4776 3.05176 13.7377 3 14.0004 3C14.2632 3 14.5233 3.05176 14.766 3.15232C15.0087 3.25288 15.2292 3.40027 15.4149 3.58607L21.4139 9.58607C21.7889 9.96113 21.9995 10.4697 21.9995 11.0001C21.9995 11.5304 21.7889 12.039 21.4139 12.4141L12.8339 21.0001ZM5.08194 11.0901L13.9099 19.9181" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
