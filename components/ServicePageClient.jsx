'use client'

import { Navbar } from '@/components/Navbar'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { SERVICE_DATA } from '@/components/services-data'
import {
  ServiceHero,
  ServiceIncludes,
  ServiceHow,
  ServiceCompare,
  ServiceStartsAt,
  ServiceFAQ,
} from '@/components/ServiceSections'

export function ServicePageClient({ slug }) {
  const d = SERVICE_DATA[slug]
  if (!d) return null

  return (
    <>
      <Navbar />
      <main>
        <ServiceHero d={d} />
        <ServiceIncludes d={d} />
        <ServiceHow d={d} />
        <ServiceCompare d={d} />
        <ServiceStartsAt d={d} />
        <ServiceFAQ d={d} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
