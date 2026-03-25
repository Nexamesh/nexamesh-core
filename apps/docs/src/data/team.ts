/**
 * Team Information
 *
 * Single source of truth for team member details and company structure.
 *
 * Updated: March 2026 — Reality-aligned for NexaMesh rebrand.
 * Core team: 2 active founders. Advisors: 3 (engaged when needed).
 */

/** Core Team (Active Daily) */
export const founders = {
  cto: {
    name: "Jurie (Hans Jurgens) Smit",
    title: "Co-Founder & CTO",
    current: {
      role: "Senior Developer",
      company: "Sygnia Asset Management",
    },
    experience: "15+ years",
    expertise: [
      "System Architecture",
      "AI/ML",
      "Blockchain",
      "Full-Stack Development",
      "Edge Computing",
      "Human-AI collaboration frameworks",
    ],
    education: [
      {
        degree: "B.Eng Industrial-Electronic",
        institution: "Stellenbosch University",
      },
      {
        degree: "B.Com Quantitative Management",
        institution: "UNISA",
      },
    ],
    contact: {
      email: "jurie@nexamesh.ai",
      phone: "+27 (069) 140-6835",
    },
  },

  hardwareLead: {
    name: "Charl Chapman",
    title: "Co-Founder & Hardware Lead",
    current: {
      role: "Hardware Prototyping & Integration",
      company: "NexaMesh",
    },
    experience: "10+ years",
    expertise: [
      "Mechanical & Electrical Diagnostics",
      "Hardware Prototyping",
      "Component Integration",
      "Vehicle Systems",
      "Hands-on Fabrication",
    ],
    education: [
      {
        degree: "Vehicle Systems & Electrical Repair",
        institution: "Practical / Trade",
      },
    ],
    contact: {
      email: "charl@nexamesh.ai",
    },
    // TODO: Create LinkedIn profile for Charl
    linkedinStatus: "pending",
  },
};

/** Advisors (Engaged as needed, not full-time) */
export const advisors = {
  business: {
    name: "Martyn Redelinghuys",
    title: "Advisor — Business Strategy & Manufacturing",
    role: "Factory access, executive project management, defense industry relationships",
    current: {
      role: "Consultant Executive Project Manager",
      company: "Sasol",
      portfolioSize: "R500M+",
    },
    experience: "20+ years",
    expertise: [
      "Executive Project Management",
      "Energy management",
      "Manufacturing operations",
      "Mining & defense sectors",
    ],
    education: [
      {
        degree: "B.Eng Electrical & Electronic",
        institution: "Stellenbosch University",
      },
      {
        degree: "MBA",
        institution: "GIBS",
      },
    ],
    certifications: [
      "Certified Energy Manager (CEM)",
      "Certified Measurement and Verification Professional (CMVP)",
    ],
    engagementLevel: "Will engage actively when funding secured. Has manufacturing facility.",
  },

  finance: {
    name: "Eben Maré",
    title: "Advisor — Financial Strategy",
    role: "Financial modeling, investment structuring, quantitative analysis",
    experience: "15+ years",
    expertise: [
      "Investment Banking",
      "Private Equity",
      "Quantitative Finance",
      "Algorithmic Trading",
    ],
    education: [
      {
        degree: "BSc (Hons) Operations Research",
        institution: "UNISA",
      },
      {
        degree: "BSc Applied Mathematics",
        institution: "University of Pretoria",
      },
    ],
    engagementLevel: "Available for financial modeling and investor discussions.",
  },

  industry: {
    name: "Pieter La Grange",
    title: "Advisor — Embedded Systems & Industry Connections",
    role: "Embedded systems expertise, defense industry connections",
    experience: "15+ years",
    expertise: [
      "Embedded Firmware",
      "Hardware Design",
      "Low-Power ARM",
      "BLE/WiFi",
      "RTOS",
    ],
    education: [
      {
        degree: "B.Eng Electrical & Electronics",
        institution: "Stellenbosch University",
      },
    ],
    engagementLevel: "Advisory capacity for embedded systems guidance and industry introductions.",
  },
};

/** Team Summary */
export const teamSummary = {
  coreTeamSize: 2,
  advisorCount: 3,
  combinedExperience: "25+ years",
  domains: ["Counter-UAS", "AI/ML", "Blockchain", "Edge Computing", "Hardware Prototyping"],
  keyStrengths: [
    "Full-stack software platform built and operational",
    "Hands-on hardware prototyping capability",
    "Defense industry connections via advisors",
    "Financial modeling expertise on call",
  ],
};

/** Team Expansion Plans */
export const hiringPlan = {
  priority: [
    {
      role: "AI/ML Engineers",
      focus: "Computer vision and autonomous systems",
      status: "Post-funding",
    },
    {
      role: "Embedded Systems Engineer",
      focus: "Flight controller integration, sensor fusion firmware",
      status: "Post-funding",
    },
    {
      role: "Business Development",
      focus: "Defense procurement, enterprise sales",
      status: "Post-funding",
    },
  ],
};

/** Advisory Board */
export const advisoryBoard = {
  status: "Active — 3 advisors engaged",
  members: [
    {
      name: "Martyn Redelinghuys",
      area: "Business Strategy & Manufacturing",
      value: "Factory access, R500M+ portfolio management experience, GIBS MBA",
    },
    {
      name: "Eben Maré",
      area: "Financial Strategy",
      value: "Investment banking, PE, quantitative finance, Deloitte experience",
    },
    {
      name: "Pieter La Grange",
      area: "Embedded Systems & Industry",
      value: "15+ years embedded systems at Snuza, defense industry connections",
    },
  ],
  targetExpansion: [
    {
      area: "Defense Strategy",
      target: "Former SANDF or ARMSCOR officials",
    },
    {
      area: "International Markets",
      target: "Counter-UAS industry practitioners",
    },
  ],
};

/** Strategic Partnerships */
export const partnerships = {
  current: [] as Array<{ partner: string; type: string; focus: string }>,
  planned: [
    {
      partner: "CSIR DPSS",
      type: "Research collaboration",
      focus: "Counter-UAS technology validation and testing facilities",
    },
    {
      partner: "ARMSCOR",
      type: "Defense procurement",
      focus: "SANDF counter-drone capability gap (Project Koba/Biro)",
    },
    {
      partner: "University Partners",
      names: ["Stellenbosch", "UCT"],
      type: "Research",
      focus: "AI/ML research and TIA co-applications",
    },
  ],
};

/** Company Structure */
export const companyStructure = {
  primary: {
    type: "South African Entity",
    status: "Planned — registration pending",
    purpose: "Local operations, ARMSCOR/IDC eligibility, non-ITAR market access",
  },
  secondary: {
    type: "Delaware C-Corp",
    status: "Planned — post-seed funding",
    purpose: "US market access, SBIR/STTR eligibility",
  },
  advantage: "Non-ITAR SA jurisdiction enables access to markets US competitors cannot easily reach",
  itarStatus: {
    current: "Not required — SA-based, non-ITAR",
    target: "US entity for DoD eligibility (post-funding)",
  },
};

/** Contact Information */
export const contact = {
  general: {
    email: "contact@nexamesh.ai",
    phone: "+27 (069) 140-6835",
    website: process.env.MARKETING_URL || "",
    linkedin: "NexaMesh Defense Systems",
  },
  inquiries: {
    investment: "investors@nexamesh.ai",
    technical: "technical@nexamesh.ai",
    partnerships: "partnerships@nexamesh.ai",
  },
};
