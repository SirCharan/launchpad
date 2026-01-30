'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, Layers, Wallet, Sun, Moon} from 'lucide-react';

function isDiscoverPath(href: string, pathname: string) {
  return href.startsWith('/discover') && pathname === '/discover';
}
import {useState, useEffect} from 'react';
import {Button} from '~/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '~/components/ui/sheet';
import {cn} from '~/lib/utils';

const THEME_KEY = 'launchpad-theme';
type Theme = 'dark' | 'light';

const NAV_LINKS = [
  {href: '/discover', label: 'Swap'},
  {href: '/discover?tab=pool', label: 'Pool'},
  {href: '/launch', label: 'Launch'},
];

interface NavbarProps {
  onConnectWallet?: () => void;
  isConnected?: boolean;
  address?: string;
}

function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') setThemeState(stored);
    else setThemeState('dark');
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    if (next === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  };

  return { theme, setTheme, mounted };
}

export function Navbar({onConnectWallet, isConnected, address}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, mounted } = useTheme();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary primary-glow-pulse">
            <Layers className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold hidden sm:block tracking-tight">Unilaunch</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href || isDiscoverPath(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme + Wallet */}
        <div className="hidden md:flex items-center gap-2">
          {mounted && (
            <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                  theme === 'dark' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Dark theme"
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                  theme === 'light' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Light theme"
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
            </div>
          )}
          <Button
            variant={isConnected ? 'outline' : 'default'}
            size="sm"
            onClick={onConnectWallet}
            className="gap-1.5 h-8"
          >
            <Wallet className="h-3.5 w-3.5" />
            {isConnected ? truncatedAddress : 'Connect wallet'}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px]">
            <div className="flex flex-col gap-4 pt-6">
              {mounted && (
                <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors',
                      theme === 'dark' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                    )}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors',
                      theme === 'light' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                    )}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </button>
                </div>
              )}
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(link => {
                  const isActive = pathname === link.href || isDiscoverPath(link.href, pathname);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'px-3 py-2 rounded-md font-medium transition-colors',
                        isActive
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <Button
                variant={isConnected ? 'outline' : 'default'}
                onClick={onConnectWallet}
                className="gap-2 w-full mt-2"
              >
                <Wallet className="h-4 w-4" />
                {isConnected ? truncatedAddress : 'Connect wallet'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
