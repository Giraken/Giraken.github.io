# Gifari Asmara — portfolio website

Plain HTML, CSS and a little JavaScript. No build step: open `index.html` in a browser and it works.

```
index.html   all the text: the home page first, then one case study per project
style.css    colours, fonts and layout (tokens at the top)
script.js    small extras: case study pages, tabs, filters, copy email, CV check
cv.pdf       your CV, linked from the top bar, the hero and the footer
images/      your two photos
```

## Images

| File | Where it shows |
| --- | --- |
| `images/gifari.webp` | Hero, inside the arch. A square image works best. |
| `images/about.webp` | About section. A cut-out (transparent background); the head rises above the frame on purpose. If the file is missing, your initials "GA" show instead. |

## Your CV

`cv.pdf` sits next to `index.html`. To update it, replace the file and keep the name `cv.pdf`.
If you'd rather keep it on Google Drive, set it to "Anyone with the link can view" and replace every `cv.pdf` in `index.html` with that link (there are 3).

## Highlights in the hero

The three numbers under your name (`18+` projects managed, `10+` clients handled, `2+` years of experience) are in the `<ul class="stats">` block. Change them whenever your totals grow.

How 18+ is counted: 10 Sekawan sites (glambox.id and web.glambox.id count as two), 7 freelance sites, and the Habit Tracker.

## Work experience pages

Work experience lists paid work only. Each role opens its own page, built like a case study: `#exp-sekawan`, `#exp-revou` and `#exp-freelance`.
To show more projects under a role, copy one `<li class="c-project">` in its "Projects I managed" list and change the tag, name, text and link.

- **Sekawan.** The note above the cards (`<p class="disclaimer">`) says the websites belong to Sekawan and its clients and that your part was managing delivery. Keep it whenever you add Sekawan projects.
- **Freelance.** Gambit Rojo is the highlight card (`class="c-project is-highlight"`): it spans the full row and opens its own case study. Move `is-highlight` to another card to change the highlight.

## Courses

The Courses section (`id="courses"`) holds one card per certificate. To add one, copy a `<li class="cert">`, then change the issuer, title and year.
The dashed "Certifications in progress" card is the placeholder for your Udemy courses. Delete it once those certificates are in.

## Volunteering

Volunteering has its own section (`id="volunteering"`) after Courses, and its own page (`#exp-volunteer`) with the details.

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

The site uses one font, Archivo, at three widths: `--wide` for headings, normal for text, `--narrow` for small labels.
To swap it, change the Google Fonts `<link>` in `index.html` and `--font` in `style.css`.

## Edit the text

Each section in `index.html` starts with a comment like `<!-- ============ 3. WORK EXPERIENCE ============ -->`.
Edit the words between the tags. Keep the tags themselves.

**Project filters.** Each project on the home page has `data-cat="delivery"`, `"data"` or `"product"`. It shows under the filter button with the same `data-filter` value.

**Team roster.** In Work experience, each group is one `<li>` with one `<i></i>` per person inside `r-dots`, and the count in `r-n`.

## Where it's online (GitHub Pages)

The site lives in the repository `Giraken/Giraken.github.io` and shows at https://giraken.github.io/.
GitHub Pages publishes the `main` branch, so every change pushed there goes live after a minute or two.

To update it on github.com: open the repository, click a file, choose the pencil icon, edit, and commit to `main`.
To replace a photo or the CV: "Add file" → "Upload files", using the same file name.

The Habit Tracker has its own repository: https://github.com/Giraken/habit-tracker. When it's live somewhere, put its link back in the Habit Tracker case study (`id="habit-tracker"`, the "Shipped" fact).
