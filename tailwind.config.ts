import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 노란기가 살짝 도는 웜 화이트 배경 + 그레이 계열 + 포인트 컬러
        cream: "#FAF8F2",
        "cream-deep": "#F3F0E7",
        ink: "#22261F",
        "ink-soft": "#5C6357",
        "ink-faint": "#9AA093",
        accent: "#9ECA8E",
        "accent-dark": "#7DB36B",
        "accent-deep": "#4F7A41",
        "accent-soft": "#EDF4E8",
        line: "#E7E3D8",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Noto Sans KR",
          "Noto Sans JP",
          "Noto Sans",
          "-apple-system",
          "sans-serif",
        ],
        serif: ["Noto Serif", "Noto Serif KR", "serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(34, 38, 31, 0.05), 0 1px 3px rgba(34, 38, 31, 0.04)",
        "card-hover": "0 14px 34px rgba(34, 38, 31, 0.10), 0 4px 10px rgba(34, 38, 31, 0.05)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
