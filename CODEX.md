# Project continuation

Read `HANDOFF.md`, `README.md`, `docs/DESIGN-BRIEF.md`, then inspect Git status and recent commits.

- Brand is **Chalu**. `chalu-review-7d4b9f2a` is the repository name; the local workspace remains `crystal-cha`.
- Vanilla HTML/CSS/JS. No frontend dependencies or production credentials required.
- GitHub Pages is a public preview; chaludrinks.com production is separate.
- Preserve the green/ivory/gold design, full-viewport video hero and existing four product names.
- Use “Made in Yunnan”, not “Born in Yunnan”.
- User explicitly requested demo e-commerce and checkout. Keep sample prices and order simulation clearly labelled; never silently connect real payments or order submission.
- `commerce.js` is the authoritative sample-price catalogue. Product card display prices must stay consistent with it.
- Cart persistence contains only known product IDs and bounded integer quantities. Contact/payment data must not be persisted or transmitted.
- Use relative paths for the `/chalu-review-7d4b9f2a/` Pages subdirectory. Preview remains noindex.
- Recheck mobile, tablet, desktop and large screens, bag/checkout behavior, and video autoplay/poster behavior after relevant edits.
- Check: `node --test scripts/commerce.test.cjs`, syntax-check all nine JS files, and `python3 scripts/build.py`.
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

- News content: docs/news.json and templates/article.html; run render-contact.py, render-news.py, render-products.py, then render-pages.py after shared edits. Three stories are explicitly sample editorial content, not dated brand announcements.
- Subpages use open editorial layouts, fine rules and rounded photographs, rather than tinted cards around whole sections. Preserve natural wrapping, the mobile collection carousel and all demo commerce controls.

- Preview lifetime is fixed in preview-policy.json: ends 2026-11-07 20:57:22 UTC (8 November 04:57:22 Malaysia time). Never reset the expiry during ordinary edits. Build adds copy deterrents and the client expiry guard to every deployed route; root source HTML is intentionally not the packaged preview. Test dist/ when checking these controls.
- After the deadline, build emits only expired pages/404/state/robots, with original assets removed. GitHub Actions checks at minutes 17 and 47 each hour and retires the deployed preview if needed; GitHub scheduling may be delayed. All pushes/manual builds after expiry also emit expired content. Keep the source repository and originals for reference; its visibility is still public.
- Run python3 -m unittest discover -s scripts -p '*_test.py' for expiry/retirement boundary tests. Copy controls are deterrents, not DRM/authentication; keep form fields editable and do not add invasive developer-tool detection.

- Floating WhatsApp source is docs/contact.json and scripts/render-contact.py. Number is currently empty because none was supplied/verified. Empty configuration renders a clearly labelled demo dialog; a country-code digits-only number renders a real wa.me link. Never invent a destination. Shared footer places it on marketing/product/article pages, not checkout or expired pages. Phone/tablet launcher stays hidden over the homepage film and while the mobile menu is open.

- Portfolio export: `kita-export/index.html` and `gallery.css`; editable HTML board layouts and browser capture scripts are in `kita-export/source/`. Build publishes the gallery/media at `/kita-export/` with the same expiry guard, excludes editable sources, and removes the online export assets after expiry. The local exports are permanent files. Do not treat the AI-assisted cover as original product photography or claim the existing Chalu logo was newly designed.
