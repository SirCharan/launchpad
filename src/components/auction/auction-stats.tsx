'use client';

import {Users, Coins, TrendingUp, Target} from 'lucide-react';
import {cn} from '~/lib/utils';
import type {AuctionState, AuctionConfig} from '~/types';

interface AuctionStatsProps {
  config: AuctionConfig;
  state: AuctionState;
  className?: string;
}

export function AuctionStats({config, state, className}: AuctionStatsProps) {
  const stats = [
    {
      label: 'Raised',
      value: `${parseFloat(state.totalRaised).toFixed(2)} ETH`,
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'Sold',
      value: `${((parseFloat(state.tokensSold) / parseFloat(config.tokensForSale)) * 100).toFixed(1)}%`,
      subValue: `${formatNumber(parseFloat(state.tokensSold))} tokens`,
      icon: Coins,
      color: 'text-primary',
    },
    {
      label: 'Bidders',
      value: state.bidderCount.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'FDV',
      value: `$${formatNumber(parseFloat(state.currentPrice) * 2500 * 1000000000)}`,
      icon: Target,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-3 rounded-lg bg-muted/50 border border-border/50"
        >
          <div className="flex items-center gap-2 mb-1">
            <stat.icon className={cn('h-3.5 w-3.5', stat.color)} />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className="font-semibold tabular-nums">{stat.value}</p>
          {stat.subValue && (
            <p className="text-[10px] text-muted-foreground">{stat.subValue}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toFixed(0);
}
