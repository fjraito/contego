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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function extractText(nodes = []) {
  return nodes
    .flatMap((n) => {
      if (typeof n.text === 'string') return [n.text]
      if (n.children) return extractText(n.children)
      return []
    })
    .join(' ')
}

function extractHeadings(content) {
  if (!content?.root?.children) return []
  return content.root.children
    .filter((n) => n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3'))
    .map((n) => {
      const text = extractText(n.children)
      return { tag: n.tag, text, id: slugify(text) }
    })
}

function getReadTime(content) {
  if (!content?.root?.children) return null
  const text = extractText(content.root.children)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    robots: post.seo?.noIndex ? 'noindex' : 'index,follow',
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const readTime = getReadTime(post.content)
  const related = post.category ? await getRelated(post.category, slug) : []

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <Navbar />
      <main>
        <article>
          {post.featuredImage?.url && (
            <div className="post-hero">
              <div className="shell">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  className="post-hero__img"
                />
              </div>
            </div>
          )}

          <div className="shell">
            <div className="post-wrap">
              <header className="post-header">
                {post.category && (
                  <Link
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="post-cat"
                  >
                    {post.category}
                  </Link>
                )}
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                  {publishedDate && (
                    <time dateTime={post.publishedAt}>{publishedDate}</time>
                  )}
                  {readTime && <span>{readTime} min read</span>}
                </div>
                {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
              </header>

              {headings.length > 2 && (
                <nav className="post-toc" aria-label="Table of contents">
                  <p className="post-toc__label">What's in this guide</p>
                  <ol className="post-toc__list">
                    {headings.map((h, i) => (
                      <li key={i} className={h.tag === 'h3' ? 'post-toc__sub' : ''}>
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="post-body">
                <RichTextRenderer content={post.content} />
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="post-related">
            <div className="shell">
              <h2 className="post-related__title">Related articles</h2>
              <div className="blog">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
                    <div className="blog-thumb">
                      {p.featuredImage?.url ? (
                        <img
                          src={p.featuredImage.url}
                          alt={p.featuredImage.alt || p.title}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--surface-2)' }} />
                      )}
                    </div>
                    <div className="blog-body">
                      <div className="blog-meta">
                        <span className="tag">{p.category}</span>
                        {p.publishedAt && (
                          <time dateTime={p.publishedAt}>
                            {new Date(p.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                      </div>
                      <h3>{p.title}</h3>
                      {p.excerpt && <p>{p.excerpt}</p>}
                      <span className="read">Read more</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return (
      <Tag key={key} id={id}>
        {node.children?.map((c, i) => renderLeaf(c, i))}
      </Tag>
    )
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
    return (
      <blockquote key={key}>
        {node.children?.map((c, i) => renderLeaf(c, i))}
      </blockquote>
    )
  }
  if (node.type === 'horizontalrule') {
    return <hr key={key} />
  }
  return null
}

function renderLeaf(leaf, key) {
  if (leaf.type === 'linebreak') return <br key={key} />
  if (leaf.type === 'link') {
    return (
      <a
        key={key}
        href={leaf.fields?.url}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
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
