# Vocab — Landing Page

A static landing page for **Vocab**, a local-first AI vocabulary Chrome extension
([github.com/hungpt99-dev/Vocab](https://github.com/hungpt99-dev/Vocab)).

The design references [clavisay.ai](https://clavisay.ai/) — a dark, section-rich
AI language-learning layout — reworked around Vocab's product: a lightweight
extension that saves words while you browse, highlights them everywhere, and
explains them with your own AI key.

## Structure

```
index.html   Hero, features, how-it-works, privacy, FAQ, CTA, footer
privacy.html Privacy policy page (local-first data practices, AI providers)
assets/      Extension icons + real UI screenshots + og-image
styles.css   Dark theme, tokens, responsive layout
script.js    Lucide icons, scroll reveal, mobile nav, footer year, CHROME_STORE_URL
```

## Run locally

No build step — it's plain HTML/CSS/JS.

```bash
cd VocabLandingPage
python3 -m http.server 8000
# open http://localhost:8000
```

## GitHub Pages Deployment

The site is pure static HTML/CSS/JS with no build step. A GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) deploys it using the official Pages actions.

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions** (no custom server needed).
4. Push to `main` — or run the **Deploy to GitHub Pages** workflow manually from the
   **Actions** tab (it supports `workflow_dispatch`).
5. Wait for the workflow to finish.
6. Open the generated URL: `https://<username>.github.io/VocabLandingPage/`
   (the deployment URL is also shown in the Actions run summary).

All internal links are relative (`privacy.html`, `styles.css`), so the
site works from any repository subpath without configuration.

### Replacing the Chrome Web Store URL

The **Add to Chrome** buttons resolve to the `CHROME_STORE_URL` constant at the top of
`script.js`. Until the extension is published it points to the GitHub releases page.
When the Chrome Web Store listing goes live:

1. Replace the value of `CHROME_STORE_URL` with the real listing URL
   (e.g. `https://chromewebstore.google.com/detail/<id>`).
2. Commit and push — every button marked `data-chrome-store` updates automatically.

## Notes

- Icons use [Lucide](https://lucide.dev) via CDN, pinned to `0.446.0`
  (the last release that includes the `chrome` and `github` brand icons).
- Fully responsive, with `prefers-reduced-motion` and keyboard accessibility.
- Links point to the Vocab extension repo and its releases page.
