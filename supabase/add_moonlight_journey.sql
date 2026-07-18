-- Supabase SQL Editor에서 실행하세요.
-- 라이브 데모 링크는 나중에 생기면 사이트의 "프로젝트 수정" 버튼으로 바로 추가할 수 있습니다.

insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_case_study, project_date, sort_order)
values
  (
    'moonlight-journey',
    '달빛 기행 — 경주 야간 관광 앱',
    'Moonlight Journey — Gyeongju Night Tourism App',
    '月明かり紀行 — 慶州ナイトツーリズムアプリ',
    '일몰·점등 시각과 실시간 혼잡도를 알려주어 경주의 야경 명소를 가장 좋은 순간에 즐기도록 돕는 관광 앱 콘셉트. 오디오 도슨트, 별자리 지도, 날씨 기반 관측 지수로 감성적인 야간 경험을 설계했습니다.',
    'A tourism app concept that surfaces sunset/lighting times and real-time crowd levels so visitors catch Gyeongju''s night spots at their best moment — with an audio docent, a constellation map, and a weather-based stargazing index.',
    '日没・点灯時刻とリアルタイムの混雑度を知らせ、慶州の夜景スポットを最高の瞬間に楽しめるよう導く観光アプリコンセプト。オーディオドーセント、星座マップ、天気ベースの観測指数で情緒的な夜の体験を設計しました。',
    array['Service Design', 'Figma', 'Mobile App'],
    '/case-studies/moonlight-journey',
    '2026.07',
    80
  )
on conflict (slug) do nothing;
