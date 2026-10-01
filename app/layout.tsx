import type { Metadata } from "next";
import { Anton, Black_Han_Sans } from "next/font/google";
import { RibbonDefs } from "@/components/Ribbon";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const blackHan = Black_Han_Sans({ weight: "400", preload: false, variable: "--font-black-han" });

export const metadata: Metadata = {
  title: "GSEEK",
  description: "AI로 만든 홈페이지를 진짜 서비스로 — 회원가입, 데이터베이스, 배포까지.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${anton.variable} ${blackHan.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <RibbonDefs />
        {children}
        <footer className="footer">
          <span>© 2026 GSEEK</span>
          <span>Next.js · Supabase · Vercel</span>
        </footer>
      </body>
    </html>
  );
}
