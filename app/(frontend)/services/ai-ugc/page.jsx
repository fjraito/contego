import { ServicePageClient } from '@/components/ServicePageClient'

export const metadata = {
  title: 'AI UGC Video',
  description: 'AI-generated vertical creator videos at scale — test 50 hooks a week without paying 50 creators or waiting on shoots.',
}

export default function AIUGCPage() {
  return <ServicePageClient slug="ugc" />
}
