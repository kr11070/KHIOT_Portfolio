"use client";

import { useState } from "react";
import { pick, useLang } from "@/lib/i18n";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { deleteSideProject, type Project } from "@/lib/portfolio-data";
import AdminLoginModal from "./AdminLoginModal";

/**
 * 사이드 프로젝트 카드 우상단, 수정 버튼 옆에 얹는 휴지통 아이콘. 로그인이 안 되어 있으면
 * 로그인 모달을 먼저 띄우고, 로그인된 상태면 삭제 확인 창을 엽니다.
 */
export default function DeleteProjectButton({
  project,
  onDeleted,
}: {
  project: Project;
  onDeleted: () => void;
}) {
  const { lang } = useLang();
  const { user } = useAdminAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (user) setOpen(true);
    else setShowLogin(true);
  }

  function close() {
    setOpen(false);
    setError(null);
  }

  async function handleDelete() {
    setSubmitting(true);
    setError(null);
    const result = await deleteSideProject(project.slug);
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
        onClick={handleClick}
        aria-label="프로젝트 삭제"
        title="프로젝트 삭제"
        className="absolute right-12 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/90 text-sm text-ink-soft shadow-sm transition-colors hover:border-red-400 hover:text-red-600"
      >
        🗑️
      </button>

      {showLogin && (
        <AdminLoginModal
          onSuccess={() => {
            setShowLogin(false);
            setOpen(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

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
                disabled={submitting}
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
