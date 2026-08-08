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
styles.css   Dark theme, tokens, responsive layout
script.js    Lucide icons, scroll reveal, mobile nav, footer year
```

## Run locally

No build step — it's plain HTML/CSS/JS.

```bash
cd VocabLandingPage
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- Icons use [Lucide](https://lucide.dev) via CDN (`unpkg.com/lucide`).
- Fully responsive, with `prefers-reduced-motion` and keyboard accessibility.
- Links point to the Vocab extension repo and its releases page.
