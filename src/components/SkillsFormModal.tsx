"use client";

import { useState } from "react";
import { updateSkills, type Skill } from "@/lib/portfolio-data";

const inputCls =
  "rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark";

/**
 * About 섹션의 "스킬 & 툴" 목록(이름 + 숙련도 %)을 편집하는 모달.
 * 로그인 여부는 이 모달을 여는 쪽(EditSkillsButton)에서 이미 확인했습니다.
 */
export default function SkillsFormModal({
  initialSkills,
  onSaved,
  onClose,
}: {
  initialSkills: Skill[];
  onSaved: () => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<Skill[]>(initialSkills);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateItem(index: number, patch: Partial<Skill>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addItem() {
    setItems((prev) => [...prev, { name: "", level: 50 }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const cleaned = items
      .map((item) => ({ ...item, name: item.name.trim() }))
      .filter((item) => item.name.length > 0);

    const result = await updateSkills(cleaned);

    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2.5xl border border-line bg-white p-6 shadow-card">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-extrabold tracking-tight">스킬 관리</h3>
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
          {items.length > 0 && (
            <div className="flex items-center gap-2 px-0.5 text-[11px] font-bold text-ink-faint">
              <span className="w-4 shrink-0" />
              <span className="min-w-0 flex-1">스킬 이름</span>
              <span className="w-16 shrink-0">숙련도</span>
              <span className="w-4 shrink-0" />
              <span className="w-6 shrink-0" />
            </div>
          )}
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveItem(i, -1)}
                  disabled={i === 0}
                  aria-label="위로 이동"
                  className="text-xs leading-none text-ink-faint hover:text-ink disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="아래로 이동"
                  className="text-xs leading-none text-ink-faint hover:text-ink disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <input
                className={`${inputCls} min-w-0 flex-1`}
                value={item.name}
                onChange={(e) => updateItem(i, { name: e.target.value })}
                placeholder="예: Figma / FigJam"
              />
              <input
                className={`${inputCls} w-16 shrink-0`}
                type="number"
                min={0}
                max={100}
                value={item.level}
                onChange={(e) => updateItem(i, { level: Number(e.target.value) })}
              />
              <span className="text-xs text-ink-faint">%</span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                aria-label="삭제"
                className="rounded-full px-2 text-lg leading-none text-ink-soft hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-1 rounded-full border border-dashed border-line px-3.5 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:border-accent-dark hover:text-accent-deep"
          >
            + 스킬 추가
          </button>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {submitting ? "저장 중…" : "변경사항 저장"}
          </button>
        </form>
      </div>
    </div>
  );
}
