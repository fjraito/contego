import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Blog — Contego',
  description: 'Insights on prop firm marketing, SEO, and growth strategies.',
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
      <main className="blog-index">
        <header className="blog-index__header">
          <h1>Blog</h1>
          <p>Prop firm marketing, SEO, and growth insights.</p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-index__empty">No posts yet.</p>
        ) : (
          <ul className="blog-index__grid">
            {posts.map((post) => (
              <li key={post.id} className="blog-card">
                <Link href={`/blog/${post.slug}`}>
                  {post.featuredImage?.url && (
                    <div className="blog-card__image">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="blog-card__body">
                    {post.category && (
                      <span className="blog-card__category">{post.category}</span>
                    )}
                    <h2 className="blog-card__title">{post.title}</h2>
                    {post.excerpt && (
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <time
                        className="blog-card__date"
                        dateTime={post.publishedAt}
                      >
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  )
}
