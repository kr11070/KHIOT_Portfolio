"use client";

import { useState } from "react";
import { pick, useLang } from "@/lib/i18n";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { updateSideProject, type Project } from "@/lib/portfolio-data";
import AdminLoginModal from "./AdminLoginModal";
import ProjectFormModal, { type ProjectFormValues } from "./ProjectFormModal";

/**
 * 사이드 프로젝트 카드 우상단에 얹는 연필 아이콘 버튼. 로그인이 안 되어 있으면 로그인 모달을
 * 먼저 띄우고, 로그인된 상태면 바로 수정 폼을 엽니다.
 */
export default function EditProjectButton({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: () => void;
}) {
  const { lang } = useLang();
  const { user } = useAdminAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);

  const initialValues: ProjectFormValues = {
    title: pick(project.title, lang),
    description: pick(project.description, lang),
    date: project.date ?? "",
    thumbnail: project.thumbnail ?? "",
    tech: project.tech.join(", "),
    caseStudy: project.links.caseStudy ?? "",
    demo: project.links.demo ?? "",
    github: project.links.github ?? "",
    download: project.links.download ?? "",
  };

  function handleClick() {
    if (user) setOpen(true);
    else setShowLogin(true);
  }

  async function handleSubmit(values: ProjectFormValues) {
    const result = await updateSideProject(project.slug, {
      title: values.title,
      description: values.description,
      date: values.date,
      thumbnail: values.thumbnail,
      tech: values.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      caseStudy: values.caseStudy,
      demo: values.demo,
      github: values.github,
      download: values.download,
    });
    if (result.ok) onUpdated();
    return result;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="프로젝트 수정"
        title="프로젝트 수정"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/90 text-sm text-ink-soft shadow-sm transition-colors hover:border-accent-dark hover:text-accent-deep"
      >
        ✏️
      </button>

      {showLogin && (
        <AdminLoginModal
          onSuccess={() => {
            setShowLogin(false);
            setOpen(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

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
