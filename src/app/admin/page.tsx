"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddProjectCard from "@/components/AddProjectCard";
import AdminLoginModal from "@/components/AdminLoginModal";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import EditProjectButton from "@/components/EditProjectButton";
import ProjectCard from "@/components/ProjectCard";
import SkillsFormModal from "@/components/SkillsFormModal";
import { signOutAdmin } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";
import {
  fallbackSideProjects,
  fallbackSkills,
  getSideProjects,
  getSkills,
  type Project,
  type Skill,
} from "@/lib/portfolio-data";

/** 사이드 프로젝트 카드와 스킬 목록을 관리하는 관리자 전용 페이지. 공개 홈페이지에는 이 기능이 노출되지 않습니다. */
export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [sideProjects, setSideProjects] = useState<Project[]>(fallbackSideProjects);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [showSkillsForm, setShowSkillsForm] = useState(false);

  const reload = useCallback(() => {
    getSideProjects().then(setSideProjects);
    getSkills().then(setSkills);
  }, []);

  useEffect(() => {
    if (user) reload();
  }, [user, reload]);

  if (loading) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream">
        <AdminLoginModal onSuccess={reload} onClose={() => router.push("/")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight">프로젝트 관리</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSkillsForm(true)}
              className="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink-soft transition-colors hover:border-accent-dark hover:text-accent-deep"
            >
              스킬 관리
            </button>
            <button
              type="button"
              onClick={() => signOutAdmin()}
              className="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink-soft transition-colors hover:border-accent-dark hover:text-accent-deep"
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((project) => (
            <div key={project.slug} className="relative h-full">
              <ProjectCard project={project} compact />
              <EditProjectButton project={project} onUpdated={reload} />
              <DeleteProjectButton project={project} onDeleted={reload} />
            </div>
          ))}
          <AddProjectCard onAdded={reload} />
        </div>
      </div>

      {showSkillsForm && (
        <SkillsFormModal
          initialSkills={skills}
          onSaved={reload}
          onClose={() => setShowSkillsForm(false)}
        />
      )}
    </div>
  );
}
