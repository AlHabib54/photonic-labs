import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { LanguageProvider } from '@/components/site/language-context';
import { SearchOpenProvider, useSearchOpen } from '@/components/site/search-open';
import { SearchDialog } from '@/components/site/search-dialog';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Photonic Labs — Exploring the Future of Photonic Computing',
    template: '%s · Photonic Labs',
  },
  description:
    'Photonic Labs is an independent research laboratory advancing Photonic Computing, Optical Processors, Artificial Intelligence, Advanced Algorithms, Cybersecurity, and IT Innovation.',
  keywords: [
    'Photonic Computing',
    'Optical Processors',
    'Photonic CPU',
    'Artificial Intelligence',
    'Cybersecurity',
    'Advanced Algorithms',
    'Research Laboratory',
  ],
  authors: [{ name: 'Photonic Labs' }],
  openGraph: {
    title: 'Photonic Labs',
    description: 'Exploring the Future of Photonic Computing and Advanced Computational Systems.',
    type: 'website',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photonic Labs',
    description: 'Exploring the Future of Photonic Computing and Advanced Computational Systems.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <SearchOpenProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <SearchDialog />
            <Toaster />
          </SearchOpenProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
