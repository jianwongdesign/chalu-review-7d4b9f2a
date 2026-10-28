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
- Recheck mobile, tablet, desktop and large screens, bag/checkout behavior, and video pause/poster behavior after relevant edits.
- Check: `node --test scripts/commerce.test.cjs`, syntax-check all three JS files, and `python3 scripts/build.py`.
- Pushing `main` publishes the preview automatically; verify the public URL and released files afterwards.
- Hero generation: one completed Higgsfield job, 10.5 credits spent from a confirmed 50-credit maximum. No further generation is needed for the current task; re-estimate any future paid request.
