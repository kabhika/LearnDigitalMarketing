/* Marketing Mastery Line
   Self-adjusting scheduler: completed tasks stay anchored to their completion
   date; every pending task is re-assigned to upcoming active days on each
   render, so skipped days shift the whole plan forward automatically.
   Render layer: midnight transit diagram (see DESIGN.md). */

const LS_KEY = "dmkt_dashboard_v1";

const DEFAULT_STATE = {
  completions: {},          // taskId -> { date: "YYYY-MM-DD" }
  notes: {},                // taskId -> string
  theme: "dark",
  settings: {
    activeDays: [1, 2, 3, 4, 5],   // Mon..Fri (JS getDay: 0=Sun)
    startTime: "21:00"
  }
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      settings: { ...structuredClone(DEFAULT_STATE.settings), ...(parsed.settings || {}) }
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

/* ---------- date helpers ---------- */

function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function today() {
  return stripTime(new Date());
}
function iso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fromISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function isActive(d) {
  return state.settings.activeDays.includes(d.getDay());
}
function nextActive(d) {
  let c = new Date(d);
  let guard = 0;
  while (!isActive(c) && guard++ < 8) c = addDays(c, 1);
  return c;
}
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtShort(d) {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function fmtLong(d) {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function fmtTimeSlot() {
  const [h, m] = state.settings.startTime.split(":").map(Number);
  const to12 = (hh, mm) => {
    const ap = hh >= 12 ? "PM" : "AM";
    let h12 = hh % 12; if (h12 === 0) h12 = 12;
    return `${h12}:${String(mm).padStart(2, "0")} ${ap}`;
  };
  let eh = h + 1;
  if (eh >= 24) eh -= 24;
  return `${to12(h, m)} to ${to12(eh, m)}`;
}

/* ---------- scheduling core ---------- */

function pendingTasks() {
  return TASKS.filter(t => !state.completions[t.id]);
}

function completionsByDate() {
  const map = {};
  for (const [id, c] of Object.entries(state.completions)) {
    if (!map[c.date]) map[c.date] = [];
    map[c.date].push(id);
  }
  return map;
}

function completedToday() {
  return (completionsByDate()[iso(today())] || []);
}

// Assign pending tasks, one per active day. If a session was already
// completed today, assignments start on the next active day.
function buildAssignments() {
  const pending = pendingTasks();
  const byId = {};      // taskId -> dateISO
  const byDate = {};    // dateISO -> task
  let cursor = today();
  if (!isActive(cursor) || completedToday().length > 0) {
    cursor = nextActive(addDays(cursor, isActive(cursor) ? 1 : 0));
  }
  cursor = nextActive(cursor);
  for (const t of pending) {
    const dISO = iso(cursor);
    byId[t.id] = dISO;
    byDate[dISO] = t;
    cursor = nextActive(addDays(cursor, 1));
  }
  return { byId, byDate, pending };
}

function computeStreak() {
  const byDate = completionsByDate();
  let streak = 0;
  let d = today();
  if (isActive(d) && byDate[iso(d)]) streak++;
  d = addDays(d, -1);
  let guard = 0;
  while (guard++ < 3650) {
    if (isActive(d)) {
      if (byDate[iso(d)]) streak++;
      else break;
    }
    d = addDays(d, -1);
  }
  return streak;
}

function projectedFinish(assignments) {
  const dates = Object.values(assignments.byId).sort();
  return dates.length ? fromISO(dates[dates.length - 1]) : null;
}

/* ---------- world: lines ---------- */

const LINE_INK = {
  p1: "var(--scarlet)", p2: "var(--cobalt)", p3: "var(--amber)", p4: "var(--green)",
  p5: "var(--magenta)", p6: "var(--sky)", p7: "var(--violet)", p8: "var(--orange)",
  p9: "var(--teal)"
};
const LINE_NAME = {
  p1: "Scarlet Line", p2: "Cobalt Line", p3: "Amber Line", p4: "Green Line",
  p5: "Magenta Line", p6: "Sky Line", p7: "Violet Line", p8: "Orange Line",
  p9: "Teal Line"
};

const $ = sel => document.querySelector(sel);

const TYPE_LABEL = {
  video: "Video", course: "Course", docs: "Docs", paper: "Paper",
  project: "Project", article: "Article", book: "Book"
};

function phaseById(id) {
  return PHASES.find(p => p.id === id);
}

function taskLinksHtml(t) {
  if (!t.links || !t.links.length) return "";
  return `<div class="task-links">` + t.links.map(l =>
    `<a class="link-chip" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
  ).join("") + `</div>`;
}

/* ---------- stats ---------- */

function renderStats() {
  const total = TASKS.length;
  const done = Object.keys(state.completions).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const assignments = buildAssignments();
  const finish = projectedFinish(assignments);

  $("#stat-done").textContent = `${done}/${total}`;
  $("#stat-pct").textContent = `${pct}%`;
  $("#stat-streak").textContent = computeStreak();
  $("#stat-hours").textContent = `${total - done}h`;
  $("#stat-finish").textContent = finish ? `${MONTHS[finish.getMonth()]} ${finish.getDate()}, ${finish.getFullYear()}` : "Arrived";
  $("#progress-bar").style.transform = `scaleX(${pct / 100})`;

  const shortIds = new Set(TASKS.filter(t => phaseById(t.phase).term === "short").map(t => t.id));
  const shortDone = Object.keys(state.completions).filter(id => shortIds.has(id)).length;
  $("#stat-short").textContent = `${Math.round((shortDone / shortIds.size) * 100)}%`;
}

/* ---------- now boarding ---------- */

function renderToday() {
  const el = $("#today-body");
  const t = today();
  const slot = fmtTimeSlot();
  $("#today-date").textContent = fmtLong(t);
  $("#today-slot").textContent = isActive(t) ? slot : "No service";

  const doneToday = completedToday();
  const assignments = buildAssignments();
  const pending = assignments.pending;

  let html = "";

  if (doneToday.length > 0) {
    html += `<div class="done-banner"><span>&#10003;</span><span>Arrived today: ` +
      doneToday.map(id => `<strong>${TASKS.find(x => x.id === id).title}</strong>`).join(", ") +
      `</span></div>`;
  }

  if (pending.length === 0) {
    html += `<div class="hero-task" style="--line: var(--green)"><span class="terminus-dot"></span>
      <h3>Terminus reached. You run the full digital marketing stack.</h3></div>`;
  } else {
    const next = pending[0];
    const ink = LINE_INK[next.phase];
    const ph = phaseById(next.phase);
    if (!isActive(t) && doneToday.length === 0) {
      const nextDate = fromISO(assignments.byId[next.id]);
      html += `
        <div class="hero-task rest" style="--line: ${ink}">
          <span class="terminus-dot"></span>
          <p class="rest-note">No service today. Next departure:</p>
          <p class="next-when">${fmtShort(nextDate)} &middot; ${slot}</p>
          <h3>${next.title}</h3>
          <p class="task-sub">${next.sub}</p>
          ${taskLinksHtml(next)}
          <div class="hero-actions">
            <button class="btn btn-ghost" data-complete="${next.id}">Ride it today anyway</button>
          </div>
        </div>`;
    } else {
      html += `
        <div class="hero-task" style="--line: ${ink}">
          <span class="terminus-dot"></span>
          <p class="up-next">${doneToday.length > 0 ? "Ahead of schedule. Next station:" : "Next station"}</p>
          <h3>${next.title}</h3>
          <span class="phase-tag" style="--line: ${ink}">${LINE_NAME[next.phase]} &middot; ${ph.name}</span>
          <p class="task-sub" style="margin-top:10px">${next.sub}</p>
          ${taskLinksHtml(next)}
          <div class="hero-actions">
            <button class="btn btn-primary" data-complete="${next.id}">Mark station complete</button>
            <button class="btn btn-ghost" data-note-focus="${next.id}">Add log entry</button>
          </div>
          <textarea class="note-input hero-note" data-note="${next.id}"
            placeholder="Key takeaways, follow ups, remember for tomorrow..."></textarea>
        </div>`;
    }
  }
  el.innerHTML = html;
  hydrateNotes(el);
  hydrateButtons(el);
}

/* ---------- network map ---------- */

let mapAnimated = false;

// Sample a boustrophedon path: 4 rows joined by semicircular U-turns.
function buildMapGeometry() {
  const rows = [64, 154, 244, 334];
  const xL = 90, xR = 910;
  const pts = [];
  const step = 4;
  for (let r = 0; r < rows.length; r++) {
    const y = rows[r];
    const ltr = r % 2 === 0;
    const from = ltr ? xL : xR;
    const to = ltr ? xR : xL;
    const dir = ltr ? 1 : -1;
    for (let x = from; dir * (to - x) >= 0; x += dir * step) pts.push({ x, y });
    if (r < rows.length - 1) {
      const cy = (y + rows[r + 1]) / 2;
      const radius = (rows[r + 1] - y) / 2;
      const cx = ltr ? xR : xL;
      const startAng = -Math.PI / 2;
      const endAng = Math.PI / 2;
      const n = 20;
      for (let i = 1; i < n; i++) {
        const a = startAng + (endAng - startAng) * (i / n);
        pts.push({
          x: cx + (ltr ? 1 : -1) * radius * Math.cos(a),
          y: cy + radius * Math.sin(a)
        });
      }
    }
  }
  // cumulative lengths
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    cum.push(cum[i - 1] + Math.hypot(dx, dy));
  }
  const total = cum[cum.length - 1];
  const at = t => {
    const target = t * total;
    let lo = 0, hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < target) lo = mid + 1; else hi = mid;
    }
    const i = Math.max(1, lo);
    const seg = cum[i] - cum[i - 1] || 1;
    const f = (target - cum[i - 1]) / seg;
    return {
      x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
      y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f
    };
  };
  const slice = (t0, t1) => {
    const a = at(t0), b = at(t1);
    const out = [a];
    for (let i = 0; i < pts.length; i++) {
      if (cum[i] > t0 * total && cum[i] < t1 * total) out.push(pts[i]);
    }
    out.push(b);
    return out;
  };
  return { at, slice, total };
}

function renderMap() {
  const wrap = $("#map-wrap");
  const geo = buildMapGeometry();
  const n = TASKS.length;
  const assignments = buildAssignments();
  const firstPendingId = assignments.pending.length ? assignments.pending[0].id : null;

  // phase boundaries in station index space
  const phaseRanges = [];
  let idx = 0;
  for (const p of PHASES) {
    const count = TASKS.filter(t => t.phase === p.id).length;
    phaseRanges.push({ phase: p.id, start: idx, end: idx + count });
    idx += count;
  }
  const tOf = i => (i + 0.5) / n;

  let paths = "";
  for (const r of phaseRanges) {
    const t0 = r.start === 0 ? tOf(0) - 0.5 / n : (tOf(r.start - 1) + tOf(r.start)) / 2;
    const t1 = r.end === n ? tOf(n - 1) + 0.5 / n : (tOf(r.end - 1) + tOf(r.end)) / 2;
    const seg = geo.slice(Math.max(0, t0), Math.min(1, t1));
    const d = "M " + seg.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");
    paths += `<path class="map-line" d="${d}" stroke="${LINE_INK[r.phase]}"></path>`;
  }

  // stations
  let stations = "";
  TASKS.forEach((t, i) => {
    const p = geo.at(tOf(i));
    const done = !!state.completions[t.id];
    const ink = LINE_INK[t.phase];
    const isHere = t.id === firstPendingId;
    if (isHere) {
      stations += `
        <g class="station here" data-task="${t.id}" tabindex="0" role="button" aria-label="Next: ${t.title}">
          <title>NEXT: ${t.title}</title>
          <circle class="here-outer" cx="${p.x}" cy="${p.y}" r="11" fill="none" stroke="var(--porcelain)" stroke-width="2"></circle>
          <circle cx="${p.x}" cy="${p.y}" r="7" fill="var(--ground)" stroke="var(--porcelain)" stroke-width="3"></circle>
          <circle cx="${p.x}" cy="${p.y}" r="2.6" fill="${ink}"></circle>
        </g>`;
    } else {
      stations += `
        <g class="station" data-task="${t.id}" tabindex="0" role="button" aria-label="${done ? "Done" : "Pending"}: ${t.title}">
          <title>${done ? "DONE" : "PENDING"}: ${t.title}</title>
          <circle cx="${p.x}" cy="${p.y}" r="5" fill="${done ? "var(--porcelain)" : "var(--ground)"}" stroke="${ink}" stroke-width="2.5"></circle>
        </g>`;
    }
  });

  // interchange rings at phase boundaries
  let interchanges = "";
  for (let b = 1; b < phaseRanges.length; b++) {
    const tB = (tOf(phaseRanges[b].start - 1) + tOf(phaseRanges[b].start)) / 2;
    const p = geo.at(tB);
    interchanges += `
      <circle cx="${p.x}" cy="${p.y}" r="8" fill="var(--ground)" stroke="var(--porcelain)" stroke-width="3"></circle>
      <circle cx="${p.x}" cy="${p.y}" r="3" fill="var(--ground)" stroke="var(--porcelain)" stroke-width="1.5"></circle>`;
  }

  // termini
  const start = geo.at(0.002), end = geo.at(0.998);
  const terminus = `
    <circle cx="${start.x}" cy="${start.y}" r="9" fill="var(--porcelain)"></circle>
    <circle cx="${start.x}" cy="${start.y}" r="4" fill="${LINE_INK.p1}"></circle>
    <text class="map-label strong" x="${start.x - 14}" y="${start.y - 16}">Depart: today's level</text>
    <circle cx="${end.x}" cy="${end.y}" r="9" fill="var(--porcelain)"></circle>
    <circle cx="${end.x}" cy="${end.y}" r="4" fill="${LINE_INK.p9}"></circle>
    <text class="map-label strong" x="${end.x - 150}" y="${end.y + 28}">Terminus: full-stack digital marketer</text>`;

  // you-are-here label
  let hereLabel = "";
  if (firstPendingId) {
    const i = TASKS.findIndex(t => t.id === firstPendingId);
    const p = geo.at(tOf(i));
    const anchorLeft = p.x > 700;
    hereLabel = `<text class="map-label strong" x="${anchorLeft ? p.x - 92 : p.x + 16}" y="${p.y - 14}">You are here</text>`;
  }

  wrap.innerHTML = `
    <svg viewBox="0 0 1000 400" role="img" aria-label="Curriculum network map: ${TASKS.length} stations across ${PHASES.length} lines">
      ${paths}${interchanges}${stations}${terminus}${hereLabel}
    </svg>`;

  // draw-in once
  if (!mapAnimated) {
    wrap.querySelectorAll(".map-line").forEach(path => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.setProperty("--dash", len);
      path.classList.add("draw");
    });
    mapAnimated = true;
  }

  wrap.querySelectorAll(".station").forEach(g => {
    const go = () => jumpToTask(g.dataset.task);
    g.addEventListener("click", go);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
}

function jumpToTask(taskId) {
  switchTab("panel-tasks");
  const row = document.getElementById(`task-${taskId}`);
  if (!row) return;
  const details = row.closest("details");
  if (details) details.open = true;
  row.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ---------- legend (phase list) ---------- */

function renderTimeline() {
  const el = $("#timeline-body");
  const assignments = buildAssignments();
  let html = "";
  let shortShown = false, longShown = false;

  for (const p of PHASES) {
    if (p.term === "short" && !shortShown) {
      html += `<div class="term-divider"><span>Short term</span> deliver marketing for any SMB</div>`;
      shortShown = true;
    }
    if (p.term === "long" && !longShown) {
      html += `<div class="term-divider long"><span>Long term</span> master the full umbrella</div>`;
      longShown = true;
    }
    const tasks = TASKS.filter(t => t.phase === p.id);
    const done = tasks.filter(t => state.completions[t.id]).length;
    const pct = Math.round((done / tasks.length) * 100);
    const weeks = Math.ceil(tasks.length / 4.5);
    const firstPending = tasks.find(t => !state.completions[t.id]);
    let dateRange = "";
    if (done === tasks.length) {
      dateRange = "Line complete";
    } else if (firstPending && assignments.byId[firstPending.id]) {
      const start = fromISO(assignments.byId[firstPending.id]);
      const lastPending = [...tasks].reverse().find(t => !state.completions[t.id]);
      const end = fromISO(assignments.byId[lastPending.id]);
      dateRange = `${MONTHS[start.getMonth()]} ${start.getDate()} to ${MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
    }
    html += `
      <div class="legend-row ${done === tasks.length ? "done-line" : ""}">
        <span class="legend-ink" style="background:${LINE_INK[p.id]}"></span>
        <div class="legend-main">
          <div class="legend-name">${LINE_NAME[p.id]} &middot; ${p.name}</div>
          <div class="legend-goal">${p.goal}</div>
        </div>
        <div class="legend-stats">
          <span class="lg-pct">${pct}%</span>
          ${done}/${tasks.length} &middot; ~${weeks} wk<br>${dateRange}
        </div>
      </div>`;
  }
  el.innerHTML = html;
}

/* ---------- departures ---------- */

function renderSchedule() {
  const el = $("#schedule-body");
  const byDate = completionsByDate();
  const assignments = buildAssignments();
  const t = today();
  const rows = [];

  for (let i = 14; i >= 1; i--) {
    const d = addDays(t, -i);
    const dISO = iso(d);
    if (byDate[dISO]) {
      for (const id of byDate[dISO]) {
        const task = TASKS.find(x => x.id === id);
        rows.push(rowHtml(d, `<span class="row-done">${task.title}</span>`, "past done"));
      }
    } else if (isActive(d)) {
      rows.push(rowHtml(d, `<span class="row-skip">Skipped</span>`, "past skip"));
    }
  }

  const dISO = iso(t);
  const todayBits = [];
  (byDate[dISO] || []).forEach(id => {
    const task = TASKS.find(x => x.id === id);
    todayBits.push(`<span class="row-done">${task.title}</span>`);
  });
  if (assignments.byDate[dISO]) {
    const task = assignments.byDate[dISO];
    todayBits.push(`<span class="row-pending">${task.title}</span><span class="row-phase" style="--line:${LINE_INK[task.phase]}">${LINE_NAME[task.phase]}</span>`);
  }
  if (!todayBits.length) {
    todayBits.push(`<span class="row-rest">${isActive(t) ? "Session done" : "No service"}</span>`);
  }
  rows.push(rowHtml(t, todayBits.join("<br>"), "today", fmtTimeSlot()));

  const futureDates = Object.keys(assignments.byDate).filter(dd => dd > dISO).sort().slice(0, 40);
  for (const dd of futureDates) {
    const task = assignments.byDate[dd];
    rows.push(rowHtml(fromISO(dd),
      `<span class="row-future">${task.title}</span><span class="row-phase" style="--line:${LINE_INK[task.phase]}">${LINE_NAME[task.phase]}</span>`,
      "future", fmtTimeSlot()));
  }
  if (Object.keys(assignments.byDate).length > 41) {
    rows.push(`<div class="sched-more">+ ${Object.keys(assignments.byDate).length - 41} more departures after this. They shift automatically as you ride.</div>`);
  }
  el.innerHTML = rows.join("");
}

function rowHtml(d, contentHtml, cls, slot) {
  return `
    <div class="sched-row ${cls}">
      <div class="sched-date">
        <span class="sd-day">${WEEKDAYS[d.getDay()]}</span>
        <span class="sd-num">${MONTHS[d.getMonth()]} ${d.getDate()}</span>
        ${slot ? `<span class="sd-slot">${slot}</span>` : ""}
      </div>
      <div class="sched-content">${contentHtml}</div>
    </div>`;
}

/* ---------- all stations ---------- */

function renderTasks() {
  const el = $("#tasks-body");
  const assignments = buildAssignments();
  const activePhase = assignments.pending.length ? assignments.pending[0].phase : null;
  let html = "";
  for (const p of PHASES) {
    const tasks = TASKS.filter(t => t.phase === p.id);
    const done = tasks.filter(t => state.completions[t.id]).length;
    html += `
      <details class="phase-group" style="--line:${LINE_INK[p.id]}" ${p.id === activePhase ? "open" : ""}>
        <summary>
          <span class="pg-ink"></span>
          <span class="pg-name">${LINE_NAME[p.id]} &middot; ${p.name}</span>
          <span class="pg-term ${p.term}">${p.term === "short" ? "Short term" : "Long term"}</span>
          <span class="pg-count">${done}/${tasks.length}</span>
        </summary>
        <div class="pg-tasks">`;
    for (const t of tasks) {
      const c = state.completions[t.id];
      const when = c ? `Arrived ${fmtShort(fromISO(c.date))}` :
        (assignments.byId[t.id] ? fmtShort(fromISO(assignments.byId[t.id])) : "");
      const hasNote = !!(state.notes[t.id] && state.notes[t.id].trim());
      html += `
        <div class="task-row ${c ? "is-done" : ""}" id="task-${t.id}">
          <label class="check">
            <input type="checkbox" data-toggle="${t.id}" ${c ? "checked" : ""} aria-label="Mark ${t.title} complete">
            <span class="checkmark"></span>
          </label>
          <div class="task-main">
            <div class="task-title-row">
              <span class="task-title">${t.title}</span>
              <span class="badge type">${TYPE_LABEL[t.type] || t.type}</span>
              ${t.cost === "paid" ? `<span class="badge cost paid">Paid</span>` : ""}
              ${when ? `<span class="badge when">${when}</span>` : ""}
            </div>
            <p class="task-sub">${t.sub}</p>
            ${taskLinksHtml(t)}
            <button class="note-toggle" data-notetoggle="${t.id}">${hasNote ? "View log entry" : "+ Log entry"}</button>
            <textarea class="note-input hidden" data-note="${t.id}"
              placeholder="Key takeaways, follow ups, remember for tomorrow..."></textarea>
          </div>
        </div>`;
    }
    html += `</div></details>`;
  }
  el.innerHTML = html;
  hydrateNotes(el);
  hydrateButtons(el);
}

/* ---------- settings ---------- */

function renderSettings() {
  const wrap = $("#weekday-picker");
  wrap.innerHTML = WEEKDAYS.map((w, i) =>
    `<button class="day-chip ${state.settings.activeDays.includes(i) ? "on" : ""}" data-day="${i}">${w}</button>`
  ).join("");
  wrap.querySelectorAll("[data-day]").forEach(btn => {
    btn.addEventListener("click", () => {
      const d = Number(btn.dataset.day);
      const days = new Set(state.settings.activeDays);
      if (days.has(d)) {
        if (days.size === 1) return; // keep at least one service day
        days.delete(d);
      } else days.add(d);
      state.settings.activeDays = [...days].sort();
      saveState();
      renderSettings();
      renderAll();
    });
  });
  $("#time-input").value = state.settings.startTime;
}

/* ---------- interactions ---------- */

function hydrateNotes(scope) {
  scope.querySelectorAll("textarea[data-note]").forEach(ta => {
    const id = ta.dataset.note;
    ta.value = state.notes[id] || "";
    ta.addEventListener("input", () => {
      state.notes[id] = ta.value;
      saveState();
    });
  });
}

function hydrateButtons(scope) {
  scope.querySelectorAll("[data-complete]").forEach(btn => {
    btn.addEventListener("click", () => toggleTask(btn.dataset.complete, true));
  });
  scope.querySelectorAll("[data-toggle]").forEach(cb => {
    cb.addEventListener("change", () => toggleTask(cb.dataset.toggle, cb.checked));
  });
  scope.querySelectorAll("[data-notetoggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ta = btn.parentElement.querySelector("textarea[data-note]");
      ta.classList.toggle("hidden");
      if (!ta.classList.contains("hidden")) ta.focus();
    });
  });
  scope.querySelectorAll("[data-note-focus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ta = document.querySelector(`.hero-note[data-note="${btn.dataset.noteFocus}"]`);
      if (ta) { ta.classList.add("visible"); ta.focus(); }
    });
  });
}

function toggleTask(id, done) {
  if (done) {
    state.completions[id] = { date: iso(today()) };
  } else {
    delete state.completions[id];
  }
  saveState();
  renderAll();
}

/* ---------- tabs, theme, chrome ---------- */

function switchTab(panelId) {
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active", t.dataset.panel === panelId);
  });
  document.querySelectorAll(".tab-panel").forEach(p => {
    p.classList.toggle("active", p.id === panelId);
  });
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.panel));
  });
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("#theme-toggle").textContent = state.theme === "dark" ? "Day map" : "Night map";
}

function setupChrome() {
  $("#theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  });
  $("#settings-toggle").addEventListener("click", () => {
    $("#settings-panel").classList.toggle("open");
  });
  $("#settings-close").addEventListener("click", () => {
    $("#settings-panel").classList.remove("open");
  });
  $("#time-input").addEventListener("change", e => {
    state.settings.startTime = e.target.value || "21:00";
    saveState();
    renderAll();
  });
  $("#export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dmkt-mastery-backup-${iso(today())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#import-input").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.completions) throw new Error("bad file");
        state = { ...structuredClone(DEFAULT_STATE), ...data };
        saveState();
        applyTheme();
        renderAll();
        renderSettings();
        alert("Backup imported.");
      } catch {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  });
  $("#reset-btn").addEventListener("click", () => {
    if (confirm("Reset ALL progress and notes? This cannot be undone. Export a backup first if unsure.")) {
      state = structuredClone(DEFAULT_STATE);
      saveState();
      applyTheme();
      renderAll();
      renderSettings();
    }
  });
}

/* ---------- boot ---------- */

function renderAll() {
  renderStats();
  renderToday();
  renderMap();
  renderTimeline();
  renderSchedule();
  renderTasks();
}

applyTheme();
setupTabs();
setupChrome();
renderSettings();
renderAll();

// refresh at midnight so the schedule rolls over without a reload
(function scheduleMidnightRefresh() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  setTimeout(() => { renderAll(); scheduleMidnightRefresh(); }, midnight - now);
})();
