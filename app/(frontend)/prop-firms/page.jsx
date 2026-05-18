import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import PropFirmsClient from './PropFirmsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

export const metadata = {
  title: 'Best Prop Firms 2026',
  description:
    'An independent, editorially ranked directory of the best prop trading firms of 2026. Compare funding, profit splits, payout speed and trader reviews.',
  alternates: { canonical: '/prop-firms' },
  openGraph: {
    type: 'website',
    title: 'Best Prop Firms 2026 — Contego',
    description:
      'An independent, editorially ranked directory of the best prop trading firms of 2026. Compare funding, profit splits, payout speed and trader reviews.',
    url: '/prop-firms',
  },
}

export default function PropFirmsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Prop Firms 2026',
    url: `${SITE_URL}/prop-firms`,
    description: 'An independent, editorially ranked directory of the best prop trading firms of 2026.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section className="pf-hero">
          <div className="shell">
            <span className="pill"><span className="dot" />Updated May 2026 &middot; 15 firms tracked</span>
            <h1>The best <span className="italic-accent">prop firms</span><br />of 2026.</h1>
            <p className="lead">
              An independent, editorially ranked directory of the prop trading firms our research team
              would actually fund an evaluation with this quarter. No pay-to-rank, no fluff — just
              capital terms, payout reliability, and trader sentiment.
            </p>
            <div className="pf-hero-meta">
              <span>15 firms reviewed</span>
              <span><span className="dot" />6 ranking criteria</span>
              <span><span className="dot" />Refreshed quarterly</span>
              <span><span className="dot" />Independent editorial</span>
            </div>
          </div>
        </section>

        <PropFirmsClient />

        <CTA
          pill="Looking for marketing help?"
          heading="We help prop firms grow.<br />Let&apos;s talk."
          description="Get a clear growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy."
        />
      </main>
      <Footer />
    </>
  )
}
