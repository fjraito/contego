import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./sanity/client";
import { hasSanity } from "@/sanity/env";
import { POSTS as PH_POSTS, AUTHORS as PH_AUTHORS, type Author as PhAuthor } from "./content";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  tint: string;
  author: string;
  coverUrl?: string | null;
  body?: PortableTextBlock[] | null;
};

export type BlogAuthor = Omit<PhAuthor, "initials"> & {
  initials: string;
  imageUrl?: string | null;
};

const fmtDate = (s?: string) =>
  s
    ? new Date(s).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ---- list of posts ---- */
export async function getPosts(): Promise<BlogPost[]> {
  if (hasSanity && client) {
    const rows = await client.fetch<
      Array<Omit<BlogPost, "date" | "read" | "tint"> & { publishedAt?: string; readTime?: string }>
    >(
      `*[_type=="post" && defined(slug.current)]|order(publishedAt desc){
        "slug": slug.current, title, excerpt, category, publishedAt, readTime,
        "coverUrl": coverImage.asset->url, "author": author->slug.current
      }`
    );
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category || "Blog",
      date: fmtDate(r.publishedAt),
      read: r.readTime || "",
      tint: "150,80%",
      author: r.author || "",
      coverUrl: r.coverUrl ?? null,
    }));
  }
  return PH_POSTS.map((p) => ({ ...p, coverUrl: null, body: null }));
}

/* ---- single post ---- */
export async function getPost(slug: string): Promise<BlogPost | null> {
  if (hasSanity && client) {
    const r = await client.fetch<
      | (Omit<BlogPost, "date" | "read" | "tint"> & { publishedAt?: string; readTime?: string })
      | null
    >(
      `*[_type=="post" && slug.current==$slug][0]{
        "slug": slug.current, title, excerpt, category, publishedAt, readTime,
        "coverUrl": coverImage.asset->url, "author": author->slug.current, body
      }`,
      { slug }
    );
    if (!r) return null;
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category || "Blog",
      date: fmtDate(r.publishedAt),
      read: r.readTime || "",
      tint: "150,80%",
      author: r.author || "",
      coverUrl: r.coverUrl ?? null,
      body: r.body ?? null,
    };
  }
  const p = PH_POSTS.find((x) => x.slug === slug);
  return p ? { ...p, coverUrl: null, body: null } : null;
}

/* ---- author ---- */
export async function getAuthor(slug: string): Promise<BlogAuthor | null> {
  if (hasSanity && client) {
    const a = await client.fetch<Record<string, unknown> | null>(
      `*[_type=="author" && slug.current==$slug][0]{
        "slug": slug.current, name, role, org, location, verified, bio, background,
        tags, expertise,
        "experience": experience[]{role, org, period},
        "education": education[]{degree, school},
        "links": links[]{label, href},
        "imageUrl": image.asset->url
      }`,
      { slug }
    );
    if (!a) return null;
    const name = (a.name as string) || "Author";
    return {
      slug: a.slug as string,
      name,
      role: (a.role as string) || "",
      org: a.org as string,
      location: a.location as string,
      verified: (a.verified as boolean) ?? true,
      bio: (a.bio as string) || "",
      background: a.background as string,
      tags: a.tags as string[],
      expertise: a.expertise as string[],
      experience: a.experience as { role: string; org: string; period: string }[],
      education: a.education as { degree: string; school: string }[],
      links: a.links as { label: string; href: string }[],
      tint: "150,80%",
      initials: initialsOf(name),
      imageUrl: (a.imageUrl as string) ?? null,
    };
  }
  const a = PH_AUTHORS[slug];
  return a ? { ...a, imageUrl: null } : null;
}

/* ---- posts by author ---- */
export async function getPostsByAuthor(slug: string): Promise<BlogPost[]> {
  const all = await getPosts();
  return all.filter((p) => p.author === slug);
}

/* ---- static params helper ---- */
export async function getAllPostSlugs(): Promise<string[]> {
  const all = await getPosts();
  return all.map((p) => p.slug);
}
