-- ────────────────────────────────────────────────────────────────
-- 프로젝트 "수정" 기능 설정 (add_project_form.sql을 이미 실행한 다음에 실행)
--
-- ★ 실행 전 딱 한 가지: 아래 함수 본문의 '여기에-비밀번호-입력'을
--   add_project_form.sql에서 설정한 것과 동일한 비밀번호로 바꾼 뒤
--   SQL Editor에서 전체 실행하세요.
--   주의: 이 저장소는 public이므로, 실제 비밀번호는 여기(git에 커밋되는
--   파일)에 적지 말고 Supabase SQL Editor에 붙여넣은 뒤 그 자리에서만
--   바꿔서 실행하세요.
-- ────────────────────────────────────────────────────────────────

create or replace function public.update_side_project(
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

  update side_projects
  set
    title_ko = p_title, title_en = p_title, title_ja = p_title,
    description_ko = p_description, description_en = p_description, description_ja = p_description,
    tech = coalesce(p_tech, '{}'),
    thumbnail = nullif(p_thumbnail, ''),
    link_demo = nullif(p_demo, ''),
    link_github = nullif(p_github, ''),
    project_date = nullif(p_date, '')
  where slug = p_slug;

  if not found then
    raise exception 'PROJECT_NOT_FOUND';
  end if;
end;
$$;

revoke all on function public.update_side_project(text, text, text, text, text, text, text[], text, text) from public;
grant execute on function public.update_side_project(text, text, text, text, text, text, text[], text, text) to anon;
