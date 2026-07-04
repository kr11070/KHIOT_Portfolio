import { sideProjects } from "@/lib/side-projects";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Side Projects</h1>
      <p className="mt-2 text-neutral-500">
        가볍게 만든 웹/앱 프로젝트 모음입니다. 각 링크는 정적으로 배포된 데모 페이지로 연결됩니다.
      </p>
      <ul className="mt-8 space-y-6">
        {sideProjects.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold hover:underline"
            >
              {p.title}
            </a>
            <p className="text-neutral-500">{p.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
