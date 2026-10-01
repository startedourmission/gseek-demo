import type { ReactNode } from "react";
import { DrawIn } from "@/components/Motion";

// 로그인 · 회원가입 공통 레이아웃: 왼쪽 일러스트, 오른쪽 폼
export function AuthShell({ art, note, children }: { art: ReactNode; note: string; children: ReactNode }) {
  return (
    <main className="auth">
      <div className="auth__art">
        <DrawIn className="illo-wrap">{art}</DrawIn>
        <span className="hand">{note}</span>
      </div>
      <div className="auth__panel">
        <div className="auth__card">{children}</div>
      </div>
    </main>
  );
}
