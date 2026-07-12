import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Contego",
  description:
    "Notes on AI UGC, creative strategy, and paid social from the Contego team.",
};

function Thumb({
  tint,
  category,
  coverUrl,
  big,
}: {
  tint: string;
  category: string;
  coverUrl?: string | null;
  big?: boolean;
}) {
  return (
    <div
      className={`relative ${big ? "aspect-[16/8]" : "aspect-[16/10]"} overflow-hidden bg-cover bg-center`}
      style={
        coverUrl
          ? { backgroundImage: `url(${coverUrl})` }
          : {
              background: `radial-gradient(70% 60% at 30% 20%, hsla(${tint},55%,.28), transparent 55%), radial-gradient(80% 70% at 82% 90%, rgba(44,122,77,.4), transparent 60%), linear-gradient(150deg,#12211a,#0a0e0c)`,
            }
      }
    >
      <span className="absolute top-4 left-4 text-[10px] tracking-[.06em] text-[#5AE48E] px-2.5 py-1 rounded-full border border-[#5AE48E]/30 bg-[#07130c]/60">
        {category}
      </span>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <>
        <Nav />
        <section className="pt-[160px] pb-[160px] px-[28px] text-center">
          <div className="max-w-[560px] mx-auto">
            <div className="flex justify-center mb-6">
              <SectionLabel>BLOG</SectionLabel>
            </div>
            <h1 className="font-display font-medium text-[clamp(30px,4vw,44px)] text-[#F4F1EA]">
              No posts yet.
            </h1>
            <p className="mt-4 text-[16px] text-[#AEB5AF]">
              Publish your first article in the Studio to see it here.
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Nav />

      <section className="pt-[120px] pb-[50px] px-[28px] text-center">
        <div className="max-w-[680px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>BLOG</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(38px,5.5vw,60px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            Notes on AI UGC and paid social.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Playbooks, creative strategy, and what we learn shipping video for
            growth teams.
          </p>
        </div>
      </section>

      <section className="pb-[110px] px-[28px]">
        <div className="max-w-[1080px] mx-auto">
          {/* featured */}
          <a href={`/blog/${featured.slug}`} className="group block card card-sheen overflow-hidden mb-6 md:grid md:grid-cols-2">
            <Thumb tint={featured.tint} category={featured.category} coverUrl={featured.coverUrl} big />
            <div className="p-8 flex flex-col justify-center">
              <div className="font-mono text-[11px] text-[#6B726C] mb-3">
                {featured.date} · {featured.read}
              </div>
              <h2 className="font-display font-semibold text-[26px] leading-[1.15] text-[#F4F1EA] group-hover:text-white transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#AEB5AF]">
                {featured.excerpt}
              </p>
              <span className="mt-5 font-mono text-[13px] text-[#5AE48E]">
                Read more →
              </span>
            </div>
          </a>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <a
                key={p.title}
                href={`/blog/${p.slug}`}
                className="group block card overflow-hidden hover:border-[#5AE48E]/25 transition-colors"
              >
                <Thumb tint={p.tint} category={p.category} coverUrl={p.coverUrl} />
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
        </div>
      </section>

      <Claim />
      <Footer />
    </>
  );
}
