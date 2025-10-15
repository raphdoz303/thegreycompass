# The Grey Compass - Parameters Reference

**Last Updated**: October 14, 2025

---

## Component Props

### SignalCard (src/components/SignalCard.tsx)

```typescript
interface SignalCardProps {
  id: string;              // "gc-w41-03-eu-eco"
  week: string;            // "Week 41"
  date: string;            // "2025-10-12"
  number: string;          // "#3"
  title: string;           // Signal headline
  region: string;          // "Europe", "Asia", etc.
  axes: string[];          // ["Economy", "Sanctions", "Governance"]
  structuralSignal: string; // Preview text for card (200-300 chars)
}

// Returns: JSX.Element (Link wrapper with card markup)
```

### NoiseOverlay (src/components/NoiseOverlay.tsx)

```typescript
export default function NoiseOverlay(): JSX.Element | null

// No props - self-contained
// Internal state: noisePattern (string - data URL from Canvas)
// Canvas config: 300x300px, opacity 0.05, blend mode overlay
// Returns null until pattern generated
```

---

## Page Components

### Homepage (src/app/page.tsx)

```typescript
export default function Home(): JSX.Element
// No params - static page
// Imports: signalData from '@/data/signals/gc-w41-03-eu-eco.json'
```

### Signal Detail (src/app/signals/[id]/page.tsx)

```typescript
export default async function SignalPage({ 
  params 
}: { 
  params: Promise 
}): Promise

// Usage inside:
const { id } = await params;           // Extract id
const signal = signals[id];            // Lookup (hardcoded object)
if (!signal) notFound();               // 404 handling
const mapsUrl = `https://www.google.com/maps?q=${signal.fieldLocation}`;
```

---

## Signal JSON Schema

```typescript
interface Signal {
  id: string;                    // gc-w[week]-[num]-[region]-[axis]
  week: string;                  // "Week XX"
  date: string;                  // "YYYY-MM-DD"
  number: string;                // "#X"
  title: string;                 // <100 chars recommended
  region: string;                // Geographic identifier
  axes: string[];                // Thematic tags
  observedIndicator: string;     // Block 1: What happened
  systemicContext: string;       // Block 2: Background
  structuralSignal: string;      // Block 3: Key insight (used in card preview)
  projectedImpact: string;       // Block 4: Future implications
  sources: string[];             // ["AFP", "TASS", "UN News"]
  fieldLocation: string;         // "50.8366385031131, 4.375076313341347"
}
```

**Example**:
```json
{
  "id": "gc-w41-03-eu-eco",
  "week": "Week 41",
  "date": "2025-10-12",
  "number": "#3",
  "title": "Europe plans to use frozen Russian money for Ukraine",
  "region": "Europe",
  "axes": ["Economy", "Sanctions", "Governance"],
  "observedIndicator": "European Union finance ministers approved...",
  "systemicContext": "Since 2022, roughly €200 billion...",
  "structuralSignal": "Financial infrastructure becomes an extension...",
  "projectedImpact": "Creates a precedent for 'sanctions-finance' tools...",
  "sources": ["AFP", "TASS", "UN News"],
  "fieldLocation": "50.8366385031131, 4.375076313341347"
}
```

---

## CSS Design Tokens (globals.css)

### Color Variables

```css
@theme {
  --color-gc-bg-primary: #1E242A;
  --color-gc-bg-secondary: #252A2E;
  --color-gc-text-body: #F3F5F7;
  --color-gc-text-heading: #EDF1F7;
  --color-gc-text-subtitle: #F0F2F4;
  --color-gc-accent-blue: #6B93B8;
  --color-gc-accent-red: #B45A4A;
  --color-gc-border: #3B4148;
}
```

**Usage**: `bg-gc-bg-primary`, `text-gc-text-body`, `border-gc-border`

### Font Variables

```css
@theme {
  --font-family-heading: 'Space Grotesk', sans-serif;
  --font-family-body: 'IBM Plex Mono', monospace;
  --font-family-mono: 'DM Mono', monospace;
}
```

**Usage**: `font-heading`, `font-body`, `font-mono`

---

## Font Files

```typescript
// All in public/fonts/
SpaceGrotesk-SemiBold.ttf    // weight: 600
SpaceGrotesk-Bold.ttf        // weight: 700
IBMPlexMono-Regular.ttf      // weight: 400
DMMono-Medium.ttf            // weight: 500
```

---

## Image Assets

```typescript
// Logo
path: '/logo/logo.png'
display: 96x96px (20% larger than original 80px)
format: PNG with transparency
```

---

## Tailwind Configuration (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gc-bg-primary': '#1E242A',
        'gc-bg-secondary': '#252A2E',
        // ... all 8 colors
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['IBM Plex Mono', 'monospace'],
        'mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Next.js Metadata

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "The Grey Compass",
  description: "Global System Signals"
}
```

---

## Utility Functions

### Google Maps URL Generator (inline in [id]/page.tsx)

```typescript
const mapsUrl = `https://www.google.com/maps?q=${signal.fieldLocation}`;
// Input: "50.8366385031131, 4.375076313341347"
// Output: "https://www.google.com/maps?q=50.8366385031131, 4.375076313341347"
```

---

## Naming Conventions

### Signal ID Format
Pattern: `gc-w[week]-[number]-[region]-[axis]`  
Regex: `/^gc-w\d{1,2}-\d{2}-[a-z]{2,3}-[a-z]{3}$/`  
Examples:
- `gc-w41-03-eu-eco` (Week 41, #3, Europe, Economy)
- `gc-w42-01-as-sec` (Week 42, #1, Asia, Security)

### File Naming
- Components: PascalCase.tsx (`SignalCard.tsx`)
- Pages: lowercase page.tsx (Next.js convention)
- Data: kebab-case.json (`gc-w41-03-eu-eco.json`)

---

## Important Inline Styles (Workarounds)

### Body Text Font (in signal detail page)
```typescript

  {signal.observedIndicator}

```
**Why**: Tailwind `font-body` not applying correctly (TECH DEBT)

---

## NoiseOverlay Customization

```typescript
// In src/components/NoiseOverlay.tsx

// Canvas size (line 13-14)
canvas.width = 300;   // Change for grain size
canvas.height = 300;

// Opacity (line 38)
opacity: 0.05,  // 0.05 = 5%, try 0.08-0.15 for stronger

// Blend mode (line 39)
mixBlendMode: 'overlay',  // or 'multiply', 'screen'
```

---

## Build Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build locally
```

---

## Environment Variables

**Current**: None needed  
**Future**: See `.env.example` for Notion API, analytics, newsletter integration

---

## Version Compatibility

- Node.js: 18.17.0+ (20.x LTS recommended)
- Next.js: 15.0.x
- React: 19.0.x
- Tailwind: 4.1.14
- TypeScript: 5.x