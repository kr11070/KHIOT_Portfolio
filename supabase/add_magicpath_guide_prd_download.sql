-- Supabase SQL Editor에서 실행하세요.
-- 매직패스 가이드 카드에 PRD 문서 다운로드 링크를 추가합니다.

update side_projects
set link_download = '/case-studies/magicpath-guide/놀이공원_스마트동선앱_PRD.docx'
where slug = 'magicpath-guide';
