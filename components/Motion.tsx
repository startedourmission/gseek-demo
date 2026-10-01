"use client";

// 스크롤 연출 도구 모음 — 라이브러리 없이 IntersectionObserver와 scroll 이벤트만 사용합니다.
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 화면에 들어오면 .in 클래스를 붙여 CSS로 나타나게 합니다. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "p" | "h2" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return el.classList.add("in");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("in");
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** 안에 있는 잉크 선(SVG)을 화면에 들어올 때 손으로 긋듯 그려줍니다. */
export function DrawIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const shapes = Array.from(el.querySelectorAll<SVGGeometryElement>("g[stroke] > :is(path, circle, ellipse, rect)"));
    const blobs = Array.from(el.querySelectorAll<SVGElement>("svg > path[fill]:not([fill='none'])"));
    shapes.forEach((s) => {
      if (s.getAttribute("stroke-dasharray") || s.closest("g")?.getAttribute("stroke-dasharray")) {
        s.style.opacity = "0";
        return;
      }
      const len = s.getTotalLength();
      s.style.strokeDasharray = `${len}`;
      s.style.strokeDashoffset = `${len}`;
    });
    blobs.forEach((b) => {
      b.style.opacity = "0";
      b.style.transform = "scale(.9)";
      b.style.transformBox = "fill-box";
      b.style.transformOrigin = "center";
    });

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      blobs.forEach((b, i) => {
        b.style.transition = `opacity .6s ease ${delay + i * 60}ms, transform .8s cubic-bezier(.2,.8,.2,1) ${delay + i * 60}ms`;
        b.style.opacity = "";
        b.style.transform = "";
      });
      shapes.forEach((s, i) => {
        const t = delay + 200 + (i % 24) * 55;
        s.style.transition = `stroke-dashoffset .9s cubic-bezier(.6,.1,.3,1) ${t}ms, opacity .5s ease ${t}ms`;
        s.style.strokeDashoffset = "0";
        s.style.opacity = "";
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * 높이가 큰 섹션 안에서 내용을 화면에 고정(sticky)하고,
 * 섹션을 지나가는 정도(0 → 1)를 CSS 변수 --p 로 넘겨줍니다.
 */
export function ScrollScene({ children, className = "", height = 300 }: { children: ReactNode; className?: string; height?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      el.dataset.stage = String(Math.min(9, Math.floor(p * 10)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={ref} className={`scene ${className}`} style={{ "--h": `${height}vh` } as CSSProperties}>
      <div className="scene__sticky">{children}</div>
    </section>
  );
}

/** 가로로 흐르는 트랙: 섹션 진행도에 맞춰 트랙 전체 너비만큼 왼쪽으로 이동 */
export function HorizontalTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const set = () => track.style.setProperty("--travel", `${Math.max(0, track.scrollWidth - track.clientWidth)}px`);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return (
    <div className="htrack" ref={ref}>
      <div className="htrack__inner">{children}</div>
    </div>
  );
}

/** 요소의 화면 내 위치에 따라 살짝 위아래로 움직이는 시차 효과 (--speed 배율) */
export function Parallax({ children, speed = 0.15, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/** 스크롤 진행에 따라 단어가 하나씩 진하게 채워지는 문장 (*단어* 는 강조색) */
export function WordFill({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="wordfill">
      {words.map((w, i) => {
        const accent = w.startsWith("*") && w.endsWith("*");
        return (
          <span key={i} className={accent ? "accent" : undefined} style={{ "--i": i / words.length } as CSSProperties}>
            {accent ? w.slice(1, -1) : w}{" "}
          </span>
        );
      })}
    </p>
  );
}
