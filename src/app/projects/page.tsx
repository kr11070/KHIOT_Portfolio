import { redirect } from "next/navigation";

// 사이드 프로젝트 목록은 홈의 섹션으로 통합되었습니다.
export default function ProjectsPage() {
  redirect("/#side-projects");
}
