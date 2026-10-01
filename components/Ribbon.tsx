// 3D 느낌의 파란 튜브 리본 — 같은 경로를 여러 겹(그림자 · 본체 · 하이라이트)으로 쌓아 입체감을 냅니다.

export function RibbonDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="grain" filterUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1800">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves={2} seed={7} result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -4 1.9"
            result="speckle"
          />
          <feComposite in="speckle" in2="SourceGraphic" operator="in" result="dots" />
          <feFlood floodColor="#0a4cb0" floodOpacity="0.35" />
          <feComposite in2="dots" operator="in" result="darkdots" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="darkdots" />
          </feMerge>
        </filter>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="soft-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
    </svg>
  );
}

function Tube({ d, width = 240 }: { d: string; width?: number }) {
  const common = { d, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <>
      <path {...common} stroke="#1c6fe0" strokeWidth={width + 10} transform="translate(10 16)" filter="url(#soft-sm)" opacity={0.55} />
      <path {...common} stroke="#2f86f5" strokeWidth={width} />
      <path {...common} stroke="#4da2ff" strokeWidth={width * 0.78} transform="translate(-10 -12)" filter="url(#soft)" />
      <path {...common} stroke="#8ec5ff" strokeWidth={width * 0.24} transform="translate(-30 -42)" filter="url(#soft)" opacity={0.75} />
    </>
  );
}

const PATHS = {
  hero: [
    { d: "M 980 -80 C 820 60, 420 220, 250 360 C 60 520, 120 760, 420 760 C 760 760, 1000 520, 1240 470 C 1480 420, 1560 640, 1450 860 C 1380 1000, 1260 1080, 1180 1120", w: 240 },
    { d: "M 1180 -60 C 1080 120, 1160 260, 1320 340 C 1480 420, 1640 380, 1700 300", w: 200 },
    { d: "M 200 1060 C 260 1000, 400 1000, 460 1080", w: 200 },
  ],
  arc: [{ d: "M -120 360 C 200 40, 700 -40, 1000 120 C 1250 250, 1420 180, 1720 20", w: 220 }],
  corner: [{ d: "M 1700 520 C 1400 420, 1300 140, 1460 -120", w: 220 }],
  loop: [{ d: "M -140 760 C 200 900, 420 640, 300 460 C 180 280, 520 120, 760 260 C 980 390, 1260 120, 1740 260", w: 200 }],
};

export function Ribbon({ variant }: { variant: keyof typeof PATHS }) {
  return (
    <svg className="ribbon" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g filter="url(#grain)">
        {PATHS[variant].map((p) => (
          <Tube key={p.d} d={p.d} width={p.w} />
        ))}
      </g>
    </svg>
  );
}
