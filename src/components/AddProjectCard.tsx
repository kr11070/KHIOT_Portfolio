"use client";

import { useState } from "react";
import { addSideProject } from "@/lib/portfolio-data";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark";

/**
 * 사이드 프로젝트 그리드 끝에 붙는 "+ 프로젝트 추가" 카드.
 * 폼 제출 시 Supabase add_side_project 함수가 비밀번호를 검증한 뒤 저장합니다.
 */
export default function AddProjectCard({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tech, setTech] = useState("");
  const [demo, setDemo] = useState("");
  const [github, setGithub] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setOpen(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await addSideProject(
      {
        title,
        description,
        date,
        thumbnail,
        tech: tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        demo,
        github,
      },
      password
    );

    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    // 성공: 폼 초기화 후 목록 새로고침
    setTitle("");
    setDescription("");
    setDate("");
    setThumbnail("");
    setTech("");
    setDemo("");
    setGithub("");
    setPassword("");
    setOpen(false);
    onAdded();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-2 rounded-2.5xl border-2 border-dashed border-line bg-white/40 text-ink-soft transition-colors hover:border-accent-dark hover:bg-accent-soft/50 hover:text-accent-deep"
      >
        <span className="text-3xl font-light leading-none">+</span>
        <span className="text-sm font-bold">프로젝트 추가</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2.5xl border border-line bg-white p-6 shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-extrabold tracking-tight">프로젝트 추가</h3>
              <button
                type="button"
                onClick={close}
                aria-label="닫기"
                className="rounded-full px-2 text-xl leading-none text-ink-soft hover:text-ink"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                프로젝트 이름 *
                <input
                  className={inputCls}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="예: 뉴스 쉬운말 모드"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                설명 *
                <textarea
                  className={`${inputCls} min-h-[5rem] resize-y`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="카드에 표시될 짧은 소개"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                  날짜
                  <input
                    className={inputCls}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2026.07"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                  기술 태그 (쉼표 구분)
                  <input
                    className={inputCls}
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="Figma, UX Research"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                썸네일 이미지 URL
                <input
                  className={inputCls}
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://…/thumb.png (비우면 자동 플레이스홀더)"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                데모/결과물 링크
                <input
                  className={inputCls}
                  type="url"
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                  placeholder="https://claude.ai/public/artifacts/…"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                GitHub 링크
                <input
                  className={inputCls}
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/…"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
                관리 비밀번호 *
                <input
                  className={inputCls}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Supabase에 설정한 비밀번호"
                />
              </label>

              {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {submitting ? "저장 중…" : "카드 추가하기"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
