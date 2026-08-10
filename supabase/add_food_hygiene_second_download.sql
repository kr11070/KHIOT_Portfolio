-- Supabase SQL Editor에서 실행하세요.
-- 카드에 다운로드 파일을 2개까지 연결할 수 있도록 link_download2 컬럼을 추가하고,
-- "AI 식품위생 관리 서비스" 카드에 상세 PRD 엑셀 파일을 연결합니다.
--
-- 주의: 이 컬럼은 사이트의 "프로젝트 추가/수정" 폼에서는 아직 편집할 수 없습니다
-- (add_side_project/update_side_project 함수를 건드리지 않았어요 — 이 카드 하나만 쓰는
-- 기능이라 폼 전체를 확장하진 않았습니다). 필요해지면 말씀해주세요.

alter table side_projects add column if not exists link_download2 text;

update side_projects set
  link_download2 = '/projects/food-hygiene-service/식품위생관리서비스_PRD_상세.xlsx'
where slug = 'food-hygiene-service';
