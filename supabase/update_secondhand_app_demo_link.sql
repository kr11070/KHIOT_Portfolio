-- Supabase SQL Editor에서 실행하세요.
-- "중고거래 앱 창업 시장 분석" 카드의 데모 링크를 Google AI Studio로 다시 만든 최신 버전으로 교체합니다.

update side_projects set
  link_demo = 'https://marketinsight.ai.studio'
where slug = 'secondhand-app-market-analysis';
