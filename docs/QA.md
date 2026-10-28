# Design preview verification

Reviewed 28 October 2026 in Chromium, using the actual local and GitHub Pages website.

## Responsive checks

| Viewport | Result |
| --- | --- |
| 320 × 800 | No horizontal overflow or headings/buttons outside viewport |
| 390 × 844 | Hero, two-column collection and tasting dialog visually reviewed; mobile menu verified |
| 768 × 1024 | Two-column sections and serving controls reviewed; no overflow |
| 1024 × 768 | No overflow or headings/buttons outside viewport |
| 1440 × 1000 | Desktop hero, collection and dialog visually reviewed |
| 1920 × 1080 | No overflow or headings/buttons outside viewport |
| 2560 × 1440 | Hero and introduction visually reviewed; corrected constrained introduction padding |

## Behaviour

- Internal collection navigation works with the project subdirectory.
- Mobile menu toggles its `aria-expanded` state and closes after selection.
- All four product buttons open the correct tasting notes and product image.
- Native dialog focuses its close button; Escape closes and restores the trigger focus.
- Dialog enquiry link closes the dialog, unlocks body scroll, and navigates to contact.
- Serving disclosure opens and displays its associated guidance.
- Loaded images have no broken-image state; local browser warning/error log was empty.
- Build validates one H1, unique IDs, anchor targets, local image/font paths, image alternatives, product images and preview indexing metadata.
- JavaScript syntax check passes.

## Publication

GitHub Actions builds an allowlist of 25 static files and deploys that artifact to GitHub Pages. The initial deployment succeeded and the public page was opened and rendered without a login prompt. Final release verification should compare published HTML, CSS and JS with the local files when revisiting.

This is a practical preview check, not a full WCAG audit or an exhaustive cross-browser certification. The page includes reduced-motion CSS; its media query was inspected in source rather than emulated in the browser.
