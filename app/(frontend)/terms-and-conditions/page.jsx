import { LegalPage } from '../LegalPage'
import { termsAndConditions } from '../legalContent'

export const metadata = {
  title: 'Terms and Conditions',
  description: 'The rules for using Contego’s website, contacting us, requesting services, and working with us.',
  alternates: { canonical: '/terms-and-conditions' },
}

export default function TermsAndConditionsPage() {
  return <LegalPage content={termsAndConditions} />
}
