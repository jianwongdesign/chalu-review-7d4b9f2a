# Chalu design brief

Recorded 28 October 2026.

## Client instruction

“The overall look and feel should be similar to the existing homepage: https://chaludrinks.com/. Design-wise, you can refer to saichodrinks.com.”

User direction: create a Git repository and a shareable web reference; use the references' concepts, without copying the same design. User subsequently confirmed: **Use Chalu branding**.

## Implemented direction

Premium, botanical, editorial. A more deliberate reading path guides visitors from brand atmosphere to the four teas, their origins, the craft, serving and partnerships.

| Element | Decision |
| --- | --- |
| Palette | Deep green `#183c30`, warm ivory `#f5f2e9`, muted gold `#b99b60` |
| Display type | Cormorant Garamond regular and italic |
| Supporting type | DM Sans |
| Hero | Original split composition, new campaign line, existing Chalu bottle photography |
| Collection | Four colour-coded tea portraits and native modal tasting notes |
| Story | Staggered tea-garden images and concise founder introduction |
| Craft | Three numbered steps |
| Ritual | Dining photograph with accessible native disclosure controls |
| Contact | Existing Chalu business email; no simulated form submission |

## Scope for later decisions

This is a static homepage design preview. Confirm final copy, imagery rights, launch platform, commerce requirements, privacy/legal content, analytics and the production domain separately. Existing production hosting, DNS and the Chalu site are unchanged.

Keep `noindex` on the preview. A production launch requires a separate reviewed release.

## Confirmed revision — demo commerce and film

The user subsequently requested:

- Shopping and checkout functionality as a **demo**, not live commerce.
- Replace “Born in Yunnan” with “Made in Yunnan”.
- Generate a premium looping hero video through Higgsfield, with a confirmed maximum of **50 credits**.
- Make the homepage hero **100vh** and arrange overlay text carefully.

This revision supersedes the earlier static-only scope. The implemented store uses explicitly illustrative SGD prices, a local basket and simulated checkout. The original split hero is replaced by a full-screen film. One video generation cost 10.5 credits.

## Confirmed revision — rounded corners

Use rounded corners across most interface surfaces, including imagery, product cards, buttons, dialogs and the demo checkout. Shared radius tokens in `shop.css` keep the treatment consistent and slightly tighter on mobile.

## Confirmed revision — product pages, botanical notes and mobile motion

Each tea needs its own dedicated page. The user's skincare reference informs a three-part tasting-note display: botanical cutouts, pastel circles and concise labels. This is a natural visual direction, not a claim of certified organic status. Each page includes a full bottle portrait, flavour description, separate ingredient/blend information, a demo purchase action and related teas.

The mobile hero must show the full bottles and retain the video. It now contains the complete film above the text, instead of cropping the landscape video to a tall viewport. A mobile touch carousel adds perspective and bottle shadows, gentle automatic movement, manual horizontal scrolling, arrows and pause.

## Confirmed polish — smooth movement and readability

Use subtle, smooth expand/collapse motion for FAQ-style disclosures, gentle content reveals while scrolling, and slightly bolder wording throughout the site. Each tea also gets specific suggested dishes with flavour explanations alongside its tasting notes. All typography uses genuine variable fonts at medium weights, retaining the existing serif/sans pairing.
