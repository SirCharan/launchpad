import Link from 'next/link';
import {Layers} from 'lucide-react';
import {Separator} from '~/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Unilaunch
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Swap, provide liquidity, and launch tokens. Trade across 13+
              networks with zero app fees.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 tracking-tight">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/discover" className="hover:text-foreground transition-colors">
                  Swap
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-foreground transition-colors">
                  Pool
                </Link>
              </li>
              <li>
                <Link href="/launch" className="hover:text-foreground transition-colors">
                  Launch
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 tracking-tight">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 tracking-tight">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} Unilaunch. Not financial advice.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
