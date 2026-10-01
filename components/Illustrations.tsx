// 손그림 일러스트 — 흔들리는 잉크 선(#wobble 필터) 위에 살짝 어긋난 색 덩어리를 겹쳐 그립니다.
import type { ReactNode } from "react";

export const C = {
  ink: "#141413",
  clay: "#d97757",
  rust: "#b5523b",
  olive: "#788c5d",
  sky: "#6a9bcc",
  sand: "#d4a27f",
  cocoa: "#8c6a4f",
  oat: "#e8e0d2",
  ivory: "#faf9f5",
};

export function InkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* 펜 선: 큰 흔들림 → 가장자리 거칠게 → 잉크가 군데군데 비는 마른 붓 질감 */}
        {[3, 11].map((seed, i) => (
          <filter key={seed} id={i === 0 ? "wobble" : "wobble-b"} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={seed} result="n1" />
            <feDisplacementMap in="SourceGraphic" in2="n1" scale="4" xChannelSelector="R" yChannelSelector="G" result="w" />
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={1} seed={seed + 1} result="n2" />
            <feDisplacementMap in="w" in2="n2" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={seed + 2} result="n3" />
            <feColorMatrix in="n3" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 5 -1.35" result="dry" />
            <feComposite in="rough" in2="dry" operator="in" />
          </filter>
        ))}
        {/* 색 덩어리: 크게 일렁이는 가장자리 + 종이 질감 */}
        <filter id="wobble-lg" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={2} seed={9} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" result="w" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3 -0.35" result="paper" />
          <feComposite in="w" in2="paper" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

type Props = { className?: string; title?: string };

function Svg({ className, title, children, vb = "0 0 200 200" }: Props & { children: ReactNode; vb?: string }) {
  return (
    <svg className={`illo ${className ?? ""}`} viewBox={vb} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

/** 색 덩어리 (선보다 먼저, 살짝 어긋나게) */
function Blob({ d, fill, opacity = 1 }: { d: string; fill: string; opacity?: number }) {
  return <path d={d} fill={fill} opacity={opacity} filter="url(#wobble-lg)" />;
}

/** 잉크 선 묶음 */
function Ink({ children, w = 3.2 }: { children: ReactNode; w?: number }) {
  // 같은 선을 다른 흔들림으로 한 번 더 겹쳐 그어 스케치한 느낌을 냅니다.
  const style = { fill: "none", stroke: C.ink, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <>
      <g {...style} strokeWidth={w} filter="url(#wobble)">
        {children}
      </g>
      <g {...style} strokeWidth={w * 0.55} opacity={0.45} transform="translate(1.4 -1.1)" filter="url(#wobble-b)">
        {children}
      </g>
    </>
  );
}

/* ───────────── 히어로: 연필로 그린 화면이 DB · 인터넷과 이어지는 장면 ───────────── */
export function HeroIllo(p: Props) {
  return (
    <Svg {...p} vb="0 0 440 400">
      {/* 색 덩어리 */}
      <Blob d="M40 120 C70 60 230 50 290 90 C330 130 320 280 270 310 C200 345 70 330 46 280 C24 230 20 160 40 120Z" fill={C.oat} />
      <Blob d="M70 120 h200 v150 h-200z" fill={C.ivory} />
      <Blob d="M86 162 h74 v52 h-74z" fill={C.clay} />
      <Blob d="M176 166 h76 v18 h-76z" fill={C.sky} opacity={0.8} />
      <Blob d="M92 230 h50 v22 h-50z" fill={C.olive} />
      <Blob d="M318 250 c0 -16 76 -16 76 0 v70 c0 16 -76 16 -76 0z" fill={C.sky} opacity={0.85} />
      <Blob d="M330 40 a42 42 0 1 1 0 84 a42 42 0 1 1 0 -84z" fill={C.olive} opacity={0.9} />
      <Blob d="M262 300 L330 210 L348 224 L282 314 Z" fill={C.sand} />
      <Ink>
        {/* 브라우저 창 */}
        <path d="M64 116 h212 v160 h-212 z" />
        <path d="M64 142 h212" />
        <circle cx="80" cy="129" r="4" />
        <circle cx="94" cy="129" r="4" />
        <path d="M118 129 h120" strokeWidth={2} />
        <path d="M82 158 h82 v60 h-82 z" />
        <path d="M176 162 h80 M176 186 h62 M176 204 h72" />
        <rect x="88" y="232" width="62" height="24" rx="12" />
        <path d="M176 238 h60" strokeWidth={2.4} />
        {/* 지구 (배포) */}
        <circle cx="352" cy="82" r="40" />
        <path d="M312 82 h80" />
        <path d="M352 42 c-22 24 -22 56 0 80 M352 42 c22 24 22 56 0 80" />
        {/* DB */}
        <ellipse cx="356" cy="250" rx="38" ry="12" />
        <path d="M318 250 v70 c0 16 76 16 76 0 v-70" />
        <path d="M318 284 c0 16 76 16 76 0" />
        {/* 연결 점선 */}
        <path d="M280 150 C300 130 304 118 314 108" strokeDasharray="2 10" strokeWidth={3.6} />
        <path d="M282 226 C300 236 306 240 316 246" strokeDasharray="2 10" strokeWidth={3.6} />
        {/* 연필 */}
        <path d="M268 306 L332 214 L352 228 L288 320 L262 330 Z" />
        <path d="M326 222 L346 236" />
        <path d="M268 306 L288 320" />
        {/* 반짝임 */}
        <path d="M40 70 v22 M29 81 h22" strokeWidth={2.6} />
        <path d="M410 170 v16 M402 178 h16" strokeWidth={2.4} />
      </Ink>
    </Svg>
  );
}

/* ───────────── 작은 아이콘들 (200×200) ───────────── */
export function KeyIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M50 70 c20 -30 70 -30 84 4 c12 30 -12 64 -46 62 c-30 -2 -52 -36 -38 -66z" fill={C.clay} />
      <Blob d="M120 108 h50 v22 h-50z" fill={C.sand} />
      <Ink>
        <circle cx="84" cy="96" r="38" />
        <circle cx="84" cy="96" r="12" />
        <path d="M120 106 h56 M150 106 v18 M166 106 v24" />
      </Ink>
    </Svg>
  );
}

export function DatabaseIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M54 56 c0 -20 92 -20 92 0 v92 c0 20 -92 20 -92 0z" fill={C.sky} opacity={0.85} />
      <Blob d="M118 110 c18 -4 40 6 40 26 s-24 30 -40 22 s-18 -44 0 -48z" fill={C.olive} />
      <Ink>
        <ellipse cx="100" cy="50" rx="46" ry="14" />
        <path d="M54 50 v100 c0 18 92 18 92 0 v-100" />
        <path d="M54 84 c0 18 92 18 92 0" />
        <path d="M54 118 c0 18 92 18 92 0" />
        <circle cx="74" cy="76" r="2.5" fill={C.ink} />
        <circle cx="74" cy="110" r="2.5" fill={C.ink} />
      </Ink>
    </Svg>
  );
}

export function LockIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M48 92 h104 v72 h-104z" fill={C.olive} />
      <Blob d="M128 50 c16 -6 30 8 26 22 c-4 12 -22 14 -30 4 c-6 -8 -4 -22 4 -26z" fill={C.clay} />
      <Ink>
        <path d="M66 92 v-24 a34 34 0 0 1 68 0 v24" />
        <rect x="46" y="92" width="108" height="76" rx="10" />
        <circle cx="100" cy="122" r="9" />
        <path d="M100 131 v18" />
      </Ink>
    </Svg>
  );
}

export function PlaneIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M30 100 L170 40 L120 160 L96 116 Z" fill={C.sand} />
      <Blob d="M40 150 c20 -10 40 -6 50 6 c-14 8 -34 8 -50 -6z" fill={C.sky} opacity={0.7} />
      <Ink>
        <path d="M24 98 L176 34 L124 166 L98 118 Z" />
        <path d="M98 118 L176 34" />
        <path d="M98 118 L96 150 L112 136" />
        <path d="M30 140 c14 -6 28 -6 40 2" strokeDasharray="6 8" strokeWidth={2.4} />
      </Ink>
    </Svg>
  );
}

export function LoopIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M44 100 a56 56 0 0 1 112 0 a56 56 0 0 1 -112 0z" fill={C.oat} />
      <Blob d="M120 52 c18 0 30 16 24 30 s-30 10 -32 -6 s-4 -24 8 -24z" fill={C.rust} opacity={0.9} />
      <Ink>
        <path d="M52 96 a50 50 0 0 1 90 -28" />
        <path d="M142 48 v22 h-22" />
        <path d="M148 104 a50 50 0 0 1 -90 28" />
        <path d="M58 152 v-22 h22" />
        <path d="M88 96 l10 10 l18 -20" />
      </Ink>
    </Svg>
  );
}

export function PencilIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M40 44 h96 v116 h-96z" fill={C.ivory} />
      <Blob d="M118 120 L160 62 L176 74 L134 132 Z" fill={C.clay} />
      <Blob d="M54 70 h50 v10 h-50z" fill={C.sky} opacity={0.6} />
      <Ink>
        <path d="M40 40 h96 v124 h-96 z" />
        <path d="M54 66 h56 M54 86 h64 M54 106 h40" />
        <path d="M120 128 L164 66 L180 78 L136 140 L116 146 Z" />
        <path d="M158 74 L174 86" />
      </Ink>
    </Svg>
  );
}

export function QuestionIllo(p: Props) {
  return (
    <Svg {...p}>
      <Blob d="M30 50 c0 -16 10 -24 26 -24 h92 c16 0 24 8 24 24 v60 c0 16 -8 24 -24 24 h-56 l-34 30 v-30 h-4 c-16 0 -24 -8 -24 -24z" fill={C.clay} />
      <Blob d="M140 130 c16 -4 30 8 28 22 c-2 12 -20 16 -30 8 c-8 -8 -8 -26 2 -30z" fill={C.olive} />
      <Ink>
        <path d="M36 44 c0 -14 8 -22 22 -22 h90 c14 0 22 8 22 22 v62 c0 14 -8 22 -22 22 h-56 l-34 30 v-30 h-0 c-14 0 -22 -8 -22 -22z" />
        <path d="M88 62 c0 -14 26 -16 28 0 c2 12 -14 14 -14 28" />
        <circle cx="102" cy="104" r="3" fill={C.ink} />
      </Ink>
    </Svg>
  );
}

export function WindowIllo({ alive, ...p }: Props & { alive?: boolean }) {
  return (
    <Svg {...p} vb="0 0 240 180">
      <Blob d="M24 28 h192 v130 h-192z" fill={alive ? C.oat : C.ivory} />
      {alive && <Blob d="M44 70 h60 v60 h-60z" fill={C.olive} />}
      {alive && <Blob d="M124 70 h76 v20 h-76z" fill={C.sky} opacity={0.8} />}
      <Blob d="M150 118 c14 -4 32 4 32 18 s-18 20 -30 14 s-14 -28 -2 -32z" fill={alive ? C.clay : C.oat} />
      <Ink>
        <path d="M20 24 h200 v136 h-200 z" />
        <path d="M20 48 h200" />
        <circle cx="34" cy="36" r="3.5" />
        <circle cx="46" cy="36" r="3.5" />
        <path d="M40 66 h68 v68 h-68 z" />
        <path d="M124 70 h80 M124 94 h60 M124 112 h70" />
        <rect x="124" y="126" width="56" height="20" rx="10" />
        {alive ? (
          <>
            <circle cx="74" cy="92" r="11" />
            <path d="M54 130 c4 -16 36 -16 40 0" />
          </>
        ) : (
          <>
            <path d="M60 86 l28 28 M88 86 l-28 28" strokeWidth={2.4} />
          </>
        )}
      </Ink>
    </Svg>
  );
}

/* 손글씨 밑줄 / 화살표 / 동그라미 */
export function Scribble({ className, color = C.clay }: { className?: string; color?: string }) {
  return (
    <svg className={`scribble ${className ?? ""}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C60 6 120 6 180 12 S270 18 296 8" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" filter="url(#wobble)" />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={`arrow ${className ?? ""}`} viewBox="0 0 120 80" aria-hidden="true">
      <g fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" filter="url(#wobble)">
        <path d="M8 60 C30 20 70 10 104 30" />
        <path d="M88 18 L106 30 L90 44" />
      </g>
    </svg>
  );
}

export function Mark({ className }: { className?: string }) {
  // GSEEK 로고: 손으로 그린 원 안의 G
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill={C.clay} filter="url(#wobble)" />
      <g fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" filter="url(#wobble)">
        <path d="M31 17 a10 10 0 1 0 1 12 h-8" />
      </g>
    </svg>
  );
}
