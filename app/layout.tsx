import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Let’s Buy It Together | Better local prices, together',
  description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
  openGraph: {
    title: 'Better local prices, together.',
    description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Let’s Buy It Together — Better local prices, together.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better local prices, together.',
    description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
