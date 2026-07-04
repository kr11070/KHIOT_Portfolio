import Link from "next/link";
import { getAllCaseStudiesMeta } from "@/lib/case-studies";

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudiesMeta();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Case Studies</h1>
      <ul className="mt-8 space-y-6">
        {caseStudies.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {cs.title}
            </Link>
            <p className="text-neutral-500">{cs.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
