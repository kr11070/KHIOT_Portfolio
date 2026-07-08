"use client";

import { dict, pick, useLang } from "@/lib/i18n";
import { contactLinks } from "@/lib/portfolio-data";
import Reveal from "./Reveal";

export default function Contact() {
  const { lang } = useLang();

  const socials = [
    { label: "GitHub", href: contactLinks.github },
    { label: "LinkedIn", href: contactLinks.linkedin },
    { label: "Instagram", href: contactLinks.instagram },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <div className="rounded-2.5xl bg-ink px-7 py-14 text-center text-cream md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {pick(dict.contact.title, lang)}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/70">
            {pick(dict.contact.subtitle, lang)}
          </p>
          <a
            href={`mailto:${contactLinks.email}`}
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-deep transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:text-white"
          >
            {pick(dict.contact.emailBtn, lang)}
          </a>
          <p className="mt-4 text-sm text-cream/50">{contactLinks.email}</p>

          {socials.length > 0 && (
            <div className="mt-8 flex justify-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cream/25 px-4 py-2 text-xs font-bold text-cream/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
