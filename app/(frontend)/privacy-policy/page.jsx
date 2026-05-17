import { LegalPage } from '../LegalPage'
import { privacyPolicy } from '../legalContent'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Contego collects, uses, shares, and protects personal information.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />
}
