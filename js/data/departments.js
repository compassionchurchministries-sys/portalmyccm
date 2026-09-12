/**
 * data/departments.js
 * Organizational departments. Kept as a separate model from ministries —
 * a department is an operating unit of the organization (may or may not
 * face the congregation directly), where a ministry is a congregation-
 * facing area of service. Some departments support a ministry of the
 * same name; others (Administration, IT, Facilities) do not correspond
 * to any ministry at all.
 */
const CCM_DEPARTMENTS = [
  {
    id: "media-dept",
    name: "Media",
    description: "Production, broadcast, and digital communication for services and organization-wide content.",
    relatedMinistryId: "media",
    headTitle: "Media Director",
  },
  {
    id: "administration",
    name: "Administration",
    description: "Church operations, finance, and organizational coordination across all departments.",
    relatedMinistryId: null,
    headTitle: "Director of Administration",
  },
  {
    id: "education-dept",
    name: "Education",
    description: "Oversees curriculum, classes, and discipleship programming.",
    relatedMinistryId: "education",
    headTitle: "Education Director",
  },
  {
    id: "worship-dept",
    name: "Worship",
    description: "Plans and produces music and worship experiences for services and events.",
    relatedMinistryId: "worship",
    headTitle: "Worship Director",
  },
  {
    id: "kids-dept",
    name: "Kids",
    description: "Operational oversight of children's programming, safety, and staffing.",
    relatedMinistryId: "kids",
    headTitle: "Kids Ministry Director",
  },
  {
    id: "youth-dept",
    name: "Youth",
    description: "Operational oversight of student ministry programming and events.",
    relatedMinistryId: "youth",
    headTitle: "Youth Director",
  },
  {
    id: "communications",
    name: "Communications",
    description: "Organization-wide messaging, announcements, and public information.",
    relatedMinistryId: null,
    headTitle: "Communications Director",
  },
  {
    id: "it",
    name: "IT / Technology",
    description: "Maintains CCM's digital infrastructure, including the portal and internal systems.",
    relatedMinistryId: null,
    headTitle: "Technology Director",
  },
  {
    id: "facilities",
    name: "Facilities",
    description: "Manages church property, maintenance, and event setup.",
    relatedMinistryId: null,
    headTitle: "Facilities Director",
  },
];
