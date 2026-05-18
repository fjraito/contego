import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import ContactClient from './ContactClient'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

export const metadata = {
  title: 'Contact',
  description:
    'Talk to Contego — prop-firm growth via SEO, social, and AI UGC. Replies from a human operator within 12 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact — Contego',
    description:
      'Talk to Contego — prop-firm growth via SEO, social, and AI UGC. Replies from a human operator within 12 hours.',
    url: '/contact',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Contego',
    url: `${SITE_URL}/contact`,
    description: 'Get in touch with Contego for prop firm marketing services.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section className="contact-hero">
          <div className="shell">
            <span className="page-eyebrow">Contact</span>
            <h1 style={{ marginTop: 22 }}>
              Let&apos;s build the <span className="italic-accent">growth engine.</span>
            </h1>
            <p className="lead">
              Tell us where you are and where you&apos;re going. We reply within 12 hours on
              weekdays — every email read by a human operator, not a triage bot.
            </p>
            <div className="contact-meta-row">
              <span><span className="check">&#10003;</span> 12-hour reply SLA</span>
              <span><span className="check">&#10003;</span> NDA on request</span>
              <span><span className="check">&#10003;</span> No pitch decks</span>
            </div>
          </div>
        </section>

        <ContactClient />

        <section className="section section-tight">
          <div className="shell">
            <div className="section-head" style={{ marginBottom: 28 }}>
              <span className="eyebrow"><span className="dot" />Offices</span>
              <h2>Three timezones, one team.</h2>
            </div>
            <div className="offices">
              {[
                { flag: '\u{1F1EC}\u{1F1E7}', city: 'London', addr: '4 Rivington St.\nShoreditch, EC2A 3AY', tz: 'GMT', live: true },
                { flag: '\u{1F1FA}\u{1F1F8}', city: 'New York', addr: '147 W 24th St., Fl 6\nManhattan, NY 10011', tz: 'EST', live: true },
                { flag: '\u{1F1F8}\u{1F1EC}', city: 'Singapore', addr: '79 Anson Rd., #08-01\n079906', tz: 'SGT', live: false },
              ].map((c, i) => (
                <div className="office-card" key={i}>
                  <span className="flag">{c.flag}</span>
                  <span className="city">{c.city}</span>
                  <span className="addr" style={{ whiteSpace: 'pre-line' }}>{c.addr}</span>
                  <span className={`tz ${c.live ? '' : 'dim'}`}>
                    <span className="pip" />{c.tz}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
