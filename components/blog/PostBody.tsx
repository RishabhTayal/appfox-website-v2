import type { PostBlock } from "@/data/posts";

/**
 * Renders a post's structured blocks into the design-system's editorial
 * typography. Plain-string content only (no inline links/JSX) so the same
 * data can feed JSON-LD without escaping surprises.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-14 first:mt-0 max-w-[34ch] text-[1.75rem]">
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
                    <span aria-hidden="true" className="till mt-px shrink-0 text-marigold-700">
                      —
                    </span>
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
                    <span aria-hidden="true" className="till mt-px shrink-0 text-marigold-700">
                      {j + 1}.
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
                className="font-display mt-10 border-l-2 border-marigold-500 pl-5 text-[1.375rem] leading-snug text-ink-900 italic"
              >
                {block.text}
              </blockquote>
            );
          case "p":
          default:
            return (
              <p key={i} className="mt-6 first:mt-0 text-lg leading-relaxed text-ink-700">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
