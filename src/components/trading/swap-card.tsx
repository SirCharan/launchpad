'use client';

import {useState} from 'react';
import {ArrowDownUp, Settings} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import {DEFAULT_SLIPPAGE, SLIPPAGE_OPTIONS} from '~/constants';
import type {TokenWithStats} from '~/types';

interface SwapCardProps {
  token: TokenWithStats;
  onSwap?: (type: 'buy' | 'sell', amount: string) => void;
  isConnected?: boolean;
  onConnectWallet?: () => void;
  /** Final clearing price from auction (ETH) */
  clearingPrice?: string;
  /** Floor price from auction (ETH) */
  floorPrice?: string;
}

export function SwapCard({
  token,
  onSwap,
  isConnected,
  onConnectWallet,
  clearingPrice,
  floorPrice,
}: SwapCardProps) {
  const [swapType, setSwapType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [showSettings, setShowSettings] = useState(false);

  const isBuying = swapType === 'buy';
  const inputToken = isBuying ? 'ETH' : token.symbol;
  const outputToken = isBuying ? token.symbol : 'ETH';

  // Calculate estimated output (placeholder calculation)
  const estimatedOutput = amount
    ? (
        parseFloat(amount) *
        (isBuying
          ? 1 / parseFloat(token.stats.price)
          : parseFloat(token.stats.price))
      ).toFixed(6)
    : '0';

  const handleSwap = () => {
    if (onSwap && amount) {
      onSwap(swapType, amount);
    }
  };

  const toggleSwapType = () => {
    setSwapType(swapType === 'buy' ? 'sell' : 'buy');
    setAmount('');
  };

  return (
    <Card className="overflow-hidden">
      {/* Price header - consistent with BidCard */}
      {clearingPrice && floorPrice && (
        <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Clearing Price
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {parseFloat(clearingPrice).toFixed(6)} ETH
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Floor Price
              </p>
              <p className="text-lg font-medium text-muted-foreground tabular-nums">
                {parseFloat(floorPrice).toFixed(6)} ETH
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-lg font-semibold" title="Trade this token">Swap</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Slippage settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CardContent className="space-y-4 pt-0">
        {/* Slippage Settings */}
        {showSettings && (
          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <Label className="text-xs text-muted-foreground">
              Slippage Tolerance
            </Label>
            <div className="flex gap-2">
              {SLIPPAGE_OPTIONS.map(option => (
                <Button
                  key={option}
                  variant={slippage === option ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSlippage(option)}
                >
                  {option}%
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Token */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">You pay</Label>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="border-0 bg-transparent text-xl font-medium focus-visible:ring-0 p-0"
            />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background">
              <span className="font-medium">{inputToken}</span>
            </div>
          </div>
        </div>

        {/* Swap Direction Toggle */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={toggleSwapType}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Output Token */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">You receive</Label>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <div className="flex-1 text-xl font-medium text-muted-foreground">
              {estimatedOutput}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background">
              <span className="font-medium">{outputToken}</span>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Rate</span>
          <span>
            1 {inputToken} ={' '}
            {isBuying
              ? (1 / parseFloat(token.stats.price)).toFixed(0)
              : parseFloat(token.stats.price).toFixed(8)}{' '}
            {outputToken}
          </span>
        </div>

        {/* Action Button */}
        {isConnected ? (
          <Button
            className="w-full"
            size="lg"
            onClick={handleSwap}
            disabled={!amount || parseFloat(amount) <= 0}
            title={isBuying ? 'Buy token' : 'Sell token'}
          >
            {isBuying ? 'Buy' : 'Sell'} {token.symbol}
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={onConnectWallet} title="Connect to bid or swap">
            Connect wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
