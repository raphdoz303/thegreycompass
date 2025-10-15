# The Grey Compass - Architecture Documentation

**Last Updated**: October 14, 2025  
**Version**: 0.1.0 MVP

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript 5)
- **Styling**: Tailwind CSS v4 (with @theme syntax)
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Content**: JSON files in `src/data/signals/`
- **Domain**: thegreycompass.com

---

## Directory Structure

```
grey-compass/
├── public/
│   ├── fonts/                    # .ttf files (Space Grotesk, IBM Plex Mono, DM Mono)
│   └── logo/logo.png             # 96x96px transparent PNG
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + NoiseOverlay
│   │   ├── page.tsx              # Homepage with signal grid
│   │   ├── globals.css           # @theme design tokens + @font-face + texture
│   │   └── signals/[id]/page.tsx # Dynamic signal detail (async params)
│   ├── components/
│   │   ├── SignalCard.tsx        # Card with Link wrapper
│   │   └── NoiseOverlay.tsx      # Canvas-generated noise (client component)
│   └── data/signals/*.json       # Signal content files
├── tailwind.config.ts            # Custom colors + fonts
└── postcss.config.mjs            # @tailwindcss/postcss plugin
```

---

## Key Design Decisions

### 1. JSON Files over CMS
**Why**: Speed to MVP, version control, no backend complexity  
**Trade-off**: Manual editing, requires redeploy for updates  
**Migration Path**: Move to Notion API when >50 signals or need collaboration

### 2. Dedicated Pages over Modals
**Why**: SEO-friendly URLs, shareable links, browser back button works  
**Implementation**: `/signals/[id]` dynamic route with Next.js Link

### 3. Local Fonts over CDN
**Why**: Performance (no external request), privacy (no tracking), offline support  
**Files**: SpaceGrotesk (600,700), IBMPlexMono (400), DMMono (500) in `public/fonts/`

### 4. Client-Side Noise Generation
**Why**: Unique on each visit, no image file, customizable  
**Implementation**: Canvas API 300x300px, 5% opacity, overlay blend mode

### 5. Vercel Nameservers
**Why**: Automatic SSL, simpler than A records, instant rollback  
**Configuration**: ns1.vercel-dns.com, ns2.vercel-dns.com in GoDaddy

---

## Component Architecture

### `<SignalCard>` (src/components/SignalCard.tsx)
**Props**: id, week, date, number, title, region, axes[], structuralSignal  
**Behavior**: Wraps content in Next.js `<Link>` to `/signals/${id}`  
**Styling**: bg-gc-bg-secondary, hover changes border to gc-accent-blue

### `<NoiseOverlay>` (src/components/NoiseOverlay.tsx)
**Type**: Client component (`'use client'`)  
**Logic**: useEffect generates Canvas noise on mount, stores as data URL  
**Render**: Fixed positioned div with background-image, pointer-events-none  
**Tuning**: Change opacity (line 38) or canvas size (lines 13-14)

### Homepage (src/app/page.tsx)
**Structure**: Header → "LATEST SIGNALS" label → 3-column grid → SignalCard components  
**Data**: Imports signal JSON, maps to cards  
**Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Signal Detail (src/app/signals/[id]/page.tsx)
**Params**: `async function SignalPage({ params }: { params: Promise<{ id: string }> })`  
**Data**: Hardcoded signals object maps id → imported JSON (TECH DEBT)  
**Structure**: Back link → Centered metadata → Logo + Title → ID code → 4 blocks → Footer  
**Map Link**: `https://www.google.com/maps?q=${signal.fieldLocation}`

---

## Data Schema (Signal JSON)

```typescript
{
  "id": "gc-w[week]-[num]-[region]-[axis]",  // e.g. gc-w41-03-eu-eco
  "week": "Week XX",
  "date": "YYYY-MM-DD",
  "number": "#X",
  "title": string,
  "region": string,
  "axes": string[],                          // e.g. ["Economy", "Sanctions"]
  "observedIndicator": string,               // Block 1
  "systemicContext": string,                 // Block 2
  "structuralSignal": string,                // Block 3 (preview on cards)
  "projectedImpact": string,                 // Block 4
  "sources": string[],                       // Source triad
  "fieldLocation": "lat, lon"                // Google Maps coordinates
}
```

---

## Design System

### Colors (globals.css @theme block)
- `gc-bg-primary`: #1E242A (main background)
- `gc-bg-secondary`: #252A2E (cards)
- `gc-text-body`: #F3F5F7
- `gc-text-heading`: #EDF1F7
- `gc-text-subtitle`: #F0F2F4
- `gc-accent-blue`: #6B93B8 (links, highlights)
- `gc-accent-red`: #B45A4A (unused, future warnings)
- `gc-border`: #3B4148

### Typography
- **Headlines**: Space Grotesk 600-700 → `font-heading`
- **Body**: IBM Plex Mono 400 → `font-body` (also inline style in signal pages)
- **Metadata**: DM Mono 500 → `font-mono`

### Visual Effects
- **Noise**: 5% opacity grayscale Canvas pattern
- **Hover**: Border color shifts to gc-accent-blue (300ms transition)

---

## Technical Debt & Known Issues

1. **Hardcoded signal imports** in `[id]/page.tsx` - need dynamic fs.readdir() at build
2. **No JSON validation** - add Zod schema or build-time checks
3. **Inline font styles** - `style={{ fontFamily: '...' }}` instead of Tailwind class
4. **Limited mobile testing** - desktop-first development
5. **No error boundaries** - app crashes if JSON malformed
6. **Hydration warning suppression** - using `suppressHydrationWarning` for browser extensions

---

## Deployment Flow

1. Local: `git commit -m "msg"` → `git push`
2. GitHub receives push to `main` branch
3. Vercel webhook triggers build (`npm run build`)
4. Next.js generates static pages (~30 sec)
5. Deploys to global CDN
6. Live at thegreycompass.com (~2 min total)

**Rollback**: Vercel dashboard → Deployments → Previous → "Promote to Production"

---

## Adding a New Signal

1. Create `src/data/signals/gc-wXX-YY-region-axis.json` with schema
2. Import in `src/app/signals/[id]/page.tsx`:
   ```typescript
   import signalX from '@/data/signals/gc-wXX-YY-region-axis.json';
   const signals = { 
     'gc-w41-03-eu-eco': signal1,
     'gc-wXX-YY-region-axis': signalX  // ADD THIS
   };
   ```
3. Test: `npm run dev` → open `/signals/gc-wXX-YY-region-axis`
4. Commit and push

---

## Next.js 15 Gotchas

**Async params**: Dynamic routes use `Promise<{ id: string }>`, must `await params`
**Tailwind v4**: Use `@import "tailwindcss"` and `@theme` instead of v3 syntax
**Client components**: Need `'use client'` for hooks (useState, useEffect)

---

## Future Roadmap

**v0.2.0** (2 weeks): `/signals` archive page, filters, dynamic signal loading, mobile optimization  
**v0.3.0** (2 months): Deep Lens, About page, Newsletter, Search, Analytics  
**v1.0.0** (3 months): Notion API migration, Meta Reports, RSS, social sharing