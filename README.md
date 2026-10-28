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

All four teas have sample SGD prices and add-to-bag controls. The drawer supports quantity changes, removal, an empty state, and browser-local persistence. Each tea has a dedicated, shareable product page with botanical tasting-note imagery, ingredient/blend information, serving suggestions and add-to-bag controls. On phones the homepage collection becomes a native swipe carousel with perspective portraits, optional automatic rotation, pause and arrow controls.

`checkout.html` reads that bag, shows itemized totals, validates sample delivery fields, and presents a clearly labelled demo confirmation. It clears the basket after completion. Payment uses a non-editable demo card; no payment details are requested. No order API, payment processor, email service or external form endpoint is connected. Only known product IDs and bounded quantities are persisted; contact fields are not stored or sent.

Illustrative prices: Snow Jasmine S$32, Hibiscus Noir S$36, Volcano Oolong S$38, Untamed Rosé S$36. Demo delivery: S$6 below S$80, otherwise complimentary. These are design placeholders, not verified Chalu pricing or policies.

## Film

One six-second Kling 3.0 Pro generation via Higgsfield cost **10.5 credits**, within the user's confirmed 50-credit cap. Two matching reference frames anchor the loop. The self-hosted H.264 film is 557,299 bytes, silent and approximately 6.04 seconds. It has a matching still poster, pause/play control and offscreen/background pause logic. Reduced-motion and data-saving preferences default to the poster until the visitor presses play. See `docs/HERO-VIDEO.md`.

## Run and verify

```sh
python3 -m http.server 4173 --bind 127.0.0.1
node --check motion.js
node --check navigation.js
node --check product.js
node --check collection.js
node --check site.js
node --check commerce.js
node --check checkout.js
node --test scripts/commerce.test.cjs
python3 scripts/render-products.py
python3 scripts/build.py
```

Visit http://127.0.0.1:4173/. No package install or API keys are needed. Python and Node checks use their standard libraries.

Pushing `main` runs validation, builds an allowlist of website files into `dist/`, and publishes GitHub Pages. The build checks all six pages, local and cross-page anchors, image/font/video assets and noindex metadata.

## Files

- `index.html`, `styles.css` — main content and original visual system
- `shop.css` — cinematic hero, bag and checkout layouts
- `site.js`, `navigation.js` — video controller, sticky header and shared menu
- `collection.js` — touch carousel, perspective and optional rotation
- `motion.js`, `motion.css` — progressive scroll reveals, interruptible disclosure height/fade animations and hover transitions
- `product.css`, `product.js` — product page styling and shared catalogue price
- `templates/product.html`, `docs/products.json`, `scripts/render-products.py` — maintained source for the four generated root-level product HTML files
- `docs/BOTANICAL-ASSETS.md` — original generated artwork and exact prompts
- `commerce.js` — shared sample catalogue, calculations and bag
- `checkout.html`, `checkout.js` — simulated checkout and confirmation
- `scripts/commerce.test.cjs` — basket totals, delivery and hostile-storage checks
- `docs/DESIGN-BRIEF.md`, `docs/QA.md`, `HANDOFF.md` — requirements and continuation record
- `docs/assets.json`, `docs/HERO-VIDEO.md` — media provenance

## Preview boundaries

Public by URL. Noindex metadata and a crawler-disallow file are indexing requests, not access control. Production hosting and DNS are unchanged. No analytics, real commerce, newsletter or form backend is connected. Existing contact links open the visitor's email client.

Chalu photography and trademarks remain their owners' property; confirm usage rights and final copy before production. This repository does not grant a licence to reuse those assets. Fonts use the SIL Open Font License, included in `assets/fonts/`.

## Product links

- [Snow Jasmine](https://jianwongdesign.github.io/crystal-cha/snow-jasmine.html)
- [Hibiscus Noir](https://jianwongdesign.github.io/crystal-cha/hibiscus-noir.html)
- [Volcano Oolong](https://jianwongdesign.github.io/crystal-cha/volcano-oolong.html)
- [Untamed Rosé](https://jianwongdesign.github.io/crystal-cha/untamed-rose.html)

Edit the template or product data, then run `python3 scripts/render-products.py`. The build rejects stale generated pages. Sample prices must match `commerce.js`; a unit check enforces this.

## Motion, type and food pairings

All pages use slightly stronger 500-weight text, including genuine medium Cormorant and DM Sans variable font files. The WOFF2 Latin subsets total about 172 KB. Existing fonts and OFL licences remain in `assets/fonts/`.

FAQ-style disclosures animate height and content opacity; repeated clicks reverse from the current visible height. Native summary/keyboard behaviour, browser scrolling and no-JS content remain usable. Scroll entrances are one-time subtle rises/fades, with capped stagger. Reduced-motion skips entrances and preserves instant disclosures; focus and window resize finish relevant animations.

Each product has three distinct suggested dishes in its “Better together” section, with short flavour-based explanations. These are editorial pairing ideas inspired by Chalu’s published flavour profiles, not manufacturer-tested recommendations. Tasting notes and ingredient information remain separate.
