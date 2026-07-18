"use client";

import { useState } from "react";
import { pick, useLang } from "@/lib/i18n";
import { deleteSideProject, type Project } from "@/lib/portfolio-data";

/**
 * 사이드 프로젝트 카드 우상단, 수정 버튼 옆에 얹는 휴지통 아이콘.
 * 클릭하면 비밀번호를 묻는 작은 확인 창이 뜨고, 확인 시 Supabase
 * delete_side_project 함수가 비밀번호를 검증한 뒤 삭제합니다.
 */
export default function DeleteProjectButton({
  project,
  onDeleted,
}: {
  project: Project;
  onDeleted: () => void;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setOpen(false);
    setPassword("");
    setError(null);
  }

  async function handleDelete() {
    setSubmitting(true);
    setError(null);
    const result = await deleteSideProject(project.slug, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    onDeleted();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="프로젝트 삭제"
        title="프로젝트 삭제"
        className="absolute right-12 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/90 text-sm text-ink-soft shadow-sm transition-colors hover:border-red-400 hover:text-red-600"
      >
        🗑️
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2.5xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-extrabold tracking-tight">프로젝트 삭제</h3>
              <button
                type="button"
                onClick={close}
                aria-label="닫기"
                className="rounded-full px-2 text-xl leading-none text-ink-soft hover:text-ink"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm text-ink-soft">
              <span className="font-bold text-ink">{pick(project.title, lang)}</span> 카드를
              삭제할까요? 이 작업은 되돌릴 수 없습니다.
            </p>

            <label className="mt-4 flex flex-col gap-1 text-xs font-bold text-ink-soft">
              관리 비밀번호 *
              <input
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Supabase에 설정한 비밀번호"
              />
            </label>

            {error && (
              <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                {error}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink-soft transition-colors hover:border-accent-dark hover:text-ink"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting || !password}
                className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {submitting ? "삭제 중…" : "삭제하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
