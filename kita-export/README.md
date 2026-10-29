# Chalu portfolio export

Open `index.html` in a browser to view the complete portfolio. All gallery fonts, images and video are included; the View website links use the separately hosted preview.

Online gallery: https://jianwongdesign.github.io/chalu-review-7d4b9f2a/kita-export/

## Exported files

- `images/01-chalu-cover.png`: landscape project cover, 1672 × 941.
- `images/02-desktop-showcase.png`: desktop and mobile presentation, 2400 × 1600.
- `images/03-mobile-experience.png`: four mobile views, 2400 × 1600.
- `images/04-product-collection.png`: all four product pages, 2400 × 1900.
- `images/05-editorial-storytelling.png`: story and news presentation, 2400 × 1600.
- `images/06-shopping-experience.png`: desktop/mobile demo checkout, 2400 × 1600.
- `images/07-digital-art-direction.png`: website colour and typography presentation, 2400 × 1600.
- `screenshots/`: full-page captures of all 14 website pages on desktop and mobile, plus 12 viewport captures used in the presentation boards.
- `media/hero-loop-v3.mp4`: the existing eight-second silent desktop hero film.
- `source/`: editable presentation boards, gallery generator, capture and QA scripts, capture dimensions and image-generation brief.

Desktop pages were captured at 1440 CSS pixels wide / 1.5× resolution. Mobile pages were captured at 390 CSS pixels wide / 2× resolution. Reduced-motion was enabled to capture stable imagery. Checkout uses only the site's built-in sample identity and demo products.

The composition reference is https://www.wondertabs.com/works/range-developments-group and the user-supplied screenshot. No Range imagery, text or logos were included in the export. Chalu's existing logo and product imagery remain existing brand assets. The new portfolio cover was generated with the built-in image-generation tool using Chalu imagery; the six presentation boards show actual browser screenshots, not generated website UI.

The online gallery follows the existing preview expiry: 8 November 2026 at 04:57:22 Malaysia time. The local export files remain available. Online copy deterrents are not authentication. Download controls are deliberately provided for this requested export.

## Reproduce

Serve the repository at http://127.0.0.1:4175, then run the capture and render scripts with Node and Puppeteer available:

- `node kita-export/source/capture.cjs`
- `node kita-export/source/render-boards.cjs`
- `python3 kita-export/source/build-gallery.py`
- `python3 scripts/build.py`
- `node kita-export/source/verify.cjs`

The capture scripts read the source website. Publication packages only the gallery and its media, fonts, screenshots and images; editable sources and this README are not added to the Pages artifact.
