# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
A single-person portfolio for Gifari Asmara ("Gira"). It is mainly a showcase, and it serves several readers:
- recruiters and hiring managers for junior project manager, PMO, project control and IT project coordinator roles, mainly in Indonesia (his main goal is a first full-time PM role);
- people who might bring him in to coordinate a website or project as a freelancer;
- peers and anyone browsing his work.

Recruiters typically skim: name, role, proof in numbers, then one or two case studies and the CV.

## Product Purpose
Show who Gira is and the proof that he can run projects: clear plans, steady updates, teams kept in step. Success means a visitor leaves with a clear picture of his work and opens a case study, the CV, LinkedIn or email.

## Positioning
A junior PM with an Informatics Engineering degree who learned delivery by doing it: 10+ client sites in one tracker at Sekawan, a 10-person team shipped in four weeks at RevoU, and 2+ years coordinating freelance client websites. Every skill on the site comes with where he actually used it ("no skill bars or percentages").

## Operating Context
- Static site on GitHub Pages (repo `Giraken/Giraken.github.io`, `main` branch, https://giraken.github.io/). Plain HTML, CSS and JS, with no build step.
- One `index.html` holds the home page and every case study / experience page; the URL hash switches views (`#gambit-rojo`, `#exp-sekawan`...). Direct case-study links are meant to be sent to recruiters.
- Gira edits the content himself by following README.md, so markup must stay readable and the README's editing instructions must stay true.

## Capabilities and Constraints
- Home sections: hero with stats, ribbon, about (with education/details tabs), work experience as framed document exhibits, quote band, selected projects with filters, skills, process, courses, volunteering, footer with links and CV.
- 7 case studies + 4 experience pages, reusable blocks (`statement`, `goals`, `c-stats`, `c-steps`, `c-cards`, `c-segments`, `c-quote`).
- Motion system: first-visit intro, scroll reveals, custom cursor, ribbon and wordmark; all disabled for reduced motion.
- Self-hosted fonts only, with no external runtime dependencies.

## Brand Commitments
- Name usage: "Gira" (nickname, brand mark) and "Gifari Asmara" (full display name).
- Palette "Holst" (ink #0d1b2a, navy #1b263b, slate #415a77, sage #778d7a, champagne #d4c4a8, ivory #f4f1de) and fonts Sora / Manrope / Instrument Serif are confirmed to keep (2026-11-19). The footer moved from Archivo to the same faces at the owner's request (2026-11-19).
- Desired impression (user, 2026-11-19): luxurious, a little modern, and unique.
- Voice: first person, plain, warm and specific ("Halo! I'm Gira").

## Evidence on Hand
- Photos: `images/gifari-hero.webp` (hero, tall 720 × 1280), `images/about.webp` (cut-out), `images/gifari-photo.webp` (previous hero, unused), `images/gifari.webp` (illustration, unused).
- Certificates (images only, in `images/certs/`; the PDFs are deliberately not published, the owner wants them view-only): RevoU Tech Academy (one certificate, four courses, June 2023, grade 89/A), Udemy 2 Week AI for Project Management (November 2026), Fesmaro 2023 App Development Competition, 3rd place, Celerates PM webinar (August 2024).
- `cv.pdf`; live site for Gambit Rojo (gambit-rojo.netlify.app); Habit Tracker repo.
- Real numbers in the copy (18+ projects, 10+ clients, 2+ years, GPA 3.76, thesis metrics).
- No testimonials, client logos or press. Do not invent any.

## Product Principles
1. Proof over claims: every assertion stays tied to a real project, number or artifact.
2. A skimming recruiter must get name, role, proof and the CV within one screen.
3. Keep it editable by its owner: plain HTML that matches the README.
4. Showcase first: the site itself should demonstrate care and finish.

## Accessibility & Inclusion
Keep the existing standards: skip link, semantic landmarks, visible focus, reduced-motion support, and content that works without JavaScript.
