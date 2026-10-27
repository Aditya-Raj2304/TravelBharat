# TravelBharat: Explore India State by State

A static, multi-page tourism guide built with **HTML5 (structure), CSS3 (design) and vanilla JavaScript (behaviour)**. No frameworks, no build step, no backend. Works on GitHub Pages, Vercel, Netlify or any static host.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero search, state tiles, featured destinations, categories, guide, FAQ |
| `states.html` | States and union territories directory (search + region filter) |
| `state.html?s=<slug>` | State template, e.g. `state.html?s=kerala` |
| `destinations.html` | Listing with search and state / city / category filters |
| `destination.html?d=<slug>` | Destination template, e.g. `destination.html?d=jaipur` |
| `about.html` | About the project |
| `404.html` | Not-found page (invalid `?s=` / `?d=` values show the same message) |

## Who does what

- **HTML**: every page's structure is written in the `.html` files, including the header, footer, sections, forms and the `<template>` blocks that define how a card or tile looks.
- **CSS** (`css/style.css`): all design. Colours, fonts and spacing are CSS variables at the top of the file.
- **JavaScript**:
  - `js/data.js`: the content (states, destinations, categories).
  - `js/app.js`: fills the HTML templates from the data, runs search and filters, the gallery and lightbox.
  - `js/theme-toggle.js`: light/dark switch, remembered in `localStorage`.
  - `js/smooth-scroll.js`, `js/text-fill.js`: the smooth wheel scroll and the scroll-filled statement text.
  - `js/ui.js`: mobile menu, scroll reveal, missing-image fallback.

```
index.html, states.html, state.html, destinations.html, destination.html, about.html, 404.html
css/style.css
js/ (data, app, theme-toggle, smooth-scroll, text-fill, ui)
images/ (home, categories, states, destinations)   <- you add the photos, see IMAGES.md
IMAGES.md
```

## Add the photos

See **`IMAGES.md`**: every file name, folder, size and what to photograph (62 photos, all `.jpg`). Until a photo exists, a plain neutral colour is shown, so the site never breaks.

## Edit content

All content is in `js/data.js`.

- **Add a destination:** add an object to `destinations` with a unique `id` and `slug`, and a `state` equal to a state `slug`. Then add its three photos (see IMAGES.md).
- **Add a state:** add an object to `states` with a unique `id` and `slug`.
- Records missing `slug`, `name` or a valid `state` are skipped with a console warning instead of breaking the page.
- Optional fields (`best`, `tips`, `highlights`, `related`, `map`) only produce a section when present.

> The sample text is placeholder-level. Verify facts (timings, permits, seasons) before publishing.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000. All paths are relative.

## Deploy

**GitHub Pages:** push the files to the root of the `main` branch, then **Settings → Pages → Deploy from a branch → `main` / `(root)`**.

**Vercel:** import the repository, set the framework preset to **Other**, leave build and output settings empty, deploy.

After deploying, test: navigation, home search, filters, a destination page, the lightbox, and an invalid link such as `destination.html?d=nope`. Image file names are case-sensitive on both hosts, so keep them lowercase.

## Design

- **Themes:** dark with a yellow accent is the default. The toggle switches to a light theme built from the PRD palette (Deep Teal, Teal, Terracotta, Warm Ivory, Dark Text). The terracotta is deepened slightly so white button text stays readable.
- **Fonts:** Bricolage Grotesque (headings) and Inter (body) load from Google Fonts in each page's `<head>`; system fonts are the fallback.
- **Motion:** smooth scroll, scroll-filled statement text and a subtle fade-in on scroll. All of it is skipped when the visitor prefers reduced motion, and content stays visible without it.

## Features checklist

- Responsive, mobile-first layout; mobile menu with keyboard and Escape support
- Home search (a real GET form) opens the listing with the query applied
- Case-insensitive search; state, city and category filters that combine; clear-filters; empty states
- Filters are mirrored in the URL, so a filtered view can be shared
- Gallery with keyboard-accessible lightbox; missing-image fallback
- Visible focus styles, semantic HTML, skip link, labelled form fields
- Dynamic text is inserted with `textContent`, never as raw HTML
- Optional sections are hidden when their data is missing

## Credits

Smooth scroll, text fill and theme toggle are vanilla JS versions of the supplied components.

## Placeholder images

This copy ships with generated stand-in illustrations in `images/` so every slot is filled. They are **not real photos**. Replace each file with your own photo using the same file name (see `IMAGES.md`); nothing else needs changing.
