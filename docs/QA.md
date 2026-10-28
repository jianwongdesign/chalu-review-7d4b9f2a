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

## Revision 2 — full-screen film and demo commerce

Local checks completed 28 October 2026:

- Hero equals viewport height at 320×568, 390×844, 768×1024, 1024×768, 1440×1000, 1920×1080 and 2560×1440. No page overflow or headline/header overlap at these sizes.
- Desktop and mobile full-screen hero visually reviewed with the delivered video. Film is silent, plays, loops, and responds to its pause button.
- Video frames inspected across the clip; the existing bottles and labels remain recognizable and consistent. Matching reference frames establish the repeat.
- Mobile menu works and closes after collection selection. Fixed navigation keeps the bag reachable after scrolling.
- Basket: add from card and tasting dialog; quantity increase; total updates; remove final bottle; empty state; reload persistence; and reopening from checkout's edit-bag link all passed.
- S$32 × 2 + S$38 = S$102, with complimentary demo delivery. S$36 + S$6 demo delivery = S$42.
- Invalid two-digit postal code prevents confirmation. Valid sample details show the simulated confirmation, clear the basket and leave an empty checkout on reload.
- Checkout reviewed at 320, 390, 768 and 1440 pixels without horizontal overflow; visual inspection covered mobile, tablet and desktop.
- Checkout form has `method="dialog"`, and its submit button starts disabled until JavaScript has loaded the basket. No real payment fields, order endpoints or personal-data persistence exist.
- Three meaningful unit checks cover mixed basket arithmetic, delivery/empty states and untrusted stored quantities.
- Build validates both pages, query-bearing links, posters, video assets and noindex metadata.

Reduced-motion browser emulation was declined by browser security, so it was not retried through another surface. Its poster-first behavior is source-reviewed only. This limits the runtime accessibility claim; normal video playback and explicit pause were tested.

The final release should be verified anonymously after the GitHub Actions deployment and compared with the local build. Source and media provenance are retained in the repository.

## Revision 4 — dedicated products, botanical notes and mobile showcase

28 October 2026, local Chrome checks:

- Four dedicated pages: correct H1, sample price, three notes and loaded botanical illustration. Full bottle within portrait bounds, no horizontal overflow at 320×568 (Jasmine), 768×1024 (Hibiscus), 1440×1000 (Oolong), 2560×1440 (Rosé). Jasmine additionally visually inspected at 390×844 and desktop.
- Botanical mobile layout visually inspected: labels, caption, purchase panel and separate blend information are readable and retain rounded corners.
- Added Snow Jasmine from its page into the shared bag, followed checkout, confirmed 2 bottles = S$64 plus S$6 demo delivery, then completed the simulated S$70 confirmation. No real order/payment involved.
- Mobile carousel automatically advanced; pause/next controls worked; native horizontal scrolling moved the track. User interaction keeps rotation paused. No duplicate focusable cards.
- Hero geometry checked at 320×568, 390×844, 768×1024, 1440×1000, 2560×1440: viewport height preserved, no overflow, text contained. Small-phone hero visually inspected with both complete bottles visible in contained film. Tablet contain framing was then extended to 900 px.
- Video returned readyState 4, currentTime advanced, opacity reached 1, and pause/resume worked. No warning/error console entries in checked home session. Existing live film was also confirmed playing before edits; source motion is intentionally subtle.
- Reduced-motion/data-saving and blocked-autoplay recovery are source-reviewed; no new emulation or physical iOS-device certification is claimed.
- Four Node checks now include consistency between dedicated pages, metadata and authoritative commerce prices. All JS syntax and six-page static build validation pass. Build includes 43 files and rejects stale product render output.

## Revision 5 — motion, dish pairings and weight

28 October 2026:

- All six pages checked at 320×568, 768×1024 and 1440×1000 after loading the genuine variable body font. No horizontal overflow; body and H1 compute to weight 500.
- Confirmed actual `wght` axes in the generated Cormorant WOFF2 files; DM source is now a genuine variable font instead of static regular mapped to a weight range. WOFF2 files are locally hosted and source/licence documented.
- Every product page has three dish/reason pairs. Mobile “Better together” layout visually reviewed. Suggestions are editorial inferences, clearly labelled; Chalu source rechecked on this date.
- Homepage anchor navigation retains CSS smooth scrolling. Homepage serving panels and product disclosures enter animated state, then finish with consistent `open`/`aria-expanded` and cleared explicit heights. Tested repeated toggles, Enter activation, mobile width and no clipped content after settlement.
- Scroll entrances enhance visible content without a permanent hidden state. Keyboard focus cancels an entrance on its target. Reduced-motion and no-JS fallbacks are source-reviewed, not browser-emulated.
- Existing four commerce tests, seven JS syntax checks, generated-page freshness and static-link/font validation pass. No warning/error logs in the inspected browser session. Build: 48 files.
