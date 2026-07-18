"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark";

export type ProjectFormValues = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tech: string;
  demo: string;
  github: string;
};

export const emptyProjectFormValues: ProjectFormValues = {
  title: "",
  description: "",
  date: "",
  thumbnail: "",
  tech: "",
  demo: "",
  github: "",
};

/**
 * 프로젝트 추가/수정 공통 모달. 비밀번호 검증은 항상 Supabase 함수 쪽에서 이뤄지므로
 * 여기서는 폼 상태와 제출만 다룹니다.
 */
export default function ProjectFormModal({
  heading,
  submitLabel,
  initialValues,
  onSubmit,
  onClose,
}: {
  heading: string;
  submitLabel: string;
  initialValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  onClose: () => void;
}) {
  const [values, setValues] = useState(initialValues);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit(values, password);

    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2.5xl border border-line bg-white p-6 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-extrabold tracking-tight">{heading}</h3>
          <button
            type="button"
            onClick={onClose}
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
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
              required
              placeholder="예: 뉴스 쉬운말 모드"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
            설명 *
            <textarea
              className={`${inputCls} min-h-[5rem] resize-y`}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              required
              placeholder="카드에 표시될 짧은 소개"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
              날짜
              <input
                className={inputCls}
                value={values.date}
                onChange={(e) => set("date", e.target.value)}
                placeholder="2026.07"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
              기술 태그 (쉼표 구분)
              <input
                className={inputCls}
                value={values.tech}
                onChange={(e) => set("tech", e.target.value)}
                placeholder="Figma, UX Research"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
            썸네일 이미지 URL
            <input
              className={inputCls}
              type="url"
              value={values.thumbnail}
              onChange={(e) => set("thumbnail", e.target.value)}
              placeholder="https://…/thumb.png (비우면 자동 플레이스홀더)"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
            데모/결과물 링크
            <input
              className={inputCls}
              type="url"
              value={values.demo}
              onChange={(e) => set("demo", e.target.value)}
              placeholder="https://claude.ai/public/artifacts/…"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
            GitHub 링크
            <input
              className={inputCls}
              type="url"
              value={values.github}
              onChange={(e) => set("github", e.target.value)}
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
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {submitting ? "저장 중…" : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
