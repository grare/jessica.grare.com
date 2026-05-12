# TravelBite — portfolio handoff

Everything you need to drop this case study into your personal site.

```
portfolio/
├── case-study.html         ← the case-study page (template — edit the copy)
├── embed/
│   ├── travelbite-prototype.html   ← single self-contained interactive prototype
│   └── travelbite-asset-spec.html  ← single self-contained asset spec doc
├── screens/
│   └── 01-overview.png             ← hero / fallback image
└── walkthrough.mp4         ← (you'll record this — see below)
```

---

## 1 · Hosting it on your site

Both `embed/*.html` files are **fully self-contained** — they inline every script, font, and image. Drop them into your GitHub-published site as-is and they work offline.

### Embed in any page

```html
<iframe
  src="/path/to/embed/travelbite-prototype.html"
  width="100%"
  height="900"
  style="border:0; border-radius:8px; background:#2a1d12;"
  loading="lazy"
  title="TravelBite prototype">
</iframe>
```

The prototype is designed to render the full design canvas — give the iframe at least **900 px** of height, ideally 1000+. Mobile users see the canvas content stacked.

### Direct link

You can also just link to `embed/travelbite-prototype.html` and let it open standalone. Works as a shareable URL.

---

## 2 · Recording the walkthrough video

The case-study template has a `<div class="hero-media">` block at the top with three options commented in. Use **Option A** (self-hosted MP4) — you control everything and it loops without YouTube chrome.

### Recording setup

- **Tool:** macOS QuickTime ("New Screen Recording") or [Loom](https://loom.com) if you want browser-only.
- **Window:** open `embed/travelbite-prototype.html` in a clean Chrome window, **no bookmarks bar, no tabs**, fullscreen.
- **Zoom:** Cmd+0 (reset), then capture at native size — don't shrink the browser, the prototype handles its own scaling.
- **Resolution:** record at 2560×1600 (Retina) or higher. You'll downsize for the site.
- **Cursor:** turn on "Show mouse clicks in recording" in QuickTime preferences for visible tap feedback.

### Suggested script (~60 seconds)

| Time   | Action                                                                         | Voice / on-screen text |
|--------|--------------------------------------------------------------------------------|------------------------|
| 0:00   | Open on the design-canvas overview. Slow pan.                                  | "TravelBite — a passport for your tastebuds." |
| 0:04   | Click the **Onboarding** tab. Show all three onboarding wires.                 | "Onboarding builds your taste profile in three screens." |
| 0:10   | Click back to **Product · hi-fi**. Click the **Home** phone to enter focus.    | "Your home is a logbook, not a feed." |
| 0:16   | Click → arrow to advance through Pantry, Recipes, Cook.                        | "Your pantry knows what you have. Recipes match what you can make." |
| 0:24   | Land on **Learn** (Spices). Tap into a spice card (Star Anise).                | "The Atlas of Flavor — every spice and sauce gets a card." |
| 0:32   | Back out, advance to **Import**. Show the paste flow.                          | "Import from TikTok, Instagram, anywhere." |
| 0:38   | Advance to **Me** (Passport). Slow scroll over stamps.                         | "Every meal you cook is a stamp on your passport." |
| 0:46   | Close focus, switch to dark mode (top-left toggle).                            | "Light and dark — full design system, both modes." |
| 0:52   | Hover on **Atlas of Flavor** map. End on logo / wordmark.                      | "TravelBite. Cook the world, one dish at a time." |

### Export

- **MP4, H.264, ~8 Mbps, 30fps, 1920×1200** (or 16:10). Keep file under 12 MB so it autoplays smoothly.
- Strip audio (most portfolios autoplay muted anyway — `<video muted loop autoplay playsinline>`).
- Save as `walkthrough.mp4` next to `case-study.html`.

### Drop into the case study

In `case-study.html`, find the `<div class="hero-media">` block. Uncomment **Option A** and delete the fallback `<img>`:

```html
<div class="hero-media">
  <video autoplay muted loop playsinline poster="screens/01-overview.png">
    <source src="walkthrough.mp4" type="video/mp4" />
  </video>
</div>
```

---

## 3 · Exporting individual screen PNGs

The overview image (`screens/01-overview.png`) is a good hero. For individual screens (Home, Pantry, etc.) the easiest path is:

1. Open `embed/travelbite-prototype.html` in Chrome.
2. Click any phone — it goes to **focus mode** (centered, dark backdrop).
3. Use Chrome DevTools → **Cmd+Shift+P** → "Capture node screenshot" on the `.phone-frame` element. PNG with transparent background.
4. Repeat for all 8 screens. Save as `screens/home.png`, `screens/pantry.png`, etc.
5. Drop them into `case-study.html` — there's a commented-out `<div class="img-grid">` block in the source you can re-enable for a screen-by-screen gallery.

Alternative: use a Mac screenshot shortcut (Cmd+Shift+4 then Space, click the phone) — fast but includes a shadow. Trim in Preview.

---

## 4 · Tweaking the case study

`case-study.html` is one HTML file with all styles inline at the top. It's structured so you can edit copy directly:

- **Hero copy** — `<section class="hero">` ~line 215
- **Problem section** — section 01 ~line 250
- **Process** — section 02 ~line 280
- **Key decisions** — section 03 ~line 300
- **Live prototype embed** — section 04 ~line 325
- **Asset spec embed** — section 06 ~line 360
- **Reflection** — section 07 ~line 380

All color, type, and layout tokens live in the `:root { ... }` block at the very top. Change them once, re-skin the whole page. The template is built to be reused for your next case study too.

### Typography stack

| Family            | Use                                  |
|-------------------|--------------------------------------|
| DM Serif Display  | Display headings (h1, h2, h3)        |
| Inter             | Body, UI                             |
| JetBrains Mono    | Eyebrows, captions, meta labels      |
| Caveat            | Script accents (sparingly)           |

Loaded from Google Fonts via `<link>` in the `<head>`.

---

## 5 · Checklist before publishing

- [ ] Replace placeholder copy in `case-study.html` with your own narrative
- [ ] Record `walkthrough.mp4` and wire it into the hero block
- [ ] Capture individual screen PNGs (optional but strong)
- [ ] Update the `<a href="/">Back to work</a>` links to your actual portfolio root
- [ ] Test the iframe embeds on the deployed site (some hosts block iframes — GitHub Pages is fine)
- [ ] Add an Open Graph image (`screens/01-overview.png` works) for link previews

---

## Files at a glance

| File                                  | What it is                                | Self-contained? |
|---------------------------------------|-------------------------------------------|-----------------|
| `case-study.html`                     | Editable case-study page                  | Yes (uses Google Fonts via CDN) |
| `embed/travelbite-prototype.html`     | Interactive prototype (all 11 screens)    | Yes (offline-ready, ~2 MB) |
| `embed/travelbite-asset-spec.html`    | Asset spec deliverable                    | Yes (offline-ready, ~870 KB) |
| `screens/01-overview.png`             | Canvas-overview hero image                | — |

Everything is plain HTML/CSS/JS — no build step, no framework, no server. `git add`, push, done.
