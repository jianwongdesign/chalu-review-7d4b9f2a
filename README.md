# Chalu — cinematic homepage and demo shop

An original responsive concept for Chalu, stored in the `crystal-cha` project. Chalu branding was confirmed on 28 October 2026.

- **Shareable preview:** https://jianwongdesign.github.io/crystal-cha/
- **Repository:** https://github.com/jianwongdesign/crystal-cha
- **Hero film:** https://jianwongdesign.github.io/crystal-cha/assets/hero-loop.mp4
- **Status:** Design and shopping demo. No real payments, orders or delivery.

## Design

Deep botanical green, warm ivory, gold signature branding, expressive Cormorant typography, and colour-coded tea portraits. The full-viewport hero uses a generated product film, restrained overlay text and a persistent navigation/bag control. All origin badges use “Made in Yunnan”.

Client references:

- https://chaludrinks.com/ — brand identity, product facts, photography, Yunnan origin and craft.
- https://www.saichodrinks.com/ — premium drinks presentation, imagery and lifestyle storytelling. No Saicho copy, media or source code are reused.

Layout, styles, interaction code and introductory campaign language are newly authored.

## Demo shopping

All four teas have sample SGD prices and add-to-bag controls. The drawer supports quantity changes, removal, an empty state, and browser-local persistence. Tasting-note dialogs can also add to the bag.

`checkout.html` reads that bag, shows itemized totals, validates sample delivery fields, and presents a clearly labelled demo confirmation. It clears the basket after completion. Payment uses a non-editable demo card; no payment details are requested. No order API, payment processor, email service or external form endpoint is connected. Only known product IDs and bounded quantities are persisted; contact fields are not stored or sent.

Illustrative prices: Snow Jasmine S$32, Hibiscus Noir S$36, Volcano Oolong S$38, Untamed Rosé S$36. Demo delivery: S$6 below S$80, otherwise complimentary. These are design placeholders, not verified Chalu pricing or policies.

## Film

One six-second Kling 3.0 Pro generation via Higgsfield cost **10.5 credits**, within the user's confirmed 50-credit cap. Two matching reference frames anchor the loop. The self-hosted H.264 film is 557,299 bytes, silent and approximately 6.04 seconds. It has a matching still poster, pause/play control and offscreen/background pause logic. Reduced-motion and data-saving preferences default to the poster until the visitor presses play. See `docs/HERO-VIDEO.md`.

## Run and verify

```sh
python3 -m http.server 4173 --bind 127.0.0.1
node --check site.js
node --check commerce.js
node --check checkout.js
node --test scripts/commerce.test.cjs
python3 scripts/build.py
```

Visit http://127.0.0.1:4173/. No package install or API keys are needed. Python and Node checks use their standard libraries.

Pushing `main` runs validation, builds an allowlist of website files into `dist/`, and publishes GitHub Pages. The build checks both pages, local and cross-page anchors, image/font/video assets and noindex metadata.

## Files

- `index.html`, `styles.css` — main content and original visual system
- `shop.css` — cinematic hero, bag and checkout layouts
- `site.js` — menu, tasting dialogs, sticky header and video controller
- `commerce.js` — shared sample catalogue, calculations and bag
- `checkout.html`, `checkout.js` — simulated checkout and confirmation
- `scripts/commerce.test.cjs` — basket totals, delivery and hostile-storage checks
- `docs/DESIGN-BRIEF.md`, `docs/QA.md`, `HANDOFF.md` — requirements and continuation record
- `docs/assets.json`, `docs/HERO-VIDEO.md` — media provenance

## Preview boundaries

Public by URL. Noindex metadata and a crawler-disallow file are indexing requests, not access control. Production hosting and DNS are unchanged. No analytics, real commerce, newsletter or form backend is connected. Existing contact links open the visitor's email client.

Chalu photography and trademarks remain their owners' property; confirm usage rights and final copy before production. This repository does not grant a licence to reuse those assets. Fonts use the SIL Open Font License, included in `assets/fonts/`.
