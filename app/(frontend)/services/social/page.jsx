import { ServicePageClient } from '@/components/ServicePageClient'

export const metadata = {
  title: 'Social Media Management',
  description: 'Daily posting, community ops, and creator-grade content across Twitter, IG, TikTok, and YouTube — built to convert traders, not to look busy.',
}

export default function SocialPage() {
  return <ServicePageClient slug="social" />
}
