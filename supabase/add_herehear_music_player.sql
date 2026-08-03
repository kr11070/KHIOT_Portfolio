-- Supabase SQL Editor에서 실행하세요.
-- "HereHear — 지역맞춤 뮤직 플레이어" 카드를 케이스 스터디 섹션에 추가합니다.

insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, link_github, project_date, sort_order)
values
  (
    'herehear-music-player',
    'HereHear — 지역맞춤 뮤직 플레이어',
    'HereHear — Location-Curated Music Player',
    'HereHear — 位置連動ミュージックプレイヤー',
    '현재 위치와 취향을 입력하면 그 지역 분위기에 맞는 음악을 추천하는 AI 큐레이션 뮤직 플레이어. Gemini API로 곡을 직접 선정하고, 좋아요·스킵 반응을 학습해 추천을 개인화합니다.',
    'An AI-curated music player that recommends songs matching the local mood based on your current location and taste. Gemini picks the tracks, and the app learns from likes and skips to personalize future recommendations.',
    '現在地と好みを入力すると、その地域の雰囲気に合う音楽をおすすめするAIキュレーション音楽プレイヤー。Gemini APIで楽曲を選定し、いいね・スキップの反応を学習してレコメンドを個人化します。',
    array['JavaScript', 'Gemini API', 'iTunes API', 'Geolocation'],
    'https://regal-manatee-561c2d.netlify.app',
    'https://github.com/kr11070/MusicPlayer_HereHear',
    '2026.06.11',
    110
  )
on conflict (slug) do nothing;
