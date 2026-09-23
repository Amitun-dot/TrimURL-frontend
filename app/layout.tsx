// @ts-ignore Next.js processes global CSS imports at build time.

import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TrimURL — Shorten Links. Share Faster.',
  description:
    'TrimURL makes long URLs short, clean, and easy to share.',
  verification: {
    google: 'cxqRCelX5B9T_IIwqWeSM6xdfMQLM5zb_bL1VzFKK7I',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'TrimURL — Shorten Links. Share Faster.',
    description: 'TrimURL makes long URLs short, clean, and easy to share.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'TrimURL — Shorten Links. Share Faster.',
    description: 'TrimURL makes long URLs short, clean, and easy to share.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}