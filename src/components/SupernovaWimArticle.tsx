import Link from "next/link";

export default function SupernovaWimArticle() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/#inspiration"
        className="inline-flex items-center gap-1 text-sm font-bold text-accent-deep hover:underline"
      >
        <span aria-hidden="true">←</span> Inspiration으로 돌아가기
      </Link>

      <div className="mt-8 aspect-video overflow-hidden rounded-2.5xl">
        <iframe
          src="https://www.youtube.com/embed/5O4VYKzpQNQ"
          title="Supernova_WIM"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="pb-24 text-center">
        <p className="mt-6 text-lg text-ink-soft">우리 들으면서 같이 작업합시다.</p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          SUPERNOVA
          <br />
          WIM
        </h1>
      </div>
    </main>
  );
}
