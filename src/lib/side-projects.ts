export type SideProject = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const sideProjects: SideProject[] = [
  {
    slug: "example-project",
    title: "Example Mini Project",
    description: "가볍게 만든 사이드 프로젝트 설명을 여기에 작성하세요.",
    href: "/projects/example-project/index.html",
  },
];
