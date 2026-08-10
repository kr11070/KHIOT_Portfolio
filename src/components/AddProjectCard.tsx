"use client";

import { useState } from "react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { addSideProject } from "@/lib/portfolio-data";
import AdminLoginModal from "./AdminLoginModal";
import ProjectFormModal, { emptyProjectFormValues, type ProjectFormValues } from "./ProjectFormModal";

/**
 * 사이드 프로젝트 그리드 끝에 붙는 "+ 프로젝트 추가" 카드. 로그인이 안 되어 있으면
 * 로그인 모달을 먼저 띄우고, 로그인된 상태면 바로 추가 폼을 엽니다.
 */
export default function AddProjectCard({ onAdded }: { onAdded: () => void }) {
  const { user } = useAdminAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (user) setOpen(true);
    else setShowLogin(true);
  }

  async function handleSubmit(values: ProjectFormValues) {
    const result = await addSideProject({
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
    });
    if (result.ok) onAdded();
    return result;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-2 rounded-2.5xl border-2 border-dashed border-line bg-white/40 text-ink-soft transition-colors hover:border-accent-dark hover:bg-accent-soft/50 hover:text-accent-deep"
      >
        <span className="text-3xl font-light leading-none">+</span>
        <span className="text-sm font-bold">프로젝트 추가</span>
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
