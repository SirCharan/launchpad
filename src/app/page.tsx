import Link from 'next/link';
import {
  ArrowRight,
  Flame,
  Zap,
  FileText,
  Coins,
  BookOpen,
  Zap as ZapIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Container} from '~/components/layout';

// Per UNISWAP_REDESIGN_PROMPT.md: Hero "Unilaunch — Swap, provide liquidity, and launch tokens."; CTAs: Launch token, Swap, Explore, Docs
const TAGLINES = [
  'Swap tokens',
  'Provide liquidity',
  'Launch tokens',
  'Zero app fees',
  'Uniswap V4 CCA',
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
      {/* Hero — per MD: "Unilaunch — Swap, provide liquidity, and launch tokens." + CTAs: Launch token, Swap, Explore, Docs */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary mb-8 uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5" />
              Uniswap V4 CCA
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl">
              Unilaunch —{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Swap, provide liquidity, and launch tokens.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-muted-foreground text-lg md:text-xl">
              Trade across 13+ networks with zero app fees. Launch new tokens with fair price discovery via CCA.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/launch">
                <Button size="lg" className="gap-2 font-medium rounded-xl">
                  <Flame className="h-4 w-4" />
                  Launch token
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="default" size="lg" className="gap-2 font-medium rounded-xl bg-primary/90 hover:bg-primary">
                  Swap
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#manifesto">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                  <FileText className="h-4 w-4" />
                  How it works
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Tagline strip — professional DeFi tone per MD */}
      <section className="py-5 border-y border-border bg-muted/40">
        <Container size="md">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {TAGLINES.map((line, i) => (
              <span key={i}>
                {i > 0 && <span className="text-border mx-1">·</span>}
                {line}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* About — per MD: Unilaunch branding, professional DeFi tone */}
      <section id="manifesto" className="py-16 md:py-24 border-b border-border">
        <Container size="md">
          <h2 className="text-center text-2xl font-bold mb-8 tracking-tight">
            How Unilaunch works
          </h2>
          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Unilaunch is a token launchpad. Swap tokens, provide liquidity, and launch new tokens via CCA (Continuous Clearing Auction) on Uniswap V4.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="rounded-xl border-border bg-card">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Swap</h3>
                <p className="text-sm text-muted-foreground">Trade tokens across 13+ networks with zero app fees.</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-border bg-card">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Coins className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Pool</h3>
                <p className="text-sm text-muted-foreground">Provide liquidity and earn fees.</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-border bg-card">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Launch</h3>
                <p className="text-sm text-muted-foreground">Fair price discovery with CCA; V4 pool at clearing price.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* How it works — MD: border radius 0.75rem–1rem, semantic colors */}
      <section className="py-16 md:py-20 border-b border-border bg-muted/20">
        <Container size="md">
          <h2 className="text-center text-2xl font-bold mb-4 tracking-tight">
            Create, launch, trade
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Create your token, configure the CCA auction, and launch. When the auction ends, a Uniswap V4 pool is created at the discovered price.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-7 -right-4 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Live token auctions — MD: card radius, semantic colors */}
      <section className="py-16 md:py-20 border-b border-border">
        <Container size="md">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xl font-bold tracking-tight">
                Live token auctions
              </h2>
            </div>
            <Link href="/discover?phase=live">
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-primary hover:text-primary hover:bg-primary/10">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="rounded-xl border-border bg-card hover:border-primary/20 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      PR
                    </div>
                    <div>
                      <p className="font-medium">Pepe Rising</p>
                      <p className="text-xs text-muted-foreground">PRISE</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">
                    LIVE
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                  <div className="h-full w-1/4 bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>47 bidders</span>
                  <span>12.5 ETH raised</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-border bg-card hover:border-primary/20 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      MM
                    </div>
                    <div>
                      <p className="font-medium">Moon Mission</p>
                      <p className="text-xs text-muted-foreground">MMIS</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">
                    LIVE
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
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

      {/* CTA — per MD: primary pink CTA, professional tone */}
      <section className="py-16 md:py-24">
        <Container size="sm">
          <Card className="rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="flex flex-col items-center text-center py-14 px-6">
              <Flame className="h-10 w-10 text-primary mb-5" />
              <h2 className="text-2xl font-bold tracking-tight">
                Ready to launch?
              </h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                Launch your token with Unilaunch. Fair price discovery via CCA, then trade on Uniswap V4.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/launch">
                  <Button size="lg" className="gap-2 font-medium rounded-xl">
                    <Flame className="h-4 w-4" />
                    Launch token
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                    Explore tokens
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
