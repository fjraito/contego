import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { getAuthor, getPostsByAuthor, type BlogAuthor } from "@/lib/blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAuthor(slug);
  return {
    title: a ? `${a.name}, ${a.role} — Contego` : "Author — Contego",
    description: a?.bio,
  };
}

function Verified({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block flex-none" aria-label="Verified">
      <circle cx="12" cy="12" r="11" fill="#5AE48E" />
      <path d="M7 12.4l3.2 3.2L17.2 8.6" fill="none" stroke="#07130c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Avatar({ a, size }: { a: BlogAuthor; size: number }) {
  if (a.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={a.imageUrl}
        alt={a.name}
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
        fontSize: size * 0.34,
        background: `linear-gradient(150deg, hsl(${a.tint},62%), #2c7a4d)`,
      }}
    >
      {a.initials}
    </span>
  );
}

const CARD_H = "font-mono text-[10px] tracking-[.12em] text-[#6B726C] mb-4";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  const posts = await getPostsByAuthor(slug);

  return (
    <>
      <Nav />

      <div className="max-w-[1080px] mx-auto px-[28px] pt-[110px]">
        <a
          href="/blog"
          className="inline-block font-mono text-[11px] tracking-[.1em] text-[#6B726C] hover:text-[#AEB5AF] transition-colors mb-9"
        >
          ← BLOG
        </a>

        {/* header — name appears once */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Avatar a={author} size={92} />
          <div>
            <h1 className="font-display font-medium text-[clamp(30px,4vw,44px)] tracking-[-.02em] text-[#F4F1EA] flex items-center gap-2.5 leading-none">
              {author.name}
              {author.verified && <Verified size={24} />}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#AEB5AF]">
              <span>
                {author.role}
                {author.org && <span className="text-[#6B726C]"> · {author.org}</span>}
              </span>
              {author.location && (
                <span className="flex items-center gap-1.5 text-[#8A918B]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {author.location}
                </span>
              )}
              {author.links && (
                <span className="flex gap-4 font-mono text-[12.5px] text-[#8A918B]">
                  {author.links.map((l) => (
                    <a key={l.label} href={l.href} rel="nofollow noopener noreferrer" className="hover:text-[#5AE48E] transition-colors">
                      {l.label}
                    </a>
                  ))}
                </span>
              )}
            </div>
            {author.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {author.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10.5px] text-[#C7CDC8] px-2.5 py-1 rounded-full border border-[#F4F1EA]/12 bg-[#0f1211]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* about */}
        <section className="mt-10 max-w-[760px]">
          <p className="text-[17px] leading-[1.7] text-[#C7CDC8] mb-4">{author.bio}</p>
          {author.background && (
            <p className="text-[16px] leading-[1.7] text-[#AEB5AF]">{author.background}</p>
          )}
        </section>

        {/* meta cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {author.expertise && (
            <div className="card p-6">
              <div className={CARD_H}>AREAS OF EXPERTISE</div>
              <ul className="flex flex-col gap-2.5">
                {author.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-[14px] text-[#C7CDC8]">
                    <svg width="14" height="14" viewBox="0 0 16 16" className="flex-none mt-[3px]">
                      <circle cx="8" cy="8" r="8" fill="#5AE48E" fillOpacity="0.14" />
                      <path d="M4.5 8l2.2 2.2L11.5 5.5" fill="none" stroke="#5AE48E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {author.experience && (
            <div className="card p-6">
              <div className={CARD_H}>EXPERIENCE</div>
              <div className="flex flex-col gap-4">
                {author.experience.map((e, i) => (
                  <div key={i}>
                    <div className="text-[14px] text-[#F4F1EA] font-medium leading-tight">{e.role}</div>
                    <div className="text-[12.5px] text-[#8A918B] mt-0.5">{e.org} · {e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {author.education && (
            <div className="card p-6">
              <div className={CARD_H}>EDUCATION</div>
              <div className="flex flex-col gap-4">
                {author.education.map((e, i) => (
                  <div key={i}>
                    <div className="text-[14px] text-[#F4F1EA] font-medium leading-tight">{e.degree}</div>
                    <div className="text-[12.5px] text-[#8A918B] mt-0.5">{e.school}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* articles */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display font-semibold text-[22px] text-[#F4F1EA]">
              Articles by {author.name.split(" ")[0]}
            </h2>
            <span className="font-mono text-[12px] text-[#6B726C]">
              {posts.length} published
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block card overflow-hidden hover:border-[#5AE48E]/25 transition-colors"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-cover bg-center"
                  style={
                    p.coverUrl
                      ? { backgroundImage: `url(${p.coverUrl})` }
                      : {
                          background: `radial-gradient(70% 60% at 30% 20%, hsla(${p.tint},55%,.28), transparent 55%), radial-gradient(80% 70% at 82% 90%, rgba(44,122,77,.4), transparent 60%), linear-gradient(150deg,#12211a,#0a0e0c)`,
                        }
                  }
                >
                  <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[.06em] text-[#5AE48E] px-2.5 py-1 rounded-full border border-[#5AE48E]/30 bg-[#07130c]/40">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10.5px] text-[#6B726C] mb-2.5">
                    {p.date} · {p.read}
                  </div>
                  <h3 className="font-display font-semibold text-[18px] leading-[1.25] text-[#F4F1EA]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#8A918B]">
                    {p.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-[40px]" />
      <Claim />
      <Footer />
    </>
  );
}
