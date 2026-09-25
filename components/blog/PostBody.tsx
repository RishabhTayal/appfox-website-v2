import type { PostBlock } from "@/data/posts";

/**
 * Renders a post's structured blocks into the design-system's editorial
 * typography. Plain-string content only (no inline links/JSX) so the same
 * data can feed JSON-LD without escaping surprises.
 */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="post-body max-w-[68ch]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={headingId(block.text)} className="scroll-mt-28 mt-16 first:mt-0 max-w-[34ch] text-[1.875rem] tracking-tight">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-10 first:mt-0">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7em] h-[7px] w-[7px] shrink-0 rotate-45 rounded-[2px] bg-fox" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 font-mono text-[0.6875rem] text-white">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="font-display relative mt-10 rounded-none bg-[#fff1e6] px-6 py-5 text-[1.375rem] leading-snug font-light text-ink-900 before:absolute before:top-5 before:bottom-5 before:left-0 before:w-1 before:rounded-full before:bg-fox"
              >
                {block.text}
              </blockquote>
            );
          case "p":
          default:
            return (
              <p key={i} className="mt-6 first:mt-0 text-[1.125rem] leading-[1.75] text-ink-700">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
