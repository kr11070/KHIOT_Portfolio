-- Supabase SQL Editor에서 실행하세요.
-- 식품위생관리 카드에 케이스 스터디 페이지 링크를 추가합니다. (라이브 데모 링크는 비워둔 채 유지)

update side_projects
set link_case_study = '/case-studies/food-hygiene-service'
where slug = 'food-hygiene-service';
