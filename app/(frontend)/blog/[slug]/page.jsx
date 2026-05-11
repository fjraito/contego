import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { client } from '@/sanity/lib/client'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  _id, title, "slug": slug.current, excerpt, content, category,
  publishedAt, _updatedAt, author, editedBy, factCheckedBy,
  "featuredImage": featuredImage { "url": asset->url, "alt": coalesce(alt, "") },
  seo
}`

const RELATED_QUERY = `*[_type == "blogPost" && status == "published" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id, title, "slug": slug.current, excerpt, category, publishedAt,
  "featuredImage": featuredImage { "url": asset->url, "alt": coalesce(alt, "") }
}`

async function getPost(slug) {
  try {
    return await client.fetch(POST_QUERY, { slug }, { next: { revalidate: 60 } })
  } catch { return null }
}

async function getRelated(category, slug) {
  try {
    return await client.fetch(RELATED_QUERY, { category, slug }, { next: { revalidate: 60 } })
  } catch { return [] }
}

function toId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractHeadings(blocks = []) {
  return blocks
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => {
      const text = b.children?.map((c) => c.text || '').join('') || ''
      return { tag: b.style, text, id: toId(text) }
    })
}

function countWords(blocks = []) {
  return blocks
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children?.map((c) => c.text || '') ?? [])
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt
  const ogImage = post.featuredImage?.url
    ? [{ url: post.featuredImage.url, width: 1200, height: 630, alt: post.featuredImage.alt || title }]
    : undefined
  return {
    title,
    description,
    robots: post.seo?.noIndex ? 'noindex' : 'index,follow',
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: post.author ? [post.author] : ['Contego Team'],
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImage?.url ? [post.featuredImage.url] : undefined,
    },
  }
}

const ptComponents = {
  block: {
    h2: ({ children, value }) => {
      const text = value?.children?.map((c) => c.text || '').join('') || ''
      return <h2 id={toId(text)}>{children}</h2>
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map((c) => c.text || '').join('') || ''
      return <h3 id={toId(text)}>{children}</h3>
    },
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} rel="nofollow noopener noreferrer" target={value?.blank !== false ? '_blank' : undefined}>
        {children}
      </a>
    ),
    code: ({ children }) => <code>{children}</code>,
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure style={{ margin: '1.5em 0' }}>
          <img src={value.url} alt={value.alt || ''} style={{ width: '100%', borderRadius: 8 }} />
          {value.caption && <figcaption style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7.5" fill="var(--green)" />
      <path d="M4 7.5l2.5 2.5 4.5-4.5" stroke="#06140b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const wordCount = countWords(post.content)
  const readTime = Math.max(1, Math.round(wordCount / 225))
  const related = post.category ? await getRelated(post.category, slug) : []

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  const titleShort = post.title.length > 40 ? post.title.slice(0, 40) + '…' : post.title
  const authorName = post.author || 'Contego Team'
  const hasToc = headings.length > 1

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: 'Contego', url: SITE_URL },
    ...(post.featuredImage?.url && { image: post.featuredImage.url }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <div className="shell">
          <nav className="post-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            {post.category && (
              <>
                <span>/</span>
                <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
              </>
            )}
            <span>/</span>
            <span aria-current="page">{titleShort}</span>
          </nav>

          <div className="post-center">
            {post.category && (
              <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="post-cat-pill">
                {post.category}
              </Link>
            )}
            <h1 className="post-h1">{post.title}</h1>
            {post.excerpt && <p className="post-lead">{post.excerpt}</p>}
            <div className="post-meta-row">
              {publishedDate && <span>{publishedDate}</span>}
              <span className="post-meta-dot">·</span>
              <span>by {authorName}</span>
              <span className="post-meta-dot">·</span>
              <span>{readTime} min read</span>
            </div>
            <div className="post-verified-row">
              {post.editedBy && <span className="post-verified-item"><CheckIcon /> Edited by {post.editedBy}</span>}
              {post.factCheckedBy && <span className="post-verified-item"><CheckIcon /> Fact checked by {post.factCheckedBy}</span>}
              {!post.editedBy && !post.factCheckedBy && (
                <span className="post-verified-item"><CheckIcon /> Fact checked by Contego Editorial</span>
              )}
            </div>
          </div>

          {post.featuredImage?.url && (
            <div className="post-hero-img">
              <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} />
            </div>
          )}

          <div className={`post-layout${hasToc ? '' : ' post-layout--no-toc'}`}>
            {hasToc && (
              <aside className="post-toc">
                <p className="post-toc__label">Table of Contents</p>
                <ol className="post-toc__list">
                  {headings.map((h, i) => (
                    <li key={i} className={h.tag === 'h3' ? 'post-toc__sub' : ''}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </aside>
            )}

            <div className="post-body">
              {post.content && <PortableText value={post.content} components={ptComponents} />}

              <div className="post-author">
                <div className="post-author__avatar">
                  {authorName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="post-author__info">
                  <p className="post-author__name">{authorName}</p>
                  <p className="post-author__role">Contego Team</p>
                </div>
              </div>

              {(post.editedBy || post.factCheckedBy) && (
                <div className="post-verified-bottom">
                  {post.editedBy && <span className="post-verified-item"><CheckIcon /> Edited by {post.editedBy}</span>}
                  {post.factCheckedBy && <span className="post-verified-item"><CheckIcon /> Fact checked by {post.factCheckedBy}</span>}
                </div>
              )}

              <div className="post-cta-box">
                <span className="post-cta-box__eyebrow">Work with Contego</span>
                <h3 className="post-cta-box__title">Build a prop firm marketing system traders can trust.</h3>
                <p className="post-cta-box__desc">Get a growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy.</p>
                <div className="post-cta-box__btns">
                  <a href="/#cta" className="btn btn-primary">Book a Call <span className="arrow">→</span></a>
                  <a href="mailto:hello@contego.co" className="btn btn-ghost">Email Contego</a>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="post-related">
              <h2 className="post-related__title">Related Articles</h2>
              <div className="bpi-grid bpi-grid--3">
                {related.map((p) => (
                  <li key={p._id} style={{ listStyle: 'none' }}>
                    <Link href={`/blog/${p.slug}`} className="bpi-card">
                      <div className="bpi-card__img">
                        {p.featuredImage?.url ? (
                          <img src={p.featuredImage.url} alt={p.featuredImage.alt || p.title} loading="lazy" />
                        ) : (
                          <div className="bpi-card__img-placeholder" />
                        )}
                      </div>
                      <div className="bpi-card__body">
                        <div className="bpi-card__meta">
                          {p.category && <span className="bpi-card__cat">{p.category}</span>}
                          {p.publishedAt && (
                            <time dateTime={p.publishedAt}>
                              {new Date(p.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </time>
                          )}
                        </div>
                        <h3 className="bpi-card__title">{p.title}</h3>
                        {p.excerpt && <p className="bpi-card__excerpt">{p.excerpt}</p>}
                        <span className="bpi-card__btn">Read More</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
