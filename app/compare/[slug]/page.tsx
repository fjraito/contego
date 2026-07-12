import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparePage from "@/components/ComparePage";
import { TOOLS } from "@/lib/comparisons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = TOOLS[slug];
  return {
    title: e ? `${e.title} — Contego` : "Compare — Contego",
    description: e?.intro,
  };
}

export default async function ToolComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = TOOLS[slug];
  if (!entry) notFound();
  return <ComparePage entry={entry} />;
}
