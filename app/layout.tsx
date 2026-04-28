import type { Metadata } from 'next'
import { Manrope, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Temirlan Turdugulov — Frontend Developer',
  description:
    'Frontend developer crafting modern, performant, and accessible web experiences with React, Next.js, and TypeScript.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Temirlan Turdugulov'],
  authors: [{ name: 'Temirlan Turdugulov' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://temirlan.dev',
    title: 'Temirlan Turdugulov — Frontend Developer',
    description:
      'Frontend developer crafting modern, performant, and accessible web experiences.',
    siteName: 'Temirlan Turdugulov',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temirlan Turdugulov — Frontend Developer',
    description:
      'Frontend developer crafting modern, performant, and accessible web experiences.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
