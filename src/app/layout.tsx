import type {Metadata} from 'next';
import Script from 'next/script';
import {Inter, JetBrains_Mono} from 'next/font/google';
import {Navbar, Footer} from '~/components/layout';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Unilaunch — Swap, Pool, Launch',
  description:
    'Swap tokens, provide liquidity, and launch tokens with Unilaunch. Trade across 13+ networks with zero app fees. CCA token launch on Uniswap V4.',
  keywords: [
    'unilaunch',
    'swap',
    'pool',
    'launch',
    'defi',
    'cca',
    'uniswap v4',
    'token launch',
    'auction',
    'liquidity',
  ],
};

const THEME_KEY = 'launchpad-theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var t=localStorage.getItem('${THEME_KEY}');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}})();`}
        </Script>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
