# CCM Organization Portal

Public-facing organization portal for **Compassion Church Ministries (CCM)**, intended for
`portal.mycompassionchurch.org`. This is a separate site from the main public church website
(`mycompassionchurch.org`) — this portal is focused on CCM as an organization: ministries,
departments, leadership, events, volunteering, and CCM's digital services.

This is a **first version**: static HTML/CSS/vanilla JS, no build step, no backend. It is built
so a future developer can connect a CMS/API and Microsoft Entra ID authentication without
restructuring the site.

## Running locally

No build tools or dependencies are required. Because the pages load Google Fonts and use
relative paths, serve the folder with a simple local server rather than opening the HTML files
directly with `file://` (some browsers restrict local script/font loading over `file://`):

```bash
# from the ccm-portal/ directory
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static file server works (`npx serve`, VS Code's Live Server extension, etc.).

## Project structure

```
ccm-portal/
├── index.html              Homepage
├── about.html               About CCM
├── ministries.html          Ministry directory
├── departments.html         Department directory
├── leadership.html          Leadership directory
├── events.html               Events
├── news.html                 News & announcements
├── volunteer.html            Volunteer / express-interest
├── resources.html            Resource center
├── digital-services.html     CompassionOS / AIMS / future systems overview
├── contact.html               Contact
├── css/
│   ├── tokens.css            Design tokens: color, type scale, spacing, radius, motion
│   ├── base.css               Resets, base element styles, accessibility helpers
│   ├── components.css         Reusable components: nav, buttons, cards, footer, forms
│   └── layout.css             Page-level layout: hero, org diagram, section patterns
└── js/
    ├── config.js              Site-wide config: org name, domains, contact email, feature flags
    ├── components.js          Shared render functions: header/nav, footer, all card types
    ├── main.js                 Page dispatcher — reads <body data-page="..."> and renders
    └── data/
        ├── nav.js              Primary navigation — single source of truth for all nav links
        ├── ministries.js       Ministry directory data
        ├── departments.js      Department directory data
        ├── leadership.js       Leadership directory data (roles only, no invented names)
        ├── events.js            Event listings
        ├── news.js              News/announcement entries
        ├── resources.js         Resource center entries + categories
        └── digital-services.js CompassionOS / AIMS / future systems data
```

### How pages are assembled

Every page loads the same stylesheets and scripts, sets `<body data-page="...">`, and includes
two empty mount points: `<div id="site-header"></div>` and `<div id="site-footer"></div>`.
`main.js` reads `data-page` on load, calls `CCM.mountHeader()` / `CCM.mountFooter()` (defined in
`components.js`, built from `data/nav.js`), and then calls the matching page-specific render
function, which reads from the relevant `data/*.js` file and injects HTML into a container
element (e.g. `#ministries-grid`, `#events-list`).

This means:
- **Navigation** changes happen once, in `data/nav.js`.
- **Content** (a new ministry, department, leader, event, news item, or resource) is added by
  adding one object to the matching `data/*.js` array — no HTML editing required.
- **Header/footer markup** changes happen once, in `components.js`.

## Where content should come from later

Every `data/*.js` file is written as a stand-in for a future CMS/API/backend response — the
field names in each object are the schema a real data source should match. `js/config.js` has a
`features` flag object (`liveEventsFeed`, `liveNewsFeed`, etc.) intended to gate the switch from
static data to a live source once one exists; none are implemented here.

Leadership names, photos, ministry leader names, address, phone, and service times are all
explicitly marked as placeholders (visually, with the `.placeholder-tag` style, and in code
comments) because CCM has not supplied them. Do not replace these with invented information —
replace them with real content when it's available.

## Where authentication should be integrated

**No authentication is implemented.** "Sign In" and "Access CCM Services" currently show an
informational message (see `handleSignInClick` in `js/components.js`) instead of performing any
real sign-in. This is the single integration point: replace the body of that function with a
redirect into the Microsoft Entra ID (MSAL) auth-code flow. Because every "Sign In" / "Access
CCM Services" element on every page calls this same function (via the `data-signin-trigger`
attribute), wiring up real authentication requires changing code in exactly one place.

The architecture assumes two eventually-distinct identity paths:
- **Staff & leaders** — CCM Microsoft 365 / Entra ID accounts, for CompassionOS, AIMS, and the
  internal SharePoint site.
- **Volunteers** — a lighter-weight account system (not yet built) so volunteers don't need a
  full CCM Microsoft 365 identity. The Volunteer page (`volunteer.html`) links out to this
  distinction and points at a placeholder future URL
  (`volunteers.mycompassionchurch.org`, see `js/config.js`).

## What's intentionally not here

- No real authentication, database, or API calls — everything is static data in `js/data/`.
- AIMS is described but has no public link or access point anywhere in the site, by design —
  it's internal-only infrastructure and should stay that way even as this portal grows.
- No admin dashboards, internal reports, or private personnel/volunteer information — this is
  the **public** portal only.

## Admin access on Azure App Service

The static admin workspace is prepared for Azure App Service Authentication (Easy Auth). Enable
the Microsoft identity provider for the production App Service and register this callback URL:

`https://portal.mycompassionchurch.org/.auth/login/aad/callback`

Keep unauthenticated requests allowed if this App Service also hosts the public portal. The admin
page starts the Microsoft sign-in flow when needed and checks the signed-in claims against the
Administrator and Media Director group object IDs in `js/config.js`. Group claims or app roles
must be included in the Entra token. This client-side check is only a UI gate, not a security
boundary; event and content write operations must validate the same groups server-side in a future
API. For stronger route-level isolation, host the admin workspace in a separate App Service or
admin subdomain with authentication required for every request.

## Before extending this site

- Keep new content additions in `js/data/`, not hardcoded into HTML.
- Keep new shared UI in `js/components.js` so it stays centralized.
- Reuse existing design tokens (`css/tokens.css`) rather than introducing new one-off colors or
  spacing values.
