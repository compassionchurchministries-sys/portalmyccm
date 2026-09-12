/**
 * data/digital-services.js
 * Describes CCM's digital ecosystem at a public-appropriate level of
 * detail. AIMS is internal-only and must never be presented with public
 * access — see `status` and `publicAccess` below, which the renderer
 * uses to decide whether to show any access link at all.
 */
const CCM_DIGITAL_SERVICES = [
  {
    id: "compassionos",
    name: "CompassionOS",
    tagline: "Church operations platform",
    description: "Supports scheduling, requests, reports, and day-to-day operations across CCM departments and ministries.",
    functions: ["Scheduling", "Requests", "Reports", "Department operations"],
    status: "internal",
    statusLabel: "Staff & Leaders",
    publicAccess: false,
  },
  {
    id: "future",
    name: "Future Applications",
    tagline: "Additional digital services",
    description: "CCM's digital infrastructure is intended to grow. Additional applications will appear here as they are introduced.",
    functions: [],
    status: "planned",
    statusLabel: "Planned",
    publicAccess: false,
  },
];
