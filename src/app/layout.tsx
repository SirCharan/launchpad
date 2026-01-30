import type {Metadata} from 'next';
import {Orbitron, Creepster} from 'next/font/google';
import {Navbar, Footer} from '~/components/layout';
import './globals.css';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const creepster = Creepster({
  variable: '--font-creepster',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'fuckpump — Uniswap CCA',
  description:
    'Continuous Clearing Auctions. Discover auctions, place bids, and claim tokens. DeFi native, fully onchain.',
  keywords: ['fuckpump', 'CCA', 'Uniswap', 'auction', 'token', 'defi', 'onchain'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${creepster.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
