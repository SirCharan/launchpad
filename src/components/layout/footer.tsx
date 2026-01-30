import Link from 'next/link';
import {Rocket} from 'lucide-react';
import {Separator} from '~/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-black/90">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand — fuckpump */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">fuckpump</span>
            </Link>
          </div>

          {/* Links — Discover / Launch, normal English */}
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/discover" className="hover:text-primary transition-colors" title="Browse tokens and auctions">
              Discover
            </Link>
            <Link href="/launch" className="hover:text-primary transition-colors" title="Start a token auction">
              Launch
            </Link>
          </nav>
        </div>

        <Separator className="my-8 border-primary/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} fuckpump.</p>
        </div>
      </div>
    </footer>
  );
}
