"use client";

import { useState } from "react";
import { signInAdmin } from "@/lib/firebase";

/** 카드 추가/수정/삭제 시 로그인이 안 되어 있으면 뜨는 모달. 로그인 성공 시 onSuccess로 원래 하려던 동작을 이어갑니다. */
export default function AdminLoginModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signInAdmin(email, password);
      onSuccess();
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않아요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2.5xl border border-line bg-white p-6 shadow-card">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-extrabold tracking-tight">관리자 로그인</h3>
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
            이메일
            <input
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold text-ink-soft">
            비밀번호
            <input
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-dark"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            {submitting ? "로그인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
