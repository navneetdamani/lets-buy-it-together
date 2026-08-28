import type { Metadata } from 'next';
import './globals.css';
import './communities.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lets-buy-it-together-katy.chitra-daman-0792.chatgpt.site'),
  title: 'Let’s Buy It Together | Better local prices, together',
  description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
  openGraph: {
    title: 'Better local prices, together.',
    description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
    images: [{ url: 'https://lets-buy-it-together-katy.chitra-daman-0792.chatgpt.site/og.png', width: 1200, height: 630, alt: 'Let’s Buy It Together — Better local prices, together.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better local prices, together.',
    description: 'Join Katy neighbors to unlock better group prices on trusted local home services.',
    images: ['https://lets-buy-it-together-katy.chitra-daman-0792.chatgpt.site/og.png'],
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
