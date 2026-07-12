import Image from "next/image";

const COLUMNS = [
  {
    heading: "SERVICE",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
      { label: "Alternatives", href: "/alternatives" },
      { label: "Compare tools", href: "/compare" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      { label: "Claim your sample", href: "/#claim", accent: true },
      { label: "Contact us", href: "/contact" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#F4F1EA]/8 px-[28px] pt-16 pb-10">
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-4">
            <Image
              src="/contego-logo.png"
              alt="Contego"
              width={2560}
              height={758}
              className="h-9 w-auto"
            />
          </div>
          <p className="text-[14px] leading-[1.6] text-[#8A918B] max-w-[280px]">
            Contego is an AI UGC agency creating hyper-realistic, ad-ready
            videos without the cost and delays of influencer production.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <div className="font-mono text-[11px] tracking-[.12em] text-[#6B726C] mb-4">
              {col.heading}
            </div>
            <div className="flex flex-col gap-3">
              {col.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(external
                      ? { rel: "nofollow noopener noreferrer" }
                      : {})}
                    className={`text-[14px] ${
                      "accent" in link && link.accent
                        ? "text-[#5AE48E]"
                        : "text-[#C7CDC8] hover:text-[#F4F1EA] transition-colors"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[1000px] mx-auto mt-14 pt-6 border-t border-[#F4F1EA]/8 flex justify-between flex-wrap gap-3 font-mono text-[11px] text-[#565C57] tracking-[.04em]">
        <span>&copy; 2026 CONTEGO</span>
        <a
          href="https://contegoagency.com"
          rel="nofollow noopener noreferrer"
          className="text-[#565C57] hover:text-[#8A918B] transition-colors"
        >
          contegoagency.com
        </a>
        <span>AI UGC AGENCY</span>
      </div>
    </footer>
  );
}
