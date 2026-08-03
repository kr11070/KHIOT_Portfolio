-- Supabase SQL Editor에서 실행하세요.
-- "니펫내펫 — 반려동물 매칭 플랫폼 사업계획서" 카드에 호버 재생 영상 썸네일을 추가합니다.

update side_projects set
  thumbnail = 'https://ik.imagekit.io/dvkhncfzk/juheeproj/pet.webm'
where slug = 'project-1784352872832';
