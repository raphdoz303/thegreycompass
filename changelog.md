# Changelog

All notable changes to The Grey Compass project.

---

## [0.1.0] - 2025-10-14

### 🎉 Initial MVP Release

First public version deployed at thegreycompass.com

### Added

**Features**
- Homepage with signal card grid (3-column responsive)
- Signal detail pages with 4-block structure (Observed Indicator, Systemic Context, Structural Signal, Projected Impact)
- Dynamic routing `/signals/[id]`
- JSON-based content management
- Clickable field locations → Google Maps
- First signal: "Europe plans to use frozen Russian money for Ukraine" (gc-w41-03-eu-eco)

**Components**
- `SignalCard.tsx` - Preview card with hover effects
- `NoiseOverlay.tsx` - Canvas-generated background texture (5% opacity)

**Design System**
- 8 custom color tokens (graphite backgrounds, cold blue accents)
- 3 typefaces: Space Grotesk (headings), IBM Plex Mono (body), DM Mono (metadata)
- Local font files (no CDN)
- Film-grain texture overlay

**Infrastructure**
- Deployed on Vercel with auto-deploy from GitHub
- Custom domain: thegreycompass.com with SSL
- Vercel nameserver DNS management

**Tech Stack**
- Next.js 15 (App Router, TypeScript 5)
- Tailwind CSS v4 with @theme syntax
- Node.js 20.x

### Known Issues

⚠️ Hardcoded signal imports - need dynamic loading  
⚠️ No JSON validation  
⚠️ Inline font styles instead of Tailwind classes  
⚠️ Limited mobile testing  
⚠️ No error boundaries

---

## [Unreleased]

### Planned v0.2.0 (2 weeks)
- Signals archive page with filters
- Dynamic signal loading (eliminate hardcoded imports)
- Mobile layout optimization
- 5-10 additional signals

### Planned v0.3.0 (2 months)
- Newsletter integration
- Search functionality
- Analytics (Plausible)