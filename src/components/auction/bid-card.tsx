'use client';

import {useState, useMemo} from 'react';
import {ChevronDown, Info, Zap} from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as RadioGroup from '@radix-ui/react-radio-group';
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
import {cn} from '~/lib/utils';
import type {AuctionState, AuctionConfig, UserBid} from '~/types';

type PriceStrategy = 'market' | 'aggressive' | 'conservative' | 'custom';

interface StrategyOption {
  value: PriceStrategy;
  label: string;
  description: string;
  multiplier: number;
}

const STRATEGY_OPTIONS: StrategyOption[] = [
  {
    value: 'market',
    label: 'Market',
    description: 'Get tokens for sure',
    multiplier: 1.5,
  },
  {
    value: 'aggressive',
    label: 'Aggressive',
    description: 'Up to 1.25x current price',
    multiplier: 1.25,
  },
  {
    value: 'conservative',
    label: 'Conservative',
    description: 'Up to 1.1x current price',
    multiplier: 1.1,
  },
  {
    value: 'custom',
    label: 'Custom',
    description: 'Set your own max price',
    multiplier: 1,
  },
];

interface BidCardProps {
  config: AuctionConfig;
  state: AuctionState;
  userBid?: UserBid;
  isConnected?: boolean;
  onConnectWallet?: () => void;
  onPlaceBid?: (maxPrice: string, budget: string) => void;
  className?: string;
}

export function BidCard({
  config,
  state,
  userBid,
  isConnected,
  onConnectWallet,
  onPlaceBid,
  className,
}: BidCardProps) {
  const [budgetUsd, setBudgetUsd] = useState('100');
  const [strategy, setStrategy] = useState<PriceStrategy>('market');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);

  // Mock ETH/USD rate - in production this would come from an oracle
  const ethUsdRate = 3200;
  const currentPriceNum = parseFloat(state.currentPrice);
  const floorPriceNum = parseFloat(config.floorPrice);

  const selectedStrategy = STRATEGY_OPTIONS.find(s => s.value === strategy)!;

  const maxPriceEth = useMemo(() => {
    if (strategy === 'custom') {
      return customMaxPrice ? parseFloat(customMaxPrice) : 0;
    }
    return currentPriceNum * selectedStrategy.multiplier;
  }, [strategy, customMaxPrice, currentPriceNum, selectedStrategy.multiplier]);

  const budgetEth = useMemo(() => {
    const usd = parseFloat(budgetUsd) || 0;
    return usd / ethUsdRate;
  }, [budgetUsd, ethUsdRate]);

  const estimatedTokens = useMemo(() => {
    if (!budgetEth || !maxPriceEth) return {min: 0, max: 0};
    // At max price (worst case)
    const minTokens = budgetEth / maxPriceEth;
    // At current price (best case)
    const maxTokens = budgetEth / currentPriceNum;
    return {min: minTokens, max: maxTokens};
  }, [budgetEth, maxPriceEth, currentPriceNum]);

  const maxPriceUsd = maxPriceEth * ethUsdRate;

  const handlePlaceBid = () => {
    if (onPlaceBid && budgetEth > 0 && maxPriceEth > 0) {
      onPlaceBid(maxPriceEth.toFixed(8), budgetEth.toFixed(8));
    }
  };

  const handleStrategyChange = (value: string) => {
    setStrategy(value as PriceStrategy);
  };

  const isLive = state.phase === 'live';
  const canBid = isLive && isConnected;

  const getStrategyDisplayText = () => {
    if (strategy === 'custom' && customMaxPrice) {
      return `Custom (${parseFloat(customMaxPrice).toFixed(6)} ETH)`;
    }
    return selectedStrategy.label;
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Header with current price - always shown */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Current Price
            </p>
            <p className="text-2xl font-bold tabular-nums">
              {currentPriceNum.toFixed(6)} ETH
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Floor Price
            </p>
            <p className="text-lg font-medium text-muted-foreground tabular-nums">
              {floorPriceNum.toFixed(6)} ETH
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Budget input in USD */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="budget" className="text-sm">
              How much?
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px]">
                  <p className="text-xs">
                    Total amount to commit. This is spread across remaining
                    auction blocks automatically.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="budget"
              type="number"
              step="1"
              placeholder="100"
              value={budgetUsd}
              onChange={e => setBudgetUsd(e.target.value)}
              disabled={!canBid}
              className="pr-12 tabular-nums text-lg h-11"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
              USD
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            ≈ {budgetEth.toFixed(6)} ETH
          </p>
        </div>

        {/* Collapsible Price Strategy */}
        <Collapsible.Root
          open={isStrategyOpen}
          onOpenChange={setIsStrategyOpen}
        >
          <Collapsible.Trigger asChild>
            <button
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors text-left',
                !canBid && 'opacity-50 cursor-not-allowed',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Price Strategy:
                </span>
                <span className="text-sm font-medium">
                  {getStrategyDisplayText()}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  isStrategyOpen && 'rotate-180',
                )}
              />
            </button>
          </Collapsible.Trigger>

          <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <div className="pt-2 space-y-2">
              <RadioGroup.Root
                value={strategy}
                onValueChange={handleStrategyChange}
                className="space-y-2"
              >
                {STRATEGY_OPTIONS.map(option => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                      strategy === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/30',
                      !canBid && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <RadioGroup.Item
                      value={option.value}
                      className={cn(
                        'h-4 w-4 rounded-full border border-muted-foreground flex-shrink-0',
                        'data-[state=checked]:border-primary data-[state=checked]:border-[5px]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      )}
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-sm text-muted-foreground tabular-nums ml-auto">
                      {option.value === 'market'
                        ? '∞'
                        : option.value === 'custom'
                          ? ''
                          : `${option.multiplier}x`}
                    </span>
                  </label>
                ))}
              </RadioGroup.Root>

              {/* Custom price input */}
              {strategy === 'custom' && (
                <div className="pt-2 space-y-1.5">
                  <Label htmlFor="customPrice" className="text-sm">
                    Max Price
                  </Label>
                  <div className="relative">
                    <Input
                      id="customPrice"
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      value={customMaxPrice}
                      onChange={e => setCustomMaxPrice(e.target.value)}
                      className="pr-12 tabular-nums"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      ETH
                    </span>
                  </div>
                  {customMaxPrice && (
                    <p className="text-xs text-muted-foreground">
                      ≈ ${(parseFloat(customMaxPrice) * ethUsdRate).toFixed(2)}{' '}
                      per token
                    </p>
                  )}
                </div>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Estimate summary */}

        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current price</span>
            <span className="font-medium tabular-nums">
              ${(currentPriceNum * ethUsdRate).toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated tokens</span>
            <span className="font-medium tabular-nums">
              ~{estimatedTokens.min.toFixed(0)}-{estimatedTokens.max.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Early bidder tip */}
        {isLive && state.progress < 50 && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary">
              Early bidders get better average prices as bids spread across more
              blocks
            </p>
          </div>
        )}

        {/* Existing bid info */}
        {userBid && (
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
            <p className="text-xs font-medium text-primary">Your Active Bid</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-medium tabular-nums">{userBid.budget} ETH</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Max Price</p>
                <p className="font-medium tabular-nums">
                  {userBid.maxPrice} ETH
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tokens Received</p>
                <p className="font-medium tabular-nums">
                  {userBid.tokensReceived}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p
                  className={cn(
                    'font-medium',
                    userBid.inRange ? 'text-primary' : 'text-chart-4',
                  )}
                >
                  {userBid.inRange ? 'In Range' : 'Out of Range'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        {!isConnected ? (
          <Button className="w-full" size="lg" onClick={onConnectWallet}>
            Connect Wallet
          </Button>
        ) : state.phase === 'upcoming' ? (
          <Button className="w-full" size="lg" disabled>
            Auction Not Started
          </Button>
        ) : state.phase === 'live' ? (
          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceBid}
            disabled={!budgetUsd || !maxPriceEth}
          >
            {userBid ? 'Update Bid' : 'Confirm Bid'}
          </Button>
        ) : state.phase === 'settling' ? (
          <Button className="w-full" size="lg" disabled>
            Auction Settling...
          </Button>
        ) : (
          <Button className="w-full" size="lg" variant="outline">
            Claim Tokens
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
