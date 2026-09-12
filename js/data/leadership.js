/**
 * data/leadership.js
 * Leadership directory. No real names, titles-to-people mappings, or
 * photos have been supplied by CCM, so every entry here is a role-level
 * placeholder — clearly marked as such in the UI (see components.js
 * leaderCard renderer). Replace `name` and `photoAlt` with real values,
 * and swap `photoPlaceholder: true` to false once a photo is wired in,
 * when this is connected to a CMS/backend.
 */
const CCM_LEADERSHIP = [
  { id: "l1", name: "Name not yet provided", role: "Senior Pastor", group: "Executive Leadership", photoPlaceholder: true },
  { id: "l2", name: "Name not yet provided", role: "Executive Pastor", group: "Executive Leadership", photoPlaceholder: true },
  { id: "l3", name: "Name not yet provided", role: "Director of Administration", group: "Directors", photoPlaceholder: true },
  { id: "l4", name: "Name not yet provided", role: "Worship Director", group: "Directors", photoPlaceholder: true },
  { id: "l5", name: "Name not yet provided", role: "Kids Ministry Director", group: "Directors", photoPlaceholder: true },
  { id: "l6", name: "Name not yet provided", role: "Youth Director", group: "Directors", photoPlaceholder: true },
  { id: "l7", name: "Name not yet provided", role: "Media Director", group: "Directors", photoPlaceholder: true },
  { id: "l8", name: "Name not yet provided", role: "Assistant Kids Director", group: "Assistant Directors", photoPlaceholder: true },
  { id: "l9", name: "Name not yet provided", role: "Assistant Youth Director", group: "Assistant Directors", photoPlaceholder: true },
  { id: "l10", name: "Name not yet provided", role: "Volunteer Team Leader — Media", group: "Team Leaders", photoPlaceholder: true },
  { id: "l11", name: "Name not yet provided", role: "Volunteer Team Leader — Kids", group: "Team Leaders", photoPlaceholder: true },
  { id: "l12", name: "Name not yet provided", role: "Volunteer Team Leader — Worship", group: "Team Leaders", photoPlaceholder: true },
];

/** Display order for grouping the directory. */
const CCM_LEADERSHIP_GROUPS = ["Executive Leadership", "Directors", "Assistant Directors", "Team Leaders"];
