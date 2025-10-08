import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const newsreader = Newsreader({ 
  subsets: ['latin'],
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  title: 'Vibe-Coded Best Of',
  description: 'The best vibe-coded builds, in one place. Discover standout projects from makers using every tool under the sun.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}