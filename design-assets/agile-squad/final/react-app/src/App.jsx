import { useState } from 'react';
import Header from './components/Header';
import ReadingLevelSlider from './components/ReadingLevelSlider';
import ArticleHeader from './components/ArticleHeader';
import Article from './components/Article';
import Sidebar from './components/Sidebar';
import SubscriptionModal from './components/SubscriptionModal';
import OffButton from './components/OffButton';

export default function App() {
  const [level, setLevel] = useState(0); // 0:원문 1:쉬운말 2:쉽게읽기 (원본 초기값과 동일)
  const [subOpen, setSubOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [highlightColor, setHighlightColor] = useState(null); // 형광펜 모드에서 선택된 색상
  const [eraserActive, setEraserActive] = useState(false); // 지우개 모드 여부

  const openSub = () => setSubOpen(true);

  return (
    <>
      <Header onSubOpen={openSub} isPremium={isPremium} />

      <div className={'page' + (level === 2 ? ' page--easy' : '')}>
        <ReadingLevelSlider level={level} onChange={setLevel} />
        <ArticleHeader
          level={level}
          highlightColor={highlightColor}
          onHighlightColorChange={setHighlightColor}
          eraserActive={eraserActive}
          onEraserActiveChange={setEraserActive}
        />
        <Article level={level} highlightColor={highlightColor} eraserActive={eraserActive} />
        <Sidebar level={level} onSubOpen={openSub} isPremium={isPremium} />
      </div>

      <SubscriptionModal
        open={subOpen}
        onClose={() => setSubOpen(false)}
        onSubscribed={() => setIsPremium(true)}
      />

      <OffButton />
    </>
  );
}
