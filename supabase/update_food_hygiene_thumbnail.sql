-- Supabase SQL Editor에서 실행하세요.
-- 이전에 잘못 넣었던 놀이공원 동선앱 영상을 "AI 식품위생 관리 서비스" 카드에서 제거합니다.
-- (이 영상은 magicpath-guide 카드용이었습니다 — update_magicpath_thumbnail.sql 참고)

update side_projects set
  thumbnail = null
where slug = 'food-hygiene-service';
