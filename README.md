# Haitham Aloufee’s portfolio

A bilingual portfolio built with React and Vite. The build produces twelve standalone English and Arabic pages plus localized error content. Small browser modules handle theme preference, mobile navigation, scroll and pointer motion, credential filters and the preview dialog.

## Run locally

Use Node 22.12 or newer and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

To serve the same output Vercel receives:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4180 --strictPort
```

Open [the production-build preview](http://127.0.0.1:4180/). The [Arabic preview](http://127.0.0.1:4180/ar) has its own crawlable URLs. Light and English are the first-visit defaults. Theme and explicit language choices are saved locally. No environment variables are required.

On the review workstation, `npm run review` opens [the separate loopback preview](http://127.0.0.1:4174/) with extra certificate crops. It reads the optional, gitignored `.review-media/manifest.json` and corresponding WebP files. These assets are excluded from the normal development and production output.

## Update content

- `src/data/profile.js` holds identity, public contact links, experience, YCS and community stories.
- `src/data/projects.js` holds the case studies, compact project archive, sources and screenshot descriptions.
- `src/data/credentials.js` holds credential details, sources, dates, categories and display order. `src/data/credential-media.js` maps public excerpts and thumbnails.
- `src/copy.js` and `src/data/arabic.js` hold translated interface and content strings. `src/content.js` joins localized copy to existing records and assets.
- `src/routes.js` supplies the localized route pairs, metadata and sitemap.
- Store approved image derivatives in `public/media` with accurate dimensions and alt text. Keep personal originals, internal screenshots and documents with private IDs outside the site.

## Check a change

```sh
npm run lint
npm run build
npm test
npx playwright install chromium firefox
npm run test:browser
```

The browser suite starts a production preview on port 4180 if needed. With that preview running, `npm run lighthouse` writes mobile and desktop JSON reports to `.qa/lighthouse-bilingual`. Use `PORTFOLIO_QA_URL` to target another port.

## Release

The existing Vercel project still runs `npm run build` and serves `dist`. Review [the audit](./REBUILD_AUDIT.md), [content gaps](./CONTENT_GAPS.md) and [SEO handoff](./SEO_HANDOFF.md) before approving the release.
