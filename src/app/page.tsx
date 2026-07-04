import Link from "next/link";
import { getAllCaseStudiesMeta } from "@/lib/case-studies";
import { sideProjects } from "@/lib/side-projects";

export default function HomePage() {
  const caseStudies = getAllCaseStudiesMeta();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">KHIOT Portfolio</h1>
      <p className="mt-2 text-neutral-500">
        UX/UI Design &amp; Product Management Portfolio
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Case Studies</h2>
        <ul className="mt-4 space-y-4">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="text-lg font-medium hover:underline"
              >
                {cs.title}
              </Link>
              <p className="text-neutral-500">{cs.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Side Projects</h2>
        <ul className="mt-4 space-y-4">
          {sideProjects.map((p) => (
            <li key={p.slug}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:underline"
              >
                {p.title}
              </a>
              <p className="text-neutral-500">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
