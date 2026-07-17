-- Supabase SQL Editor에서 실행하세요 (Project → SQL Editor → New query → 붙여넣기 → Run)

create table if not exists side_projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title_ko text not null,
  title_en text not null,
  title_ja text not null,
  description_ko text not null,
  description_en text not null,
  description_ja text not null,
  tech text[] not null default '{}',
  thumbnail text,
  link_case_study text,
  link_demo text,
  link_github text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table side_projects enable row level security;

-- 포트폴리오 사이트는 anon key로 읽기만 하므로 공개 조회만 허용합니다.
create policy "Public can read side projects"
  on side_projects for select
  to anon
  using (true);

-- 기존 뉴스 쉬운말 모드 프로젝트
insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, link_github, sort_order)
values
  (
    'news-reading-mode',
    '뉴스 쉬운말 모드', 'News Easy-Read Mode', 'ニュースやさしい言葉モード',
    '뉴스 기사를 슬라이더로 3단계 읽기 난이도로 바꾸고, 외국어 기사는 한국어로 번역해주는 Chrome 확장 프로그램. 2026년 8월 웹스토어 공개를 목표로 개발 중입니다.',
    'A Chrome extension that adjusts news articles across three reading levels and translates foreign articles into Korean. Web Store launch targeted for Aug 2026.',
    'ニュース記事をスライダーで3段階の読みやすさに変換し、外国語記事を韓国語に翻訳するChrome拡張。2026年8月のストア公開を目指しています。',
    array['Chrome Extension', 'JavaScript', 'Netlify Functions', 'Groq API'],
    '/projects/news-reading-mode/index.html',
    'https://github.com/kr11070/KHIOT_Portfolio/tree/main/public/projects/news-reading-mode',
    0
  )
on conflict (slug) do nothing;

-- 새로 추가하는 의류 쇼핑 앱 UX 리서치 리포트 (Claude 아티팩트)
insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, sort_order)
values
  (
    'clothing-app-ux-research',
    '의류 쇼핑 앱 UX 리서치', 'Clothing Shopping App UX Research', '衣類ショッピングアプリ UXリサーチ',
    '사용자 인터뷰 1건을 진행해 사이즈 정보 부정확, 색상 왜곡, 리뷰 신뢰도 부족 등 8개의 페인포인트를 도출하고 해결 우선순위를 정리한 UX 리서치 리포트입니다.',
    'A UX research report built from a single user interview, surfacing 8 pain points — inaccurate size info, color distortion, low review trust, and more — with prioritized solutions.',
    'ユーザーインタビュー1件から、サイズ情報の不正確さや色の歪み、レビューの信頼性不足など8つのペインポイントを導き出し、解決の優先順位を整理したUXリサーチレポートです。',
    array['UX Research', 'User Interview', 'Claude'],
    'https://claude.ai/public/artifacts/72008362-d10e-471e-92b3-80b040bba396',
    10
  )
on conflict (slug) do nothing;
