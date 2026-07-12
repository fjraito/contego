import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparePage from "@/components/ComparePage";
import { ALTERNATIVES } from "@/lib/comparisons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = ALTERNATIVES[slug];
  return {
    title: e ? `${e.title} — Contego` : "Alternatives — Contego",
    description: e?.intro,
  };
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = ALTERNATIVES[slug];
  if (!entry) notFound();
  return <ComparePage entry={entry} />;
}
