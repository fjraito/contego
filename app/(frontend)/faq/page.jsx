import { Navbar } from '../../../components/Navbar'
import { CTA } from '../../../components/CTA'
import { Footer } from '../../../components/Footer'
import { FAQPageClient } from '../../../components/FAQPageClient'

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>
        <FAQPageClient />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
