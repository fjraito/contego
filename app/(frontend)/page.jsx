import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ClientMarquee } from '@/components/ClientMarquee'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { Pricing } from '@/components/Pricing'
import { Blog } from '@/components/Blog'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { client } from '@/sanity/lib/client'

const LATEST_POSTS_QUERY = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "featuredImage": featuredImage { "url": asset->url, "alt": coalesce(alt, "") }
}`

async function getLatestPosts() {
  try {
    return await client.fetch(LATEST_POSTS_QUERY, {}, { next: { revalidate: 60 } })
  } catch {
    return []
  }
}

export default async function Home() {
  const posts = await getLatestPosts()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <Services />
        <Process />
        <Pricing />
        <Blog posts={posts} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
