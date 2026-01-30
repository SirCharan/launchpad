import Link from 'next/link';
import {
  ArrowRight,
  Flame,
  Zap,
  FileText,
  Coins,
  Zap as ZapIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Container} from '~/components/layout';

const TAGLINES = [
  'swap tokens',
  'provide liquidity',
  'launch with CCA',
  'zero app fees',
  'trade across 13+ networks',
  'Uniswap V4',
];

const steps = [
  {
    num: 1,
    title: 'Create',
    desc: 'Set token details and supply. Configure your CCA auction.',
    icon: Coins,
  },
  {
    num: 2,
    title: 'Launch',
    desc: 'CCA runs. Bidders participate. Fair price discovery.',
    icon: ZapIcon,
  },
  {
    num: 3,
    title: 'Trade',
    desc: 'Uniswap V4 pool goes live at the discovered clearing price.',
    icon: Flame,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero — Unilaunch */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6 uppercase tracking-wider">
              <Zap className="h-3 w-3" />
              Uniswap V4 CCA
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
              Unilaunch —{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Swap, Pool, Launch
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-muted-foreground text-lg">
              Swap tokens. Provide liquidity. Launch with CCA. Zero app fees.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/launch">
                <Button size="lg" className="gap-2 font-medium">
                  <Flame className="h-4 w-4" />
                  Launch token
                </Button>
              </Link>
              <Link href="/#manifesto">
                <Button variant="outline" size="lg" className="gap-2">
                  <FileText className="h-4 w-4" />
                  How it works
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="gap-2">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Tagline strip */}
      <section className="py-4 border-y border-border/60 bg-muted/30">
        <Container size="md">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground">
            {TAGLINES.map((line, i) => (
              <span key={i}>
                {i > 0 && <span className="text-border mx-1">—</span>}
                {line}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="manifesto" className="py-12 md:py-20 border-b border-border">
        <Container size="md">
          <h2 className="text-center text-xl font-bold mb-6 tracking-tight">
            How Unilaunch works
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground text-center">
            <p className="text-base md:text-lg leading-relaxed">
              Unilaunch is a token launchpad. Swap tokens, provide liquidity,
              and launch new tokens via CCA (Continuous Clearing Auction) on
              Uniswap V4.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <strong className="text-foreground">Swap:</strong> Trade tokens
                across 13+ networks with zero app fees.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <strong className="text-foreground">Pool:</strong> Provide
                liquidity and earn fees.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <strong className="text-foreground">Launch:</strong> Fair price
                discovery with CCA; V4 pool at clearing price.
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-b border-border bg-muted/20">
        <Container size="md">
          <h2 className="text-center text-lg font-semibold mb-4 tracking-tight">
            How it works
          </h2>
          <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-10">
            Create your token, configure the CCA auction, and launch. When the
            auction ends, a Uniswap V4 pool is created at the discovered price.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/30 text-primary font-bold font-mono mb-3">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-3 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Live Auctions Preview */}
      <section className="py-12 md:py-16 border-b border-border">
        <Container size="md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="font-semibold tracking-tight">
                Live token auctions
              </h2>
            </div>
            <Link href="/discover?phase=live">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary font-mono">
                      PR
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pepe Rising</p>
                      <p className="text-xs text-muted-foreground">PRISE</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium font-mono border border-primary/30">
                    LIVE
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full w-1/4 bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>47 bidders</span>
                  <span>12.5 ETH raised</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary font-mono">
                      MM
                    </div>
                    <div>
                      <p className="font-medium text-sm">Moon Mission</p>
                      <p className="text-xs text-muted-foreground">MMIS</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium font-mono border border-primary/30">
                    LIVE
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full w-1/2 bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>156 bidders</span>
                  <span>48.0 ETH raised</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <Container size="sm">
          <Card className="border-primary/20 border-accent/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="flex flex-col items-center text-center py-10">
              <Flame className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-xl font-bold tracking-tight">
                Ready to launch?
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Launch your token with Unilaunch. Fair price discovery, then
                trade on V4.
              </p>
              <Link href="/launch" className="mt-6">
                <Button className="gap-2 font-medium">
                  <Flame className="h-4 w-4" />
                  Launch token
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
