-- Supabase SQL Editor에서 실행하세요.
-- "의류 쇼핑 앱 UX 리서치" 카드에 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/portfolio/fashionapp.webm'
where slug = 'clothing-app-ux-research';
