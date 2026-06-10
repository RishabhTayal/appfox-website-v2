const STRIP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * CSS-only count-up: each digit is an overflow-hidden window over a 0–9
 * strip that translates to the target digit when an ancestor gains
 * `.is-visible` (wrap in <InView> or <Reveal>). Non-digit characters
 * (%, $, ., /, ~) render statically. Server component - zero JS shipped.
 */
export function DigitRoll({ value, className = "" }: { value: string; className?: string }) {
  let digitIndex = 0;
  return (
    <span className={`till inline-flex items-baseline ${className}`}>
      {/* aria-label on a generic span is unreliable across AT; a real text
          node announces while the per-digit machinery stays aria-hidden */}
      <span className="sr-only">{value}</span>
      {value.split("").map((char, i) => {
        if (!/\d/.test(char)) {
          return (
            <span key={i} aria-hidden="true">
              {/* spaces collapse to zero width inside the flex wrapper */}
              {char === " " ? " " : char}
            </span>
          );
        }
        const d = digitIndex++;
        return (
          <span key={i} className="digit-window" aria-hidden="true">
            <span
              className="digit-strip"
              style={{ "--digit": char, "--i": d } as React.CSSProperties}
            >
              {STRIP.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
