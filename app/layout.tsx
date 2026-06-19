import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Brandor | Your Ultimate Branding Door",
  description: "Brandor is a creative media and branding team helping NGOs, institutions, and businesses across Africa document their work, capture their impact, and build a brand worth remembering.",
  keywords: ["branding", "creative agency", "media production", "NGO documentation", "Kano", "Nigeria"],
  openGraph: {
    title: "Brandor | Your Ultimate Branding Door",
    description: "Creative media and branding team in Kano, Nigeria.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        {/* GSAP dependencies for later */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async></script>
        <script src="https://unpkg.com/split-type" async></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
