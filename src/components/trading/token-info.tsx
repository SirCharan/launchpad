'use client';

import {ExternalLink, Globe, MessageCircle, Twitter} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';
import {Button} from '~/components/ui/button';
import {Badge} from '~/components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {Separator} from '~/components/ui/separator';
import {TrendingDown, TrendingUp} from 'lucide-react';
import type {TokenWithStats} from '~/types';

interface TokenInfoProps {
  token: TokenWithStats;
}

export function TokenInfo({token}: TokenInfoProps) {
  const isPositive = token.stats.priceChange24h >= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={token.logoUrl} alt={token.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                {token.name}
                <Badge variant="secondary">{token.symbol}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {token.description}
              </p>
            </div>
          </div>
          <Badge variant={isPositive ? 'success' : 'destructive'} className="text-sm">
            <span className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? '+' : ''}
              {token.stats.priceChange24h.toFixed(2)}%
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price */}
        <div>
          <p className="text-3xl font-bold">${token.stats.price}</p>
        </div>

        <Separator />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="font-semibold">${token.stats.marketCap}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="font-semibold">${token.stats.volume24h}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Liquidity</p>
            <p className="font-semibold">${token.stats.liquidity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Holders</p>
            <p className="font-semibold">{token.stats.holders.toLocaleString()}</p>
          </div>
        </div>

        <Separator />

        {/* Social Links */}
        <div className="flex gap-2">
          {token.metadata?.website && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={token.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 mr-1" />
                Website
              </a>
            </Button>
          )}
          {token.metadata?.twitter && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={token.metadata.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </a>
            </Button>
          )}
          {token.metadata?.telegram && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={token.metadata.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Telegram
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://etherscan.io/token/${token.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Etherscan
            </a>
          </Button>
        </div>

        {/* Contract Address */}
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Contract Address</p>
          <p className="text-sm font-mono break-all">{token.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
