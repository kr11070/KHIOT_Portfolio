-- Supabase SQL Editor에서 실행하세요.
-- "HereHear" 카드의 라이브 데모 링크를 새 Cloudflare Workers 배포 주소로 교체합니다.

update side_projects set
  link_demo = 'https://herehear.leejuhee010340.workers.dev'
where slug = 'herehear-music-player';
