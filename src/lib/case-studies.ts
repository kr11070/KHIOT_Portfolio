import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyMeta = {
  slug: string;
  title: string;
  summary: string;
  role?: string;
  period?: string;
  tags?: string[];
};

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getCaseStudyMeta(slug: string): CaseStudyMeta {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    role: data.role,
    period: data.period,
    tags: data.tags,
  };
}

export function getCaseStudySource(slug: string) {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, meta: { slug, ...data } as CaseStudyMeta };
}

export function getAllCaseStudiesMeta(): CaseStudyMeta[] {
  return getCaseStudySlugs().map(getCaseStudyMeta);
}
