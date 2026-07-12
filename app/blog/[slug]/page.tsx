import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { AUTHORS, getPost, POSTS, type Author } from "@/lib/content";

const TOC: TocItem[] = [
  { id: "intro", label: "The realism gap" },
  { id: "the-tells", label: "The tells that gave AI away" },
  { id: "what-changed", label: "What actually changed" },
  { id: "staying-real", label: "How we keep it real" },
  { id: "for-your-ads", label: "What it means for your ads" },
  { id: "conclusion", label: "Where this goes next" },
];

const resolve = (slug: string) => getPost(slug) ?? POSTS[0];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = resolve(slug);
  return {
    title: `${post.title} — Contego`,
    description: post.excerpt,
  };
}

function Avatar({ p, size = 30 }: { p: Author; size?: number }) {
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

function Byline({ label, p, link }: { label: string; p: Author; link?: boolean }) {
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
        <div className="font-mono text-[9.5px] tracking-[.12em] text-[#6B726C] mb-1">
          {label}
        </div>
        {link ? (
          <a href={`/authors/${p.slug}`} className="hover:opacity-80 transition-opacity">
            {name}
          </a>
        ) : (
          name
        )}
      </div>
    </div>
  );
}

const H2 = "font-display font-semibold text-[26px] leading-[1.2] tracking-[-.01em] text-[#F4F1EA] mb-4";
const P = "text-[16.5px] leading-[1.78] text-[#C7CDC8] mb-4";
const SEC = "scroll-mt-[100px] mb-12";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = resolve(slug);
  const writer = AUTHORS[post.author];
  const editor = AUTHORS["daniel-roth"];
  const checker = AUTHORS["priya-nair"];

  return (
    <>
      <Nav />

      {/* header */}
      <article className="pt-[110px] px-[28px]">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[.08em] text-[#6B726C] mb-4">
            <span className="text-[#5AE48E]">{post.category}</span> · {post.date} · {post.read}
          </div>
          <h1 className="font-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.1] tracking-[-.02em] text-[#F4F1EA]">
            {post.title}
          </h1>
        </div>

        {/* featured image */}
        <div
          className="max-w-[960px] mx-auto mt-10 aspect-[16/8] rounded-[20px] border border-[#F4F1EA]/8"
          style={{
            background: `radial-gradient(60% 60% at 28% 22%, hsla(${post.tint},55%,.30), transparent 55%), radial-gradient(80% 70% at 82% 90%, rgba(44,122,77,.4), transparent 60%), linear-gradient(150deg,#12211a,#0a0e0c)`,
          }}
        />

        {/* byline */}
        <div className="max-w-[880px] mx-auto mt-8 flex flex-col sm:flex-row rounded-[16px] border border-[#F4F1EA]/8 bg-[#0f1211]/50 py-2">
          <Byline label="WRITTEN BY" p={writer} link />
          <Byline label="EDITED BY" p={editor} link />
          <Byline label="FACT CHECKED BY" p={checker} link />
        </div>
      </article>

      {/* body + TOC */}
      <div className="max-w-[1060px] mx-auto px-[28px] mt-12 grid lg:grid-cols-[1fr_220px] gap-12 items-start">
        <div className="max-w-[720px]">
          <section id="intro" className={SEC}>
            <p className={P}>
              For years, AI video had one job it could not do: look real. The
              motion was close, the faces were close, and close was exactly the
              problem. A viewer felt something was off before they could name
              it, and they scrolled.
            </p>
            <p className={P}>
              That gap is what kept AI out of serious paid social. The best
              performing ads are creator videos, and creator videos only work
              when the person feels real. This is about how that changed, and
              what it means if you buy media for a living.
            </p>
          </section>

          <section id="the-tells" className={SEC}>
            <h2 className={H2}>The tells that gave AI away</h2>
            <p className={P}>
              Early AI UGC failed in a handful of predictable ways. Plastic
              skin with no texture. Eyes that did not track. Mouths that moved
              slightly out of sync with the voice. Lighting that never quite
              matched the room.
            </p>
            <p className={P}>
              None of these are dramatic on their own. Together they trip the
              instinct that tells a viewer a person is real, and that instinct
              fires in well under a second.
            </p>
          </section>

          <section id="what-changed" className={SEC}>
            <h2 className={H2}>What actually changed</h2>
            <p className={P}>
              Two things. Models got better at the details that carry realism,
              and the workflow around them matured. The raw output improved, but
              the bigger shift is treating AI video like production, not a
              button you press once.
            </p>
            <p className={P}>
              Casting the look, directing the delivery, matching the audio, and
              cutting anything that does not hold up. The tools do more, but the
              craft is what closes the gap.
            </p>
          </section>

          <section id="staying-real" className={SEC}>
            <h2 className={H2}>How we keep it real</h2>
            <p className={P}>
              Our rule is simple. If a viewer can tell it is AI, the video
              failed. Every clip gets reviewed frame by frame for the tells
              above, and anything that reads synthetic gets recut before it ever
              goes live.
            </p>
            <p className={P}>
              Realism is not a setting. It is the standard we hold every
              deliverable to, because it is the only thing that earns the trust
              a sale depends on.
            </p>
          </section>

          <section id="for-your-ads" className={SEC}>
            <h2 className={H2}>What it means for your ads</h2>
            <p className={P}>
              You get the trust of creator content without the scheduling,
              shipping, licensing, and reshoots. That means more hook variants
              tested every week, at a fraction of traditional UGC cost.
            </p>
            <p className={P}>
              The teams winning on paid social are not the ones with the single
              best ad. They are the ones testing the most credible creative,
              fastest. Realistic AI UGC finally makes that possible.
            </p>
          </section>

          <section id="conclusion" className={SEC}>
            <h2 className={H2}>Where this goes next</h2>
            <p className={P}>
              The realism problem is largely solved. The next edge is creative
              judgement: which angles, which hooks, which stories to tell, and
              how fast you can learn from what runs.
            </p>
            <p className={P}>
              That is the part that was always human, and it still is. The tools
              just stopped getting in the way.
            </p>
          </section>

          {/* author box */}
          <a
            href={`/authors/${writer.slug}`}
            className="card card-sheen p-7 flex gap-5 items-start hover:border-[#5AE48E]/25 transition-colors"
          >
            <Avatar p={writer} size={56} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold text-[18px] text-[#F4F1EA]">
                  {writer.name}
                </span>
                {writer.verified && <Verified />}
              </div>
              <div className="font-mono text-[11px] tracking-[.06em] text-[#5AE48E] mt-0.5 mb-2">
                {writer.role.toUpperCase()}
              </div>
              <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">{writer.bio}</p>
            </div>
          </a>
        </div>

        {/* sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px]">
            <ArticleToc items={TOC} />
          </div>
        </aside>
      </div>

      <div className="mt-[40px]" />
      <Claim />
      <Footer />
    </>
  );
}
