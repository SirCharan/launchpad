'use client';

import Link from 'next/link';
import {TrendingDown, TrendingUp, Clock, Users} from 'lucide-react';
import {Card, CardContent} from '~/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {PhaseBadge} from '~/components/auction';
import {cn} from '~/lib/utils';
import type {TokenWithStats} from '~/types';

interface TokenCardProps {
  token: TokenWithStats;
}

export function TokenCard({token}: TokenCardProps) {
  const isPositive = token.stats.priceChange24h >= 0;
  const phase = token.auctionState?.phase || 'completed';
  const isAuctionActive = phase !== 'completed';

  return (
    <Link href={`/token/${token.address}`}>
      <Card className="hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer group overflow-hidden">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src={token.logoUrl} alt={token.name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-bold">
                  {token.symbol.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{token.name}</h3>
                <p className="text-xs text-muted-foreground">{token.symbol}</p>
              </div>
            </div>
            <PhaseBadge phase={phase} size="sm" />
          </div>

          {/* Price Section */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-lg font-bold tabular-nums">
                ${token.stats.price}
              </p>
              <p
                className={cn(
                  'text-xs font-medium flex items-center gap-0.5',
                  isPositive ? 'text-chart-1' : 'text-destructive',
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isPositive ? '+' : ''}
                {token.stats.priceChange24h.toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">MCap</p>
              <p className="text-sm font-medium">${token.stats.marketCap}</p>
            </div>
          </div>

          {/* Auction Progress or Stats */}
          {isAuctionActive && token.auctionState ? (
            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {phase === 'upcoming' ? 'Starts in' : 'Ends in'}
                </span>
                <span className="font-medium tabular-nums">
                  {formatTimeRemaining(
                    phase === 'upcoming'
                      ? token.auction?.startTime || 0
                      : token.auction?.endTime || 0,
                  )}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    phase === 'live' && 'bg-primary',
                    phase === 'upcoming' && 'bg-chart-2',
                    phase === 'settling' && 'bg-chart-4',
                  )}
                  style={{width: `${token.auctionState.progress}%`}}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" />
                  {token.auctionState.bidderCount} bidders
                </span>
                <span>{token.auctionState.totalRaised} ETH raised</span>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-border/50 flex justify-between text-xs">
              <div>
                <p className="text-muted-foreground">Volume 24h</p>
                <p className="font-medium">${token.stats.volume24h}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Holders</p>
                <p className="font-medium">
                  {token.stats.holders.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function formatTimeRemaining(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, timestamp - now);

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function TokenCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
            <div>
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-3 w-12 bg-muted rounded animate-pulse mt-1" />
            </div>
          </div>
          <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            <div className="h-3 w-12 bg-muted rounded animate-pulse mt-1" />
          </div>
          <div className="text-right">
            <div className="h-3 w-8 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse mt-1" />
          </div>
        </div>
        <div className="pt-2 border-t border-border/50">
          <div className="h-1.5 bg-muted rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
