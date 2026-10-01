"use client";

import { useActionState, useEffect, useRef } from "react";
import { askQuestion } from "@/app/actions/questions";

export function QuestionForm() {
  const [state, action, pending] = useActionState(askQuestion, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} className="form" action={action}>
      <div className="field">
        <label htmlFor="content">질문 내용</label>
        <textarea className="textarea" id="content" name="content" placeholder="예) Vercel에 배포했는데 로그인 후 흰 화면이 나와요." minLength={5} maxLength={1000} required />
      </div>
      {state?.error && <p className="notice notice--error">{state.error}</p>}
      {state?.message && <p className="notice notice--ok">{state.message}</p>}
      <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
        {pending ? "등록 중…" : "질문 등록"}
      </button>
    </form>
  );
}
