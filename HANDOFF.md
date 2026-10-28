# Chalu homepage — restart handoff

Updated: 28 October 2026.

## Project

- Local folder: `crystal-cha`
- Brand: **Chalu**, explicitly confirmed by the user.
- Repository: https://github.com/jianwongdesign/crystal-cha
- Preview: https://jianwongdesign.github.io/crystal-cha/
- Branch: `main`
- Scope: original, responsive homepage concept using Chalu identity and photography, with Saicho as a premium design reference.

## Built

An editorial split hero, introductory brand statement, four colour-coded product cards with native tasting-note dialogs, Yunnan/founder story, craft explanation, serving accordions, and email contact section. Mobile menu, modal focus management, Escape dismissal and reduced-motion styles are included. Fonts and optimized imagery are hosted locally.

Native HTML, CSS and JavaScript. `python3 scripts/build.py` packages an allowlist of public files into `dist/`; GitHub Actions publishes that artifact to Pages on pushes to `main`.

## Verification

- Local asset and anchor validation and JavaScript syntax check passed.
- Browser viewport geometry checked at 320, 390, 768, 1024, 1440, 1920 and 2560 pixels: no horizontal overflow or headings outside the viewport.
- Desktop and mobile hero/collection/dialog visually inspected.
- Collection navigation works; mobile menu closes on link selection.
- Snow Jasmine and Untamed Rosé dialogs display corresponding content.
- Escape closes the native modal and restores focus to its product button.
- Dialog enquiry link closes the modal, restores body scrolling and navigates to contact.
- Public deployment verification will be recorded after release.

## Preview limits

Public design preview, not production. `noindex, nofollow` and crawler-disallow are intentional. No e-commerce, checkout, newsletter backend or form submissions. Email links use the existing public Chalu business address. No production host or DNS changes were made.

## Next visit

Read this file and the design brief, inspect Git status/log, then verify the live preview before changing it. Final client review should cover the layout, campaign copy, photo rights, production platform and any required commerce functionality. Product names and current brand identity should be preserved unless requested otherwise.
