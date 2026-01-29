'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, Rocket, Wallet} from 'lucide-react';
import {useState} from 'react';
import {Button} from '~/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '~/components/ui/sheet';
import {cn} from '~/lib/utils';

const NAV_LINKS = [
  {href: '/discover', label: 'Discover'},
  {href: '/launch', label: 'Launch'},
];

interface NavbarProps {
  onConnectWallet?: () => void;
  isConnected?: boolean;
  address?: string;
}

export function Navbar({onConnectWallet, isConnected, address}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Rocket className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold hidden sm:block">Timelock</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet Button */}
        <div className="hidden md:flex items-center">
          <Button
            variant={isConnected ? 'outline' : 'default'}
            size="sm"
            onClick={onConnectWallet}
            className="gap-1.5 h-8"
          >
            <Wallet className="h-3.5 w-3.5" />
            {isConnected ? truncatedAddress : 'Connect'}
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
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-md font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button
                variant={isConnected ? 'outline' : 'default'}
                onClick={onConnectWallet}
                className="gap-2 w-full mt-2"
              >
                <Wallet className="h-4 w-4" />
                {isConnected ? truncatedAddress : 'Connect Wallet'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
