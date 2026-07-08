"use client";

import { useState } from "react";
import { dict, LANGS, LANG_LABELS, pick, useLang } from "@/lib/i18n";
import { resumeUrl } from "@/lib/portfolio-data";

const NAV_ITEMS = [
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#side-projects", key: "side" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line/70">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="text-lg font-extrabold tracking-tight">
          Lee Juhee<span className="text-accent-dark">.</span>
        </a>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {pick(dict.nav[item.key], lang)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* 언어 토글 */}
          <div className="flex items-center rounded-full border border-line bg-white/70 p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
                  lang === l
                    ? "bg-ink text-cream shadow-sm"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>

          {/* 이력서 다운로드 */}
          <a
            href={resumeUrl}
            download
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-deep transition-all hover:bg-accent-dark hover:text-white md:inline-block"
          >
            {pick(dict.nav.resume, lang)}
          </a>

          {/* 모바일 햄버거 */}
          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="border-t border-line/70 px-5 pb-4 pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm font-medium text-ink-soft"
            >
              {pick(dict.nav[item.key], lang)}
            </a>
          ))}
          <a
            href={resumeUrl}
            download
            className="mt-2 inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-deep"
          >
            {pick(dict.nav.resume, lang)}
          </a>
        </div>
      )}
    </header>
  );
}
