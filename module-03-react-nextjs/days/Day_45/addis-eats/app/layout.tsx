import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/context/Providers';
import Navbar from '@/components/Navbar'; // Import Navbar component

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Addis Eats',
    default: 'Addis Eats · Authentic Ethiopian Food Delivery',
  },
  description: 'Order fresh Doro Wat, Tibs, and Kitfo online from top kitchens across Addis Ababa.',
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    siteName: 'Addis Eats',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}