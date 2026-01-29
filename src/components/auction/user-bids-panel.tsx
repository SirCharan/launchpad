'use client';

import {useState, useMemo} from 'react';
import {
  Wallet,
  LayoutGrid,
  LayoutList,
  Filter,
  Coins,
  TrendingUp,
  Clock,
  ChevronDown,
  RefreshCw,
  Inbox,
} from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {Badge} from '~/components/ui/badge';
import {ScrollArea} from '~/components/ui/scroll-area';
import {Skeleton} from '~/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {UserBidCard, type UserBidInfo} from './user-bid-card';
import {cn} from '~/lib/utils';
import type {AuctionPhase} from '~/types';

type FilterType = 'all' | 'live' | 'settling' | 'claimable';
type SortType = 'recent' | 'budget' | 'status' | 'time';
type ViewType = 'grid' | 'list';

interface UserBidsPanelProps {
  /** User's bids - pass undefined for loading, empty array for no bids */
  bids?: UserBidInfo[];
  /** Whether the user is connected */
  isConnected?: boolean;
  /** Callback when user wants to connect wallet */
  onConnectWallet?: () => void;
  /** Callback when user wants to refresh bids */
  onRefresh?: () => void;
  /** Whether data is being refreshed */
  isRefreshing?: boolean;
  /** Variant for different layouts */
  variant?: 'sidebar' | 'page' | 'modal';
  /** Custom className */
  className?: string;
}

export function UserBidsPanel({
  bids,
  isConnected = false,
  onConnectWallet,
  onRefresh,
  isRefreshing = false,
  variant = 'sidebar',
  className,
}: UserBidsPanelProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('recent');
  const [view, setView] = useState<ViewType>(variant === 'page' ? 'grid' : 'list');
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock ETH/USD rate
  const ethUsdRate = 3200;

  // Filter and sort bids
  const filteredBids = useMemo(() => {
    if (!bids) return [];

    let filtered = [...bids];

    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(bid => {
        if (filter === 'live') return bid.phase === 'live';
        if (filter === 'settling') return bid.phase === 'settling';
        if (filter === 'claimable') return bid.phase === 'completed';
        return true;
      });
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'budget':
          return parseFloat(b.budget) - parseFloat(a.budget);
        case 'status':
          // Priority: out of range > in range > settling > claimable
          const statusPriority = (bid: UserBidInfo) => {
            if (bid.phase === 'live' && !bid.inRange) return 0;
            if (bid.phase === 'live' && bid.inRange) return 1;
            if (bid.phase === 'settling') return 2;
            if (bid.phase === 'completed') return 3;
            return 4;
          };
          return statusPriority(a) - statusPriority(b);
        case 'time':
          // Sort by time remaining (null = completed, comes last)
          if (a.timeRemaining === null && b.timeRemaining === null) return 0;
          if (a.timeRemaining === null) return 1;
          if (b.timeRemaining === null) return -1;
          return a.timeRemaining - b.timeRemaining;
        case 'recent':
        default:
          // For now, just maintain order (in production, would sort by bid timestamp)
          return 0;
      }
    });

    return filtered;
  }, [bids, filter, sort]);

  // Calculate summary stats
  const stats = useMemo(() => {
    if (!bids || bids.length === 0) {
      return {
        totalBids: 0,
        totalBudget: '0',
        totalBudgetUsd: '0',
        activeBids: 0,
        claimableBids: 0,
        outOfRangeBids: 0,
      };
    }

    const totalBudget = bids.reduce(
      (sum, bid) => sum + parseFloat(bid.budget),
      0
    );
    const activeBids = bids.filter(
      b => b.phase === 'live' || b.phase === 'settling'
    ).length;
    const claimableBids = bids.filter(b => b.phase === 'completed').length;
    const outOfRangeBids = bids.filter(
      b => b.phase === 'live' && !b.inRange
    ).length;

    return {
      totalBids: bids.length,
      totalBudget: totalBudget.toFixed(4),
      totalBudgetUsd: (totalBudget * ethUsdRate).toFixed(2),
      activeBids,
      claimableBids,
      outOfRangeBids,
    };
  }, [bids]);

  const filterCounts = useMemo(() => {
    if (!bids) return {all: 0, live: 0, settling: 0, claimable: 0};
    return {
      all: bids.length,
      live: bids.filter(b => b.phase === 'live').length,
      settling: bids.filter(b => b.phase === 'settling').length,
      claimable: bids.filter(b => b.phase === 'completed').length,
    };
  }, [bids]);

  // Loading state
  const isLoading = bids === undefined;

  // Not connected state
  if (!isConnected) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-[240px]">
              Connect your wallet to view and manage your auction bids
            </p>
            <Button onClick={onConnectWallet}>Connect Wallet</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sidebar variant - collapsible compact view
  if (variant === 'sidebar') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
          {/* Header */}
          <Collapsible.Trigger asChild>
            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Coins className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Your Bids</h3>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? (
                      'Loading...'
                    ) : (
                      <>
                        {stats.totalBids} bid{stats.totalBids !== 1 ? 's' : ''} •{' '}
                        {stats.totalBudget} ETH
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stats.outOfRangeBids > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] px-1.5"
                  >
                    {stats.outOfRangeBids} at risk
                  </Badge>
                )}
                {stats.claimableBids > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5"
                  >
                    {stats.claimableBids} claimable
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              </div>
            </button>
          </Collapsible.Trigger>

          <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
            <div className="border-t border-border">
              {/* Quick filter tabs */}
              <div className="px-4 pt-3 pb-2 flex items-center gap-1 overflow-x-auto">
                {(['all', 'live', 'settling', 'claimable'] as FilterType[]).map(
                  f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        'px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                        filter === f
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                      {filterCounts[f] > 0 && (
                        <span className="ml-1 opacity-70">
                          ({filterCounts[f]})
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>

              {/* Bids list */}
              <ScrollArea className="h-[320px]">
                <div className="px-4 pb-4 space-y-2">
                  {isLoading ? (
                    // Loading skeletons
                    Array.from({length: 3}).map((_, i) => (
                      <Skeleton key={i} className="h-[72px] rounded-lg" />
                    ))
                  ) : filteredBids.length === 0 ? (
                    // Empty state
                    <div className="py-8 text-center">
                      <Inbox className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {filter === 'all'
                          ? 'No active bids'
                          : `No ${filter} bids`}
                      </p>
                    </div>
                  ) : (
                    // Bid cards
                    filteredBids.map(bid => (
                      <UserBidCard
                        key={bid.token.address}
                        bid={bid}
                        variant="compact"
                      />
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Refresh button */}
              {onRefresh && (
                <div className="px-4 pb-4 pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={onRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw
                      className={cn(
                        'h-3.5 w-3.5 mr-1.5',
                        isRefreshing && 'animate-spin'
                      )}
                    />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Bids'}
                  </Button>
                </div>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card>
    );
  }

  // Page/Modal variant - full featured view
  return (
    <div className={cn('space-y-4', className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Coins className="h-4 w-4" />
            <span className="text-xs font-medium">Total Committed</span>
          </div>
          <p className="text-xl font-bold tabular-nums">{stats.totalBudget} ETH</p>
          <p className="text-xs text-muted-foreground">${stats.totalBudgetUsd}</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Active Bids</span>
          </div>
          <p className="text-xl font-bold tabular-nums">{stats.activeBids}</p>
          <p className="text-xs text-muted-foreground">
            {stats.outOfRangeBids > 0 ? (
                <span className="text-chart-4">
                {stats.outOfRangeBids} out of range
              </span>
            ) : (
              'All in range'
            )}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="h-4 w-4 text-chart-4" />
            <span className="text-xs font-medium">Settling</span>
          </div>
          <p className="text-xl font-bold tabular-nums">
            {filterCounts.settling}
          </p>
          <p className="text-xs text-muted-foreground">Awaiting finalization</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Claimable</span>
          </div>
          <p className="text-xl font-bold tabular-nums">
            {stats.claimableBids}
          </p>
          <p className="text-xs text-muted-foreground">Ready to claim</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Filter pills */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {(['all', 'live', 'settling', 'claimable'] as FilterType[]).map(
              f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    filter === f
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {filterCounts[f] > 0 && (
                    <span className="ml-1 opacity-70">({filterCounts[f]})</span>
                  )}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <Select value={sort} onValueChange={v => setSort(v as SortType)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="budget">Highest Budget</SelectItem>
              <SelectItem value="status">Status Priority</SelectItem>
              <SelectItem value="time">Time Remaining</SelectItem>
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-1.5 rounded transition-colors',
                view === 'grid'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-1.5 rounded transition-colors',
                view === 'list'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>

          {/* Refresh */}
          {onRefresh && (
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
              />
            </Button>
          )}
        </div>
      </div>

      {/* Bids Grid/List */}
      {isLoading ? (
        <div
          className={cn(
            'gap-4',
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-3'
          )}
        >
          {Array.from({length: 6}).map((_, i) => (
            <Skeleton
              key={i}
              className={view === 'grid' ? 'h-[280px]' : 'h-[72px]'}
            />
          ))}
        </div>
      ) : filteredBids.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-1">No Bids Found</h3>
              <p className="text-sm text-muted-foreground max-w-[300px]">
                {filter === 'all'
                  ? "You haven't placed any bids yet. Browse active auctions to get started."
                  : `No ${filter} bids at the moment.`}
              </p>
              {filter !== 'all' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setFilter('all')}
                >
                  View All Bids
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={cn(
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
          )}
        >
          {filteredBids.map(bid => (
            <UserBidCard
              key={bid.token.address}
              bid={bid}
              variant={view === 'grid' ? 'default' : 'compact'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
