import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import {Navbar, Footer} from '~/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LaunchPad - Memecoin Launchpad',
  description:
    'The premier platform for launching and trading memecoins. Create, launch, and trade tokens with ease.',
  keywords: ['memecoin', 'launchpad', 'crypto', 'defi', 'token'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
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
