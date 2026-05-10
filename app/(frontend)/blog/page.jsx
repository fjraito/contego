import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Blog — Contego',
  description: 'Prop firm marketing, SEO, and growth insights from the Contego team.',
}

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog?where[status][equals]=published&sort=-publishedAt&limit=50`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs ?? []
}

export default async function BlogIndex() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />
      <main>
        <section className="section shell">
          <div className="section-head" style={{ textAlign: 'left', margin: '0 0 56px' }}>
            <span className="eyebrow"><span className="dot" />Contego Blog</span>
            <h1 style={{ marginTop: 16, fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Insights for prop firm <span className="italic-accent">operators</span>
            </h1>
            <p className="muted" style={{ marginTop: 16, fontSize: 17, maxWidth: 560 }}>
              Marketing, SEO, and growth tactics from the team behind the fastest-growing prop firm brands.
            </p>
          </div>

          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-3)', fontSize: 15 }}>No posts published yet.</p>
          ) : (
            <ul className="blog" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="blog-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
                    <div className="blog-thumb">
                      {post.featuredImage?.url ? (
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt || post.title}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--surface-2)' }} />
                      )}
                    </div>
                    <div className="blog-body">
                      <div className="blog-meta">
                        <span className="tag">{post.category}</span>
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                      </div>
                      <h3>{post.title}</h3>
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <span className="read">Read more</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
