-- ────────────────────────────────────────────────────────────────
-- 카드 삭제 기능 + 다운로드 링크 필드 추가
-- (add_project_form.sql, edit_project_form.sql을 이미 실행한 다음에 실행)
--
-- ★ 실행 전 딱 한 가지: 아래 세 번 나오는 '여기에-비밀번호-입력'을
--   지금까지 쓰던 것과 같은 관리 비밀번호로 바꾼 뒤 SQL Editor에서
--   전체 실행하세요.
--   주의: 이 저장소는 public이므로, 실제 비밀번호는 여기(git에 커밋되는
--   파일)에 적지 말고 Supabase SQL Editor에 붙여넣은 뒤 그 자리에서만
--   바꿔서 실행하세요.
-- ────────────────────────────────────────────────────────────────

-- 다운로드 링크 컬럼 (예: 디자인 시스템 md 문서)
alter table side_projects add column if not exists link_download text;

-- add_side_project / update_side_project에 p_download 파라미터가 새로 생겨서
-- 시그니처가 바뀌므로, 기존 함수를 지우고 다시 만듭니다.
drop function if exists public.add_side_project(text, text, text, text, text, text, text[], text, text);
drop function if exists public.update_side_project(text, text, text, text, text, text, text[], text, text);

create function public.add_side_project(
  p_password text,
  p_slug text,
  p_title text,
  p_description text,
  p_date text default null,
  p_thumbnail text default null,
  p_tech text[] default '{}',
  p_demo text default null,
  p_github text default null,
  p_download text default null
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
     tech, thumbnail, link_demo, link_github, link_download, project_date, sort_order)
  values
    (p_slug, p_title, p_title, p_title,
     p_description, p_description, p_description,
     coalesce(p_tech, '{}'), nullif(p_thumbnail, ''), nullif(p_demo, ''), nullif(p_github, ''),
     nullif(p_download, ''), nullif(p_date, ''),
     coalesce((select max(sort_order) from side_projects), 0) + 10);
end;
$$;

create function public.update_side_project(
  p_password text,
  p_slug text,
  p_title text,
  p_description text,
  p_date text default null,
  p_thumbnail text default null,
  p_tech text[] default '{}',
  p_demo text default null,
  p_github text default null,
  p_download text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password is distinct from '여기에-비밀번호-입력' then
    raise exception 'ADMIN_PASSWORD_MISMATCH';
  end if;

  update side_projects
  set
    title_ko = p_title, title_en = p_title, title_ja = p_title,
    description_ko = p_description, description_en = p_description, description_ja = p_description,
    tech = coalesce(p_tech, '{}'),
    thumbnail = nullif(p_thumbnail, ''),
    link_demo = nullif(p_demo, ''),
    link_github = nullif(p_github, ''),
    link_download = nullif(p_download, ''),
    project_date = nullif(p_date, '')
  where slug = p_slug;

  if not found then
    raise exception 'PROJECT_NOT_FOUND';
  end if;
end;
$$;

create or replace function public.delete_side_project(
  p_password text,
  p_slug text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password is distinct from '여기에-비밀번호-입력' then
    raise exception 'ADMIN_PASSWORD_MISMATCH';
  end if;

  delete from side_projects where slug = p_slug;

  if not found then
    raise exception 'PROJECT_NOT_FOUND';
  end if;
end;
$$;

grant execute on function public.add_side_project(text, text, text, text, text, text, text[], text, text, text) to anon;
grant execute on function public.update_side_project(text, text, text, text, text, text, text[], text, text, text) to anon;
grant execute on function public.delete_side_project(text, text) to anon;

-- ────────────────────────────────────────────────────────────────
-- 테스트 중 대충 채워졌던 두 카드(니펫내펫, 디자인 시스템)의 내용을
-- 실제 아티팩트를 확인해서 다시 채웁니다.
-- ────────────────────────────────────────────────────────────────

update side_projects set
  title_ko = '니펫내펫 — 반려동물 매칭 플랫폼 사업계획서',
  title_en = 'Nipet Naepet — Pet Matching Platform Business Plan',
  title_ja = 'ニペットネペット — ペットマッチングプラットフォーム事業計画書',
  description_ko = '책임 없이 반려동물과 교감할 수 있는 매칭·위탁 플랫폼의 6개월 실행 사업계획서. 서울 영등포구를 기점으로 시드 3억 원, 18개월 손익분기 시나리오를 시장 데이터 기반으로 설계했습니다.',
  description_en = 'A 6-month business plan for a pet-matching platform that lets people bond with animals without full ownership. Seed funding of ₩300M, targeting break-even at 18 months in Seoul''s Yeongdeungpo district, backed by market data.',
  description_ja = '責任を負わずにペットと触れ合えるマッチング・預かりプラットフォームの6ヶ月実行事業計画書。ソウル永登浦区を拠点に、シード3億ウォン、18ヶ月での損益分岐を市場データに基づいて設計しました。',
  tech = array['Business Plan', 'Market Research', 'Claude'],
  project_date = '2026.04'
where slug = 'project-1784352872832';

update side_projects set
  title_ko = '喫茶 Kissa — 빈티지 디자인 시스템',
  title_en = 'Kissa — A Vintage-Inspired Design System',
  title_ja = '喫茶 Kissa — ヴィンテージデザインシステム',
  description_ko = '일본·대만의 옛 킷사텐(다방) 감성에서 출발한 컬러·타이포그래피 디자인 시스템. Primitive → Semantic → Molecule 3단 레이어로 214개 토큰을 구성하고, 다크 모드는 Primitive 반전만으로 전환됩니다.',
  description_en = 'A color and typography design system inspired by old Japanese/Taiwanese kissaten (tea rooms). 214 tokens across a three-layer Primitive → Semantic → Molecule structure, with dark mode achieved by simply inverting the Primitive scale.',
  description_ja = '日本・台湾の昔ながらの喫茶店の感性から生まれたカラー・タイポグラフィのデザインシステム。Primitive → Semantic → Moleculeの3層構造で214個のトークンを構成し、ダークモードはPrimitiveの反転だけで切り替わります。',
  tech = array['Design System', 'Design Tokens', 'Claude'],
  link_download = '/design-system/kissa-design-system.md'
where slug = 'project-1784353634736';
