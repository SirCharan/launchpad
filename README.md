# Unilaunch

**Unilaunch** — Swap, provide liquidity, and launch tokens.

A token launchpad with Uniswap-style design. Trade across 13+ networks with zero app fees. Launch new tokens via **CCA (Continuous Clearing Auction)** on Uniswap V4.

## Features

- **Swap** — Discover and trade tokens launched on Unilaunch
- **Pool** — Browse liquidity and token listings
- **Launch** — Create a new token with CCA: fair price discovery, then a Uniswap V4 pool at the discovered clearing price
- **Theme** — Dark (default) and light themes with pink (`#FF007A`) accents, persisted in localStorage
- **Design** — Uniswap-inspired palette, Inter typography, semantic CSS variables

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Radix UI](https://www.radix-ui.com) components
- [Lucide](https://lucide.dev) icons

## Getting Started

Install dependencies:

```bash
npm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run lint (gts)           |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Landing
│   ├── discover/     # Tokens / Swap
│   ├── launch/       # Launch token (CCA flow)
│   └── token/[address]/  # Token detail & swap/bid
├── components/
│   ├── layout/       # Navbar, Footer, Container
│   ├── auction/     # CCA bid card, progress, stats
│   ├── token/        # Token list, filters, card
│   ├── trading/     # Swap card, chart, trade history
│   └── ui/           # Button, Card, Input, etc.
├── lib/              # Mock data, utils
├── constants/        # Config (supply, duration, etc.)
└── types/            # TypeScript types
```

## Deploy

Deploy on [Vercel](https://vercel.com) (recommended) or any platform that supports Next.js:

- [Vercel deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)

## License

Private. Not financial advice.
