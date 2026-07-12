import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Setup from "@/components/Setup";
import Difference from "@/components/Difference";
import Deliver from "@/components/Deliver";
import WhereItSells from "@/components/WhereItSells";
import MadeForFunnel from "@/components/MadeForFunnel";
import Claim from "@/components/Claim";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <Setup />
      </Reveal>
      <Reveal>
        <Difference />
      </Reveal>
      <Reveal>
        <Deliver />
      </Reveal>
      <Reveal>
        <WhereItSells />
      </Reveal>
      <Reveal>
        <MadeForFunnel />
      </Reveal>
      <Reveal>
        <Claim />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Footer />
    </>
  );
}
