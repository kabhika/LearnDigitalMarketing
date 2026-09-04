# Marketing Mastery Dashboard

Personal learning dashboard: short term goal is delivering complete digital
marketing for any SMB, long term goal is mastering the full digital
marketing umbrella. 76 one hour sessions across 9 phases, free resources
only, with a self adjusting daily schedule. Forked from the LLM Mastery
Line dashboard with the same engine.

## Structure

```
index.html   page shell
styles.css   forest transit theme, lime-washed artifacts (see DESIGN.md), dark/light
data.js      curriculum: 9 phases, 76 tasks with direct resource links
app.js       scheduler, progress, streak, notes, localStorage persistence
PRODUCT.md   product truth (audience, goals, constraints)
DESIGN.md    visual system rules
```

No build step, no dependencies, no backend. All state lives in localStorage
under the key `dmkt_dashboard_v1` (separate from the LLM dashboard's key,
so both can run in the same browser).

## The curriculum

Short term, the money path: foundations, SEO core and technical, local SEO
and Google Business Profile, AI search (GEO), then a real capstone campaign
on a practice business. Long term, the full umbrella: analytics and GA4,
paid media, content/email/CRO, AI marketing ops, and a final full funnel
capstone. Every resource is free: HubSpot Academy, Google Skillshop, Semrush
Academy, Ahrefs Academy, Coursera audit, OpenAI Academy, Anthropic, plus the
practitioner sources (Whitespark, Sterling Sky, Growth Memo, Copyhackers,
CXL). Paid tiers get added after the free ride completes.

## How the schedule self adjusts

Completed tasks are anchored to their completion date. Every pending task is
re-assigned on each page load to upcoming active days (default Mon to Fri),
one task per day. Skip a day and nothing breaks: that day shows "Skipped" and
every remaining task shifts forward automatically. The projected finish date
updates to match.

## Run locally

Open `index.html` in a browser, or:

```
npx serve .
```

## Deploy to Vercel

The repo is linked to Vercel: every push to main deploys automatically. Or
run manually:

```
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Customize

- Study days and daily time slot: Settings panel (gear icon).
- Curriculum: edit `data.js`. Tasks are scheduled in array order; each task is
  one 60 minute session. Keep `id` values stable or completions will detach.
- Adding paid resources later: set `cost: "paid"` on the task and it renders
  a Paid badge automatically.
- Backup: Settings > Export JSON. Import restores everything.
