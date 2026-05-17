import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LEGAL_UPDATED } from './legalContent'

function Section({ section }) {
  return (
    <section className="legal-section">
      <h2>{section.title}</h2>
      {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.groups?.map((group) => (
        <div className="legal-group" key={group.heading}>
          <h3>{group.heading}</h3>
          {group.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {group.items && (
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </div>
      ))}
      {section.items && (
        <ul>
          {section.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      {section.closing?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.contact && (
        <address className="legal-contact">
          <strong>Contego</strong>
          <span>Email: <a href="mailto:hello@contegoagency.com">hello@contegoagency.com</a></span>
          <span>Website: <a href="https://contegoagency.com">https://contegoagency.com</a></span>
        </address>
      )}
    </section>
  )
}

export function LegalPage({ content }) {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="shell">
          <nav className="post-breadcrumb legal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">{content.title}</span>
          </nav>

          <header className="legal-hero">
            <span className="eyebrow"><span className="dot" />Legal</span>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <div className="legal-updated">Last updated: {LEGAL_UPDATED}</div>
          </header>

          <article className="legal-card">
            <div className="legal-intro">
              {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {content.sections.map((section) => <Section key={section.title} section={section} />)}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
