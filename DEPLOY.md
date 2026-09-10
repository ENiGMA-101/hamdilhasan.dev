# Publishing hamdilhasan.dev — React v2

This is the static React + Vite version of the portfolio. It does **not** need Python, Flask, SQLite, or a server.

## 1. Put it on GitHub

Create/open your GitHub repository and upload the contents of this folder to the repository root.

Do not upload:
- `node_modules/`
- `dist/`

## 2. Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run preview
```

## 3. Deploy with Vercel

Import the GitHub repository into Vercel.

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

Every push to the connected branch can redeploy the site automatically.

## Images

All portfolio images are bundled in:

```text
public/images/
```

The site no longer depends on `raw.githubusercontent.com` for images.

## About the old Flask version

The old Flask/SQLite project had an admin dashboard and database-backed blog. Those server features are intentionally not included in this static v2 build. The v2 version is designed to be simple, fast, and deployable as a static site.
