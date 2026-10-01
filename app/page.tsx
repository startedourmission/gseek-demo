import Link from "next/link";
import {
  Arrow,
  DatabaseIllo,
  HeroIllo,
  KeyIllo,
  LockIllo,
  LoopIllo,
  PencilIllo,
  PlaneIllo,
  QuestionIllo,
  Scribble,
  WindowIllo,
} from "@/components/Illustrations";
import { DrawIn, HorizontalTrack, Parallax, Reveal, ScrollScene, WordFill } from "@/components/Motion";
import { Nav } from "@/components/Nav";

const STEPS = [
  { Illo: KeyIllo, title: "Supabase로\n로그인 만들기", body: "프로젝트를 만들고 이메일 회원가입을 켠 뒤, 접속 주소와 연결 키를 확보해요." },
  { Illo: PencilIllo, title: "요구사항으로\n코드 받아내기", body: "소개 · 회원가입 · 로그인 · 회원 전용 페이지를 프롬프트로 정리해 Claude에게 전달해요." },
  { Illo: DatabaseIllo, title: "내 정보 연결하고\n보안 규칙 적용", body: "받은 코드에 접속 정보를 넣고, RLS로 내 데이터는 나만 보도록 지켜요." },
  { Illo: PlaneIllo, title: "GitHub에 올리고\nVercel로 공개", body: "실제 인터넷 주소로 배포해서 누구에게나 링크를 공유할 수 있어요." },
  { Illo: LoopIllo, title: "고치면 자동으로\n다시 배포", body: "수정 → push → 자동 배포. 고칠 때마다 사이트가 알아서 새로워져요." },
  { Illo: LockIllo, title: "로그인 오류\n스스로 점검", body: "인증 메일, 리다이렉트 주소, 연결 키 — 자주 막히는 지점을 직접 해결해요." },
];

export default function Home() {
  return (
    <>
      <Nav current="home" />

      {/* ── 히어로 ── */}
      <section className="hero">
        <Parallax speed={0.25} className="hero__blob hero__blob--a">
          <span />
        </Parallax>
        <Parallax speed={-0.15} className="hero__blob hero__blob--b">
          <span />
        </Parallax>
        <div className="container hero__grid">
          <div>
            <Reveal>
              <span className="eyebrow">AI로 만든 홈페이지, 이제 진짜로</span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="h-xl">
                화면을 넘어,
                <br />
                <span className="nowrap">
                  진짜{" "}
                  <span className="hl">
                    서비스로.
                    <Scribble />
                  </span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="lead">
                Claude가 만들어준 예쁜 화면에 회원가입, 데이터베이스, 배포를 붙여서 실제로 사람들이 쓰는 홈페이지로 완성해요.
              </p>
            </Reveal>
            <Reveal delay={300} className="hero__cta">
              <Link className="btn btn--primary" href="/signup">
                지금 시작하기
              </Link>
              <Link className="btn" href="/faq">
                자주 묻는 질문
              </Link>
            </Reveal>
          </div>
          <div className="hero__art">
            <DrawIn delay={200}>
              <HeroIllo title="연필로 그린 화면이 데이터베이스, 인터넷과 연결된 그림" />
            </DrawIn>
            <Reveal delay={1600} className="hero__note hero__note--a">
              이게 전부 연결돼요 <Arrow />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 장면 1: 화면만 vs 서비스 ── */}
      <ScrollScene className="compare" height={260}>
        <div className="container">
          <span className="eyebrow">강의 첫 번째 이야기</span>
          <div className="compare__head">
            <h2 className="h-lg a">
              버튼을 눌러도
              <br />
              아무 일도 없다면?
            </h2>
            <h2 className="h-lg b">
              누르면 저장되고,
              <br />
              나에게 맞게 보여주는 것.
            </h2>
          </div>
          <div className="compare__stage">
            <div className="compare__card compare__dead">
              <div className="label">화면만 있는 사이트</div>
              <WindowIllo />
              <div className="compare__list">
                <span className="chip chip--off">회원가입</span>
                <span className="chip chip--off">로그인</span>
                <span className="chip chip--off">데이터 저장</span>
                <span className="chip chip--off">인터넷 주소</span>
              </div>
              <span className="compare__note compare__note--dead">눌러도 그대로…</span>
            </div>
            <div className="compare__card compare__alive">
              <div className="label">실제로 운영되는 서비스</div>
              <WindowIllo alive />
              <div className="compare__list">
                <span className="chip chip--on">회원가입</span>
                <span className="chip chip--on">로그인</span>
                <span className="chip chip--on">데이터 저장</span>
                <span className="chip chip--on">인터넷 주소</span>
              </div>
              <span className="compare__note compare__note--alive">이걸 만들어요!</span>
            </div>
          </div>
        </div>
      </ScrollScene>

      {/* ── 장면 2: 여섯 단계 (가로 스크롤) ── */}
      <ScrollScene className="steps" height={380}>
        <div className="container steps__top">
          <div>
            <span className="eyebrow">이렇게 배워요</span>
            <h2 className="h-lg">여섯 단계로 완성해요</h2>
          </div>
          <span className="steps__count">스크롤해서 넘겨보세요 →</span>
        </div>
        <HorizontalTrack>
          {STEPS.map(({ Illo, title, body }, i) => (
            <article key={title} className="step">
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <DrawIn className="illo-wrap" delay={i * 80}>
                <Illo />
              </DrawIn>
              <h3 className="h-md" style={{ whiteSpace: "pre-line" }}>
                {title}
              </h3>
              <p>{body}</p>
            </article>
          ))}
        </HorizontalTrack>
        <div className="container">
          <div className="progress" aria-hidden="true">
            <svg viewBox="0 0 1000 16" preserveAspectRatio="none">
              <path className="track" d="M4 9 C200 4 400 12 600 7 S900 10 996 8" stroke="#141413" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path className="bar" d="M4 9 C200 4 400 12 600 7 S900 10 996 8" stroke="#d97757" strokeWidth="6" fill="none" strokeLinecap="round" filter="url(#wobble)" />
            </svg>
          </div>
        </div>
      </ScrollScene>

      {/* ── 장면 3: 문장 채우기 ── */}
      <ScrollScene className="statement" height={200}>
        <div className="container">
          <span className="eyebrow">GSEEK이 약속하는 것</span>
          <WordFill text="코드는 *Claude가,* 연결은 *내가,* 공개는 *Vercel이.* 끝까지 해내는 경험을 드려요." />
        </div>
      </ScrollScene>

      {/* ── CTA ── */}
      <section className="section cta">
        <div className="container cta__grid">
          <Reveal>
            <span className="eyebrow">궁금한 게 있다면</span>
            <h2 className="h-lg">
              지금 가입하고
              <br />
              1:1로 물어보세요
            </h2>
            <p className="lead">FAQ에서 답을 못 찾았다면, 회원 전용 페이지에서 질문을 남겨주세요. 답변이 달리면 바로 확인할 수 있어요.</p>
            <div className="cta__buttons">
              <Link className="btn btn--primary" href="/signup">
                무료로 가입하기
              </Link>
              <Link className="btn" href="/faq">
                FAQ 먼저 보기
              </Link>
            </div>
          </Reveal>
          <Parallax speed={0.12} className="cta__art">
            <DrawIn>
              <QuestionIllo />
            </DrawIn>
          </Parallax>
        </div>
      </section>
    </>
  );
}
