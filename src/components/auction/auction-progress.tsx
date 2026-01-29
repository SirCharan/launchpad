'use client';

import {cn} from '~/lib/utils';
import type {AuctionState, AuctionConfig} from '~/types';

interface AuctionProgressProps {
  config: AuctionConfig;
  state: AuctionState;
  className?: string;
}

export function AuctionProgress({config, state, className}: AuctionProgressProps) {
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '0s';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const now = Math.floor(Date.now() / 1000);
  const timeRemaining = Math.max(0, config.endTime - now);
  const totalDuration = config.endTime - config.startTime;
  const elapsed = now - config.startTime;
  const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Auction Progress</span>
        <span className="font-medium tabular-nums">
          {state.phase === 'upcoming'
            ? `Starts in ${formatTime(config.startTime - now)}`
            : state.phase === 'completed'
              ? 'Completed'
              : formatTime(timeRemaining)}
        </span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000',
            state.phase === 'live' && 'bg-primary',
            state.phase === 'settling' && 'bg-chart-4',
            state.phase === 'completed' && 'bg-destructive',
            state.phase === 'upcoming' && 'bg-chart-2'
          )}
          style={{width: `${state.phase === 'upcoming' ? 0 : progressPercent}%`}}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{state.blocksRemaining} blocks left</span>
        <span>{Math.round(progressPercent)}% complete</span>
      </div>
    </div>
  );
}
