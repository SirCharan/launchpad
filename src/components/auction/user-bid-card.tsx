'use client';

import {useMemo} from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Coins,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Minus,
} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {Badge} from '~/components/ui/badge';
import {Button} from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import {PhaseBadge} from './phase-badge';
import {cn} from '~/lib/utils';
import type {AuctionPhase} from '~/types';

/** Extended bid info for user's bid across an auction */
export interface UserBidInfo {
  /** Token details */
  token: {
    address: `0x${string}`;
    name: string;
    symbol: string;
    logoUrl?: string;
  };
  /** Auction phase */
  phase: AuctionPhase;
  /** User's max price willing to pay (ETH) */
  maxPrice: string;
  /** Total budget committed (ETH) */
  budget: string;
  /** Amount spent so far (ETH) */
  spent: string;
  /** Tokens received so far */
  tokensReceived: string;
  /** Whether bid is currently in clearing range */
  inRange: boolean;
  /** Estimated final tokens at current price */
  estimatedTokens: string;
  /** Current clearing price of the auction (ETH) */
  currentPrice: string;
  /** Time remaining in auction (seconds) - null if completed/settling */
  timeRemaining: number | null;
  /** Auction progress percentage (0-100) */
  progress: number;
  /** Price change trend: positive = clearing price going up */
  priceChange: number;
}

interface UserBidCardProps {
  bid: UserBidInfo;
  variant?: 'default' | 'compact';
  className?: string;
}

export function UserBidCard({
  bid,
  variant = 'default',
  className,
}: UserBidCardProps) {
  // Mock ETH/USD rate - in production this would come from context/oracle
  const ethUsdRate = 3200;

  const budgetUsd = useMemo(() => {
    return (parseFloat(bid.budget) * ethUsdRate).toFixed(2);
  }, [bid.budget]);

  const spentUsd = useMemo(() => {
    return (parseFloat(bid.spent) * ethUsdRate).toFixed(2);
  }, [bid.spent]);

  const spentPercentage = useMemo(() => {
    const budget = parseFloat(bid.budget);
    const spent = parseFloat(bid.spent);
    if (budget === 0) return 0;
    return (spent / budget) * 100;
  }, [bid.budget, bid.spent]);

  const timeRemainingFormatted = useMemo(() => {
    if (bid.timeRemaining === null) return null;
    const seconds = bid.timeRemaining;
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ${minutes % 60}m`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }, [bid.timeRemaining]);

  const statusConfig = useMemo(() => {
    if (bid.phase === 'settling') {
      return {
        label: 'Settling',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        icon: Clock,
        description: 'Auction is finalizing',
      };
    }
    if (bid.phase === 'completed') {
      return {
        label: 'Claimable',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        icon: CheckCircle2,
        description: 'Ready to claim tokens',
      };
    }
    if (bid.inRange) {
      return {
        label: 'In Range',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        icon: CheckCircle2,
        description: 'Your bid is competitive',
      };
    }
    return {
      label: 'Out of Range',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      icon: AlertCircle,
      description: 'Price has exceeded your max',
    };
  }, [bid.phase, bid.inRange]);

  const StatusIcon = statusConfig.icon;

  if (variant === 'compact') {
    return (
      <Link
        href={`/token/${bid.token.address}`}
        className={cn(
          'group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors',
          className
        )}
      >
        <Avatar className="h-10 w-10 rounded-lg flex-shrink-0">
          <AvatarImage src={bid.token.logoUrl} alt={bid.token.name} />
          <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-bold">
            {bid.token.symbol.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">
              {bid.token.symbol}
            </span>
            <PhaseBadge phase={bid.phase} size="sm" />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">
              {parseFloat(bid.tokensReceived).toLocaleString()} tokens
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span
              className={cn('text-xs font-medium', statusConfig.color)}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-sm font-medium tabular-nums">
            {parseFloat(bid.budget).toFixed(4)} ETH
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">
            ${budgetUsd}
          </p>
        </div>

        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/token/${bid.token.address}`}
            className="flex items-center gap-3 group"
          >
            <Avatar className="h-11 w-11 rounded-xl">
              <AvatarImage src={bid.token.logoUrl} alt={bid.token.name} />
              <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold">
                {bid.token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold group-hover:text-primary transition-colors">
                  {bid.token.name}
                </span>
                <PhaseBadge phase={bid.phase} size="sm" />
              </div>
              <span className="text-sm text-muted-foreground">
                {bid.token.symbol}
              </span>
            </div>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={cn(
                    'gap-1 font-medium',
                    statusConfig.bgColor,
                    statusConfig.color,
                    statusConfig.borderColor
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{statusConfig.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Time remaining indicator for live auctions */}
        {bid.phase === 'live' && timeRemainingFormatted && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-1000"
                style={{width: `${100 - bid.progress}%`}}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0">
              {timeRemainingFormatted} left
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {/* Budget */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Coins className="h-3.5 w-3.5" />
            <span className="text-xs">Budget</span>
          </div>
          <p className="font-semibold tabular-nums">
            {parseFloat(bid.budget).toFixed(4)} ETH
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">
            ${budgetUsd}
          </p>
        </div>

        {/* Spent */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <span className="text-xs">Spent</span>
            <span className="text-xs text-muted-foreground/70">
              ({spentPercentage.toFixed(0)}%)
            </span>
          </div>
          <p className="font-semibold tabular-nums">
            {parseFloat(bid.spent).toFixed(4)} ETH
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">
            ${spentUsd}
          </p>
        </div>

        {/* Tokens Received */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <span className="text-xs">Tokens Received</span>
          </div>
          <p className="font-semibold tabular-nums">
            {parseFloat(bid.tokensReceived).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Est. {parseFloat(bid.estimatedTokens).toLocaleString()}
          </p>
        </div>

        {/* Price Info */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <span className="text-xs">Your Max</span>
            <span className="text-xs text-muted-foreground/70">vs Current</span>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="font-semibold tabular-nums">
              {parseFloat(bid.maxPrice).toFixed(6)}
            </p>
            <span className="text-xs text-muted-foreground">ETH</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            {bid.priceChange > 0 ? (
              <TrendingUp className="h-3 w-3 text-red-500" />
            ) : bid.priceChange < 0 ? (
              <TrendingDown className="h-3 w-3 text-green-500" />
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground tabular-nums">
              {parseFloat(bid.currentPrice).toFixed(6)} ETH
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4">
        {bid.phase === 'completed' ? (
          <Button className="w-full" size="sm">
            Claim Tokens
          </Button>
        ) : (
          <Button variant="outline" className="w-full" size="sm" asChild>
            <Link href={`/token/${bid.token.address}`}>
              {bid.phase === 'live' ? 'Manage Bid' : 'View Auction'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
