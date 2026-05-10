import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const CATEGORIES = ['SEO', 'AI UGC', 'Social Media', 'Prop Firm News', 'Marketing Strategy']

export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams
  return {
    title: category ? `${category} — Contego Blog` : 'Blog — Contego',
    description: 'Prop firm marketing, SEO, and growth insights from the Contego team.',
  }
}

async function getPosts(category, page = 1) {
  const limit = 10
  const params = new URLSearchParams({
    'where[status][equals]': 'published',
    sort: '-publishedAt',
    limit,
    page,
  })
  if (category) params.set('where[category][equals]', category)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog?${params}`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return { docs: [], totalPages: 1, totalDocs: 0 }
  return res.json()
}

export default async function BlogIndex({ searchParams }) {
  const { category, page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page, 10) || 1)
  const { docs: posts, totalPages = 1 } = await getPosts(category, currentPage)

  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <div className="bi-layout">
            <aside className="bi-sidebar">
              <p className="bi-sidebar__label">Jump to a category</p>
              <ul className="bi-cats">
                <li>
                  <Link href="/blog" className={`bi-cat${!category ? ' active' : ''}`}>
                    All posts
                  </Link>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`bi-cat${category === cat ? ' active' : ''}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="bi-main">
              <header className="bi-header">
                <h1 className="bi-header__title">
                  {category ? category : 'Blog'}
                </h1>
                <p className="bi-header__sub">
                  Prop firm marketing, SEO, and growth insights.
                </p>
              </header>

              {posts.length === 0 ? (
                <p style={{ color: 'var(--text-3)', fontSize: 15, marginTop: 40 }}>
                  No posts published yet.
                </p>
              ) : (
                <ul className="bi-list">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <Link href={`/blog/${post.slug}`} className="bi-card">
                        {post.featuredImage?.url && (
                          <div className="bi-card__img">
                            <img
                              src={post.featuredImage.url}
                              alt={post.featuredImage.alt || post.title}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="bi-card__body">
                          <div className="bi-card__meta">
                            {post.category && (
                              <span className="bi-card__cat">{post.category}</span>
                            )}
                            {post.publishedAt && (
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </time>
                            )}
                          </div>
                          <h2 className="bi-card__title">{post.title}</h2>
                          {post.excerpt && (
                            <p className="bi-card__excerpt">{post.excerpt}</p>
                          )}
                          <span className="bi-card__read">Read more →</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {totalPages > 1 && (
                <nav className="bi-pager" aria-label="Pagination">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage - 1}`}
                      className="bi-pager__arrow"
                    >
                      ‹
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${p}`}
                      className={`bi-pager__num${p === currentPage ? ' active' : ''}`}
                    >
                      {String(p).padStart(2, '0')}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage + 1}`}
                      className="bi-pager__arrow"
                    >
                      ›
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
