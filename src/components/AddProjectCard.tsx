"use client";

import { useState } from "react";
import { addSideProject } from "@/lib/portfolio-data";
import ProjectFormModal, { emptyProjectFormValues, type ProjectFormValues } from "./ProjectFormModal";

/**
 * 사이드 프로젝트 그리드 끝에 붙는 "+ 프로젝트 추가" 카드.
 * 폼 제출 시 Supabase add_side_project 함수가 비밀번호를 검증한 뒤 저장합니다.
 */
export default function AddProjectCard({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: ProjectFormValues, password: string) {
    const result = await addSideProject(
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
      },
      password
    );
    if (result.ok) onAdded();
    return result;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-2 rounded-2.5xl border-2 border-dashed border-line bg-white/40 text-ink-soft transition-colors hover:border-accent-dark hover:bg-accent-soft/50 hover:text-accent-deep"
      >
        <span className="text-3xl font-light leading-none">+</span>
        <span className="text-sm font-bold">프로젝트 추가</span>
      </button>

      {open && (
        <ProjectFormModal
          heading="프로젝트 추가"
          submitLabel="카드 추가하기"
          initialValues={emptyProjectFormValues}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
