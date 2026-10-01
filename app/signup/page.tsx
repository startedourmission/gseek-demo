import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";
import { PencilIllo } from "@/components/Illustrations";
import { Nav } from "@/components/Nav";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "회원가입 · GSEEK" };

export default function SignupPage() {
  return (
    <>
      <Nav current="signup" />
      <AuthShell art={<PencilIllo />} note="이메일 하나면 충분해요">
        <h1 className="h-lg">회원가입</h1>
        <p className="sub">이메일로 가입하고 1:1 질문을 남겨보세요.</p>
        {isSupabaseConfigured ? <AuthForm mode="signup" /> : <SetupNotice />}
      </AuthShell>
    </>
  );
}
