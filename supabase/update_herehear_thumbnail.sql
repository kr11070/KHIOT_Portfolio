-- Supabase SQL Editor에서 실행하세요.
-- "HereHear — 지역맞춤 뮤직 플레이어" 카드에 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%AE%A4%EC%A7%81%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4.webm'
where slug = 'herehear-music-player';
