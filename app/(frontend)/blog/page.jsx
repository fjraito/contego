import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { client } from '@/sanity/lib/client'

const CATEGORIES = ['SEO', 'AI UGC', 'Social Media', 'Prop Firm News', 'Marketing Strategy']
const LIMIT = 8

const POSTS_QUERY = `{
  "posts": *[_type == "blogPost" && status == "published" $categoryFilter] | order(publishedAt desc) [$start...$end] {
    _id, title, "slug": slug.current, excerpt, category, publishedAt,
    "featuredImage": featuredImage { "url": asset->url, "alt": coalesce(alt, "") }
  },
  "total": count(*[_type == "blogPost" && status == "published" $categoryFilter])
}`

async function getPosts(category, page = 1) {
  const start = (page - 1) * LIMIT
  const end = start + LIMIT
  const categoryFilter = category ? `&& category == "${category}"` : ''
  const query = POSTS_QUERY.replace(/\$categoryFilter/g, categoryFilter)
  try {
    const data = await client.fetch(query, { start, end }, { next: { revalidate: 60 } })
    return { posts: data.posts ?? [], totalPages: Math.ceil((data.total ?? 0) / LIMIT) || 1 }
  } catch {
    return { posts: [], totalPages: 1 }
  }
}

export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams
  const title = category ? `${category} — Contego Blog` : 'Blog'
  const description = 'Prop firm marketing, SEO, and growth insights from the Contego team.'
  const canonical = category ? `/blog?category=${encodeURIComponent(category)}` : '/blog'
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: category ? `${category} — Contego Blog` : 'Contego Blog',
      description,
      url: canonical,
    },
    twitter: { title: category ? `${category} — Contego Blog` : 'Contego Blog', description },
  }
}

export default async function BlogIndex({ searchParams }) {
  const { category, page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page, 10) || 1)
  const { posts, totalPages } = await getPosts(category, currentPage)

  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <div className="bpi-header">
            <span className="eyebrow"><span className="dot" />Contego Blog</span>
            <h1 className="bpi-header__title">Blog</h1>
            <p className="bpi-header__sub">Prop firm marketing, SEO, and growth insights.</p>
          </div>
        </div>

        <section className="bpi-articles">
          <div className="shell">
            <div className="bpi-section-head">
              <h2 className="bpi-section-title">Most Recent Articles</h2>
              {category && (
                <span className="bpi-filter-tag">
                  {category}
                  <Link href="/blog" className="bpi-filter-clear">✕</Link>
                </span>
              )}
            </div>

            {posts.length === 0 ? (
              <p style={{ color: 'var(--text-3)', fontSize: 15, marginTop: 32 }}>No posts published yet.</p>
            ) : (
              <ul className="bpi-grid">
                {posts.map((post) => (
                  <li key={post._id}>
                    <Link href={`/blog/${post.slug}`} className="bpi-card">
                      <div className="bpi-card__img">
                        {post.featuredImage?.url ? (
                          <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} loading="lazy" />
                        ) : (
                          <div className="bpi-card__img-placeholder" />
                        )}
                      </div>
                      <div className="bpi-card__body">
                        <div className="bpi-card__meta">
                          {post.category && <span className="bpi-card__cat">{post.category}</span>}
                          {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </time>
                          )}
                        </div>
                        <h3 className="bpi-card__title">{post.title}</h3>
                        {post.excerpt && <p className="bpi-card__excerpt">{post.excerpt}</p>}
                        <span className="bpi-card__btn">Read More</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <nav className="bpi-pager" aria-label="Pagination">
                {currentPage > 1 && (
                  <Link href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage - 1}`} className="bpi-pager__arrow">‹</Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link key={p} href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${p}`} className={`bpi-pager__num${p === currentPage ? ' active' : ''}`}>
                    {String(p).padStart(2, '0')}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage + 1}`} className="bpi-pager__arrow">›</Link>
                )}
              </nav>
            )}
          </div>
        </section>

        <section className="bpi-cats-section">
          <div className="shell">
            <h2 className="bpi-section-title">Jump to a Category</h2>
            <div className="bpi-cats">
              {CATEGORIES.map((cat) => (
                <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`} className={`bpi-cat-card${category === cat ? ' active' : ''}`}>
                  <span className="bpi-cat-card__name">{cat}</span>
                  <span className="bpi-cat-card__arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
