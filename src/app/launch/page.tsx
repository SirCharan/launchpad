'use client';

import {useState} from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  ImagePlus,
  Info,
  Loader2,
  Flame,
  Zap,
} from 'lucide-react';
import {Container} from '~/components/layout';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {Textarea} from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import {cn} from '~/lib/utils';
import {
  DEFAULT_TOTAL_SUPPLY,
  DEFAULT_TOKENS_FOR_SALE_PERCENT,
  AUCTION_DURATION_OPTIONS,
} from '~/constants';
import type {TokenListingForm} from '~/types';

const STEPS = [
  {id: 1, label: 'Token'},
  {id: 2, label: 'Auction'},
  {id: 3, label: 'Launch'},
];

export default function LaunchPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [form, setForm] = useState<TokenListingForm>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: DEFAULT_TOTAL_SUPPLY,
    tokensForSale: String(
      (parseInt(DEFAULT_TOTAL_SUPPLY) * DEFAULT_TOKENS_FOR_SALE_PERCENT) / 100,
    ),
    floorPrice: '0.000001',
    auctionDuration: '24',
  });

  // Placeholder wallet state
  const isConnected = false;

  const handleConnectWallet = () => {
    // TODO: Implement wallet connection
    console.log('Connect wallet');
  };

  const updateForm = (field: keyof TokenListingForm, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // TODO: Implement CCA deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Deploying auction:', form);
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const isStep1Valid = form.name && form.symbol;
  const isStep2Valid =
    form.tokensForSale && form.floorPrice && parseFloat(form.floorPrice) > 0;

  // Calculate estimates
  const tokensSalePercent =
    (parseInt(form.tokensForSale || '0') / parseInt(form.totalSupply)) * 100;
  const estimatedFDV =
    parseFloat(form.floorPrice || '0') * parseInt(form.totalSupply) * 2500; // ETH price placeholder

  return (
    <div className="py-8 md:py-12 min-h-[80vh]">
      <Container size="sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            Uniswap V4 CCA
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Launch token
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new token with Unilaunch. Fair price discovery, then
            trade on V4.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  if (step.id < currentStep) setCurrentStep(step.id);
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step.id
                      ? 'bg-primary/20 text-primary cursor-pointer hover:bg-primary/30'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span className="w-4 text-center">{step.id}</span>
                )}
                {step.label}
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Token Details */}
        {currentStep === 1 && (
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="My Token"
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="TOKEN"
                    value={form.symbol}
                    onChange={e =>
                      updateForm('symbol', e.target.value.toUpperCase())
                    }
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's your token about?"
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Total tokens to create. This is fixed forever.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="totalSupply"
                  type="number"
                  value={form.totalSupply}
                  onChange={e => updateForm('totalSupply', e.target.value)}
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-1.5">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to upload
                    <br />
                    PNG or JPG, max 2MB
                  </p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid}
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Auction Config */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-6 space-y-5">
              {/* CCA Explainer */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-chart-1/5 border border-primary/10">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-primary" />
                  How CCA Works
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>
                    Tokens are sold over time at a continuous clearing price
                  </li>
                  <li>Early bidders get better average prices</li>
                  <li>
                    At the end, a Uniswap V4 pool is created at the discovered
                    price
                  </li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="tokensForSale">Tokens for Sale</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            Portion of supply available in the auction
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {tokensSalePercent.toFixed(0)}% of supply
                  </span>
                </div>
                <Input
                  id="tokensForSale"
                  type="number"
                  value={form.tokensForSale}
                  onChange={e => updateForm('tokensForSale', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="floorPrice">Floor Price (ETH)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Minimum price per token. Auction won't clear below
                          this.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="floorPrice"
                  type="number"
                  step="0.000001"
                  placeholder="0.000001"
                  value={form.floorPrice}
                  onChange={e => updateForm('floorPrice', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Label>Auction Duration</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Longer auctions allow more price discovery
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={form.auctionDuration}
                  onValueChange={v => updateForm('auctionDuration', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AUCTION_DURATION_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preview Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Floor FDV
                  </p>
                  <p className="font-semibold">
                    ${estimatedFDV > 0 ? formatNumber(estimatedFDV) : '—'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Duration
                  </p>
                  <p className="font-semibold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {AUCTION_DURATION_OPTIONS.find(
                      o => o.value === form.auctionDuration,
                    )?.label || '—'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="flex-1"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Launch */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-6 space-y-5">
              {/* Summary */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {form.symbol?.slice(0, 2) || '??'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {form.name || 'Token Name'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {form.symbol || 'SYMBOL'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">
                      Total Supply
                    </p>
                    <p className="font-medium">
                      {formatNumber(parseInt(form.totalSupply))}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">For Sale</p>
                    <p className="font-medium">
                      {formatNumber(parseInt(form.tokensForSale))} (
                      {tokensSalePercent.toFixed(0)}%)
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Floor Price</p>
                    <p className="font-medium">{form.floorPrice} ETH</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {
                        AUCTION_DURATION_OPTIONS.find(
                          o => o.value === form.auctionDuration,
                        )?.label
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <h4 className="text-sm font-medium mb-2">What happens next</h4>
                <ol className="text-xs text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      1
                    </span>
                    Token is created and auction starts immediately
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      2
                    </span>
                    Bidders place bids with max price + budget
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      3
                    </span>
                    Tokens distributed at uniform clearing price each block
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      4
                    </span>
                    Uniswap V4 pool created at discovered price
                  </li>
                </ol>
              </div>

              {!isConnected && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleConnectWallet}
                >
                  Connect wallet to launch
                </Button>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleDeploy}
                  disabled={!isConnected || isDeploying}
                  className="flex-1 gap-2"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Flame className="h-4 w-4" />
                      Launch token
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Unilaunch · Not financial advice.
        </p>
      </Container>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toFixed(0);
}
