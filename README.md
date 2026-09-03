# Golden Era Sports Tour Website

Official website foundation for Golden Era Sports Tour by Vintage Events Monte-Carlo.

This first development phase creates the technical base, visual system, media architecture, content data structure, navigation foundation, first cinematic Hero prototype, next-event countdown and temporary homepage preview.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- ESLint
- next/font
- Native CSS with centralized design tokens

## Install

From this project folder:

```bash
npm install
```

## Start Locally

```bash
npm run dev
```

Then open the local URL shown by the terminal.

## Production Build

```bash
npm run build
```

## Contact Form Email

The contact form sends email server-side through the Resend HTTP API. Configure
these environment variables in the deployment platform:

```text
RESEND_API_KEY=re_...
CONTACT_EMAIL_FROM=Golden Era Website <website@your-verified-domain.com>
CONTACT_EMAIL_TO=info@goldenerasportstour.com
```

`RESEND_API_KEY` and `CONTACT_EMAIL_FROM` are required. `CONTACT_EMAIL_TO` is
optional and defaults to `info@goldenerasportstour.com`. Without the required
variables, the form returns a clear unavailable state and never reports a fake
successful delivery.

## Main Folders

- `app/` - Next.js App Router pages and global layout.
- `components/` - reusable UI, layout, media, event and section components.
- `data/` - local TypeScript content data, ready to be replaced by a CMS later.
- `lib/` - reusable logic, including next-event selection.
- `types/` - shared content models.
- `styles/` - global CSS, typography and color tokens.
- `public/images/` - final image assets.
- `public/videos/` - final video assets.

## Where Images Go

- `public/images/brand/`
- `public/images/home/`
- `public/images/events/st-moritz/`
- `public/images/events/monte-carlo/`
- `public/images/destinations/`
- `public/images/experience/`
- `public/images/racquets/`
- `public/images/partners/`
- `public/images/placeholders/`

Use meaningful names such as:

- `public/images/home/home-stmoritz-01.jpg`
- `public/images/events/st-moritz/stmoritz-hero.jpg`
- `public/images/events/monte-carlo/montecarlo-hero.jpg`
- `public/images/racquets/wilson-001.jpg`

## Where Videos Go

- `public/videos/home/`
- `public/videos/events/st-moritz/`
- `public/videos/events/monte-carlo/`

Future Hero video files can use:

- `public/videos/home/home-hero-desktop.mp4`
- `public/videos/home/home-hero-mobile.mp4`

## Event Data

Event data lives in:

```text
data/events.ts
```

The countdown and Hero receive event data through props. Event names, dates and links are not hard-coded inside the countdown component.

## Design Tokens

Color, typography and spacing foundations live in:

```text
styles/tokens.css
styles/typography.css
styles/globals.css
```

## CMS Preparation

For now, content is stored in local TypeScript files under `data/`. Later, a CMS can replace those local files while components continue receiving the same structured data.

## Future Shopify Preparation

No e-commerce has been implemented. The project keeps editorial content separate from future commercial routes such as `/shop`, `/shop/[category]` and `/product/[slug]`, so a headless Shopify integration can be added later without rebuilding the frontend.
