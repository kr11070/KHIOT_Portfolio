-- Supabase SQL Editor에서 실행하세요.
-- "AI 식품위생 관리 서비스" 카드에 올바른 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/AI-%EC%9C%84%EC%83%9D%EA%B4%80%EB%A6%AC-%EC%84%9C%EB%B9%84%EC%8A%A4.webm'
where slug = 'food-hygiene-service';
