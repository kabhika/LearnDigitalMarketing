# PRODUCT.md

## What this is
Personal learning dashboard for one user: an agency founder serving
Australian small and medium businesses, building digital marketing capability
on top of AI-leveraged delivery. It tracks a 76 session curriculum: short
term goal is delivering complete digital marketing for any SMB, long term
goal is mastering the full digital marketing umbrella. Free resources only;
paid tiers are added after the free ride completes.

## The one mechanism
A self adjusting schedule: completed sessions anchor to their completion date,
every pending session reflows onto upcoming active study days. Skip a day and
the whole plan shifts forward; nothing is ever "overdue".

## Audience and scene
Single user, practitioner-track marketer. Uses it once or twice a day on a
Windows 11 desktop: a morning glance ("what is tonight's session?") and an
evening study session: open task, follow the link, study one hour, mark done,
write a note. Occasional phone glance.

## Success
- Answer "what do I do today" within one second of load.
- Momentum visible at a glance: streak, completion, projected finish.
- Zero friction to mark done and jot a takeaway.
- Each station's deliverable feeds a real client deliverable (audits, GBP
  fixes, reports), not just theory.

## Surface mode
Operate. This is a daily-use tool, not a landing page.

## Constraints (hard)
- Static HTML/CSS/JS, no build step, no backend. localStorage only. Vercel static deploy.
- All UI copy plain ASCII. No em dashes, no curly quotes in copy.
- Curriculum data lives in data.js; scheduler logic in app.js must keep working
  (checkboxes, notes, tabs, settings drawer, export/import).
- 60 minute sessions, configurable active weekdays and time slot.
- localStorage key must stay namespaced (`dmkt_dashboard_v1`) so the LLM
  dashboard's progress in the same browser is never touched.

## Brand commitments
Inherited engine from the LLM Mastery Line; visual world re-inked to forest
enamel with a lime wash lifting the key artifacts, so the two dashboards are
distinct at a glance.
The dark glassmorphism launch look remains rejected as generic AI output.
