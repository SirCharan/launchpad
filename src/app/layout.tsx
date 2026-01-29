import type {Metadata} from 'next';
import {Geist, JetBrains_Mono} from 'next/font/google';
import {Navbar, Footer} from '~/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'fuckpump.fun — Launch. No mercy.',
  description:
    'Memecoin launchpad. Continuous clearing auctions. No snipers, no mercy. Pump or get rekt.',
  keywords: [
    'memecoin',
    'launchpad',
    'fuckpump',
    'fair launch',
    'cca',
    'uniswap v4',
    'token launch',
    'auction',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <div className="relative flex min-h-screen flex-col glitch-container">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
