import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudySource } from "@/lib/case-studies";

export default function CaseStudyArticle({ slug }: { slug: string }) {
  const { content, meta } = getCaseStudySource(slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      {meta.summary && (
        <p className="mt-2 text-neutral-500">{meta.summary}</p>
      )}
      <article className="prose prose-neutral mt-8 max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
