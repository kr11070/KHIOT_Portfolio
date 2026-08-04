-- Supabase SQL Editor에서 실행하세요.
-- "한경유레카 UX 개선 리포트" 카드에 썸네일 이미지를 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/%EC%9C%A0%EB%A0%88%EC%B9%B4'
where slug = 'hankyung-eureka-ux-report';
