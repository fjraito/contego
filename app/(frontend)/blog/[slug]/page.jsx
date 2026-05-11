import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog?where[slug][equals]=${slug}&where[status][equals]=published&limit=1`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

async function getRelated(category, currentSlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog?where[status][equals]=published&where[category][equals]=${encodeURIComponent(category)}&sort=-publishedAt&limit=4`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data.docs ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3)
}

function toId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractText(nodes = []) {
  return nodes.flatMap((n) => {
    if (typeof n.text === 'string') return [n.text]
    if (n.children) return extractText(n.children)
    return []
  }).join(' ')
}

function extractHeadings(content) {
  if (!content?.root?.children) return []
  return content.root.children
    .filter((n) => n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3'))
    .map((n) => {
      const text = extractText(n.children)
      return { tag: n.tag, text, id: toId(text) }
    })
}

function getReadTime(content) {
  if (!content?.root?.children) return null
  const words = extractText(content.root.children).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
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
      modifiedTime: post.updatedAt || post.publishedAt,
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

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7.5" fill="var(--green)" />
      <path d="M4 7.5l2.5 2.5 4.5-4.5" stroke="#06140b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contego.agency'

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const readTime = getReadTime(post.content)
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
    dateModified: post.updatedAt || post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Contego',
      url: SITE_URL,
    },
    ...(post.featuredImage?.url && { image: post.featuredImage.url }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <div className="shell">
          {/* Breadcrumb */}
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

          {/* Centered header */}
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
              {readTime && <><span className="post-meta-dot">·</span><span>{readTime} min read</span></>}
            </div>
            <div className="post-verified-row">
              {post.editedBy && (
                <span className="post-verified-item">
                  <CheckIcon /> Edited by {post.editedBy}
                </span>
              )}
              {post.factCheckedBy && (
                <span className="post-verified-item">
                  <CheckIcon /> Fact checked by {post.factCheckedBy}
                </span>
              )}
              {!post.editedBy && !post.factCheckedBy && (
                <span className="post-verified-item">
                  <CheckIcon /> Fact checked by Contego Editorial
                </span>
              )}
            </div>
          </div>

          {/* Featured image */}
          {post.featuredImage?.url && (
            <div className="post-hero-img">
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
              />
            </div>
          )}

          {/* Content layout: TOC left + body right */}
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
              <RichTextRenderer content={post.content} />

              {/* Author box */}
              <div className="post-author">
                <div className="post-author__avatar">
                  {authorName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="post-author__info">
                  <p className="post-author__name">{authorName}</p>
                  <p className="post-author__role">Contego Team</p>
                </div>
              </div>

              {/* Verified row bottom */}
              {(post.editedBy || post.factCheckedBy) && (
                <div className="post-verified-bottom">
                  {post.editedBy && (
                    <span className="post-verified-item">
                      <CheckIcon /> Edited by {post.editedBy}
                    </span>
                  )}
                  {post.factCheckedBy && (
                    <span className="post-verified-item">
                      <CheckIcon /> Fact checked by {post.factCheckedBy}
                    </span>
                  )}
                </div>
              )}

              {/* Inline CTA */}
              <div className="post-cta-box">
                <span className="post-cta-box__eyebrow">Work with Contego</span>
                <h3 className="post-cta-box__title">Build a prop firm marketing system traders can trust.</h3>
                <p className="post-cta-box__desc">Get a growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy.</p>
                <div className="post-cta-box__btns">
                  <a href="/#cta" className="btn btn-primary">Book a Call <span className="arrow">→</span></a>
                  <a href="mailto:hello@contego.com" className="btn btn-ghost">Email Contego</a>
                </div>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="post-related">
              <h2 className="post-related__title">Related Articles</h2>
              <div className="bpi-grid bpi-grid--3">
                {related.map((p) => (
                  <li key={p.id} style={{ listStyle: 'none' }}>
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

function RichTextRenderer({ content }) {
  if (!content?.root?.children) return null
  return <>{content.root.children.map((node, i) => renderNode(node, i))}</>
}

function renderNode(node, key) {
  if (node.type === 'paragraph') {
    if (!node.children?.length) return <br key={key} />
    return <p key={key}>{node.children.map((c, i) => renderLeaf(c, i))}</p>
  }
  if (node.type === 'heading') {
    const Tag = node.tag || 'h2'
    const text = node.children?.map((c) => c.text || '').join('') || ''
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return <Tag key={key} id={id}>{node.children?.map((c, i) => renderLeaf(c, i))}</Tag>
  }
  if (node.type === 'list') {
    const Tag = node.listType === 'number' ? 'ol' : 'ul'
    return (
      <Tag key={key}>
        {node.children?.map((item, i) => (
          <li key={i}>{item.children?.map((c, j) => renderLeaf(c, j))}</li>
        ))}
      </Tag>
    )
  }
  if (node.type === 'quote') {
    return <blockquote key={key}>{node.children?.map((c, i) => renderLeaf(c, i))}</blockquote>
  }
  if (node.type === 'horizontalrule') return <hr key={key} />
  return null
}

function renderLeaf(leaf, key) {
  if (leaf.type === 'linebreak') return <br key={key} />
  if (leaf.type === 'link') {
    return (
      <a key={key} href={leaf.fields?.url} rel="nofollow noopener noreferrer" target="_blank">
        {leaf.children?.map((c, i) => renderLeaf(c, i))}
      </a>
    )
  }
  let content = leaf.text || ''
  if (!content) return null
  if (leaf.bold) content = <strong key={`b${key}`}>{content}</strong>
  if (leaf.italic) content = <em key={`i${key}`}>{content}</em>
  if (leaf.underline) content = <u key={`u${key}`}>{content}</u>
  if (leaf.strikethrough) content = <s key={`s${key}`}>{content}</s>
  if (leaf.code) content = <code key={`c${key}`}>{content}</code>
  return typeof content === 'string' ? <span key={key}>{content}</span> : content
}
