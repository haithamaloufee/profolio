# Portfolio rebuild audit

## Baseline · 12 November 2026

- Checkout: the existing `portfolio` project under OneDrive Desktop. Clean `main` at `e6f543a`, tracking `origin/main` at the same commit. The remote is [haithamaloufee/profolio](https://github.com/haithamaloufee/profolio). History begins at `6ff59b7`.
- React 18, Vite, npm lockfile, one client-rendered page. The existing Vercel project expects `npm run build` and `dist`. The README documented the old dark-first layout. The portfolio had no `.env.example` and requires no credentials.
- Baseline `npm run build` passed on Node 26.5.1 with Vite 5.4.21. Initial client JS was 159.67 kB (51.56 kB gzip), CSS was 15.12 kB (4.01 kB gzip). No lint, unit or browser scripts existed.
- Production HTTPS root returned Vercel 307 to `https://www.haitham.website/`, which returned 200. HTTP root returned 308 to HTTPS root. TLS succeeded. An unknown URL and `/sitemap.xml` returned 404. Live robots allowed crawling but supplied no sitemap. The live initial HTML matched the JS-only layout.
- Root DNS resolved to `216.198.79.1`. WWW and the Trainers Network subdomain resolve through Vercel CNAMEs. Authoritative DNS nameservers are `ns57.domaincontrol.com` and `ns58.domaincontrol.com`. Preserve the separate subdomain. Use WWW as canonical based on the current host configuration.
- Existing image inventory: one previously published portrait and seven project screenshots. Several screenshots are large PNGs. The Trainers Network screenshot and project links require explicit publication review. Local photos, credential originals and CVs were inspected without copying the originals into the repository.

## Implementation plan and rollback

1. Reconcile the CV, public GitHub repositories, public LinkedIn excerpts, local certificates and project screenshots. Record outstanding facts and publication decisions in CONTENT_GAPS.md.
2. Keep React for reusable page components and Vite for assets. Render React during the build to produce standalone HTML for each route. Use small, progressively enhanced browser modules for motion, navigation and credential filtering. Keep the existing Vercel build and output contract.
3. Develop the editorial layout around the existing portrait and real product screens. Prepare private review assets independently from public build inputs.
4. Inspect responsive screenshots and test production output, keyboard navigation, accessibility, metadata and Lighthouse. Keep deployment and Search Console account changes behind owner approval.

The feature branch starts at `e6f543a`. The original `main` and remote deployment remain available. If a later production release needs rollback, use Vercel's previous production deployment and restore the previous Git release independently as needed.
