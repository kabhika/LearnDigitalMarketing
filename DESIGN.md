# DESIGN.md

Visual world: forest enamel transit diagram, sister variant of the LLM Mastery
Line's midnight (2026-09-04 re-ink at user direction: midnight navy #0a1330
became forest green #0c2419 with a lime wash lifting the key artifacts, so
the two dashboards are distinct at a glance; all line inks, porcelain, and
rules unchanged). The curriculum is a journey: 76
sessions are stations on nine colored lines, one line per phase. The
interchange between phase 5 and phase 6 is where the short term goal (deliver
marketing for any SMB) hands over to the long term goal (master the full
umbrella).

## Material rules

- Ground is forest enamel. Key artifacts (service board, panels, station
  tables, line list) carry a faint lime wash so they sit forward of
  the ground; everything else sits directly on ground, bounded by thin
  porcelain-tinted strokes (1px, rgba porcelain at low alpha), radius 10px.
  Pills (buttons, chips) are fully rounded.
- No gradients, no glass, no blur, no drop shadows. Depth comes from stroke
  weight and color, like enamel on steel.
- Line inks are the only saturated color. They color lines, station dots,
  chips, and state; they never flood a whole panel.

## Palette (dark, default: evening study scene)

- Forest enamel ground: `#0c2419`
- Lime ink: `#b8e33c`; artifact wash `rgba(184, 227, 60, 0.12)`
- Panel stroke: `rgba(240, 244, 255, 0.16)`; hover `0.30`
- Porcelain (display text, filled station dots): `#f5f6f2`
- Body text: `#b9d2c6` (tinted from ground hue, never gray)
- Faint text: `#7fab94`
- Line inks (fills, strokes): scarlet `#e7002a`, cobalt `#0057ff`,
  amber `#ffb800`, green `#009b4d`, magenta `#c7377b`, sky `#38b6e8`,
  violet `#8a63d2`, orange `#ff6a13`, teal `#00a3a3`
- Text-safe accent variants on forest: scarlet `#ff5c6e`, cobalt `#5b93ff`,
  green `#1fbf72`, orange `#ff8a4a`, teal `#2cc5c5`. Amber, sky, magenta,
  violet pass as-is for large text.
- Phase to line: p1 scarlet, p2 cobalt, p3 amber, p4 green, p5 magenta
  (short term); p6 sky, p7 violet, p8 orange, p9 teal (long term).
- Primary action: scarlet fill, porcelain text. Destructive shares scarlet but
  is isolated by space and a dashed stroke; never both on one screen region.

## Palette (light variant: printed pocket map)

Ground `#ecf1ea` (forest map paper), lime ink `#6d8f14`, artifact wash
`rgba(109, 143, 20, 0.10)`, stroke `rgba(16, 23, 51, 0.20)`, display text
`#101733`, body `#3c465f`, faint `#67718c`. Line inks unchanged (designed
for white enamel). Text-safe variants: scarlet `#c30023`, cobalt `#0046cc`,
green `#008140`, amber `#8f6700`, sky `#0e7fad`, magenta `#a12762`,
violet `#6a44b8`, orange `#b84a00`, teal `#007e7e`.

## Typography

- Display and all labels: Barlow Semi Condensed, 600/700, uppercase, +0.06em
  tracking. Station names (task titles): 600, uppercase at panel scale.
- Body copy and notes: Barlow 400/500, 14 to 15px, line-height 1.55.
- Figures: Barlow Semi Condensed 700, tabular feel, always with their unit.
- No gradient text. No monospace anywhere.

## Signature artifact

The Network Map: an SVG journey line snaking four rows across the panel,
colored by phase, one tick per session. Completed stations fill porcelain;
pending stations are hollow; the next session is the you-are-here marker, a
double ring with a slow pulse. Phase boundaries are interchange rings. Stations
are clickable and jump to their session. The map is generated from data.js,
never hand-drawn.

## Components

- Station dot checkbox: 20px circle, 2px stroke in the phase line color;
  checked = porcelain fill with line-color stroke. The dot is the checkbox.
- Cards carry their line: a 3px colored rail on the left edge with entry and
  exit dots, like a route card.
- Buttons: pills. Primary scarlet fill; secondary porcelain outline.
- Status vocabulary: done = green check + station name; skipped day =
  amber "SKIPPED"; inactive day = faint "NO SERVICE"; today = porcelain ring
  highlight.
- Departure board (schedule): ruled rows, date column in condensed caps,
  aligned like an arrivals board.

## Motion

One authored moment: on first render the map line draws in once
(stroke-dashoffset, 900ms ease-out), then the you-are-here marker pulses
(2.4s loop, scale+opacity on the outer ring only). Everything else is
instant or a 120ms opacity/color step. No hover lifts.

## Copy register

Transit voice for structure, plain voice for tasks: "NOW BOARDING",
"DEPARTURES", "NO SERVICE", "SERVICE DAYS". Task titles and descriptions stay
plain English. All ASCII, no em dashes.
