// 검은 외곽선의 손으로 오린 듯한 스티커들
type Props = { className?: string };
const g = { stroke: "#000", strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function Rocket({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 200 220" aria-hidden="true">
      <g {...g}>
        <path d="M58 118 L22 150 L40 188 L74 150 Z" fill="#fb4903" />
        <path d="M142 118 L178 150 L160 188 L126 150 Z" fill="#fb4903" />
        <path d="M86 168 Q100 206 114 168 Z" fill="#e9ccff" />
        <path d="M100 12 C150 44 158 110 138 168 L62 168 C42 110 50 44 100 12 Z" fill="#fff" />
        <path d="M100 12 C122 26 136 46 144 70 L56 70 C64 46 78 26 100 12 Z" fill="#fb4903" />
        <circle cx="100" cy="102" r="20" fill="#4da2ff" />
        <path d="M92 94 q6 -6 14 -2" fill="none" stroke="#fff" strokeWidth={4} />
        <path d="M84 168 L116 168 L110 180 L90 180 Z" fill="#ccc" />
      </g>
    </svg>
  );
}

export function SmileCoin({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 200 180" aria-hidden="true">
      <g {...g}>
        <ellipse cx="104" cy="104" rx="84" ry="66" fill="#e0b400" />
        <ellipse cx="98" cy="88" rx="84" ry="66" fill="#ffd731" />
        <ellipse cx="80" cy="70" rx="16" ry="18" fill="#fff" />
        <ellipse cx="112" cy="66" rx="16" ry="18" fill="#fff" />
        <circle cx="86" cy="72" r="8" fill="#000" stroke="none" />
        <circle cx="118" cy="68" r="8" fill="#000" stroke="none" />
        <path d="M50 104 Q98 150 152 96" fill="none" />
      </g>
    </svg>
  );
}

export function GCoin({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 200 200" aria-hidden="true">
      <g {...g}>
        <ellipse cx="104" cy="112" rx="80" ry="72" fill="#2fb97a" />
        <ellipse cx="98" cy="100" rx="80" ry="72" fill="#55db9c" />
        <ellipse cx="98" cy="100" rx="58" ry="52" fill="#55db9c" />
        <text x="98" y="128" textAnchor="middle" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="82" fill="#000" stroke="none">
          G
        </text>
        <path d="M22 50 l10 6 -6 10 10 -4 4 10 2 -12 12 -2 -12 -4 2 -12 -8 8 z" fill="#fff" />
        <path d="M170 152 l8 6 -6 8 10 -2 4 10 2 -10 10 -2 -10 -4 2 -10 -8 6 z" fill="#fff" />
      </g>
    </svg>
  );
}

export function Wallet({ className, card = "#55db9c" }: Props & { card?: string }) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 220 180" aria-hidden="true">
      <g {...g}>
        <path d="M44 46 L150 18 L166 58 L60 86 Z" fill="#fff" />
        <path d="M56 54 L162 30 L172 62 L66 88 Z" fill={card} />
        <rect x="24" y="56" width="176" height="110" rx="22" fill="#3f30b8" />
        <rect x="18" y="48" width="176" height="110" rx="22" fill="#5c4ade" />
        <rect x="150" y="84" width="54" height="40" rx="14" fill="#5c4ade" />
        <circle cx="170" cy="104" r="6" fill="#000" stroke="none" />
      </g>
    </svg>
  );
}

export function Check({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 160 160" aria-hidden="true">
      <g {...g}>
        <rect x="16" y="20" width="128" height="128" rx="30" fill="#2fb97a" />
        <rect x="10" y="12" width="128" height="128" rx="30" fill="#55db9c" />
        <path d="M40 78 L64 102 L110 52" fill="none" strokeWidth={14} />
      </g>
    </svg>
  );
}

export function QBubble({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 180 170" aria-hidden="true">
      <g {...g}>
        <path d="M30 20 h120 a22 22 0 0 1 22 22 v64 a22 22 0 0 1 -22 22 h-62 l-34 30 v-30 h-24 a22 22 0 0 1 -22 -22 v-64 a22 22 0 0 1 22 -22z" fill="#d43a00" transform="translate(6 8)" />
        <path d="M30 20 h120 a22 22 0 0 1 22 22 v64 a22 22 0 0 1 -22 22 h-62 l-34 30 v-30 h-24 a22 22 0 0 1 -22 -22 v-64 a22 22 0 0 1 22 -22z" fill="#fb4903" />
        <text x="90" y="104" textAnchor="middle" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="76" fill="#fff" stroke="none">
          ?
        </text>
      </g>
    </svg>
  );
}

export function Lock({ className }: Props) {
  return (
    <svg className={`sticker ${className ?? ""}`} viewBox="0 0 160 180" aria-hidden="true">
      <g {...g}>
        <path d="M44 78 v-24 a36 36 0 0 1 72 0 v24" fill="none" strokeWidth={14} stroke="#000" />
        <path d="M44 78 v-24 a36 36 0 0 1 72 0 v24" fill="none" strokeWidth={6} stroke="#e9e9e9" />
        <rect x="26" y="82" width="116" height="86" rx="22" fill="#e0b400" />
        <rect x="20" y="74" width="116" height="86" rx="22" fill="#ffd731" />
        <circle cx="78" cy="110" r="11" fill="#000" stroke="none" />
        <path d="M78 114 v20" strokeWidth={9} />
      </g>
    </svg>
  );
}
