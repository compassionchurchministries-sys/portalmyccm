/* Static admin workspace. Replace localStorage with an API when publishing is connected. */
document.addEventListener("DOMContentLoaded", () => {
  const storageKey = "ccm-admin-draft-v1";
  const stored = localStorage.getItem(storageKey);
  const state = stored ? JSON.parse(stored) : {
    events: [],
    updates: [],
    maintenance: { enabled: false, message: "The CCM portal is receiving a few updates. Please check back soon." },
  };

  const save = () => localStorage.setItem(storageKey, JSON.stringify(state));
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[char]));
  const formatDate = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "No date";

  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(item => item.classList.toggle("is-active", item === tab));
      document.querySelectorAll(".admin-panel").forEach(panel => {
        const visible = panel.dataset.panel === tab.dataset.tab;
        panel.classList.toggle("is-visible", visible);
        panel.hidden = !visible;
      });
    });
  });

  const renderList = (targetId, items, type) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = items.length ? items.map(item => `
      <div class="admin-list-item">
        <div><strong>${escapeHtml(item.title)}</strong><small>${type === "event" ? `${formatDate(item.date)} · ${escapeHtml(item.time)}` : escapeHtml(item.category)}</small></div>
        ${type === "draft" ? `<button type="button" data-remove="${escapeHtml(item.id)}" data-kind="${type}">Remove</button>` : ""}
      </div>`).join("") : `<p class="field-hint">Nothing drafted yet.</p>`;
  };

  const render = () => {
    const allEvents = [...CCM_EVENTS, ...state.events];
    const allUpdates = [...CCM_NEWS, ...state.updates];
    const stats = document.getElementById("admin-stats");
    if (stats) {
      stats.innerHTML = [
        [allEvents.length, "events in view"],
        [allUpdates.length, "updates in view"],
        [state.events.length, "event drafts"],
        [state.maintenance.enabled ? "On" : "Off", "maintenance draft"],
      ].map(([value, label]) => `<div class="admin-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
    }
    renderList("overview-events", allEvents.slice().sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4), "event");
    renderList("overview-updates", allUpdates.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4), "update");
    renderList("event-drafts", state.events, "draft");
    renderList("update-drafts", state.updates, "draft");
    document.getElementById("maintenance-toggle").checked = state.maintenance.enabled;
    document.getElementById("maintenance-message").value = state.maintenance.message;
    document.getElementById("maintenance-badge").textContent = state.maintenance.enabled ? "Draft enabled" : "Preview only";
  };

  CCM_MINISTRIES.forEach(ministry => {
    const option = document.createElement("option");
    option.value = ministry.id;
    option.textContent = ministry.name;
    document.getElementById("event-ministry").appendChild(option);
  });

  document.getElementById("event-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.events.push({
      id: `draft-event-${Date.now()}`,
      title: form.get("title"), date: form.get("date"), time: form.get("time"),
      category: form.get("category"), location: form.get("location"), ministryId: form.get("ministryId"),
      description: form.get("description"), registration: form.has("registration"),
    });
    save(); event.currentTarget.reset(); render();
  });

  document.getElementById("update-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.updates.push({
      id: `draft-update-${Date.now()}`, title: form.get("title"), category: form.get("category"),
      date: new Date().toISOString().slice(0, 10), excerpt: form.get("excerpt"), featured: form.has("featured"),
    });
    save(); event.currentTarget.reset(); render();
  });

  document.getElementById("save-maintenance").addEventListener("click", () => {
    state.maintenance.enabled = document.getElementById("maintenance-toggle").checked;
    state.maintenance.message = document.getElementById("maintenance-message").value.trim();
    save(); render();
    document.getElementById("maintenance-note").textContent = "Maintenance settings saved to this browser's draft workspace.";
  });

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    const collection = button.dataset.kind === "draft" && button.closest("[data-panel=events]") ? state.events : state.updates;
    const index = collection.findIndex(item => item.id === button.dataset.remove);
    if (index >= 0) collection.splice(index, 1);
    save(); render();
  });

  document.getElementById("export-admin").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "ccm-admin-draft.json"; link.click();
    URL.revokeObjectURL(url);
  });

  render();
});