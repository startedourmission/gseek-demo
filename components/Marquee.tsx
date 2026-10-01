export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 20 }, (_, i) => <span key={i}>{text}</span>);
  return (
    <div className="marquee" aria-label={text}>
      <div className="marquee__track">{items}</div>
    </div>
  );
}
