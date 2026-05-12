# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

Static site hosted on **GitHub Pages** at `jessica.grare.com` (see `CNAME`). No build step — changes pushed to `master` go live directly. No package.json, bundler, or Node tooling exists.

To preview locally: open any HTML file directly in a browser (`file://`). PHP (`processform.php`) requires a server to function.

## Two Coexisting Design Systems

This site has two distinct visual systems that must not be mixed:

### 1. Dark Sidebar System (photography/gallery pages)
- Entry point: `index.html` — a persistent shell with a fixed sidebar nav and a central `<iframe id="content-frame">` that loads all gallery content
- Pages load into the iframe via `target="content-frame"` links; they are **not** standalone navigable pages
- Stylesheets: `css/styles.css` (shell layout) + `css/subpages.css` (gallery, lightbox, about, contact within iframe)
- Scripts: `js/menu.js` (mobile hamburger), `js/script.js` / `js/lightbox.js` (gallery lightbox), `js/slideshow.js`
- Color scheme: `#000`/`#111` backgrounds, `#eee` text, no Tailwind
- Gallery pages use CSS column-based masonry (4 → 3 → 2 → 1 col responsive via `column-count`)

### 2. Light Tailwind System (designer/portfolio pages)
- Standalone pages with their own sticky `<nav>` — **not** loaded into the index.html iframe
- Uses Tailwind CSS via CDN (`https://cdn.tailwindcss.com`) + inline `<style>` blocks
- Fonts: Poppins (primary) + Playfair Display italic (accent for bridge words like "meets")
- Background: `#fafafa`, text: black, orange accent `#eb6c24` on email hover
- Key classes: `.poppins-black` (weight 900, tight tracking), `.serif-italic` (Playfair Display italic), `.link-under` (animated retract underline)
- Pages: `AboutDesigner.html`, `design/index.html` (the portfolio work index, served at `/design/`), `mirum.html`, `northlandz.html`, `HornHeartbreak.html`, `LoveRose.html`, `NovoSogroya.html`, `project-detail.html`, `book.html`
- `creativeindex.html` at the repo root is a redirect stub to `/design/` for backward compatibility — do not edit it as if it were the work page
- `js/nav.js` dynamically injects a nav bar and footer into these pages — check it before hardcoding nav HTML on new Tailwind pages

## Adding New Pages

**Gallery page (dark system):** Copy an existing category page (e.g. `NATURE.html`). Include `css/subpages.css` and `js/script.js`. Add a link in `index.html`'s sidebar with `target="content-frame"`.

**Project/case study page (light system):** Copy `mirum.html` or `northlandz.html` as a template. Do **not** add an iframe or sidebar. Link from `design/index.html`.

## Image Right-Click Protection

All pages include this snippet at the top — keep it on any new page:
```html
<script>
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') { e.preventDefault(); }
  });
</script>
```

## Typography Rules (Light System)

- Hero display headings: `poppins-black` class + Tailwind `uppercase`
- Bridge/connector words (e.g. "meets", "and"): `serif-italic` class, `text-gray-400`, `lowercase`
- Eyebrow/label text: `text-[10px] uppercase tracking-[0.2em] font-black text-gray-400`
- Body copy: `text-xl text-gray-700 leading-relaxed font-normal` (inside `space-y-6` container)
- Minimum touch target on mobile links: `py-3 inline-block`

## CSS File Roles

| File | Purpose |
|------|---------|
| `css/styles.css` | index.html shell: sidebar, hamburger, content-frame, overlay |
| `css/subpages.css` | Iframe-loaded pages: masonry gallery, lightbox, hero slideshow, about, contact |
| `css/HomePageGallery.css` | home.html hero gallery slideshow |
| `css/contact.css` | Contact form styling (used by `Contact.html`) |
| `css/casestudy.css` | Currently empty — reserved for future case study shared styles |
