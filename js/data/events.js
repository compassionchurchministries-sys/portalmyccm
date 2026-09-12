/**
 * data/events.js
 * Placeholder events used until CCM_CONFIG.features.liveEventsFeed is
 * turned on and events are sourced from a backend. Dates are illustrative
 * only — do not treat them as scheduled.
 */
const CCM_EVENTS = [
  {
    id: "volunteer-orientation",
    title: "New Volunteer Orientation",
    category: "Organization-Wide",
    date: "2026-09-12",
    time: "10:00 AM",
    location: "Main Campus (location TBD)",
    description: "An introduction to CCM's ministries and how to get started serving.",
    ministryId: "volunteers",
    registration: true,
  },
  {
    id: "kids-volunteer-training",
    title: "Kids Ministry Volunteer Training",
    category: "Ministry Event",
    date: "2026-09-19",
    time: "9:00 AM",
    location: "Kids Wing (location TBD)",
    description: "Required training session for new and returning Kids Ministry volunteers.",
    ministryId: "kids",
    registration: true,
  },
  {
    id: "worship-rehearsal",
    title: "Worship Team Rehearsal",
    category: "Ministry Event",
    date: "2026-09-24",
    time: "6:30 PM",
    location: "Worship Center (location TBD)",
    description: "Weekly rehearsal for worship team members.",
    ministryId: "worship",
    registration: false,
  },
  {
    id: "youth-night",
    title: "Youth Night",
    category: "Ministry Event",
    date: "2026-09-26",
    time: "6:00 PM",
    location: "Youth Room (location TBD)",
    description: "Weekly gathering for middle and high school students.",
    ministryId: "youth",
    registration: false,
  },
  {
    id: "media-team-orientation",
    title: "Media Team Orientation",
    category: "Ministry Event",
    date: "2026-10-03",
    time: "5:00 PM",
    location: "Media Booth (location TBD)",
    description: "Learn the basics of livestream, audio, and camera operation.",
    ministryId: "media",
    registration: true,
  },
  {
    id: "org-wide-serve-day",
    title: "Organization-Wide Serve Day",
    category: "Organization-Wide",
    date: "2026-10-17",
    time: "9:00 AM",
    location: "Off-site (location TBD)",
    description: "CCM ministries and departments partner for a day of community service.",
    ministryId: null,
    registration: true,
  },
];
