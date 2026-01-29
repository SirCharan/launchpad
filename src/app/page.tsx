import Link from 'next/link';
import {
  ArrowRight,
  Flame,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Skull,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Container} from '~/components/layout';

const features = [
  {
    icon: Shield,
    title: 'No Snipers',
    description: 'Continuous clearing. Early bidders get better prices. Fair or rekt.',
  },
  {
    icon: Users,
    title: 'No Mercy',
    description: 'Everyone bids. Price discovers itself. No insiders, no front-running.',
  },
  {
    icon: Zap,
    title: 'V4 Pool at the End',
    description: 'Auction ends, Uniswap V4 pool goes live. Trade or hold the bag.',
  },
];

const steps = [
  {num: 1, title: 'Create', desc: 'Token + auction params. No coding.'},
  {num: 2, title: 'Launch', desc: 'CCA starts. Bidders pile in.'},
  {num: 3, title: 'Trade', desc: 'V4 pool live. Pump or dump.'},
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-chart-1/15 blur-3xl" />
        </div>

        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6 font-mono">
              <Zap className="h-3 w-3" />
              Uniswap V4 CCA
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl font-mono">
              Pump or{' '}
              <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                get rekt
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-muted-foreground">
              Launch memecoins with continuous clearing auctions. No snipers. No mercy.
              Fair price discovery or you eat the loss.
            </p>

            <div className="mt-8 flex gap-3">
              <Link href="/launch">
                <Button size="lg" className="gap-2 font-medium">
                  <Flame className="h-4 w-4" />
                  Launch Token
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="gap-2">
                  Discover
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-y border-border bg-muted/20">
        <Container size="md">
          <h2 className="text-center text-lg font-semibold mb-8 font-mono">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold font-mono mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold font-mono">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-5 -right-3 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map(feature => (
              <Card key={feature.title} className="border-border/50 bg-card/50">
                <CardContent className="p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm font-mono">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Live Auctions Preview */}
      <section className="py-12 md:py-16 border-t border-border">
        <Container size="md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="font-semibold font-mono">Live Auctions</h2>
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
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="flex flex-col items-center text-center py-10">
              <Skull className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-xl font-bold font-mono">Ready to launch?</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Create a fair launch. No coding. No mercy.
              </p>
              <Link href="/launch" className="mt-6">
                <Button className="gap-2 font-medium">
                  <Flame className="h-4 w-4" />
                  Start Your Auction
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
