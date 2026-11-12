# SEO and Search Console handoff

## Implemented and verified locally

- Twelve crawlable HTML pages from six English and Arabic route pairs. English keeps its existing URLs. Arabic uses `/ar` and corresponding child routes with `lang="ar"` and `dir="rtl"`.
- Each page has a self-referencing canonical, unique localized metadata, and reciprocal English, Arabic, and `x-default` alternates. The sitemap lists all twelve URLs and the same alternate groups. [Google's localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Homepage structured data uses **Haitham Aloufee** and the owner-confirmed Arabic spelling **هيثم العوفي**, with the existing GitHub and LinkedIn links in `sameAs`. Open Graph and X card metadata use matching English and Arabic social images.
- The production build includes `robots.txt`, a bilingual sitemap and localized error content. The loopback-only certificate review has `noindex, nofollow`.

## Search Console status · 12 November 2026

1. Started the Domain property for `haitham.website` in [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Ahaitham.website). The site owner added the Google verification TXT record at the apex in GoDaddy.
2. Confirmed that the TXT record matches Google's verification value on both authoritative nameservers, `ns57.domaincontrol.com` and `ns58.domaincontrol.com`, and through the Google Public DNS resolver at `8.8.8.8`. The authoritative TTL is 3600 seconds. The verification value is kept outside the repository.
3. Search Console [settings](https://search.google.com/search-console/settings?resource_id=sc-domain%3Ahaitham.website) confirm that the signed-in account is a verified owner. The reports were still processing data.
4. The live apex returns HTTP 307 to **https://www.haitham.website/**. The live WWW sitemap returns HTTP 404. Publishing the bilingual release requires owner approval.

## After deployment approval

- Deploy the approved Git branch through the existing Vercel project. Check both homepages, all other canonical URLs, the localized 404, and the sitemap on the live domain.
- Submit `https://www.haitham.website/sitemap.xml` once it returns HTTP 200 on the live site. Use URL Inspection on both homepage URLs and request indexing where appropriate. Check Google's indexing reports and selected canonicals as data becomes available. Sitemap submission, inspection of the new pages, indexing requests, and field Core Web Vitals are pending. [Sitemaps report](https://support.google.com/webmasters/answer/7451001) · [URL Inspection](https://support.google.com/webmasters/answer/12482179)
