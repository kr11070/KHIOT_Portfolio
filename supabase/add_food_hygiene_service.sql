-- Supabase SQL Editor에서 실행하세요.
-- 라이브 데모 링크는 나중에 생기면 사이트의 "프로젝트 수정" 버튼으로 바로 추가할 수 있습니다.

insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_download, project_date, sort_order)
values
  (
    'food-hygiene-service',
    'AI 식품위생 관리 서비스',
    'AI Food Hygiene Management Service',
    'AI食品衛生管理サービス',
    '자영업자를 위한 AI 기반 위생 큐레이션 서비스 PRD. 일일 체크리스트 자동 생성, 위생 점수(Health Score) 산출, 카메라 기반 AI 비전 스캐너로 사고 발생 전 위험 징후를 예방합니다.',
    'A PRD for an AI-powered hygiene curation service for small food business owners — auto-generated daily checklists, a Health Score, and a camera-based AI vision scanner that catches risk signs before incidents happen.',
    '自営業者向けのAIベース衛生キュレーションサービスのPRD。日次チェックリストの自動生成、衛生スコア（Health Score）算出、カメラベースのAIビジョンスキャナーで事故発生前にリスクの兆候を予防します。',
    array['PRD', 'Service Design', 'AI'],
    '/projects/food-hygiene-service/식품위생관리서비스_PRD.docx',
    '2026.05',
    70
  )
on conflict (slug) do nothing;
