---
id: project-calendar
title: Project Calendar & Sync
sidebar_label: Project Calendar
difficulty: intermediate
estimated_reading_time: 5
points: 15
tags:
  - operations
  - counter-uas
---

## Overview

The NexaMesh Project Calendar provides centralized tracking of
deadlines, milestones, opportunities, and team activities. Team members can
subscribe to the calendar for automatic sync with their personal calendars.

---

## Calendar Subscription

### Subscribe to Calendar

Add the NexaMesh calendar to your personal calendar application:

#### Google Calendar

1. Open Google Calendar
2. Click "+" next to "Other calendars"
3. Select "From URL"
4. Paste the calendar URL (see below)
5. Click "Add calendar"

#### Apple Calendar (macOS/iOS)

1. Open Calendar app
2. File → New Calendar Subscription
3. Paste the calendar URL
4. Set refresh frequency (recommended: Every hour)
5. Click Subscribe

#### Microsoft Outlook

1. Open Outlook Calendar
2. Add Calendar → From Internet
3. Paste the calendar URL
4. Click OK

#### Thunderbird

1. Open Calendar
2. New Calendar → On the Network
3. Select iCalendar (ICS)
4. Paste the calendar URL
5. Click Subscribe

### Calendar URLs

:::info Calendar Access

Contact the project administrator to obtain calendar subscription URLs.

**Primary Calendar**: Opportunities & Deadlines **Development Calendar**: Sprint
milestones & releases **Team Calendar**: Meetings & reviews

:::

---

## Key Dates & Deadlines

### Q4 2025

| Date             | Event                                    | Category    | Priority    |
| ---------------- | ---------------------------------------- | ----------- | ----------- |
| **Dec 15, 2025** | Canada CUAS Sandbox Application Deadline | Opportunity | 🔴 Critical |
| Dec 31, 2025     | Q4 Milestone Review                      | Internal    | 🟡 High     |
| Ongoing          | Soonami Cohort 8 Activities              | Program     | 🟢 Active   |

### Q1 2026

| Date         | Event                              | Category    | Priority    |
| ------------ | ---------------------------------- | ----------- | ----------- |
| Jan 15, 2026 | Prototype Validation Target        | Development | 🔴 Critical |
| Feb 2026     | Canada CUAS Selection Notification | Opportunity | 🟡 High     |
| Mar 2026     | CPSC/ASTM/EN-71 Certification      | Compliance  | 🔴 Critical |
| Mar 31, 2026 | Q1 Milestone Review                | Internal    | 🟡 High     |

### Q2 2026

| Date         | Event                          | Category    | Priority    |
| ------------ | ------------------------------ | ----------- | ----------- |
| Apr 30, 2026 | Phase 1a Prototype Complete    | Development | 🔴 Critical |
| May 2026     | UK DASA Cycle Submission       | Opportunity | 🟡 High     |
| Jun 2026     | FAA Part 107 Waiver Submission | Compliance  | 🟡 High     |

### Q3 2026

| Date                   | Event                       | Category    | Priority    |
| ---------------------- | --------------------------- | ----------- | ----------- |
| **Sep 14-Oct 9, 2026** | Canada CUAS Sandbox Event   | Opportunity | 🔴 Critical |
| Sep 2026               | Enterprise Pilot MOU Target | Business    | 🔴 Critical |

---

## Opportunity Deadlines

### Upcoming (Next 90 Days)

```
┌─────────────────────────────────────────────────────────────────┐
│ DECEMBER 2025                                                   │
├─────────────────────────────────────────────────────────────────┤
│   15  │ 🔴 Canada CUAS Sandbox 2026 Application                 │
│       │    Deadline: 2:00 PM ET                                 │
│       │    Status: Application in progress                      │
├─────────────────────────────────────────────────────────────────┤
│ JANUARY 2026                                                    │
├─────────────────────────────────────────────────────────────────┤
│   TBD │ 🟡 SBIR/STTR Reauthorization Watch                     │
│       │    Monitor congressional action                         │
├─────────────────────────────────────────────────────────────────┤
│ FEBRUARY 2026                                                   │
├─────────────────────────────────────────────────────────────────┤
│   ~15 │ 🟢 Canada CUAS Selection Notification                   │
│       │    Expected 6-8 weeks after deadline                    │
└─────────────────────────────────────────────────────────────────┘
```

### Rolling Opportunities

| Opportunity      | Submission Window | Review Cycle |
| ---------------- | ----------------- | ------------ |
| DIU CSO          | Ongoing           | As posted    |
| NATO NIF         | Ongoing           | Quarterly    |
| DHS C-UAS Grants | FY2026            | Annual       |

---

## Development Milestones

### Phase 1a: Core Platform

| Milestone             | Target Date | Status         |
| --------------------- | ----------- | -------------- |
| Subsystem Integration | Dec 2025    | 🟡 In Progress |
| Prototype Assembly    | Jan 2026    | ⬜ Planned     |
| Field Evaluation      | Apr 2026    | ⬜ Planned     |

### Phase 1b: SkySnare™ Consumer

| Milestone               | Target Date | Status     |
| ----------------------- | ----------- | ---------- |
| CPSC/ASTM Certification | Mar 2026    | ⬜ Planned |
| D2C Website Launch      | Apr 2026    | ⬜ Planned |
| First Units Shipped     | May 2026    | ⬜ Planned |
| 5,000 Units Sold        | Dec 2026    | ⬜ Target  |

### Phase 1c: AeroNet™ Enterprise

| Milestone              | Target Date | Status     |
| ---------------------- | ----------- | ---------- |
| FAA Waiver Submission  | Jun 2026    | ⬜ Planned |
| Pilot MOU Signed       | Sep 2026    | ⬜ Target  |
| First Pilot Deployment | Q1 2027     | ⬜ Target  |

---

## Team Meetings

### Recurring Meetings

| Meeting         | Frequency | Day/Time        | Duration |
| --------------- | --------- | --------------- | -------- |
| Daily Standup   | Daily     | Mon-Fri 9:00 AM | 15 min   |
| Sprint Planning | Bi-weekly | Monday 10:00 AM | 2 hours  |
| Sprint Review   | Bi-weekly | Friday 3:00 PM  | 1 hour   |
| Investor Update | Monthly   | 1st Thursday    | 1 hour   |
| Board Meeting   | Quarterly | TBD             | 2 hours  |

### Soonami Cohort 8 Schedule

| Meeting         | Frequency     | Notes          |
| --------------- | ------------- | -------------- |
| Mentor Sessions | Weekly        | Individual     |
| Cohort Meetings | Bi-weekly     | Group          |
| Workshops       | As scheduled  | Various topics |
| Demo Day Prep   | Final 4 weeks | Intensive      |

---

## Calendar Integration Guide

### For Google Workspace Users

**Step 1**: Create a shared Google Calendar for the team

```
1. Go to calendar.google.com
2. Click "+" next to "Other calendars"
3. Create new calendar: "NexaMesh - Opportunities"
4. Set sharing permissions for team members
```

**Step 2**: Add events programmatically (optional)

```javascript
// Google Apps Script example
function addOpportunityDeadline() {
  var calendar = CalendarApp.getCalendarById("CALENDAR_ID");
  calendar.createEvent(
    "CUAS Sandbox 2026 Application Deadline",
    new Date("2025-12-15T14:00:00-05:00"),
    new Date("2025-12-15T15:00:00-05:00"),
    {
      description: "Submit application via PriviDox",
      location: "Online",
    },
  );
}
```

### For Microsoft 365 Users

**Step 1**: Create shared Outlook calendar

```
1. Open Outlook Calendar
2. Right-click "My Calendars"
3. Add Calendar → Create new blank calendar
4. Name: "NexaMesh - Opportunities"
5. Share with team members
```

### ICS File Download

Download calendar events as ICS files for import:

| Calendar                  | Download          |
| ------------------------- | ----------------- |
| Opportunities & Deadlines | opportunities.ics |
| Development Milestones    | development.ics   |
| Team Meetings             | meetings.ics      |

:::note ICS Files

ICS files will be generated and made available in the Resources section. Contact
the project administrator for access.

:::

---

## Notification Settings

### Recommended Alert Settings

| Event Type        | Alert 1 | Alert 2 | Alert 3 |
| ----------------- | ------- | ------- | ------- |
| Critical Deadline | 1 week  | 3 days  | 1 day   |
| High Priority     | 5 days  | 1 day   | 2 hours |
| Meetings          | 1 day   | 1 hour  | 15 min  |
| Milestones        | 2 weeks | 1 week  | 1 day   |

### Setting Up Notifications

**Google Calendar:**

1. Click on event
2. Edit event → Add notification
3. Set time before event

**Outlook:**

1. Open event
2. Click Reminder dropdown
3. Select reminder time

---

## Calendar Maintenance

### Adding New Events

When adding new opportunities or deadlines:

1. Add to this documentation page
2. Create calendar event with:
   - Clear title
   - Detailed description
   - Relevant links
   - Appropriate category/color
3. Set notifications
4. Notify team members

### Event Categories (Color Coding)

| Category          | Color     | Examples               |
| ----------------- | --------- | ---------------------- |
| **Opportunities** | 🔴 Red    | Application deadlines  |
| **Development**   | 🔵 Blue   | Milestones, releases   |
| **Compliance**    | 🟡 Yellow | Certifications, audits |
| **Meetings**      | 🟢 Green  | Team meetings, reviews |
| **Events**        | 🟣 Purple | Conferences, sandbox   |

---

## Quick Reference

### Immediate Actions Required

| Item                    | Due          | Owner | Status      |
| ----------------------- | ------------ | ----- | ----------- |
| Canada CUAS Application | Dec 15, 2025 | PM    | Draft       |
| Soonami Demo Day Prep   | TBD          | Team  | Active      |
| Prototype Integration   | Jan 2026     | Eng   | In Progress |

### Upcoming Reviews

| Review          | Date         | Participants     |
| --------------- | ------------ | ---------------- |
| Q4 2025 Review  | Dec 31, 2025 | All              |
| Investor Update | Jan 2026     | Exec + Investors |
| Sprint Review   | Bi-weekly    | Development Team |

---

_Calendar last updated: November 2025. Contact project administrator for
calendar subscription access. © 2026 NexaMesh. All rights reserved._
