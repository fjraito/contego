import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTA } from '@/components/CTA'
import { BlogIndexClient } from '@/components/BlogIndexClient'
import { client } from '@/sanity/lib/client'
import { STATIC_BLOG_POSTS, STATIC_BLOG_SLUGS } from './data'

const ALL_POSTS_QUERY = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, category, publishedAt, author,
  "featuredImage": { "url": coalesce(featuredImage.asset->url, featuredImageUrl), "alt": coalesce(featuredImage.alt, "") }
}`

async function getAllPosts() {
  let sanityPosts = []
  try {
    sanityPosts = await client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: 60 } }) ?? []
  } catch { /* fall through */ }

  const sanityPostsWithoutMigrated = sanityPosts.filter((p) => !STATIC_BLOG_SLUGS.has(p.slug))
  const staticPosts = STATIC_BLOG_POSTS.map(({ content, seo, ...post }) => post)

  return [...staticPosts, ...sanityPostsWithoutMigrated]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
}

export const metadata = {
  title: 'Blog',
  description: 'Tactical writing on SEO, paid social, AI UGC, and landing-page copy for prop firms — by Contego.',
}

export default async function BlogIndex() {
  const allPosts = await getAllPosts()

  return (
    <>
      <Navbar />
      <main>
        <BlogIndexClient allPosts={allPosts} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
