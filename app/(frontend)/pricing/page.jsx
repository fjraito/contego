'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { PricingHero } from '@/components/PricingHero'
import { TierGrid } from '@/components/TierGrid'
import { CompareTable } from '@/components/CompareTable'
import { ROICalculator } from '@/components/ROICalculator'
import { AddOns } from '@/components/AddOns'
import { PricingQuote } from '@/components/PricingQuote'
import { PricingFAQ } from '@/components/PricingFAQ'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly')

  return (
    <>
      <Navbar />
      <main>
        <PricingHero billing={billing} setBilling={setBilling} />
        <TierGrid billing={billing} />
        <CompareTable />
        <ROICalculator billing={billing} />
        <AddOns />
        <PricingQuote />
        <PricingFAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
