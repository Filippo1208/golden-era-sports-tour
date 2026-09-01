# Golden Era Sports Tour Website

DO NOT REBUILD THE PROJECT FROM SCRATCH WITHOUT FIRST READING PROJECT_MEMORY.md.

## Project

Golden Era Sports Tour Website by Vintage Events Monte-Carlo.

## Objective

Create the first development phase only: technical foundation, global visual system, media architecture, content architecture, CMS-ready structure, future e-commerce-ready structure, navigation foundation, first cinematic Hero prototype, next-event countdown and a simple temporary homepage.

## Positioning

Golden Era is an international heritage tennis tour and travelling heritage tennis experience. It is not only a Monte-Carlo event and not only a vintage tennis tournament.

Core line:

THE EVOLUTION OF TENNIS, PLAYED BY AMATEURS.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- ESLint
- next/image ready
- next/font
- Modern CSS with centralized tokens

## Main Folder Structure

- `app/`
- `components/layout/`
- `components/navigation/`
- `components/media/`
- `components/event/`
- `components/sections/`
- `components/ui/`
- `data/`
- `lib/`
- `types/`
- `styles/`
- `public/images/`
- `public/videos/`

## Design Principles

- Editorial, cinematic, heritage, contemporary, elegant, sporty, international and minimal.
- Warm materials: clay, wood, paper and vintage tennis.
- Highly photographic once real assets arrive.
- Avoid ATP/federation style, SaaS style, corporate layouts, generic luxury templates and fake stock imagery.
- Avoid overusing words such as luxury, exclusive and premium.

## Color Tokens

- `--color-ivory: #F3EFE9`
- `--color-ivory-light: #FAF8F4`
- `--color-stone: #DCD1C5`
- `--color-taupe: #C2A590`
- `--color-terracotta: #CA7345`
- `--color-rust: #8E5337`
- `--color-brown-dark: #5D3524`
- `--color-charcoal: #3E3A36`

Semantic tokens are centralized in `styles/tokens.css`.

## Typography

- Editorial serif: Cormorant Garamond through `next/font`.
- Contemporary sans-serif: Manrope through `next/font`.
- Serif is used for Hero headlines, major statements, destination names, large numbers and countdown numbers.
- Sans-serif is used for navigation, labels, dates, buttons and functional information.

## Event Data Model

Defined in `types/content.ts` as `TourEvent`.

Key fields include id, slug, title, city, country, venue, startDate, endDate, countdownTarget, status, shortDescription, heroImage, heroVideoDesktop, heroVideoMobile, posterImage, ctaLabel and ctaHref.

## Destination Data Model

Defined in `types/content.ts` as `Destination`.

Tour and Destination can remain separate internally as data concepts, but the public navigation now merges destinations into the Tour area:

- Tour = when
- Destinations = where
- Public route area = `/tour`
- Individual destination/event stages = `/tour/[slug]`

## Racquet Data Model

Defined in `types/content.ts` as `Racquet`.

The future collection must be structured racquet objects, not a simple photo gallery.

## Media Conventions

Images belong under `public/images/` using clear names and destination/event folders.

Examples:

- `public/images/brand/goldeneralogo.png`
- `public/images/partners/heroes.png`
- `public/images/partners/sembrancher.png`
- `public/images/home/home-stmoritz-01.jpg`
- `public/images/events/st-moritz/stmoritz-hero.jpg`
- `public/images/events/monte-carlo/montecarlo-hero.jpg`
- `public/images/racquets/wilson-001.jpg`

No external stock photography, Unsplash or random placeholder services.

## Video Conventions

Videos belong under `public/videos/`.

Home Hero future files:

- `public/videos/home/home-hero-desktop.mp4`
- `public/videos/home/home-hero-mobile.mp4`

Use native HTML5 video through `CinematicVideo`. Do not add heavy video libraries unless specifically approved later.

Current real Hero desktop video:

- `public/videos/home/home-hero-desktop.mp4`

Future optional Hero files:

- `public/videos/home/home-hero-mobile.mp4`
- `public/images/home/home-hero-poster.jpg`

The video is referenced in the browser as `/videos/home/home-hero-desktop.mp4`, not imported as a JavaScript module. Hero crop is controlled through `homeHeroMedia.objectPosition` in `data/media.ts`.

## Homepage Sections

Current homepage order:

1. Hero
2. Next Stage Countdown
3. The Concept
4. The Tour

The Concept homepage teaser:

- Headline: `A TRIBUTE TO TENNIS HISTORY, PLAYED — NOT REMEMBERED.`
- Image: `public/images/home/home-concept-racquet.jpg`
- CTA: `/the-concept`
- Visual direction: editorial split layout, warm ivory background, one vertical heritage racquet photograph, no cards, no frames, no decorative panels.
- Image treatment: expanded toward the right edge on desktop, no frame/card, subtle CSS mask blending the left edge into the ivory background, very slight warm color correction, horizontal mask on desktop only, natural unmasked image on mobile.
- The lifestyle/model image is intentionally reserved for a future Experience section or deeper Concept storytelling.

The Tour homepage teaser:

- Eyebrow: `THE TOUR`
- Headline: `ONE GLOBAL CIRCUIT. FIVE ICONIC DESTINATIONS.`
- CTA: `/tour`
- Shows the five 2026 destinations as one adjacent vertical photographic strip.
- Monte-Carlo is slightly emphasized by default as the next stage.
- Desktop hover and keyboard focus smoothly expand the selected panel, clarify its photography and reveal date, status and an individual CTA only when `pageAvailable` is true.
- Mobile replaces the accordion behavior with a native horizontal 84-86vw `scroll-snap` strip; there is no autoplay or carousel library.
- Only Monte-Carlo currently exposes a stage CTA at `/tour/monte-carlo`; the main section CTA remains `/tour`.
- Uses exactly the same `var(--color-background)` warm ivory token as the Concept section, creating one continuous editorial Homepage canvas.
- No cards, frames, border radius, shadows, countdown duplication or full event details.

## Current Confirmed Events

- St. Moritz - 12 July 2026 - completed
- Monte-Carlo - 10-11 October 2026 - upcoming

Monte-Carlo is the next Golden Era stage. Do not use old September Monte-Carlo dates.

## Monte-Carlo Stage

Official landing route:

- `/tour/monte-carlo`

Weekend:

- 10-11 October 2026

Venue:

- Monte-Carlo Country Club

Programme:

- Practice Session & Welcome Party - 10 October 2026 - 16:00-18:00
- Tournament - 11 October 2026 - 10:00
- Cocktail Evening - Sunday evening

Entry:

- Standard entry: €1,000 per player
- Monte-Carlo Country Club members: €500
- Places are limited.

Included:

- Tournament access
- Vintage Tennis Club access
- Vintage tennis apparel
- Exclusive prizes
- Food & beverages

Guest policy:

- Maximum three accompanying guests per invitation.

Player number:

- NOT PUBLISHED until the 30 vs 32 discrepancy is confirmed.

Monte-Carlo Hero image slot:

- `public/images/events/monte-carlo/montecarlo-hero.jpg`

Monte-Carlo Hero image file:

- `public/images/events/monte-carlo/montecarlo-hero.jpg`

Monte-Carlo stage Hero design:

- Light warm ivory editorial layout
- Approximately 40/60 split desktop
- Text left
- Full-bleed destination image right
- No image card/frame
- No dark background
- Essential event information only
- Detailed schedule moved to The Weekend section
- Mobile stacks content then edge-to-edge image

Monte-Carlo Hero image treatment:

- Full bleed right-side image
- Subtle ivory-to-image blend on desktop
- No border / shadow / frame
- Mobile uses no horizontal blend
- Effect implemented in CSS, not baked into image

## Countdown Logic

`getNextEvent(events)` lives in `lib/events.ts`.

It selects the first upcoming event whose end date has not passed. The live countdown is a small client component to avoid hydration errors. If the event has started, it displays `EVENT IN PROGRESS`; if there is no future confirmed event, the module can show `NEXT STAGE TO BE ANNOUNCED`.

## CMS Future Strategy

Current data lives in local TypeScript files under `data/`. Components receive data through props and do not own event names, dates or media paths. A future CMS API can replace local data while keeping the same component contract.

## Shopify Future Strategy

No Shopify, cart, checkout, accounts or payment logic has been implemented. Future routes are reserved conceptually for:

- `/shop`
- `/shop/[category]`
- `/product/[slug]`

The frontend should remain one unified Golden Era website while CMS manages editorial content and Shopify manages products, checkout and orders.

## Routes

Current route:

- `/`
- `/tour/monte-carlo`

Prepared navigation targets:

- `/the-concept`
- `/tour`
- `/experience`
- `/collection`
- `/partners`
- `/team`
- `/contact`
- `/join`

Do not build these pages until requested.

The global `Tour` navigation item points to the full Tour overview at `/tour`; `/tour/monte-carlo` remains the individual Monte-Carlo stage page.

## Final Primary Navigation

Primary navigation order:

1. THE CONCEPT
2. TOUR
3. EXPERIENCE
4. THE COLLECTION
5. PARTNERS
6. TEAM
7. CONTACT

Primary CTA:

- JOIN THE TOUR

Navigation decisions:

- Golden Era logo / wordmark links to `/` and acts as Home.
- `GOLDEN ERA` was removed as a separate navigation item.
- `DESTINATIONS` was removed as a separate navigation item and merged into `TOUR`.
- `/tour/[slug]` is the architecture for individual destination/event stages.
- `/destinations` redirects to `/tour` for legacy links.
- `/golden-era` redirects to `/the-concept` for legacy links.

## Decisions Taken

- Created a clean Next.js foundation because the folder was empty except for Git.
- Kept dependencies minimal and did not add UI, animation, video or CMS libraries.
- Used local TypeScript data for CMS readiness.
- Used native CSS tokens instead of Tailwind or a design framework.
- Used placeholders for media instead of fake final imagery.
- Kept the homepage limited to Header, Hero, Countdown, temporary design-system preview and Footer.
- Replaced the public temporary design-system preview with the first real homepage editorial section: The Concept.
- Added `TEAM` to navigation.
- Reserved `/team` with a minimal route placeholder only.
- Connected the real Hero desktop video at `/videos/home/home-hero-desktop.mp4`.
- Removed Hero development video placeholder from the live Hero when the real video path is available.
- Removed any scrolling/marquee Hero typography pattern from the intended Hero direction.
- Revised Hero typography and spacing so the video remains the protagonist and the Header has a clear safe area.
- Set the official Hero copy to:
  - `GOLDEN ERA SPORTS TOUR`
  - `THE EVOLUTION OF TENNIS, PLAYED BY AMATEURS.`
  - `A global tennis tour celebrating the heritage and evolution of the game.`
- Reserved `played - not remembered` for the future Manifesto / Concept section, not the Hero.
- Header behaviour: fixed Header, transparent at the top of the Hero, opaque warm ivory after approximately 24px scroll, Hero content scrolls underneath Header, Header remains above Hero content, and no Hero typography should remain visible through the scrolled Header.
- EventCountdown visual direction: independent section below Hero, centered editorial composition, warm ivory background, no boxes, no cards, no vertical separators, no Hero overlap, large serif destination and countdown numbers, restrained sans-serif metadata, generous whitespace, centered text-link CTA.
- Built the first real Tour stage landing architecture at `/tour/[slug]`, currently serving the Monte-Carlo stage at `/tour/monte-carlo`.
- Monte-Carlo event-specific landing content lives in `data/events.ts` under `landingContent`; visual rendering lives separately in `components/sections/TourStageLanding.tsx`.
- The homepage primary Hero CTA now uses the next event CTA data, so Monte-Carlo can show `Explore Monte-Carlo` and point to `/tour/monte-carlo`.
- Official global Golden Era Header logo: `public/images/brand/goldeneralogo.png`.
- The official image wordmark replaces the previous temporary Header text mark on all pages.
- Official partners:
  - HEROE'S
  - Website: `https://www.heroesbrandsport.com`
  - Logo: `public/images/partners/heroes.png`
  - SEMBRANCHER
  - Website: `https://sembrancher.com`
  - Logo: `public/images/partners/sembrancher.png`
- Partner architecture: partner data is centralized in `data/partners.ts`, the reusable global `OfficialPartners` component is shown before the Footer on main public pages, `/partners` is the dedicated partners page, and global partner visibility remains distinct from future stage-specific partner associations.
- Partners page editorial assets:
  - HEROE'S: `public/images/partners/heroespartner.jpg`
  - SEMBRANCHER: `public/images/partners/sembrancherpartner.jpg`
- Partners page direction: partner photography is integrated into the editorial canvas with no partner cards, HEROE'S image reaches the right viewport edge, Sembrancher image reaches the left viewport edge, the global partner strip remains logo-only, and the dedicated `/partners` page is the only place using the editorial partner photographs.

## The Concept Page

THE CONCEPT PAGE CREATED.

Route:

- `/the-concept`

Sections:

1. Opening
2. Our Manifesto
3. Opposition of Materials
4. Evolution of the Racquet / 1,000 Racquets
5. Played, Not Remembered
6. How the Rule Works
7. Sporting Format
8. White Balls
9. Final CTA

Assets:

- `public/images/the-concept/racquetdetail.jpg`
- `public/images/the-concept/racquetevolution.jpg`
- `public/images/the-concept/played.jpg`

Photography rule:

- Never present Golden Era photographs as cards or framed images.
- Use integrated editorial compositions, viewport edges, full bleed and subtle masks.

Advanced animation pass:

- PENDING AFTER VISUAL APPROVAL.

## Current Status

First development phase foundation implemented. Hero/Header refinement phase implemented with the real desktop video.

## Tour Landing Page

Route:

- `/tour`

2026 stages:

1. St. Moritz - 12 July 2026 - Completed
2. Monte-Carlo - 10–11 October 2026 - Next Stage
3. Los Angeles - 25 October 2026 - Upcoming
4. São Paulo - November 2026 - TBC
5. Dubai - 06 December 2026 - Finals

Images:

- `/images/tour/stmoritz.jpg`
- `/images/tour/montecarlo.png`
- `/images/tour/losangeles.png`
- `/images/tour/saopaulo.png`
- `/images/tour/dubai.png`

Design:

- Editorial destination journey
- No cards
- Large integrated photography
- Brochure-inspired itinerary
- Asymmetric destination sections
- Los Angeles uses an ivory editorial text block above the photography; text is never overlaid on the image and the headline uses a reduced scale.
- Destination motion uses one-time IntersectionObserver reveals with directional image clips, restrained text staggering and selected subtle parallax. Monte-Carlo copy is sticky on desktop only, Dubai imagery arrives after its text, and reduced-motion preferences disable the movement.

Future teaser:

- New York / 2027 / not confirmed

Tour overview content is centralized in `data/events.ts` as `tourOverviewStages`. The existing confirmed-event data used by countdown and individual stage pages remains separate in `tourEvents`.

Every Tour overview stage stores its intended `/tour/[slug]` route and a `pageAvailable` flag. Only Monte-Carlo currently exposes its destination CTA; future stage routes remain prepared in data but are not linked until confirmed pages exist.

## Next Step

Add real Golden Era image/video/logo assets, then design the next requested section or route in a separate phase.
