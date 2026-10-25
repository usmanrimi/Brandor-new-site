import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Baloo_2, Inter, Space_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-baloo',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  themeColor: '#173b61',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Brandor Creative Agency | Your Ultimate Branding Door",
  description: "Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.",
  keywords: ["branding", "creative agency", "media production", "NGO documentation", "Kano", "Nigeria", "Africa development documentation"],
  metadataBase: new URL('https://www.brandor.com.ng'),
  openGraph: {
    title: "Brandor Creative Agency | Your Ultimate Branding Door",
    description: "Creative media, strategic storytelling, and impact documentation agency.",
    type: "website",
    locale: "en_US",
    url: 'https://www.brandor.com.ng',
    siteName: 'Brandor Creative Agency',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        <CustomCursor />
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
