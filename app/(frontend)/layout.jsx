import { Inter } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Cursor } from '@/components/Cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata = {
  title: 'Contego | Prop Firm Marketing Agency',
  description: 'Contego helps prop firms grow through SEO, social media, and AI UGC video systems built to attract traders, explain your offer clearly, and protect brand trust.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
