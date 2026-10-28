# Chalu — restart handoff

Updated 28 October 2026.

## Current scope

- Brand: **Chalu**, explicitly confirmed.
- Repository: https://github.com/jianwongdesign/crystal-cha
- Shareable preview: https://jianwongdesign.github.io/crystal-cha/
- Branch: `main`; run `git log -1` for the latest checkpoint.
- The user requested demo e-commerce and checkout, “Made in Yunnan” wording, and a premium 100vh video hero. They confirmed a maximum of 50 Higgsfield credits.

## Implemented

The homepage now opens with a full-viewport cinematic hero, dark overlays, editorial text, transparent navigation, shop CTA and pause control. Navigation becomes solid green when scrolling, keeping the bag available. A silent generated loop and matching poster are self-hosted. Origin badge wording is “Made in Yunnan”.

All four products have explicit sample SGD prices, add-to-bag actions and dedicated product pages (Snow Jasmine, Hibiscus Noir, Volcano Oolong, Untamed Rosé). The old tasting-note dialogs have been replaced with page links. The bag supports quantity changes, removal, empty recovery and localStorage persistence. Checkout uses sample details and a non-editable demo card, with form validation, itemized totals and a simulated confirmation. No real payment or order is sent. Checkout contact values are not stored; only product IDs and quantities persist.

## Rounded styling

The latest visual revision applies consistent rounded corners to product and story imagery, buttons, tasting dialogs, the bag drawer, checkout fields, payment/delivery panels and order summaries. Shared tokens in `shop.css` use 24 px panels and 14 px controls on desktop, with 20 px / 12 px on mobile. The full-screen hero has rounded lower corners.

## Video

Kling 3.0 Pro through Higgsfield, one generation, **10.5 credits used**. The original result is 6.04 seconds at 1760×1176 despite the requested 16:9; CSS cover provides the responsive full-screen crop without distorting the image. Optimized H.264 is 557,299 bytes, with no audio. See `docs/HERO-VIDEO.md` for source and job information. No retries or extra generations were used.

## Verification

- Previous homepage and initial release checks are documented in Git history.
- New basket calculations and invalid stored values pass three Node tests.
- JavaScript syntax and static build validation cover both pages and the video assets.
- Browser checks: add products, change quantity, remove last item, empty-bag recovery, reload persistence, product-dialog add, edit-bag link, checkout validation and simulated order confirmation.
- Verified sample totals: S$70 subtotal; S$102 with complimentary demo delivery; one S$36 bottle plus S$6 demo delivery = S$42.
- Full-viewport hero geometry checked at 320×568, 390×844, 768×1024, 1024×768, 1440×1000, 1920×1080 and 2560×1440; no page overflow or overlap with the header.
- Generated video loads, plays muted, loops, and pauses through the visible control. Film frames were inspected for consistent packaging.
- Reduced-motion emulation was declined by browser security. The source fallback is implemented and reviewed; do not claim it was runtime-emulated.

## Continue later

Check Git state and the live preview first. This remains a noindex public design/demo site. Final prices, shipping rules, production platform, brand-media rights and real commerce integrations require separate client decisions. Existing Chalu production hosting and DNS were untouched.

## Latest revision — dedicated products and mobile showcase

Four root-level product pages are generated from `templates/product.html` and `docs/products.json` using `scripts/render-products.py`. Run the renderer after editing shared homepage cards/header/footer, product data or template. `scripts/build.py` checks generated output is current and validates all six pages. `commerce.js` remains the price authority; the new test checks all product-page prices against it.

Original botanical triptychs appear on soft CSS circles, with three labels per product. Notes describe aromas, not an ingredient/allergen declaration. No organic certification is claimed. Ingredient information is separate, attributed to Chalu; Rosé uses an explicitly incomplete blend overview. Generation prompts and saved asset paths are in `docs/BOTANICAL-ASSETS.md`. No new Higgsfield credits were spent.

The mobile/tablet hero uses contain framing up to 900 px, keeping the entire film visible above the headline. The full hero remains 100svh. The existing video is intentionally subtle; it was confirmed playing live before this revision. Playback recovery now retries on a normal user gesture or page return, keeps explicit play/pause, and shows Retry film for load errors. Reduced-motion/data-saving defaults remain unchanged.

The mobile collection (up to 760 px) uses native horizontal scrolling and snap positions, perspective rotation and bottle shadows. Optional automatic rotation advances every 4.2 seconds, reversing at the ends. It pauses after user interaction and offscreen/in background. Explicit arrows and play/pause are available; reduced-motion disables initial autoplay. Desktop retains the four-column collection. `navigation.js` is shared between home and product pages.

Shared CSS/JS URL versions changed to avoid returning visitors retaining the older preview assets.

## Latest polish — motion, food pairings and stronger typography

User requested smooth FAQ/scroll transitions, dish suggestions on each product page and slightly bolder wording throughout. `motion.js` and `motion.css` are shared by all six pages: interruptible native-details height/fade animation, one-time scroll entrances, hover and sticky-header transitions. Browser-native smooth anchor scrolling remains in use. Reduced-motion is respected, and native content remains usable without JS.

Product data now includes `pairings` (three dish/reason pairs per tea), rendered in the rounded “Better together” panel. These are clearly labelled editorial suggestions, inferred from the brand’s flavour profiles and general serving guidance. The product templates still carry visual tasting notes and separate ingredient/blend details.

All main text now uses weight 500. The previous DM file was static 400 despite a declared variable range; the new DM and Cormorant files are actual variable WOFF2 fonts from Google Fonts, subset to Latin/extended Latin, punctuation and arrows. Three files total 176,016 bytes. Original downloaded TTFs are local-only in `.local/font-sources/`; the committed WOFF2 sources are recorded in `docs/assets.json`. CSS URLs are versioned for this release.

Validation: all six pages at 320/768/1440 widths with no horizontal overflow and computed body/H1 weight 500; three pairings on each tea; desktop/mobile disclosure open/close, repeated clicks and keyboard Enter; native smooth anchor scrolling to the homepage ritual; no clipped/stale inline heights after completion. Reduced-motion remains source-reviewed only (previous browser emulation refusal still applies). Build now contains 48 static files.

## Current revision — navigation pages, natural copy and moving hero

All four main navigation entries now open dedicated root-level pages: shop.html, story.html, craft.html and ritual.html. Header/footer/CTA links and empty-bag/checkout shopping recovery use these routes. The shared page template and `scripts/render-pages.py` reuse homepage sections; run both renderers after shared edits. Story/craft have extra editorial sections and ritual links each tea's pairings. The shop preserves demo commerce and mobile perspective carousel. Build validates ten pages / 55 files.

Removed forced paragraph and section-heading breaks and narrow copy caps. Product descriptions, ingredients and “The perfect pour” now fill their available columns before wrapping. Hero display typography retains its deliberate composition.

Hero V2 supersedes the subtle first clip. Kling 3.0 Pro generated an 8-second moving shot for 14 credits; total 24.5 / 50. Later frames cropped bottles, so the first 2.25 seconds are looped forward/reverse for 4.5 seconds. Current film: assets/hero-loop-v2.mp4 (1,442,351 bytes) and matching v2 poster. A central play/loading/retry control makes blocked playback recoverable. No further spending needed. See docs/HERO-VIDEO.md.

Local verification: four new pages at 320/768/1440 widths, mobile menu destination and active navigation; product right-column paragraph uses its full 604.8 px desktop width with no manual breaks. Hero playback, pause/central resume and geometry at 320×568, 390×844, 768×1024, 1440×1000, 2560×1440 and 844×390; no horizontal overflow. New shop add-to-bag and checkout show S$32 + S$6 = S$38. Reduced-motion remains source-reviewed only.

User’s final direction: remove small decorative headings/captions throughout. Removed all eyebrow paragraphs from home, navigation pages, products, bag and checkout, plus photo slogans, hero footer slogans, founder micro-caption and product portrait kicker. Functional prices, tasting notes, form labels, origin facts and demo notices remain. No new media generation.

## Latest revision — smoother film, expanded subpages and tea-farm section

User requested smoother hero motion, more content on every subpage, and an image-led replacement for the plain next-page box. V3 retimes the same original video into an 8-second 60 fps loop with motion-compensated interpolation and cosine easing. Both turnarounds slow naturally. File: assets/hero-loop-v3.mp4 (2,761,598 bytes). Existing V2 poster stays. No new Higgsfield spend; cumulative 24.5/50. Reproduction script: scripts/smooth-hero.py.

All four navigation pages now have expanded content in templates/pages/*.html. Products have tasting_copy, occasion_copy and serve_copy in docs/products.json, rendered into a new readable tasting section and fuller serving disclosure. Checkout has a practical demo-help block. Small decorative headings remain absent.

The shared next-page module now uses a two-column photograph/copy layout with full paragraphs and a button, matching the content gutters. It stacks on mobile. assets/tea-farm.webp is an original built-in image-generation result (1536×1024, 314 KB), an imagined Yunnan-inspired farm, not a verified Chalu estate. Preserve that provenance and alt wording.

## Current phone hero revision

The user disliked the separated mobile film/text composition and requested a 100vh bottle-led hero. A new portrait bottle composition (built-in image tool) was animated in Higgsfield Kling 3.0 Pro for 10.5 credits. Third job: b41d69b7-ecdd-400b-a177-2bc3eb9ca37a. Cumulative spend is now 35/50; direct reframing was quoted at 99 and was not submitted.

Phone portrait <=600 px selects assets/hero-mobile-loop.mp4 and assets/hero-mobile-poster.webp; desktop/tablet/phone landscape use the previous V3 film. Mobile now has edge-to-edge 100svh video, larger complete bottles, compact bottom headline/shop CTA and an icon pause control, with navigation over the image. The small announcement, description and secondary CTA are omitted at this breakpoint. Picture handles the poster; site.js switches video source/poster on format changes and preserves explicit pause. Build validates the new data-* media references and picture source.


## News and open editorial layouts — 28 October 2026

Added a homepage News & stories section, navigation/footer links, news.html and three dedicated sample editorial article pages. Chalu's homepage and a focused site search did not reveal an existing news archive. Content is therefore clearly labelled sample editorial, with no invented publication dates, events or awards. The origin story paraphrases existing Chalu founder background; tasting/meal articles are original suggestions.

Maintain docs/news.json and templates/article.html, then run scripts/render-news.py before render-products.py and render-pages.py. Build checks freshness of all renderers and fourteen HTML pages (63 packaged files). Existing photography is reused; no new generation or credits.

User then requested every subpage feel less blocky/card-like. pages.css now opens up Story, Craft, Ritual, Shop, product, news/article and checkout layouts. Rounded imagery stays; section containers become transparent, selection guides become numbered ruled rows, Craft becomes a process list, pairing links become open rows, and the tea-farm module is an independent photograph and copy. Shop bottles are staggered in arched image frames on desktop; phone carousel stays. Product portraits use a soft radial wash and pairing content sits beside its rounded photo. Desktop header accommodates the fifth navigation entry.

QA: 13 subpages at 320, 768, 1440 and 2560 px; all one H1 and no horizontal overflow after correcting Ritual's tablet column widths. Visual reviews covered desktop Story, News, Shop and Snow Jasmine and phone Ritual. Mobile menu, article links, product add/bag, checkout S$32 + S$6 = S$38 and simulated order confirmation verified. Four commerce tests, seven JS syntax checks, build and diff whitespace checks pass. Hero assets and playback logic unchanged. Reduced-motion remains source reviewed, not browser emulated.

## Compact shared tea-farm section

Reduced the shared page-next module across Shop, Story, Craft, Ritual and News: image 550→360 px on desktop/tablet and 310→220 px on phone, heading capped at 48 px (36 px mobile), narrower image column and tighter spacing. Full content width and rounded image treatment remain. Checked all five pages at 320/768/2560 px without overflow and visually reviewed News at 1440 px. Required commerce tests, JS syntax checks and 63-file build passed. Shared stylesheet version: 20261028-compact.

## Hero playback controls removed

Removed both the central play/retry overlay and lower play/pause control at the user's request. site.js no longer depends on those elements; muted looping playback retains responsive media switching, offscreen/background pause, gesture recovery for blocked autoplay, and reduced-motion/data-saving poster fallback. Mobile shop CTA now uses the full available width. Collection carousel controls are unchanged. Verified phone 390×844 and desktop 1440×1000: correct film, readyState 4, playing/looping/muted, no hero controls, no overflow or console errors. Required four tests, seven JS syntax checks and static build passed. Styles/script cache version: 20261028-autoplay.
