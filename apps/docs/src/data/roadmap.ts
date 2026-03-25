/**
 * Roadmap & Timeline Data
 *
 * Single source of truth for all timeline and milestone information.
 *
 * REALITY-ALIGNED: March 2026
 * - Software platform: Built and operational (Rust API, blockchain, AI detector, WASM simulator)
 * - Hardware: Pre-prototype (component sourcing, flight controller experiments)
 * - Revenue: $0 (bootstrapped R&D)
 * - Team: 2 active founders + 3 advisors
 * - Strategy: Europe-first, SA as R&D cost base
 * - Brand: NexaMesh (Kestrel = consumer, Sentinel = enterprise, Horizon = military)
 */

import type { TimelinePoint } from "./types";

/** Current Status */
export const currentStatus = {
  phase: "Pre-Seed / Bootstrapping",
  week: 13,
  year: 2026,
  lastUpdate: "March 25, 2026",

  highlights: {
    hardware:
      "Component sourcing and prototyping — flight controller (F405/INAV), salvaged hoverboard motors, low-cost sensors. No integrated prototype yet.",
    software:
      "Production-quality platform built: Rust Axum API, Solana + EtherLink blockchain evidence, Python YOLOv8/v9 AI detector, WASM threat simulator, Docusaurus docs portal. 400+ commits.",
    revenue: "Pre-revenue — bootstrapped founder R&D for 9+ months",
    validation:
      "Europe-first strategy confirmed. Detection-only initial entry (signal jamming illegal in SA). Non-ITAR jurisdiction as competitive advantage.",
  },
};

/** Development Phases */
export const developmentPhases = {
  phase1: {
    name: "Foundation",
    timeline: "Months 1-12 (Q3 2025 - Q1 2026)",
    status: "Partially Complete",
    objectives: [
      "Software platform development — COMPLETE",
      "Blockchain evidence chain (Solana + EtherLink) — COMPLETE",
      "AI detection engine (YOLOv8/v9 on Python) — COMPLETE",
      "Threat simulation engine (Leptos/WASM) — COMPLETE",
      "Hardware prototype assembly — IN PROGRESS",
      "Component sourcing and integration — IN PROGRESS",
    ],
  },
  phase2: {
    name: "Prototype & Validate",
    timeline: "Months 12-24 (Q2 2026 - Q1 2027)",
    status: "Planned",
    objectives: [
      "Integrated detection hardware prototype (camera + compute + alert)",
      "Field testing in controlled environment",
      "First EU partner/customer engagement",
      "Grant and accelerator funding secured",
      "MS Founders Hub reapplication (NexaMesh / Charl Chapman)",
    ],
  },
  phase3: {
    name: "First Deployments",
    timeline: "Months 24-36 (2027-2028)",
    status: "Vision",
    objectives: [
      "First paid EU pilot deployment",
      "EU regulatory compliance (CE marking for detection equipment)",
      "Team expansion (3-5 people)",
      "Seed/Series A fundraise with proven revenue",
    ],
  },
};

/** Quarterly Roadmap */
export const quarterlyRoadmap: TimelinePoint[] = [
  {
    quarter: "Q1",
    year: 2026,
    description:
      "NexaMesh brand launch. Detection demo video (AI + blockchain on laptop). MS Founders Hub application under new brand.",
    status: "in-progress",
  },
  {
    quarter: "Q2",
    year: 2026,
    description:
      "Hardware prototype v0.1 assembled. TIA and accelerator applications submitted. EU market research and first partner conversations.",
    status: "planned",
  },
  {
    quarter: "Q3",
    year: 2026,
    description:
      "Field test with detection prototype. Grant decision outcomes. First EU conference attendance.",
    status: "planned",
  },
  {
    quarter: "Q4",
    year: 2026,
    description:
      "First customer LOI or paid pilot agreement (EU target). Pre-seed round close ($50K-$150K).",
    status: "planned",
  },
  {
    quarter: "Q1",
    year: 2027,
    description:
      "First small detection deployment (EU). Initial revenue from pilot. Seed fundraise begins.",
    status: "target",
  },
  {
    quarter: "Q2",
    year: 2027,
    description:
      "1-3 detection nodes operational. Seed round close. Team expansion to 3-4 people.",
    status: "target",
  },
];

/** Key Milestones */
export const milestones = {
  completed: [
    {
      date: "Q3 2025 - Q1 2026",
      milestone: "Full software platform built (API, blockchain, AI, simulator, docs)",
      category: "Software",
    },
    {
      date: "Q4 2025",
      milestone: "x402 payment protocol implemented",
      category: "Software",
    },
    {
      date: "Q4 2025",
      milestone: "10+ Architecture Decision Records published",
      category: "Architecture",
    },
    {
      date: "Q1 2026",
      milestone: "NexaMesh rebrand and reality-aligned documentation",
      category: "Strategy",
    },
    {
      date: "Q1 2026",
      milestone: "Europe-first market strategy confirmed",
      category: "Strategy",
    },
  ],

  upcoming: [
    {
      target: "Q1-Q2 2026",
      milestone: "Working detection demo video (AI + blockchain evidence)",
      category: "Validation",
    },
    {
      target: "Q2 2026",
      milestone: "Hardware detection prototype v0.1 assembled",
      category: "Hardware",
    },
    {
      target: "Q2-Q3 2026",
      milestone: "Accelerator / grant applications submitted (TIA, Soonami, MS Founders Hub)",
      category: "Funding",
    },
    {
      target: "Q3-Q4 2026",
      milestone: "Field test with working prototype",
      category: "Validation",
    },
    {
      target: "Q4 2026",
      milestone: "First EU customer LOI or pilot agreement",
      category: "Revenue",
    },
    {
      target: "2027",
      milestone: "First paid deployment and initial revenue",
      category: "Revenue",
    },
  ],
};

/** Deployment Milestones — Reality-aligned */
export const deploymentMilestones = {
  month6: {
    target: "Working detection prototype tested in controlled environment",
    status: "target",
  },
  month12: {
    target: "First detection system deployed at EU pilot site",
    status: "target",
  },
  month15: {
    target: "CE marking / EU compliance for detection equipment",
    status: "target",
  },
  month18: {
    target: "3-5 detection nodes operational across 1-2 EU sites",
    status: "target",
  },
};

/** Funding Timeline — Reality-aligned */
export const fundingTimeline = [
  {
    round: "Pre-Seed (Grants + Accelerators)",
    amount: "$50K-$150K",
    timeline: "Q2-Q4 2026",
    status: "Active — applications in progress",
  },
  {
    round: "Seed",
    amount: "$500K-$2M",
    timeline: "Q1-Q2 2027",
    status: "Planned — requires working prototype + EU pilot",
    preconditions: [
      "Working detection prototype deployed",
      "At least 1 paying EU pilot customer",
      "Grant/accelerator validation",
    ],
  },
  {
    round: "Series A",
    amount: "$3M-$5M",
    timeline: "2028",
    status: "Vision",
    preconditions: [
      "Proven revenue from multiple EU deployments",
      "EU certification achieved",
      "Team of 5-10",
    ],
  },
  {
    round: "Series B",
    amount: "$10M-$15M",
    timeline: "2029-2030",
    status: "Vision",
    preconditions: [
      "Established EU customer base",
      "Military tier development",
      "International expansion",
    ],
  },
];

/** Success Metrics — Reality-aligned */
export const successMetrics = {
  technical: {
    detectionAccuracy: "95%+ (target for prototype)",
    responseTime: "<500ms (target for prototype)",
  },
  commercial: {
    year1Systems: 0, // Year 1 is prototype building
    year1Revenue: "$0 (building prototype)",
    year2Systems: 1, // First pilot
    year2Revenue: "$100K-$500K",
  },
  strategic: {
    euPartnerConversations: 3, // Target for 2026
    grantApplications: 5, // Target for 2026
  },
  financial: {
    grossMargin: "65% (target — when producing)",
    ebitdaByYear3: "N/A (pre-revenue through year 1-2)",
  },
};

/** Vision */
export const vision = {
  shortTerm:
    "Working detection prototype and first EU customer conversation by end 2026",
  midTerm:
    "Affordable, AI-powered airspace awareness for European critical infrastructure — airports, power plants, events, wildlife reserves",
  longTerm:
    "Global standard for accessible counter-drone detection with blockchain evidence chain",
  exitTarget:
    "Long-term vision — build a sustainable business first, exit is years away",
};
