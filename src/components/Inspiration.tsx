"use client";

import { dict, pick, useLang } from "@/lib/i18n";
import { inspirations } from "@/lib/portfolio-data";
import Reveal from "./Reveal";

/** 사진이 없을 때 대신 보여주는 자리 표시자 */
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft via-cream-deep to-accent/40">
      <span className="select-none font-serif text-3xl italic text-accent-deep/70">{label}</span>
    </div>
  );
}

/** "Inspiration" 갤러리 */
export function InspirationGallery() {
  const { lang } = useLang();

  return (
    <section className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {pick(dict.inspiration.title, lang)}
          </h2>
          <p className="mt-3 text-ink-soft">{pick(dict.inspiration.subtitle, lang)}</p>
        </Reveal>
      </div>

      <div className="mt-10 flex flex-col gap-14">
        {inspirations.map((item, i) => (
          <Reveal key={item.slug} delay={i * 100}>
            <article className="mx-auto max-w-5xl px-5">
              <div className="h-48 overflow-hidden rounded-2.5xl md:h-72">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder label={item.title} />
                )}
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{pick(item.blurb, lang)}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent-deep hover:underline"
                >
                  {pick(item.linkLabel, lang)}
                  <span aria-hidden="true">→</span>
                </a>
              ) : (
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent-deep">
                  {pick(item.linkLabel, lang)}
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
