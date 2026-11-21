# Gifari Asmara — portfolio website

Plain HTML, CSS and a little JavaScript. No build step: open `index.html` in a browser and it works.

```
index.html   all the text: the home page first, then one case study per project
style.css    colours, fonts and layout (tokens at the top)
script.js    extras: case study pages, tabs, filters, copy email, CV check, and the animations
cv.pdf       your CV, linked from the top bar, the hero and the footer
images/      your photos
images/certs/ your certificates as images (never PDFs), shown in the certificate viewer
fonts/       Sora, Manrope and Instrument Serif (self-hosted, with their licences)
404.html     the page GitHub shows for an address that doesn't exist
```

## Images

| File | Where it shows |
| --- | --- |
| `images/gifari-hero.webp` | Hero, framed as "Plate I" with the "Open to work" label. A tall photo (720 × 1280) fits the plate best. To change it, upload the new photo under a new file name and change the `src` in the hero, so nobody sees the old one from their cache. |
| `images/gifari-photo.webp` | The previous hero photo. Not shown at the moment. |
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

Each role hangs as an exhibit (`<li class="exhibit">`): on one side a framed paper plate with a redrawn copy of the document the job ran on, on the other its label: the company, your role and dates, your points and a "See the projects" button. The plate's caption ("Plate III · …, redrawn") sits under the frame.

- **Plate III, Sekawan:** the client tracker (`<table class="ledger">`), one row per site, and the team bar under it (`<div class="team-bar">`): each `<i style="--n:2">` is one group, and `--n` is its head count.
- **Plate IV, RevoU:** the four-course track (`<table class="ledger ledger-3 ledger-track">`): course, project, and what it produced.
- **Plate V, Freelance:** the client register, one row per site with its address.

The plates use only facts from the role pages below. When you add or remove a project there, change its row in the plate too. The captions say "redrawn" on purpose: these are copies set in the site's type, not screenshots.

Each role also opens its own page, built like a case study: `#exp-sekawan`, `#exp-revou` and `#exp-freelance`.
To show more projects under a role, copy one `<li class="c-project">` in its "Projects I managed" list and change the tag, name, text and link.

- **Sekawan.** The note above the cards (`<p class="disclaimer">`) says the websites belong to Sekawan and its clients and that your part was managing delivery. Keep it whenever you add Sekawan projects.
- **Freelance.** Gambit Rojo is the highlight card (`class="c-project is-highlight"`): it spans the full row and opens its own case study. Move `is-highlight` to another card to change the highlight.


## Projects

Gambit Rojo is the featured project (`<article class="project featured">`). Below it, three cards with a dark visual, and "More work" with three smaller cards.
Each card shows a category and year, a short description, your role and one outcome.
Each project has `data-cat="delivery"`, `"data"` or `"product"`; it shows under the filter button with the same `data-filter` value.

## Certificates

The navbar link "Certificates" goes to the home section (`id="courses"`), which shows only your **three best**
certificates (`<li class="cert">` rows): Fesmaro 2023 award, RevoU MSIB, and Udemy AI for Project Management.
Each row's "View certificate" button (`<button class="cert-link" data-cert-view="images/certs/name.webp">`) opens the image in the viewer.
To swap one of the three, replace its row. The line under them (`certs-note`) gives the totals,
and the "See all certificates" button opens the full list.

The full list is its own page, `index.html#certificates` (`<article class="case" id="certificates">`).
Four tabs filter one list: **All**, **Courses**, **Awards** and **In progress**.
Each certificate is one `<li class="cert-card" data-type="...">`; `data-type` is `course`, `award` or `progress`.

Certificate images: only images go on the site, never the PDFs, so visitors can look but there's no file to download.
Keep the PDFs on your own computer or Drive. To turn a PDF into the two images, ask Claude, or export page 1 as an image
from any PDF viewer and convert it to WebP (for example at squoosh.app).
Put two WebP files in `images/certs/`: `name.webp` (about 1400px wide) and `name-thumb.webp` (about 640px wide),
then point the card's `<button class="cert-thumb" data-cert-view="images/certs/name.webp">` at them.
Clicking the image opens it large in a viewer; right-click, dragging and long-press saving are switched off on it.
A card with no image yet uses `<div class="cert-thumb is-empty">` ("Certificate image coming soon").

Finished a course: change its `data-type` to `course`, remove ` is-next`, change `#i-clock` to `#i-award`,
the tag to "Completed", "Currently learning" to the date, and add its image.
Then update the counts in the tab buttons (`tab-count`), the facts row at the top of the page, and `certs-note` on the home page.

## Volunteering

Volunteering has its own section (`id="volunteering"`) after Courses, and its own page (`#exp-volunteer`) with the details.

## Animations

The page moves in a few ways, all in the MOTION part of `script.js` and section 15 of `style.css`:

- **Loading screen.** "Gira" with a 0–100 counter, then a champagne wipe, and your name rises letter by letter. It shows once per visit, skips itself when a link opens a section or case study directly, and a click or any key cuts it short.
- **Hero.** The photo unveils from the bottom, then its thin champagne frame settles out around it; the numbers count up.
- **Plates.** Every framed picture (project visuals, the work-experience documents, the About photo, the client-words panel, volunteering, case-study visuals) has its frame settle out the same way when it scrolls into view, then the picture is uncovered. In the work-experience documents, the rows then fill in one by one.
- **Scroll reveals.** Headings rise out of a mask, text and cards fade up,  the About photo turns from grey to colour, and the bars in the project visuals grow.
- **Ribbon.** A straight band of italic phrases under the hero. It keeps sliding; scrolling pushes it faster, or backwards when you scroll up.
- **Quote.** The words in the quote band light up as you scroll past. Change the sentence in the `<!-- ============ QUOTE ============ -->` block.
- **Mouse effects (computers only).** A small dot and a ring replace the normal mouse pointer; the ring grows over links. Over a project card it says "Open". Footer rows and outlined buttons fill with champagne from the bottom.
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

## The look: a private gallery

The site is laid out like a small gallery. Pictures hang as framed "plates": a 1px champagne line held off the picture by a gap (`--frame`, `--frame-paper` and `--mat` at the top of `style.css`). Corners are square everywhere.
Each project is a plate with a wall label under it: the title, then its category and year (the `project-tags` list sits under the heading on purpose).
The captions under the two photos ("Plate I", "Plate II") are in `<figcaption class="plate-cap">`; change their text freely.

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

The font files are in `fonts/` and load from the `@font-face` rules at the top of `style.css`, so the site doesn't depend on Google Fonts.
All three are under the SIL Open Font License (see `fonts/LICENSE-*.txt`).

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
