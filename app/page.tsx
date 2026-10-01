import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Ribbon } from "@/components/Ribbon";
import { Check, GCoin, Rocket, SmileCoin, Wallet } from "@/components/Stickers";

const STEPS = [
  { tag: "회원 정보", color: "card--mint", title: "Supabase로\n로그인 만들기", body: "프로젝트를 만들고 이메일 회원가입을 켠 뒤, 접속 주소와 연결 키를 확보합니다." },
  { tag: "Claude", color: "card--lav", title: "요구사항으로\n코드 받아내기", body: "소개 · 회원가입 · 로그인 · 회원 전용 페이지를 프롬프트 하나로 정리해 전달합니다." },
  { tag: "데이터베이스", color: "card--sky", title: "내 정보 연결하고\n보안 규칙 적용", body: "받은 코드에 접속 정보를 넣고, RLS로 내 데이터는 나만 보도록 지킵니다." },
  { tag: "배포", color: "card--sun", title: "GitHub에 올리고\nVercel로 공개", body: "실제 인터넷 주소로 배포해 누구에게나 공유할 수 있는 사이트를 만듭니다." },
  { tag: "운영", color: "card--white", title: "고치면 자동으로\n다시 배포", body: "수정 → push → 자동 배포 흐름과 로그인 오류 점검 방법까지 익힙니다." },
  { tag: "FAQ", color: "card--mint", title: "궁금한 건\n바로 물어보기", body: "자주 묻는 질문을 먼저 확인하고, 회원이라면 1:1 질문을 남길 수 있어요." },
];

export default function Home() {
  return (
    <>
      <Marquee text="GSEEK 수강 신청 오픈" />
      <main className="frame">
        <section className="panel panel--sky panel--full">
          <Ribbon variant="hero" />
          <Nav current="home" />
          <div className="hero">
            <div className="wordmark-wrap">
              <h1 className="wordmark">GSEEK</h1>
              <Rocket className="s-rocket" />
              <SmileCoin className="s-smile" />
              <GCoin className="s-coin" />
              <Wallet className="s-wallet" />
            </div>
            <p className="tagline">화면을 넘어, 진짜 서비스로.</p>
            <div className="cta-row">
              <Link className="pill" href="/signup">
                지금 가입하기
              </Link>
              <Link className="pill" href="/faq">
                자주 묻는 질문
              </Link>
            </div>
          </div>
        </section>

        <section className="panel panel--gray">
          <Ribbon variant="arc" />
          <Check className="s-check" />
          <Wallet className="s-wallet2" card="#ffd731" />
          <div className="intro">
            <h2 className="display-ko">
              AI로 만들고
              <br />
              <span className="latin">GSEEK</span>으로
              <br />
              운영하기
            </h2>
            <div className="intro__side">
              <p className="lead">
                보기만 좋은 화면은 버튼을 눌러도 아무 일도 일어나지 않아요. 회원가입, 데이터베이스, 배포까지 붙여 실제로 돌아가는 홈페이지를 만듭니다.
              </p>
              <Link className="pill pill--solid" href="/signup">
                무료로 시작하기
              </Link>
            </div>
          </div>
        </section>

        <section className="panel panel--white">
          <div className="section">
            <h2 className="display-ko display-sm">
              여섯 단계로
              <br />
              완성해요
            </h2>
            <div className="cards">
              {STEPS.map((s, i) => (
                <article key={s.tag} className={`card ${s.color}`}>
                  <span className="tag">
                    {String(i + 1).padStart(2, "0")} · {s.tag}
                  </span>
                  <div>
                    <h3 style={{ whiteSpace: "pre-line" }}>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
