'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  MessageCircle,
  Share2,
  Twitter,
  Copy,
  Check,
} from 'lucide-react';
import {Container} from '~/components/layout';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Skeleton} from '~/components/ui/skeleton';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {
  PhaseBadge,
  AuctionProgress,
  AuctionStats,
  BidCard,
} from '~/components/auction';
import {SwapCard, TradeHistory, PriceChart} from '~/components/trading';
import {fetchToken, fetchTrades} from '~/lib/mock-data';
import {cn} from '~/lib/utils';
import type {TokenWithStats, Trade, UserBid} from '~/types';

export default function TokenPage() {
  const params = useParams();
  const address = params.address as string;

  const [token, setToken] = useState<TokenWithStats | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Placeholder states
  const [isConnected] = useState(false);
  const [userBid] = useState<UserBid | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [tokenData, tradesData] = await Promise.all([
          fetchToken(address),
          fetchTrades(address),
        ]);
        setToken(tokenData);
        setTrades(tradesData);
      } catch (error) {
        console.error('Failed to fetch token data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [address]);

  const handleConnectWallet = () => {
    // TODO: Implement wallet connection
    console.log('Connect wallet');
  };

  const handleSwap = (type: 'buy' | 'sell', amount: string) => {
    // TODO: Implement swap
    console.log('Swap:', type, amount);
  };

  const handlePlaceBid = (maxPrice: string, budget: string) => {
    // TODO: Implement bid placement
    console.log('Place bid:', maxPrice, budget);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="py-6 md:py-8">
        <Container>
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-[300px]" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px]" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="py-6 md:py-8">
        <Container>
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-xl font-bold">Token not found</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              This token doesn&apos;t exist or the address is invalid.
            </p>
            <Link href="/discover" className="mt-4">
              <Button>Back to Tokens</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const phase = token.auctionState?.phase || 'completed';
  const isAuctionActive =
    phase === 'live' || phase === 'upcoming' || phase === 'settling';

  return (
    <div className="py-6 md:py-8">
      <Container>
        {/* Back button */}
        <Link href="/discover" className="inline-block mb-4">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 h-8">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Token Header */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-xl">
                      <AvatarImage src={token.logoUrl} alt={token.name} />
                      <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold">
                        {token.symbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="font-bold text-lg">{token.name}</h1>
                        <PhaseBadge phase={phase} size="sm" />
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm text-muted-foreground">
                          {token.symbol}
                        </span>
                        <button
                          onClick={copyAddress}
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                          {address.slice(0, 6)}...{address.slice(-4)}
                          {copied ? (
                            <Check className="h-3 w-3 text-primary" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {token.metadata?.website && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a
                          href={token.metadata.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {token.metadata?.twitter && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a
                          href={token.metadata.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {token.metadata?.telegram && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a
                          href={token.metadata.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a
                        href={`https://etherscan.io/token/${token.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price & Stats */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold tabular-nums">
                      ${token.stats.price}
                    </p>
                    <p
                      className={cn(
                        'text-sm font-medium',
                        token.stats.priceChange24h >= 0
                          ? 'text-chart-1'
                          : 'text-destructive',
                      )}
                    >
                      {token.stats.priceChange24h >= 0 ? '+' : ''}
                      {token.stats.priceChange24h.toFixed(2)}% 24h
                    </p>
                  </div>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Market Cap
                      </p>
                      <p className="font-medium">${token.stats.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Volume 24h
                      </p>
                      <p className="font-medium">${token.stats.volume24h}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Holders</p>
                      <p className="font-medium">
                        {token.stats.holders.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Auction Progress (if active) */}
                {isAuctionActive && token.auction && token.auctionState && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <AuctionProgress
                      config={token.auction}
                      state={token.auctionState}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart / Activity Tabs */}
            <Card>
              <Tabs defaultValue="chart">
                <div className="px-4 pt-3">
                  <TabsList className="h-8">
                    <TabsTrigger value="chart" className="text-xs h-7 px-3">
                      Chart
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="text-xs h-7 px-3">
                      Activity
                    </TabsTrigger>
                    <TabsTrigger value="about" className="text-xs h-7 px-3">
                      About
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chart" className="m-0">
                  <div className="p-4 pt-2">
                    <div className="h-[280px] flex items-center justify-center bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Chart placeholder
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="m-0">
                  <div className="p-4 pt-2 max-h-[320px] overflow-auto">
                    {trades.length === 0 ? (
                      <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">
                        No activity yet
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {trades.map(trade => (
                          <div
                            key={trade.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'text-xs font-medium px-2 py-0.5 rounded',
                                    trade.type === 'buy'
                                    ? 'bg-chart-1/20 text-chart-1'
                                    : 'bg-destructive/20 text-destructive',
                                )}
                              >
                                {trade.type.toUpperCase()}
                              </span>
                              <span className="text-sm font-medium tabular-nums">
                                {parseFloat(trade.amountOut).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm tabular-nums">
                                ${trade.price}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatTimeAgo(trade.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="about" className="m-0">
                  <div className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {token.description || 'No description available.'}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">
                          Total Supply
                        </p>
                        <p className="font-medium">
                          {parseInt(token.totalSupply).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">
                          Liquidity
                        </p>
                        <p className="font-medium">${token.stats.liquidity}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Auction Stats (if active) */}
            {isAuctionActive && token.auction && token.auctionState && (
              <AuctionStats config={token.auction} state={token.auctionState} />
            )}
          </div>

          {/* Sidebar - Bid/Swap Card */}
          <div className="lg:col-span-2">
            {isAuctionActive && token.auction && token.auctionState ? (
              <BidCard
                config={token.auction}
                state={token.auctionState}
                userBid={userBid}
                isConnected={isConnected}
                onConnectWallet={handleConnectWallet}
                onPlaceBid={handlePlaceBid}
              />
            ) : (
              <SwapCard
                token={token}
                isConnected={isConnected}
                onConnectWallet={handleConnectWallet}
                onSwap={handleSwap}
                clearingPrice={token.auctionState?.currentPrice}
                floorPrice={token.auction?.floorPrice}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
