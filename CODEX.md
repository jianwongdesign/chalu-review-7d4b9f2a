# Project continuation

Read `HANDOFF.md`, `README.md` and `docs/DESIGN-BRIEF.md`, then inspect `git status` and recent commits.

- Brand is **Chalu**. `crystal-cha` is the project/repository name.
- Original frontend source is vanilla HTML/CSS/JS; no frontend dependency installation is necessary.
- Public preview is GitHub Pages; production at chaludrinks.com is separate.
- Preserve the green/ivory/gold editorial design and the existing four product names.
- Use relative asset paths so the `/crystal-cha/` Pages subdirectory works.
- Preview must remain noindex. Do not add fake checkout, fake submission success, unverified prices or new claims.
- Revalidate mobile, tablet, desktop and large screens when changing layout; keyboard menu/dialog operation matters.
- Build: `python3 scripts/build.py`; JavaScript check: `node --check site.js`.
- Pushing `main` automatically publishes the preview. Verify the public URL after deployment.
