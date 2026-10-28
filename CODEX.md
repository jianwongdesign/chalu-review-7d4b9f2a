# Project continuation

Read `HANDOFF.md`, `README.md`, `docs/DESIGN-BRIEF.md`, then inspect Git status and recent commits.

- Brand is **Chalu**. `crystal-cha` is the repository name.
- Vanilla HTML/CSS/JS. No frontend dependencies or production credentials required.
- GitHub Pages is a public preview; chaludrinks.com production is separate.
- Preserve the green/ivory/gold design, full-viewport video hero and existing four product names.
- Use “Made in Yunnan”, not “Born in Yunnan”.
- User explicitly requested demo e-commerce and checkout. Keep sample prices and order simulation clearly labelled; never silently connect real payments or order submission.
- `commerce.js` is the authoritative sample-price catalogue. Product card display prices must stay consistent with it.
- Cart persistence contains only known product IDs and bounded integer quantities. Contact/payment data must not be persisted or transmitted.
- Use relative paths for the `/crystal-cha/` Pages subdirectory. Preview remains noindex.
- Recheck mobile, tablet, desktop and large screens, bag/checkout behavior, and video autoplay/poster behavior after relevant edits.
- Check: `node --test scripts/commerce.test.cjs`, syntax-check all seven JS files, and `python3 scripts/build.py`.
- Pushing `main` publishes the preview automatically; verify the public URL and released files afterwards.
- Hero generation: three completed Higgsfield jobs, 35 credits total (10.5 + 14 + 10.5) from a confirmed 50-credit maximum. Desktop hero is hero-loop-v3.mp4; phone portrait uses hero-mobile-loop.mp4 and its own poster; re-estimate any future paid request.

- Product source: `templates/product.html`, `docs/products.json`; regenerate via `python3 scripts/render-products.py` after changing these or shared index header/cards/footer. Build rejects stale generated pages.
- Tasting illustrations are aroma cues, not ingredient/allergen or organic-certification claims. Preserve the explanatory caption and separate ingredient/tea information.
- Mobile collection uses native scroll-snap with optional rotation. Preserve user pause, reduced-motion, keyboard and finger-scroll behavior.

- Shared motion lives in `motion.js` / `motion.css`. Keep native scrolling, reduced-motion, keyboard disclosure access and no-JS readability intact.
- Body and serif fonts use genuine variable WOFF2 weights, generally 500. Do not map a static regular font to a variable weight range.

- Main navigation destinations are shop.html, story.html, craft.html, ritual.html and news.html. Regenerate with `python3 scripts/render-pages.py` after changing index content or templates/page.html. Build checks all fourteen pages.
- Copy wraps naturally to the available column width; avoid reintroducing manual paragraph line breaks or narrow max-width caps.

- Decorative eyebrow headings and small marketing captions were removed at the user’s request. Do not reintroduce them; retain useful prices, tasting notes, form labels and demo disclosures.

- Expanded navigation-page content lives in `templates/pages/*.html`; shared tea-farm CTA lives in `templates/page.html`. Generated tea-farm scenery is illustrative, not a verified Chalu estate photograph.

- Phone portrait (<=600 px) uses an edge-to-edge 100svh bottle film, compact bottom copy and no announcement bar. Preserve complete bottle framing and switch media on orientation/width changes while respecting reduced-motion and data-saving preferences. Hero play/pause controls were removed at the user's request; use automatic playback and a poster fallback. Tablet/landscape retain the desktop media composition.

- News content: docs/news.json and templates/article.html; run render-news.py, render-products.py, then render-pages.py after shared edits. Three stories are explicitly sample editorial content, not dated brand announcements.
- Subpages use open editorial layouts, fine rules and rounded photographs, rather than tinted cards around whole sections. Preserve natural wrapping, the mobile collection carousel and all demo commerce controls.
