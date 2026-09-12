/**
 * config.js
 * Site-wide configuration. Keep factual/organizational values here so
 * they are never hardcoded inline in HTML or component logic.
 *
 * NOTE: Values marked (placeholder) are not confirmed facts — CCM has not
 * supplied them yet. Replace with real content before launch; do not
 * treat them as accurate in the meantime.
 */
const CCM_CONFIG = {
  orgName: "Compassion Church Ministries",
  orgShort: "CCM",
  portalName: "CCM Organization Portal",

  mainSiteUrl: "https://mycompassionchurch.org",
  portalUrl: "https://portal.mycompassionchurch.org",

  entra: {
    tenantDomain: "mycompassionchurch.org",
    applicationId: "066e82de-442c-485e-b213-5ec0e2b65018",
    applicationObjectId: "41c1020b-8474-431c-9e8d-d242eb69e47a",
    adminGroupId: "2b9d119d-56ff-48f4-863d-db6605d9f5cc",
    mediaDirectorGroupId: "ebece18e-e1e9-4a28-9bad-c7ea08d310d3",
  },
  
  contactEmail: "info@mycompassionchurch.org",

  // (placeholder) — no address, phone, or service times have been supplied.
  address: null,
  phone: null,
  serviceTimes: null,

  // Feature flags — the portal ships with these OFF. Turn on only once the
  // corresponding system is real. Nothing in the UI should claim a feature
  // is live if its flag is false.
  features: {
    entraSignIn: true,        // Microsoft Entra ID authentication
    volunteerAccounts: false, // Self-service volunteer accounts
    liveEventsFeed: false,    // Events sourced from a backend instead of data/events.js
    liveNewsFeed: false,      // News sourced from a CMS instead of data/news.js
  },
};
