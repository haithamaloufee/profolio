# Portfolio rebuild audit

## Baseline · 12 November 2026

- The checkout was the existing `portfolio` project under OneDrive Desktop. Clean `main` at `e6f543a`, tracking `origin/main` at the same commit. The remote is [haithamaloufee/profolio](https://github.com/haithamaloufee/profolio). History begins at `6ff59b7`.
- React 18, Vite, npm lockfile, one client-rendered page. The existing Vercel project expects `npm run build` and `dist`. The README documented the old dark-first layout. The portfolio had no `.env.example` and requires no credentials.
- Baseline `npm run build` passed on Node 26.5.1 with Vite 5.4.21. Initial client JS was 159.67 kB (51.56 kB gzip), CSS was 15.12 kB (4.01 kB gzip). No lint, unit or browser scripts existed.
- Production HTTPS root returned Vercel 307 to `https://www.haitham.website/`, which returned 200. HTTP root returned 308 to HTTPS root. TLS succeeded. An unknown URL and `/sitemap.xml` returned 404. Live robots allowed crawling but supplied no sitemap. The live initial HTML matched the JS-only layout.
- Root DNS resolved to `216.198.79.1`. WWW and the Trainers Network subdomain resolve through Vercel CNAMEs. Authoritative DNS nameservers are `ns57.domaincontrol.com` and `ns58.domaincontrol.com`. Preserve the separate subdomain. Use WWW as canonical based on the current host configuration.
- The existing image inventory included one previously published portrait and seven project screenshots. Several screenshots are large PNGs. The Trainers Network screenshot and project links require explicit publication review. Local photos, credential originals and CVs were inspected without copying the originals into the repository.

## Implementation plan and rollback

1. Reconcile the CV, public GitHub repositories, public LinkedIn excerpts, local certificates and project screenshots. Record outstanding facts and publication decisions in CONTENT_GAPS.md.
2. Keep React for reusable page components and Vite for assets. Render React during the build to produce standalone HTML for each route. Use small, progressively enhanced browser modules for motion, navigation and credential filtering. Keep the existing Vercel build and output contract.
3. Develop the editorial layout around the existing portrait and real product screens. Prepare private review assets independently from public build inputs.
4. Inspect responsive screenshots and test production output, keyboard navigation, accessibility, metadata and Lighthouse. Keep deployment and Search Console account changes behind owner approval.

The feature branch starts at `e6f543a`. The original `main` and remote deployment remain available. If a later production release needs rollback, use Vercel's previous production deployment and restore the previous Git release independently as needed.

## Visual and content refinement

- Replaced the serif and sage design with a single self-hosted Manrope family, near-white lavender surfaces, charcoal text, violet actions and restrained coral accents. The supplied outdoor portrait uses a circular crop, CSS rings, pointer tilt and bidirectional scroll transforms. The original remains on Desktop.
- Placed Nashmi and Youth Trainers Network in equally prominent alternating layouts. Kept Chef Haitham, Government Services Portal and four other verified projects in the compact archive. Added the YCS Founder section with the existing mark and clearly labeled program plans.
- Changed the credential index into a searchable thumbnail gallery with five categories and a keyboard-operable preview dialog. Six safe excerpts ship with the build. The loopback-only review has 24 crops.
- The refinement keeps React at build time and sends roughly 1.41 kB gzip of shared browser JavaScript. The motion and credential modules load only when relevant. Initial mobile navigation and filter geometry are stable before JavaScript initializes.

## Final validation · 12 November 2026

- Lint and data type checks, production build and all 3 Node tests passed. npm audit reported 0 vulnerabilities.
- Playwright passed 35 tests on Chromium 158 and Firefox 159, with the Chromium-specific 4× CPU test skipped in Firefox. A follow-up run passed all 6 credential checks after the last gallery adjustment. The suite covered all six public routes at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels, plus 844 × 390 landscape. It checked layout overflow, image loads, keyboard navigation, preview focus and dismissal, reduced motion, pointer tilt, scrolling in both directions and browsing without JavaScript. axe reported no violations in the tested rules.
- Inspected screenshots at 320, 390, 768 and 1440 pixels, both featured case studies and the credential gallery and preview dialog. Adjusted the headline wrap, mobile action spacing, image sizing and certificate crops after inspection.
- The production preview returned 200 for the sitemap and robots, and 404 for an unknown route and a local-review asset. The review preview served that asset. The sitemap parses as XML with six unique canonical URLs. The social card is a 1200 × 630 PNG.

### Mobile Lighthouse

Lighthouse 13.6.0, Chrome for Testing 158, Windows, local production build, default mobile simulation with 4× CPU slowdown. The homepage row uses the median performance run of three. Other rows use the final full run.

| Route | Performance | Accessibility | Best Practices | SEO | Lab LCP | Lab TBT | Lab CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 90 | 100 | 100 | 100 | 1.46 s | 401 ms | 0 |
| Nashmi | 99 | 100 | 100 | 100 | 1.22 s | 119 ms | 0 |
| Youth Trainers Network | 100 | 100 | 100 | 100 | 1.36 s | 0 ms | 0 |
| Credentials | 92 | 100 | 100 | 100 | 0.78 s | 341 ms | 0 |

The three homepage scores were 84, 90 and 90. The original draft had layout shift on the credential and project pages. The final run measured zero across all four routes after reserving navigation, filter and image geometry. Raw reports are in the ignored `.qa/lighthouse` folder. Real-user LCP, CLS and INP are pending a production release and field data. TBT is a lab metric.
