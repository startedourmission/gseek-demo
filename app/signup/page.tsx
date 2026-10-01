import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Ribbon } from "@/components/Ribbon";
import { SetupNotice } from "@/components/SetupNotice";
import { Check, Rocket } from "@/components/Stickers";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "회원가입 · GSEEK" };

export default function SignupPage() {
  return (
    <>
      <Marquee text="GSEEK 회원가입" />
      <main className="frame">
        <section className="panel panel--sky panel--full">
          <Ribbon variant="loop" />
          <Nav current="signup" />
          <div className="auth">
            <div className="auth__card">
              <Rocket className="s-a" />
              <Check className="s-b" />
              <h1 className="display-ko display-sm">회원가입</h1>
              <p className="sub">이메일로 가입하고 1:1 질문을 남겨보세요.</p>
              {isSupabaseConfigured ? <AuthForm mode="signup" /> : <SetupNotice />}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
