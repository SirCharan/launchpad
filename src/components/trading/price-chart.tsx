'use client';

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';
import {Button} from '~/components/ui/button';
import {CHART_INTERVALS} from '~/constants';

interface PriceChartProps {
  tokenSymbol: string;
}

export function PriceChart({tokenSymbol}: PriceChartProps) {
  const [interval, setInterval] = useState('1h');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{tokenSymbol}/ETH</CardTitle>
        <div className="flex gap-1">
          {CHART_INTERVALS.map((int) => (
            <Button
              key={int.value}
              variant={interval === int.value ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setInterval(int.value)}
            >
              {int.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart - integrate with a charting library like lightweight-charts or recharts */}
        <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Chart Placeholder</p>
            <p className="text-xs mt-1">
              Integrate with lightweight-charts or TradingView
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
