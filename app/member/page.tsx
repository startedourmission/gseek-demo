import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { deleteQuestion } from "@/app/actions/questions";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { QuestionForm } from "@/components/QuestionForm";
import { Ribbon } from "@/components/Ribbon";
import { SetupNotice } from "@/components/SetupNotice";
import { QBubble, Wallet } from "@/components/Stickers";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "내 질문 · GSEEK" };

type Question = { id: number; content: string; answer: string | null; created_at: string; answered_at: string | null };

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(iso));

export default async function MemberPage() {
  if (!isSupabaseConfigured) {
    return (
      <main className="frame">
        <section className="panel panel--sky">
          <Nav current="member" />
          <div className="section">
            <SetupNotice />
          </div>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // proxy.ts에서 이미 막지만, 페이지에서도 한 번 더 확인합니다.
  if (!user) redirect("/login?next=/member");

  // 조건(where) 없이 전부 조회해도 RLS가 "내 질문"만 돌려줍니다.
  const { data, error } = await supabase
    .from("questions")
    .select("id, content, answer, created_at, answered_at")
    .order("created_at", { ascending: false });
  const questions = (data ?? []) as Question[];

  return (
    <>
      <Marquee text="회원 전용 공간" />
      <main className="frame">
        <section className="panel panel--gray">
          <Ribbon variant="arc" />
          <Nav current="member" />
          <div className="page-head">
            <h1 className="display-ko">
              내 질문
            </h1>
            <p className="lead">{user.email} 님, 반가워요. 남긴 질문과 답변을 여기서 확인하세요.</p>
            <QBubble className="s-a" />
            <Wallet className="s-b" />
          </div>
        </section>

        <section className="panel panel--white">
          <div className="section member">
            <article className="card card--lav">
              <span className="tag">새 질문</span>
              <div>
                <h3>무엇이 궁금한가요?</h3>
                <p style={{ marginBottom: 20 }}>질문은 나와 운영자만 볼 수 있어요. 답변 전에는 삭제할 수 있어요.</p>
                <QuestionForm />
              </div>
            </article>

            <div className="qa-list">
              {error && <p className="notice notice--error">질문을 불러오지 못했어요: {error.message}</p>}
              {questions.length === 0 && !error && <p className="empty">아직 남긴 질문이 없어요. 첫 질문을 남겨보세요!</p>}
              {questions.map((q) => (
                <article key={q.id} className="qa">
                  <div className="qa__meta">
                    <span className={`tag ${q.answer ? "tag--답변완료" : "tag--대기"}`}>{q.answer ? "답변 완료" : "답변 대기"}</span>
                    <span>{fmt(q.created_at)}</span>
                    {!q.answer && (
                      <form action={deleteQuestion} className="qa__del">
                        <input type="hidden" name="id" value={q.id} />
                        <button type="submit">삭제</button>
                      </form>
                    )}
                  </div>
                  <p className="qa__q">{q.content}</p>
                  {q.answer && <p className="qa__a">{q.answer}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
