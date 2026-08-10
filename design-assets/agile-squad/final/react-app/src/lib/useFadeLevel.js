// 읽기 레벨 전환 시 이전 콘텐츠는 페이드아웃, 새 콘텐츠는 동시에 페이드인되는
// 크로스페이드를 구현하기 위한 훅. currentLevel(새 콘텐츠)과 prevLevel(사라지는
// 콘텐츠, 전환 중이 아니면 null)을 함께 반환한다.
import { useEffect, useRef, useState } from 'react';

const FADE_MS = 480;

export function useFadeLevel(level) {
  const [currentLevel, setCurrentLevel] = useState(level);
  const [prevLevel, setPrevLevel] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (level === currentLevel) return;
    setPrevLevel(currentLevel);
    setCurrentLevel(level);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPrevLevel(null), FADE_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return { currentLevel, prevLevel };
}
