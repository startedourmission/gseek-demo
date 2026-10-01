import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";
import { KeyIllo } from "@/components/Illustrations";
import { Nav } from "@/components/Nav";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "로그인 · GSEEK" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next, error } = await searchParams;
  const initialError = error === "confirm" ? "인증 링크가 만료되었거나 올바르지 않아요. 가입한 브라우저에서 다시 시도해 주세요." : undefined;

  return (
    <>
      <Nav current="login" />
      <AuthShell art={<KeyIllo />} note="다시 오신 걸 환영해요">
        <h1 className="h-lg">로그인</h1>
        <p className="sub">가입한 이메일과 비밀번호를 입력하세요.</p>
        {isSupabaseConfigured ? (
          <AuthForm mode="login" next={typeof next === "string" ? next : undefined} initialError={initialError} />
        ) : (
          <SetupNotice />
        )}
      </AuthShell>
    </>
  );
}
