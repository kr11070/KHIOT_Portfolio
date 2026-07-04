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
  {
    slug: "news-reading-mode",
    title: "뉴스 쉬운말 모드",
    description: "네이버뉴스·다음뉴스·한국경제 기사에서 플로팅 버튼으로 본문을 쉬운 말로 바꿔주는 Chrome 확장 프로그램",
    href: "/projects/news-reading-mode/index.html",
  },
];
