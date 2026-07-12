import Image from "next/image";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#difference", label: "Difference" },
  { href: "/#deliver", label: "Service" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <>
      <header className="sticky top-0 z-50 pt-[16px] px-4 flex justify-center">
        <nav className="inline-flex items-center gap-1 rounded-full bg-[#151917]/90 backdrop-blur-xl border border-[#F4F1EA]/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,.65)] py-[7px] pl-[18px] pr-[7px]">
          <a href="/" className="flex items-center mr-3">
            <Image
              src="/contego-logo.png"
              alt="Contego"
              width={2560}
              height={758}
              className="h-[30px] w-auto"
              priority
            />
          </a>

          <div className="hidden md:flex items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#AEB5AF] text-[13.5px] font-medium hover:text-[#F4F1EA] transition-colors px-3 py-1.5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="/#claim"
            className="ml-2 bg-[#5AE48E] text-[#07130C] font-display font-bold text-[13.5px] py-[8px] px-[16px] rounded-full whitespace-nowrap hover:bg-[#7EEBA8] transition-colors"
          >
            Claim free sample
          </a>
        </nav>
      </header>
    </>
  );
}
