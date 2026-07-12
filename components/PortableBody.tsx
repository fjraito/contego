import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/sanity/image";

export function slugifyHeading(block: PortableTextBlock): string {
  const spans = (block.children ?? []) as Array<{ text?: string }>;
  const text = spans.map((c) => c.text || "").join("");
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16.5px] leading-[1.78] text-[#C7CDC8] mb-4">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={slugifyHeading(value as PortableTextBlock)}
        className="scroll-mt-[100px] font-display font-semibold text-[26px] leading-[1.2] tracking-[-.01em] text-[#F4F1EA] mt-10 mb-4"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-semibold text-[20px] text-[#F4F1EA] mt-7 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#5AE48E]/50 pl-5 my-6 text-[17px] leading-[1.7] text-[#AEB5AF] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 flex flex-col gap-2 text-[16px] leading-[1.7] text-[#C7CDC8] marker:text-[#5AE48E]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 flex flex-col gap-2 text-[16px] leading-[1.7] text-[#C7CDC8] marker:text-[#8A918B]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-[#F4F1EA] font-semibold">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} rel="nofollow noopener noreferrer" className="text-[#5AE48E] underline underline-offset-2">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value);
      if (!url) return null;
      return (
        <span className="block my-8 rounded-[14px] overflow-hidden border border-[#F4F1EA]/8">
          <Image src={url} alt={value?.alt || ""} width={1000} height={560} className="w-full h-auto block" />
        </span>
      );
    },
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
