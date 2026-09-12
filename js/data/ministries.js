/**
 * data/ministries.js
 * Each ministry the church operates. This is the schema a future CMS/API
 * should match — the render code in components.js only depends on these
 * field names, so ministries can be added, removed, or reordered here
 * without editing any page.
 *
 * leadName / leadRole are placeholders until real leadership is supplied
 * (see data/leadership.js for the note on why names aren't invented).
 */
const CCM_MINISTRIES = [
  {
    id: "media",
    name: "Media Ministry",
    initial: "M",
    summary: "Supports worship and communication through video, audio, livestream, and photography.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Media Director",
    volunteerRoles: ["Camera operators", "Livestream tech", "Photographers", "Editors"],
    relatedEventIds: ["media-team-orientation"],
  },
  {
    id: "worship",
    name: "Worship Ministry",
    initial: "W",
    summary: "Leads the congregation in music and worship across services and events.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Worship Director",
    volunteerRoles: ["Vocalists", "Musicians", "Sound support"],
    relatedEventIds: ["worship-rehearsal"],
  },
  {
    id: "kids",
    name: "Kids Ministry",
    initial: "K",
    summary: "A safe, welcoming environment where children grow in faith through age-appropriate teaching and care.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Kids Ministry Director",
    volunteerRoles: ["Classroom leaders", "Check-in team", "Nursery care"],
    relatedEventIds: ["kids-volunteer-training"],
  },
  {
    id: "youth",
    name: "Youth Ministry",
    initial: "Y",
    summary: "Guides students through faith, community, and mentorship during their middle and high school years.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Youth Director",
    volunteerRoles: ["Small group leaders", "Event support"],
    relatedEventIds: ["youth-night"],
  },
  {
    id: "women",
    name: "Women's Ministry",
    initial: "WM",
    summary: "Connects women through fellowship, study, and service opportunities across the congregation.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Women's Ministry Director",
    volunteerRoles: ["Group facilitators", "Event planning"],
    relatedEventIds: [],
  },
  {
    id: "education",
    name: "Education Ministry",
    initial: "E",
    summary: "Coordinates classes, studies, and discipleship pathways for members at every stage.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Education Director",
    volunteerRoles: ["Class facilitators", "Curriculum support"],
    relatedEventIds: [],
  },
  {
    id: "volunteers",
    name: "Volunteer Ministry",
    initial: "V",
    summary: "Connects members and the community with meaningful ways to serve across every ministry.",
    leadName: "Ministry lead not yet assigned",
    leadRole: "Volunteer Director",
    volunteerRoles: ["Volunteer coordinators", "Onboarding support"],
    relatedEventIds: ["volunteer-orientation"],
  },
];
