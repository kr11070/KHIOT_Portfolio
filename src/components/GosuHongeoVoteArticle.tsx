"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Vote = "gosu" | "hongeo";

const STORAGE_KEY = "gosu-hongeo-vote";

const REACTIONS: Record<Vote, string> = {
  gosu: "고수파시군요! 고수를 고르시다니 당신을 고수로 인정합니다! 🌿",
  hongeo: "홍어파시군요! 삭힌 맛의 매력을 아는 당신, 존경합니다 🐟",
};

export default function GosuHongeoVoteArticle() {
  const [vote, setVote] = useState<Vote | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "gosu" || saved === "hongeo") setVote(saved);
  }, []);

  const castVote = (choice: Vote) => {
    setVote(choice);
    window.localStorage.setItem(STORAGE_KEY, choice);
  };

  const resetVote = () => {
    setVote(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/#inspiration"
        className="inline-flex items-center gap-1 text-sm font-bold text-accent-deep hover:underline"
      >
        <span aria-hidden="true">←</span> Inspiration으로 돌아가기
      </Link>

      <h1 className="mt-8 text-3xl font-extrabold tracking-tight md:text-4xl">고수 VS 홍어</h1>
      <p className="mt-3 text-ink-soft">고수와 홍어 중 어떤 걸 더 좋아하시나요? 취향은 존중합니다.</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => castVote("gosu")}
          className={`rounded-2.5xl border-2 p-8 text-center transition-colors ${
            vote === "gosu"
              ? "border-accent-dark bg-accent-soft"
              : "border-line bg-white/70 hover:border-accent-dark hover:bg-accent-soft/50"
          }`}
        >
          <span className="text-5xl">🌿</span>
          <p className="mt-4 text-xl font-extrabold tracking-tight">고수</p>
        </button>

        <button
          type="button"
          onClick={() => castVote("hongeo")}
          className={`rounded-2.5xl border-2 p-8 text-center transition-colors ${
            vote === "hongeo"
              ? "border-accent-dark bg-accent-soft"
              : "border-line bg-white/70 hover:border-accent-dark hover:bg-accent-soft/50"
          }`}
        >
          <span className="text-5xl">🐟</span>
          <p className="mt-4 text-xl font-extrabold tracking-tight">홍어</p>
        </button>
      </div>

      {vote && (
        <div className="mt-8 rounded-2.5xl bg-accent-soft p-6">
          <p className="font-bold text-accent-deep">{REACTIONS[vote]}</p>
          <button
            type="button"
            onClick={resetVote}
            className="mt-3 text-sm font-bold text-accent-deep hover:underline"
          >
            다시 투표하기
          </button>
        </div>
      )}
    </main>
  );
}
