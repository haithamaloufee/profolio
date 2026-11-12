# SEO and Search Console handoff

## Completed in the build

- Six prerendered HTML routes with unique titles and descriptions, semantic links, English language metadata, absolute canonical URLs and per-route Open Graph and Twitter metadata.
- 1200 × 630 social PNG with the updated portrait. Homepage `Person` and `WebSite` JSON-LD references the portrait, LinkedIn and GitHub. Local checks parse and validate the graph and its links.
- `/robots.txt` and `/sitemap.xml` are generated from the route table. Custom 404 and Vercel clean URL configuration. The previous homepage, contact, projects and skip-link anchors remain addressable.
- Tests verify canonical/sitemap agreement, clean routes and absence of local review media in the production output. The loopback certificate review sets `noindex, nofollow`.

## Release and ownership

1. Approve deployment through the existing GitHub → Vercel project. Confirm all six canonical routes and the sitemap load on the deployed site. The build requires Node 22.12 or newer. Confirm the Vercel project is on a compatible Node version before releasing.
2. Apex HTTPS currently returns **307** to **www**, which returns **200**. The build uses **https://www.haitham.website/** as canonical. With hosting approval, change the apex redirect to a permanent 308 in Vercel’s Domains settings. Recheck HTTP, HTTPS, WWW and apex with deep paths. [Vercel domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
3. Open [Google Search Console](https://search.google.com/search-console/) in the owner’s signed-in browser. Reuse the existing Domain property for `haitham.website` if present, or add it with owner approval. Search Console access and the property status remain unverified. [Google’s property instructions](https://support.google.com/webmasters/answer/34592)
4. If Google requires DNS verification, copy the exact TXT host and value it supplies. The authoritative nameservers are `ns57.domaincontrol.com` and `ns58.domaincontrol.com`. Add the TXT record with owner permission, confirm propagation and click **Verify**. No token has been issued in this session. [Google’s DNS verification instructions](https://support.google.com/webmasters/answer/9008080)
5. After verification and release, submit `https://www.haitham.website/sitemap.xml`. Inspect the canonical home, credential and case-study URLs, run live tests and request indexing where appropriate. [Sitemaps report](https://support.google.com/webmasters/answer/7451001) · [URL Inspection](https://support.google.com/webmasters/answer/12482179)

## Pending live checks

The current production sitemap returned 404 in the audit. Recheck canonical redirects, social previews, schema and sitemap after release. Sitemap submission, Google indexing status and Core Web Vitals field data remain pending. Local Lighthouse results are lab measurements.
