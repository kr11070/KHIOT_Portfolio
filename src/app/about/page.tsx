import { redirect } from "next/navigation";

// 소개는 홈의 About 섹션으로 통합되었습니다.
export default function AboutPage() {
  redirect("/#about");
}
