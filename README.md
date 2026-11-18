# Gifari Asmara — portfolio website

Plain HTML, CSS and a little JavaScript. No build step: open `index.html` in a browser and it works.

```
index.html   all the text: the home page first, then one case study per project
style.css    colours, fonts and layout (tokens at the top)
script.js    extras: case study pages, tabs, filters, copy email, CV check, and the animations
cv.pdf       your CV, linked from the top bar, the hero and the footer
images/      your photos
fonts/       Sora, Manrope, Instrument Serif and Archivo (self-hosted, with their licences)
404.html     the page GitHub shows for an address that doesn't exist
```

## Images

| File | Where it shows |
| --- | --- |
| `images/gifari-photo.webp` | Hero, in the photo card with the "Open to work" label. 4:5 (1000 × 1250); use the same shape for a new photo. |
| `images/about.webp` | About section. A cut-out (transparent background); the head rises above the frame on purpose. If the file is missing, your initials "GA" show instead. |
| `images/gifari.webp` | The illustrated portrait used before. Not shown at the moment. |

## Your CV

`cv.pdf` sits next to `index.html`. To update it, replace the file and keep the name `cv.pdf`.
Every CV button opens it in a new tab, so the portfolio stays open behind it.
If you'd rather keep it on Google Drive, set it to "Anyone with the link can view" and replace every `cv.pdf` in `index.html` with that link (there are 3).

## Links that leave the site

Every link to another website (LinkedIn, GitHub, client sites, Gambit Rojo) has `target="_blank" rel="noopener"`, so it opens in a new tab.
Copy both attributes when you add a new outside link.

## Highlights in the hero

The three numbers under your name (`18+` projects managed, `10+` clients worked with, `2+` years coordinating projects) are in the `<ul class="stats">` block. Change them whenever your totals grow.

How 18+ is counted: 10 Sekawan sites (the Glambox online store and community site are separate websites), 7 freelance sites, and the Habit Tracker.

## Work experience

Each role in the timeline has its points, three key numbers (`<ul class="xp-metrics">`) and a "See the projects" button.
The bar under Sekawan (`<figure class="team-bar">`) shows the team make-up: each `<i style="--n:2">` is one group, and `--n` is its head count.

Each role also opens its own page, built like a case study: `#exp-sekawan`, `#exp-revou` and `#exp-freelance`.
To show more projects under a role, copy one `<li class="c-project">` in its "Projects I managed" list and change the tag, name, text and link.

- **Sekawan.** The note above the cards (`<p class="disclaimer">`) says the websites belong to Sekawan and its clients and that your part was managing delivery. Keep it whenever you add Sekawan projects.
- **Freelance.** Gambit Rojo is the highlight card (`class="c-project is-highlight"`): it spans the full row and opens its own case study. Move `is-highlight` to another card to change the highlight.

Hovering the dates side of a role (computers only) shows a preview card. They live in the `<template id="pv-sekawan">`, `pv-revou` and `pv-freelance` blocks right after the timeline.

## Projects

Gambit Rojo is the featured project (`<article class="project featured">`). Below it, three cards with a dark visual, and "More work" with three smaller cards.
Each card shows a category and year, a short description, your role and one outcome.
Each project has `data-cat="delivery"`, `"data"` or `"product"`; it shows under the filter button with the same `data-filter` value.

## Courses

The first card (`<li class="cert cert-main">`) is the RevoU certificate: one certificate for a track of four courses.
The dashed cards (`<li class="cert cert-next">`) are the Udemy courses you're taking now, each with its own card.
When you pass one, change its seal icon from `#i-clock` to `#i-award`, remove `cert-next`, and replace "Currently learning" with the month and year you finished.

## Volunteering

Volunteering has its own section (`id="volunteering"`) after Courses, and its own page (`#exp-volunteer`) with the details.

## Animations

The page moves in a few ways, all in the MOTION part of `script.js` and section 15 of `style.css`:

- **Loading screen.** "Gira" with a 0–100 counter, then a champagne wipe, and your name rises letter by letter. It shows once per visit, skips itself when a link opens a section or case study directly, and a click or any key cuts it short.
- **Hero.** The photo card wipes up from the bottom and the "Open to work" label pops in; the numbers count up.
- **Scroll reveals.** Headings rise out of a mask, text and cards fade up, the timeline draws down, the About photo turns from grey to colour, and the bars in the project visuals grow.
- **Ribbon.** It keeps sliding; scrolling pushes it faster, or backwards when you scroll up.
- **Quote.** The words in the quote band light up as you scroll past. Change the sentence in the `<!-- ============ QUOTE ============ -->` block.
- **Mouse effects (computers only).** A small dot and a ring replace the normal mouse pointer; the ring grows over links. Over a project card it says "Open". Footer rows and round buttons fill with champagne from the bottom.
- **GIFARI in the footer.** Change the word in `<p class="wordmark">`; it resizes itself to the page width.

Visitors whose device asks for reduced motion get none of this: everything simply shows.

To turn the loading screen off, delete the line `if (!location.hash && !seen) root.classList.add('intro-on');` in the `<head>` of `index.html`.
To turn every animation off, delete `root.classList.add('motion');` on the line above it.

## How the case study pages work

Every project on the home page links to its case study, for example `href="#habit-tracker"`.
Further down `index.html`, each case study is an `<article class="case" id="habit-tracker">`.
When the address ends in `#habit-tracker`, only that case study shows; any other address shows the home page.
So `index.html#habit-tracker` is a direct link you can send to a recruiter.

**Add a new case study:** copy one whole `<article class="case" ...> … </article>` block, give it a new `id`
(letters, numbers and hyphens only), change the text, and point a project on the home page at it with `href="#your-new-id"`.
Update the "Next case study" link at the bottom of the case before it so the chain still loops.
The current order: Gambit Rojo → Habit Tracker → Data capstone → Thesis → Client websites → VIU → Fore Coffee → back to Gambit Rojo.

Building blocks you can reuse inside a case study:

- `statement` — the boxed problem statement with corner handles
- `goals` — objectives in columns
- `c-stats` — big numbers with a short label
- `c-steps` — process steps with round icons (numbered automatically)
- `c-cards` — cards with an icon, title and text
- `c-segments` — a row of dark pills
- `c-quote` — a highlighted lesson or quote

Icons live in the `<svg class="sprite">` block at the top of `index.html`. Use one with `<svg class="i"><use href="#i-chart"/></svg>`.

## Change colours

Open `style.css`. The first block (`:root`) holds every colour. Palette "Holst":

```css
--ink: #0d1b2a;        /* darkest navy: dark sections */
--navy: #1b263b;       /* deep navy: panels and footer */
--slate: #415a77;      /* quiet text on paper */
--sage: #778d7a;       /* small accents */
--champagne: #d4c4a8;  /* highlights and buttons */
--ivory: #f4f1de;      /* paper sections, text on dark */
```

Change a value once and it changes everywhere.

## Change fonts

- **Sora** for headings and display text (`--font-head`).
- **Manrope** for reading text, buttons and labels (`--font`).
- **Instrument Serif** (italic) for the quote band only (`--font-display`).
- **Archivo** for the footer only (`--font-footer`), kept from the original design.

The font files are in `fonts/` and load from the `@font-face` rules at the top of `style.css`, so the site doesn't depend on Google Fonts.
All four are under the SIL Open Font License (see `fonts/LICENSE-*.txt`).

## Edit the text

Each section in `index.html` starts with a comment like `<!-- ============ 3. WORK EXPERIENCE ============ -->`.
Edit the words between the tags. Keep the tags themselves.

**Team roster.** On the Sekawan experience page, each group is one `<li>` with one `<i></i>` per person inside `r-dots`, and the count in `r-n`.

## Where it's online (GitHub Pages)

The site lives in the repository `Giraken/Giraken.github.io` and shows at https://giraken.github.io/.
GitHub Pages publishes the `main` branch, so every change pushed there goes live after a minute or two.

To update it on github.com: open the repository, click a file, choose the pencil icon, edit, and commit to `main`.
To replace a photo or the CV: "Add file" → "Upload files", using the same file name.

The Habit Tracker has its own repository: https://github.com/Giraken/habit-tracker. When it's live somewhere, put its link back in the Habit Tracker case study (`id="habit-tracker"`, the "Shipped" fact).
