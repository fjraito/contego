import { groq } from 'next-sanity'

const IMAGE_FRAGMENT = `
  "url": asset->url,
  "alt": coalesce(alt, "")
`

export const BLOG_POSTS_QUERY = groq`{
  "posts": *[_type == "blogPost" && status == "published" $categoryFilter] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    "featuredImage": featuredImage { ${IMAGE_FRAGMENT} }
  },
  "total": count(*[_type == "blogPost" && status == "published" $categoryFilter])
}`

export const BLOG_POST_QUERY = groq`*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  publishedAt,
  _updatedAt,
  author,
  editedBy,
  factCheckedBy,
  "featuredImage": featuredImage { ${IMAGE_FRAGMENT} },
  seo
}`

export const RELATED_POSTS_QUERY = groq`*[_type == "blogPost" && status == "published" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "featuredImage": featuredImage { ${IMAGE_FRAGMENT} }
}`
