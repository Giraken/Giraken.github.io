---
name: Gifari Asmara
description: A private salon for a junior project manager's work, hung as framed plates on navy and ivory walls.
colors:
  ink: "#0d1b2a"
  navy: "#1b263b"
  slate: "#415a77"
  sage: "#778d7a"
  sage-deep: "#5c7260"
  champagne: "#d4c4a8"
  champagne-hover: "#e3d6bf"
  ivory: "#f4f1de"
  card: "#fbf9f0"
  mist: "#a9b5c4"
  frame: "rgba(212, 196, 168, .6)"
  frame-paper: "rgba(13, 27, 42, .38)"
  line-gold: "rgba(212, 196, 168, .4)"
  line-dark: "rgba(169, 181, 196, .2)"
  line-paper: "rgba(13, 27, 42, .13)"
typography:
  display:
    fontFamily: "Sora, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(64px, 9.2vw, 140px)"
    fontWeight: 200
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Sora, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(38px, 5.4vw, 64px)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Sora, Segoe UI, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
  caption:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1
  footer-display:
    fontFamily: "Sora, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(44px, 7.2vw, 100px)"
    fontWeight: 200
    lineHeight: 0.98
rounded:
  none: "0"
  dot: "50%"
spacing:
  mat: "14px"
  pad: "clamp(20px, 5vw, 48px)"
  band: "clamp(88px, 11vw, 150px)"
  max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ivory}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "11px 22px"
    height: "46px"
  button-ink-hover:
    backgroundColor: "{colors.slate}"
  button-underline:
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "12px 2px"
    height: "48px"
  plate:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "clamp(28px, 3vw, 40px)"
  plate-document:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(26px, 3vw, 42px)"
  plate-no:
    textColor: "{colors.champagne}"
    typography: "{typography.caption}"
  nav-bar:
    backgroundColor: "rgba(13, 27, 42, .86)"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "7px 7px 7px 22px"
---

# Design System: Gifari Asmara

## Overview

**Creative North Star: "The Salon"**

The site is a private gallery. Gira and his work hang as framed plates on alternating walls: deep navy ink rooms and ivory paper rooms. Every picture (the portrait, each role's redrawn working document, each project visual, the request-to-tasks example, the volunteering panel, the case-study cover) sits inside a 1px frame held off it by a mat gap, and is read through an engraved wall label beneath or beside it: an italic plate number, a title, then medium and year separated by middle dots. Corners are square throughout.

The register is quiet luxury: light Sora display type at very large sizes, a single champagne accent, thin rules instead of boxes, and generous wall space between plates. Lists read as ruled ledgers and catalogues rather than card grids. Motion is slow and exponential: a frame draws out to its mat, then a sheet the colour of the wall lifts off the picture.

The palette "Holst" and the four fonts are owner commitments and are kept as given. The system refuses the split hero over a stat strip and the grid of rounded cards with pill tags.

**Key Characteristics:**
- Navy ink walls alternating with ivory paper rooms; no third surface.
- 1px frame drawn as an `outline` offset by the mat (14px) around every plate.
- Square corners everywhere; circles only for small dots.
- Wall labels: Instrument Serif italic plate number, Sora title, Manrope medium/year line with "·" separators.
- Champagne is the only accent: frames, actions, numerals, diamond markers.
- Ruled ledgers (hairline top and bottom rules) for catalogues, steps, courses and links.

## Colors

A two-wall palette of deep navies and warm ivory, lit by one muted champagne.

### Primary
- **Champagne** (`champagne`): the single accent. Filled primary actions on dark walls, numerals (stats, dates, metrics), plate numbers on dark walls, diamond markers, the active nav underline, focus rings, selection. Hover lightens to `champagne-hover` or to ivory.
- **Champagne Frame** (`frame`): the 1px plate frame on dark walls, the underline of secondary actions, and the small diamond bullets in catalogue lists.

### Neutral
- **Ink** (`ink`): the dark wall (hero, ribbon, experience, skills, courses, case heroes), the body background, and the field inside every project plate. Text colour on paper.
- **Navy** (`navy`): a raised dark surface: the footer, the quote band, the request-to-tasks plate, case-study cover plates.
- **Ivory** (`ivory`): the paper wall (`.paper` sections, case bodies), the sheet of every document plate hung on the ink wall, and the text colour on dark walls.
- **Card Ivory** (`card`): a lighter ivory used only for the small bordered blocks inside case-study bodies.
- **Mist** (`mist`): quiet text on dark walls (ledes, captions, metadata).
- **Slate** (`slate`): quiet text on paper; hover fill for ink buttons.
- **Sage / Deep Sage** (`sage`, `sage-deep`): status only. Sage is the live "Open to work" dot on dark; deep sage marks "done" status and week labels on paper.
- **Ink Frame** (`frame-paper`): the 1px plate frame on paper walls, and the "·" separators in wall labels on paper.
- **Rules** (`line-gold`, `line-dark`, `line-paper`): hairline ledger rules. Gold for primary rules on dark walls, dark for row rules on dark, paper for row rules on paper.

### Named Rules
**The One Accent Rule.** Champagne is the only accent hue. It marks frames, actions and numerals; it never fills a large surface (beyond a button, the hover fill of a footer row, or the intro column wipe).

**The Two Walls Rule.** A section is either an ink wall or an ivory paper room. Navy is a raised plate or band on the dark side, not a third wall colour.

## Typography

**Display Font:** Sora (with Segoe UI, system-ui)
**Body Font:** Manrope (with Segoe UI, system-ui)
**Caption Font:** Instrument Serif italic (with Georgia)
**Footer Font:** none of its own; the footer uses Sora 200 for its title, link names and wordmark, and Manrope for text

**Character:** Feather-weight geometric Sora carries names and headings at large sizes with tight tracking; Manrope does the reading and the labels; Instrument Serif italic is the engraved voice of the gallery: plate numbers, the greeting, proof headings, the quote and the ribbon.

### Hierarchy
- **Display** (Sora 200, clamp(64px, 9.2vw, 140px), 0.88): the hero name only, set on two lines with the second indented 0.62em. Case titles use Sora 200 at clamp(44px, 5.6vw, 76px).
- **Headline** (Sora 300, clamp(38px, 5.4vw, 64px), 1.02, -0.04em): section headings.
- **Title** (Sora 300, 22-32px, -0.015 to -0.025em): plate titles, ledger entries, job titles. Featured plate titles grow to clamp(34px, 3.6vw, 48px).
- **Body** (Manrope 400, 17px, 1.6): reading text; ledes at 19px; prose capped at 60ch, plate descriptions at 46ch.
- **Label** (Manrope 500-600, 13.5-15px): wall-label lines, filters, nav, metadata. All numerals (stats, dates, metrics, step numbers) use tabular figures. No uppercase labels.
- **Caption** (Instrument Serif italic 400, 19-22px): plate numbers ("Plate I", "III"), the greeting, the first tag of a case label, proof headings. Quote at clamp(42px, 6.8vw, 96px).

### Named Rules
**The Light Display Rule.** Sora display and headings stay at weight 200-300; weight comes from size, not boldness.

**The One Voice Rule.** The footer speaks in the same faces as the rooms above (Sora display, Manrope text); the owner retired Archivo on 2026-11-19. Do not bring a footer-only face back.

## Layout

A centred 1200px column (`max`) with a fluid gutter (`pad`, 20-48px). Sections are full-bleed bands with clamp(88px, 11vw, 150px) block padding, alternating ink and ivory.

The hero is one wall in two columns: the copy column on the left (name, role, lede, actions, socials) with a wall label pinned to its foot (greeting and highlights, then an index of plates VI-IX), and Plate I running the full hero height on the right at clamp(380px, 40vw, 660px). Height is clamp(760px, 100svh, 1040px).

**Plate numbering** follows page order: I the hero portrait, II about, III-V the three experience exhibits, VI-IX the projects, X volunteering.

**The exhibit hang** (experience): each role is one 12-column row, with clamp(112px, 12vw, 176px) between rows and a clamp(24px, 3vw, 48px) column gap. The plate spans both label rows; the label sits beside it, the heading aligned to the bottom of its top half and the bullets and link below. The plates alternate sides and widths: the first spans columns 1-8 with its label in 9-12, the second spans 7-12 and drops 120px with its label in 1-5, the third spans 2-7 with its label in 9-12. The caption hangs under the frame, one mat plus 18px below.

**The salon hang** (projects): a 12-column grid with 96px row gaps. The first plate spans columns 1-5, the second spans 7-12 and drops 168px, the third spans 3-10 below them. A featured plate above sits 7fr picture / 4fr label. Smaller work follows as a ruled three-column index.

**Ruled ledgers**: the skills catalogue (4fr / 4fr / 5fr rows), process steps (96px numeral column, sticky heading beside them), courses (3fr issuer / 6fr course / 3fr status), the footer links. Each row is separated by a hairline, with a stronger rule on top.

Breakpoints at 1080px, 900px, 760px and 400px. At 900px and below each exhibit becomes one column read heading, plate, then bullets, and the drop is removed. At 760px and below everything stacks to one column, the hang collapses to a single column with 72px gaps, ledger rows stack, the document plates pad in to 22px 18px, and the hero reorders: Plate I first (height min(96vw, 40svh)), then the name and actions, then the lede and wall label.

**Phone section bar.** On phones the section links move to a fixed bar at the bottom. It stays hidden (translated down, transparent) until the visitor has scrolled past 60% of the first screen, unless it holds focus, so it never covers the hero.

## Elevation & Depth

The rooms are flat. Depth comes from the frame-and-mat device and from the change of wall colour, not from shadows. Shadows exist only on layers that float over the page.

### Shadow Vocabulary
- **Floating bar** (`box-shadow: 0 16px 36px -16px rgba(0, 0, 0, .7)`): the desktop nav bar (with a 14px backdrop blur); the phone section bar uses `0 14px 34px -10px rgba(0, 0, 0, .8)`.
- **Toast** (`box-shadow: 0 18px 40px -14px rgba(0, 0, 0, .6)`): the missing-CV toast.

### Named Rules
**The Mat Not Shadow Rule.** A plate is lifted by its frame and mat, never by a drop shadow. Shadows are reserved for elements that float over scrolling content.

## Shapes

Square everywhere: every corner token is 0. Circles appear only for small dots: the live status dot, status bullets, roster person dots, tick marks, browser-chrome dots inside visuals, and the cursor.

The frame is an `outline: 1px solid` with `outline-offset` equal to the mat (14px), so the plate's box keeps a margin of one mat to make room for it. Use the champagne frame on dark walls and the ink frame on paper. Plate I is the exception: it bleeds to the edge and its frame is a mount line drawn inside the photo (inset 22px, 14px on phones, ivory at 62%).

The diamond (a square rotated 45deg) is the system's marker: the brand mark, ribbon separators, catalogue and metric bullets (5px, `frame`), course status (7px, filled for done, open for in progress).

## Components

### Buttons
Square, confident, few.
- **Shape:** square (0).
- **Primary:** champagne fill, ink text, 48px tall, 12px 22px, Manrope 700 15px. Hover turns ivory on dark walls. The large footer CV button is 60px tall with 16px 30px padding.
- **Ink:** ink fill, ivory text, used on paper walls; hover to slate.
- **Underlined secondary:** no fill, a 1px champagne frame underline, 2px side padding; hover turns champagne.
- **Bordered tertiary** (job "more", back to top): 1px gold border; a champagne fill rises from the bottom on hover (0.5s ease-out) and the text turns ink.
- **Focus:** 2px champagne outline offset 3px (ink on paper).

### Plates
- **Corner Style:** square.
- **Background:** ink field on paper walls; navy on dark walls, or an ivory sheet for a document plate.
- **Frame:** 1px outline at a 14px mat offset. On hover a project plate's frame darkens to ink and moves 6px further out.
- **Internal Padding:** clamp(28px, 3vw, 40px) in the hang.
- **Content:** the visual tells the story at a glance (a four-week plan, metric bars, sales bars, a site map), drawn in ivory, mist and champagne.

### Document Plates
A redrawn working document hung as a picture: an ivory sheet on the ink wall, a 1px champagne frame at the mat, no shadow, clamp(26px, 3vw, 42px) padding. It holds only facts taken from the matching detail page, and its caption says "redrawn".
- **Head:** the document title in Sora 300 22px on the left, a Manrope 500 13.5px tabular meta line in slate on the right ("One tracker · 10 sites"), over a 1px ink rule.
- **Ruled table:** a slate 12.5px Manrope 600 column header over an ink-frame rule, then rows with paper hairlines and 9px padding. Row headers in ink 600, cells in slate; a leading number column in tabular figures. Rows tint ink at 4% on hover. Variants: a numbered tracker (No. / name / kind), a three-column register, and a course track whose first column takes 26%.
- **Foot (optional):** one line of Instrument Serif italic 18px in slate.
- **Team bar (optional):** a 12px bar of square segments sized by head count, 4px apart, in tonal ink steps (100%, 70%, 45%, 24%), with a legend of square swatches and ink counts.
- **Phones:** in the numbered tracker the last (kind) column stays on one line; in the three-column tables the last column (address, or what it produced) is hidden.

### Wall Labels and Plate Captions
The engraved label read under or beside each plate. A caption pairs an Instrument Serif italic plate number (22px; champagne on dark, ink on paper) with a short line of 14px Manrope in mist or slate. A project label puts the title first, then the medium and year on one line, items separated by a middle dot in the frame colour. The hero wall label sits on a gold top rule and pairs highlights (tabular champagne numerals, 24px Sora 300) with an index of plates.

### Ledgers
Ruled rows instead of cards: a stronger top rule, hairline row rules, generous 26-36px row padding, numerals and status at the right in champagne. Process steps show a 46px Sora 200 tabular numeral. Catalogue entries list skills with diamond bullets and a proof note headed in italic serif. In the courses ledger, an earned row carries a filled diamond and a "View certificate" text link under its status: Manrope 600 14.5px in ivory, a 1px underline in the frame colour, turning champagne on hover. In-progress rows carry an open diamond and no link.

### Filters and Tabs
Text only: Manrope 600 15-16px in slate, a 1px underline in ink when selected or pressed. No fills, no pills.

### Navigation
A floating square bar at the top left, ink at 86% with a gold border and blur. The brand is "Gira" with a champagne diamond. Links in mist, the current section in champagne with a 1px inset underline; a champagne CV button closes it. On phones the brand and CV scroll away with the page and the links become the bottom section bar described in Layout.

### Footer
Navy, in Sora 200: a large title, ruled link rows whose champagne fill rises on hover while the arrow turns 45deg, the CV row, and a 19vw wordmark of the first name.

### Motion
Gated by a `motion` class added only when reduced motion is not requested and the script runs; without it every element simply shows. Easing tokens: ease-out `cubic-bezier(.16, 1, .3, 1)` and ease-in-out `cubic-bezier(.76, 0, .24, 1)`.
- **Plate hang:** as a plate enters, its frame draws from offset 0 out to the mat (1.3s ease-out), then a sheet in the wall colour lifts off the picture (scaleY to 0, 1.2s ease-in-out, 0.5s delay). One unveil per plate.
- **Document plates:** after the frame draws and the sheet lifts, the table rows log in one by one: each fades in and rises 6px (opacity .6s, transform .8s ease-out), the first at 1120ms and each next 70ms later.
- **Plate I:** the photo unveils from the bottom by clip-path (1.3s) while settling from scale 1.1, then the mount line settles from the edge to its inset (1.4s, 1.1s delay).
- **Text:** the name rises letter by letter; headings rise out of a mask; other content fades up 28px once and lets go.
- **Reduced motion:** no intro, no reveals, no custom cursor, no ribbon scroll, smooth scrolling off, and hover transitions removed.

## Do's and Don'ts

### Do:
- **Do** hang every picture as a plate: 1px frame as an outline at the 14px mat offset, square corners, a wall label with an italic plate number.
- **Do** alternate ink walls and ivory paper rooms, using the champagne frame on dark and the ink frame on paper.
- **Do** separate wall-label items with "·" in the frame colour, and mark list items with small rotated-square diamonds.
- **Do** set numerals in tabular figures, in champagne on dark walls.
- **Do** present collections as ruled ledgers with hairline rules.
- **Do** keep Sora at weight 200-300 and let size carry hierarchy.
- **Do** keep the footer in Sora and Manrope, like every other room.

### Don't:
- **Don't** round any corner; circles are only for small dots.
- **Don't** use pill tags, icon tiles, or grids of rounded cards.
- **Don't** introduce a second accent hue; sage is a status colour, not an accent.
- **Don't** lift plates with drop shadows; shadows are for floating bars and the toast only.
- **Don't** build a split hero over a stat strip; highlights live in the wall label.
