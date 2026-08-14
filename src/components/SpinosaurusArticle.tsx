import Link from "next/link";

export default function SpinosaurusArticle() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/#inspiration"
        className="inline-flex items-center gap-1 text-sm font-bold text-accent-deep hover:underline"
      >
        <span aria-hidden="true">←</span> Inspiration으로 돌아가기
      </Link>

      <section className="mt-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">공룡적 사고</h1>
        <p className="mt-3 text-ink-soft">현대인들이라면 필수적으로 갖춰야 할 사고입니다.</p>
        <div className="mt-8 overflow-hidden rounded-2.5xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/inspiration/dino-life-mindset.webp"
            alt="인생이 마음대로 안될 때 - 스피노사우루스 아이깁티아쿠스"
            className="w-full"
          />
        </div>
      </section>

      <section className="mt-20 pb-24">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">번외</h2>
        <p className="mt-3 text-ink-soft">
          스피노사우루스말고도 케찰코아틀루스가 있습니다. 든든한 친구들이죠.
        </p>
        <div className="mt-8 overflow-hidden rounded-2.5xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/inspiration/quetzalcoatlus-ghost-meme.webp"
            alt="귀신과 공룡 - 케찰코아틀루스"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}
