import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import Nav from "@/components/Nav";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import PortableBody, { slugifyHeading } from "@/components/PortableBody";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { getPost, getAuthor, type BlogAuthor } from "@/lib/blog-data";

const FALLBACK_TOC: TocItem[] = [
  { id: "intro", label: "The realism gap" },
  { id: "the-tells", label: "The tells that gave AI away" },
  { id: "what-changed", label: "What actually changed" },
  { id: "staying-real", label: "How we keep it real" },
  { id: "for-your-ads", label: "What it means for your ads" },
  { id: "conclusion", label: "Where this goes next" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post ? `${post.title} — Contego` : "Blog — Contego",
    description: post?.excerpt,
  };
}

function Avatar({ p, size = 30 }: { p: BlogAuthor; size?: number }) {
  if (p.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={p.imageUrl}
        alt={p.name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-none"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="rounded-full flex items-center justify-center font-display font-semibold text-[#07130c] flex-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(150deg, hsl(${p.tint},62%), #2c7a4d)`,
      }}
    >
      {p.initials}
    </span>
  );
}

function Verified({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block flex-none" aria-label="Verified">
      <circle cx="12" cy="12" r="11" fill="#5AE48E" />
      <path d="M7 12.4l3.2 3.2L17.2 8.6" fill="none" stroke="#07130c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Byline({ label, p, link }: { label: string; p: BlogAuthor; link?: boolean }) {
  const name = (
    <span className="text-[14px] font-semibold text-[#F4F1EA] flex items-center gap-1.5">
      {p.name}
      {p.verified && <Verified size={14} />}
    </span>
  );
  return (
    <div className="flex items-center gap-3 px-6 py-2.5 flex-1 min-w-[210px] border-t sm:border-t-0 sm:border-l border-[#F4F1EA]/8 first:border-0">
      <Avatar p={p} size={40} />
      <div className="leading-tight">
        <div className="font-mono text-[9.5px] tracking-[.12em] text-[#6B726C] mb-1">{label}</div>
        {link ? (
          <a href={`/authors/${p.slug}`} className="hover:opacity-80 transition-opacity">{name}</a>
        ) : (
          name
        )}
      </div>
    </div>
  );
}

const P = "text-[16.5px] leading-[1.78] text-[#C7CDC8] mb-4";
const H2 = "font-display font-semibold text-[26px] leading-[1.2] tracking-[-.01em] text-[#F4F1EA] mb-4";
const SEC = "scroll-mt-[100px] mb-12";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const writer = post.author ? await getAuthor(post.author) : null;
  const hasBody = !!post.body && post.body.length > 0;

  const toc: TocItem[] = hasBody
    ? (post.body as PortableTextBlock[])
        .filter((b) => b._type === "block" && b.style === "h2")
        .map((b) => ({ id: slugifyHeading(b), label: slugifyHeading(b).replace(/-/g, " ") }))
    : FALLBACK_TOC;

  return (
    <>
      <Nav />

      <article className="pt-[110px] px-[28px]">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[.08em] text-[#6B726C] mb-4">
            <span className="text-[#5AE48E]">{post.category}</span>
            {post.date && <> · {post.date}</>}
            {post.read && <> · {post.read}</>}
          </div>
          <h1 className="font-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.1] tracking-[-.02em] text-[#F4F1EA]">
            {post.title}
          </h1>
        </div>

        <div
          className="max-w-[960px] mx-auto mt-10 aspect-[16/8] rounded-[20px] border border-[#F4F1EA]/8 bg-cover bg-center"
          style={
            post.coverUrl
              ? { backgroundImage: `url(${post.coverUrl})` }
              : {
                  background: `radial-gradient(60% 60% at 28% 22%, hsla(${post.tint},55%,.30), transparent 55%), radial-gradient(80% 70% at 82% 90%, rgba(44,122,77,.4), transparent 60%), linear-gradient(150deg,#12211a,#0a0e0c)`,
                }
          }
        />

        {writer && (
          <div className="max-w-[880px] mx-auto mt-8 flex flex-col sm:flex-row rounded-[16px] border border-[#F4F1EA]/8 bg-[#0f1211]/50 py-2">
            <Byline label="WRITTEN BY" p={writer} link />
          </div>
        )}
      </article>

      <div className="max-w-[1060px] mx-auto px-[28px] mt-12 grid lg:grid-cols-[1fr_220px] gap-12 items-start">
        <div className="max-w-[720px]">
          {hasBody ? (
            <PortableBody value={post.body as PortableTextBlock[]} />
          ) : (
            <>
              <section id="intro" className={SEC}>
                <p className={P}>
                  This is a sample article. Connect Sanity and publish a post to
                  replace this placeholder with real content.
                </p>
                <p className={P}>
                  Once configured, the body renders from the Studio, and this
                  table of contents is built automatically from your headings.
                </p>
              </section>
              <section id="the-tells" className={SEC}>
                <h2 className={H2}>The tells that gave AI away</h2>
                <p className={P}>
                  Early AI UGC failed in predictable ways: plastic skin, eyes
                  that did not track, mouths out of sync with the voice.
                </p>
              </section>
              <section id="what-changed" className={SEC}>
                <h2 className={H2}>What actually changed</h2>
                <p className={P}>
                  Models improved, and the workflow around them matured. The
                  craft closes the gap.
                </p>
              </section>
            </>
          )}

          {writer && (
            <a
              href={`/authors/${writer.slug}`}
              className="card card-sheen p-7 flex gap-5 items-start hover:border-[#5AE48E]/25 transition-colors mt-4"
            >
              <Avatar p={writer} size={56} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-[18px] text-[#F4F1EA]">{writer.name}</span>
                  {writer.verified && <Verified />}
                </div>
                {writer.role && (
                  <div className="font-mono text-[11px] tracking-[.06em] text-[#5AE48E] mt-0.5 mb-2">
                    {writer.role.toUpperCase()}
                  </div>
                )}
                {writer.bio && <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">{writer.bio}</p>}
              </div>
            </a>
          )}
        </div>

        <aside className="hidden lg:block">
          {toc.length > 0 && (
            <div className="sticky top-[100px]">
              <ArticleToc items={toc} />
            </div>
          )}
        </aside>
      </div>

      <div className="mt-[40px]" />
      <Claim />
      <Footer />
    </>
  );
}
