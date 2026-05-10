import { notFound } from 'next/navigation'
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
      <main className="blog-post">
        <article>
          <header className="blog-post__header">
            <span className="blog-post__category">{post.category}</span>
            <h1 className="blog-post__title">{post.title}</h1>
            {post.excerpt && <p className="blog-post__excerpt">{post.excerpt}</p>}
            {publishedDate && (
              <time className="blog-post__date" dateTime={post.publishedAt}>
                {publishedDate}
              </time>
            )}
          </header>

          {post.featuredImage?.url && (
            <div className="blog-post__image">
              <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} />
            </div>
          )}

          <div className="blog-post__content">
            <RichTextRenderer content={post.content} />
          </div>
        </article>
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
    return <p key={key}>{node.children.map((child, i) => renderLeaf(child, i))}</p>
  }
  if (node.type === 'heading') {
    const Tag = node.tag || 'h2'
    return <Tag key={key}>{node.children?.map((child, i) => renderLeaf(child, i))}</Tag>
  }
  if (node.type === 'list') {
    const Tag = node.listType === 'number' ? 'ol' : 'ul'
    return (
      <Tag key={key}>
        {node.children?.map((item, i) => (
          <li key={i}>{item.children?.map((child, j) => renderLeaf(child, j))}</li>
        ))}
      </Tag>
    )
  }
  if (node.type === 'quote') {
    return (
      <blockquote key={key}>
        {node.children?.map((child, i) => renderLeaf(child, i))}
      </blockquote>
    )
  }
  return null
}

function renderLeaf(leaf, key) {
  if (leaf.type === 'linebreak') return <br key={key} />
  let text = leaf.text || ''
  if (!text) return null
  if (leaf.bold) text = <strong key={key}>{text}</strong>
  if (leaf.italic) text = <em key={key}>{text}</em>
  if (leaf.underline) text = <u key={key}>{text}</u>
  if (leaf.code) text = <code key={key}>{text}</code>
  return <span key={key}>{text}</span>
}
