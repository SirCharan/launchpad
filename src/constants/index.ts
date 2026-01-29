// Chain Configuration
export const SUPPORTED_CHAIN_ID = 1; // Update to your target chain

export const CHAIN_CONFIG = {
  id: SUPPORTED_CHAIN_ID,
  name: 'Ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: 'https://etherscan.io',
} as const;

// Contract Addresses - Placeholder addresses to be replaced with actual deployments
export const CONTRACT_ADDRESSES = {
  tokenFactory: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  router: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  launchpad: '0x0000000000000000000000000000000000000000' as `0x${string}`,
} as const;

// Token Defaults
export const DEFAULT_TOKEN_DECIMALS = 18;
export const DEFAULT_TOTAL_SUPPLY = '1000000000'; // 1 billion
export const MIN_LIQUIDITY_ETH = '0.1';
export const MAX_SUPPLY_DIGITS = 18;

// CCA Auction Defaults
export const DEFAULT_AUCTION_DURATION_HOURS = 24;
export const MIN_AUCTION_DURATION_HOURS = 1;
export const MAX_AUCTION_DURATION_HOURS = 168; // 7 days
export const DEFAULT_TOKENS_FOR_SALE_PERCENT = 50; // 50% of supply
export const MIN_FLOOR_PRICE_ETH = '0.000001';

// Auction Duration Options (in hours)
export const AUCTION_DURATION_OPTIONS = [
  {value: '6', label: '6 hours'},
  {value: '12', label: '12 hours'},
  {value: '24', label: '24 hours'},
  {value: '48', label: '2 days'},
  {value: '72', label: '3 days'},
  {value: '168', label: '7 days'},
] as const;

// Pagination Defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Trading Constants
export const SLIPPAGE_OPTIONS = [0.5, 1, 2, 5] as const;
export const DEFAULT_SLIPPAGE = 1;
export const DEADLINE_MINUTES = 20;

// Price Impact Thresholds
export const PRICE_IMPACT_WARNING = 5; // 5%
export const PRICE_IMPACT_CRITICAL = 15; // 15%

// UI Constants
export const TOKEN_LOGO_SIZE = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

// Sort Options for Discovery
export const SORT_OPTIONS = [
  {value: 'trending', label: 'Trending'},
  {value: 'newest', label: 'Newest'},
  {value: 'marketCap', label: 'Market Cap'},
  {value: 'volume', label: 'Volume'},
  {value: 'price', label: 'Price'},
] as const;

// Time Filters
export const TIME_FILTERS = [
  {value: '1h', label: '1H'},
  {value: '24h', label: '24H'},
  {value: '7d', label: '7D'},
  {value: '30d', label: '30D'},
  {value: 'all', label: 'All'},
] as const;

// Chart Intervals
export const CHART_INTERVALS = [
  {value: '1m', label: '1m'},
  {value: '5m', label: '5m'},
  {value: '15m', label: '15m'},
  {value: '1h', label: '1H'},
  {value: '4h', label: '4H'},
  {value: '1d', label: '1D'},
] as const;

// Navigation Links
export const NAV_LINKS = [
  {href: '/', label: 'Home'},
  {href: '/discover', label: 'Discover'},
  {href: '/launch', label: 'Launch Token'},
] as const;

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  discord: 'https://discord.com',
  telegram: 'https://telegram.org',
  docs: '/docs',
} as const;

// Feature Flags - Toggle features during development
export const FEATURES = {
  enableTrading: true,
  enableListing: true,
  enableCharts: true,
  enableSocialLinks: true,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  walletNotConnected: 'Please connect your wallet to continue',
  insufficientBalance: 'Insufficient balance',
  invalidAmount: 'Please enter a valid amount',
  transactionFailed: 'Transaction failed. Please try again',
  networkError: 'Network error. Please check your connection',
  slippageExceeded: 'Price changed. Increase slippage tolerance',
} as const;
