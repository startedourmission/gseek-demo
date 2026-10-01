import type { Metadata } from "next";
import { Nanum_Pen_Script, Noto_Serif_KR } from "next/font/google";
import { InkDefs } from "@/components/Illustrations";
import "./globals.css";

const serif = Noto_Serif_KR({ weight: ["600", "700"], preload: false, variable: "--font-serif" });
const hand = Nanum_Pen_Script({ weight: "400", preload: false, variable: "--font-hand" });

export const metadata: Metadata = {
  title: "GSEEK",
  description: "AI로 만든 홈페이지를 진짜 서비스로 — 회원가입, 데이터베이스, 배포까지.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${serif.variable} ${hand.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <InkDefs />
        {children}
        <footer className="footer">
          <div className="container footer__in">
            <span>© 2026 GSEEK</span>
            <span>Next.js · Supabase · Vercel로 만들었어요</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
