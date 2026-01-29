'use client';

import {useState, useEffect} from 'react';
import {Flame, Clock, TrendingUp, Sparkles, Rocket} from 'lucide-react';
import Link from 'next/link';
import {Container} from '~/components/layout';
import {TokenList, TokenFiltersBar} from '~/components/token';
import {Button} from '~/components/ui/button';
import {fetchTokens} from '~/lib/mock-data';
import {cn} from '~/lib/utils';
import type {TokenWithStats, TokenFilters, AuctionPhase} from '~/types';

const QUICK_FILTERS = [
  {id: 'all', label: 'All', icon: Sparkles},
  {id: 'live', label: 'Live Auctions', icon: Flame},
  {id: 'upcoming', label: 'Upcoming', icon: Clock},
  {id: 'completed', label: 'Trading', icon: TrendingUp},
] as const;

export default function DiscoverPage() {
  const [tokens, setTokens] = useState<TokenWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<TokenFilters>({
    search: '',
    sortBy: 'trending',
    phase: 'all',
  });

  useEffect(() => {
    async function loadTokens() {
      setIsLoading(true);
      try {
        const data = await fetchTokens();
        setTokens(data);
      } catch (error) {
        console.error('Failed to fetch tokens:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTokens();
  }, []);

  // Filter and sort tokens
  const filteredTokens = tokens
    .filter(token => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (
          !token.name.toLowerCase().includes(search) &&
          !token.symbol.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      // Phase filter
      if (filters.phase && filters.phase !== 'all') {
        const tokenPhase = token.auctionState?.phase || 'completed';
        if (tokenPhase !== filters.phase) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'marketCap':
          return parseFloat(b.stats.marketCap) - parseFloat(a.stats.marketCap);
        case 'volume':
          return parseFloat(b.stats.volume24h) - parseFloat(a.stats.volume24h);
        case 'price':
          return parseFloat(b.stats.price) - parseFloat(a.stats.price);
        case 'trending':
        default:
          return b.stats.priceChange24h - a.stats.priceChange24h;
      }
    });

  const handleQuickFilter = (phase: string) => {
    setFilters(prev => ({
      ...prev,
      phase: phase as AuctionPhase | 'all',
    }));
  };

  // Count tokens by phase
  const phaseCounts = {
    all: tokens.length,
    live: tokens.filter(t => t.auctionState?.phase === 'live').length,
    upcoming: tokens.filter(t => t.auctionState?.phase === 'upcoming').length,
    completed: tokens.filter(
      t => !t.auctionState || t.auctionState.phase === 'completed',
    ).length,
  };

  return (
    <div className="py-6 md:py-8">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Discover</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Find tokens and live auctions
            </p>
          </div>
          <Link href="/launch">
            <Button size="sm" className="gap-1.5">
              <Rocket className="h-3.5 w-3.5" />
              Launch Token
            </Button>
          </Link>
        </div>

        {/* Quick Phase Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {QUICK_FILTERS.map(filter => {
            const count = phaseCounts[filter.id as keyof typeof phaseCounts];
            const isActive = filters.phase === filter.id;

            return (
              <button
                key={filter.id}
                onClick={() => handleQuickFilter(filter.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground',
                )}
              >
                <filter.icon
                  className={cn(
                    'h-3.5 w-3.5',
                    filter.id === 'live' && isActive && 'animate-pulse',
                  )}
                />
                {filter.label}
                {count > 0 && (
                  <span
                    className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full',
                      isActive ? 'bg-primary-foreground/20' : 'bg-background',
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Sort */}
        <TokenFiltersBar
          filters={filters}
          onFiltersChange={setFilters}
          showPhaseFilter={false}
        />

        {/* Token List */}
        <div className="mt-6">
          <TokenList tokens={filteredTokens} isLoading={isLoading} />
        </div>

        {/* Empty State for Live Auctions */}
        {!isLoading &&
          filteredTokens.length === 0 &&
          filters.phase === 'live' && (
            <div className="text-center py-12">
              <Flame className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="font-medium">No live auctions</p>
              <p className="text-sm text-muted-foreground mt-1">
                Be the first to launch a fair auction
              </p>
              <Link href="/launch" className="inline-block mt-4">
                <Button variant="outline" size="sm">
                  Launch Token
                </Button>
              </Link>
            </div>
          )}
      </Container>
    </div>
  );
}
