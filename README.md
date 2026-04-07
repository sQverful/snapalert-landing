# SnapAlert Landing Page

Landing page for [SnapAlert](https://t.me/web_snap_alert_bot) — a Telegram bot that monitors any website for visual changes using screenshot comparison and notifies you when something changes.

Built with Next.js, statically exported, and deployed to GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

### Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_BASE_PATH` | GitHub Actions var | Repo subpath for GitHub Pages (e.g. `/snapalert-landing`) |
| `NEXT_PUBLIC_SITE_URL` | GitHub Actions var | Full site URL for SEO metadata |
| `UMAMI_WEBSITE_ID` | GitHub Actions secret | Umami Cloud analytics website ID |

## Tech Stack

- Next.js (static export)
- Tailwind CSS
- next-intl (EN / UK locales)
