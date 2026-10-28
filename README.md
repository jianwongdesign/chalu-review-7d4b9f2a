# Chalu homepage design preview

A responsive, original homepage concept for Chalu, stored in the `crystal-cha` project. Chalu branding was confirmed by the client contact on 28 October 2026.

- **Shareable preview:** https://jianwongdesign.github.io/crystal-cha/
- **Repository:** https://github.com/jianwongdesign/crystal-cha
- **Status:** Design concept, not a replacement for the live Chalu website.

## Design direction

Retain Chalu's botanical green, gold signature, tea heritage, and existing product photography. Introduce an original split editorial hero, warm ivory canvas, expressive Cormorant typography, four colour-coded tea portraits, an asymmetric origin story, and a quiet serving ritual.

References supplied by the client:

- https://chaludrinks.com/ — brand identity, existing product facts, photography, Yunnan origin and craft.
- https://www.saichodrinks.com/ — premium drinks presentation, generous imagery, collection discovery and lifestyle storytelling. No Saicho copy, assets, or source code are reused.

The layout, styles, interaction code and introductory campaign language are newly authored. The two references guide the concept; neither page layout is duplicated.

## Run locally

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://127.0.0.1:4173/. No framework, package install, account, API key, or build dependency is required.

## Validate and package

```sh
node --check site.js
python3 scripts/build.py
```

The build verifies headings, anchors, local assets, image alt attributes, product images and the noindex setting. It copies only the website files into `dist/`. Pushing `main` triggers `.github/workflows/pages.yml`, which validates, packages, and publishes the GitHub Pages preview.

## Files

- `index.html` — page structure and editable content
- `styles.css` — responsive design, typography, mobile and large-screen layouts
- `site.js` — mobile navigation and four accessible native product dialogs
- `assets/` — self-hosted fonts, logo and optimized WebP photography
- `docs/DESIGN-BRIEF.md` — client direction and scope
- `docs/assets.json` — photo and logo provenance
- `HANDOFF.md` — current state, checks and next decisions

## Preview boundaries

Publicly viewable, with noindex metadata and a crawler-disallow file. These are indexing requests, not access control. There is no cart, checkout, payment integration, newsletter collection, analytics, or form backend. Email links open the visitor's email client; no email is sent automatically.

Product descriptions are based on the existing Chalu homepage and should receive final client review. No prices, awards, stock claims or distribution commitments have been invented. Photography and trademarks remain the property of their respective owners; confirm media usage rights before production. This repository does not grant a licence to reuse Chalu brand assets. Fonts are distributed under the SIL Open Font License (included in `assets/fonts/`).
