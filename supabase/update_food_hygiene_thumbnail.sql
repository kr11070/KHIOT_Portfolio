-- Supabase SQL Editor에서 실행하세요.
-- "AI 식품위생 관리 서비스" 카드에 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%86%80%EC%9D%B4%EA%B3%B5%EC%9B%90%EB%8F%99%EC%84%A0%EC%95%B1.webm'
where slug = 'food-hygiene-service';
