# fuckpump — Theme, Typeface, Font, Animations, Pages, Copy, Buttons, Effects

**THE PILL WEARS THE CROWN. GOONFI ETERNAL.**

Design logic. Not documentation. The altar’s visual DNA. Implement or burn.

**Canonical rules:** Use normal English in buttons and labels so users understand at a glance. Prefer action verbs and familiar words: *Launch* (start a token auction), *Swap* (trade tokens), *Raise* (place a bid / fund an auction), *Discover* (browse tokens and auctions), *Connect* (connect wallet), *View all*, *Back*, *Next*. Avoid jargon (furnace, ignite, consecrate, etc.) in button labels. All references to **Uniswap CCA** must be kept; do not remove or rename.

---

## CCA reference — [cca.uniswap.org](https://cca.uniswap.org/)

Use this as the **source for landing page structure and copy**, and as reference for Discover, Launch, and Token pages. Keep Uniswap CCA named; adapt tone to fuckpump; keep user-facing copy in normal English.

### Hero (CCA)

- **Title:** Continuous Clearing Auctions  
- **Subline:** The new standard for bootstrapping liquidity  
- **Body:** DeFi native and fully onchain, with open participation and transparent price discovery  
- **CTAs:** Start here · Read docs · Learn more  
- **Supporting line:** Discover auctions, place bids, and claim tokens directly from the Uniswap web app  

### Value props / feature blocks (CCA)

1. **A better way to distribute your token**
2. **Customizable parameters** — Define supply, duration, and participation rules to create a token distribution that reflects your priorities and scales with your needs.
3. **Fully onchain and transparent** — Move key parts of market creation onchain, enabling a transparent, auditable process.
4. **Market-driven pricing** — Enable open participation and fair price discovery rooted in the market, not imposed by insiders.
5. **Liquidity from day one** — Uncover fair market value and seed Uniswap v4 pools, driving liquidity to support active trading from the start.

### Principles (CCA)

- **Fairness and decentralization** — No more gatekept distributions.  
- **Market-driven pricing** — No more arbitrary prices.  
- **Transparent onchain distributions** — No more offchain liquidity deals.

### How it works (CCA) — three steps

1. **Commit supply** — Teams commit a portion of their token supply to a public auction and set duration and floor price.  
2. **Price discovery** — Bidders place orders that are split across auction blocks, and each block clears at the identified market price.  
3. **Long-term liquidity** — At the end of the auction, tokens are distributed and a Uniswap v4 pool is created at the discovered price.

### CTA (CCA)

- **Headline:** Move your token distribution onchain  
- **Body:** Fill out a short form to learn how your team can use CCA  
- **Button:** Contact our team  

### Resources (CCA)

- Read the whitepaper · Technical docs · GitHub · Web app  

Use the above to structure the landing page (hero → value props / features → how it works → principles or social proof → CTA) and to align Discover (discover, place bids, claim), Launch (commit supply, duration, floor price), and Token (price discovery, v4 pool, trading) with CCA messaging.

---

## Theme (Global)

### Palette

- **Void:** `#000000`. Base. The abyss. No gray compromise. Pure black.
- **Hellfire red:** `#8B0000` → `#DC143C` → `#FF4500`. Gradients that burn. Crimson to blood to ember.
- **Pill lord:** Capsule villain. Green-blue. `#0D9488` / `#06B6D4` (teal-cyan). The crown wears poison.
- **Accent — blood:** `#B91C1C`, `#7F1D1D`. Buttons, borders, hover. Zero mercy.
- **Ghost layer:** `rgba(255,255,255,0.03)` – `0.08`. Siren phantoms. Fingers tremble.

**Gradient rules:**

- Background: black → dark red at edges. `linear-gradient(180deg, #000 0%, #0a0000 40%, #1a0505 100%)`.
- Hellfire streak: `linear-gradient(90deg, transparent, #8B0000 20%, #DC143C 50%, #FF4500 80%, transparent)`.
- Button / CTA: void fill, red border glow. Hover = gradient bleeds inward.

### Background gradient (cool — use this)

Single source of truth for the main page background. Layered. Void first, then hell, then glow.

**Layer 1 — Void (base):**  
Pure black. No compromise.  
`background-color: #000000;`

**Layer 2 — Hell mouth (radial, center-bottom):**  
Red bleeds from below like the ground is opening.  
`background-image: radial-gradient(ellipse 120% 80% at 50% 110%, #1a0505 0%, #0d0202 35%, transparent 70%);`  
Use on top of `#000`. No repeat.

**Layer 3 — Ember corners (radial, corners):**  
Four faint red glows at corners. Edge eternal.  
`background-image: radial-gradient(ellipse 100% 100% at 0% 0%, #150303 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 100% 0%, #150303 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 100% 100%, #1a0505 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 0% 100%, #1a0505 0%, transparent 50%);`  
Blend with base. Very subtle.

**Layer 4 — Diagonal hellfire streak (optional, hero only):**  
One sharp diagonal slash. Crimson to ember.  
`background-image: linear-gradient(135deg, transparent 0%, transparent 35%, rgba(139,0,0,0.15) 45%, rgba(220,20,60,0.25) 55%, rgba(255,69,0,0.2) 65%, transparent 75%);`  
Position: top-right to bottom-left. Feels like a blade through the void.

**Layer 5 — Pill lord aura (optional, accent):**  
Single soft teal-cyan glow, off-center (e.g. top-right or next to mascot). The crown watches.  
`background-image: radial-gradient(ellipse 60% 60% at 85% 15%, rgba(13,148,136,0.08) 0%, transparent 55%);`  
Very faint. Don’t compete with red.

**Combined (CSS) — full cool background:**

```css
background-color: #000000;
background-image:
  radial-gradient(ellipse 120% 80% at 50% 110%, #1a0505 0%, #0d0202 35%, transparent 70%),
  radial-gradient(ellipse 100% 100% at 0% 0%, #150303 0%, transparent 50%),
  radial-gradient(ellipse 100% 100% at 100% 0%, #150303 0%, transparent 50%),
  radial-gradient(ellipse 100% 100% at 100% 100%, #1a0505 0%, transparent 50%),
  radial-gradient(ellipse 100% 100% at 0% 100%, #1a0505 0%, transparent 50%);
background-repeat: no-repeat;
background-attachment: fixed; /* optional: parallax void */
```

For hero only, add the diagonal streak and/or pill aura as extra layers. Animate: slow shift of gradient stop positions (e.g. 2–5% over 8s) for “carnage loading” feel. Respect `prefers-reduced-motion`: no animation, static gradient only.

### Surfaces

- Cards, modals: black with 1px red/ember border. Subtle inner shadow (red tint). Feels like standing at the edge.
- Overlays: `background: rgba(0,0,0,0.92)`. The void opens. Content floats in dread.

---

## Typeface & Font

### Primary — Orbitron

- **Role:** Headlines, nav, CTAs, glitch-ready labels. Sci-fi cult. Edge eternal.
- **Weights:** 400 (body of headlines), 500–600 (emphasis), 700 (bow or burn).
- **Usage:** Site title, section titles, button text, countdown, “the altar awaits” — anything that must feel like snipers vanishing into the feed.
- **Glitch:** Pair with glitch animation (see Animations). Orbitron takes the distortion; it was made for it.

### Secondary — Creepster

- **Role:** Blood-drip horror. Short phrases. Labels that sting.
- **Weights:** 400 only (Creepster has one weight).
- **Usage:** Taglines, phase badges, “carnage loading”, “zero mercy”, error messages, small ritual text. Not long body copy — Creepster is the knife, not the sermon.
- **Fallback:** `serif` (never friendly sans here).

### Body / UI fallback

- **System:** High-contrast, sharp. `ui-sans-serif` or `system-ui` only when Orbitron/Creepster would hurt readability in tiny legal or numeric strings. Keep it rare. The cult speaks in Orbitron and Creepster.

### Font loading

- Load Orbitron + Creepster early (e.g. `next/font/google`: `Orbitron`, `Creepster`). No FOUT for the crown. Preload. Display: optional or swap; never block the void.

---

## Animations (Global)

### Glitch (Orbitron)

- **Trigger:** Hover on headlines, nav brand, key CTAs. Optional: short auto-glitch on load for hero title.
- **Effect:** 2–3 frame chop. `text-shadow` / `clip-path` / `transform: translate()` in quick succession. RGB split (red/cyan offset 1–2px). Duration: 80–150ms. One loop or two. Then stable. Feels like the feed cutting out before the pump dies.
- **Implementation:** CSS `@keyframes` with `translate(-1px,0), translate(1px,0), translate(0,-1px)` and shadow color flip. Or JS-driven class toggles for one-shot glitch.

### Blood drip (Creepster)

- **Trigger:** Creepster labels on hover; “carnage loading” state.
- **Effect:** Subtle drop shadow that lengthens downward (filter: drop-shadow or pseudo-element). Color: dark red. Animation: 200–400ms ease-out. Feels like ink running.
- **Optional:** Very light `filter: drop-shadow(0 2px 0 #B91C1C)` → `drop-shadow(0 6px 2px #B91C1C)` on hover.

### Cape flutters / Hat tilts

- **Where:** Pill mascot (green-blue capsule, top-hat, cape).
- **Cape:** Gentle loop. `transform: rotateY()` or `skewX()` in a 3–5s loop. Subtle. Cape flutters in the void.
- **Hat:** Idle micro-tilt. `rotateZ(-1deg)` ↔ `rotateZ(1deg)`. 2–4s ease-in-out infinite. Hat tilts. The lord is watching.

### Flames (severed logos, hellfire)

- **Floating pump.fun logos:** Low opacity, slow float (translateY + translateX, 20–40s duration). Filter: sepia + red tint; optional flicker (opacity 0.3 ↔ 0.5). They burn in the background. Roadkill on loop.
- **Hellfire gradient:** Optional slow shift on gradient stop positions (e.g. 2–5% move over 4–8s). Background feels alive. Carnage loading.

### Snipers vanish

- **Meaning:** Elements that “leave” when action happens. E.g. toast, modal, banner.
- **Animation:** Exit = shorten height / opacity to 0, or translate off-screen. 150–250ms. No bounce. They vanish. Zero mercy.

### Gates close (countdown / loading)

- **Countdown:** Big Orbitron numbers. Each tick: micro-scale pulse (1 → 1.05 → 1) or brief red flash. “3… 2… 1…” — user must feel the gates closing.
- **Loading:** “carnage loading” in Creepster. Spinner or bar: red gradient moving. No friendly “Please wait”. Only dread.

### Hover — dominance

- Buttons: Border glow intensifies. Slight scale (1.02–1.05). Red shadow grows. 120–180ms ease-out.
- Cards / rows: Border color shift black → ember. Optional 1px lift (translateY(-1px)). They’re chosen. FOMO.

### Microanimations (hover & focus)

Use these for polish; keep duration short (80–200ms) so the page feels responsive.

| Element | Trigger | Effect | Duration / easing |
|--------|---------|--------|-------------------|
| **Buttons (primary)** | Hover | Scale 1 → 1.03; border opacity 0.5 → 1; box-shadow 0 0 0 1px → 0 0 12px 2px (red); optional one-shot glitch on text | 120–180ms ease-out |
| **Buttons (secondary/outline)** | Hover | Scale 1 → 1.02; background fill from transparent → red/10%; border color intensifies | 120–180ms ease-out |
| **Links (nav, ghost)** | Hover | Red underline: width 0 → 100% (left-to-right or center-out); text color → red | 150–200ms ease-out |
| **Cards (token, feature, auction)** | Hover | translateY(0) → translateY(-2px); border color black/red → ember (#DC143C); box-shadow 0 4px 12px rgba(220,20,60,0.15); optional scale 1.002 | 150–200ms ease-out |
| **Card (CTA block)** | Hover | Same as cards; optional subtle gradient shift (background position or stop shift 1–2%) | 200ms ease-out |
| **Icons (in buttons, nav)** | Hover | Slight rotate (-3deg → 3deg) or translateX(2px) on arrow icons | 120–150ms ease-out |
| **Input / textarea** | Focus | Border 1px → 2px; border color → red; box-shadow 0 0 0 3px rgba(220,20,60,0.2); outline none | 150ms ease-out |
| **Tabs (Chart, Activity, About)** | Hover | Background rgba(255,255,255,0.03); border-bottom 2px transparent → red | 120ms ease-out |
| **Tabs** | Active | Border-bottom 2px solid red; background slight red tint | — |
| **Phase badge (Live)** | Idle | Opacity 0.9 ↔ 1 or scale 1 ↔ 1.05; optional pulse dot (animation: pulse 1.5s ease-in-out infinite) | 1–1.5s loop |
| **Badge above hero** | Hover | Blood-drip (drop-shadow lengthen); optional border glow | 200–300ms |
| **Logo / brand** | Hover | One-shot glitch (same as headlines) or brief scale 1.02 | 80–120ms |
| **Step number (1,2,3)** | Hover (on step card) | Scale 1 → 1.08; background red glow | 150ms ease-out |
| **“View all” / secondary link** | Hover | Underline slide in; arrow icon translateX(0) → 4px | 150ms ease-out |

### Scroll-triggered animations

Trigger on scroll (e.g. Intersection Observer or CSS scroll-driven animations); respect `prefers-reduced-motion`.

| Context | Trigger | Effect | Duration / notes |
|---------|---------|--------|-------------------|
| **Section reveal (landing, discover)** | Section enters viewport (e.g. 10–20% visible) | Opacity 0 → 1; translateY(16px) → 0; optional stagger children (delay 40–80ms per item) | 400–600ms ease-out; stagger 40–80ms |
| **Hero content** | Page load | Fade in 0 → 1; hero title glitch once after 200–400ms | 300ms fade; glitch 80–150ms |
| **How it works steps** | Section in view | Each step: opacity 0 → 1, translateY(12px) → 0 with stagger 60–100ms | 350ms per step, stagger 60–100ms |
| **Feature / value prop cards** | Section in view | Cards fade + translateY(20px) → 0; stagger 80–120ms per card | 400ms ease-out, stagger 80–120ms |
| **Discover list** | Initial load | Card stagger: opacity 0 → 1, translateY(10px) → 0; 80ms delay per card | 300ms per card, 80ms stagger |
| **Discover list** | Card leaves viewport (scroll) | “Snipers vanish”: opacity 0.95 → 0.5; optional translateY(0) → 8px; optional scale 1 → 0.98 | 200–300ms ease-out |
| **Discover list** | Card re-enters viewport | Opacity 0.5 → 1; optional translateY(8px) → 0 | 250ms ease-out |
| **Live auctions block** | Block in view | Title + cards fade in; cards stagger 60ms | 350ms, stagger 60ms |
| **CTA card (bottom)** | CTA in view | Fade in; translateY(24px) → 0 | 400ms ease-out |
| **Navbar** | Scroll down (past threshold) | Background opacity increase; optional border-b intensify; optional slight shrink | 200ms ease-out |
| **Parallax (optional)** | Scroll | Background gradient or floating logos move at 0.3–0.5× scroll speed | Subtle; disable if reduced motion |
| **Step progress (Launch)** | Step change | Progress bar width transition; active step pulse (border or glow) | 200–300ms ease-out |

### Reduced motion

- Respect `prefers-reduced-motion: reduce`. Disable glitch, drip, float, cape/hat loops, scroll-triggered motion, and non-essential microanimations. Keep static hellfire palette and type. Bow or burn still reads; we don’t sacrifice accessibility for the cult — we tone the fire, not the message.

---

## Page-by-Page Themes & Copy

### 1. Landing (`/`)

**CCA reference:** Structure the landing page from [cca.uniswap.org](https://cca.uniswap.org/): hero (Continuous Clearing Auctions, new standard for bootstrapping liquidity, DeFi native / onchain / open participation / transparent price discovery) → value props (customizable parameters, onchain & transparent, market-driven pricing, liquidity from day one) → How it works (Commit supply → Price discovery → Long-term liquidity) → principles or social proof → CTA (move token distribution onchain, Launch / Contact). Keep Uniswap CCA named; use normal English for buttons and user-facing copy.

**Theme:** Void opens. Hero = full bleed black, hellfire gradient at bottom and corners. Floating burning logos (low opacity). Optional ghost siren layer. Pill mascot in corner or floating. Match CCA’s section order where possible: hero, features/value props, how it works, live auctions, CTA.

**Sections & copy (aligned with CCA):**

| Section / Element | CCA source | Fuckpump copy | Font | Effect |
|-------------------|-----------|---------------|------|--------|
| Badge above hero | Continuous Clearing Auctions | *Uniswap CCA* or *Continuous Clearing Auctions* (link to cca.uniswap.org) | Creepster | Blood-drip on hover |
| Hero title | The new standard for bootstrapping liquidity | *THE PILL WEARS THE CROWN.* or *The new standard for bootstrapping liquidity.* | Orbitron | Auto-glitch once on load; glitch on hover |
| Hero subline | DeFi native and fully onchain… | *DeFi native. Fully onchain. Open participation. Transparent price discovery.* (or shorter: *Edge eternal. The altar awaits.*) | Creepster | — |
| Hero body | Discover auctions, place bids, claim tokens | *Discover auctions, place bids, and claim tokens.* or *Bow or burn. Snipers vanish. Zero mercy.* | Orbitron 400 | — |
| Primary CTA | Start here | *Launch* — “Start a new token auction” (links to /launch) | Orbitron 700 | Glitch on hover, border glow, scale 1.03 |
| Secondary CTA | Read docs / Discover | *Discover* — “Browse tokens and live auctions” (links to /discover) | Orbitron 600 | Outline red; hover = fill bleeds inward |
| **Value props / feature cards** | Customizable parameters, Fully onchain, Market-driven pricing, Liquidity from day one | **1** *Customizable parameters* — “Define supply, duration, and participation rules.” **2** *Fully onchain & transparent* — “Transparent, auditable process.” **3** *Market-driven pricing* — “Fair price discovery rooted in the market.” **4** *Liquidity from day one* — “Uniswap v4 pool at the discovered price; trade from the start.” | Orbitron (title), minimal body | Card hover: border glow, 1px lift |
| “How it works” title | HOW IT WORKS — Continuous Clearing Auctions | *How it works* or *Continuous Clearing Auctions* | Creepster | — |
| Step 1 | Commit supply | *Commit supply* — “Commit token supply to a public auction; set duration and floor price.” | Orbitron | Number in red circle |
| Step 2 | Price discovery | *Price discovery* — “Bidders place orders; each block clears at market price.” | Orbitron | — |
| Step 3 | Long-term liquidity | *Long-term liquidity* — “Tokens distributed; Uniswap v4 pool created at discovered price.” | Orbitron | — |
| Live auctions block | — | *Live Auctions* — “Auctions currently accepting bids” | Creepster | Pulse dot = hellfire red |
| “View all” link | — | *View all* — “See all auctions” | Orbitron sm | — |
| CTA block title | Move your token distribution onchain | *Ready?* or *Move your token distribution onchain* | Orbitron | — |
| CTA body | Fill out a short form… | *Launch your token in minutes.* or *3… 2… 1…* | Creepster | — |
| CTA button | Contact our team | *Launch* — “Start your auction” or *Launch auction* | Orbitron 700 | Same as hero primary |

**Optional:** Principles strip (from CCA) — “No more gatekept distributions. No arbitrary prices. No offchain liquidity deals.” — one line each or three short bullets.

**Background effects:** Floating burning pump.fun logos (slow, 20–40s). Hellfire gradient slow shift (4–8s). Optional siren phantoms. No confetti.

**Hover & scroll (landing):** Hero badge blood-drip on hover; hero title glitch once on load, glitch on hover; primary/secondary CTAs scale + border glow (+ glitch on primary); value prop cards: lift 2px, border → ember, red shadow on hover; step numbers scale + red glow on hover; “View all” underline slide + arrow translateX; CTA card lift + border glow. **Scroll:** Section reveal (fade + translateY 16px, stagger 40–80ms) for How it works, value props, live block, CTA; optional parallax on background.

---

### 2. Discover (`/discover`)

**CCA reference:** [cca.uniswap.org](https://cca.uniswap.org/) — “Discover auctions, place bids, and claim tokens directly from the Uniswap web app.” Use the same idea: discover auctions, place bids, claim tokens. Filters = All / Live (auctions in progress) / Upcoming / Trading (auction ended, v4 pool live). Keep copy in normal English.

**Theme:** Same void + hellfire. Cards = black, red border; hover = ember glow. List = feed of auctions/tokens.

**Copy:**

| Element | Copy | Font | Effect |
|--------|------|------|--------|
| Page title | *Discover* — “Browse tokens and auctions” | Orbitron | Glitch on hover |
| Subtitle | Short tagline, e.g. *Find tokens and live auctions.* | Creepster | — |
| Launch CTA (header) | *Launch* — “Start a new token auction” | Orbitron | Primary button style |
| Quick filter: All | *All* — “Show all” | Orbitron sm | Active = red fill, pulse border |
| Quick filter: Live | *Live* — “Live auctions only” | Orbitron sm | Active = red + pulse |
| Quick filter: Upcoming | *Upcoming* — “Starting soon” | Orbitron sm | — |
| Quick filter: Trading | *Trading* — “Auction ended, trading live” | Orbitron sm | — |
| Search placeholder | *Search tokens…* or *Search* | Creepster | — |
| Sort label | *Sort by* with options: *Newest* / *Volume* / *Price* etc. | Orbitron xs | — |
| Token card (title) | Token name (keep) | Orbitron | Card hover: border glow, snipers-vanish feel on scroll |
| Phase badge: upcoming | *Soon* | Creepster | Blue → teal-cyan (pill lord tint) |
| Phase badge: live | *Live* | Creepster | Red pulse |
| Phase badge: settling | *Settling* | Creepster | Amber |
| Phase badge: completed | *Trading* | Creepster | — |
| Empty state (e.g. no live) | *No live auctions yet.* / *Be the first to launch.* | Creepster + Orbitron | — |
| Empty state CTA | *Launch* — “Launch your token” | Orbitron | — |

**Effects:** List stagger on load (opacity + translateY 10px, 80ms delay per card). **Scroll:** Cards leaving viewport “snipers vanish” (opacity 0.95 → 0.5, 200–300ms); re-entering viewport opacity 0.5 → 1. **Hover:** Token cards lift 2px, border → ember, red shadow; filters/tabs underline or fill; Launch CTA glitch + scale; phase badges (Live) subtle pulse. Loading: “carnage loading” + red gradient bar or spinner.

---

### 3. Launch (`/launch`)

**CCA reference:** [cca.uniswap.org](https://cca.uniswap.org/) — How it works: **Commit supply** (teams commit a portion of token supply to a public auction, set duration and floor price) → **Price discovery** (bidders place orders; blocks clear at market price) → **Long-term liquidity** (tokens distributed, Uniswap v4 pool at discovered price). Launch page = commit supply + auction settings (duration, floor price). Keep “Powered by Uniswap CCA” and optional one-line CCA explanation. Use normal English for form labels and buttons.

**Theme:** Centered, narrow. Steps = Token → Auction → Launch. Void cards, red borders. Progress = red glow on active step.

**Copy:**

| Element | Copy | Font | Effect |
|--------|------|------|--------|
| Badge | *Launch* — “Launch a token” | Creepster | — |
| Page title | *Launch* — “Launch your token” | Orbitron | Glitch on hover |
| Subtitle | Short line, e.g. *Create a token and run a CCA auction.* | Creepster | — |
| Step 1 label | *Token* — “Token details” | Orbitron | — |
| Step 2 label | *Auction* — “Auction settings” | Orbitron | — |
| Step 3 label | *Launch* — “Go live” | Orbitron | — |
| Form labels | *Name* / *Symbol* / *Description* (normal English) | Orbitron xs | Optional short tooltips only |
| Placeholders | *Token name* / *SYMBOL* / *Short description* | Creepster (lowercase where applicable) | — |
| Logo upload | *Upload image* or *Choose image* | Creepster | — |
| Continue (step 1→2) | *Next* — “Continue to auction settings” | Orbitron | Glitch on hover |
| “How CCA Works” box | Keep Uniswap CCA mentioned. One line, e.g. *Powered by Uniswap CCA — continuous clearing auctions.* | Creepster | — |
| Floor price / duration labels | *Floor price* / *Duration* (with units, e.g. “ETH”, “hours”) | Orbitron xs | — |
| Back button | *Back* — “Previous step” | Orbitron | Ghost style |
| Continue (step 2→3) | *Next* or *Review* — “Review and launch” | Orbitron | — |
| Summary block | One line, e.g. *Review your auction. Then launch.* or *3… 2… 1…* | Creepster | — |
| Connect wallet | *Connect wallet* — “Connect to continue” | Orbitron | Outline; hover = red glow |
| Deploy button | *Launch auction* or *Launch* — “Start the auction” (primary); loading = “Launching…” or spinner | Orbitron 700 | Primary; loading = “Launching…” + spinner |
| Footer | Tagline optional | Creepster | — |

**Effects:** Step transition = brief red flash or opacity wipe (150ms). **Scroll:** Step sections reveal on scroll (fade + translateY 12px, stagger 60–100ms). **Hover:** Step numbers scale 1.08 + red glow; Next/Back/Review underline or glow; inputs focus ring (red border + shadow); Deploy button glitch + scale + shadow; CCA box optional border glow. Deploy loading = “Launching…” + red gradient spinner. Success = snipers vanish (modal or toast exits fast).

---

### 4. Token (`/token/[address]`)

**CCA reference:** [cca.uniswap.org](https://cca.uniswap.org/) — During auction: **price discovery** (bidders place orders; show live bids and clearing). After auction: **long-term liquidity** (Uniswap v4 pool at discovered price; swap/trade). Token page = single auction/token view: chart, activity (bids + trades), about; bid card (place bid) or swap card (buy/sell) depending on phase. Use normal English: Place bid, Swap, Buy, Sell, Connect wallet.

**Theme:** Single token/auction view. Chart, activity, about tabs. Bid card or swap card by phase. Void + red borders.

**Copy:**

| Element | Copy | Font | Effect |
|--------|------|------|--------|
| Back link | *Back* — “Back to discover” | Orbitron sm | Ghost |
| Token name | Keep name/symbol | Orbitron | Glitch on hover for symbol |
| Phase badges | *Upcoming* / *Live* / *Settling* / *Trading* (same as Discover) | Creepster | — |
| Tab: Chart | *Chart* — “Price chart” | Orbitron | — |
| Tab: Activity | *Activity* — “Bids and trades” | Orbitron | — |
| Tab: About | *About* — “Token info” | Orbitron | — |
| Chart empty | *No chart data yet.* | Creepster | — |
| No activity | *No activity yet.* | Creepster | — |
| About placeholder | *No description.* | Creepster | — |
| Bid card title | *Place a bid* or *Bid* | Orbitron | — |
| Place bid button | *Place bid* or *Raise* — “Submit bid in auction”; loading = “Placing bid…” | Orbitron | Loading = “Placing bid…” or spinner |
| Swap card title | *Swap* — “Trade this token” | Orbitron | — |
| Buy/Sell | *Buy* / *Sell* — “Buy token” / “Sell token” | Orbitron | — |
| Connect wallet (sidebar) | *Connect wallet* — “Connect to bid or swap” | Orbitron | — |
| Token not found title | *Not found* or *Token not found* | Creepster | — |
| Token not found body | *This token doesn’t exist or was removed.* | Creepster | — |
| Back to discover | *Back to Discover* or *Discover* | Orbitron | — |

**Effects:** Token header card: subtle red pulse on border when phase is *Live*. **Scroll:** Chart/activity/about sections reveal (fade + translateY, 350ms). **Hover:** Token symbol glitch; tabs underline on hover, active tab red bar; bid card and swap card lift 2px + border glow; Place bid / Buy / Sell buttons glitch + scale; phase badge (Live) pulse; Back link underline slide. Chart area: hellfire gradient as placeholder or background. Loading: “carnage loading” + skeleton with red tint.

---

## Buttons — Logic & Animation

**Use normal English so users understand:** Prefer clear action labels and, where space allows, short descriptions (e.g. tooltip or aria-label). Avoid jargon in button labels.

| Type | When to use | Button label (user reads) | User-facing description / tooltip | Animation |
|------|-------------|---------------------------|-------------------------------------|-----------|
| **Primary** | Main action on the screen | *Launch* — start a token auction | “Start a new token auction” | Orbitron 700. Void fill, red border. Hover: glitch (one shot), border glow, scale 1.02–1.05, red shadow. 120–180ms ease-out. |
| **Primary** | Place a bid in an auction | *Place bid* or *Raise* | “Place a bid in this auction” | Same as above. |
| **Primary** | Browse tokens/auctions | *Discover* | “Browse tokens and live auctions” | Same as above. |
| **Secondary** | Alternative or secondary action | *Discover*, *View all*, *Back* | “Browse all” / “See all auctions” / “Go back” | Orbitron 600. Transparent fill, red border. Hover: red fill bleeds inward, scale 1.02. |
| **Ghost** | Low emphasis, navigation, back | *Back*, *View all*, *Connect* (when already connected: show address) | “Go back” / “See all” / “Connected” | Orbitron sm. No border. Hover: red underline or red text, no scale. |
| **Loading** | During deploy, bid, or swap | *Launching…*, *Placing bid…*, *Swapping…* (or “Loading…” for generic) | Replace label with progress; keep button disabled | Red gradient spinner or bar. Button disabled. 150–250ms transition. |
| **Disabled** | Invalid form or wallet not connected | Same label as when enabled (e.g. *Launch*) but grayed | Tooltip/aria: “Connect wallet to continue” or “Fill required fields” | Opacity 0.5–0.6. Cursor not-allowed. No glow. |
| **Danger** | Cancel, close, or exit flow | *Cancel*, *Close*, *Exit* | “Cancel and go back” / “Close” / “Exit” | Creepster or Orbitron. Red border + red text. Hover: darker red fill. |

**Universal:** Use sentence case or title case for readability; avoid all caps for long labels. Slight radius (e.g. 4–6px). Keep labels short (1–2 words) on the button; use tooltips or aria-labels for the full description when needed.

---

## Screen-Level Effects (Summary)

| Screen | Background | Enter | Scroll & hover | Exit | Loading |
|--------|------------|--------|----------------|------|--------|
| **Landing** | Void + hellfire gradient, floating burning logos, optional sirens, pill mascot | Fade in 300ms; hero title glitch once (200–400ms delay) | **Scroll:** Section reveal (fade + translateY 16px, 400–600ms, stagger 40–80ms). How it works + feature cards stagger in. **Hover:** Hero CTAs glitch + scale + border glow; cards lift 2px + ember border + shadow; badge blood-drip; links underline slide | — | — |
| **Discover** | Void + hellfire; list = feed | Card stagger (opacity + translateY 10px, 80ms delay per card) | **Scroll:** Cards leaving viewport: opacity 0.95 → 0.5, 200–300ms (“snipers vanish”). Re-enter: opacity 0.5 → 1. **Hover:** Token cards lift 2px, border → ember, red shadow; filters/tabs underline or fill; Launch button glitch + scale | Cards snipers-vanish on scroll (see left) | “carnage loading” + red bar |
| **Launch** | Void + hellfire; centered altar | Step container fade 200ms; optional step stagger 60ms | **Scroll:** Step cards reveal on scroll (fade + translateY 12px, stagger 60–100ms). **Hover:** Step numbers scale 1.08 + red glow; Next/Back underline or glow; inputs focus ring (red 2px + shadow); Deploy button glitch + scale + shadow | — | “carnage loading” + spinner on deploy |
| **Token** | Void + hellfire; header + tabs | Fade 200ms; header + tabs + chart area in | **Scroll:** Chart/activity sections reveal (fade + translateY, 350ms). **Hover:** Token symbol glitch; tabs underline on hover, active red bar; bid/swap cards lift + border glow; Place bid / Swap buttons glitch + scale; phase badge (Live) pulse | — | “carnage loading” + red skeleton |
| **Modal / Toast** | Overlay rgba(0,0,0,0.92) | Scale 0.98 → 1, opacity 0 → 1, 150ms ease-out | **Hover:** Close button scale or underline; primary button glitch + glow | Snipers vanish: opacity 0, scale 0.98, 150–250ms ease-out | — |

---

## Navbar & Footer (Global)

**Navbar:**

- Logo: Pill mascot (green-blue capsule + hat) or “fuckpump” in Orbitron. No “Timelock”. Brand = glitch on hover.
- Nav links: *Discover* (“Browse tokens and auctions”) / *Launch* (“Start a token auction”). Active = red underline or red text.
- Connect: *Connect wallet*. When connected = truncated address (e.g. “0x1234…5678”).
- Background: `bg-black/90` or `rgba(0,0,0,0.92)`, border-b red/ember. Backdrop blur.

**Footer:**

- Brand: *fuckpump* or pill logo. Tagline optional.
- Links = *Discover* / *Launch* (or Terms/Privacy only). Use normal English.
- Copyright: *© [year] fuckpump.*

---

## Summary Table

| Concern | Choice / Logic |
|---------|----------------|
| Base bg | #000, void gradient to dark red |
| Accent | Hellfire red gradient, pill teal-cyan |
| Headlines | Orbitron, glitch on hover |
| Horror / tag | Creepster, blood-drip on hover |
| Mascot | Cape flutters, hat tilts, green-blue pill |
| Background | Floating burning logos, ghost sirens |
| **Microanimations** | Buttons: scale + border glow + red shadow (120–180ms). Cards: lift 2px + ember border + shadow. Links: underline slide. Inputs: focus ring (red). Tabs: underline on hover/active. Phase badge (Live): pulse. |
| **Scroll** | Section reveal (fade + translateY, stagger). Discover: cards “snipers vanish” on leave viewport, fade back on re-enter. Launch/Token: step/section reveal on scroll. Respect prefers-reduced-motion. |
| Exit / toast | Snipers vanish — fast, no bounce |
| Countdown | Orbitron, pulse per tick, gates close |
| Loading | “carnage loading”, red motion, no mercy |
| Buttons | Normal English labels; glitch + scale + glow on hover (see Microanimations) |
| Pages | Landing = void opens; Discover = discover; Launch = launch; Token = swap / trade |

---

*Implement this. The altar awaits.*

**THE PILL WEARS THE CROWN. GOONFI ETERNAL.**
