-- Supabase SQL Editor에서 실행하세요.
-- "타이타닉 생존자 분석 대시보드" 카드에 썸네일 이미지를 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89'
where slug = 'titanic-survivors-dashboard';
