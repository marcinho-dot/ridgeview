"use client";

import { Fragment } from "react";
import { basePath } from "@/lib/basePath";
import type { ArticleBlock, SideBySideContent } from "@/data/articles";

/**
 * Parse markdown link syntax [label](href) within plain text and emit
 * React elements with proper <a> tags. External links (http(s)://) open
 * in a new tab; same-origin links use basePath.
 */
function renderInlineLinks(text: string) {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const out: (string | React.ReactNode)[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) {
      out.push(text.slice(lastIdx, m.index));
    }
    const label = m[1];
    const href = m[2];
    const isExternal = /^https?:\/\//.test(href);
    out.push(
      isExternal ? (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C8A96E] underline decoration-[#C8A96E]/40 underline-offset-4 hover:decoration-[#C8A96E] transition-colors"
        >
          {label}
        </a>
      ) : (
        <a
          key={key++}
          href={`${basePath}${href}`}
          className="text-[#C8A96E] underline decoration-[#C8A96E]/40 underline-offset-4 hover:decoration-[#C8A96E] transition-colors"
        >
          {label}
        </a>
      ),
    );
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) {
    out.push(text.slice(lastIdx));
  }
  return out.length === 1 && typeof out[0] === "string" ? out[0] : (
    <Fragment>{out.map((p, i) => (typeof p === "string" ? <Fragment key={i}>{p}</Fragment> : p))}</Fragment>
  );
}

/**
 * Renders a structured ArticleBlock[] (defined in src/data/articles.ts)
 * into an editorial-luxury layout matching the Ridgeview design system.
 *
 * Supported block types:
 *   paragraph · heading · image · quote · list · sideBySide
 *
 * Used on /beyond-the-bottle/<slug>/ detail pages. When an article's
 * body is empty/undefined, the parent page renders a "coming soon"
 * stub instead of calling this.
 */

interface Props {
  blocks: ArticleBlock[];
}

/**
 * Render one of the simple block types (paragraph/heading/list/quote)
 * inside the text column of a side-by-side. Shared via this helper so
 * the visual treatment matches the full-width body.
 */
function renderContentBlock(block: SideBySideContent, key: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={key}
          className="font-body text-white/75 leading-[1.85] mb-6"
          style={{ fontSize: "clamp(15px, 1.2vw, 17px)", fontWeight: 300 }}
        >
          {renderInlineLinks(block.text)}
        </p>
      );
    case "heading": {
      const sizeClass =
        block.level === 2
          ? "text-[clamp(24px,2.6vw,36px)] mb-5 mt-2"
          : "text-[clamp(20px,2.2vw,28px)] mb-4 mt-2";
      const Tag = block.level === 2 ? "h2" : "h3";
      return (
        <Tag
          key={key}
          className={`font-display italic text-cream leading-[1.2] ${sizeClass}`}
          style={{ fontWeight: 400 }}
        >
          {block.text}
        </Tag>
      );
    }
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          key={key}
          className={`mb-6 space-y-2 ${
            block.ordered ? "list-decimal pl-6" : "pl-0"
          }`}
        >
          {block.items.map((item, j) => (
            <li
              key={j}
              className={`font-body text-white/75 leading-[1.75] ${
                block.ordered ? "" : "flex items-start gap-3"
              }`}
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 300 }}
            >
              {!block.ordered && (
                <span
                  aria-hidden
                  className="text-[#C8A96E]/70 flex-shrink-0 mt-1"
                  style={{ fontSize: "11px" }}
                >
                  ◆
                </span>
              )}
              <span className={block.ordered ? "" : "flex-1"}>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote
          key={key}
          className="relative my-6 pl-6 border-l-2 border-[#C8A96E]/40"
        >
          <p
            className="font-display italic text-cream leading-[1.4]"
            style={{ fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 400 }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <p
              className="font-body text-[#C8A96E]/85 uppercase tracking-[0.22em] mt-3"
              style={{ fontSize: "10px" }}
            >
              - {block.attribution}
            </p>
          )}
        </blockquote>
      );
    case "image": {
      const imgEl = (
        <div className="relative aspect-[3/2] overflow-hidden bg-[#0a0a0a] rounded-sm group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${block.src}`}
            alt={block.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      );
      const wrapped = block.href ? (
        <a
          href={`${basePath}${block.href}`}
          aria-label={block.alt || "View product"}
          className="block"
        >
          {imgEl}
        </a>
      ) : (
        imgEl
      );
      return (
        <figure key={key} className="my-6">
          {wrapped}
          {block.caption && (
            <figcaption
              className="font-body italic text-white/45 mt-3 text-center"
              style={{ fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 300 }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

export function ArticleBodyRenderer({ blocks }: Props) {
  return (
    <div className="max-w-[1320px] mx-auto px-6 md:px-0">
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
                {renderInlineLinks(block.text)}
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

          case "image": {
            const imgEl = (
              <div className="relative aspect-[3/2] overflow-hidden bg-[#0a0a0a] rounded-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${block.src}`}
                  alt={block.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            );
            const wrapped = block.href ? (
              <a
                href={`${basePath}${block.href}`}
                aria-label={block.alt || "View product"}
                className="block"
              >
                {imgEl}
              </a>
            ) : (
              imgEl
            );
            return (
              <figure key={i} className="my-10 md:my-12 -mx-6 md:-mx-12">
                {wrapped}
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
          }

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
                    - {block.attribution}
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

          case "sideBySide": {
            // Image column stretches to match the height of the text column
            // (items-stretch + h-full on the image), so the photo doesn't
            // tower above a short intro paragraph the way it did with a
            // fixed aspect ratio.
            const imgEl = (
              <div className="relative w-full h-full min-h-[320px] md:min-h-[520px] overflow-hidden bg-[#0a0a0a] rounded-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${block.image.src}`}
                  alt={block.image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            );
            const wrappedImg = block.image.href ? (
              <a
                href={`${basePath}${block.image.href}`}
                aria-label={block.image.alt || "View product"}
                className="block h-full"
              >
                {imgEl}
              </a>
            ) : (
              imgEl
            );
            const imageOnLeft = block.imageSide === "left";
            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch mt-8 mb-10 first:mt-2 md:my-20 md:first:mt-20"
              >
                {/* Mobile: image-on-top, text-below (DOM order).
                    Desktop: md:order flips left/right per imageSide. */}
                <div className={imageOnLeft ? "md:order-1" : "md:order-2"}>
                  {wrappedImg}
                </div>
                <div
                  className={`flex flex-col justify-center ${
                    imageOnLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {block.content.map((c, j) => renderContentBlock(c, j))}
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
