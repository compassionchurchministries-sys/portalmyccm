/**
 * main.js
 * Entry point loaded by every page. Mounts the shared header/footer, then
 * looks at document.body.dataset.page to decide what else to render.
 * Adding a new page: give <body data-page="key"> a case below.
 */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "";
  CCM.mountHeader(page);
  CCM.mountFooter();

  const renderers = {
    home: renderHome,
    ministries: renderMinistriesPage,
    departments: renderDepartmentsPage,
    leadership: renderLeadershipPage,
    events: renderEventsPage,
    news: renderNewsPage,
    resources: renderResourcesPage,
    "digital-services": renderDigitalServicesPage,
    volunteer: renderVolunteerPage,
  };

  if (renderers[page]) renderers[page]();
});

/* ---------------- Home ---------------- */
function renderHome() {
  const ministryPreview = document.getElementById("home-ministries");
  if (ministryPreview) {
    ministryPreview.innerHTML = CCM_MINISTRIES.slice(0, 4).map(CCM.ministryCard).join("");
  }
  const eventPreview = document.getElementById("home-events");
  if (eventPreview) {
    eventPreview.innerHTML = CCM_EVENTS.slice(0, 3).map(CCM.eventRow).join("");
  }
  const newsPreview = document.getElementById("home-news");
  if (newsPreview) {
    newsPreview.innerHTML = CCM_NEWS.slice(0, 2).map(CCM.newsCard).join("");
  }
}

/* ---------------- Ministries ---------------- */
function renderMinistriesPage() {
  const grid = document.getElementById("ministries-grid");
  if (!grid) return;
  grid.innerHTML = CCM_MINISTRIES.map(CCM.ministryCard).join("");
}

/* ---------------- Departments ---------------- */
function renderDepartmentsPage() {
  const list = document.getElementById("departments-list");
  if (!list) return;
  list.innerHTML = CCM_DEPARTMENTS.map(CCM.departmentRow).join("");
}

/* ---------------- Leadership ---------------- */
function renderLeadershipPage() {
  const container = document.getElementById("leadership-groups");
  if (!container) return;
  container.innerHTML = CCM_LEADERSHIP_GROUPS.map(group => {
    const people = CCM_LEADERSHIP.filter(l => l.group === group);
    if (!people.length) return "";
    return `
      <div style="margin-bottom: var(--space-8);">
        <h3 style="margin-bottom: var(--space-5);">${group}</h3>
        <div class="card-grid">${people.map(CCM.leaderCard).join("")}</div>
      </div>`;
  }).join("");
}

/* ---------------- Events ---------------- */
function renderEventsPage() {
  const list = document.getElementById("events-list");
  if (!list) return;

  const categories = ["All", ...new Set(CCM_EVENTS.map(e => e.category))];
  const filterBar = document.getElementById("events-filter");
  if (filterBar) {
    filterBar.innerHTML = categories.map((c, i) =>
      `<button type="button" class="filter-chip" data-cat="${CCM.escapeHtml(c)}" aria-pressed="${i === 0}">${CCM.escapeHtml(c)}</button>`
    ).join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-chip").forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const cat = btn.dataset.cat;
      const filtered = cat === "All" ? CCM_EVENTS : CCM_EVENTS.filter(ev => ev.category === cat);
      list.innerHTML = filtered.map(CCM.eventRow).join("") || `<p class="field-hint">No events in this category yet.</p>`;
    });
  }

  const sorted = [...CCM_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  list.innerHTML = sorted.map(CCM.eventRow).join("");
}

/* ---------------- News ---------------- */
function renderNewsPage() {
  const featuredEl = document.getElementById("news-featured");
  const listEl = document.getElementById("news-list");
  if (!listEl) return;
  const sorted = [...CCM_NEWS].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find(n => n.featured) || sorted[0];
  const rest = sorted.filter(n => n.id !== featured.id);
  if (featuredEl) featuredEl.innerHTML = CCM.newsCard(featured);
  listEl.innerHTML = rest.map(CCM.newsCard).join("");
}

/* ---------------- Resources ---------------- */
function renderResourcesPage() {
  const grid = document.getElementById("resources-grid");
  const filterBar = document.getElementById("resources-filter");
  if (!grid) return;

  if (filterBar) {
    filterBar.innerHTML = CCM_RESOURCE_CATEGORIES.map((c, i) =>
      `<button type="button" class="filter-chip" data-cat="${CCM.escapeHtml(c)}" aria-pressed="${i === 0}">${CCM.escapeHtml(c)}</button>`
    ).join("");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-chip").forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const cat = btn.dataset.cat;
      const filtered = cat === "All" ? CCM_RESOURCES : CCM_RESOURCES.filter(r => r.category === cat);
      grid.innerHTML = filtered.map(CCM.resourceCard).join("");
    });
  }
  grid.innerHTML = CCM_RESOURCES.map(CCM.resourceCard).join("");
}

/* ---------------- Digital Services ---------------- */
function renderDigitalServicesPage() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = CCM_DIGITAL_SERVICES.map(CCM.serviceCard).join("");
}

/* ---------------- Volunteer ---------------- */
function renderVolunteerPage() {
}
