# keithgoode.com

Astro static site + TinaCMS editor, deployed to HostGator by GitHub Actions.

## Structure
- `content/` : all editable content (Markdown/JSON). Tina edits these files.
  - `pages/home.json` (block-based home page), `pages/about.md`, `pages/contact.md`
  - `case-studies/`, `articles/`, `appearances/`
- `src/content.config.ts` : content schemas (Astro). `tina/config.ts` : editor schema and approved blocks. Keep the two in sync.
- `src/components/Blocks.astro` : renders the approved home-page blocks.
- `src/styles/tokens.css` : brand palette and type tokens.
- `redirects/redirects.json` : old WordPress URL map. `scripts/build-htaccess.mjs` turns it into `public/.htaccess` on every build.

## Commands
- `npm install` then `npm run dev` : site only, http://localhost:4321
- `npm run tina` : site plus editor at http://localhost:4321/admin/index.html (local mode)
- `npm run build` : static build to `dist/`

## Deploy secrets (GitHub > Settings > Secrets and variables > Actions)
`TINA_CLIENT_ID`, `TINA_TOKEN`, `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`

## Notes
- Keep this repo's `node_modules` out of OneDrive sync (or move the repo outside OneDrive); it holds ~1,300 packages.
- The `placeholder-*` content files exist to prove the templates render. Delete them once real content is in.
