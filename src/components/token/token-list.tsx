'use client';

import {TokenCard, TokenCardSkeleton} from './token-card';
import type {TokenWithStats} from '~/types';

interface TokenListProps {
  tokens: TokenWithStats[];
  isLoading?: boolean;
}

export function TokenList({tokens, isLoading}: TokenListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground font-[family-name:var(--font-creepster)]">
          carnage loading
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium">No tokens found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tokens.map((token) => (
        <TokenCard key={token.address} token={token} />
      ))}
    </div>
  );
}
