import { Inter } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Cursor } from '@/components/Cursor'
import { BgStage } from '@/components/BgStage'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://contegoagency.com'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Contego | Prop Firm Marketing Agency',
    template: '%s | Contego',
  },
  description: 'Contego helps prop firms grow through SEO, social media, and AI UGC video systems built to attract traders, explain your offer clearly, and protect brand trust.',
  openGraph: {
    type: 'website',
    siteName: 'Contego',
    locale: 'en_US',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Contego — Prop Firm Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@contegoagency',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <ThemeProvider>
          <Cursor />
          <BgStage />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
