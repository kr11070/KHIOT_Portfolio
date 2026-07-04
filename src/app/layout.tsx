import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KHIOT Portfolio",
  description: "UX/UI Design & Product Management Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
