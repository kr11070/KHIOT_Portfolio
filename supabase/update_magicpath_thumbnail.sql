-- Supabase SQL Editor에서 실행하세요.
-- "매직패스 가이드 — 놀이공원 날씨 동선 추천 서비스" 카드에 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%86%80%EC%9D%B4%EA%B3%B5%EC%9B%90%EB%8F%99%EC%84%A0%EC%95%B1.webm'
where slug = 'magicpath-guide';
