import { groq } from 'next-sanity'

const IMAGE_FRAGMENT = `
  "url": coalesce(asset->url, ^.featuredImageUrl),
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

export const ALTERNATIVE_SLUGS_QUERY = groq`*[_type == "alternative" && defined(slug.current)] { "slug": slug.current }`

export const ALTERNATIVE_QUERY = groq`*[_type == "alternative" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  status,
  competitorName,
  competitorShort,
  competitorInitials,
  competitorLogo,
  competitorUrl,
  featureTable[] {
    _key,
    sectionName,
    rows[] {
      _key,
      label,
      contego,
      competitor
    }
  },
  verdictIntro,
  pickContego,
  pickThem,
  faqItems[] { q, a },
  seo
}`

export const ALTERNATIVES_LIST_QUERY = groq`*[_type == "alternative" && status == "published"] | order(competitorName asc) {
  _id,
  "slug": slug.current,
  competitorName,
  competitorShort,
  competitorInitials,
  competitorLogo
}`

// ── Prop Firms ──

export const PROP_FIRMS_LIST_QUERY = groq`*[_type == "propFirm" && status == "published"] | order(rank asc) {
  _id,
  "slug": slug.current,
  name,
  initials,
  rank,
  editorPick,
  tagline,
  rating,
  reviews,
  tags,
  stats,
  promo
}`

export const PROP_FIRM_QUERY = groq`*[_type == "propFirm" && slug.current == $slug && status == "published"][0] {
  _id,
  "slug": slug.current,
  name,
  initials,
  domain,
  url,
  category,
  founded,
  hq,
  rating,
  reviews,
  trustScore,
  rank,
  editorPick,
  tagline,
  oneLine,
  tags,
  stats,
  highlights,
  scoreBreakdown,
  promo,
  pros,
  cons,
  tiers,
  rules,
  platforms,
  instruments,
  payoutMethods,
  payoutDetails,
  faq,
  seo
}`

export const PROP_FIRM_SLUGS_QUERY = groq`*[_type == "propFirm" && defined(slug.current)] { "slug": slug.current }`
