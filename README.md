# Contego homepage

Next.js (App Router, TypeScript, Tailwind CSS v4) implementation of the Contego homepage design.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

The homepage layout follows the [pirsch.io](https://pirsch.io) visual system (all-dark,
centered section headings with mono pill labels, spotlight glows, dense card grids,
a testimonial wall, and a big glow CTA), recolored to the Contego mint green and
populated with Contego's own agency copy.

- `app/` — root layout (fonts, metadata) and the single homepage route.
- `components/` — one component per homepage section. Section order: `Nav`, `Hero`,
  `TrustStrip`, `Setup`, `Difference`, `Deliver`, `WhereItSells`, `MadeForFunnel`,
  `Proof`, `Testimonials`, `Claim`, `Faq`, `Footer`. Shared bits: `SectionHead`,
  `SectionLabel`, `ClipSlot`, `PlayIcon`. `Claim` and `Faq` are client components
  (form + accordion state); everything else is a server component.
- `public/contego-mark.png` — brand mark used in the nav and footer.
- `design/` — the original Claude Design handoff bundle (brief, chat transcript, source HTML prototype), kept for reference. Not part of the build.

## Placeholders

Per the Contego brand brief, the design intentionally leaves these unfilled rather than inventing content:

- Client logos in the trust strip (`components/TrustStrip.tsx`)
- Proof metrics (`components/Proof.tsx`)
- Testimonial cards (`components/Testimonials.tsx`)
- Hero and comparison video clips (`components/Hero.tsx`, `components/Difference.tsx`)

Swap in real logos, numbers, and clips when they're available.

## Form

The "claim your free sample" form (`components/Claim.tsx`) is front-end only for now — it shows a confirmation message on submit but doesn't call a backend. Wire it up to a real endpoint (API route, CRM, email service) when ready.
