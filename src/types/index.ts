// Token Types
export interface Token {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  logoUrl?: string;
  description?: string;
  createdAt: number;
  creator: `0x${string}`;
}

export interface TokenMetadata {
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  description?: string;
}

export interface TokenStats {
  price: string;
  priceChange24h: number;
  volume24h: string;
  marketCap: string;
  holders: number;
  liquidity: string;
}

// CCA Auction Types
export type AuctionPhase = 'upcoming' | 'live' | 'settling' | 'completed';

export interface AuctionConfig {
  /** Total tokens available for auction */
  tokensForSale: string;
  /** Floor price in ETH */
  floorPrice: string;
  /** Auction start timestamp */
  startTime: number;
  /** Auction end timestamp */
  endTime: number;
  /** Block when claiming becomes available */
  claimBlock: number;
  /** Block when migration to V4 pool happens */
  migrationBlock: number;
  /** Funds recipient address */
  fundsRecipient: `0x${string}`;
}

export interface AuctionState {
  phase: AuctionPhase;
  /** Current clearing price */
  currentPrice: string;
  /** Total ETH raised so far */
  totalRaised: string;
  /** Total tokens sold */
  tokensSold: string;
  /** Number of unique bidders */
  bidderCount: number;
  /** Current block number */
  currentBlock: number;
  /** Blocks remaining in auction */
  blocksRemaining: number;
  /** Percentage of auction complete */
  progress: number;
}

export interface UserBid {
  /** User's max price willing to pay */
  maxPrice: string;
  /** Total budget committed */
  budget: string;
  /** Amount spent so far */
  spent: string;
  /** Tokens received so far */
  tokensReceived: string;
  /** Whether bid is currently in range */
  inRange: boolean;
  /** Estimated final tokens at current price */
  estimatedTokens: string;
}

export interface TokenWithStats extends Token {
  stats: TokenStats;
  metadata?: TokenMetadata;
  /** Auction config if token is in auction phase */
  auction?: AuctionConfig;
  /** Current auction state */
  auctionState?: AuctionState;
}

// Trading Types
export interface Trade {
  id: string;
  tokenAddress: `0x${string}`;
  trader: `0x${string}`;
  type: 'buy' | 'sell';
  amountIn: string;
  amountOut: string;
  price: string;
  timestamp: number;
  txHash: `0x${string}`;
}

export interface OrderBookEntry {
  price: string;
  amount: string;
  total: string;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface ChartDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Listing Types - CCA Based
export interface TokenListingForm {
  // Token details
  name: string;
  symbol: string;
  description: string;
  totalSupply: string;
  logoFile?: File;
  // Social links
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  // Auction config
  tokensForSale: string;
  floorPrice: string;
  auctionDuration: string; // in hours
}

export interface ListingStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

// Wallet Types
export interface WalletState {
  address: `0x${string}` | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filters
export interface TokenFilters {
  search?: string;
  sortBy?: 'newest' | 'trending' | 'marketCap' | 'volume' | 'price';
  sortOrder?: 'asc' | 'desc';
  minMarketCap?: string;
  maxMarketCap?: string;
  phase?: AuctionPhase | 'all';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
