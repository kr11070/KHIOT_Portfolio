-- Supabase SQL Editor에서 실행하세요.
-- "에어비앤비 대시보드" 초안 카드(slug: project-1784795789246)에 설명·태그·데모 링크를 채웁니다.

update side_projects set
  title_en = 'Airbnb Impact Dashboard',
  title_ja = 'Airbnbインパクトダッシュボード',
  description_ko = '에어비앤비의 국내 지역경제 기여도(GDP·일자리·게스트 지출)와 비도시 예약 비중 성장을 분석하고, 2024년 영업신고 의무화 등 규제 변화에 대응하는 호스트 시장 전략을 정리한 인사이트 대시보드입니다.',
  description_en = 'An insight dashboard analyzing Airbnb''s contribution to Korea''s regional economy (GDP, jobs, guest spending) and the growth of non-urban bookings, alongside host market strategies responding to 2024 business-registration regulations.',
  description_ja = 'エアビーアンドビーの国内地域経済への貢献度（GDP・雇用・ゲスト支出）と非都市部予約の増加を分析し、2024年の営業申告義務化などの規制変化に対応するホスト向け市場戦略をまとめたインサイトダッシュボードです。',
  tech = array['Market Research', 'Data Analytics', 'Google AI Studio'],
  link_demo = 'https://product-insight-dashboard-223453858568.us-west1.run.app'
where slug = 'project-1784795789246';
