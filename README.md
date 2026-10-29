# Chalu — cinematic homepage and demo shop

An original responsive concept for Chalu, stored in the `crystal-cha` project. Chalu branding was confirmed on 28 October 2026.

- **Shareable preview:** https://jianwongdesign.github.io/chalu-review-7d4b9f2a/
- **Repository:** https://github.com/jianwongdesign/chalu-review-7d4b9f2a
- **Hero film:** https://jianwongdesign.github.io/chalu-review-7d4b9f2a/assets/hero-loop-v3.mp4
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

The current Kling 3.0 Pro film has visible camera movement. Its opening footage is motion-interpolated and retimed with a cosine curve into an 8-second, 60 fps loop. The movement slows naturally at both turnarounds, preserving complete bottles for mobile contain framing. The silent H.264 file is 2,761,598 bytes; smoothing used no additional Higgsfield credits. Three generations cost **35 credits total**, within the approved 50-credit cap. A matching poster, prominent play/retry overlay, pause control and offscreen/background pause logic support playback. Reduced-motion and data-saving preferences default to the poster until the visitor presses play. See `docs/HERO-VIDEO.md`.

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
python3 scripts/render-pages.py
python3 scripts/build.py
```

Visit http://127.0.0.1:4173/. No package install or API keys are needed. Python and Node checks use their standard libraries.

Pushing `main` runs validation, builds an allowlist of website files into `dist/`, and publishes GitHub Pages. The build checks all ten pages, local and cross-page anchors, image/font/video assets and noindex metadata.

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

- [Snow Jasmine](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/snow-jasmine.html)
- [Hibiscus Noir](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/hibiscus-noir.html)
- [Volcano Oolong](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/volcano-oolong.html)
- [Untamed Rosé](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/untamed-rose.html)

Edit the template or product data, then run `python3 scripts/render-products.py`. The build rejects stale generated pages. Sample prices must match `commerce.js`; a unit check enforces this.

## Motion, type and food pairings

All pages use slightly stronger 500-weight text, including genuine medium Cormorant and DM Sans variable font files. The WOFF2 Latin subsets total about 172 KB. Existing fonts and OFL licences remain in `assets/fonts/`.

FAQ-style disclosures animate height and content opacity; repeated clicks reverse from the current visible height. Native summary/keyboard behaviour, browser scrolling and no-JS content remain usable. Scroll entrances are one-time subtle rises/fades, with capped stagger. Reduced-motion skips entrances and preserves instant disclosures; focus and window resize finish relevant animations.

Each product has three distinct suggested dishes in its “Better together” section, with short flavour-based explanations. These are editorial pairing ideas inspired by Chalu’s published flavour profiles, not manufacturer-tested recommendations. Tasting notes and ingredient information remain separate.

## Main navigation pages

- [Shop the collection](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/shop.html)
- [Our story](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/story.html)
- [The craft](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/craft.html)
- [The ritual](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/ritual.html)

These are dedicated documents with active navigation, shared commerce, mobile menus and contextual next-page links. Their source is `templates/page.html`, the fuller editorial fragments in `templates/pages/`, and `scripts/render-pages.py`, which reuse maintained homepage sections. `pages.css` provides page layouts and naturally wrapping copy. Run both page renderers after shared homepage edits.

The four navigation pages share a rounded, full-content-width image-and-copy section featuring an original generated tea-farm landscape. Shop has a selection guide, Story has fuller founder/table copy, Craft adds tasting guidance, and Ritual includes hosting ideas. Products include individual tasting narratives and expanded serving guidance. Decorative small headings remain removed.

Phone portrait layouts up to 600 px use a separate six-second portrait film with larger complete bottles and compact bottom copy. The video fills 100svh; a responsive picture supplies its poster and the player switches media on orientation changes. Desktop retains the smooth 8-second V3 film. The portrait generation added 10.5 Higgsfield credits, bringing total spend to 35/50.


## News and editorial subpages

[News & stories](https://jianwongdesign.github.io/chalu-review-7d4b9f2a/news.html) is linked from the homepage, desktop/mobile menus and footer. Three dedicated sample articles cover the brand story, hosting a tasting and choosing tea for a meal. They are labelled preview editorial content; no fictional dates or announcements are presented as real news.

`docs/news.json`, `templates/article.html` and `scripts/render-news.py` maintain these stories and the homepage listing. After shared changes, run the renderers in this order:

```sh
python3 scripts/render-contact.py
python3 scripts/render-news.py
python3 scripts/render-products.py
python3 scripts/render-pages.py
python3 scripts/build.py
```

The build validates fourteen pages and packages 63 files. Subpages now use open editorial compositions, alternating photography, fine dividers and generous spacing. Selection guides and pairings are unboxed; the shop has staggered arched bottle images, and products have soft open portrait backgrounds. The shared tea-farm photograph stays rounded with copy beside it on the page canvas. Checkout retains its form controls with a lighter summary layout.


## Time-limited review access

This preview runs for 10 days and 12 hours from 28 October 2026, 08:57:22 UTC. It ends **8 November 2026 at 04:57:22 Malaysia time** (7 November, 20:57:22 UTC). `preview-policy.json` is the single source of these dates; ordinary deployments do not extend them.

The build injects `preview.js` / `preview.css` into every deployed page. Text selection, copying, image dragging and the context menu are discouraged outside editable form fields. A browser timer redirects expired visits and already-open tabs to the expiry screen. These controls cannot prevent screenshots, developer tools, saved files or source downloads. The GitHub repository remains public and browser clocks can be changed; this is not authenticated access.

The scheduled workflow checks at minutes 17 and 47 each hour. After expiry, it rebuilds every route as an expiry message and omits the original media and scripts. The deployed `preview-state.json` makes the cleanup idempotent. Schedules can be delayed by GitHub, so server-side cleanup is best effort after the deadline; the browser guard handles the normal exact-time experience. Push/manual deployments after the deadline also produce only the expired version. Repository files/history stay intact for future reference.

Use `python3 scripts/build.py` and serve **dist/** to review the guarded output locally. Test the policy with `python3 -m unittest discover -s scripts -p '*_test.py'`. Active output now contains 67 files. An expired output has no original assets. To extend access later, explicitly update the policy expiry and publish a new build.


## Floating WhatsApp contact

The shared footer includes a forest-green WhatsApp pill on desktop and a 58 px circular launcher on mobile/tablet. It stays hidden over the mobile homepage hero and while the menu is open. It appears on all thirteen marketing/product/article pages; checkout and expired pages omit it.

The destination is **pending**. `docs/contact.json` currently has an empty `whatsapp_number`; clicking the button shows an explicit demo dialog and does not send anything. Once the user provides a number, enter country-code digits only and run render-contact.py, render-news.py, render-products.py and render-pages.py, then build. A configured number generates a direct WhatsApp chat link with the supplied greeting. No WhatsApp SDK, tracking or unsolicited messages are used. Active build: 68 files.
