import { LegalPage } from '../LegalPage'
import { disclaimer } from '../legalContent'

export const metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers about Contego’s website, content, services, marketing materials, and AI-assisted workflows.',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return <LegalPage content={disclaimer} />
}
