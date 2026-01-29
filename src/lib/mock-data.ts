import type {
  TokenWithStats,
  Trade,
  OrderBook,
  AuctionConfig,
  AuctionState,
} from '~/types';

// Helper to create auction config
function createAuctionConfig(
  tokensForSale: string,
  floorPrice: string,
  startTime: number,
  durationHours: number,
  fundsRecipient: `0x${string}`,
): AuctionConfig {
  const endTime = startTime + durationHours * 3600;
  return {
    tokensForSale,
    floorPrice,
    startTime,
    endTime,
    claimBlock: Math.floor(endTime / 12),
    migrationBlock: Math.floor(endTime / 12) + 100,
    fundsRecipient,
  };
}

// Helper to create auction state
function createAuctionState(
  config: AuctionConfig,
  phase: 'upcoming' | 'live' | 'settling' | 'completed',
  overrides: Partial<AuctionState> = {},
): AuctionState {
  const now = Math.floor(Date.now() / 1000);
  const totalDuration = config.endTime - config.startTime;
  const elapsed = Math.max(0, now - config.startTime);
  const progress =
    phase === 'upcoming'
      ? 0
      : phase === 'completed'
        ? 100
        : Math.min(100, (elapsed / totalDuration) * 100);
  const blocksRemaining =
    phase === 'completed'
      ? 0
      : Math.max(0, Math.floor((config.endTime - now) / 12));

  return {
    phase,
    currentPrice: config.floorPrice,
    totalRaised: '0',
    tokensSold: '0',
    bidderCount: 0,
    currentBlock: Math.floor(now / 12),
    blocksRemaining,
    progress,
    ...overrides,
  };
}

const now = Math.floor(Date.now() / 1000);

// Mock data for development - replace with real API calls
export const MOCK_TOKENS: TokenWithStats[] = [
  // Live auction token
  {
    address: '0x1234567890123456789012345678901234567890',
    name: 'Pepe Rising',
    symbol: 'PRISE',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'The next evolution of Pepe',
    createdAt: Date.now() - 3600000 * 6,
    creator: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    stats: {
      price: '0.000025',
      priceChange24h: 0,
      volume24h: '0',
      marketCap: '25000',
      holders: 0,
      liquidity: '0',
    },
    auction: createAuctionConfig(
      '500000000',
      '0.00001',
      now - 3600 * 6,
      24,
      '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    ),
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.00001',
        now - 3600 * 6,
        24,
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      ),
      'live',
      {
        currentPrice: '0.000025',
        totalRaised: '12.5',
        tokensSold: '125000000',
        bidderCount: 47,
        progress: 25,
      },
    ),
  },
  // Another live auction
  {
    address: '0x2345678901234567890123456789012345678901',
    name: 'Moon Mission',
    symbol: 'MMIS',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'Destination: Moon',
    createdAt: Date.now() - 3600000 * 12,
    creator: '0xbcdefabcdefabcdefabcdefabcdefabcdefabcde',
    stats: {
      price: '0.00008',
      priceChange24h: 0,
      volume24h: '0',
      marketCap: '80000',
      holders: 0,
      liquidity: '0',
    },
    auction: createAuctionConfig(
      '600000000',
      '0.00005',
      now - 3600 * 12,
      48,
      '0xbcdefabcdefabcdefabcdefabcdefabcdefabcde',
    ),
    auctionState: createAuctionState(
      createAuctionConfig(
        '600000000',
        '0.00005',
        now - 3600 * 12,
        48,
        '0xbcdefabcdefabcdefabcdefabcdefabcdefabcde',
      ),
      'live',
      {
        currentPrice: '0.00008',
        totalRaised: '48.0',
        tokensSold: '300000000',
        bidderCount: 156,
        progress: 50,
      },
    ),
  },
  // Upcoming auction
  {
    address: '0x3456789012345678901234567890123456789012',
    name: 'Cat Kingdom',
    symbol: 'CATK',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'Rule the cat kingdom',
    createdAt: Date.now() - 3600000,
    creator: '0xcdefabcdefabcdefabcdefabcdefabcdefabcdef',
    stats: {
      price: '0.00001',
      priceChange24h: 0,
      volume24h: '0',
      marketCap: '10000',
      holders: 0,
      liquidity: '0',
    },
    auction: createAuctionConfig(
      '500000000',
      '0.00001',
      now + 3600 * 2,
      24,
      '0xcdefabcdefabcdefabcdefabcdefabcdefabcdef',
    ),
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.00001',
        now + 3600 * 2,
        24,
        '0xcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      ),
      'upcoming',
    ),
  },
  // Settling auction
  {
    address: '0x4567890123456789012345678901234567890123',
    name: 'Doge Army',
    symbol: 'DARMY',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'The doge army rises',
    createdAt: Date.now() - 86400000 * 2,
    creator: '0xdefabcdefabcdefabcdefabcdefabcdefabcdef0',
    stats: {
      price: '0.00015',
      priceChange24h: 0,
      volume24h: '0',
      marketCap: '150000',
      holders: 0,
      liquidity: '0',
    },
    auction: createAuctionConfig(
      '500000000',
      '0.0001',
      now - 3600 * 47,
      48,
      '0xdefabcdefabcdefabcdefabcdefabcdefabcdef0',
    ),
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.0001',
        now - 3600 * 47,
        48,
        '0xdefabcdefabcdefabcdefabcdefabcdefabcdef0',
      ),
      'settling',
      {
        currentPrice: '0.00015',
        totalRaised: '75.0',
        tokensSold: '450000000',
        bidderCount: 234,
        progress: 98,
      },
    ),
  },
  // Completed - now trading
  {
    address: '0x5678901234567890123456789012345678901234',
    name: 'Wojak Classic',
    symbol: 'WOJC',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'Feel something',
    createdAt: Date.now() - 86400000 * 7,
    creator: '0xefabcdefabcdefabcdefabcdefabcdefabcdef01',
    stats: {
      price: '0.00032',
      priceChange24h: 15.5,
      volume24h: '125000',
      marketCap: '320000',
      holders: 1892,
      liquidity: '85000',
    },
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.0001',
        now - 86400 * 7,
        24,
        '0xefabcdefabcdefabcdefabcdefabcdefabcdef01',
      ),
      'completed',
      {
        currentPrice: '0.00018',
        totalRaised: '90.0',
        tokensSold: '500000000',
        bidderCount: 312,
        progress: 100,
      },
    ),
  },
  {
    address: '0x6789012345678901234567890123456789012345',
    name: 'Shiba Elite',
    symbol: 'SELITE',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'Elite shiba holders only',
    createdAt: Date.now() - 86400000 * 14,
    creator: '0xfabcdefabcdefabcdefabcdefabcdefabcdef012',
    stats: {
      price: '0.00089',
      priceChange24h: -3.2,
      volume24h: '450000',
      marketCap: '890000',
      holders: 3456,
      liquidity: '220000',
    },
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.0005',
        now - 86400 * 14,
        48,
        '0xfabcdefabcdefabcdefabcdefabcdefabcdef012',
      ),
      'completed',
      {
        currentPrice: '0.0006',
        totalRaised: '300.0',
        tokensSold: '500000000',
        bidderCount: 567,
        progress: 100,
      },
    ),
  },
  {
    address: '0x7890123456789012345678901234567890123456',
    name: 'Rocket Fuel',
    symbol: 'RFUEL',
    decimals: 18,
    totalSupply: '500000000',
    logoUrl: '',
    description: 'Fuel your rockets',
    createdAt: Date.now() - 86400000 * 5,
    creator: '0x0abcdefabcdefabcdefabcdefabcdefabcdef123',
    stats: {
      price: '0.0012',
      priceChange24h: 42.5,
      volume24h: '980000',
      marketCap: '600000',
      holders: 2345,
      liquidity: '150000',
    },
    auctionState: createAuctionState(
      createAuctionConfig(
        '250000000',
        '0.0005',
        now - 86400 * 5,
        24,
        '0x0abcdefabcdefabcdefabcdefabcdefabcdef123',
      ),
      'completed',
      {
        currentPrice: '0.0008',
        totalRaised: '200.0',
        tokensSold: '250000000',
        bidderCount: 445,
        progress: 100,
      },
    ),
  },
  {
    address: '0x8901234567890123456789012345678901234567',
    name: 'Based Token',
    symbol: 'BASED',
    decimals: 18,
    totalSupply: '1000000000',
    logoUrl: '',
    description: 'Stay based',
    createdAt: Date.now() - 86400000 * 3,
    creator: '0x1bcdefabcdefabcdefabcdefabcdefabcdef0123',
    stats: {
      price: '0.00045',
      priceChange24h: 8.7,
      volume24h: '340000',
      marketCap: '450000',
      holders: 1567,
      liquidity: '95000',
    },
    auctionState: createAuctionState(
      createAuctionConfig(
        '500000000',
        '0.0002',
        now - 86400 * 3,
        24,
        '0x1bcdefabcdefabcdefabcdefabcdefabcdef0123',
      ),
      'completed',
      {
        currentPrice: '0.00035',
        totalRaised: '175.0',
        tokensSold: '500000000',
        bidderCount: 389,
        progress: 100,
      },
    ),
  },
];

export const MOCK_TRADES: Trade[] = [
  {
    id: '1',
    tokenAddress: '0x5678901234567890123456789012345678901234',
    trader: '0xaaaa567890123456789012345678901234567890',
    type: 'buy',
    amountIn: '1000000000000000000',
    amountOut: '3125000',
    price: '0.00032',
    timestamp: Date.now() - 60000,
    txHash:
      '0x1111111111111111111111111111111111111111111111111111111111111111',
  },
  {
    id: '2',
    tokenAddress: '0x5678901234567890123456789012345678901234',
    trader: '0xbbbb567890123456789012345678901234567890',
    type: 'sell',
    amountIn: '5000000',
    amountOut: '1600000000000000',
    price: '0.00032',
    timestamp: Date.now() - 120000,
    txHash:
      '0x2222222222222222222222222222222222222222222222222222222222222222',
  },
  {
    id: '3',
    tokenAddress: '0x5678901234567890123456789012345678901234',
    trader: '0xcccc567890123456789012345678901234567890',
    type: 'buy',
    amountIn: '5000000000000000000',
    amountOut: '15625000',
    price: '0.00032',
    timestamp: Date.now() - 180000,
    txHash:
      '0x3333333333333333333333333333333333333333333333333333333333333333',
  },
  {
    id: '4',
    tokenAddress: '0x5678901234567890123456789012345678901234',
    trader: '0xdddd567890123456789012345678901234567890',
    type: 'buy',
    amountIn: '2000000000000000000',
    amountOut: '6250000',
    price: '0.00032',
    timestamp: Date.now() - 300000,
    txHash:
      '0x4444444444444444444444444444444444444444444444444444444444444444',
  },
];

export const MOCK_ORDER_BOOK: OrderBook = {
  bids: [
    {price: '0.00031', amount: '1000000', total: '310'},
    {price: '0.00030', amount: '2500000', total: '750'},
    {price: '0.00029', amount: '5000000', total: '1450'},
    {price: '0.00028', amount: '3000000', total: '840'},
    {price: '0.00027', amount: '8000000', total: '2160'},
  ],
  asks: [
    {price: '0.00033', amount: '800000', total: '264'},
    {price: '0.00034', amount: '1500000', total: '510'},
    {price: '0.00035', amount: '4000000', total: '1400'},
    {price: '0.00036', amount: '2000000', total: '720'},
    {price: '0.00037', amount: '6000000', total: '2220'},
  ],
};

// Helper functions to simulate API calls
export async function fetchTokens(): Promise<TokenWithStats[]> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_TOKENS;
}

export async function fetchToken(
  address: string,
): Promise<TokenWithStats | null> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TOKENS.find(t => t.address === address) ?? null;
}

export async function fetchTrades(tokenAddress: string): Promise<Trade[]> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TRADES.filter(t => t.tokenAddress === tokenAddress);
}

export async function fetchOrderBook(tokenAddress: string): Promise<OrderBook> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ORDER_BOOK;
}
