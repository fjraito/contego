import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { getStaticBlogPost, STATIC_BLOG_POSTS, STATIC_BLOG_SLUGS } from '../data'
import { TocClient } from './TocClient'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contegoagency.com'

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  _id, title, "slug": slug.current, excerpt, content, category,
  publishedAt, _updatedAt, author, editedBy, factCheckedBy,
  "featuredImage": featuredImage { "url": asset->url, "alt": coalesce(alt, "") },
  seo
}`

const RELATED_QUERY = `*[_type == "blogPost" && status == "published" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...4] {
  _id, title, "slug": slug.current, publishedAt
}`

async function getPost(slug) {
  if (STATIC_BLOG_SLUGS.has(slug)) return getStaticBlogPost(slug)

  try {
    const post = await client.fetch(POST_QUERY, { slug }, { next: { revalidate: 60 } })
    if (post) return post
  } catch { /* fall through to static posts */ }
  return getStaticBlogPost(slug)
}

async function getRelated(category, slug) {
  let sanityRelated = []
  try {
    sanityRelated = await client.fetch(RELATED_QUERY, { category, slug }, { next: { revalidate: 60 } })
  } catch { /* fall through to static posts */ }

  const sanitySlugs = new Set(sanityRelated.map((post) => post.slug))
  const staticRelated = STATIC_BLOG_POSTS
    .filter((post) => post.category === category && post.slug !== slug && !sanitySlugs.has(post.slug))
    .map(({ content, seo, ...post }) => post)

  return [...sanityRelated, ...staticRelated]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 4)
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
  const featuredImageUrl = post.featuredImage?.url?.startsWith('http')
    ? post.featuredImage.url
    : post.featuredImage?.url
      ? `${SITE_URL}${post.featuredImage.url}`
      : null
  const ogImage = featuredImageUrl
    ? [{ url: featuredImageUrl, width: 1200, height: 630, alt: post.featuredImage.alt || title }]
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
      images: featuredImageUrl ? [featuredImageUrl] : undefined,
    },
  }
}

function VerifiedIcon({ size = 14 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="var(--green)" aria-label="Verified"
      style={{ display: 'inline-flex', flexShrink: 0 }}
    >
      <path d="M12 1.5l2.3 2.1 3.1-.3.4 3.1 2.6 1.8-1.3 2.8 1.3 2.8-2.6 1.8-.4 3.1-3.1-.3L12 20.5 9.7 18.4l-3.1.3-.4-3.1-2.6-1.8L4.9 11l-1.3-2.8 2.6-1.8.4-3.1 3.1.3L12 1.5z" />
      <path d="M9.2 12l2 2 3.6-3.6" stroke="#06140b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Avatar({ name, size = 36 }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div
      aria-label={name}
      style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #4ade80, #166534)',
        border: '1px solid var(--border-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.36), fontWeight: 600, color: '#06140b',
      }}
    >
      {initials}
    </div>
  )
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
        <figure>
          <img src={value.url} alt={value.alt || ''} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
    table: ({ value }) => (
      <div className="post-table-wrap">
        <table className="post-table">
          {value.headers?.length > 0 && (
            <thead>
              <tr>
                {value.headers.map((header, index) => (
                  <th key={`${header}-${index}`}>{header}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {value.rows?.map((row) => (
              <tr key={row._key}>
                {row.cells?.map((cell, index) => (
                  <td key={`${row._key}-${index}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
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

  const credits = [
    { role: 'Written by', name: authorName },
    ...(post.editedBy ? [{ role: 'Edited by', name: post.editedBy }] : []),
    ...(post.factCheckedBy ? [{ role: 'Fact checked by', name: post.factCheckedBy }] : []),
    ...(!post.editedBy && !post.factCheckedBy ? [{ role: 'Fact checked by', name: 'Contego Editorial' }] : []),
  ]

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
    ...(post.featuredImage?.url && { image: post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${SITE_URL}${post.featuredImage.url}` }),
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
          </div>

          {post.featuredImage?.url && (
            <div className="post-hero-img">
              <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} />
            </div>
          )}

          <div className="post-layout">
            <aside className="post-side">
              {headings.length > 1 && (
                <div className="side-card">
                  <h4>Table of contents</h4>
                  <TocClient headings={headings} />
                </div>
              )}

              <div className="side-card pub-card">
                <h4>Published by</h4>
                <div className="pub-author">
                  <Avatar name={authorName} size={38} />
                  <div>
                    <div className="pub-name">
                      {authorName}
                      <VerifiedIcon size={13} />
                    </div>
                    <div className="pub-role">Contego Team</div>
                  </div>
                </div>
                {publishedDate && (
                  <div className="pub-date">
                    <span className="lbl">Published</span>
                    {publishedDate}
                  </div>
                )}
              </div>

              <div className="side-card credit-card">
                <h4>Article credits</h4>
                {credits.map((c, i) => (
                  <div className="credit" key={i}>
                    <Avatar name={c.name} size={34} />
                    <div>
                      <div className="credit-role">{c.role}</div>
                      <span className="credit-name">
                        {c.name}
                        <VerifiedIcon size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="post-body">
              {post.content && <PortableText value={post.content} components={ptComponents} />}

              <div className="post-cta-box">
                <span className="post-cta-box__eyebrow">Work with Contego</span>
                <h3 className="post-cta-box__title">Build a prop firm marketing system traders can trust.</h3>
                <p className="post-cta-box__desc">Get a growth audit for your SEO, social content, AI UGC video, and trader acquisition strategy.</p>
                <div className="post-cta-box__btns">
                  <a href="/#cta" className="btn btn-primary">Book a Call <span className="arrow">→</span></a>
                  <a href="mailto:hello@contego.co" className="btn btn-ghost">Email Contego</a>
                </div>
              </div>

              <div className="author-box">
                <Avatar name={authorName} size={80} />
                <div>
                  <div className="author-box__name">
                    {authorName}
                    <VerifiedIcon size={16} />
                  </div>
                  <div className="author-box__role">Contego Team</div>
                  <p className="author-box__bio">
                    The Contego editorial team covers prop firm marketing, SEO strategy, AI UGC video production, and social media management for trading companies.
                  </p>
                </div>
              </div>

              {related.length > 0 && (
                <div className="post-related-list-wrap">
                  <h4 className="post-related-list-wrap__label">Related articles</h4>
                  <div className="post-related-list">
                    {related.map((p) => (
                      <Link key={p._id} href={`/blog/${p.slug}`}>
                        <span className="rel-t">{p.title}</span>
                        {p.publishedAt && (
                          <span className="rel-d">
                            {new Date(p.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
