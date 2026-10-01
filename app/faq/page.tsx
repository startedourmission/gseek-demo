import type { Metadata } from "next";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Ribbon } from "@/components/Ribbon";
import { SetupNotice } from "@/components/SetupNotice";
import { QBubble, SmileCoin } from "@/components/Stickers";
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
      <Marquee text="무엇이든 물어보세요" />
      <main className="frame">
        <section className="panel panel--lavender">
          <Ribbon variant="corner" />
          <Nav current="faq" />
          <div className="page-head">
            <h1 className="display-ko">
              자주 묻는
              <br />
              질문
            </h1>
            <p className="lead">강의, 로그인, 배포에 대해 가장 많이 받은 질문을 모았어요.</p>
            <QBubble className="s-a" />
            <SmileCoin className="s-b" />
          </div>
        </section>

        <section className="panel panel--white">
          <div className="section">
            {!isSupabaseConfigured && <SetupNotice />}
            {error && <p className="notice notice--error">FAQ를 불러오지 못했어요: {error.message}</p>}

            {categories.length > 0 && (
              <div className="faq-filters">
                <Link className="pill" href="/faq" aria-current={!selected ? "page" : undefined}>
                  전체
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c}
                    className="pill"
                    href={`/faq?category=${encodeURIComponent(c)}`}
                    aria-current={selected === c ? "page" : undefined}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            )}

            <div className="faq-list">
              {visible.map((f) => (
                <details key={f.id} className="faq">
                  <summary>
                    <span className={`tag tag--${f.category}`}>{f.category}</span>
                    <span className="q">{f.question}</span>
                    <span className="plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="a">{f.answer}</p>
                </details>
              ))}
              {isSupabaseConfigured && !error && visible.length === 0 && (
                <p className="empty">아직 등록된 질문이 없어요.</p>
              )}
            </div>

            <div className="cta-band">
              <p>원하는 답이 없나요? 회원이라면 1:1로 질문할 수 있어요.</p>
              <Link className="pill" href="/member">
                질문 남기기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
