import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brandor | Premium Media Documentation Agency',
  description: 'A leading media documentation and storytelling agency specializing in development projects, NGO programs, and community initiatives.',
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
