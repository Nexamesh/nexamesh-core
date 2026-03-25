/**
 * Simple Value Exports for MDX
 *
 * These are the canonical values that can be easily imported in MDX files.
 * For the full data structures with metadata, use the other data files.
 *
 * Usage in MDX:
 * ```mdx
 * import { MARKET, PERFORMANCE, PRICING } from "@site/src/data/values";
 *
 * Market size: {MARKET.CURRENT}
 * ```
 */

/** Market Values */
export const MARKET = {
  // Current market size (Source: MarketsandMarkets, November 2025)
  CURRENT: "$6.64B",
  CURRENT_YEAR: 2025,

  // Projected market size (Source: MarketsandMarkets, November 2025)
  PROJECTED: "$20.31B",
  PROJECTED_YEAR: 2030,

  // Growth rate (Source: MarketsandMarkets, November 2025)
  CAGR: "25.1%",
  CAGR_MIN: 25,
  CAGR_MAX: 25,

  // Related market CAGRs
  OUTDOOR_TOY_CAGR: "8.2%",
  COUNTER_DRONE_CAGR: "47%",

  // Segments (by revenue)
  MILITARY_SHARE: "48%",
  MILITARY_VALUE: "$1.2B",
  MILITARY_MARKET: "$800M",
  MILITARY_REVENUE_POTENTIAL: "$50M+",
  INFRASTRUCTURE_SHARE: "24%",
  INFRASTRUCTURE_VALUE: "$600M",
  INFRASTRUCTURE_MARKET: "$800M",
  INFRASTRUCTURE_REVENUE_POTENTIAL: "$30M+",
  COMMERCIAL_SHARE: "16%",
  COMMERCIAL_VALUE: "$400M",
  COMMERCIAL_MARKET: "$450M",
  COMMERCIAL_REVENUE_POTENTIAL: "$20M+",
  BORDER_SHARE: "12%",
  BORDER_VALUE: "$300M",

  // Regional markets
  NORTH_AMERICA_SHARE: "41-42%",
  ASIA_PACIFIC_CAGR: "25.7%",
  EUROPE_2030: "€3.2B",
  EUROPE_CAGR: "24%",
  MIDDLE_EAST_2030: "$1.8B",
  MIDDLE_EAST_CAGR: "28%",
  ASIA_PACIFIC_2030: "$3.5B",
  SOUTH_AFRICA_2030: "$120M",

  // Key events & contracts
  PENTAGON_REPLICATOR: "$500M",
  PENTAGON_TIMELINE: "August 2025",
  RAYTHEON_COYOTE: "$5.04B",
  RAYTHEON_TIMELINE: "Through 2033",
  TOTAL_CONTRACTS: "$6B+",
  EU_DEFENCE_FUND: "€8B (2021-2027)",

  // Ukraine statistics
  UKRAINE_DRONES_2024: "1M+",
  UKRAINE_CASUALTY_RATE: "15%",
  UKRAINE_MONTHLY_LOSSES: "10,000+",
  DRONE_DAMAGE_2023: "$2.3B",

  // Market gaps
  FACILITIES_UNPROTECTED: "64%",
  COMPETITOR_FALSE_POSITIVE: "15-25%",

  // Recent European incidents (Nov 2025)
  EUROPE_INCIDENTS_2025: "4x increase YoY",
  BRUSSELS_CLOSURE_NOV_2025: "Nov 4-5, 2025",
  BRUSSELS_FLIGHTS_CANCELLED: "dozens",
  DENMARK_ILLEGAL_FLIGHTS_2025: 107,
  POLAND_DRONES_SEP_2025: 23,
  POLAND_AIRPORTS_CLOSED: 4,
  GATWICK_2018_COST: "£60M",
  GATWICK_2018_PASSENGERS: "140,000+",
};

/** Performance Values */
export const PERFORMANCE = {
  // Response time
  RESPONSE_TIME: "120-195ms",
  RESPONSE_TIME_MIN: 120,
  RESPONSE_TIME_MAX: 195,
  VS_COMPETITORS: "10-150x faster",
  COMPETITOR_RANGE: "5,000-30,000ms",
  COMPETITOR_RESPONSE_TIME: "2-5 seconds",

  // Detection
  DETECTION_LATENCY: "50ms",
  AUTH_LATENCY: "2ms",

  // Accuracy
  ACCURACY: "99.5%",
  YOLOV9_MAP: "95.7%",
  YOLOV9_PRECISION: "0.946",
  YOLOV9_RECALL: "0.864",
  FALSE_POSITIVE: "<0.3%",

  // Range
  DETECTION_RANGE: "0.5-2 km",
  DETECTION_RANGE_EXTENDED: "2-5 km",

  // Other
  CONCURRENT_TARGETS: "10+",
  AVAILABILITY: "99.9%",
  AUTONOMY_LEVEL: "SAE Level 4",
};

/**
 * Pricing Values
 *
 * DEPLOYMENT PACKAGE ranges — these represent complete site deployments
 * bundling multiple SKUs, not individual product prices.
 * For individual SKU prices see: apps/marketing/src/data/products.ts
 * Last reconciled: 2026-02-22 (PRD-004)
 *
 * Segment → deployment package → representative SKU bundles (from products.ts):
 *   commercial      SkyWatch Pro ($250-$600) + NetSnare Pro ($1,200-$2,000)
 *                   per node; 2-node redundant site ≈ $2,900-$5,200 hardware.
 *   infrastructure  SkyWatch Enterprise ($5K-$20K) + AeroNet Command license
 *                   ($25K-$50K); per-facility total $30K-$70K.
 *   military        RKV-G Ground Station ($100K-$150K) + RKV-M Mothership
 *                   ($65K-$85K); minimum 1-GCS+1-aerial unit $165K-$235K.
 */
export const PRICING = {
  // Deployment-package hardware ranges by market segment
  // (NOT individual SKU prices — see products.ts for per-SKU pricing)
  SYSTEM_RANGE: "$2K-$235K", // Full span: commercial node through military system
  MILITARY_RANGE: "$165K-$235K", // RKV-G + RKV-M minimum deployable unit
  INFRASTRUCTURE_RANGE: "$30K-$70K", // SkyWatch Enterprise + AeroNet Command per facility
  COMMERCIAL_RANGE: "$2K-$5K", // SkyWatch Pro + NetSnare Pro per site node

  // Cost savings
  COST_SAVINGS: "60%",
  INHOUSE_COST_ZAR: "R850,000",
  INHOUSE_COST_USD: "$56,000", // Proxy; nearest SKU: AeroNet Enterprise COGS $59,200 (5.7% variance)

  // Margins
  GROSS_MARGIN: "65%",
  EBITDA_TARGET: "25%",

  // Funding (reality-aligned March 2026)
  SEED_ROUND: "$50K-$150K (grants + accelerators)",
  SERIES_A: "TBD — requires working prototype + revenue",
  EXIT_VALUATION: "TBD — long-term vision",
};

/**
 * Revenue Projections
 *
 * REALITY CHECK (March 2026): Pre-revenue. All figures below are
 * VISION SCENARIO projections contingent on securing funding and
 * building a working hardware prototype. Do not present as commitments.
 */
export const REVENUE = {
  // Current reality
  CURRENT_REVENUE: "$0 (pre-revenue, bootstrapped R&D)",
  CURRENT_STATUS: "Pre-revenue",

  // Vision scenario (if funded and prototype succeeds)
  YEAR_1: "R0-R500K (pilot revenue from first deployments)",
  YEAR_1_SYSTEMS: 1, // Realistic: 1 pilot system
  YEAR_2: "R5M-R10M",
  YEAR_2_SYSTEMS: 5,
  YEAR_3: "R25M-R50M",
  YEAR_3_SYSTEMS: 20,
  YEAR_5: "R100M-R200M",
  YEAR_5_SYSTEMS: 100,
};

/** Blockchain Values */
export const BLOCKCHAIN = {
  PRIMARY_CHAIN: "Solana",
  // Legacy field for backward compatibility
  TPS: "~107,000 (noop peak), ≈1,000 sustained",
  // Peak theoretical performance (noop/test transactions)
  TPS_PEAK: "~107,000 (noop peak)",
  // Sustained real-world throughput
  TPS_SUSTAINED: "≈1,000",
  TPS_MIN: 1000, // Sustained minimum
  TPS_MAX: 107000, // Peak maximum
  // Post-Alpenglow upgrade finality target
  FINALITY: "100–150ms (median, post-Alpenglow target)",
  FINALITY_SUB: "sub-2-second",
  // Transaction cost with priority fee variability
  COST_PER_TX: "~0.000005 SOL (~$0.0005) with variability for priority fees",
  ANNUAL_COST: "$157.68", // Updated for new cost: 0.000005 SOL * 31,536,000 tx/year * $100/SOL
  ANNUAL_COST_CONTEXT: "for continuous logging (1 TPS)",
  HASH_ALGORITHM: "SHA-256",
  SIGNATURE_ALGORITHM: "Ed25519",
  SECURITY_BITS: "256-bit",
  ETHEREUM_COST: "$5-50+",
  POLYGON_COST: "$0.01",
  HEDERA_COST: "$0.0001",
  X402_STATUS: "Live",
  X402_PRICE: "$0.01-0.05",
};

/** Hardware Values */
export const HARDWARE = {
  COMPUTE_PLATFORM: "NVIDIA Jetson AGX Orin",
  COMPUTE_TOPS: "275 TOPS",
  MEMORY: "64GB",
  MEMORY_BANDWIDTH: "204.8 GB/s",
  CUDA_CORES: "2048",
  TENSOR_CORES: "64",
  MIL_SPEC: "MIL-STD-810H",
  IP_RATING: "IP67",
  TEMP_RANGE: "-40°C to +70°C",
  TEMP_RANGE_INDUSTRIAL: "-40°C to +85°C",
  POWER_TYPICAL: "60W",
  POWER_PEAK: "100W",
  POWER_AVG: "150-250W",

  // Orin NX
  ORIN_NX_TOPS: "100 TOPS",
  ORIN_NX_CUDA: "1024",
  ORIN_NX_MEMORY: "16GB LPDDR5",
  ORIN_NX_POWER: "30W typical, 50W peak",

  // Nano
  NANO_TOPS: "0.5 TOPS",
  NANO_CUDA: "128",
  NANO_MEMORY: "4GB LPDDR4",
  NANO_POWER: "7W typical, 15W peak",

  // Sensors
  CAMERA_COUNT: "Up to 8 (16 via virtual channels)",
  CAMERA_RESOLUTION: "1080p-4K",
  LIDAR_MEASUREMENTS: "1,000,000/second",
  RF_FREQUENCY_RANGE: "100MHz-6GHz",
  ACOUSTIC_RANGE: "200-500m",

  // Net launcher
  NET_MATERIAL: "Kevlar",
  NET_STATUS: "Design complete",
};

/** Team Values */
export const TEAM = {
  // Core Team — Active Founders
  CTO_NAME: "Jurie Smit",
  CTO_FULL_NAME: "Hans Jurgens (Jurie) Smit",
  CTO_TITLE: "Co-Founder & CTO",
  CTO_LINKEDIN: "https://www.linkedin.com/in/juriesmit/",
  CTO_BACKGROUND:
    "Systems Engineer & AI Architect, 15+ years fintech, citizen platforms, multi-tenant SaaS. Built entire NexaMesh software platform.",
  CTO_EDUCATION:
    "B.Eng Industrial-Electronic (Stellenbosch), B.Com Quantitative Management (UNISA)",
  CTO_EXPERTISE: [
    "Edge AI/ML",
    "System Architecture",
    "Full-Stack Development",
    "Blockchain",
  ],

  HARDWARE_LEAD_NAME: "Charl Chapman",
  HARDWARE_LEAD_FULL_NAME: "Charl Chapman",
  HARDWARE_LEAD_TITLE: "Co-Founder & Hardware Lead",
  HARDWARE_LEAD_LINKEDIN: "", // TODO: Create LinkedIn profile
  HARDWARE_LEAD_BACKGROUND:
    "Mechanical & electrical diagnostics specialist. Hands-on fabrication, vehicle systems, component integration. Building hardware prototypes from low-cost and salvaged components.",
  HARDWARE_LEAD_EDUCATION: "Vehicle Systems & Electrical Repair (Practical/Trade)",
  HARDWARE_LEAD_EXPERTISE: [
    "Hardware Prototyping",
    "Mechanical Systems",
    "Electrical Diagnostics",
    "Component Integration",
  ],

  // Advisors (not full-time — engaged as needed)
  // Note: CEO_* fields kept for MDX backward compatibility; Martyn is now Advisor
  CEO_NAME: "Martyn Redelinghuys",
  CEO_FULL_NAME: "Martyn Redelinghuys",
  CEO_TITLE: "Advisor — Business Strategy & Manufacturing",
  CEO_LINKEDIN: "https://www.linkedin.com/in/martynrede/",
  CEO_BACKGROUND:
    "20+ years energy, mining, defense. R500M+ portfolio management. Has manufacturing facility. Will engage actively when funding secured.",
  CEO_EDUCATION: "MBA (GIBS), B.Eng Electrical & Electronic (Stellenbosch)",
  CEO_EXPERTISE: [
    "Project Management",
    "Manufacturing",
    "Business Development",
    "Capital Projects",
  ],
  CEO_CERTIFICATIONS: [
    "Certified Energy Manager (CEM)",
    "Certified Measurement & Verification Professional (CMVP)",
  ],

  // MEMBER_3 — Pieter moved to advisor role
  MEMBER_3_NAME: "Pieter La Grange",
  MEMBER_3_TITLE: "Advisor — Embedded Systems & Industry Connections",
  MEMBER_3_LINKEDIN: "https://www.linkedin.com/in/pieterlagrange/",
  MEMBER_3_BACKGROUND:
    "Electronics Design Engineer at Snuza, 15+ years embedded systems & medical devices. Advisory capacity for embedded guidance and industry introductions.",
  MEMBER_3_EDUCATION: "B.Eng Electrical & Electronics (Stellenbosch)",
  MEMBER_3_EXPERTISE: [
    "Embedded Firmware",
    "Hardware Design",
    "Low-Power ARM",
    "BLE/WiFi",
    "RTOS",
  ],

  // MEMBER_4 — Eben moved to advisor role
  MEMBER_4_NAME: "Eben Maré",
  MEMBER_4_TITLE: "Advisor — Financial Strategy",
  MEMBER_4_LINKEDIN: "https://www.linkedin.com/in/ebenmare/",
  MEMBER_4_BACKGROUND:
    "15+ years investment banking, private equity, quantitative finance. Former Head Quant at Deloitte. Available for financial modeling and investor discussions.",
  MEMBER_4_EDUCATION:
    "BSc (Hons) Operations Research (UNISA), BSc Applied Mathematics (University of Pretoria)",
  MEMBER_4_EXPERTISE: [
    "Private Equity",
    "Investment Management",
    "Quantitative Modeling",
    "Algorithmic Trading",
    "Derivatives",
  ],

  // Team Stats
  COMBINED_EXPERIENCE: "25+ years",
  TEAM_SIZE: 2, // Active founders
  ADVISOR_COUNT: 3,

  // Company Structure
  COMPANY_STRUCTURE: "South African Entity (planned — registration pending)",
  SECONDARY_ENTITY: "Delaware C-Corp (planned — post-seed funding)",

  // Contact (role-based, not personal PII)
  CONTACT_EMAIL: "contact@nexamesh.com",
  CONTACT_PHONE: "+27 (069) 140-6835",
  INVESTOR_EMAIL: "investors@nexamesh.com",
  SUPPORT_EMAIL: "support@nexamesh.com",
  ENTERPRISE_EMAIL: "enterprise@aeronet-security.com",
  CONSUMER_EMAIL: "hello@skysnare.com",
};

/** Roadmap Values (Reality-aligned March 2026) */
export const ROADMAP = {
  CURRENT_WEEK: "Week 13",
  CURRENT_YEAR: 2026,

  // Q1 2026 (NOW)
  Q1_2026: "Detection demo video, NexaMesh brand launch, MS Founders Hub application",

  // Q2 2026
  Q2_2026: "Hardware prototype v0.1, TIA/accelerator applications, Europe market research",

  // Q3 2026
  Q3_2026: "Field test with prototype, grant decisions, first EU partner conversations",

  // Q4 2026
  Q4_2026: "First customer LOI or paid pilot (EU target), seed round close",

  // Milestones
  SEED_RUNWAY: "12 months (if funded)",
  PILOT_TARGET: 1, // Honest: 1 pilot is the near-term goal
  ENTERPRISE_TARGET: 3, // 3 enterprise conversations, not deployments
};

/** Competitor Values */
export const COMPETITORS = {
  // Response times
  DRONESHIELD_RESPONSE: ">5,000ms",
  DEDRONE_RESPONSE: ">10,000ms",
  ANDURIL_RESPONSE: "2-5 seconds",
  RAFAEL_RESPONSE: ">10,000ms",
  FORTEM_RESPONSE: "2-5 seconds",
  AARONIA_RESPONSE: "1-3 seconds",

  // Pricing
  DRONESHIELD_PRICE: "$1.2M+",
  DRONESHIELD_VALUATION: "$500M+",
  DEDRONE_PRICE: "$1.5M+",
  FORTEM_PRICE: "$800K-1.2M",
  ANDURIL_PRICE: "$100K-$500K",

  // Accuracy
  ANDURIL_ACCURACY: "95%",
  FORTEM_ACCURACY: "90%",
  DRONESHIELD_ACCURACY: "85%",
  AARONIA_ACCURACY: "80%",
  FORTEM_CAPTURE_RATE: "85%",

  // Valuations & funding
  ANDURIL_VALUATION: "$28B",
  ANDURIL_SERIES_G: "$2.5B",
  ANDURIL_EMPLOYEES: "2,500+",
  ANDURIL_REVENUE: "$1B+",
  ANDURIL_MARKET_SHARE: "~15%",

  FORTEM_VALUATION: "$1.2B",
  FORTEM_EMPLOYEES: "500+",
  FORTEM_REVENUE: "$200M+",
  FORTEM_MARKET_SHARE: "~12%",

  DRONESHIELD_EMPLOYEES: "200+",
  DRONESHIELD_REVENUE: "$50M+",
  DRONESHIELD_DEPLOYED: "4,000+",
  DRONESHIELD_MARKET_SHARE: "~8%",

  UNIQUE_FEATURES: [
    "Blockchain evidence (only us)",
    "True offline capability",
    "Pre-hardware revenue (x402)",
    "Non-ITAR jurisdiction",
  ],
};

/** Canada CUAS Sandbox */
export const CUAS_SANDBOX = {
  EVENT_DATES: "September 14 - October 9, 2026",
  APPLICATION_DEADLINE: "December 15, 2025, 2:00 PM ET",
  PRIZE_POOL: "$1.75 million CAD",
  PERIMETER_RADIUS: "2.5 km",
  BORDER_COVERAGE: "10 km",
  MIN_TRL: "TRL 5",
};

/**
 * NexaMesh Kestrel — Consumer Detection & Training (formerly SkySnare)
 * Status: CONCEPT — no prototype, no production. Pricing is target, not confirmed.
 */
export const SKYSNARE = {
  PRODUCT_NAME: "NexaMesh Kestrel",
  STATUS: "Concept — design phase",
  MSRP: "$349 (target)",
  TARGET_MARKET: "$3.22B outdoor sports toy market",
  TAM: "$1.68B",
  YEAR_1_UNITS: 0, // Reality: no units until prototype exists
  RETURN_RATE: "TBD",
  COGS: "$135 (estimated)",
  CONTRIBUTION_MARGIN: "59% (target)",
  CAC: "$80-100 (estimated)",
};

/**
 * NexaMesh Sentinel — Enterprise Infrastructure Security (formerly AeroNet)
 * Status: SOFTWARE PLATFORM BUILT — hardware integration pending.
 */
export const AERONET = {
  PRODUCT_NAME: "NexaMesh Sentinel",
  STATUS: "Software platform operational, hardware integration pending",
  SETUP_FEE: "$150K (target)",
  MONTHLY_FEE: "$25K/month (target)",
  TAM: "$4.2B",
};

/** Technology/Technical Values */
export const TECH = {
  // AI/ML
  AI_MODEL: "YOLOv9",
  MODEL_SIZE: "<50MB",
  TENSORRT_SPEEDUP: "5-10x",
  FRAME_RATE: "30-60 FPS",

  // Network
  MESH_THROUGHPUT: "100+ Mbps",
  MESH_RANGE: "50+ km",
  COORDINATION_LATENCY: "sub-100ms",
  JAMMING_RANGE: "15km",

  // Sensors
  SENSOR_TYPES: "RF, radar, EO/IR, acoustic, LiDAR",
  SENSOR_COUNT: 6,
};

/**
 * Funding Values
 *
 * REALITY CHECK (March 2026):
 * - Current funding: $0 (bootstrapped founder R&D)
 * - Current burn rate: $0 (no salaries, no office)
 * - Current TRL: 1-2 (concept + working software platform, no hardware prototype)
 * - "Fully-funded scenario" values are kept for reference but clearly labeled
 */
export const FUNDING = {
  // Current reality
  CURRENT_FUNDING: "$0 (bootstrapped)",
  INVESTMENT_TO_DATE: "9+ months founder R&D (sweat equity)",
  CURRENT_TRL: "TRL 1-2 (software platform built, hardware pre-prototype)",

  // Immediate funding targets (realistic)
  SEED_ROUND: "$50K-$150K (grants + accelerators)",
  SERIES_A_TARGET: "TBD — requires working prototype + EU pilot revenue",
  BURN_RATE: "$0 (bootstrapped — no salaries, no office)",
  RUNWAY: "Indefinite at current burn (founder time only)",

  // Phased investment path (fully-funded scenario — aspirational)
  PHASE_1_CONCEPT: "$50K-$150K",
  PHASE_1_DURATION: "6-12 months",
  PHASE_1_TRL: "TRL 2-3",
  PHASE_2_PROTOTYPE: "$500K-$1M",
  PHASE_2_DURATION: "12 months",
  PHASE_2_TRL: "TRL 3-5",
  PHASE_3_INTEGRATION: "$3M-$5M",
  PHASE_3_DURATION: "12-18 months",
  PHASE_3_TRL: "TRL 5-7",
  TOTAL_TO_TRL7: "$4M-$6M (realistic path)",
  TOTAL_TIMELINE: "~3 years from first funding",

  // Use of immediate funds (pre-seed/seed)
  HARDWARE_PROTOTYPING: "50%",
  MARKET_ENTRY: "20%",
  TEAM_EXPANSION: "30%",

  // Revenue projections — VISION SCENARIO (contingent on funding + prototype)
  REVENUE_2026: "$0 (pre-revenue)",
  REVENUE_2027: "$100K-$500K (first EU pilots)",
  REVENUE_2028: "$1M-$5M (if prototype proven)",
  REVENUE_2029: "$5M-$15M (scaling)",
  REVENUE_2030: "$15M-$50M (established)",

  // Business model projections — VISION SCENARIO
  BM_YEAR_1_REVENUE: "$0 (building prototype)",
  BM_YEAR_2_REVENUE: "$100K-$500K",
  BM_YEAR_3_REVENUE: "$1M-$5M",
  BM_YEAR_4_REVENUE: "$5M-$15M",
  BM_YEAR_5_REVENUE: "$15M-$50M",

  // System deployment targets — VISION SCENARIO
  YEAR_1_SYSTEMS: 0,
  YEAR_2_SYSTEMS: 1,
  YEAR_3_SYSTEMS: 5,
  YEAR_4_SYSTEMS: 15,
  YEAR_5_SYSTEMS: 50,
  PILOT_INSTALLATIONS: 1, // Near-term target: 1 EU pilot
  X402_CUSTOMERS: 0, // Pre-revenue

  // Funding sources — realistic path
  PHASE_1_ANGEL: "$0 (grants + accelerators first)",
  PHASE_1_VC: "$0 (too early for VC)",
  PHASE_1_SBIR: "N/A (requires US entity)",
  PHASE_2_SERIES_A: "$3M-$5M (after prototype + pilot)",
  PHASE_2_DOD: "N/A (requires certifications)",
  PHASE_2_STRATEGIC: "$1M-$3M (EU defense partners)",
  PHASE_3_SERIES_B: "$10M-$15M (after revenue)",
  PHASE_3_PRODUCTION: "$2M-$3M",
  PHASE_3_INTERNATIONAL: "$1M-$3M",

  // IOC per site (reference pricing — aspirational)
  IOC_PER_SITE: "$3M",
  IOC_HARDWARE: "$2M",
  IOC_INSTALLATION: "$500K",
  IOC_TRAINING: "$200K",
  IOC_SUPPORT_YEAR1: "$300K",

  // Blockchain implementation (already built — actual cost was founder time)
  BLOCKCHAIN_IMPLEMENTATION: "Built (founder sweat equity)",
  BLOCKCHAIN_IMPLEMENTATION_DURATION: "6 months (completed)",
  BLOCKCHAIN_EXPECTED_ROI: "TBD — dependent on enterprise adoption",
  BLOCKCHAIN_ROI_TIMELINE: "24+ months from first enterprise customer",
};

/** RKV-M Interceptor Specs */
export const RKV_M = {
  MAX_SPEED: ">150 km/h",
  HOVER_ENDURANCE: "8-12 minutes",
  CRUISE_ENDURANCE: "15-20 minutes",
  OPERATING_ALTITUDE: "0-500m AGL",
  MAX_ALTITUDE: "1,000m AGL",
  TIME_TO_LAUNCH: "<3 seconds",
  INTERCEPT_RANGE: "500m",
  CLOSURE_RATE: ">200 km/h",
  YAW_RATE: "±60°/s",
  DUCT_DIAMETER: "0.60m (600mm)",
  TIP_GAP: "10mm",
  BLADE_COUNT: 3,
  TIP_SPEED: "≤120 m/s",
  ASSEMBLY_TIME: "3.5 hours",
  MOTOR_CONFIG: "16-20S HV outrunner",
  TRL: 1, // Concept stage — design specs only, no prototype
};

/** Manufacturing Values */
export const MANUFACTURING = {
  // Investment - Primary Facility
  FACILITY_SETUP: "R50M ($3.3M)",
  EQUIPMENT_TOOLING: "R30M ($2M)",
  WORKING_CAPITAL: "R20M ($1.3M)",
  TOTAL_INVESTMENT: "R100M ($6.6M)",

  // Investment - Secondary Facilities
  CAPE_TOWN_INVESTMENT: "R20M ($1.3M)",
  JOHANNESBURG_INVESTMENT: "R30M ($2M)",

  // Production targets
  YEAR_1_SYSTEMS: 10,
  YEAR_2_SYSTEMS: 50,
  YEAR_3_SYSTEMS: 200,
  YEAR_4_SYSTEMS: "500+",

  // Costs
  INHOUSE_COST: "R850,000",
  OUTSOURCED_COST: "R1,400,000",
  COST_REDUCTION: "40%",
  MARGIN_IMPROVEMENT: "65%",

  // Payback
  PAYBACK_PERIOD: "18 months",
};

/**
 * Capital Requirements
 *
 * Two tiers: immediate (bootstrapped/grant path) and long-term vision.
 * Long-term figures retained for reference but clearly labeled.
 */
export const CAPITAL = {
  // Immediate need (pre-seed / grants)
  IMMEDIATE_NEED: "$50K-$150K",
  IMMEDIATE_PURPOSE: "Hardware prototype + first EU pilot",

  // Long-term vision (fully-funded scenario — years away)
  TOTAL_FUNDING_ZAR: "R60M-R90M ($4M-$6M)",
  TOTAL_FUNDING_USD: "$4M-$6M (to TRL 7)",

  // Allocation breakdown — immediate seed ($50K-$150K)
  PRODUCT_DEVELOPMENT: "50% — hardware prototype components",
  MANUFACTURING_SETUP: "N/A — too early",
  CERTIFICATION_TESTING: "10% — initial EU compliance research",
  SALES_MARKETING: "20% — EU market entry, conferences",
  WORKING_CAPITAL: "20% — operations, travel, tools",

  // Realistic funding sources (Europe-first strategy)
  IDC_MANUFACTURING_LOAN: "Future — requires working product",
  DTI_ARMSCOR_GRANTS: "Exploring — ARMSCOR has acknowledged C-UAS capability gap",
  STRATEGIC_INVESTOR: "Future — post-prototype",
  FOUNDERS_ANGELS: "Current — bootstrapped sweat equity",
  EXPORT_CREDIT: "Future — requires export orders",

  // Pre-seed / seed round
  SEED_ROUND: "$50K-$150K",
  SEED_RUNWAY: "12 months at minimal burn",

  // Use of pre-seed funds (percentages)
  SEED_PRODUCT_DEV: "50%",
  SEED_INVENTORY: "0%",
  SEED_MARKETING: "20%",
  SEED_INSURANCE: "0%",
  SEED_COMPLIANCE: "10%",
  SEED_OPERATIONS: "20%",

  // Specific amounts
  INVESTMENT_TO_DATE: "9+ months founder R&D (sweat equity)",
  PO_FACILITY: "N/A — no production yet",
  LIABILITY_POLICY: "N/A — pre-product",
  CONVERSION_DAYS: "N/A",
  PRODUCTION_RATE: "N/A — prototype stage",
};

/** Net Specifications */
export const NETS = {
  // Air-to-Air Interceptor Net
  AIR_TO_AIR_SIZE: "3m × 3m (9 m²)",
  AIR_TO_AIR_STOWED: "150mm × 80mm cylinder",
  AIR_TO_AIR_MESH: "50mm × 50mm",
  AIR_TO_AIR_STRENGTH: "450 kg per strand",
  AIR_TO_AIR_WEIGHT: "180g",
  AIR_TO_AIR_DEPLOYMENT: "15 m/s expansion",
  AIR_TO_AIR_TEMP_RANGE: "-40°C to +85°C",

  // Large Format Net
  LARGE_FORMAT_SIZE: "6m × 6m (36 m²)",
  LARGE_FORMAT_STRENGTH: "800 kg per strand",
  LARGE_FORMAT_TARGET_SPEED: "Up to 150 km/h",

  // Ground-Launched Net (SkySnare)
  GROUND_SIZE: "2m × 2m (4 m²)",
  GROUND_RANGE: "15-30m effective",
  GROUND_MATERIAL: "HDPE/Nylon blend",
  GROUND_MESH: "40mm × 40mm",
  GROUND_WEIGHT: "85g",
  GROUND_RELOAD_TIME: "30 seconds",

  // Net Launcher Pod
  POD_DIMENSIONS: "180mm × 100mm × 100mm",
  POD_WEIGHT: "350g",
  PODS_PER_RKV_M: 4,
  LAUNCH_VELOCITY: "25 m/s",
  EFFECTIVE_RANGE: "10-30m from target",
};

/**
 * Development Phases — Reality-aligned March 2026
 *
 * NexaMesh product tiers:
 * - NexaMesh Kestrel: Consumer detection + training (replaces SkySnare)
 * - NexaMesh Sentinel: Enterprise infrastructure security (replaces AeroNet)
 * - NexaMesh Horizon: Military/defense tier (future)
 *
 * Strategy: Europe-first. SA as R&D cost base.
 */
export const PHASES = {
  SEED: {
    id: "seed",
    name: "Pre-Seed: Prototype & Validate",
    shortName: "Pre-Seed",
    timeline: "Q1 2026 - Q4 2026",
    products: ["Detection demo", "Hardware prototype v0.1"],
    funding: "$50K-$150K (grants + accelerators)",
    trl: "TRL 1-2 → TRL 3",
    focus: "Build working detection prototype, secure first grant, EU market validation",
  },
  SERIES_A: {
    id: "series-a",
    name: "Seed: First EU Pilot",
    shortName: "Seed",
    timeline: "2027",
    products: ["NexaMesh Kestrel v1", "NexaMesh Sentinel pilot"],
    funding: "$500K-$2M",
    trl: "TRL 3-5",
    focus: "First paid EU pilot deployment, initial revenue, team expansion",
  },
  SERIES_B: {
    id: "series-b",
    name: "Series A: EU Expansion",
    shortName: "Series A",
    timeline: "2028",
    products: ["NexaMesh Sentinel production", "Ground control systems"],
    funding: "$3M-$5M",
    trl: "TRL 5-7",
    focus: "EU certification, multiple deployments, production scaling",
  },
  SERIES_C: {
    id: "series-c",
    name: "Series B: Full Platform",
    shortName: "Series B",
    timeline: "2029-2030",
    products: ["NexaMesh Horizon (military)", "Interceptor systems"],
    funding: "$10M-$15M",
    trl: "TRL 7+",
    focus: "Military tier, aerial platform, international expansion",
  },
  SCALE: {
    id: "scale",
    name: "Scale: Global Deployment",
    shortName: "Scale",
    timeline: "2030+",
    products: ["Full integrated system", "FMS programs"],
    funding: "Revenue-funded",
    trl: "TRL 8-9",
    focus: "Global deployment, defense partnerships, NATO-aligned certification",
  },
};

/** RKV System Components */
export const RKV_SYSTEM = {
  // RKV-M: Aerial VTOL Mothership
  RKV_M_NAME: "RKV-M",
  RKV_M_FULL_NAME: "Aerial VTOL Mothership",
  RKV_M_FUNCTION: "Picket, relay, and mini launch platform",
  RKV_M_PHASE: "series-c",

  // RKV-I: Interceptor Minis
  RKV_I_NAME: "RKV-I",
  RKV_I_FULL_NAME: "Interceptor Minis",
  RKV_I_FUNCTION: "Interceptor, decoy, and ISR operations",
  RKV_I_PHASE: "series-c",

  // RKV-G: Ground Control Station
  RKV_G_NAME: "RKV-G",
  RKV_G_FULL_NAME: "Ground Control Station (Rover)",
  RKV_G_FUNCTION: "Mobile ground control, mast operations, logistics",
  RKV_G_PHASE: "series-b",

  // RKV-C2: Command and Control
  RKV_C2_NAME: "RKV-C2",
  RKV_C2_FULL_NAME: "Command and Control System",
  RKV_C2_FUNCTION: "C2/data plane with strict QoS",
  RKV_C2_PHASE: "series-a",
};

/** Product Line Values - Simple exports for MDX */
export const PRODUCTS = {
  // SkyWatch Line (Detection-Only)
  SKYWATCH: {
    NANO: {
      sku: "SW-NANO-001",
      name: "SkyWatch Nano",
      bom: "$66",
      price: "$50-100",
      range: "30-50m",
    },
    STANDARD: {
      sku: "SW-STD-001",
      name: "SkyWatch Standard",
      bom: "$210",
      price: "$100-250",
      range: "50-150m",
    },
    PRO: {
      sku: "SW-PRO-001",
      name: "SkyWatch Pro",
      bom: "$495",
      price: "$250-600",
      range: "150-500m",
    },
    MOBILE: {
      sku: "SW-MOB-001",
      name: "SkyWatch Mobile",
      bom: "$371",
      price: "$200-500",
      range: "100-300m",
    },
    THERMAL_BUDGET: {
      sku: "SW-THM-001-B",
      name: "SkyWatch Thermal (Budget)",
      bom: "$468",
      price: "$400-800",
      range: "100-500m",
    },
    THERMAL_PRO: {
      sku: "SW-THM-001-P",
      name: "SkyWatch Thermal (Pro)",
      bom: "$1,370",
      price: "$1,000-1,500",
      range: "100-500m",
    },
    MARINE: {
      sku: "SW-MAR-001",
      name: "SkyWatch Marine",
      bom: "$640",
      price: "$600-2,000",
      range: "200-800m",
    },
    MESH_NODE: {
      sku: "SW-MESH-001-N",
      name: "SkyWatch Mesh (Node)",
      bom: "$158",
      price: "$150-200",
      range: "100-200m",
    },
    MESH_CENTRAL: {
      sku: "SW-MESH-001-C",
      name: "SkyWatch Mesh (Central)",
      bom: "$370",
      price: "$350-400",
      range: "N/A",
    },
    ENTERPRISE: {
      sku: "SW-ENT-001",
      name: "SkyWatch Enterprise",
      bom: "$8,300",
      price: "$5,000-20,000",
      range: "1-5km",
    },
  },
  // NetSentry Line (Countermeasures)
  NETSENTRY: {
    LITE: {
      sku: "NS-LITE-001",
      name: "NetSentry Lite",
      bom: "$210",
      price: "$150-400",
      range: "5-15m",
    },
    STANDARD: {
      sku: "NS-STD-001",
      name: "NetSentry Standard",
      bom: "$500",
      price: "$400-800",
      range: "15-30m",
    },
    PRO: {
      sku: "NS-PRO-001",
      name: "NetSentry Pro",
      bom: "$1,015",
      price: "$800-2,000",
      range: "25-50m",
    },
  },
  // Summary stats
  TOTAL_PRODUCTS: 13,
  SKYWATCH_COUNT: 10,
  NETSENTRY_COUNT: 3,
  BOM_RANGE: "$66 - $8,300",
  PRICE_RANGE: "$50 - $20,000",
  LAST_UPDATED: "2026-01-09",
};

/** All values combined for easy import */
export const ALL_VALUES = {
  MARKET,
  PERFORMANCE,
  PRICING,
  REVENUE,
  BLOCKCHAIN,
  HARDWARE,
  TEAM,
  ROADMAP,
  COMPETITORS,
  CUAS_SANDBOX,
  SKYSNARE,
  AERONET,
  TECH,
  FUNDING,
  RKV_M,
  MANUFACTURING,
  NETS,
  CAPITAL,
  PHASES,
  RKV_SYSTEM,
  PRODUCTS,
};
