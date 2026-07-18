-- Supabase SQL Editor에서 실행하세요.

insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_case_study, project_date, sort_order)
values
  (
    'magicpath-guide',
    '매직패스 가이드 — 놀이공원 날씨 동선 추천 서비스',
    'Magicpath Guide — Weather-Based Amusement Park Routing',
    'マジックパスガイド — 天気連動アトラクション動線推薦サービス',
    '실시간 날씨·혼잡도를 분석해 맞춤형 놀이공원 동선을 추천하는 서비스 콘셉트. 데이터 기반 페르소나로 사용자 니즈를 검증하고, 개요·페르소나 2개 탭으로 구성한 케이스 스터디 페이지입니다.',
    'A service concept that recommends personalized amusement-park routes using real-time weather and congestion data, validated with a data-driven persona — presented as a two-tab (overview/persona) case study page.',
    'リアルタイムの天気・混雑度を分析してパーソナライズされたアトラクション動線を提案するサービスコンセプト。データドリブンなペルソナで検証し、概要・ペルソナの2つのタブで構成したケーススタディページです。',
    array['Service Design', 'Figma', 'UX Research'],
    '/case-studies/magicpath-guide',
    '2026.05',
    60
  )
on conflict (slug) do nothing;
