/**
 * components.js
 * Rendering functions shared by every page. Pages include this file plus
 * config.js and the relevant data/*.js files, then call CCM.mountHeader()
 * and CCM.mountFooter() (done automatically by main.js). Keeping this UI
 * logic centralized means a nav or footer change happens once, here.
 */
const CCM = (() => {
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function dateParts(iso) {
    const d = new Date(iso + "T00:00:00");
    return {
      day: d.toLocaleDateString("en-US", { day: "numeric" }),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    };
  }

  /* ---------------- Header / Navigation ---------------- */

  function renderUtilityBar() {
    return `
      <div class="utility-bar">
        <div class="wrap">
          <span>Compassion Church Ministries Organization Portal</span>
          <div class="utility-bar__services">
            <a href="${CCM_CONFIG.mainSiteUrl}">Main site: mycompassionchurch.org</a>
            <a href="#" class="btn btn-ink btn-block" data-signin-trigger>Sign In</a>
          </div>
        </div>
      </div>`;
  }

  function renderNavLinks(activeKey, isMobile) {
    return CCM_NAV.map(item => {
      const current = item.key === activeKey ? ' aria-current="page"' : "";
      return isMobile
        ? `<li><a href="${item.href}"${current}>${item.label}<span aria-hidden="true">›</span></a></li>`
        : `<li><a href="${item.href}"${current}>${item.label}</a></li>`;
    }).join("");
  }

  function renderHeader(activeKey) {
    return `
      ${renderUtilityBar()}
      <header class="site-header">
        <div class="wrap nav-row">
          <a href="index.html" class="brand">
            <span class="brand__mark" aria-hidden="true">C</span>
            <span>
              Compassion Church Ministries
              <span class="brand__sub">ORGANIZATION PORTAL</span>
            </span>
          </a>
          <nav class="primary-nav" aria-label="Primary">
            <ul>${renderNavLinks(activeKey, false)}</ul>
          </nav>
          <div class="nav-actions">
            <a href="#" class="btn btn-secondary btn-sm" data-signin-trigger>Sign In</a>
            <button type="button" class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobileNav">
              <span aria-hidden="true">☰</span> Menu
            </button>
          </div>
        </div>
        <div class="mobile-nav" id="mobileNav">
          <div class="wrap">
            <ul>${renderNavLinks(activeKey, true)}</ul>
            <div class="mobile-nav__services">
              <a href="${CCM_CONFIG.mainSiteUrl}" class="btn btn-secondary btn-block">Main Site: mycompassionchurch.org</a>
              <a href="#" class="btn btn-ink btn-block" data-signin-trigger>Access CCM Services</a>
            </div>
          </div>
        </div>
      </header>`;
  }

  function mountHeader(activeKey) {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = renderHeader(activeKey);

    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("mobileNav");
    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll("[data-signin-trigger]").forEach(btn => {
      btn.addEventListener("click", handleSignInClick);
    });
  }

  function handleSignInClick(event) {
    event.preventDefault();
    if (CCM_CONFIG.features.entraSignIn) {
      const returnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      window.location.href = `/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(returnUrl)}`;
      return;
    }
    window.alert(
      "Sign-in is not yet available.\n\nThis will connect to CCM's Microsoft 365 identity (Microsoft Entra ID) so staff, leaders, and eventually volunteers can access CCM's digital services."
    );
  }

  /* ---------------- Footer ---------------- */

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="brand">
                <span class="brand__mark" aria-hidden="true">C</span>
                <span>Compassion Church Ministries</span>
              </a>
              <p style="margin-top:1rem; max-width:32ch; color:#9AA5B3; font-size:var(--step--1);">
                The organization portal for CCM's ministries, departments, leadership, and volunteers.
              </p>
              <p style="margin-top:1rem; font-size:var(--step--1);">
                <a href="${CCM_CONFIG.mainSiteUrl}">Visit the main church site →</a>
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="about.html">About CCM</a></li>
                <li><a href="ministries.html">Ministries</a></li>
                <li><a href="departments.html">Departments</a></li>
                <li><a href="leadership.html">Leadership</a></li>
                <li><a href="events.html">Events</a></li>
              </ul>
            </div>
            <div>
              <h4>Get Involved</h4>
              <ul>
                <li><a href="volunteer.html">Volunteer</a></li>
                <li><a href="news.html">News</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="digital-services.html">Digital Services</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:${CCM_CONFIG.contactEmail}">${CCM_CONFIG.contactEmail}</a></li>
                <li><a href="contact.html">Contact page</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Compassion Church Ministries. Portal content is illustrative during initial development.</span>
            <span>portal.mycompassionchurch.org</span>
          </div>
        </div>
      </footer>`;
  }

  function mountFooter() {
    const el = document.getElementById("site-footer");
    if (el) el.innerHTML = renderFooter();
  }

  /* ---------------- Card renderers ---------------- */

  function ministryCard(m) {
    const events = (typeof CCM_EVENTS !== "undefined")
      ? CCM_EVENTS.filter(e => m.relatedEventIds.includes(e.id))
      : [];
    return `
      <article class="ministry-card">
        <div class="ministry-card__art" aria-hidden="true">${escapeHtml(m.initial)}</div>
        <div class="ministry-card__body">
          <h3>${escapeHtml(m.name)}</h3>
          <p class="ministry-card__lead">${escapeHtml(m.summary)}</p>
          <div class="ministry-card__meta">
            <span><strong>Leadership:</strong> ${escapeHtml(m.leadRole)} — <span class="placeholder-tag">${escapeHtml(m.leadName)}</span></span>
            <span><strong>Volunteer roles:</strong> ${m.volunteerRoles.map(escapeHtml).join(", ")}</span>
            ${events.length ? `<span><strong>Related events:</strong> ${events.map(e => escapeHtml(e.title)).join(", ")}</span>` : ""}
          </div>
          <div class="ministry-card__footer">
            <a href="ministries.html#${m.id}" class="btn btn-secondary btn-sm">Learn More</a>
            <a href="volunteer.html?ministry=${m.id}" class="btn btn-primary btn-sm">Volunteer</a>
          </div>
        </div>
      </article>`;
  }

  function departmentRow(d) {
    const ministryLink = d.relatedMinistryId
      ? `<a href="ministries.html#${d.relatedMinistryId}">Related ministry →</a>`
      : `<span>No directly linked ministry</span>`;
    return `
      <div class="dept-row">
        <div class="dept-row__name">${escapeHtml(d.name)}</div>
        <div class="dept-row__desc">${escapeHtml(d.description)}</div>
        <div class="dept-row__meta">
          <strong>${escapeHtml(d.headTitle)}</strong>
          ${ministryLink}
        </div>
      </div>`;
  }

  function leaderCard(l) {
    return `
      <div class="leader-card">
        <div class="leader-card__photo">Photo placeholder</div>
        <div class="leader-card__role">${escapeHtml(l.role)}</div>
        <div class="leader-card__name placeholder-tag">${escapeHtml(l.name)}</div>
      </div>`;
  }

  function eventRow(e) {
    const { day, month } = dateParts(e.date);
    return `
      <div class="event-row" id="${e.id}">
        <div class="event-date">
          <div class="event-date__day">${day}</div>
          <div class="event-date__month">${month}</div>
        </div>
        <div>
          <span class="event-cat">${escapeHtml(e.category)}</span>
          <h3 style="font-size:var(--step-1);">${escapeHtml(e.title)}</h3>
          <p class="event-meta">${escapeHtml(e.time)} · ${escapeHtml(e.location)}</p>
          <p class="event-meta">${escapeHtml(e.description)}</p>
        </div>
        <div>
          ${e.registration
            ? `<a href="volunteer.html" class="btn btn-secondary btn-sm">Register interest</a>`
            : `<span class="field-hint">No registration required</span>`}
        </div>
      </div>`;
  }

  function newsCard(n) {
    return `
      <article class="news-card">
        <div class="news-card__art" aria-hidden="true">Image placeholder</div>
        <div>
          <span class="event-cat">${escapeHtml(n.category)}</span>
          <h3 style="font-size:var(--step-1); margin-top:6px;">${escapeHtml(n.title)}</h3>
          <p class="news-card__date">${formatDate(n.date)}</p>
          <p style="margin-top:8px; color:var(--color-slate);">${escapeHtml(n.excerpt)}</p>
        </div>
      </article>`;
  }

  function resourceCard(r) {
    return `
      <div class="resource-card">
        <span class="resource-card__type">${escapeHtml(r.type)}</span>
        <h4>${escapeHtml(r.title)}</h4>
        <p class="field-hint">${escapeHtml(r.category)}</p>
        <a href="${r.href}" class="btn btn-secondary btn-sm" style="margin-top:auto;">Open</a>
      </div>`;
  }

  function serviceCard(s) {
    const statusClass = s.status === "internal" ? "status-internal" : s.status === "inuse" ? "status-inuse" : "status-planned";
    return `
      <div class="service-card">
        <span class="service-card__status ${statusClass}">${escapeHtml(s.statusLabel)}</span>
        <h3>${escapeHtml(s.name)}</h3>
        <p class="field-hint">${escapeHtml(s.tagline)}</p>
        <p style="color:var(--color-slate); font-size:var(--step--1);">${escapeHtml(s.description)}</p>
        ${s.functions.length ? `<ul>${s.functions.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>` : ""}
      </div>`;
  }

  return {
    mountHeader,
    mountFooter,
    ministryCard,
    departmentRow,
    leaderCard,
    eventRow,
    newsCard,
    resourceCard,
    serviceCard,
    formatDate,
    escapeHtml,
  };
})();
