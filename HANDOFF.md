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
