# Aranook — Updated Codebase

This is your full React/Vite app with everything from this session applied:

## What changed since you gave me the repo
- Removed the recipe generator entirely (page, nav item, data, components)
- Added **Affirmations & Quotes** page — 344 quotes + 135 first-person affirmations
  across 12 categories (Calm, Motivation, Self-Worth, Stress, Love, Career,
  Productivity, Overthinking, Health, Confidence, Gratitude, Sleep & Rest)
- Added **Quick Mind Reset** techniques inside the Breathing page
- Rebuilt the **Journal** as a true "thought dump" — nothing is ever saved,
  and releasing an entry plays a word-dispersal animation instead of storing it
- Fixed the "How are you feeling" mood picker so each recommendation actually
  deep-links to the right place (e.g. Stressed → Library's Stress Management filter)
- Set **dark mode as the default theme**
- Fixed SPA page-view tracking — every internal page now gets a real virtual
  URL so Google Analytics correctly logs a pageview per section, plus added
  named conversion events (mood_selected, breathing_completed, journal_released,
  checklist_completed, affirmation_shuffled, library_article_opened, settings_changed, etc.)
- Added animations throughout (staggered entrances, hover/tap feedback,
  checkbox pop animations) and fixed performance issues that caused lag
  (removed expensive Framer Motion `layout` tracking from large lists, removed
  box-shadow/blur filter animations that forced full repaints)

## Running it locally
```bash
npm install
npm run dev       # local dev server
npm run build     # production build → outputs to dist/
```

## Deploying
The `dist/` folder after `npm run build` is a fully static site — deploy it
anywhere static hosting works: Netlify, Vercel, GitHub Pages, or your current
host's file manager/FTP into `public_html`.

If you tell me which host aranook.online is actually on, I can give you exact
push/deploy steps.

## Notes
- Google Analytics: the GTM snippet (GTM-M3C8F7P9) and the GA4 measurement ID
  are unchanged from your original setup — nothing needs to be reconfigured.
- All settings (theme, accent color, font size, etc.) are stored in the
  visitor's own browser via localStorage — no backend involved anywhere.
