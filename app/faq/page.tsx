import type { Metadata } from "next";
import Link from "next/link";
import { QuestionIllo } from "@/components/Illustrations";
import { DrawIn, Reveal } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "자주 묻는 질문 · GSEEK" };

type Faq = { id: number; category: string; question: string; answer: string };

async function getFaqs() {
  if (!isSupabaseConfigured) return { faqs: [] as Faq[], error: null };
  const supabase = await createClient();
  // RLS 정책 "누구나 공개 FAQ 조회" 덕분에 로그인하지 않아도 읽을 수 있습니다.
  const { data, error } = await supabase
    .from("faqs")
    .select("id, category, question, answer")
    .order("sort_order");
  return { faqs: (data ?? []) as Faq[], error };
}

export default async function FaqPage({ searchParams }: PageProps<"/faq">) {
  const { category } = await searchParams;
  const { faqs, error } = await getFaqs();
  const categories = [...new Set(faqs.map((f) => f.category))];
  const selected = typeof category === "string" ? category : undefined;
  const visible = selected ? faqs.filter((f) => f.category === selected) : faqs;

  return (
    <>
      <Nav current="faq" />
      <section className="page-head">
        <div className="container page-head__grid">
          <Reveal>
            <span className="eyebrow">무엇이든 물어보세요</span>
            <h1 className="h-xl">자주 묻는 질문</h1>
            <p className="lead">강의, 로그인, 배포에 대해 가장 많이 받은 질문을 모았어요.</p>
          </Reveal>
          <DrawIn className="page-head__art">
            <QuestionIllo />
          </DrawIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!isSupabaseConfigured && <SetupNotice />}
          {error && <p className="notice notice--error">FAQ를 불러오지 못했어요: {error.message}</p>}

          {categories.length > 0 && (
            <div className="filters">
              <Link className="filter" href="/faq" aria-current={!selected ? "page" : undefined}>
                전체
              </Link>
              {categories.map((c) => (
                <Link key={c} className="filter" href={`/faq?category=${encodeURIComponent(c)}`} aria-current={selected === c ? "page" : undefined}>
                  {c}
                </Link>
              ))}
            </div>
          )}

          <div className="faq-list">
            {visible.map((f) => (
              <details key={f.id} className="faq">
                <summary>
                  <span className={`cat cat--${f.category}`}>{f.category}</span>
                  <span className="q">{f.question}</span>
                  <span className="plus" aria-hidden="true" />
                </summary>
                <p className="a">{f.answer}</p>
              </details>
            ))}
          </div>
          {isSupabaseConfigured && !error && visible.length === 0 && <p className="empty">아직 등록된 질문이 없어요.</p>}

          <Reveal className="ask-band">
            <p>
              <span className="hand">원하는 답이 없나요?</span>
              회원이라면 1:1로 질문할 수 있어요.
            </p>
            <Link className="btn btn--ghost-light" href="/member">
              질문 남기기
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
