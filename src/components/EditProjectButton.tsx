"use client";

import { useState } from "react";
import { pick, useLang } from "@/lib/i18n";
import { updateSideProject, type Project } from "@/lib/portfolio-data";
import ProjectFormModal, { type ProjectFormValues } from "./ProjectFormModal";

/**
 * 사이드 프로젝트 카드 우상단에 얹는 연필 아이콘 버튼. 클릭하면 현재 값이 채워진
 * 수정 폼이 열리고, 제출 시 Supabase update_side_project 함수가 비밀번호를 검증합니다.
 */
export default function EditProjectButton({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: () => void;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const initialValues: ProjectFormValues = {
    title: pick(project.title, lang),
    description: pick(project.description, lang),
    date: project.date ?? "",
    thumbnail: project.thumbnail ?? "",
    tech: project.tech.join(", "),
    demo: project.links.demo ?? "",
    github: project.links.github ?? "",
    download: project.links.download ?? "",
  };

  async function handleSubmit(values: ProjectFormValues, password: string) {
    const result = await updateSideProject(
      project.slug,
      {
        title: values.title,
        description: values.description,
        date: values.date,
        thumbnail: values.thumbnail,
        tech: values.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        demo: values.demo,
        github: values.github,
        download: values.download,
      },
      password
    );
    if (result.ok) onUpdated();
    return result;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="프로젝트 수정"
        title="프로젝트 수정"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/90 text-sm text-ink-soft shadow-sm transition-colors hover:border-accent-dark hover:text-accent-deep"
      >
        ✏️
      </button>

      {open && (
        <ProjectFormModal
          heading="프로젝트 수정"
          submitLabel="변경사항 저장"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
