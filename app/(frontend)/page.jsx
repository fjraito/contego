import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ClientMarquee } from '@/components/ClientMarquee'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { Pricing } from '@/components/Pricing'
import { Blog } from '@/components/Blog'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <Services />
        <Process />
        <Pricing />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
