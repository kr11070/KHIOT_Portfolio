-- ────────────────────────────────────────────────────────────────
-- 프로젝트 추가 폼 설정 (side_projects.sql을 이미 실행한 다음에 실행)
--
-- ★ 실행 전 딱 한 가지: 아래에 두 번 나오는 '여기에-비밀번호-입력'을
--   원하는 관리 비밀번호로 바꾼 뒤, SQL Editor에서 전체 실행하세요.
--   이 비밀번호는 사이트의 "프로젝트 추가" 폼에서 입력하는 값과
--   일치해야만 카드가 저장됩니다. (함수 안에서만 검증되므로
--   방문자에게는 노출되지 않습니다.)
-- ────────────────────────────────────────────────────────────────

-- 카드에 표시할 날짜 컬럼 (예: '2026.07' 같은 자유 형식)
alter table side_projects add column if not exists project_date text;

update side_projects set project_date = '2026.04' where slug = 'clothing-app-ux-research';

-- 중고거래 앱 창업 시장 분석 대시보드 (Claude 아티팩트)
insert into side_projects
  (slug, title_ko, title_en, title_ja, description_ko, description_en, description_ja, tech, link_demo, project_date, sort_order)
values
  (
    'secondhand-app-market-analysis',
    '중고거래 앱 창업 시장 분석', 'Secondhand App Market Analysis', '中古取引アプリ市場分析',
    '당근마켓·중고나라·번개장터의 경쟁사 포지셔닝과 TAM/SAM/SOM 시장 규모, 3년 수익 시나리오까지 정리한 신규 창업 분석 대시보드입니다.',
    'A startup analysis dashboard covering competitor positioning (Danggeun, Joonggonara, Bunjang), TAM/SAM/SOM market sizing, and a 3-year revenue scenario.',
    '競合ポジショニングとTAM/SAM/SOM市場規模、3年間の収益シナリオまでまとめた新規創業分析ダッシュボードです。',
    array['Market Research', 'TAM/SAM/SOM', 'Claude'],
    'https://claude.ai/public/artifacts/e2540493-822c-4882-b54e-d021aa4d11b8',
    '2026.07',
    20
  )
on conflict (slug) do nothing;

-- 사이트의 "프로젝트 추가" 폼이 호출하는 함수.
-- security definer라서 RLS와 무관하게 insert하되, 비밀번호가 맞을 때만 통과.
create or replace function public.add_side_project(
  p_password text,
  p_slug text,
  p_title text,
  p_description text,
  p_date text default null,
  p_thumbnail text default null,
  p_tech text[] default '{}',
  p_demo text default null,
  p_github text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password is distinct from '여기에-비밀번호-입력' then
    raise exception 'ADMIN_PASSWORD_MISMATCH';
  end if;

  insert into side_projects
    (slug, title_ko, title_en, title_ja,
     description_ko, description_en, description_ja,
     tech, thumbnail, link_demo, link_github, project_date, sort_order)
  values
    (p_slug, p_title, p_title, p_title,
     p_description, p_description, p_description,
     coalesce(p_tech, '{}'), nullif(p_thumbnail, ''), nullif(p_demo, ''), nullif(p_github, ''), nullif(p_date, ''),
     coalesce((select max(sort_order) from side_projects), 0) + 10);
end;
$$;

revoke all on function public.add_side_project(text, text, text, text, text, text, text[], text, text) from public;
grant execute on function public.add_side_project(text, text, text, text, text, text, text[], text, text) to anon;
