import type { Metadata } from 'next';
import { Bangers, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MobileBottomBar } from '@/components/MobileBottomBar';

const fontDisplay = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display'
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vintage-mania.example'),
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description
  },
  icons: {
    icon: [
      { url: '/logo-badge.svg', type: 'image/svg+xml' },
      { url: '/logo-vintage-mania.png', type: 'image/png' }
    ]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="min-h-dvh bg-ink text-bone font-body">
        <div className="min-h-dvh flex flex-col paper grain">
          <Header />
          <main className="flex-1 pb-24 md:pb-0">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomBar />
        </div>
      </body>
    </html>
  );
}
