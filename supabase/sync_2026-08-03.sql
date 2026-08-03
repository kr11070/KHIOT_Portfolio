-- Supabase SQL Editor에서 실행하세요.
-- 2026-08-03 기준으로 DB를 깃허브(portfolio-data.ts)의 최신 상태와 맞추는 스크립트입니다.
-- (에어비앤비 대시보드 카드는 건드리지 않습니다 — 사이트에서 수정 버튼으로 직접 다듬어주세요.)

-- 1) 뉴스 쉬운말 모드: 깨진 데모 링크 수정 + 영어/일본어 번역 채우기
update side_projects set
  link_demo = '/projects/news-reading-mode/index.html',
  title_en = 'News Easy-Read Mode',
  title_ja = 'ニュースやさしい言葉モード',
  description_en = 'A Chrome extension that adjusts news articles across three reading levels and translates foreign articles into Korean. Web Store launch targeted for Aug 2026.',
  description_ja = 'ニュース記事をスライダーで3段階の読みやすさに変換し、外国語記事を韓国語に翻訳するChrome拡張。2026年8月のストア公開を目指しています。'
where slug = 'news-reading-mode';

-- 2) 중고거래 앱 창업 시장 분석: 영어/일본어 번역 채우기
update side_projects set
  title_en = 'Secondhand App Market Analysis',
  title_ja = '中古取引アプリ市場分析',
  description_en = 'A startup analysis dashboard covering competitor positioning (Danggeun, Joonggonara, Bunjang), TAM/SAM/SOM market sizing, and a 3-year revenue scenario.',
  description_ja = '競合ポジショニングとTAM/SAM/SOM市場規模、3年間の収益シナリオまでまとめた新規創業分析ダッシュボードです。'
where slug = 'secondhand-app-market-analysis';

-- 3) 喫茶 Kissa: 제목에 "喫茶" 누락 수정 + 영어/일본어 번역 채우기
update side_projects set
  title_ko = '喫茶 Kissa — 빈티지 디자인 시스템',
  title_en = 'Kissa — A Vintage-Inspired Design System',
  title_ja = '喫茶 Kissa — ヴィンテージデザインシステム',
  description_en = 'A color and typography design system inspired by old Japanese/Taiwanese kissaten (tea rooms). 214 tokens across a three-layer Primitive → Semantic → Molecule structure, with dark mode achieved by simply inverting the Primitive scale.',
  description_ja = '日本・台湾の昔ながらの喫茶店の感性から生まれたカラー・タイポグラフィのデザインシステム。Primitive → Semantic → Moleculeの3層構造で214個のトークンを構成し、ダークモードはPrimitiveの反転だけで切り替わります。'
where slug = 'project-1784353634736';

-- 4) 케이스 스터디 페이지가 있는 3개 카드에 "Case Study" 태그 추가
update side_projects set tech = array['Service Design', 'Figma', 'UX Research', 'Case Study']
where slug = 'magicpath-guide';

update side_projects set tech = array['PRD', 'Service Design', 'AI', 'Case Study']
where slug = 'food-hygiene-service';

update side_projects set tech = array['Service Design', 'Figma', 'Mobile App', 'Case Study']
where slug = 'moonlight-journey';

-- 5) 타이타닉 생존자 분석 대시보드 카드 추가 (Supabase가 죽어있는 동안 코드에만 있었음)
insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, project_date, sort_order)
values
  (
    'titanic-survivors-dashboard',
    '타이타닉 생존자 분석 대시보드',
    'Titanic Survivors Analysis Dashboard',
    'タイタニック生存者分析ダッシュボード',
    '타이타닉 탑승객 데이터를 분석해 좌석 등급·성별·나이에 따른 생존율을 인터랙티브 차트로 시각화한 데이터 분석 대시보드입니다.',
    'An interactive data-analysis dashboard visualizing Titanic passenger survival rates by class, gender, and age.',
    'タイタニック号の乗客データを分析し、客室クラス・性別・年齢別の生存率をインタラクティブなチャートで可視化したデータ分析ダッシュボードです。',
    array['Data Analytics', 'Data Visualization', 'Dashboard'],
    'https://titanic-survivors-dashboard-223453858568.us-west1.run.app',
    '2026.08',
    100
  )
on conflict (slug) do nothing;
