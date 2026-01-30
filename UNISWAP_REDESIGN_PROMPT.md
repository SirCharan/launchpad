# Cursor Prompt: Uniswap-Style Redesign — Unilaunch

Copy the content below and give it to Cursor to implement the redesign.

---

## Task

Redesign this launchpad app to match **Uniswap’s design language**; the **app name is Unilaunch**:

- **App name:** Unilaunch.
- **Navigation:** Swap, Pool, Launch — consistent with Uniswap-style app.
- **Buttons & toolbars:** Connect wallet, Launch token, Swap, Explore, Docs — same tone and labels as Uniswap.
- **Backgrounds & theme:** Black (dark) and white (light) with pink (#FF007A) accents, per Uniswap’s design system.
- **Theme switcher:** Toggle between Dark and Light, persisted in localStorage.

Use Uniswap’s color palette, typography, and visual style across the entire app. All copy, section titles, and CTAs should read in a professional DeFi tone. **Brand name everywhere: Unilaunch.**

---

## Uniswap Design Research (Use These Values)

### Brand color (primary pink)

- **Hex:** `#FF007A`
- **RGB:** `255, 0, 122`
- **Use for:** Primary CTAs, links, active states, key highlights, brand accents

### Color roles (Swap Widget / design system)

Map these to your CSS variables and components:

| Role         | Dark theme (Uniswap)     | Light theme          |
|-------------|---------------------------|----------------------|
| **Primary** | `#FF007A` (pink)          | `#FF007A` (pink)     |
| **Secondary** | Muted gray text        | Muted gray text      |
| **Interactive** | `#FF007A` or hover pink | `#FF007A`           |
| **Container** | Near black `#0D0D0D`–`#141414` | White `#FFFFFF` / `#F7F8FA` |
| **Module**  | Dark gray `#1F1F1F`–`#2C2C2C` | Light gray `#F0F0F0`–`#E7E7E7` |
| **Accent**  | Pink `#FF007A`           | Pink `#FF007A`       |
| **Outline** | `#2C2C2C` / `#3D3D3D`    | `#E0E0E0` / `#D4D4D4` |
| **Dialog**  | Same as container/module | Same as container   |

Suggested neutrals:

- **Dark:** Background `#0D0D0D`, cards/surfaces `#1A1A1A`–`#252525`, borders `#2C2C2C`–`#3D3D3D`, text primary `#FFFFFF`, text secondary `#A3A3A3`–`#737373`
- **Light:** Background `#FFFFFF` or `#F7F8FA`, cards `#FFFFFF`, borders `#E5E5E5`, text primary `#0D0D0D`–`#171717`, text secondary `#737373`–`#525252`

### Typography

- **Primary font:** **Inter** (Uniswap/DeFi standard).
  - Use Google Fonts: `next/font/google` — Inter with weights 400, 500, 600, 700.
  - Expose as CSS variable (e.g. `--font-sans`) and use for body and UI.
- **Monospace (optional):** JetBrains Mono for addresses, code, numbers if needed; otherwise Inter is enough.

### Border radius

- Uniswap uses moderate radius (e.g. 12px–20px on cards/modals). Use `0.75rem`–`1rem` (12px–16px) for cards and buttons; keep it consistent.

---

## Implementation Requirements

### 1. CSS variables (e.g. in `src/app/globals.css`)

- Define two theme blocks: **dark (Uniswap)** and **light**.
- Dark: black/dark gray backgrounds, white/light gray text, primary/accent/interactive = `#FF007A`.
- Light: white/off-white backgrounds, dark text, same pink for primary/accent/interactive.
- Map to semantic names (e.g. `--background`, `--foreground`, `--primary`, `--accent`, `--card`, `--border`, `--muted`, etc.) so Tailwind/component classes keep working.

### 2. Theme switcher

- Add a **theme toggle** in the navbar: “Dark” (Uniswap) vs “Light”.
- Persist in `localStorage` (e.g. key `theme` or `launchpad-theme`) and apply a class on `<html>` (e.g. `dark` with your variable set).
- On load, read `localStorage` and set theme; if no preference, default to **dark (Uniswap)**.
- Toggle should be clearly visible and labeled (e.g. “Dark” / “Light” or sun/moon icons).

### 3. Fonts

- In `src/app/layout.tsx`, use **Inter** as the main font and assign it to `--font-sans` so `font-sans` uses Inter everywhere.
- Remove or replace Geist for body/UI; keep JetBrains Mono only for addresses/code if desired.

### 4. Branding and copy (Unilaunch)

- **App name:** Unilaunch (navbar logo text, footer, metadata).
- **Nav items:** Swap, Pool, Launch (or Tokens, Launch as appropriate).
- **Buttons:** Connect wallet, Launch token, Swap, Explore, Docs — match Uniswap’s tone.
- **Footer:** Product (Swap, Pool, Launch), Company (Docs, Blog), Support (Discord, Twitter), Legal (Terms, Privacy). © Unilaunch.
- **Hero / landing:** “Unilaunch — Swap, provide liquidity, and launch tokens.” Taglines and CTAs in the same professional DeFi tone.
- **Background colours:** Use the dark/light theme variables above; no leftover palettes from other brands.

### 5. Global application

- All pages and components use the new CSS variables (background, card, primary, accent, borders, text).
- Buttons/CTAs: primary = pink background or pink border/text; hover = slightly lighter/darker pink.
- Links and interactive elements: use the pink primary color.
- Cards, modals, inputs: use container/module and outline colors from the table above.
- No leftover hardcoded colors; everything comes from the two themes.

### 6. Files to touch (reference only; adjust to your structure)

- `src/app/globals.css` — theme variables for dark and light.
- `src/app/layout.tsx` — Inter font, theme class on `<html>`, optional theme script, metadata (title: Unilaunch — Swap, Pool, Launch).
- `src/components/layout/navbar.tsx` — Unilaunch logo/text, nav links (Swap, Pool, Launch), theme switcher, “Connect wallet” button.
- `src/components/layout/footer.tsx` — Unilaunch branding, Product/Company/Support/Legal columns, © Unilaunch.
- All pages (home, discover, launch, token): headings, buttons, and body copy in Uniswap style; background colours from theme variables.
- Any component using primary, accent, background, card, border — use Tailwind/semantic classes that map to the new variables.

---

## Summary

- **Name:** Unilaunch.
- **Look:** Uniswap-style — black (dark) or white (light) base, pink `#FF007A` for brand and interactions.
- **Nav & toolbars:** Swap, Pool, Launch; Connect wallet, Launch token, Swap, Explore, Docs.
- **Font:** Inter for UI; optional JetBrains Mono for code/addresses.
- **Feature:** Theme switcher (Dark ↔ Light), persisted in localStorage, default dark.
- **Scope:** Whole app; all text and backgrounds in accordance with Uniswap; semantic CSS variables + Tailwind.

Use the color roles and hex values above as the single source of truth for the redesign.
