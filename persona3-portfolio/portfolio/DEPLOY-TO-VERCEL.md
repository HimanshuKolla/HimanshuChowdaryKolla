# Deploying to Vercel (fixes the 404)

Your 404 happened because Vercel was serving the project files without
building them. This is a Vite app: it must be built first, and Vercel
should serve the generated `dist/` folder.

## The reliable way: deploy from a Git repo

1. Push this project to a GitHub repo (the whole folder, but NOT the
   `node_modules` or `dist` folders - those regenerate).
2. In Vercel: New Project > Import that GitHub repo.
3. Vercel auto-detects Vite. Confirm these settings (the included
   vercel.json already sets them):
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
4. Deploy. Done.

## If you must upload files instead of using Git

Do NOT drag the whole project folder or the src/ folder - that is what
caused the 404 (no built index.html at the root).

Either:
- Drag ONLY the contents of the `dist/` folder as a static deploy, OR
- Better: use the Git method above so Vercel runs the build itself.

## Why it was 404

- The site's real entry point is generated into dist/index.html by the
  build. Without running the build, there is no index.html at the root,
  so every URL 404s.
- vite.config.js now uses base '/' (correct for Vercel). The included
  vercel.json pins the build command, output directory, and a SPA
  rewrite so refreshes work.

## Note on Live Server vs Vercel

- Vercel build (this repo default): `npm run build`  -> base '/'
- VS Code Live Server needs relative paths:
      npm run build -- --base=./
  (A prebuilt Live Server copy is in the separate
   persona3-site-LIVESERVER.zip.)
