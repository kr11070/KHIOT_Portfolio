-- Supabase SQL Editor에서 실행하세요.

insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, project_date, sort_order)
values
  (
    'hankyung-eureka-ux-report',
    '한경유레카 UX 개선 리포트 — 2.0 개편 이후 구독자 분석',
    'Hankyung Eureka UX Report — Subscriber Impact of the 2.0 Redesign',
    '韓経ユレカ UX改善レポート — 2.0リニューアル後の購読者分析',
    '한경유레카 앱 2.0 개편(AI 컨센서스, 유레카 프리미엄, 알고리즘 콘텐츠 UI/UX 전면 개편) 전후로 신규 유료 구독자 추이를 2024.01~2026.06 데이터로 비교 분석한 UX 리포트입니다.',
    'A UX analytics report comparing new paid-subscriber trends before and after Hankyung Eureka''s 2.0 redesign (AI consensus scoring, Eureka Premium, a full algorithmic content UI/UX overhaul), using Jan 2024–Jun 2026 data.',
    '韓経ユレカアプリの2.0リニューアル（AIコンセンサス、ユレカプレミアム、アルゴリズムコンテンツのUI/UX全面刷新）前後で新規有料購読者の推移を2024年1月〜2026年6月のデータで比較分析したUXレポートです。',
    array['Data Analytics', 'UX Research', 'Claude'],
    'https://claude.ai/public/artifacts/90dcb3f4-fc02-4c29-aae4-b600d5e95d1c',
    '2026.07',
    50
  )
on conflict (slug) do nothing;
