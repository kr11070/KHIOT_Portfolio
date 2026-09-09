"use client";

import Link from "next/link";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

type Vote = "gosu" | "hongeo";
type Counts = { gosu: number; hongeo: number };

const STORAGE_KEY = "gosu-hongeo-vote";
const VOTE_DOC = ["votes", "gosu-hongeo"] as const;

const REACTIONS: Record<Vote, string> = {
  gosu: "고수파시군요! 고수를 고르시다니 당신을 고수로 인정합니다! 🌿",
  hongeo: "홍어파시군요! 삭힌 맛의 매력을 아는 당신, 존경합니다 🐟",
};

async function fetchCounts(): Promise<Counts> {
  if (!db) return { gosu: 0, hongeo: 0 };
  try {
    const snap = await getDoc(doc(db, ...VOTE_DOC));
    const data = snap.data();
    return { gosu: data?.gosu ?? 0, hongeo: data?.hongeo ?? 0 };
  } catch {
    return { gosu: 0, hongeo: 0 };
  }
}

async function submitVote(choice: Vote) {
  if (!db) return;
  const ref = doc(db, ...VOTE_DOC);
  try {
    await updateDoc(ref, { [choice]: increment(1) });
  } catch {
    try {
      await setDoc(ref, { gosu: choice === "gosu" ? 1 : 0, hongeo: choice === "hongeo" ? 1 : 0 });
    } catch {
      // 문서가 이미 존재하는데 규칙 문제로 update가 막힌 경우 등 — 화면엔 이미 낙관적으로 반영했으니 조용히 무시.
    }
  }
}

export default function GosuHongeoVoteArticle() {
  const [vote, setVote] = useState<Vote | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "gosu" || saved === "hongeo") setVote(saved);
    fetchCounts().then(setCounts);
  }, []);

  const castVote = (choice: Vote) => {
    setVote(choice);
    window.localStorage.setItem(STORAGE_KEY, choice);
    setCounts((c) => (c ? { ...c, [choice]: c[choice] + 1 } : c));
    submitVote(choice);
  };

  const resetVote = () => {
    setVote(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const total = counts ? counts.gosu + counts.hongeo : 0;
  const percent = (choice: Vote) => (total > 0 ? Math.round(((counts?.[choice] ?? 0) / total) * 100) : 0);

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

          <div className="mt-5 flex flex-col gap-3">
            {(["gosu", "hongeo"] as const).map((choice) => (
              <div key={choice}>
                <div className="flex justify-between text-sm font-bold text-ink">
                  <span>{choice === "gosu" ? "🌿 고수" : "🐟 홍어"}</span>
                  <span>{percent(choice)}%</span>
                </div>
                <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-white/70">
                  <div
                    className="h-full rounded-full bg-accent-dark transition-all"
                    style={{ width: `${percent(choice)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-ink-faint">총 {total}표</p>
          </div>

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
