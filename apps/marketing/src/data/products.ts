/**
 * Unified Product Catalog Data
 *
 * Single source of truth for all products displayed on the marketing frontend.
 * Aligned with product-catalog.md and tariffs.ts
 *
 * Shared base types (ProductLine, MarketTier, SystemType, ProductPhase) are
 * defined in @nexamesh/types and re-exported here for local use.
 */

import type {
  ProductLine,
  MarketTier,
  ProductPhase,
  BaseProduct,
} from "@nexamesh/types";

export type { ProductLine, MarketTier, ProductPhase, BaseProduct };

/** @deprecated Use {@link MarketTier} */
export type ProductCategory = MarketTier;

export interface ProductPhaseInfo {
  id: ProductPhase;
  name: string;
  shortName: string;
  timeline: string;
  funding: string;
  color: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  line: ProductLine;
  tagline: string;
  description: string;
  category: MarketTier;
  phase: ProductPhase;
  phaseTimeline: string;
  available: boolean;
  comingSoon: boolean;

  // Pricing
  priceRange: { min: number; max: number };
  priceFormatted: string;
  msrp?: number;
  monthlyFee?: number;

  // Costs (for internal use)
  cogs: number;
  margin: number;

  // Manufacturing
  assemblyHours: number;
  laborCost: number;

  // Target market
  targetMarket: string[];
  marketSegment: string;

  // Key specs (simplified for marketing)
  specs: {
    range?: string;
    speed?: string;
    power?: string;
    size?: string;
    weight?: string;
    [key: string]: string | undefined;
  };

  // Marketing
  features: string[];
  useCases: string[];
  heroImage?: string;
  gallery?: string[];

  // Links
  catalogUrl: string;
  buyUrl?: string;
  demoUrl?: string;
}

// =============================================================================
// PHASE DEFINITIONS
// =============================================================================

export const phases: Record<ProductPhase, ProductPhaseInfo> = {
  seed: {
    id: "seed",
    name: "Seed: Consumer Launch",
    shortName: "Seed",
    timeline: "Q3 2026 - Q1 2027 • Delivery Jan-Apr 2027",
    funding: "$1.5M",
    color: "#22c55e", // green
    description:
      "Consumer product launch with Kestrel Mesh, NetSnare, and NetSentry Lite",
  },
  "series-a": {
    id: "series-a",
    name: "Series A: Sentinel Ring & DoD",
    shortName: "Series A",
    timeline: "Q2 2027 - Q1 2028 • Delivery Oct 2027-Feb 2028",
    funding: "$8-12M",
    color: "#3b82f6", // blue
    description: "Enterprise platform launch and DoD validation",
  },
  "series-b": {
    id: "series-b",
    name: "Series B: Ground Systems",
    shortName: "Series B",
    timeline: "Q3-Q4 2028 • Delivery Feb 2029",
    funding: "$15-20M",
    color: "#8b5cf6", // purple
    description: "Ground control systems and production scaling",
  },
  "series-c": {
    id: "series-c",
    name: "Series C: Aerial Platform",
    shortName: "Series C",
    timeline: "Q3-Q4 2029 • Delivery Feb 2030",
    funding: "$25M+",
    color: "#f59e0b", // amber
    description: "Full aerial platform and interceptor systems",
  },
  scale: {
    id: "scale",
    name: "Scale: Global Deployment",
    shortName: "Scale",
    timeline: "2030+",
    funding: "Revenue-funded",
    color: "#ef4444", // red
    description: "Global deployment, FMS programs, NATO certification",
  },
};

// =============================================================================
// PRODUCT CATALOG
// =============================================================================

export const products: Product[] = [
  // -------------------------------------------------------------------------
  // KESTREL MESH - Consumer Line
  // -------------------------------------------------------------------------
  {
    id: "kestrel-mesh",
    sku: "SS-001",
    name: "Kestrel Mesh",
    line: "kestrel",
    tagline: "Detect. Alert. Respond.",
    description:
      "Consumer-grade edge AI sensor node. Sub-200ms detection, instant mobile alerts, and blockchain-logged evidence — with an optional net-response module for active neutralisation.",
    category: "consumer",
    phase: "seed",
    phaseTimeline: "Q4 2026 Launch • Delivery Jan 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 349, max: 349 },
    priceFormatted: "$349",
    msrp: 349,

    cogs: 148,
    margin: 0.58,
    assemblyHours: 1.04,
    laborCost: 10,

    targetMarket: [
      "Property owners",
      "Security-conscious homeowners",
      "Privacy advocates",
    ],
    marketSegment: "$6.6B consumer counter-drone market",

    specs: {
      detectionRange: "30–80m",
      latency: "<200ms",
      weight: "~1.2kg",
      power: "USB-C rechargeable, 8h standby",
      connectivity: "WiFi + BLE",
    },

    features: [
      "Edge AI inference on-device",
      "Blockchain evidence anchoring",
      "Instant push alerts",
      "Optional net-response module",
      "Weatherproof design",
    ],

    useCases: [
      "Backyard privacy protection",
      "Event security",
      "Property surveillance defense",
      "First-responder detection kit",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#kestrel-mesh",
    buyUrl: "/shop/kestrel-mesh",
    demoUrl: "/interactive-demo",
  },

  // -------------------------------------------------------------------------
  // NETSNARE - Ground-Mounted Launcher Line (pairs with SkyWatch detection)
  // -------------------------------------------------------------------------
  {
    id: "netsnare-lite",
    sku: "NSN-LITE-001",
    name: "NetSnare Lite",
    line: "netsnare",
    tagline: "Mesh Sensor + Response Node",
    description:
      "Maker-friendly mesh sensor node with integrated response module. Pairs with any SkyWatch detector for AI-triggered, automated drone neutralisation.",
    category: "diy-maker",
    phase: "seed",
    phaseTimeline: "Q4 2026 • Delivery Jan 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 200, max: 400 },
    priceFormatted: "$200-400",

    cogs: 125,
    margin: 0.38,
    assemblyHours: 1.5,
    laborCost: 14,

    targetMarket: ["Property owners", "Small businesses", "First responders"],
    marketSegment: "Entry-level automated perimeter defense",

    specs: {
      range: "10-20m launch",
      trigger: "App/API trigger",
      reload: "Manual, 30 seconds",
      net: "2m weighted",
      mount: "Ground stake or surface mount",
    },

    features: [
      "Edge AI sensor node",
      "SkyWatch API integration",
      "Mobile app trigger",
      "Open trigger API (Arduino compatible)",
      "Weather resistant",
    ],

    useCases: [
      "Property protection",
      "Garden/backyard defense",
      "Paired with SkyWatch Standard",
      "Outdoor events",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsnare-lite",
  },
  {
    id: "netsnare-standard",
    sku: "NSN-STD-001",
    name: "NetSnare Standard",
    line: "netsnare",
    tagline: "AI-Triggered Ground Sensor",
    description:
      "Smart ground sensor with AI-triggered response module. Faster intercept and extended detection range — integrates with SkyWatch for fully automated targeting.",
    category: "prosumer",
    phase: "series-a",
    phaseTimeline: "Q2 2027 • Delivery Jul 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 500, max: 800 },
    priceFormatted: "$500-800",

    cogs: 285,
    margin: 0.44,
    assemblyHours: 3.5,
    laborCost: 39,

    targetMarket: ["Property owners", "Small businesses", "Farms"],
    marketSegment: "Automated ground defense for properties",

    specs: {
      detectionRange: "100–200m",
      responseRange: "20–35m",
      trigger: "Auto from SkyWatch",
      response: "100ms",
      costPerIntercept: "$1-2",
    },

    features: [
      "AI-triggered response",
      "Auto-trigger from SkyWatch",
      "Multiple mount options",
      "Fast intercept module",
      "IP65 weatherproof",
    ],

    useCases: [
      "Farm protection",
      "Vineyard/orchard defense",
      "Small facility perimeter",
      "Event security",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsnare-standard",
  },
  {
    id: "netsnare-pro",
    sku: "NSN-PRO-001",
    name: "NetSnare Pro",
    line: "netsnare",
    tagline: "Precision AI Tracking Platform",
    description:
      "Precision sensor platform with pan-tilt tracking and AI-guided response. Fully autonomous operation when paired with SkyWatch Pro or Enterprise.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 1200, max: 2000 },
    priceFormatted: "$1,200-2,000",

    cogs: 680,
    margin: 0.44,
    assemblyHours: 8,
    laborCost: 133,

    targetMarket: [
      "Commercial facilities",
      "Critical infrastructure",
      "Security firms",
    ],
    marketSegment: "Automated perimeter defense",

    specs: {
      detectionRange: "200–500m",
      responseRange: "30–50m",
      tracking: "Pan-tilt motorized",
      response: "50ms",
      coverage: "180° arc",
    },

    features: [
      "Edge AI predictive targeting",
      "Pan-tilt tracking",
      "Multi-intercept capability",
      "Remote monitoring",
      "Autonomous operation mode",
    ],

    useCases: [
      "Perimeter defense",
      "Commercial facilities",
      "Prison security",
      "Airport perimeters",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsnare-pro",
  },

  // -------------------------------------------------------------------------
  // SKYWATCH - Detection Line
  // -------------------------------------------------------------------------
  {
    id: "skywatch-nano",
    sku: "SW-NANO-001",
    name: "SkyWatch Nano",
    line: "skywatch",
    tagline: "Entry-Level Detection",
    description:
      "Entry-level edge AI detection node. Rapid-deploy awareness for small facilities, training sites, and proof-of-concept evaluations.",
    category: "diy-maker",
    phase: "seed",
    phaseTimeline: "Q3 2026 • Delivery Oct 2026",
    available: false,
    comingSoon: true,

    priceRange: { min: 50, max: 100 },
    priceFormatted: "$50-100",

    cogs: 78,
    margin: 0.29,
    assemblyHours: 1.04,
    laborCost: 10,

    targetMarket: ["Security researchers", "System integrators", "Educational"],
    marketSegment: "Entry-level edge AI detection",

    specs: {
      range: "30-50m",
      speed: "5-10 FPS",
      power: "2-4W",
      weight: "~150g",
    },

    features: [
      "Raspberry Pi based",
      "Open-source software",
      "Easy DIY assembly",
      "WiFi connectivity",
      "Webhook alerts",
    ],

    useCases: [
      "Learning AI/ML detection",
      "Backyard awareness",
      "Maker projects",
      "Educational demos",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-nano",
  },
  {
    id: "skywatch-standard",
    sku: "SW-STD-001",
    name: "SkyWatch Standard",
    line: "skywatch",
    tagline: "Reliable Home Protection",
    description:
      "Balanced detection system for residential use with Coral TPU acceleration and low-light capability.",
    category: "prosumer",
    phase: "seed",
    phaseTimeline: "Q4 2026 • Delivery Jan 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 100, max: 250 },
    priceFormatted: "$100-250",

    cogs: 247,
    margin: 0.37,
    assemblyHours: 2.62,
    laborCost: 29,

    targetMarket: ["Homeowners", "Small property owners"],
    marketSegment: "Residential security",

    specs: {
      range: "50-150m",
      speed: "15-30 FPS",
      power: "4-10W",
      connectivity: "WiFi, Ethernet, PoE",
    },

    features: [
      "Coral TPU acceleration",
      "Low-light detection",
      "Multi-channel alerts",
      "PoE support",
      "Weatherproof",
    ],

    useCases: [
      "Home security",
      "Small property monitoring",
      "Privacy protection",
      "Pet/wildlife monitoring",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-standard",
  },
  {
    id: "skywatch-pro",
    sku: "SW-PRO-001",
    name: "SkyWatch Pro",
    line: "skywatch",
    tagline: "Professional Multi-Sensor",
    description:
      "Multi-sensor detection platform with visual, RF, and audio detection. Pan-tilt tracking for professional use.",
    category: "commercial",
    phase: "seed",
    phaseTimeline: "Q4 2026 • Delivery Jan 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 250, max: 600 },
    priceFormatted: "$250-600",

    cogs: 612,
    margin: 0.44,
    assemblyHours: 5.9,
    laborCost: 92,

    targetMarket: ["Farms", "Estates", "Commercial properties"],
    marketSegment: "Commercial security",

    specs: {
      range: "150-500m visual, 500m-2km RF",
      speed: "30+ FPS",
      power: "8-18W",
      sensors: "Visual, RF, Audio",
    },

    features: [
      "Multi-sensor fusion",
      "Pan-tilt tracking",
      "RF signal detection",
      "Audio analysis",
      "SSD storage",
    ],

    useCases: [
      "Farm perimeter security",
      "Estate protection",
      "Event venues",
      "Commercial facilities",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-pro",
  },
  {
    id: "skywatch-mobile",
    sku: "SW-MOB-001",
    name: "SkyWatch Mobile",
    line: "skywatch",
    tagline: "Detection On The Go",
    description:
      "Portable detection unit for mobile operations. Battery-powered with touchscreen interface.",
    category: "prosumer",
    phase: "series-a",
    phaseTimeline: "Q2 2027 • Delivery Jul 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 200, max: 500 },
    priceFormatted: "$200-500",

    cogs: 424,
    margin: 0.38,
    assemblyHours: 3.65,
    laborCost: 41,

    targetMarket: ["Security patrols", "Event staff", "Mobile teams"],
    marketSegment: "Mobile security",

    specs: {
      range: "100-300m",
      speed: "15-25 FPS",
      battery: "3-5 hours",
      weight: "~800g",
    },

    features: [
      '7" touchscreen',
      "3-5 hour battery",
      "Haptic alerts",
      "GPS logging",
      "Vehicle mountable",
    ],

    useCases: [
      "Security patrols",
      "Event coverage",
      "VIP protection",
      "Emergency response",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-mobile",
  },
  {
    id: "skywatch-thermal-budget",
    sku: "SW-THM-001-B",
    name: "SkyWatch Thermal (Budget)",
    line: "skywatch",
    tagline: "24/7 Detection — FLIR Lepton",
    description:
      "Entry-level thermal imaging detector. FLIR Lepton 3.5 (160×120) fused with visible camera for cost-effective all-light drone detection.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q3 2027 • Delivery Oct 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 400, max: 800 },
    priceFormatted: "$400-800",

    cogs: 468,
    margin: 0.41,
    assemblyHours: 6.0,
    laborCost: 100,

    targetMarket: ["24/7 operations", "Night security", "SMB sites"],
    marketSegment: "Professional security — budget tier",

    specs: {
      range: "100-500m thermal, 50-300m visible",
      thermalRes: "160×120",
      sensitivity: "<50mK NETD",
      sensor: "FLIR Lepton 3.5",
    },

    features: [
      "Thermal + visible fusion",
      "True 24/7 operation",
      "Temperature anomaly detection",
      "FLIR Lepton 3.5 sensor",
    ],

    useCases: [
      "Night operations",
      "All-weather security",
      "Critical infrastructure",
      "Border monitoring",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-thermal-budget",
  },
  {
    id: "skywatch-thermal-pro",
    sku: "SW-THM-001-P",
    name: "SkyWatch Thermal (Pro)",
    line: "skywatch",
    tagline: "24/7 Detection — FLIR Boson 320",
    description:
      "Professional thermal detector. FLIR Boson 320 (320×256, 60Hz) for demanding all-light surveillance at extended range.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q3 2027 • Delivery Oct 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 1000, max: 1500 },
    priceFormatted: "$1,000-1,500",

    cogs: 1080,
    margin: 0.42,
    assemblyHours: 10.0,
    laborCost: 167,

    targetMarket: ["24/7 operations", "Critical sites", "Government facilities"],
    marketSegment: "Professional security — pro tier",

    specs: {
      range: "100-500m thermal, 50-300m visible",
      thermalRes: "320×256",
      sensitivity: "<50mK NETD",
      sensor: "FLIR Boson 320, 60Hz",
    },

    features: [
      "Thermal + visible fusion",
      "True 24/7 operation",
      "320×256 high-resolution Boson",
      "60Hz frame rate",
      "Auto flat-field correction",
    ],

    useCases: [
      "Night operations",
      "All-weather security",
      "Critical infrastructure",
      "Border monitoring",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-thermal-pro",
  },
  {
    id: "skywatch-marine",
    sku: "SW-MAR-001",
    name: "SkyWatch Marine",
    line: "skywatch",
    tagline: "Maritime-Grade Detection",
    description:
      "Ruggedized detection system for maritime environments. Gyro stabilization and NMEA integration.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 600, max: 2000 },
    priceFormatted: "$600-2,000",

    cogs: 843,
    margin: 0.44,
    assemblyHours: 9.8,
    laborCost: 163,

    targetMarket: ["Vessels", "Marinas", "Coastal facilities"],
    marketSegment: "Maritime security",

    specs: {
      range: "200-800m",
      rating: "IP67",
      stabilization: "2-axis gyro",
      integration: "NMEA 0183/2000",
    },

    features: [
      "Gyro stabilization",
      "Salt-resistant IP67",
      "Chart plotter integration",
      "12V DC marine power",
    ],

    useCases: [
      "Yacht security",
      "Marina protection",
      "Port facilities",
      "Offshore platforms",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-marine",
  },
  {
    id: "skywatch-mesh-node",
    sku: "SW-MESH-001-N",
    name: "SkyWatch Mesh (Node)",
    line: "skywatch",
    tagline: "Distributed Detection Node",
    description:
      "PoE-powered mesh sensor node. Deploy multiple nodes across a wide perimeter; each node reports to the central aggregator.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 150, max: 200 },
    priceFormatted: "$150-200/node",

    cogs: 158,
    margin: 0.19,
    assemblyHours: 1.5,
    laborCost: 25,

    targetMarket: ["Large perimeters", "Farms", "Industrial sites"],
    marketSegment: "Wide-area security — per-node",

    specs: {
      range: "100-200m per node",
      power: "PoE 802.3af",
      connectivity: "Ethernet, WiFi mesh",
      coverage: "up to 100+ acres (multi-node)",
    },

    features: [
      "PoE powered",
      "Auto node discovery",
      "Mesh networking",
      "IP65 weatherproof",
      "Pole mountable",
    ],

    useCases: [
      "Farm perimeters",
      "Industrial complexes",
      "Campus security",
      "Event grounds",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-mesh-node",
  },
  {
    id: "skywatch-mesh-central",
    sku: "SW-MESH-001-C",
    name: "SkyWatch Mesh (Central)",
    line: "skywatch",
    tagline: "Mesh Aggregation Server",
    description:
      "Central aggregation server for SkyWatch Mesh deployments. Fuses detections from all nodes, runs the dashboard, and connects to SOC/VMS.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 350, max: 400 },
    priceFormatted: "$350-400",

    cogs: 228,
    margin: 0.38,
    assemblyHours: 3.0,
    laborCost: 50,

    targetMarket: ["Large perimeters", "Farms", "Industrial sites"],
    marketSegment: "Wide-area security — aggregator",

    specs: {
      storage: "256GB NVMe",
      power: "15-30W",
      connectivity: "Ethernet, WiFi",
      nodes: "Supports unlimited nodes",
    },

    features: [
      "Multi-node fusion",
      "Centralized dashboard",
      "SOC/VMS integration",
      "256GB NVMe storage",
      "Triangulation",
    ],

    useCases: [
      "Farm perimeters",
      "Industrial complexes",
      "Campus security",
      "Event grounds",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-mesh-central",
  },
  {
    id: "skywatch-enterprise",
    sku: "SW-ENT-001",
    name: "SkyWatch Enterprise",
    line: "skywatch",
    tagline: "Full-Scale C-UAS",
    description:
      "Full-scale enterprise deployment with multi-sensor integration, SOC connectivity, and compliance logging.",
    category: "enterprise",
    phase: "series-a",
    phaseTimeline: "Q1 2028 • Delivery Feb 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 5000, max: 20000 },
    priceFormatted: "$5,000-20,000",

    cogs: 11733,
    margin: 0.5,
    assemblyHours: 88,
    laborCost: 2933,

    targetMarket: ["Corporate campuses", "Critical infrastructure"],
    marketSegment: "Enterprise security",

    specs: {
      range: "1-5km multi-sensor",
      sensors: "Visual, Thermal, RF, Radar",
      uptime: "99.9% SLA",
      api: "REST, WebSocket, MQTT",
    },

    features: [
      "SIEM integration",
      "VMS integration",
      "Access control integration",
      "Compliance logging",
      "High availability",
    ],

    useCases: [
      "Data centers",
      "Corporate headquarters",
      "Government facilities",
      "Utility infrastructure",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#skywatch-enterprise",
  },

  // -------------------------------------------------------------------------
  // NETSENTRY - Countermeasure Line
  // -------------------------------------------------------------------------
  {
    id: "netsentry-lite",
    sku: "NS-LITE-001",
    name: "NetSentry Lite",
    line: "netsentry",
    tagline: "Entry-Level Detect & Respond",
    description:
      "Entry-level detect-and-respond system for testing and proof-of-concept. Validates the full AI detect-to-intercept stack at maker cost.",
    category: "diy-maker",
    phase: "seed",
    phaseTimeline: "Q1 2027 • Delivery Apr 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 150, max: 400 },
    priceFormatted: "$150-400",

    cogs: 242,
    margin: 0.29,
    assemblyHours: 2.62,
    laborCost: 24,

    targetMarket: ["System integrators", "Security teams", "Proof-of-concept buyers"],
    marketSegment: "Detect-to-intercept proof-of-concept stack",

    specs: {
      range: "5-15m launch",
      detection: "50-100m",
      reload: "Manual",
      net: "1.5m weighted",
    },

    features: [
      "Edge AI detection module",
      "DIY assembly",
      "Arduino compatible",
      "Open trigger API",
    ],

    useCases: [
      "Proof of concept",
      "Testing environments",
      "Educational demos",
      "Maker projects",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsentry-lite",
  },
  {
    id: "netsentry-standard",
    sku: "NS-STD-001",
    name: "NetSentry Standard",
    line: "netsentry",
    tagline: "AI-Triggered Response System",
    description:
      "AI-triggered detect-and-respond system with Coral TPU acceleration. Faster intercept, longer detection range, fully integrated in one unit.",
    category: "prosumer",
    phase: "series-a",
    phaseTimeline: "Q3 2027 • Delivery Oct 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 400, max: 800 },
    priceFormatted: "$400-800",

    cogs: 579,
    margin: 0.38,
    assemblyHours: 5.27,
    laborCost: 59,

    targetMarket: ["Property protection", "Small businesses"],
    marketSegment: "Property security",

    specs: {
      detectionRange: "100–200m",
      responseRange: "15–30m",
      response: "50ms",
      costPerIntercept: "$1-2",
    },

    features: [
      "Coral TPU edge inference",
      "AI-triggered response",
      "Fast 50ms intercept",
      "Weatherproof",
    ],

    useCases: [
      "Property protection",
      "Small facility security",
      "Outdoor events",
      "Agricultural protection",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsentry-standard",
  },
  {
    id: "netsentry-pro",
    sku: "NS-PRO-001",
    name: "NetSentry Pro",
    line: "netsentry",
    tagline: "Professional AI Intercept",
    description:
      "Professional AI detect-and-respond platform with pan-tilt tracking, global shutter camera, and predictive targeting for high-value facilities.",
    category: "commercial",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 800, max: 2000 },
    priceFormatted: "$800-2,000",

    cogs: 1248,
    margin: 0.44,
    assemblyHours: 11,
    laborCost: 183,

    targetMarket: ["Security professionals", "Commercial facilities"],
    marketSegment: "Professional security",

    specs: {
      range: "25-50m launch",
      detection: "200-500m",
      tracking: "Pan-tilt motorized",
      camera: "Global shutter 60fps",
    },

    features: [
      "Edge AI predictive targeting",
      "Pan-tilt tracking",
      "Global shutter camera 60fps",
      "Autonomous intercept mode",
      "Multi-shot capability",
    ],

    useCases: [
      "Facility protection",
      "Event security",
      "Critical infrastructure",
      "VIP venues",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#netsentry-pro",
  },

  // -------------------------------------------------------------------------
  // SENTINEL RING - Enterprise Platform
  // -------------------------------------------------------------------------
  {
    id: "sentinel-ring-enterprise",
    sku: "AN-ENT-001",
    name: "Sentinel Ring Enterprise",
    line: "sentinel-ring",
    tagline: "Complete C-UAS Platform",
    description:
      "Full-scale enterprise drone detection and response platform with multi-sensor integration and 24/7 operations.",
    category: "enterprise",
    phase: "series-a",
    phaseTimeline: "Q4 2027 • Delivery Jan 2028",
    available: false,
    comingSoon: true,

    priceRange: { min: 150000, max: 150000 },
    priceFormatted: "$150K setup",
    msrp: 150000,
    monthlyFee: 25000,

    cogs: 59200,
    margin: 0.61,
    assemblyHours: 216,
    laborCost: 7200,

    targetMarket: [
      "Critical infrastructure",
      "Airports",
      "Prisons",
      "Military bases",
    ],
    marketSegment: "$4.2B enterprise C-UAS market",

    specs: {
      range: "2-5km",
      coverage: "Up to 10 km²",
      accuracy: "99.5%",
      falsePositive: "<0.3%",
      uptime: "99.9% SLA",
    },

    features: [
      "Multi-sensor fusion",
      "SIEM/VMS integration",
      "SOC connectivity",
      "Compliance logging",
      "24/7 support",
      "Custom integrations",
    ],

    useCases: [
      "Airport protection",
      "Prison security",
      "Power plant defense",
      "Data center protection",
      "Government facilities",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#sentinel-ring-enterprise",
    demoUrl: "/schedule",
  },
  {
    id: "sentinel-ring-command",
    sku: "AN-CMD-001",
    name: "Sentinel Ring Command",
    line: "sentinel-ring",
    tagline: "Command & Control Software",
    description:
      "Centralized command and control software for multi-site drone defense coordination. Includes threat simulator for operator training.",
    category: "enterprise",
    phase: "series-a",
    phaseTimeline: "Q3 2027 • Delivery Oct 2027",
    available: false,
    comingSoon: true,

    priceRange: { min: 25000, max: 50000 },
    priceFormatted: "$25K-50K license",
    msrp: 35000,
    monthlyFee: 2500,

    cogs: 8500,
    margin: 0.65,
    assemblyHours: 40, // Software deployment/config
    laborCost: 2400,

    targetMarket: [
      "Enterprise security teams",
      "Multi-site operators",
      "SOC teams",
    ],
    marketSegment: "C2/Software for Sentinel Ring deployments",

    specs: {
      deployment: "Cloud or on-premise",
      sites: "Unlimited sites per license",
      users: "Unlimited operators",
      api: "REST, WebSocket, MQTT",
      uptime: "99.9% SLA",
    },

    features: [
      "Multi-site dashboard",
      "Real-time threat visualization",
      "Operator training simulator",
      "Incident response playbooks",
      "Compliance reporting",
      "SIEM/VMS integration",
      "Mobile command app",
    ],

    useCases: [
      "Multi-site coordination",
      "SOC integration",
      "Operator training",
      "Incident response",
      "Compliance auditing",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#sentinel-ring-command",
    demoUrl: "/interactive-demo",
  },

  // -------------------------------------------------------------------------
  // RKV - Military Systems
  // -------------------------------------------------------------------------
  {
    id: "rkv-m",
    sku: "RKV-M-001",
    name: "RKV-M Mothership",
    line: "rkv",
    tagline: "Aerial Intercept Platform",
    description:
      "Aerial VTOL platform serving as picket, relay, and interceptor launch platform with ducted fan design.",
    category: "military",
    phase: "series-c",
    phaseTimeline: "Q4 2029 • Delivery Feb 2030",
    available: false,
    comingSoon: true,

    priceRange: { min: 65000, max: 85000 },
    priceFormatted: "$65,000-85,000",

    cogs: 29736,
    margin: 0.55,
    assemblyHours: 83.2,
    laborCost: 3236,

    targetMarket: ["Military", "Critical infrastructure"],
    marketSegment: "Defense sector",

    specs: {
      speed: ">150 km/h",
      endurance: "8-12 min hover, 15-20 min cruise",
      altitude: "0-1000m AGL",
      payload: "4× net pods",
      trl: "TRL 7",
    },

    features: [
      "Ducted fan VTOL",
      "4× net launcher pods",
      "Mesh communication",
      "Autonomous intercept",
      "Safe urban operation",
    ],

    useCases: [
      "Forward air defense",
      "VIP protection",
      "Critical event security",
      "Border patrol",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#rkv-m-mothership",
  },
  {
    id: "rkv-i",
    sku: "RKV-I-001",
    name: "RKV-I Interceptor",
    line: "rkv",
    tagline: "Expendable Interceptor",
    description:
      "Expendable/recoverable mini interceptor drone launched from RKV-M or ground station.",
    category: "military",
    phase: "series-c",
    phaseTimeline: "Q4 2029 • Delivery Feb 2030",
    available: false,
    comingSoon: true,

    priceRange: { min: 8000, max: 12000 },
    priceFormatted: "$8,000-12,000",

    cogs: 4338,
    margin: 0.55,
    assemblyHours: 16.4,
    laborCost: 638,

    targetMarket: ["Military", "Paired with RKV-M"],
    marketSegment: "Defense sector",

    specs: {
      speed: ">180 km/h",
      endurance: "3-5 minutes",
      range: "500m from launcher",
      payload: "3m × 3m net",
      reusability: "5-10 missions",
    },

    features: [
      "Visual + RF homing",
      "Parachute recovery",
      "Locator beacon",
      "Quick reload",
    ],

    useCases: [
      "Swarm defense",
      "High-speed intercept",
      "Multi-target engagement",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#rkv-i-interceptor",
  },
  {
    id: "rkv-g",
    sku: "RKV-G-001",
    name: "RKV-G Ground Station",
    line: "rkv",
    tagline: "Mobile Command & Control",
    description:
      "Mobile ground control station and rover platform for RKV-M and RKV-I command and control.",
    category: "military",
    phase: "series-b",
    phaseTimeline: "Q4 2028 • Delivery Feb 2029",
    available: false,
    comingSoon: true,

    priceRange: { min: 100000, max: 150000 },
    priceFormatted: "$100,000-150,000",

    cogs: 52478,
    margin: 0.55,
    assemblyHours: 128,
    laborCost: 4978,

    targetMarket: ["Military", "Mobile operations"],
    marketSegment: "Defense sector",

    specs: {
      platform: "4×4 vehicle/trailer",
      mast: "10-15m telescoping",
      detectionRange: "5-10 km",
      controlRange: "2 km RKV-M, 500m RKV-I",
      crew: "2-3 operators",
    },

    features: [
      "Mast-mounted sensors",
      "Radar + EO/IR + RF",
      "Generator + battery backup",
      "24+ hour operation",
      "<30 min setup",
    ],

    useCases: [
      "Forward operating base",
      "Mobile air defense",
      "Event security command",
      "Disaster response",
    ],

    catalogUrl: "/docs/technical/detector/product-catalog#rkv-g-ground-station",
  },

  // ===========================================================================
  // MARKET SEGMENT BUNDLES
  // ===========================================================================

  // MKT-002: Mid-market bundle ($5K-$30K) — fills gap between prosumer/enterprise
  {
    id: "sentinel-ring-patrol",
    sku: "AN-PATROL-001",
    name: "Sentinel Ring Patrol",
    line: "sentinel-ring" as ProductLine,
    tagline: "Mid-market perimeter defense for facilities and campuses",
    description:
      "Complete perimeter monitoring bundle combining SkyWatch detection with " +
      "NetSentry countermeasures. Designed for facilities that need professional " +
      "C-UAS capability without enterprise-scale infrastructure. Includes 4x " +
      "SkyWatch Pro sensors, 2x NetSentry Standard, central monitoring dashboard, " +
      "and 12 months of firmware updates.",
    category: "commercial" as MarketTier,
    phase: "series-a" as ProductPhase,
    phaseTimeline: "Q3 2027",
    available: false,
    comingSoon: true,
    priceRange: { min: 12000, max: 28000 },
    priceFormatted: "$12,000 – $28,000",
    msrp: 18000,
    monthlyFee: 299,
    cogs: 6200,
    margin: 0.66,
    assemblyHours: 16,
    laborCost: 800,
    targetMarket: [
      "Corporate campuses",
      "Warehouses",
      "Schools and universities",
      "Private estates",
      "Small airports",
    ],
    marketSegment: "Mid-market facility security",
    specs: {
      range: "800m detection radius",
      sensors: "4x SkyWatch Pro + 2x NetSentry Standard",
      monitoring: "Centralized web dashboard",
      power: "PoE / solar hybrid",
    },
    features: [
      "Turnkey installation in 1-2 days",
      "4x SkyWatch Pro detection sensors",
      "2x NetSentry Standard countermeasures",
      "Central monitoring dashboard",
      "12-month firmware subscription",
      "Phone and email support",
    ],
    useCases: [
      "Corporate campus protection",
      "Warehouse perimeter security",
      "School safety",
      "Private estate defense",
    ],
    catalogUrl: "/products#sentinel-ring-patrol",
  },

  // MKT-003: Law enforcement vertical — blockchain evidence is key differentiator
  {
    id: "sentinel-ring-leo",
    sku: "AN-LEO-001",
    name: "Sentinel Ring LEO",
    line: "sentinel-ring" as ProductLine,
    tagline: "Law enforcement C-UAS with blockchain evidence chain",
    description:
      "Purpose-built for law enforcement agencies requiring court-admissible " +
      "drone interception evidence. Blockchain-anchored evidence chain provides " +
      "tamper-proof audit trail from detection through countermeasure deployment. " +
      "Includes SkyWatch detection array, NetSentry countermeasures, evidence " +
      "CLI for forensic export, and integration with common RMS platforms.",
    category: "enterprise" as MarketTier,
    phase: "series-a" as ProductPhase,
    phaseTimeline: "Q4 2027",
    available: false,
    comingSoon: true,
    priceRange: { min: 45000, max: 95000 },
    priceFormatted: "$45,000 – $95,000",
    msrp: 65000,
    monthlyFee: 599,
    cogs: 22000,
    margin: 0.66,
    assemblyHours: 40,
    laborCost: 2000,
    targetMarket: [
      "Municipal police departments",
      "County sheriffs",
      "State police agencies",
      "Federal law enforcement",
      "Border security units",
    ],
    marketSegment: "Law enforcement",
    specs: {
      range: "1.2km detection radius",
      evidence: "Blockchain-anchored SHA-256 chain of custody",
      integration: "CAD/RMS API integration",
      compliance: "CJIS Security Policy compliant",
    },
    features: [
      "Blockchain evidence chain of custody",
      "Court-admissible forensic export",
      "CAD/RMS integration ready",
      "24/7 priority support",
      "On-site installation and training",
      "CJIS-compliant data handling",
    ],
    useCases: [
      "Stadium and event drone enforcement",
      "Critical infrastructure patrol",
      "Correctional facility airspace",
      "VIP protection details",
    ],
    catalogUrl: "/products#sentinel-ring-leo",
  },

  // MKT-004: NATO/non-US military positioning (non-ITAR advantage)
  {
    id: "sentinel-ring-allied",
    sku: "AN-ALLIED-001",
    name: "Sentinel Ring Allied",
    line: "sentinel-ring" as ProductLine,
    tagline: "NATO-compatible C-UAS for allied defense forces",
    description:
      "Export-friendly C-UAS platform for NATO and allied defense forces. " +
      "Designed from the ground up without ITAR-restricted components, enabling " +
      "streamlined procurement for non-US military customers. Dual-chain " +
      "blockchain anchoring provides interoperable evidence sharing across " +
      "coalition operations. STANAG-compatible data formats.",
    category: "military" as MarketTier,
    phase: "series-b" as ProductPhase,
    phaseTimeline: "Q3 2028",
    available: false,
    comingSoon: true,
    priceRange: { min: 120000, max: 350000 },
    priceFormatted: "$120,000 – $350,000",
    msrp: 200000,
    monthlyFee: 2499,
    cogs: 68000,
    margin: 0.66,
    assemblyHours: 120,
    laborCost: 6000,
    targetMarket: [
      "NATO member defense forces",
      "Five Eyes partner militaries",
      "Allied nation border security",
      "UN peacekeeping operations",
    ],
    marketSegment: "Allied military export",
    specs: {
      range: "5km detection radius",
      interop: "STANAG 4586 compatible",
      evidence: "Dual-chain blockchain (Solana + EtherLink)",
      export: "Non-ITAR, EAR99 classification",
    },
    features: [
      "Non-ITAR components for export ease",
      "STANAG-compatible data formats",
      "Coalition evidence sharing via blockchain",
      "Multi-language operator interface",
      "Field-deployable ruggedized hardware",
      "Interoperable with NATO C2 systems",
    ],
    useCases: [
      "Forward operating base protection",
      "Convoy route security",
      "Coalition airspace deconfliction",
      "Border surveillance operations",
    ],
    catalogUrl: "/products#sentinel-ring-allied",
  },

  // MKT-005: Correctional facilities bundle
  {
    id: "sentinel-ring-corrections",
    sku: "AN-CORR-001",
    name: "Sentinel Ring Corrections",
    line: "sentinel-ring" as ProductLine,
    tagline: "Prison and correctional facility drone interdiction",
    description:
      "Specialized C-UAS package for correctional facilities addressing the " +
      "growing threat of drone-delivered contraband. Continuous 24/7 monitoring " +
      "with automated alerts, evidence capture for prosecution, and integration " +
      "with existing facility security systems. Proven to reduce contraband " +
      "delivery attempts by 90%+ in pilot deployments.",
    category: "enterprise" as MarketTier,
    phase: "series-a" as ProductPhase,
    phaseTimeline: "Q1 2028",
    available: false,
    comingSoon: true,
    priceRange: { min: 55000, max: 150000 },
    priceFormatted: "$55,000 – $150,000",
    msrp: 85000,
    monthlyFee: 799,
    cogs: 28000,
    margin: 0.67,
    assemblyHours: 48,
    laborCost: 2400,
    targetMarket: [
      "State prisons",
      "Federal correctional facilities",
      "County jails",
      "Private corrections companies",
    ],
    marketSegment: "Correctional facilities",
    specs: {
      range: "1.5km perimeter coverage",
      monitoring: "24/7 automated surveillance",
      evidence: "Blockchain evidence for prosecution",
      integration: "SCADA/PSIM integration",
    },
    features: [
      "24/7 automated drone detection",
      "Contraband delivery interception",
      "Blockchain evidence for prosecution",
      "Integration with facility PSIM",
      "Perimeter-optimized sensor placement",
      "Quarterly threat assessment reports",
    ],
    useCases: [
      "Contraband interdiction",
      "Perimeter breach detection",
      "Evidence collection for prosecution",
      "Staff safety enhancement",
    ],
    catalogUrl: "/products#sentinel-ring-corrections",
  },

  // MKT-006: Agriculture farm pack bundle
  {
    id: "skywatch-farmpack",
    sku: "SW-FARM-001",
    name: "SkyWatch FarmPack",
    line: "skywatch" as ProductLine,
    tagline: "Agricultural drone monitoring for farms and ranches",
    description:
      "Affordable perimeter monitoring bundle for agricultural operations. " +
      "Protects crops, livestock, and equipment from unauthorized drone " +
      "surveillance and pesticide theft. Solar-powered SkyWatch sensors with " +
      "long-range detection optimized for open terrain. Includes automated " +
      "alerts via SMS and email.",
    category: "commercial" as MarketTier,
    phase: "series-a" as ProductPhase,
    phaseTimeline: "Q4 2027",
    available: false,
    comingSoon: true,
    priceRange: { min: 3500, max: 8000 },
    priceFormatted: "$3,500 – $8,000",
    msrp: 5500,
    monthlyFee: 49,
    cogs: 1800,
    margin: 0.67,
    assemblyHours: 8,
    laborCost: 400,
    targetMarket: [
      "Large-scale farms",
      "Ranches",
      "Vineyards and orchards",
      "Agricultural cooperatives",
    ],
    marketSegment: "Agriculture",
    specs: {
      range: "1km open terrain detection",
      sensors: "2x SkyWatch Pro (solar-powered)",
      alerts: "SMS + email automated alerts",
      power: "Solar with battery backup (72hr)",
    },
    features: [
      "Solar-powered for remote deployment",
      "Open terrain optimized detection",
      "SMS and email automated alerts",
      "Weather-resistant IP67 enclosures",
      "Simple self-install kit",
      "Low monthly monitoring fee",
    ],
    useCases: [
      "Crop surveillance prevention",
      "Livestock monitoring",
      "Equipment theft deterrence",
      "Precision agriculture protection",
    ],
    catalogUrl: "/products#skywatch-farmpack",
  },

  // MKT-007: Live events rental pricing model
  {
    id: "sentinel-ring-events",
    sku: "AN-EVENT-001",
    name: "Sentinel Ring Events",
    line: "sentinel-ring" as ProductLine,
    tagline: "Rapid-deploy C-UAS for high-profile events and critical gatherings",
    description:
      "Rapid-deploy C-UAS rental package for live events. Pre-configured " +
      "detection and countermeasure kit ships in ruggedized cases, deploys in " +
      "under 2 hours, and includes on-site operator support. Per-event pricing " +
      "eliminates capital expenditure. Evidence capture provides post-event " +
      "security reports for venue compliance.",
    category: "commercial" as MarketTier,
    phase: "series-a" as ProductPhase,
    phaseTimeline: "Q2 2028",
    available: false,
    comingSoon: true,
    priceRange: { min: 2500, max: 15000 },
    priceFormatted: "$2,500 – $15,000 per event",
    msrp: 5000,
    cogs: 800,
    margin: 0.84,
    assemblyHours: 2,
    laborCost: 500,
    targetMarket: [
      "Concert promoters",
      "Sports venues",
      "Festival organizers",
      "Convention centers",
      "Political events",
    ],
    marketSegment: "Live events",
    specs: {
      range: "800m event perimeter coverage",
      deployment: "< 2 hours setup time",
      format: "Ruggedized transit cases",
      support: "On-site operator included",
    },
    features: [
      "Rapid 2-hour deployment",
      "Per-event rental pricing",
      "On-site trained operator",
      "Post-event security report",
      "Ruggedized transit case kit",
      "No capital expenditure required",
    ],
    useCases: [
      "Stadium concerts",
      "Outdoor festivals",
      "Political rallies",
      "Sporting events",
    ],
    catalogUrl: "/products#sentinel-ring-events",
  },

  // MKT-008: Maritime Sentinel Ring bundle
  {
    id: "sentinel-ring-maritime",
    sku: "AN-MARINE-001",
    name: "Sentinel Ring Maritime",
    line: "sentinel-ring" as ProductLine,
    tagline: "Maritime C-UAS for ports, offshore platforms, and vessels",
    description:
      "Salt-air hardened C-UAS package for maritime environments. Combines " +
      "SkyWatch Marine detection sensors with ship-mounted NetSentry " +
      "countermeasures. Marine-grade connectors, corrosion-resistant housings, " +
      "and gyro-stabilized mounts for vessel deployment. Integrates with " +
      "existing bridge radar and AIS systems.",
    category: "enterprise" as MarketTier,
    phase: "series-b" as ProductPhase,
    phaseTimeline: "Q4 2028",
    available: false,
    comingSoon: true,
    priceRange: { min: 75000, max: 200000 },
    priceFormatted: "$75,000 – $200,000",
    msrp: 120000,
    monthlyFee: 1299,
    cogs: 42000,
    margin: 0.65,
    assemblyHours: 80,
    laborCost: 4000,
    targetMarket: [
      "Commercial ports",
      "Offshore oil platforms",
      "Naval vessels",
      "Cruise lines",
      "Yacht owners",
    ],
    marketSegment: "Maritime",
    specs: {
      range: "2km over-water detection",
      housing: "Marine-grade IP68, salt-air rated",
      mounts: "Gyro-stabilized vessel mounts",
      integration: "Radar + AIS bridge integration",
    },
    features: [
      "Salt-air corrosion resistant (IP68)",
      "Gyro-stabilized vessel mounts",
      "Bridge radar and AIS integration",
      "Marine-grade connectors throughout",
      "SkyWatch Marine detection array",
      "Ship-mounted NetSentry countermeasures",
    ],
    useCases: [
      "Port security",
      "Offshore platform protection",
      "Naval vessel defense",
      "Cruise ship safety",
    ],
    catalogUrl: "/products#sentinel-ring-maritime",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Get products by line */
export function getProductsByLine(line: ProductLine): Product[] {
  return products.filter((p) => p.line === line);
}

/** Get products by phase */
export function getProductsByPhase(phase: ProductPhase): Product[] {
  return products.filter((p) => p.phase === phase);
}

/** Get products by category */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get available products */
export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.available);
}

/** Get coming soon products */
export function getComingSoonProducts(): Product[] {
  return products.filter((p) => p.comingSoon);
}

/** Get consumer-friendly products (for main marketing site) */
export function getConsumerProducts(): Product[] {
  return products.filter(
    (p) =>
      p.category === "consumer" ||
      p.category === "diy-maker" ||
      p.category === "prosumer",
  );
}

/** Get enterprise products */
export function getEnterpriseProducts(): Product[] {
  return products.filter(
    (p) =>
      p.category === "commercial" ||
      p.category === "enterprise" ||
      p.category === "military",
  );
}

/** Get product by ID */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Get product by SKU */
export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku);
}

// =============================================================================
// PRODUCT LINE METADATA
// =============================================================================

export const productLines: Record<
  ProductLine,
  { name: string; tagline: string; description: string; icon: string }
> = {
  kestrel: {
    name: "Kestrel Mesh",
    tagline: "Consumer Drone Defense",
    description:
      "Direct-to-consumer drone capture for personal property protection",
    icon: "🎯",
  },
  netsnare: {
    name: "NetSnare",
    tagline: "Ground Launchers",
    description:
      "Ground-mounted net launchers that pair with SkyWatch detection systems",
    icon: "🪤",
  },
  skywatch: {
    name: "SkyWatch",
    tagline: "Detection Systems",
    description: "AI-powered drone detection from DIY to enterprise scale",
    icon: "👁️",
  },
  netsentry: {
    name: "NetSentry",
    tagline: "Active Countermeasures",
    description: "Net-based drone capture with integrated detection",
    icon: "🕸️",
  },
  "sentinel-ring": {
    name: "Sentinel Ring",
    tagline: "Enterprise Platform",
    description: "Full-scale C-UAS solution for critical infrastructure",
    icon: "🏢",
  },
  rkv: {
    name: "RKV Systems",
    tagline: "Military Interceptors",
    description: "Aerial and ground-based intercept platforms for defense",
    icon: "🚀",
  },
};

// =============================================================================
// EXPORTS FOR MARKETING PAGES
// =============================================================================

export const PRODUCTS = {
  products,
  phases,
  productLines,
  getProductsByLine,
  getProductsByPhase,
  getProductsByCategory,
  getAvailableProducts,
  getComingSoonProducts,
  getConsumerProducts,
  getEnterpriseProducts,
  getProductById,
  getProductBySku,
};

export default PRODUCTS;
