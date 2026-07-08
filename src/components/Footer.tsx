"use client";

import { dict, pick, useLang } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-line py-8 text-center text-xs text-ink-faint">
      {pick(dict.footer.copyright, lang)}
    </footer>
  );
}
