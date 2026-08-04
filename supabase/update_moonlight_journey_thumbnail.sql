-- Supabase SQL Editor에서 실행하세요.
-- "달빛 기행 — 경주 야간 관광 앱" 카드에 썸네일 이미지를 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%EB%8B%AC%EB%B9%9B%EA%B8%B0%ED%96%89'
where slug = 'moonlight-journey';
