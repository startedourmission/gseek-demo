"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup } from "@/app/actions/auth";

export function AuthForm({ mode, next, initialError }: { mode: "login" | "signup"; next?: string; initialError?: string }) {
  const [state, action, pending] = useActionState(mode === "login" ? login : signup, undefined);
  const error = state?.error ?? (state ? undefined : initialError);

  if (state?.message) {
    return (
      <div className="form">
        <p className="notice notice--ok">{state.message}</p>
        <p className="auth__alt">
          메일이 안 보이면 스팸함을 확인해 주세요.{" "}
          <Link className="link" href="/login">
            로그인으로 이동
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="form" action={action}>
      {next && <input type="hidden" name="next" value={next} />}
      <div className="field">
        <label htmlFor="email">이메일</label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" defaultValue={state?.email} placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label htmlFor="password">비밀번호</label>
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          placeholder="6자 이상"
          minLength={6}
          required
        />
      </div>
      {error && <p className="notice notice--error">{error}</p>}
      <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
        {pending ? "처리 중…" : mode === "login" ? "로그인" : "회원가입"}
      </button>
      <p className="auth__alt">
        {mode === "login" ? (
          <>
            아직 회원이 아니신가요? <Link className="link" href="/signup">회원가입</Link>
          </>
        ) : (
          <>
            이미 가입하셨나요? <Link className="link" href="/login">로그인</Link>
          </>
        )}
      </p>
    </form>
  );
}
