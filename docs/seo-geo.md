# SEO & GEO setup

How this landing page is wired for classic search engines (SEO) and for
answer engines / LLM crawlers (GEO — generative engine optimization).

Run `pnpm verify:seo https://odoo.metaerp.ai` (or with a local URL) to assert
that everything below is actually being served.

## Where things live

| Concern | File |
| --- | --- |
| Per-locale titles, descriptions, keywords, og/hreflang hints | `lib/seo/site.js` |
| JSON-LD graphs (schema.org) | `lib/seo/structuredData.js` |
| `/llms.txt` and `/llms-full.txt` content | `lib/seo/llms.js` |
| `<html lang>`, canonical, hreflang, OG/Twitter, static params | `app/[lang]/layout.js` |
| Home page `WebPage` / `SoftwareApplication` / `FAQPage` graph | `app/[lang]/page.js` |
| `/sitemap.xml` with hreflang alternates | `app/sitemap.js` |
| `/robots.txt` incl. AI crawler rules | `app/robots.js` |
| Global 404 document with site chrome | `app/global-not-found.js` |
| Locale routing + canonicalizing redirects | `proxy.js` |
| 奥道 WMS announcement in the hero | `components/home/wmsPromo.js` |
| "Get installer" button + download dialog | `components/common/downloadButton.js` |
| APK URLs and QR code paths | `lib/config/site.js` (`downloads`) |
| Regression test | `scripts/verify-seo.mjs` |

## Locales

`lib/i18n.js` exports two lists:

- `locales` — everything accepted for browser-preference negotiation
  (`en`, `en-US`, `zh`, `zh-CN`, `zh-TW`, `zh-HK`, `ja`, `es`, `ru`).
- `contentLocales` — the locales that actually ship content and get their own
  indexable URL, hreflang entry, sitemap row and structured data:
  `en`, `zh`, `ja`, `es`, `ru`.

`resolveLocale()` maps anything else (`zh-CN`, `en-US`, `fr`, …) onto one of
`contentLocales`. `proxy.js` canonicalizes the negotiated locale **before**
redirecting, so a Chinese browser hits `/zh` in one hop instead of
`/` → `/zh-CN` → `/zh`.

`hreflang` uses `zh-Hans` for the Simplified Chinese page (`<html lang="zh-Hans">`),
with `x-default` pointing at English.

## Structured data

Two JSON-LD blocks are emitted:

1. **Site graph** (`app/[lang]/layout.js`): `Organization` + `WebSite`.
2. **Home page graph** (`app/[lang]/page.js`): `WebPage`, `SoftwareApplication`
   (with `offers` built from `lib/pricingList.js`), `SoftwareSourceCode`
   (the GitHub repo), and `FAQPage` built from `lib/faqsList.js`.

Because `FAQPage` is generated from the same data the page renders, adding a
question to `lib/faqsList.js` automatically updates both the visible FAQ and
the rich-result markup.

Deliberately **not** included: `aggregateRating`. Fabricated ratings violate
Google's structured-data guidelines. Add it only when real, sourced ratings
exist.

## Generative engine optimization (GEO)

- `/llms.txt` — [llmstxt.org](https://llmstxt.org)-style index: a summary,
  quotable product facts, links to every localized landing page, the source
  repository, and `/llms-full.txt`.
- `/llms-full.txt` — the complete product copy (features, pricing, FAQ) for
  every locale in one plain-text file, generated from the same data sources so
  it cannot drift from the site.
- `app/robots.js` explicitly names the major answer-engine crawlers
  (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`,
  `Applebot-Extended`, …) and allows them.
- Content is **server-rendered**. Navbar, footer, language switcher and all
  section copy are in the HTML — LLM crawlers generally do not execute
  JavaScript, so anything client-only is invisible to them.

## Cross-promoting 奥道 WMS

The hero opens with a localized announcement for the sibling product
[奥道 WMS](https://wms.metaerp.ai/) (`components/home/wmsPromo.js`), linking out
in one click. It is intentionally **not** animated and holds no state, so the
introduction and the outbound anchor are in the first paint and remain visible
to crawlers that never run JavaScript.

The URL lives once, in `relatedProducts.wms` in `lib/config/site.js`, and is
reused by:

- the hero promo,
- the home page JSON-LD (`WebPage.mentions` → `SoftwareApplication`), which
  describes the WMS with the same localized copy shown on screen,
- `/llms.txt` "Key facts" plus a dedicated "Related products" section.

Copy for the announcement lives under the `Wms` key in each `locales/*.json`,
so it is translated alongside the rest of the page.

The WMS site exposes only a single root URL (its language switcher is
client-side), so every locale links to `https://wms.metaerp.ai/`.

## Download flow

The hero and CTA buttons ("Get installer" / 获取安装包) open a
`<dialog>` that branches on `navigator.userAgent` **at click time**, so nothing
platform-dependent is server-rendered and there is no hydration mismatch:

- **Android** → the two signed APKs, as direct links. `dl.metaerp.ai` serves
  them as `application/vnd.android.package-archive`, so Android hands the file
  to the package installer.
- **Anything else** → both download QR codes, each labelled, to continue on a
  phone. The codes are not repeated as text links — the dialog stays empty of
  chrome and the labels are enough to tell the two builds apart.

The trigger is an `<a href>` pointing at the GMS build, so if the client bundle
ever fails to load the control still downloads something useful instead of
doing nothing (the `showModal` check falls through to the default navigation).

### QR codes

`public/qr/hms.png` and `public/qr/gms.png` are committed static assets —
generated once with the Python `qrcode` package (ECC level M, 4-module quiet
zone, 656×656 px) rather than rendered at runtime, so there is no dependency
and nothing to break.

Two details matter and are easy to get wrong:

- They are **opaque black-on-white**. A QR tinted with theme colours is
  unscannable on the dark theme, so the dialog wraps them in a `bg-white` box.
- They are plain `<img>`, not `next/image`, so the optimizer cannot re-encode
  them — lossy artefacts can break scanning.

Every code was verified by **decoding it**, not by eyeballing it:

```bash
python3 -c "import qrcode; qrcode.make('URL').save('public/qr/hms.png')"
zbarimg --quiet --raw public/qr/hms.png     # must print the URL back
```

`scripts/verify-seo.mjs` checks both are served as valid PNGs, and the rendered
codes were captured from a real browser at 2× DPR and decoded with `zbarimg` in
both daisyUI themes and at desktop and mobile widths.

## Things that were fixed

- The sitemap was generated by `next-sitemap` from a build that prerendered
  nothing, so it shipped one URL and a sitemap index with zero children.
  Replaced with the native `app/sitemap.js` (5 locales × full hreflang).
- Every locale served the same English title/description/`og:locale`, with no
  canonical and no hreflang.
- `public/robots.txt` shadowed nothing but had no crawler policy beyond `*`.
- Navbar and footer link lists were computed inside `useEffect`, so they were
  **absent from the server-rendered HTML** for every page. Now derived during
  render.
- The middleware matcher enumerated static files by hand, so `/llms.txt` and
  the Google verification HTML file were redirected to `/{locale}/...` and
  404'd. The matcher now skips anything with a file extension.
- Because that matcher skipped dotted paths, `/anything.txt` reached
  `app/[lang]/page.js` and rendered the home page under a bogus locale
  (duplicate content). `app/[lang]/layout.js` now rejects any `lang` outside
  `contentLocales` with `notFound()`.
- `/en/about` and `/en/blog` are empty placeholders and were indexable; they
  are now `noindex, follow` and excluded from the sitemap. Flip them back once
  real content ships.
- `app/[lang]/payment-success/page.js` referenced `defaultLocale` without
  importing it (a latent `ReferenceError`).

## Content must never depend on JavaScript to be visible

Framer Motion renders the hero and all five sections with an inline
`opacity: 0` in the server HTML and only animates them to 1 once React
hydrates. Any failure of the client bundle therefore rendered the page
**blank**, even though the text was present in the HTML — bad for conversion
and bad for crawlers that do not execute JavaScript.

Three changes make that impossible:

1. **`<noscript>` style** (`components/common/head.js`) force-reveals every
   stuck block when JavaScript is off. It uses `!important`, which outranks the
   inline `style` attribute a plain rule cannot touch.
2. **Hydration failsafe** — the same head script arms a 2.5 s timer;
   `components/common/hydrationBeacon.js` cancels it as soon as React hydrates.
   If it fires, `html[data-hydration="failed"]` in `app/globals.css` reveals
   whatever is still stuck. This covers the case where JavaScript is enabled but
   the bundle 403s or fails to load.
3. **`viewport={{ once: true }}`** on all nine `whileInView` blocks. Without
   it, every section faded back out as soon as it left the viewport, so
   scrolling down and back up left the page looking empty.

`prefers-reduced-motion: reduce` also reveals everything on first paint, since
an entrance animation should never gate readability.

### The dev-server trap that triggered it

Next.js 16 blocks cross-origin requests to `/_next/*` dev resources. Opening
the dev server over the LAN (`http://192.168.3.58:3000` rather than
`localhost`) made every JS chunk return **403**, so React never hydrated and
only the statically rendered 奥道 WMS announcement was visible.

`allowedDevOrigins` in `next.config.mjs` lists the LAN host (plus
`ALLOWED_DEV_ORIGINS` as a comma-separated override). This is dev-only and has
no effect on a production build, where assets are not origin-gated.

## Following up

- `pnpm lint` is broken independently of this work: `.eslintrc.json` is in the
  legacy format but ESLint 10 requires `eslint.config.*`, and Next 16 removed
  `next lint`.
- `next-sitemap` is still listed in `package.json` but is no longer used (its
  `postbuild` hook and config were removed). Drop it next time dependencies are
  reinstalled — `pnpm remove` fails in this checkout because `node_modules` was
  linked from a different pnpm store.
- The pricing "Choose Plan" buttons and the testimonial "please let me know"
  link are still stubs (`href="#"`). Point them at a real checkout / the
  author's X profile when known.
- `app/[lang]/about` and `app/[lang]/blog` render nothing. Real content there
  is the biggest remaining organic-traffic opportunity.
- Consider a `site.webmanifest` if the page should be installable as a PWA.
- The hero image is the LCP element; Next logs a suggestion to add
  `loading="eager"` (or `priority`) to it.
