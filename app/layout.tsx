import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONO",
  description: "강의용 예제 쇼핑몰입니다. 실제 판매하지 않습니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <div className="page">
          <Header />
          <main>{children}</main>
          <footer className="footer">
            <div className="footer__in">
              <div className="footer__brand">
                <strong>MONO</strong>
                <span>강의용 예제 쇼핑몰입니다. 실제 판매하지 않습니다.</span>
              </div>
              <div className="footer__links">
                <span>이용약관</span>
                <span>개인정보처리방침</span>
                <span>고객센터</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
