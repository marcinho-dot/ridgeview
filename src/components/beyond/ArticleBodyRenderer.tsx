"use client";

import { basePath } from "@/lib/basePath";
import type { ArticleBlock } from "@/data/articles";

/**
 * Renders a structured ArticleBlock[] (defined in src/data/articles.ts)
 * into an editorial-luxury layout matching the Ridgeview design system.
 *
 * Supported block types:
 *   paragraph · heading · image · quote · list
 *
 * Used on /beyond-the-bottle/<slug>/ detail pages. When an article's
 * body is empty/undefined, the parent page renders a "coming soon"
 * stub instead of calling this.
 */

interface Props {
  blocks: ArticleBlock[];
}

export function ArticleBodyRenderer({ blocks }: Props) {
  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-0">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="font-body text-white/75 leading-[1.85] mb-7"
                style={{
                  fontSize: "clamp(15px, 1.25vw, 17px)",
                  fontWeight: 300,
                }}
              >
                {block.text}
              </p>
            );

          case "heading": {
            const sizeClass =
              block.level === 2
                ? "text-[clamp(26px,3vw,40px)] mb-5 mt-12"
                : "text-[clamp(22px,2.4vw,30px)] mb-4 mt-10";
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={i}
                className={`font-display italic text-cream leading-[1.2] ${sizeClass}`}
                style={{ fontWeight: 400 }}
              >
                {block.text}
              </Tag>
            );
          }

          case "image":
            return (
              <figure key={i} className="my-10 md:my-12 -mx-6 md:-mx-12">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#0a0a0a] rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${block.src}`}
                    alt={block.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption
                    className="font-body italic text-white/45 mt-3 text-center"
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      fontWeight: 300,
                    }}
                  >
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="relative my-10 md:my-12 pl-6 md:pl-8 border-l-2 border-[#C8A96E]/40"
              >
                <p
                  className="font-display italic text-cream leading-[1.4]"
                  style={{
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.attribution && (
                  <p
                    className="font-body text-[#C8A96E]/85 uppercase tracking-[0.22em] mt-4"
                    style={{ fontSize: "10px" }}
                  >
                    — {block.attribution}
                  </p>
                )}
              </blockquote>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={`mb-7 space-y-3 ${
                  block.ordered ? "list-decimal pl-6" : "pl-0"
                }`}
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className={`font-body text-white/75 leading-[1.75] ${
                      block.ordered ? "" : "flex items-start gap-3"
                    }`}
                    style={{
                      fontSize: "clamp(15px, 1.25vw, 17px)",
                      fontWeight: 300,
                    }}
                  >
                    {!block.ordered && (
                      <span
                        aria-hidden
                        className="text-[#C8A96E]/70 flex-shrink-0 mt-1"
                        style={{ fontSize: "12px" }}
                      >
                        ◆
                      </span>
                    )}
                    <span className={block.ordered ? "" : "flex-1"}>
                      {item}
                    </span>
                  </li>
                ))}
              </Tag>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
