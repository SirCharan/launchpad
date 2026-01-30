import Link from 'next/link';
import {ArrowRight, Coins, Layers, TrendingUp, Zap} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Container} from '~/components/layout';

/* CCA value props — fuckpump copy from docs */
const features = [
  {
    icon: Zap,
    title: 'Customizable parameters',
    description:
      'Define supply, duration, and participation rules.',
  },
  {
    icon: Layers,
    title: 'Fully onchain & transparent',
    description: 'Transparent, auditable process.',
  },
  {
    icon: Coins,
    title: 'Market-driven pricing',
    description: 'Fair price discovery rooted in the market.',
  },
  {
    icon: TrendingUp,
    title: 'Liquidity from day one',
    description:
      'Uniswap v4 pool at the discovered price; trade from the start.',
  },
];

/* How it works — CCA three steps */
const steps = [
  {
    num: 1,
    title: 'Commit supply',
    description:
      'Commit token supply to a public auction; set duration and floor price.',
  },
  {
    num: 2,
    title: 'Price discovery',
    description: 'Bidders place orders; each block clears at market price.',
  },
  {
    num: 3,
    title: 'Long-term liquidity',
    description:
      'Tokens distributed; Uniswap v4 pool created at discovered price.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — CCA-aligned copy */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <a
              href="https://cca.uniswap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary mb-4 font-[family-name:var(--font-creepster)] hover:border-primary/50 transition-colors"
              title="Continuous Clearing Auctions"
            >
              Uniswap CCA · Continuous Clearing Auctions
            </a>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl uppercase">
              THE PILL WEARS THE CROWN.
            </h1>

            <p className="mt-4 font-medium text-muted-foreground max-w-xl font-[family-name:var(--font-creepster)]">
              DeFi native. Fully onchain. Open participation. Transparent price discovery.
            </p>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Discover auctions, place bids, and claim tokens.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/launch">
                <Button size="lg" className="gap-2 font-bold" title="Start a new token auction">
                  Launch
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="gap-2 font-semibold" title="Browse tokens and live auctions">
                  Discover
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works — CCA three steps */}
      <section className="py-12 md:py-16 border-y border-border bg-muted/10">
        <Container size="md">
          <h2 className="text-center text-lg font-semibold mb-8 text-muted-foreground font-[family-name:var(--font-creepster)]">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-5 -right-4 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Value props / feature cards — CCA */}
      <section className="py-12 md:py-16">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(feature => (
              <Card
                key={feature.title}
                className="border-border/50 bg-card/50 hover:border-primary/40 hover:shadow-[0_4px_12px_rgba(220,20,60,0.15)] hover:-translate-y-0.5 transition-all duration-150"
              >
                <CardContent className="p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Live Auctions */}
      <section className="py-12 md:py-16 border-t border-border">
        <Container size="md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="font-semibold font-[family-name:var(--font-creepster)]">
                Live Auctions
              </h2>
            </div>
            <Link href="/discover?phase=live">
              <Button variant="ghost" size="sm" className="gap-1 text-xs" title="See all auctions">
                View all
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Auctions currently accepting bids</p>

          {/* Placeholder for live auctions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      PR
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pepe Rising</p>
                      <p className="text-xs text-muted-foreground">PRISE</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium uppercase font-[family-name:var(--font-creepster)]">
                    Live
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

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      MM
                    </div>
                    <div>
                      <p className="font-medium text-sm">Moon Mission</p>
                      <p className="text-xs text-muted-foreground">MMIS</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium uppercase font-[family-name:var(--font-creepster)]">
                    Live
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

      {/* CTA — Move your token distribution onchain */}
      <section className="py-12 md:py-16">
        <Container size="sm">
          <Card className="border-primary/20 bg-card/80 hover:border-primary/40 hover:shadow-[0_4px_12px_rgba(220,20,60,0.15)] transition-all duration-200">
            <CardContent className="flex flex-col items-center text-center py-10">
              <h2 className="text-xl font-bold">Ready?</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm font-[family-name:var(--font-creepster)]">
                3… 2… 1…
              </p>
              <p className="text-xs text-muted-foreground mt-1">Launch your token in minutes.</p>
              <Link href="/launch" className="mt-6">
                <Button className="gap-2 font-bold" title="Start your auction">
                  Launch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
