'use client';

import {Clock, Flame, Loader2, CheckCircle2} from 'lucide-react';
import {Badge} from '~/components/ui/badge';
import {cn} from '~/lib/utils';
import type {AuctionPhase} from '~/types';

interface PhaseBadgeProps {
  phase: AuctionPhase;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const phaseConfig: Record<
  AuctionPhase,
  {
    label: string;
    icon: typeof Clock;
    className: string;
  }
> = {
  upcoming: {
    label: 'Upcoming',
    icon: Clock,
    className:
      'bg-chart-2/20 text-chart-2 border-chart-2/30 hover:bg-chart-2/30',
  },
  live: {
    label: 'LIVE',
    icon: Flame,
    className:
      'bg-primary/20 text-primary border-primary/40 hover:bg-primary/30 animate-pulse font-mono',
  },
  settling: {
    label: 'Settling',
    icon: Loader2,
    className:
      'bg-chart-4/20 text-chart-4 border-chart-4/30 hover:bg-chart-4/30',
  },
  completed: {
    label: 'ENDED',
    icon: CheckCircle2,
    className:
      'bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30 font-mono',
  },
};

export function PhaseBadge({
  phase,
  size = 'md',
  showIcon = true,
  className,
}: PhaseBadgeProps) {
  const config = phaseConfig[phase];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-0.5',
    md: 'text-xs px-2 py-0.5 gap-1',
    lg: 'text-sm px-2.5 py-1 gap-1.5',
  };

  const iconSizes = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium border inline-flex items-center',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            iconSizes[size],
            phase === 'settling' && 'animate-spin'
          )}
        />
      )}
      {config.label}
    </Badge>
  );
}
