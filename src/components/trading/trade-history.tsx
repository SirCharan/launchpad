'use client';

import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';
import {Badge} from '~/components/ui/badge';
import {ScrollArea} from '~/components/ui/scroll-area';
import {cn} from '~/lib/utils';
import type {Trade} from '~/types';

interface TradeHistoryProps {
  trades: Trade[];
  isLoading?: boolean;
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

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function TradeHistory({trades, isLoading}: TradeHistoryProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50 animate-pulse"
              >
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {trades.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No trades yet
            </div>
          ) : (
            <div className="space-y-2">
              {trades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={trade.type === 'buy' ? 'success' : 'destructive'}
                      className="w-12 justify-center"
                    >
                      {trade.type.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">
                        {parseFloat(trade.amountOut).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {truncateAddress(trade.trader)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${trade.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(trade.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
