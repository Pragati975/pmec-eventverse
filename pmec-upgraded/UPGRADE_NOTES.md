# PMEC EventVerse — Upgrade Notes

## What Changed (v2.0)

### Design System (`index.css` + `tailwind.config.ts`)
- **Fonts**: Space Grotesk → **Orbitron** (headings) + **Syne** (body) — far more distinctive
- **Angular buttons**: New `.btn-angular` using `clip-path` for engineering aesthetic
- **Shimmer cards**: `.shimmer-card::before` sweep animation on hover
- **Scan line effect**: `.scan-container::after` animated horizontal scan
- **Stats bar styles**: `.stats-bar`, `.stat-cell`, `.stat-num` for the animated counter strip
- **Seats bar**: `.seats-bar` / `.seats-fill` for dynamic capacity visualization
- **Gallery masonry**: `.masonry` CSS columns layout
- **Typewriter cursor**: `.typewriter-cursor` blinking animation
- **Club cards**: `.club-card-icon-bg` faded watermark icon
- **Footer gradient**: `.footer-border` animated top border
- **Auth layout**: `.auth-grid` split-panel responsive layout
- **Timeline styles**: `.timeline-line`, `.timeline-dot` for schedule views
- **Dashboard cards**: `.dash-card` with hover lift effects
- **Section headers**: `.section-eyebrow`, `.section-divider` for consistent section styling

### `Hero.tsx`
- **Typewriter effect** cycling through 4 lines
- **Animated counter stats** (IntersectionObserver) below hero
- **Grid overlay** for depth
- **Pulse ring animations**
- **Angular clip-path buttons** replacing rounded-full pills
- **Stats bar** with 4 live-counting metrics

### `Navbar.tsx`
- Animated underline on hover (not color-only)
- Angular clip-path buttons for auth links
- Gradient top border on scroll
- Square logo container instead of circle

### `EventsSection.tsx`
- **3D tilt** on mouse move using `perspective + rotateX/Y`
- **Gradient banner** replacing generic Unsplash images
- **Live countdown** with seconds (was minutes only)
- **Seats progress bar** with color-coded urgency (green → amber → red)
- **Prize amount** displayed on each card
- **Category filter** with angular buttons
- Cards extracted as `<EventCard>` component (fixes hooks-in-loop)

### `ClubsSection.tsx`
- **Faded watermark icon** (96px opacity-4) as card background
- Per-club color accents (violet, pink, orange, emerald, yellow, indigo)
- **Members count** on each card
- **Explore arrow** CTA
- Gradient accent top border per card
- Club tag above name

### `GallerySection.tsx`
- **CSS masonry layout** (columns: 3 180px) — no more uniform h-64 grid
- **Category filter** (All / Technical / Cultural / Sports / Workshop)
- Animated lightbox with scale-in motion
- Category label in lightbox

### `Footer.tsx`
- **Newsletter signup** form with email input
- **4-column layout** (brand / links / contact+social / newsletter)
- Gradient top border
- Animated link hover with extending line
- Angular social icon buttons

### `ContactSection.tsx`
- **Subject dropdown** added
- **Loading spinner** on submit
- Contact info as styled glass cards
- Grid 2-column name/email layout

### `Login.tsx` + `Register.tsx`
- **Split layout**: feature panel left, form right (desktop)
- Left panel shows key benefits / social proof
- Angular form inputs (no border-radius)
- Better label typography (Orbitron small caps)
- Loading spinner while submitting

### `Dashboard.tsx`
- **Profile completion bar** with checklist
- **4 stat cards** (events, certificates, upcoming, clubs)
- Better empty state for registrations
- Angular avatar with clip-path

## How to Deploy

```bash
npm install
npm run build
# Deploy /dist to Netlify
```

No new dependencies added — everything uses the existing framer-motion,
lucide-react, tailwind, and shadcn/ui setup.
